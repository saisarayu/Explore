// backend/routes/aiDescription.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/describe-spot", async (req, res) => {
  try {
    const { location, days = 2, mood = "fun and adventurous" } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    // Using "gemini-2.5-flash" for 2026 compatibility
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write a short travel description for ${location}.
- Tone: ${mood}
- Duration: ${days} days
3–5 sentences. Plain text only.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text();

    res.json({ success: true, description });
  } catch (err) {
    console.error("Gemini Error details:", err);
    res.status(500).json({ error: "Failed to generate description", message: err.message });
  }
});

module.exports = router;
