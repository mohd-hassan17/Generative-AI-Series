import "dotenv/config";

import OpenAI from "openai";
import { Memory } from 'mem0ai/oss';

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const mem = new Memory({
  version: 'v1.1',
  vectorStore: {
    provider: 'qdrant',
    config: {
      collectionName: 'memories',
      embeddingModelDims: 1536,
      host: 'localhost',
      port: 6333,
    },
  },
});


async function chatQuery(query = '') {

const response = await openai.chat.completions.create({
  model: "models/gemini-2.0-flash",
  messages: [
    { role: "user", content: query },
],
});

console.log(response.choices[0].message.content);

console.log("adding to memory...");

await mem.add([
    { role: 'user', content: query },
    { role: 'assistant', content: response.choices[0].message.content }
], 
{ userId: 'hassan',}
);

console.log("added to memory...");

}

chatQuery("Hey agent, my name is hassan and I am from Mumbai");