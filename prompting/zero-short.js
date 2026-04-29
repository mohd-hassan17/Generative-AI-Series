import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Translate the following English sentence into hindi: Where is the nearest train station?";

  const result = await model.generateContent(prompt);

  console.log(result.response.text());
}

main();
