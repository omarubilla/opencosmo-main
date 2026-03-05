"use client";
import React, { useRef } from 'react';
import { ChevronDown, Zap, ArrowUp } from 'lucide-react';
import Image from 'next/image';

export default function Landing2({ onDemoClick, onEnterpriseClick }) {
  const scrollRef = useRef(null);

  const handleDemoClick = () => {
    onDemoClick();
  };

  const handleEnterpriseClick = () => {
    onEnterpriseClick?.();
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex flex-col">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle circular gradients */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e8e0d5] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e8e0d5] rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl px-4">
          {/* Updated Heading */}
          <div className="text-center space-y-4 mt-16">
            <h1 className="text-5xl md:text-6xl font-light text-[#4a4540] tracking-tight">
              The Operating System
              <span className="block font-light">for Autonomous Operators.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#7d7268] font-light mt-6 leading-relaxed max-w-2xl">
              Deploy AI agents that don't just chat — they schedule, email, deploy, analyze, and execute. Across models. Across tools. Across your infrastructure.
            </p>
          </div>

        {/* Clay Tablet Chatbox */}
        <div className="mt-8 w-full max-w-3xl bg-[#f5f2ed] rounded-2xl p-9 relative" style={{
          boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff'
        }}>
          <div className="relative">
            <textarea
              placeholder="Ask Cosmo to..."
              className="w-full h-40 px-4 py-4 bg-[#f5f2ed] text-[#4a4540] text-base placeholder-[#a89a8f] focus:outline-none font-light resize-none rounded-xl"
              style={{
                boxShadow: 'inset 6px 6px 12px #d4cec3, inset -6px -6px 12px #ffffff'
              }}
            />
            <div className="absolute -bottom-8 -right-2 flex items-center gap-3">
              {/* Left laurel */}
              <svg className="w-6 h-6 text-[#d4af84] opacity-30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C10 4 8 6 8 9c0 2 1 3 2 4-1 0-2 1-2 2s1 2 2 2c-1 1-2 2-2 4 0 3 2 5 4 7-2-2-4-4-4-7 0-2 1-3 2-4-1 0-2-1-2-2s1-2 2-2c-1-1-2-2-2-4 0-3 2-5 4-7z"/>
              </svg>
              
              <button className="w-9 h-9 flex items-center justify-center bg-[#f5f2ed] text-[#c89f5b] rounded-full transition-all"
                style={{
                  boxShadow: '6px 6px 12px #d4cec3, -6px -6px 12px #ffffff'
                }}
                onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
                onMouseUp={(e) => e.currentTarget.style.boxShadow = '6px 6px 12px #d4cec3, -6px -6px 12px #ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '6px 6px 12px #d4cec3, -6px -6px 12px #ffffff'}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              
              {/* Right laurel */}
              <svg className="w-6 h-6 text-[#d4af84] opacity-30" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'scaleX(-1)' }}>
                <path d="M12 2C10 4 8 6 8 9c0 2 1 3 2 4-1 0-2 1-2 2s1 2 2 2c-1 1-2 2-2 4 0 3 2 5 4 7-2-2-4-4-4-7 0-2 1-3 2-4-1 0-2-1-2-2s1-2 2-2c-1-1-2-2-2-4 0-3 2-5 4-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Demo Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDemoClick}
            className="group relative px-8 py-3 rounded-full bg-[#c89f5b] text-white font-medium text-sm tracking-wide transition-all"
            style={{
              boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
            }}
            onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #a0814a, inset -4px -4px 8px #e6bc6a'}
            onMouseUp={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
          >
            <span className="relative flex items-center gap-2">
              Create Your Operator
            </span>
          </button>

          <button
            onClick={handleDemoClick}
            className="group relative px-8 py-3 rounded-full bg-[#f5f2ed] text-[#7d7268] font-medium text-sm tracking-wide transition-all"
            style={{
              boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
            }}
            onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
            onMouseUp={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
          >
            <span className="relative flex items-center gap-2">
              View Live Demo
            </span>
          </button>
        </div>

        {/* Large image section */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="relative w-full aspect-square">
            <Image
              src="/babyBernini.png"
              alt="AI Demo showcase"
              fill
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 85%)'
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Subtle ornamental lines (Bernini-inspired) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af84]/30 to-transparent"></div>
      </div>

      {/* SECTION 2: Feature Pillars */}
      <div className="w-full px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl" style={{
              boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
              background: '#f5f2ed'
            }}>
              <h3 className="text-xl font-medium text-[#4a4540] mb-3">Multi-Model Verified</h3>
              <p className="text-[#7d7268] font-light leading-relaxed">
                Claude plans. GPT executes. <span className="text-[var(--brand-red)]">🔺</span> OpenCosmo governs. Cross-model reasoning built into every operator.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl" style={{
              boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
              background: '#f5f2ed'
            }}>
              <h3 className="text-xl font-medium text-[#4a4540] mb-3">Execution Law Built In</h3>
              <p className="text-[#7d7268] font-light leading-relaxed">
                Budget caps. Tool allowlists. Approval gates. Full audit logs. Not a chatbot — an accountable digital operator.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl" style={{
              boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
              background: '#f5f2ed'
            }}>
              <h3 className="text-xl font-medium text-[#4a4540] mb-3">Works With Your Stack</h3>
              <p className="text-[#7d7268] font-light leading-relaxed">
                Calendar, Gmail, GitHub, Slack, Vercel, Stripe, custom APIs. If it has an interface, your operator can use it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Positioning Statement */}
      <div className="w-full px-4 py-16">
        <div className="max-w-3xl mx-auto p-8 rounded-2xl" style={{
          boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
          background: '#f5f2ed'
        }}>
          <p className="text-center text-2xl md:text-3xl font-light text-[#4a4540] leading-relaxed">
            <span className="text-[var(--brand-red)]">🔺</span> OpenCosmo is not another AI chatbot.
            <span className="block mt-2 font-medium">
              It is the control plane for autonomous digital operators.
            </span>
          </p>
        </div>
      </div>

      {/* SECTION 4: Live Operators Showcase */}
      <div className="w-full px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#4a4540] tracking-tight">
              Live Operators in the Wild
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Operator 1 */}
            <div className="p-6 rounded-2xl" style={{
              boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
              background: '#f5f2ed'
            }}>
              <h3 className="text-lg font-medium text-[#4a4540] mb-2">Coach AI</h3>
              <p className="text-[#7d7268] font-light">
                Automates practice scheduling, team comms, and opponent briefs.
              </p>
            </div>

            {/* Operator 2 */}
            <div className="p-6 rounded-2xl" style={{
              boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
              background: '#f5f2ed'
            }}>
              <h3 className="text-lg font-medium text-[#4a4540] mb-2">Founder Mode</h3>
              <p className="text-[#7d7268] font-light">
                Runs deployments, triages inbox, generates investor briefs.
              </p>
            </div>

            {/* Operator 3 */}
            <div className="p-6 rounded-2xl" style={{
              boxShadow: '12px 12px 24px #d4cec3, -12px -12px 24px #ffffff',
              background: '#f5f2ed'
            }}>
              <h3 className="text-lg font-medium text-[#4a4540] mb-2">Personal OS</h3>
              <p className="text-[#7d7268] font-light">
                Manages calendar, tasks, automation, and daily briefings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle ornamental lines (Bernini-inspired) */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af84]/30 to-transparent"></div></div>
  );
}
