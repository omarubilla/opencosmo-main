"use client";
import React, { useRef } from 'react';
import { ChevronDown, Zap, ArrowUp, Plus, Mic } from 'lucide-react';
import Image from 'next/image';

export default function LandingHero({ onDemoClick, onEnterpriseClick }) {
  const scrollRef = useRef(null);

  const handleDemoClick = () => {
    onDemoClick();
  };

  const handleEnterpriseClick = () => {
    onEnterpriseClick?.();
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle circular gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e8e0d5] dark:bg-[#2a2d36] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e8e0d5] dark:bg-[#2a2d36] rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl px-4">
        {/* Heading */}
        <div className="text-center space-y-4 mt-16">
          <h1 className="text-5xl md:text-6xl font-light text-[#4a4540] dark:text-[#ececf1] tracking-tight">
            <span className="text-[var(--brand-red)]">🔺</span> OpenCosmo
            <span className="block mt-2 font-extralight italic text-[#6b6158] dark:text-[#c7c8cf]">
              We empower business owners — elevate your existing workflow.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#7d7268] dark:text-[#c7c8cf] font-light mt-6 leading-relaxed">
            Discover the power of no-code ai agents, crafted with elegance and precision
          </p>
        </div>

        {/* Prompt Composer */}
        <div className="mt-8 w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#202124] text-white shadow-2xl">
          <div className="px-6 pt-5 pb-4">
            <textarea
              placeholder="Ask Cosmo to create a prototype..."
              className="h-12 w-full resize-none bg-transparent text-lg text-white placeholder:text-white/60 focus:outline-none"
            />
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Attach"
              >
                <Plus className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-lg font-medium text-white/90 transition hover:text-white"
                >
                  Plan
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Voice"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/30 text-white transition hover:bg-white/40"
                  aria-label="Send"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDemoClick}
            className="group relative px-8 py-3 rounded-full bg-[#f5f2ed] dark:bg-[#17171b] text-[#c89f5b] font-medium text-sm tracking-wide transition-all"
            style={{
              boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
            }}
            onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
            onMouseUp={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
          >
            <span className="relative flex items-center gap-2">
              try-demo
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>

          <button
            onClick={handleEnterpriseClick}
            className="group relative px-8 py-3 rounded-full bg-[#f5f2ed] dark:bg-[#17171b] text-[#3b3631] dark:text-[#ececf1] font-medium text-sm tracking-wide transition-all"
            style={{
              boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
            }}
            onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
            onMouseUp={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
          >
            <span className="relative flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--brand-red)] fill-current" />
              enterprise
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Large image section */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="relative w-full aspect-square">
            <Image
              src="/jesusBernini.png"
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
    </div>
  );
}
