import { Shield, Eye, Network, Activity, Layers, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Controlled Execution",
    description: "Agents cannot take actions without passing through enforceable policies and runtime checks.",
  },
  {
    icon: Eye,
    title: "Human-in-the-Loop Guardrails",
    description: "High-impact actions require explicit approval. Built-in kill switch and override controls.",
  },
  {
    icon: Network,
    title: "Cross-Agent Coordination",
    description: "Multiple agents operate within a shared execution environment — not isolated prompt silos.",
  },
  {
    icon: Activity,
    title: "Operational Observability",
    description: "Full logs of tool calls, reasoning traces, execution flows, and system state.",
  },
  {
    icon: Layers,
    title: "Multi-Model Compatibility",
    description: "Works with Claude, OpenAI, local models, and internal enterprise systems.",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Controls",
    description: "Deploy in VPC, on-prem, or hybrid environments with complete security and compliance.",
  },
];

export function Features() {
  return (
    <section id="enterprise" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#001121] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-[#2b2f36] bg-white dark:bg-[#17171b] mb-8">
            <img
              src="/opencosmo_aep.png"
              alt="OpenCosmo AEP"
              className="w-full h-auto"
            />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[#ececf1] mb-4">The Agent Execution Protocol (AEP)</h2>
          <p className="text-xl text-gray-600 dark:text-[#c7c8cf] max-w-3xl mx-auto">
            A centralized layer that sits between users, models, and tools — enabling controlled execution,
            coordination, and complete observability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 dark:border-[#2b2f36] hover:border-[var(--brand-red-border-strong)] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[var(--brand-red-soft)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--brand-red)] transition-colors duration-300">
                  <Icon className="text-[var(--brand-red)] group-hover:text-white transition-colors duration-300" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#ececf1] mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-[#c7c8cf] leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
