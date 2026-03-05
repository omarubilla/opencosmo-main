#!/bin/bash

# 🚀 OpenCosmo Quick Setup Script
# Run this after cloning the repo

echo "🚀 OpenCosmo Agent Builder - Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ from nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "⚠️  Please fill in your API keys in .env.local"
    echo ""
    echo "You need to set:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "  - CLERK_SECRET_KEY"
    echo "  - OPENAI_API_KEY"
    echo "  - ANTHROPIC_API_KEY"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "📖 Documentation:"
echo "  - Setup Guide: SETUP_GUIDE.md"
echo "  - Implementation: IMPLEMENTATION_SUMMARY.md"
echo "  - Deployment: VERCEL_DEPLOYMENT.md"
echo ""

echo "🚀 Ready to start!"
echo ""
echo "Next steps:"
echo "  1. Fill in .env.local with your API keys"
echo "  2. Run: npm run dev"
echo "  3. Visit: http://localhost:3000"
echo ""
echo "Happy building! 🎉"
