import { ArrowRight, Play } from "lucide-react";
import OpenCosmoTerminal from "../../_components/OpenCosmoTerminal";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-[#001121] dark:to-[#001121] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-[var(--brand-red-soft)] text-[var(--brand-red)] rounded-full text-sm font-medium">
              OpenCosmo Enterprise
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-[#ececf1] leading-tight">
              The Command Center for
              <span className="block bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-red-hover)] bg-clip-text text-transparent">
                Enterprise AI Agents
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-[#c7c8cf] leading-relaxed">
              Your agents execute. OpenCosmo makes sure they align, coordinate, and stay under control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white text-lg px-8 py-4 rounded-md transition-colors">
                Book a Strategy Call
                <ArrowRight size={20} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-md border border-gray-300 dark:border-[#2b2f36] bg-white dark:bg-[#17171b] text-black dark:text-[#ececf1] hover:bg-gray-50 dark:hover:bg-[#202028] transition-colors">
                <Play size={20} />
                See How It Works
              </button>
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
  );
}
