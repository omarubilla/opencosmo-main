import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2B2D31] dark:bg-[#001121] transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to take control of your AI agents?</h2>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
          Join enterprises and AI-native companies building with confidence. Let's discuss how OpenCosmo can secure and
          scale your agent infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white text-lg px-8 py-4 rounded-md transition-colors">
            Book a Strategy Call
            <ArrowRight size={20} />
          </button>
          {/* <button className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-md transition-colors">
            View Documentation
          </button> */}
        </div>
        <p className="text-gray-400 mt-6 text-sm">
          Built for operators, not researchers • Enterprise-grade security • Silicon Valley based
        </p>
      </div>
    </section>
  );
}
