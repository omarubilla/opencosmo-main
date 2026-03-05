import fs from 'fs/promises';
import path from 'path';

// Mock tool execution
const toolImplementations = {
  create_calendar_event: async (args) => {
    return {
      success: true,
      message: `Created calendar event: ${args.title} on ${args.date} at ${args.time}`,
    };
  },
  send_email: async (args) => {
    // Mock write to outbox
    const outboxDir = path.join(process.cwd(), 'public', 'outbox');
    try {
      await fs.mkdir(outboxDir, { recursive: true });
      const fileName = `${Date.now()}_${args.to.split('@')[0]}.txt`;
      await fs.writeFile(
        path.join(outboxDir, fileName),
        `To: ${args.to}\nSubject: ${args.subject}\n\n${args.body}`
      );
    } catch (e) {
      console.log('Mock email sent:', args);
    }
    return { success: true, message: `Email sent to ${args.to}` };
  },
  run_script: async (args) => {
    const whitelisted = ['git status', 'npm run build', 'echo'];
    if (!whitelisted.includes(args.command)) {
      return { success: false, message: 'Command not whitelisted' };
    }
    return { success: true, message: `Script executed: ${args.command}` };
  },
  check_stock: async (args) => {
    // Mock stock price
    const mockPrices = {
      AAPL: 150.25,
      GOOGL: 142.8,
      MSFT: 380.5,
      TSLA: 242.1,
    };
    const price = mockPrices[args.symbol] || Math.random() * 300;
    return { success: true, price, symbol: args.symbol };
  },
  deploy_app: async (args) => {
    return {
      success: true,
      message: 'Deployment initiated (mock)',
      url: 'https://your-app-deployed.vercel.app',
    };
  },
};

export async function POST(req) {
  try {
    const { tool, args } = await req.json();

    if (!toolImplementations[tool]) {
      return Response.json(
        { error: `Tool not found: ${tool}` },
        { status: 404 }
      );
    }

    const result = await toolImplementations[tool](args);

    return Response.json({
      success: true,
      tool,
      args,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Tool execution error:', error);
    return Response.json(
      { error: error.message || 'Tool execution failed' },
      { status: 500 }
    );
  }
}
