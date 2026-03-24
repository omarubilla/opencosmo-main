"use client";

import { motion } from "framer-motion";

const timeline = [
  { time: "09:31", event: "Planner Agent generated execution graph", status: "ok" },
  { time: "09:32", event: "Runtime allocated worker pool (8 workers)", status: "ok" },
  { time: "09:34", event: "Security policy blocked unsafe outbound action", status: "warn" },
  { time: "09:35", event: "Fallback strategy completed task successfully", status: "ok" },
];

const cardBase = "rounded-xl border border-white/10 bg-white/[0.03] p-5";

export default function DashboardDemoSection() {
  return (
    <section id="dashboard" className="bg-[#0b1320] px-6 py-20 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">Command Center</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Monitor running agents, inspect execution traces, and understand system health in real time.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className={cardBase}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live Metrics</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4">
                <p className="text-xs text-emerald-200">Success Rate</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-100">99.2%</p>
              </div>
              <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-4">
                <p className="text-xs text-cyan-200">Avg Latency</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-100">212ms</p>
              </div>
              <div className="rounded-lg border border-violet-400/30 bg-violet-400/10 p-4">
                <p className="text-xs text-violet-200">Active Agents</p>
                <p className="mt-2 text-2xl font-semibold text-violet-100">24</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={cardBase}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recent Timeline</p>
            <ul className="mt-4 space-y-3">
              {timeline.map((item) => (
                <li key={`${item.time}-${item.event}`} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-slate-100">{item.event}</p>
                    <span
                      className={`mt-0.5 inline-flex h-2.5 w-2.5 rounded-full ${
                        item.status === "ok" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
