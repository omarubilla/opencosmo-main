const risks = [
  "Prompt injection and tool misuse",
  "Secrets leakage from runtime context",
  "Untracked agent side effects",
  "Lateral movement across tenant boundaries",
];

const mitigations = [
  "Policy engine for tool-level allow/deny rules",
  "Isolated execution with signed action logs",
  "Role-based access with scoped credentials",
  "Anomaly detection and automated kill-switches",
];

export default function SecuritySection() {
  return (
    <section id="security" className="bg-[#0d1826] px-6 py-20 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">Security and Trust Layer</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          OpenCosmo is built with operational safeguards for real-world production workloads.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-rose-400/20 bg-rose-500/5 p-6">
            <h3 className="text-lg font-semibold text-rose-200">Common Risks</h3>
            <ul className="mt-4 space-y-2 text-sm text-rose-100/90">
              {risks.map((risk) => (
                <li key={risk} className="rounded-md border border-rose-300/15 bg-black/20 px-3 py-2">
                  {risk}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-6">
            <h3 className="text-lg font-semibold text-emerald-200">OpenCosmo Mitigations</h3>
            <ul className="mt-4 space-y-2 text-sm text-emerald-100/90">
              {mitigations.map((mitigation) => (
                <li key={mitigation} className="rounded-md border border-emerald-300/15 bg-black/20 px-3 py-2">
                  {mitigation}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
