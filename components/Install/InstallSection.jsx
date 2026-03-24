const pipInstall = `pip install opencosmo`;
const dockerInstall = `docker run -it --rm \\
  -p 8787:8787 \\
  ghcr.io/opencosmo/runtime:latest`;

const oneClickOptions = [
  {
    title: "Web App (Recommended)",
    detail: "Sign in, connect your tools, and launch your first workflow in under 2 minutes.",
    action: "Launch OpenCosmo Cloud",
  },
  {
    title: "Desktop App",
    detail: "Download for Mac/Windows and run a guided setup with no terminal required.",
    action: "Download Installer",
  },
];

function CodeBlock({ title, code }) {
  const lines = code.split("\n");

  return (
    <div className="rounded-xl border border-black/15 bg-white p-5">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-600">{title}</p>
      <pre className="overflow-x-auto rounded-lg border border-red-700/80 bg-white p-4 text-sm text-black">
        <code>
          {lines.map((line, index) => (
            <span key={`${title}-line-${index}`} className="block whitespace-pre">
              <span className="mr-2 text-red-500">$</span>
              <span>{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default function InstallSection() {
  return (
    <section id="install" className="bg-white px-6 py-20 text-black sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">Install in Minutes</h2>
        <p className="mt-3 max-w-2xl text-zinc-700">
          Built for teams that want results fast: start with one click, no terminal needed.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {oneClickOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-xl border border-black/15 bg-white p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">One-Click Setup</p>
              <h3 className="mt-3 text-xl font-semibold text-black">{option.title}</h3>
              <p className="mt-2 text-sm text-zinc-700">{option.detail}</p>
              <button
                type="button"
                className="mt-5 rounded-lg border border-red-700/80 px-4 py-2 text-sm font-medium text-black transition hover:bg-red-700/10"
              >
                {option.action}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-black/10 bg-zinc-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Advanced / Developer Setup</p>
          <p className="mt-2 text-sm text-zinc-700">
            For technical teams, CLI install is still available.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <CodeBlock title="Python SDK" code={pipInstall} />
            <CodeBlock title="Docker Runtime" code={dockerInstall} />
          </div>
        </div>
      </div>
    </section>
  );
}
