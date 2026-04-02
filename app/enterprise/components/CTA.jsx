"use client";

import { ArrowRight } from "lucide-react";

function normalizeCalendlyUrl(rawUrl) {
  if (!rawUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(rawUrl)) {
    return rawUrl;
  }

  return `https://${rawUrl}`;
}

export function CTA() {
  const calendlyUrl = normalizeCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL || "");

  return (
    <section className="bg-[#2B2D31] px-4 py-24 transition-colors dark:bg-[#001121] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">Ready to take control of your AI agents?</h2>
        <p className="mb-10 text-xl leading-relaxed text-gray-300">
          Join enterprises and AI-native companies building with confidence. Let's discuss how OpenCosmo can secure and
          scale your agent infrastructure.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={calendlyUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand-red)] px-8 py-4 text-lg text-white transition-colors hover:bg-[var(--brand-red-hover)] disabled:pointer-events-none disabled:opacity-60"
            aria-disabled={!calendlyUrl}
          >
            Book a Strategy Call
            <ArrowRight size={20} />
          </a>
          {/* <button className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-md transition-colors">
            View Documentation
          </button> */}
        </div>
        {!calendlyUrl ? (
          <p className="mt-4 text-sm text-[#f2c7cd]">
            Calendly URL missing. Add `NEXT_PUBLIC_CALENDLY_URL` in your env to enable booking.
          </p>
        ) : null}
        <p className="mt-6 text-sm text-gray-400">
          Built for operators, not researchers • Enterprise-grade security • Silicon Valley based
        </p>
      </div>
    </section>
  );
}
