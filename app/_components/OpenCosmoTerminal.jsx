"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const lines = [
	'› Task received: "Approve refund #7821, $2,400"',
	"",
	"OpenCosmo orchestrates:",
	"",
	"⚙ Planner Agent → classify_intent(financial_refund)",
	"⚙ Policy Agent  → threshold_check($2,000 limit)",
	"⚙ Context Agent → crm_lookup(customer_id=8821)",
	"⚙ Risk Engine   → score: 0.12 (low)",
	"",
	"⚠ Execution Gate → human_approval_required",
	"",
	"→ Graph state: PARTIAL_EXECUTION",
	"→ Escalation event emitted",
	"→ Slack webhook: #finance-approvals",
	"→ Trace ID: a9f8c3d7 | deterministic",
	"→ Execution committed to ledger",
]

export default function OpenCosmoTerminal({ className = "" }) {
	const [visibleLines, setVisibleLines] = useState(0)

	useEffect(() => {
		if (visibleLines < lines.length) {
			const timeout = setTimeout(() => {
				setVisibleLines((prev) => prev + 1)
			}, 350)

			return () => clearTimeout(timeout)
		}
	}, [visibleLines])

	return (
		<div className={`w-full max-w-4xl mx-auto ${className}`}>
			<div className="bg-[#0b0f1c] rounded-2xl shadow-2xl border border-white/5 overflow-hidden">
				<div className="flex items-center justify-between px-5 py-3 bg-[#11162a] border-b border-white/5">
					<div className="flex gap-2">
						<div className="w-3 h-3 rounded-full bg-red-500/80" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<div className="w-3 h-3 rounded-full bg-green-500/80" />
					</div>
					<div className="text-xs text-white/40 font-mono tracking-wide">
						opencosmo execution fabric | cluster-01 | live
					</div>
					<div />
				</div>

				<div className="p-6 font-mono text-sm text-white/80 min-h-[420px]">
					{lines.slice(0, visibleLines).map((line, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 4 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.25 }}
							className="whitespace-pre-wrap leading-relaxed"
						>
							{line.startsWith("⚙") ? (
								<>
									<span className="text-green-400">⚙</span>
									{line.slice(1)}
								</>
							) : line.startsWith("⚠") ? (
								<>
									<span className="text-yellow-400">⚠</span>
									{line.slice(1)}
								</>
							) : line.startsWith("→") ? (
								<>
									<span className="text-teal-400">→</span>
									{line.slice(1)}
								</>
							) : line.includes("OpenCosmo") ? (
								<>
									<span className="text-[var(--brand-red)]">🔺</span>
									{line.replace("OpenCosmo", " OpenCosmo")}
								</>
							) : (
								line
							)}
						</motion.div>
					))}

					{visibleLines < lines.length && (
						<span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" />
					)}
				</div>
			</div>
		</div>
	)
}
