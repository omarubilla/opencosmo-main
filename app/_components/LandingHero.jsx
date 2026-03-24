"use client";
import React from 'react';
import { ChevronDown, Zap, ArrowUp, Plus, Mic } from 'lucide-react';

export default function LandingHero({ onDemoClick, onEnterpriseClick }) {
  const approachSections = [
    {
      title: 'Our take on Recursive Self-Improvement',
      paragraphs: [
        'Despite years of industrial and academic research, most approaches to Recursive Self-Improvement are still too slow and expensive to be practical; each step of self-improvement requires extensive training of LLMs (or even retraining them from scratch).',
        'This does not scale.',
        'OpenCosmo is building intelligent systems that improve themselves at the execution layer — not the model layer.',
        'This works now.',
        'And it is fast.',
        'Fast enough that in a few months, we will be offering it for free.',
        'It will enable us — and you — to create reliable reasoning systems that solve real-world, practical problems and workflows that businesses face every day.'
      ]
    },
    {
      title: 'Why not Reinforcement Learning?',
      paragraphs: [
        'We\'ve used RL for years.',
        'But RL post-training has severe limitations.',
        'It\'s slow, expensive, and requires millions of data points.',
        'These limitations make effective RL training impractical for all but a handful of companies.',
        'Already, we see reasoning models struggling with problems outside of coding and math.',
        'Why do those domains work well?',
        'Because in those domains, it\'s possible to generate large amounts of synthetic data cheaply — which is crucial for RL.',
        'But that\'s not true for most real-world workflows.',
        'OpenCosmo takes a different path.',
        'Our approach finds effective, task-specific reasoning strategies using far less data — hundreds of data points instead of millions — while remaining fully compatible with the models you already use.',
        'No retraining.',
        'No fine-tuning bottlenecks.',
        'No waiting.'
      ]
    },
    {
      title: 'OpenCosmo builds on top — not into — the model',
      paragraphs: [
        'LLMs are amazing.',
        'They are not just models — they are massive, compressed databases of human knowledge.',
        'But if you use them naively, you will not reliably access that knowledge.',
        'And it\'s not just prompt optimization.',
        'You have to know what to ask — not just how to ask it.',
        'You have to extract fragments of information and synthesize them step by step — until the full answer emerges.',
        'The knowledge is there.',
        'But it is fragmented.',
        'OpenCosmo builds the intelligence layer on top of LLMs to extract, verify, and synthesize that hidden information.'
      ]
    },
    {
      title: 'Self-improvement — at the system level',
      paragraphs: [
        'Self-improvement is how we do it — quickly.',
        'The more problems OpenCosmo executes, the better it becomes at executing the next.',
        'Our systems are continuously improving.',
        'They adapt to each model\'s internal structure — its quirks, biases, and retrieval patterns — and learn how to extract and combine information more effectively over time.',
        'We do not embed intelligence into the models.',
        'We build an execution layer around them.',
        'A complete intelligent system that governs how models are used — how decisions are made — and how results are verified.'
      ]
    },
    {
      title: 'And soon — it runs itself',
      paragraphs: [
        'This is just the beginning.',
        'Soon, OpenCosmo will:',
        'Automatically refine its own reasoning strategies',
        'Improve task execution across workflows',
        'Learn from every interaction — without retraining models',
        'Recursive self-improvement — without touching the model.'
      ]
    }
  ];

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
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-6xl px-4">
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

        {/* Sticky headline + scrollable narrative */}
        <section className="mt-14 w-full max-w-6xl lg:h-screen lg:overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start h-full">
            <div className="lg:h-screen self-start flex items-center">
              <div className="w-full py-8 lg:py-0">
                <p className="text-[1.2rem] md:text-[1.35rem] font-semibold tracking-tight text-[#1b1027] dark:text-[#ececf1]">
                  Approach
                </p>
                <h2 className="mt-6 text-[1.9rem] leading-[1.04] md:text-[2.4rem] md:leading-[1.02] lg:text-[2.95rem] lg:leading-[1.02] font-medium tracking-[-0.02em] text-[#14071f] dark:text-[#ececf1]">
                  Recursive Self-Improvement is the holy grail of AI - what if it's possible to do this today?
                </h2>
              </div>
            </div>

            <div className="space-y-14 lg:pr-2 lg:h-screen lg:overflow-y-auto lg:pr-6">
              {approachSections.map((section) => (
                <article key={section.title} className="space-y-5">
                  <h3 className="text-[1.85rem] md:text-[2.4rem] leading-tight tracking-tight text-[#1b1027] dark:text-[#ececf1] font-semibold">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={`${section.title}-${paragraph}`}
                        className="text-[1.03rem] md:text-[1.12rem] leading-relaxed text-[#3e3548] dark:text-[#c7c8cf]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
