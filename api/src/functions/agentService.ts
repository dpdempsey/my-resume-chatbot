import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Agent, run, user, tool } from '@openai/agents';
import type { AgentInputItem } from '@openai/agents';
import { instructions } from "../tools/instructions";
import { getMyBooksTool } from "./hardcover";
import { z } from 'zod';

export async function agentService(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const body = await request.json();
    const { question, history } = body as { question: string; history?: AgentInputItem[] };
    const agent = new Agent({
        name: 'Declan\'s resume agent',
        instructions: instructions,
        model: "gpt-4o-mini",
        tools: [getMyBooksTool]
    });

    try {
        const conversationHistory: AgentInputItem[] = history || [];
        conversationHistory.push(user(question));
        const response = await run(agent, conversationHistory);
        return { 
            jsonBody: {
                response: response.finalOutput,
                history: response.history
            }
        };
    } catch (error) {
        context.error('Error getting agent response:', error);
        return {
            status: 500,
            jsonBody: {
                error: 'Failed to get response from resume agent',
                message: error instanceof Error ? error.message : 'Unknown error',
                details: error instanceof Error ? error.stack : undefined
            }
        };
    }

};

app.http('agentService', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: agentService
});