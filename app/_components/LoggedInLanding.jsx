'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Zap, Plus, Play, Trash2, Edit, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function LoggedInLanding() {
  const { user } = useUser();
  const router = useRouter();
  const enterpriseRef = useRef(null);

  const handleEnterpriseClick = () => {
    enterpriseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-screen w-full bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e8e0d5] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e8e0d5] rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl px-4">
          <div className="text-center space-y-4 mt-16">
            <h1 className="text-5xl md:text-6xl font-light text-[#4a4540] tracking-tight">
              Welcome back, {user?.firstName || 'User'}
              <span className="block mt-2 font-extralight italic text-[#6b6158]">
                Let's build something powerful
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#7d7268] font-light mt-6 leading-relaxed">
              Create and manage your AI agents with ease
            </p>
          </div>

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
                <svg className="w-6 h-6 text-[#d4af84] opacity-30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10 4 8 6 8 9c0 2 1 3 2 4-1 0-2 1-2 2s1 2 2 2c-1 1-2 2-2 4 0 3 2 5 4 7-2-2-4-4-4-7 0-2 1-3 2-4-1 0-2-1-2-2s1-2 2-2c-1-1-2-2-2-4 0-3 2-5 4-7z"/>
                </svg>

                <button
                  className="w-9 h-9 flex items-center justify-center bg-[#f5f2ed] text-[#c89f5b] rounded-full transition-all"
                  style={{
                    boxShadow: '6px 6px 12px #d4cec3, -6px -6px 12px #ffffff'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
                  onMouseUp={(e) => e.currentTarget.style.boxShadow = '6px 6px 12px #d4cec3, -6px -6px 12px #ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '6px 6px 12px #d4cec3, -6px -6px 12px #ffffff'}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <svg className="w-6 h-6 text-[#d4af84] opacity-30" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'scaleX(-1)' }}>
                  <path d="M12 2C10 4 8 6 8 9c0 2 1 3 2 4-1 0-2 1-2 2s1 2 2 2c-1 1-2 2-2 4 0 3 2 5 4 7-2-2-4-4-4-7 0-2 1-3 2-4-1 0-2-1-2-2s1-2 2-2c-1-1-2-2-2-4 0-3 2-5 4-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group relative px-8 py-3 rounded-full bg-[#c89f5b] text-white font-medium text-sm tracking-wide transition-all flex items-center gap-2"
              style={{
                boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
              }}
            >
              <Zap className="w-4 h-4" />
              View Agents
            </Link>

            <Link
              href="/agent"
              className="group relative px-8 py-3 rounded-full bg-[#f5f2ed] text-[#4a4540] font-medium text-sm tracking-wide transition-all flex items-center gap-2 border-2 border-[#c89f5b]"
              style={{
                boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
              }}
            >
              <Plus className="w-4 h-4" />
              Create Agent
            </Link>
          </div>

          {/* Agent Info Cards */}
          <div className="mt-12 w-full max-w-3xl grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border border-[#e8dcc4] text-center">
              <p className="text-2xl font-light text-[#c89f5b] mb-1">0</p>
              <p className="text-xs text-[#7d7268]">Active Agents</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[#e8dcc4] text-center">
              <p className="text-2xl font-light text-[#c89f5b] mb-1">0</p>
              <p className="text-xs text-[#7d7268]">Total Runs</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[#e8dcc4] text-center">
              <p className="text-2xl font-light text-[#c89f5b] mb-1">Pro</p>
              <p className="text-xs text-[#7d7268]">Plan</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af84]/30 to-transparent"></div>
      </div>

      {/* Agent Control Plane Section */}
      <section className="w-full bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] px-6 py-20 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 mb-12 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-light text-[#4a4540] tracking-tight">
            Introducing a new framework
            <span className="block mt-2 font-semibold">Agent Execution Protocol (AEP)</span>
          </h2>
          <p className="text-lg md:text-xl text-[#7d7268] font-light leading-relaxed">
            Deterministic execution and supervision of agents in the real world
          </p>
        </div>
        <div className="w-full max-w-2xl drop-shadow-2xl rounded-lg overflow-hidden">
          <div className="relative w-full">
            <Image
              src="/opencosmo_aep.png?v=20260327"
              alt="OpenCosmo AEP"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section
        ref={enterpriseRef}
        className="w-full bg-[#f5f2ed] px-6 py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#4a4540] tracking-tight">
            Enterprise Demo
          </h2>
          <p className="mt-4 text-lg text-[#7d7268] font-light">
            Secure, scalable, and tailored for high-impact teams.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#4a4540] text-[#f5f2ed] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">OpenCosmo</h3>
              <p className="text-sm font-light">Agent Execution Protocol</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="text-sm font-light space-y-1">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="text-sm font-light space-y-1">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="text-sm font-light space-y-1">
                <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#6b6158] text-center text-sm font-light">
            <p>&copy; 2026 OpenCosmo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
