import { CheckCircle2 } from "lucide-react";
import ExecutionGraph from "../../_components/ExecutionGraph";
import EnterpriseControls from "../../_components/custom-landing/EnterpriseControls";

export function Solutions() {
  return (
    <section id="developers" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#001121] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#17171b] p-4">
              <ExecutionGraph />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-block px-4 py-2 bg-[var(--brand-red-soft)] text-[var(--brand-red)] rounded-full text-sm font-medium">
              Why <span className="text-[var(--brand-red)]">⭕</span> OpenCosmo Exists
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-[#ececf1]">Enterprise agents don't fail because of intelligence</h2>
            <p className="text-lg text-gray-600 dark:text-[#c7c8cf] leading-relaxed">They fail because of lack of orchestration and control.</p>
            <div className="space-y-4 text-gray-700 dark:text-[#c7c8cf]">
              <p>
                Once agents can send emails, query production databases, trigger workflows, and make financial or
                operational decisions...
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-[#ececf1]">You need more than prompts.</p>
              <p className="text-2xl font-bold text-[var(--brand-red)]">You need infrastructure.</p>
            </div>
            <button className="mt-4 px-6 py-3 rounded-md bg-[#2B2D31] hover:bg-[#1A1B1E] text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-[var(--brand-red-soft)] text-[var(--brand-red)] rounded-full text-sm font-medium">
              Enterprise-Grade Controls
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-[#ececf1]">Designed for real operational environments</h2>
            <p className="text-lg text-gray-600 dark:text-[#c7c8cf] leading-relaxed">
              Not just demos. <span className="text-[var(--brand-red)]">⭕</span> OpenCosmo is built for teams deploying agents in production.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--brand-red)] flex-shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#ececf1]">Role-Based Access Control</div>
                  <div className="text-gray-600 dark:text-[#c7c8cf]">Define who can deploy, approve, or override agent behavior</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--brand-red)] flex-shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#ececf1]">Execution Logging & Replay</div>
                  <div className="text-gray-600 dark:text-[#c7c8cf]">Every action is recorded and can be replayed or audited</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--brand-red)] flex-shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#ececf1]">Policy Enforcement Layer</div>
                  <div className="text-gray-600 dark:text-[#c7c8cf]">Define guardrails in plain language or structured policies</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[var(--brand-red)] flex-shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#ececf1]">Secure Deployment</div>
                  <div className="text-gray-600 dark:text-[#c7c8cf]">Deploy in VPC, on-prem, or hybrid environments</div>
                </div>
              </li>
            </ul>
            <button className="mt-4 px-6 py-3 rounded-md bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white transition-colors">
              Book a Strategy Call
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#17171b] p-4">
            <EnterpriseControls />
          </div>
        </div>
      </div>
    </section>
  );
}
