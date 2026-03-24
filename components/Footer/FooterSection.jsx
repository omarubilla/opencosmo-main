export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-[#08101a] px-6 py-14 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">OpenCosmo</p>
          <h3 className="mt-3 max-w-xl text-2xl font-semibold">Ready to orchestrate your AI workforce?</h3>
          <p className="mt-2 text-sm text-slate-300">Deploy with confidence on infrastructure you control.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            GitHub
          </a>
          <a
            href="https://docs.openclaw.ai"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            Docs
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
