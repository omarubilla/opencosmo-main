# 🚀 Deploying OpenCosmo to Vercel

Complete step-by-step guide to get your SaaS live.

## Prerequisites

- GitHub account
- Vercel account
- API keys ready (Clerk, Supabase, OpenAI, Anthropic)

## Step 1: Prepare Your GitHub Repo

```bash
# Stage your changes
git add .

# Commit
git commit -m "feat: Add OpenCosmo agent builder SaaS

- Dashboard for agent management
- Agent builder with tool selection
- Run interface with execution logs
- Claude + GPT AI orchestration
- Supabase database integration
- Real-time execution monitoring"

# Push to GitHub
git push origin main
```

## Step 2: Connect to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. Proceed to environment variables

### Via Vercel CLI

```bash
npm install -g vercel
vercel link
```

## Step 3: Add Environment Variables

In **Vercel Dashboard → Settings → Environment Variables**, add:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
```

### Clerk
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_...
CLERK_SECRET_KEY = sk_live_...
```

### OpenAI
```
OPENAI_API_KEY = sk-proj-...
```

### Anthropic
```
ANTHROPIC_API_KEY = sk-ant-...
```

## Step 4: Deploy

### Option A: Automatic (Recommended)

Once you've set environment variables, Vercel will automatically deploy on every push to main.

```bash
git push origin main
```

### Option B: Manual Deploy

```bash
vercel --prod
```

## Step 5: Verify Deployment

1. Visit your Vercel URL (e.g., `opencosmo-ai.vercel.app`)
2. Test login with Clerk
3. Create an agent
4. Run agent to test API integration
5. Check execution logs

## 🔧 Troubleshooting

### "Supabase credentials not found"
- Verify `.env.local` variables in Vercel Settings
- Make sure `NEXT_PUBLIC_*` prefix is correct
- Redeploy after adding variables

### "API key error from OpenAI/Anthropic"
- Double-check API keys are correct
- Verify keys have appropriate permissions
- Check rate limits

### "Build fails"
- Run `npm run build` locally to debug
- Check for TypeScript errors: `npm run type-check`
- Verify all dependencies installed: `npm install`

## 📊 Monitoring

### Vercel Analytics
- Dashboard → Analytics tab shows traffic
- Function calls, edge requests, etc.

### Error Tracking
- Dashboard → Deployments → select deployment
- View build logs and errors

### Uptime
- Vercel provides automatic monitoring
- Set up alerts in Settings

## 🔐 Security Checklist

- [ ] API keys are environment-only (not in code)
- [ ] Clerk has production settings configured
- [ ] Supabase RLS policies enabled
- [ ] CORS origins configured
- [ ] Rate limiting enabled (if available)
- [ ] SSL certificate auto-enabled (Vercel default)

## 📈 Performance Optimization

### Image Optimization
Already included - Next.js Image component

### Bundle Size
```bash
npm run analyze
```

### Database Optimization
- Add Supabase indexes (included in setup)
- Monitor slow queries in Supabase dashboard

## 💳 Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records (instructions provided)
4. SSL certificate auto-issued

## 🎯 Next Deployment Features

### Scheduled Deployments
Use GitHub Actions to schedule deployments

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  schedule:
    - cron: '0 0 * * *'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Preview Deployments
Vercel automatically creates preview URLs for PRs

### Rollbacks
Vercel Dashboard → Deployments → select version → click "Redeploy"

## 📞 Support

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)

---

**Your SaaS is live! 🎉**

Monitor and scale as needed. Good luck!
