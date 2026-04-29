import "dotenv/config";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";

async function init() {
  const pdfFilePath = "./nodejs.pdf";
  const loader = new PDFLoader(pdfFilePath);

  // Load PDF
  const docs = await loader.load();

  // Google Gemini Embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: 'AIzaSyAdExE6hWZXnJmq-iZmGtV_wEQ6yP8V06w',
    model: "text-embedding-004",   // recommended embedding model
  });

  // Store in Qdrant
  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: "http://localhost:6333",
    collectionName: "chaicode-collection1",
  });

  console.log("Indexing of documents done...");
}

init();
