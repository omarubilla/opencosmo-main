"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function ExecutionGraph() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px -20% 0px" })
  const [scanComplete, setScanComplete] = useState(false)
  const [runFinalScan, setRunFinalScan] = useState(false)

  useEffect(() => {
    if (isInView && !scanComplete) {
      setRunFinalScan(true)
    }
  }, [isInView, scanComplete])

  const nodes = [
    { x: 74, y: 212, size: "lg" },
    { x: 126, y: 145, size: "sm" },
    { x: 185, y: 120, size: "lg" },
    { x: 260, y: 121, size: "sm" },
    { x: 338, y: 151, size: "lg" },
    { x: 392, y: 205, size: "sm" },
    { x: 372, y: 262, size: "lg" },
    { x: 304, y: 244, size: "sm" },
    { x: 272, y: 287, size: "lg" },
    { x: 178, y: 275, size: "lg" },
    { x: 128, y: 241, size: "sm" },
    { x: 92, y: 220, size: "sm" },
    { x: 154, y: 191, size: "sm" },
    { x: 212, y: 176, size: "lg" },
    { x: 258, y: 208, size: "lg" },
    { x: 298, y: 173, size: "lg" },
    { x: 306, y: 307, size: "lg" },
    { x: 342, y: 289, size: "sm" },
    { x: 267, y: 349, size: "sm" },
    { x: 245, y: 305, size: "lg" },
    { x: 214, y: 320, size: "sm" },
  ]

  const connections = [
    [0, 1], [0, 11], [0, 12],
    [1, 2], [1, 12], [1, 13],
    [2, 3], [2, 13],
    [3, 4], [3, 13], [3, 15],
    [4, 5], [4, 15],
    [5, 6], [5, 7], [5, 15],
    [6, 7], [6, 17],
    [7, 8], [7, 14], [7, 15], [7, 16],
    [8, 14], [8, 16], [8, 19], [8, 20],
    [9, 10], [9, 12], [9, 14], [9, 20],
    [10, 11], [10, 12], [10, 14],
    [11, 12],
    [12, 13], [12, 14],
    [13, 14], [13, 15],
    [14, 15], [14, 19],
    [16, 17], [16, 18], [16, 19],
    [18, 19],
    [19, 20], [20, 9],
  ]

  const activeIndex = 14

  return (
    <div ref={containerRef} className="relative w-full max-w-[560px] mx-auto">
      <svg viewBox="0 0 460 390" className="w-full h-auto">
        {!scanComplete && (
          <motion.line
            key={runFinalScan ? "final-scan" : "loop-scan"}
            x1="50"
            x2="405"
            y1="110"
            y2="110"
            stroke="rgba(34,197,94,0.45)"
            strokeWidth="2.5"
            animate={runFinalScan ? { y1: 350, y2: 350 } : { y1: [110, 350, 110], y2: [110, 350, 110] }}
            transition={
              runFinalScan
                ? { duration: 2.2, ease: "easeInOut" }
                : { duration: 2.4, repeat: Infinity, ease: "linear" }
            }
            onAnimationComplete={() => {
              if (runFinalScan) {
                setScanComplete(true)
              }
            }}
          />
        )}

        {connections.map(([start, end], index) => (
          <line
            key={`line-${index}`}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="rgba(17,24,39,0.95)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        ))}

        {nodes.map((node, index) => {
          const isActive = index === activeIndex
          const radius = node.size === "lg" ? 12.5 : 8.8
          const stroke = scanComplete && isActive ? "#dc2626" : "#111827"
          const inner = scanComplete && isActive ? "#dc2626" : "#111827"

          return (
            <g key={`node-${index}`}>
              {scanComplete && isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={radius + 7}
                  fill="rgba(220,38,38,0.10)"
                  stroke="rgba(220,38,38,0.45)"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill="white"
                stroke={stroke}
                strokeWidth={node.size === "lg" ? 5.5 : 4.8}
              />
              <circle cx={node.x} cy={node.y} r={node.size === "lg" ? 2.8 : 2.2} fill={inner} />
            </g>
          )
        })}
      </svg>

      <div className="mt-4 rounded-2xl border border-black/5 bg-white/70 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="text-[22px] leading-none text-gray-500">•</span>
        <p className="text-gray-600 text-sm font-medium">{scanComplete ? "Pattern identified" : "Analyzing signal..."}</p>
        <div className="ml-auto flex items-center gap-3 min-w-[46%]">
          <div className="relative h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: "0%" }}
              animate={scanComplete ? { width: "100%" } : { width: ["38%", "66%", "52%", "62%"] }}
              transition={
                scanComplete
                  ? { duration: 0.45, ease: "easeInOut" }
                  : { duration: 2.3, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </div>
          <span className="text-xs text-gray-500 font-medium">{scanComplete ? "100%" : "62%"}</span>
        </div>
      </div>
    </div>
  )
}