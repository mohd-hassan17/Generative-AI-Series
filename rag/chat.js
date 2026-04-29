import "dotenv/config";

import { OpenAI } from 'openai';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";

const client = new OpenAI({
  apiKey: "AIzaSyAdExE6hWZXnJmq-iZmGtV_wEQ6yP8V06w",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/",
});

async function chat() {
  const userQuery = "tell me abou fs modules and in which page it is";

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: "AIzaSyAdExE6hWZXnJmq-iZmGtV_wEQ6yP8V06w",
    model: "text-embedding-004", 
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "chaicode-collection1",
    }
  );

  const vectorSearcher = vectorStore.asRetriever({
    k: 3,
  });

  const relevantChunk = await vectorSearcher.invoke(userQuery);

  const SYSTEM_PROMPT = `
    You are an AI assistant who helps resolving user query based on the
    context available to you from a PDF file with the content and page number.

    Only ans based on the available context from file only.

    Context:
    ${JSON.stringify(relevantChunk)}
  `;

  const response = await client.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ],
  });

  console.log(`> ${response.choices[0].message.content}`);
}

chat();
