import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Tool definitions for GPT to use
const tools = [
  {
    type: 'function',
    function: {
      name: 'create_calendar_event',
      description: 'Creates a calendar event',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Event title' },
          date: { type: 'string', description: 'Event date (YYYY-MM-DD)' },
          time: { type: 'string', description: 'Event time (HH:MM)' },
        },
        required: ['title', 'date', 'time'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'send_email',
      description: 'Sends an email',
      parameters: {
        type: 'object',
        properties: {
          to: { type: 'string', description: 'Recipient email' },
          subject: { type: 'string', description: 'Email subject' },
          body: { type: 'string', description: 'Email body' },
        },
        required: ['to', 'subject', 'body'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_stock',
      description: 'Checks stock price for a symbol',
      parameters: {
        type: 'object',
        properties: {
          symbol: { type: 'string', description: 'Stock ticker symbol' },
        },
        required: ['symbol'],
      },
    },
  },
];

export async function POST(req) {
  try {
    if (!openai) {
      return Response.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { steps, toolCalls } = await req.json();

    const systemPrompt = `You are OpenCosmo's executor agent. Your job is to execute the planned steps and call the appropriate tools.
For each step, analyze the requirements and call the necessary functions.
Return a summary of what was executed.`;

    const stepsDescription = steps
      .map((step, i) => `${i + 1}. Use ${step.tool} with ${JSON.stringify(step.args)}`)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Execute these steps:\n${stepsDescription}`,
        },
      ],
      system: systemPrompt,
      tools: tools,
      tool_choice: 'auto',
    });

    const executionLog = [];
    let finalResponse = '';

    for (const message of response.content) {
      if (message.type === 'text') {
        finalResponse = message.text;
      } else if (message.type === 'tool_use') {
        executionLog.push({
          tool: message.name,
          args: message.input,
          timestamp: new Date().toISOString(),
        });
      }
    }

    return Response.json({
      success: true,
      toolCalls: executionLog,
      summary: finalResponse || 'Execution completed',
    });
  } catch (error) {
    console.error('Executor error:', error);
    return Response.json(
      { error: error.message || 'Failed to execute plan' },
      { status: 500 }
    );
  }
}
