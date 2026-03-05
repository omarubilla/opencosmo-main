export function Stats() {
  const stats = [
    { value: "Agents don't drift", label: "Continuous Monitoring" },
    { value: "Actions stay within policy", label: "Policy Enforcement" },
    { value: "Humans remain in control", label: "Kill Switch Ready" },
    { value: "Every execution is traceable", label: "Full Audit Logs" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-red-hover)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 inline-flex items-center gap-2"><span className="inline-flex w-[1em] h-[1em]" aria-hidden="true"><svg viewBox="0 0 24 24" className="w-full h-full"><polygon points="12,3 22,21 2,21" fill="white" /></svg></span>OpenCosmo ensures</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-[var(--brand-red-muted)] text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
