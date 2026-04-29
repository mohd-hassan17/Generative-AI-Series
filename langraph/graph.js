import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, MessagesAnnotation  } from "@langchain/langgraph";
import { z } from "zod";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // or "gemini-1.5-pro"
  apiKey: process.env.GOOGLE_API_KEY,
});

async function callGemini(state) {
  
  console.log(`call Gemini`, state);

  const response = await llm.invoke(state.messages);
  // Return the new messages to be added to state
  return {
    messages: [response],
  };
}


const workFlow = new StateGraph(MessagesAnnotation)
    .addNode("callGemini", callGemini)
    .addEdge("__start__", "callGemini")
    .addEdge("callGemini", "__end__");

  const graph = workFlow.compile();  // graph kya hai connection of node
    
async function runGraph() {

  const userQuery = "Hello, how are you?";

  const updatedState = await graph.invoke({messages: [new HumanMessage(userQuery)]});
  console.log( "Updated State:" ,updatedState);
}

runGraph();