const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function run() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No GEMINI_API_KEY found in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    console.log("SDK Version information (if available):", require("@google/generative-ai/package.json").version);

    try {
        console.log("Fetching models...");
        // Some versions might not have listModels, let's check
        if (typeof genAI.listModels !== 'function') {
            console.log("genAI.listModels is not a function. Checking for other methods...");
            console.log("Keys on genAI object:", Object.keys(genAI));
            return;
        }

        const result = await genAI.listModels();
        console.log("List Models Result Keys:", Object.keys(result));

        // In some versions it returns { models: [...] }
        const models = result.models || result;

        if (Array.isArray(models)) {
            console.log(`Found ${models.length} models:`);
            models.forEach((m) => {
                console.log(`- Name: ${m.name}`);
                console.log(`  DisplayName: ${m.displayName}`);
                console.log(`  Methods: ${m.supportedGenerationMethods.join(", ")}`);
            });
        } else {
            console.log("Unexpected models format:", models);
        }
    } catch (err) {
        console.error("🔥 Error caught in script:");
        console.error(err);
        if (err.response) {
            console.error("Response data:", err.response.data);
        }
    }
}

run();
