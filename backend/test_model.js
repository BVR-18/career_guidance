require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testModels() {
  const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.5-flash"];

  for (const m of modelsToTry) {
    try {
      console.log(`Testing model: ${m}...`);
      const res = await ai.models.generateContent({
        model: m,
        contents: "Hello, reply with 1 sentence.",
      });
      console.log(`SUCCESS with ${m}:`, res.text);
      return;
    } catch (err) {
      console.error(`FAILED with ${m}:`, err?.message || err);
    }
  }
}

testModels();
