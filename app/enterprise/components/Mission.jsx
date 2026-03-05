import { Target, Building2, GitBranch, Shield } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Enterprises deploying AI agents into production",
    description: "Large organizations scaling AI across operations",
  },
  {
    icon: GitBranch,
    title: "AI-native startups scaling agentic workflows",
    description: "Fast-growing companies building on AI foundations",
  },
  {
    icon: Target,
    title: "Ops teams integrating LLMs into internal systems",
    description: "Technical teams implementing AI capabilities",
  },
  {
    icon: Shield,
    title: "CTOs who want control, not chaos",
    description: "Leadership prioritizing safe, controlled AI deployment",
  },
];

export function Mission() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#001121] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[#ececf1] mb-6">Our Mission</h2>
          <div className="text-xl text-gray-700 dark:text-[#c7c8cf] space-y-4 mb-8">
            <p>
              AI agents will increasingly operate businesses, access sensitive systems, coordinate across teams, and
              make operational decisions.
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-[#ececf1]">
              <span className="text-[var(--brand-red)]">🔺</span> OpenCosmo ensures that as autonomy increases, control increases with it.
            </p>
            <p className="text-lg text-gray-600 dark:text-[#c7c8cf] italic">
              We are building the infrastructure layer between AI capability and enterprise reality.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-[var(--brand-red-soft)] rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-[#ececf1] mb-6 text-center">Core Philosophy</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-center">
            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-900 dark:text-[#ececf1]">Power without control is risk.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-900 dark:text-[#ececf1]">Autonomy without oversight is liability.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700 dark:text-[#c7c8cf] font-medium"><span className="text-[var(--brand-red)]">🔺</span> OpenCosmo enables:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <span className="px-6 py-3 bg-white dark:bg-[#17171b] rounded-full font-semibold text-gray-900 dark:text-[#ececf1] shadow-sm">Safer autonomy</span>
              <span className="px-6 py-3 bg-white dark:bg-[#17171b] rounded-full font-semibold text-gray-900 dark:text-[#ececf1] shadow-sm">Structured execution</span>
              <span className="px-6 py-3 bg-white dark:bg-[#17171b] rounded-full font-semibold text-gray-900 dark:text-[#ececf1] shadow-sm">Human-commanded AI</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-[#ececf1] mb-10 text-center">Who It's For</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:border-[var(--brand-red-border-strong)] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[var(--brand-red-soft)] rounded-lg flex items-center justify-center">
                      <Icon className="text-[var(--brand-red)]" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-[#ececf1] mb-1">{audience.title}</h4>
                    <p className="text-gray-600 dark:text-[#c7c8cf] text-sm">{audience.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-[#ececf1] mb-8 text-center">Our Journey</h3>
          <div className="space-y-6">
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 font-bold text-[var(--brand-red)] text-lg">2024</div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-[#c7c8cf]"><span className="text-[var(--brand-red)]">🔺</span> OpenCosmo experimentation with LLM hallucinations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 font-bold text-[var(--brand-red)] text-lg">2025</div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-[#c7c8cf]">Transition to enterprise execution infrastructure → autonomous desktop chat agent control</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 font-bold text-[var(--brand-red)] text-lg">2026</div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-[#c7c8cf] font-semibold"><span className="text-[var(--brand-red)]">🔺</span> OpenCosmo AEP launched for controlled agent orchestration</p>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center space-y-2">
            <p className="text-lg text-gray-700 dark:text-[#c7c8cf] font-medium">Built in Silicon Valley.</p>
            <p className="text-lg text-gray-700 dark:text-[#c7c8cf] font-medium">Inspired by real-world AI failures.</p>
            <p className="text-lg text-gray-700 dark:text-[#c7c8cf] font-medium">Designed for operators and winning teams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
