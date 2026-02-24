const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --------------------------------------------------
// BROWSER TEST ROUTE
// --------------------------------------------------
router.get("/test", (req, res) => {
  res.send("✅ AI Planner backend is running (Gemini Ready - gemini-2.5-flash)");
});

// --------------------------------------------------
// AI GENERATION ROUTE
// --------------------------------------------------
router.post("/plan", async (req, res) => {
  try {
    const { destination, days, budget, type, interests, month, pace } = req.body || {};

    // Validation - Only Days is strictly required
    if (Number(days) <= 0) {
      return res.status(400).json({
        error: "Valid days are required",
      });
    }

    const prompt = `
Generate a detailed ${days}-day travel plan.
Destination: ${destination || "Suggest a surprise destination"}
Travel Type: ${type || "Not specified"}
Budget: ${budget || "Moderate"}
Interests: ${interests || "General sightseeing"}
Month of Travel: ${month || "Current"}
Pace: ${pace || "Moderate"}

Format the response as a clear day-by-day itinerary. Provide suggestions for sightseeing, food, and activities.
Return the itinerary in plain text.
`;

    // Using "gemini-2.5-flash" for 2026 compatibility
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      result: text,
    });
  } catch (err) {
    console.error("🔥 GEMINI ERROR details:", err);
    res.status(500).json({
      error: "AI generation failed",
      message: err.message,
    });
  }
});

module.exports = router;
