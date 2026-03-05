# 🚀 OpenCosmo - AI Agent Builder SaaS

**Build, deploy, and run autonomous AI agents with ease.**

Live Demo: [opencosmo.vercel.app](https://opencosmo.vercel.app)

## 🎯 What's Included

- ✅ **Landing Page** - Beautiful Bernini-inspired hero with neumorphic design
- ✅ **Authentication** - Clerk integration (SSO ready)
- ✅ **Dashboard** - Manage all your AI agents
- ✅ **Agent Builder** - Create agents with custom personas, goals, and tools
- ✅ **Run Interface** - Execute agents and monitor execution logs in real-time
- ✅ **AI Orchestration** - Claude planner + GPT executor pipeline
- ✅ **Tool System** - 5 example tools (calendar, email, stock, scripts, deploy)
- ✅ **Database** - Supabase for persistent storage
- ✅ **TypeScript/React** - Next.js 15 with React 19

## 📋 Quick Setup (5 minutes)

### 1. Clone & Install

```bash
git clone <repo>
cd ai-fusion-lab-main
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy project URL and anon key
4. Run this SQL in the SQL Editor:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  is_pro BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  persona TEXT,
  goals TEXT,
  tools_enabled JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  input TEXT,
  plan JSONB,
  tool_calls JSONB DEFAULT '[]',
  output TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agents_user_id ON agents(user_id);
CREATE INDEX idx_runs_agent_id ON runs(agent_id);
```

### 3. Set Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# LLM APIs
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🌐 Deploy to Vercel

### Option A: Using Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B: GitHub + Vercel Dashboard

1. Push to GitHub
2. Connect repo in [Vercel Dashboard](https://vercel.com)
3. Add environment variables
4. Deploy

## 📁 Project Structure

```
app/
├── page.js                     # Landing page
├── dashboard/page.jsx          # Agent management
├── agent/page.jsx              # Agent builder form
├── run/page.jsx                # Agent execution
├── api/
│   ├── planner/route.js        # Claude planner
│   ├── executor/route.js       # GPT executor
│   └── execute-tool/route.js   # Tool execution
└── _components/
    └── LandingHero.jsx         # Hero landing
lib/
├── supabaseClient.js           # Supabase setup
└── utils.js
hooks/
└── useDatabase.js              # DB operations
```

## 🔄 How It Works

### User Flow

```
1. User lands on homepage
2. Signs in with Clerk
3. Redirected to dashboard
4. Creates new agent (name, persona, goals, tools)
5. Agent saved to Supabase
6. Clicks "Run" on agent
7. Enters task
8. System:
   - Claude generates plan (structured steps)
   - GPT executes each step
   - Tools are called
   - Results logged
   - Output saved
9. User sees execution log in real-time
```

### AI Architecture

```
User Input
   ↓
[Planner - Claude 3.5]
   ↓ (generates plan)
Tool Plan JSON: {goal, steps: [{tool, args}]}
   ↓
[Executor - GPT-4o-mini]
   ↓ (executes steps)
Tool Calls
   ↓
[Tool Runtime]
   ↓ (executes & logs)
Results
   ↓
User sees logs
   ↓
Saved to database
```

## 🛠 Available Tools

1. **create_calendar_event** - Schedule calendar events
2. **send_email** - Send emails (mocked for demo)
3. **run_script** - Execute whitelisted commands
4. **check_stock** - Get stock prices (mocked)
5. **deploy_app** - Deploy to Vercel (mocked)

## 🎨 Design System

**Colors (Bernini-Inspired):**
- Off-white: `#f5f2ed`
- Cream: `#e8dcc4`
- Gold: `#c89f5b`
- Dark brown: `#4a4540`

**Typography:**
- Headings: Light 300-400 weight
- Body: Light 300 weight
- Smallest: 12px gray

**Components:**
- Neumorphic buttons with dual shadows
- Rounded corners (12-16px)
- Smooth transitions
- No harsh borders

## 🚀 Next Steps

- [ ] Add Stripe for premium features
- [ ] Implement user profiles
- [ ] Add workflow builder
- [ ] Create tool marketplace
- [ ] Add WebSocket for real-time logs
- [ ] Build mobile app
- [ ] Add analytics dashboard

## 📖 Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

## 🤝 Contributing

Pull requests welcome! See CONTRIBUTING.md (coming soon).

## 📄 License

MIT

## 💬 Support

Email: support@opencosmo.ai

---

**Built with ❤️ by OpenCosmo**
