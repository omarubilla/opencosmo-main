import { ShieldCheck, Workflow, MemoryStick, Bot, Gauge, Code2 } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Run on your infra with role-scoped controls, audit trails, and encrypted agent state by default.",
  },
  {
    icon: Workflow,
    title: "Orchestrated Workflows",
    description: "Compose multi-step agent pipelines with deterministic routing and failover strategies.",
  },
  {
    icon: MemoryStick,
    title: "Persistent Memory",
    description: "Store project and user memory across sessions so agents improve over time.",
  },
  {
    icon: Bot,
    title: "Multi-Agent Runtime",
    description: "Coordinate specialized agents that collaborate on planning, coding, QA, and support tasks.",
  },
  {
    icon: Gauge,
    title: "Live Observability",
    description: "Track events, latency, tool usage, and outcomes through unified real-time telemetry.",
  },
  {
    icon: Code2,
    title: "Developer-First API",
    description: "Integrate with a typed SDK, CLI commands, and webhooks that fit into existing stacks.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#0c1522] px-6 py-20 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold sm:text-4xl">Core Capabilities</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Build production AI systems with modular primitives designed for reliability, safety, and speed.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6"
              >
                <div className="mb-4 inline-flex rounded-md bg-cyan-400/15 p-2 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
