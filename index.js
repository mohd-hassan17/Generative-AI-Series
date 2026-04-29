import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "", 
});

async function checkApiKey() {
  try {
    // simplest safe endpoint
    await client.models.list();

    console.log("✅ Your OpenAI API key is valid!");
  } catch (err) {
    console.log("❌ Invalid API key.");
    console.log("Error:", err.message);
  }
}

checkApiKey();
