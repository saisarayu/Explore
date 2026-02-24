const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No GEMINI_API_KEY found");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        console.log("Fetching models via REST API...");
        const response = await axios.get(url);
        const models = response.data.models;
        console.log(`Found ${models.length} models:`);
        models.forEach((m) => {
            console.log(`- ${m.name} (${m.displayName})`);
        });
    } catch (err) {
        console.error("Error fetching models:");
        if (err.response) {
            console.error(err.response.status, err.response.statusText);
            console.error(JSON.stringify(err.response.data, null, 2));
        } else {
            console.error(err.message);
        }
    }
}

listModels();
