# OpenCosmo SaaS - Setup Guide

## 🚀 Quick Start

### 1. Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project (e.g., "opencosmo")
3. Copy your `Project URL` and `anon public key`
4. Create the database tables using the SQL below

### 2. Database Schema

Paste this SQL in Supabase's SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  is_pro BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create agents table
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

-- Create runs table
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

-- Create indexes for faster queries
CREATE INDEX idx_agents_user_id ON agents(user_id);
CREATE INDEX idx_runs_agent_id ON runs(agent_id);
```

### 3. Environment Variables

Create `.env.local` in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Deploy to Vercel

```bash
git add .
git commit -m "Add agent builder SaaS"
git push
```

Then connect your GitHub repo to Vercel and add the same `.env.local` variables in Vercel Settings.

## 🏗 Architecture

### Landing Page (Public)
- `LandingHero` component with neumorphic design
- No auth required

### After Login → Dashboard
- `/dashboard` - See all agents
- `/agent` - Create/edit agents with tools
- `/run` - Execute agent and see logs

### Backend Flow

1. User inputs task
2. Claude (Planner) generates structured plan
3. Plan steps are executed
4. GPT (Executor) calls tools
5. Tools execute and log results
6. Results saved to database

### Available Tools
- create_calendar_event
- send_email
- run_script (whitelisted only)
- check_stock
- deploy_app

## 📊 Database Schema

### profiles
- id (UUID, matches Clerk user id)
- email (TEXT)
- is_pro (BOOLEAN)
- created_at (TIMESTAMP)

### agents
- id (UUID)
- user_id (UUID)
- name (TEXT)
- persona (TEXT)
- goals (TEXT)
- tools_enabled (JSONB array)
- created_at (TIMESTAMP)

### runs
- id (UUID)
- agent_id (UUID)
- input (TEXT)
- plan (JSONB)
- tool_calls (JSONB array)
- output (TEXT)
- status (TEXT: pending/executing/completed)
- created_at (TIMESTAMP)

## 🎯 Feature Checklist

- [x] Supabase integration
- [x] Dashboard page
- [x] Agent builder form
- [x] Run execution page
- [x] Claude planner API
- [x] GPT executor API
- [x] Tool execution system
- [x] Execution logs UI
- [x] Database persistence
- [ ] Stripe integration (Optional)
- [ ] Saved runs history (Partially - runs are saved)
- [ ] Deploy to Vercel

## 🛠 Customization

### Add New Tool

1. Add tool definition in `/app/api/executor/route.js`
2. Add implementation in `/app/api/execute-tool/route.js`
3. Add to AVAILABLE_TOOLS in `/app/agent/page.jsx`

### Customize Colors

Edit colors in component files (Bernini palette):
- Off-white: `#f5f2ed`
- Cream: `#e8dcc4`
- Gold: `#c89f5b`
- Dark brown: `#4a4540`

## 🚀 Next Steps

1. Get API keys for OpenAI, Anthropic, Supabase, Clerk
2. Set up `.env.local`
3. Create Supabase tables
4. Run `npm run dev`
5. Test the workflow
6. Deploy to Vercel
