import 'dotenv/config';

import { Agent,  run, tool } from '@openai/agents';
import { z } from 'zod';


let database = [];

const customerSupportAgent = new Agent({
    name: 'Customer Support Agent',
    instructions: `
        You're a helpfull customer support agent 
        `,
});

async function chatWithAgent(query) {
    const result = await run(customerSupportAgent, 
        database.concat({ role: 'user', content: query }));
        database = result.history;
        console.log(result.finalOutput);
}

chatWithAgent("Hi, I need help with my order");