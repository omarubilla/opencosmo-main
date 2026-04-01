"use client"
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import LandingHero from "./_components/LandingHero";
import ChatInputBox2 from "./_components/ChatInputBox2";
import TopNav from "./_components/TopNav";
import OpenCosmoTerminal from "./_components/OpenCosmoTerminal";
import LandingFooter from "./_components/LandingFooter";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded } = useUser();
  const enterpriseRef = useRef(null);

  const handleEnterpriseClick = () => {
    enterpriseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] dark:from-[#001121] dark:via-[#001121] dark:to-[#001121] flex items-center justify-center">
        <div className="text-[#4a4540] dark:text-[#ececf1]">Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="overflow-x-hidden">
        <TopNav />
        <div className="pt-16">
          <ChatInputBox2 />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="overflow-x-hidden">
        <TopNav />

        <div className="pt-16 bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] dark:from-[#001121] dark:via-[#001121] dark:to-[#001121]">
        <LandingHero onDemoClick={() => {}} onEnterpriseClick={handleEnterpriseClick} />
        <section className="w-full px-6 py-20 flex flex-col items-center justify-center">
          <div className="text-center space-y-6 mb-12 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light text-[#4a4540] dark:text-[#ececf1] tracking-tight">
              Introducing a new framework
              <span className="block mt-2 font-semibold">Agent Execution Protocol (AEP)</span>
            </h2>
            <p className="text-lg md:text-xl text-[#7d7268] dark:text-[#c7c8cf] font-light leading-relaxed">
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
        <section
          id="enterprise-section"
          ref={enterpriseRef}
          className="w-full py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-[var(--brand-red-soft)] text-[var(--brand-red)] rounded-full text-sm font-medium">
                  OpenCosmo Enterprise
                </div>

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-[#ececf1] leading-tight">
                  The Command Center for
                  <span className="block bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-red-hover)] bg-clip-text text-transparent">
                    Enterprise AI Agents
                  </span>
                </h2>

                <p className="text-xl text-gray-600 dark:text-[#c7c8cf] leading-relaxed">
                  Your agents execute. OpenCosmo makes sure they align, coordinate, and stay under control.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white text-lg px-8 py-4 rounded-md transition-colors">
                    Book a Strategy Call
                    <ArrowRight size={20} />
                  </button>
                  <a
                    href="/enterprise#enterprise"
                    className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-md border border-gray-300 dark:border-[#2b2f36] bg-white dark:bg-[#17171b] text-black dark:text-[#ececf1] hover:bg-gray-50 dark:hover:bg-[#202028] transition-colors"
                  >
                    <Play size={20} />
                    Learn more
                  </a>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-[#ececf1]">2024</div>
                    <div className="text-sm text-gray-600 dark:text-[#c7c8cf]">Founded</div>
                  </div>
                  <div className="h-12 w-px bg-gray-300 dark:bg-[#2b2f36]"></div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-[#ececf1]">100%</div>
                    <div className="text-sm text-gray-600 dark:text-[#c7c8cf]">Traceable</div>
                  </div>
                  <div className="h-12 w-px bg-gray-300 dark:bg-[#2b2f36]"></div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-[#ececf1]">Enterprise</div>
                    <div className="text-sm text-gray-600 dark:text-[#c7c8cf]">Grade</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <OpenCosmoTerminal className="mt-0" />
              </div>
            </div>
          </div>
        </section>
        <LandingFooter />
        </div>
      </div>
    );
  }
}
