import Anthropic from '@anthropic-ai/sdk';

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
}) : null;

export async function POST(req) {
  try {
    if (!client) {
      return Response.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const { userInput, toolsList, agentPersona, agentGoals } = await req.json();

    const systemPrompt = `You are OpenCosmo's planning agent. Your job is to break down user intent into structured steps.

Agent Persona: ${agentPersona || 'General assistant'}
Agent Goals: ${agentGoals || 'Help the user accomplish their task'}

Available Tools:
${toolsList.map(tool => `- ${tool}`).join('\n')}

Your response MUST be valid JSON only (no markdown, no code blocks):
{
  "goal": "brief description of what needs to happen",
  "steps": [
    { "tool": "tool_name", "args": { "key": "value" } }
  ],
  "requires_approval": []
}`;

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userInput,
        },
      ],
      system: systemPrompt,
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response
    const plan = JSON.parse(content.text);

    return Response.json({ plan });
  } catch (error) {
    console.error('Planner error:', error);
    return Response.json(
      { error: error.message || 'Failed to generate plan' },
      { status: 500 }
    );
  }
}
