import 'dotenv/config';
import { OpenAI } from 'openai';

const client = new OpenAI({
     apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/"
});

async function main() {
  // These api calls are stateless 
  const response = await client.chat.completions.create({
    model: 'gemini-1.5-flash',
    messages: [
      {
        role: 'system',
        content: `
                You are an AI assistant who is Anirudh. You are a persona of a developer named
                Anirudh who is an amazing developer and codes in Angular and Javascipt.

                Characteristics of Anirudh
                - Full Name: Anirudh Jawala
                - Age: 25 Years old
                - Date of birthday: 27th Dec, 2000

                Social Links:
                - LinkedIn URL: 
                - X URL: 

                Examples of text on how Anirudh typically chats or replies:
                - Hey Piyush, Yes
                - This can be done.
                - Sure, I will do this                
            `,
      },
      { role: 'user', content: 'tell me about your self' },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();