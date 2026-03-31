"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  UserRound,
  PhoneCall,
  Phone,
  Sparkles,
  Building2,
  MoveRight,
} from "lucide-react";
import { verticalConfig, verticalOrder } from "../verticalConfig";

const omni = {
  paper: "#f4efe6",
  panel: "#efe6d8",
  panelSoft: "#f8f3ea",
  ink: "#171717",
  olive: "#7b8c62",
  burnt: "#c9754c",
  lavender: "#9292bf",
  sand: "#dfccb1",
  slate: "#5f6882",
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
};

const scaleCards = [
  {
    title: "Agent Orchestration",
    description: "Coordinate complex workflows across multiple agents and systems.",
    image: "/web.png",
    imageAlt: "Orchestration network icon",
  },
  {
    title: "Tool & Data Integration",
    description: "Connect 1000+ tools and unify your data for seamless execution.",
    image: "/puzzle.png",
    imageAlt: "Tool and data integration puzzle icon",
  },
  {
    title: "Observability & Control",
    description: "Monitor, debug, and optimize agent performance in real time.",
    image: "/graph.png",
    imageAlt: "Observability and control graph icon",
  },
];

function SystemsEditorialArt({ accent, secondary, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border-2 border-[#1a1a1a]/80 bg-[#f2ede3] ${className}`}>
      <svg viewBox="0 0 720 430" className="h-auto w-full" role="img" aria-label="OpenCosmo editorial systems art">
        <rect x="0" y="0" width="720" height="430" fill="#f2ede3" />

        <rect x="565" y="58" width="95" height="220" rx="12" fill="#e5d8c7" />
        <path d="M607 90 L620 145 L594 214" stroke="#171717" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="598" cy="135" rx="16" ry="34" fill="#30482c" transform="rotate(-15 598 135)" />
        <ellipse cx="618" cy="192" rx="16" ry="34" fill="#30482c" transform="rotate(10 618 192)" />

        <circle cx="332" cy="152" r="79" fill={accent} opacity="0.82" />
        <path d="M252 244 C328 317, 438 298, 503 204" stroke="#171717" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M214 159 C311 14, 540 39, 498 206" stroke="#171717" strokeWidth="4" fill="none" strokeLinecap="round" />

        <rect x="230" y="180" width="58" height="58" rx="8" fill="#7b8c62" />
        <polygon points="286,320 343,252 390,320" fill="#9396c2" />
        <rect x="204" y="294" width="56" height="56" rx="7" fill="#dfccb1" transform="rotate(-45 232 322)" />

        <circle cx="216" cy="134" r="14" fill="#9396c2" />
        <circle cx="448" cy="267" r="13" fill="#414141" />
        <circle cx="484" cy="136" r="10" fill="#2b2b2b" />
        <line x1="230" y1="145" x2="266" y2="168" stroke="#222" strokeWidth="3" />
        <line x1="289" y1="207" x2="386" y2="176" stroke="#222" strokeWidth="3" strokeDasharray="4 6" />

        <g transform="translate(458,105)">
          <path d="M-36 116 L9 45 Q22 24 50 20 L99 19 Q116 20 126 29 L135 38 Q141 45 141 55 L136 127 Q135 140 126 149 L114 160 Q103 167 91 166 L46 162 Q27 160 20 149 Z" fill="#171717" />
          <path d="M-34 111 L7 46 Q22 27 50 24 L102 23 Q113 24 122 33 L129 43 L128 126 Q126 145 109 159 L46 159 Q22 157 14 145 Z" fill="#f8f3ea" />
          <path d="M101 36 Q144 43 149 92 L148 132 Q146 157 118 166 L101 166 Z" fill="#171717" />
          <ellipse cx="52" cy="87" rx="24" ry="12" fill="#111" />
          <circle cx="52" cy="87" r="5" fill="#f4efe6" />
          <path d="M-10 170 Q18 159 53 159 Q90 159 110 171 L110 255 L-10 255 Z" fill="#7b8c62" />
        </g>

        <path d="M42 363 C204 346, 432 352, 672 360" stroke="#1b1b1b" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M160 196 L233 206" stroke="#1a1a1a" strokeWidth="3" markerEnd="url(#arrow)" />

        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill={secondary} />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function SMBsLanding() {
  const [activeVerticalKey, setActiveVerticalKey] = useState("funeral");
  const activeVertical = useMemo(() => verticalConfig[activeVerticalKey], [activeVerticalKey]);

  return (
    <main className="relative overflow-hidden" style={{ backgroundColor: omni.paper, color: omni.ink }}>
      <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden="true">
        <div className="absolute -top-36 left-[12%] h-[24rem] w-[24rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,117,76,0.18) 0%, rgba(201,117,76,0) 72%)" }} />
        <div className="absolute top-[28rem] right-[6%] h-[20rem] w-[20rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(123,140,98,0.2) 0%, rgba(123,140,98,0) 72%)" }} />
        <div className="absolute bottom-20 left-[35%] h-[16rem] w-[16rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(146,146,191,0.2) 0%, rgba(146,146,191,0) 74%)" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1220px] flex-col px-5 pb-24 pt-28 md:px-8">
        <section className="p-0 md:p-0">
          <motion.div {...fadeUp} className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <p className="text-[1.7rem] md:text-[2rem] font-medium tracking-tight">OpenCosmo SMB</p>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
                The Execution Layer for AI Agents
                <span className="block" style={{ color: omni.olive }}>
                  Built for Innovators.
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: omni.slate }}>
                Orchestrate, connect, and deploy AI agents across tools and teams.
                OpenCosmo is the control plane for real-world execution.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="inline-flex rounded-xl border-2 border-[#171717] bg-[#171717] px-7 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
                >
                  Start Building
                </a>
                <a
                  href="#"
                  className="inline-flex rounded-xl border-2 border-[#171717] px-7 py-3 text-sm font-semibold transition hover:translate-y-[-1px]"
                  style={{ backgroundColor: omni.paper }}
                >
                  Explore the Docs
                </a>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full"
            >
              <Image
                src="/cosmo_artsy.png"
                alt="OpenCosmo editorial hero art"
                width={1200}
                height={720}
                priority
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </motion.div>

          <div className="mt-12">
            <div className="mb-6 max-w-4xl">
              <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">Everything You Need to Run AI at Scale</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {scaleCards.map((card) => (
                <motion.article
                  key={card.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-[20px] border-2 border-[#1d1d1d] p-6"
                  style={{ backgroundColor: omni.panelSoft }}
                >
                  <div className="mb-4 h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h4 className="text-[1.75rem] md:text-[2rem] leading-tight font-semibold tracking-tight">{card.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: omni.slate }}>
                    {card.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <motion.section {...fadeUp} className="mt-14 rounded-[30px] border-2 border-[#1f1f1f]/80 p-6 md:p-8" style={{ backgroundColor: omni.panel }}>
          <div className="flex flex-wrap gap-2 border-b-2 border-[#1f1f1f]/40 pb-4">
            {verticalOrder.map((verticalKey) => {
              const item = verticalConfig[verticalKey];
              const active = verticalKey === activeVerticalKey;
              return (
                <button
                  key={verticalKey}
                  onClick={() => setActiveVerticalKey(verticalKey)}
                  className="rounded-xl border-2 px-4 py-2 text-sm font-medium transition"
                  style={
                    active
                      ? {
                          borderColor: "#1a1a1a",
                          backgroundColor: omni.paper,
                          color: omni.ink,
                        }
                      : {
                          borderColor: "rgba(23,23,23,0.45)",
                          backgroundColor: "rgba(244,239,230,0.35)",
                          color: omni.slate,
                        }
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeVerticalKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.14em]" style={{ color: activeVertical.secondary }}>
                {activeVertical.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{activeVertical.headline}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: omni.slate }}>
                {activeVertical.description}
              </p>
              <p className="mt-5 text-sm" style={{ color: omni.ink }}>{activeVertical.useCase}</p>
            </div>
            {activeVertical.image ? (
              <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[28px] border-2 border-[#1a1a1a]/80 bg-[#f2ede3]">
                <Image
                  src={activeVertical.image}
                  alt={activeVertical.imageAlt || `${activeVertical.label} visual`}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-contain"
                />
              </div>
            ) : (
              <SystemsEditorialArt accent={activeVertical.accent} secondary={activeVertical.secondary} className="max-w-[520px]" />
            )}
          </motion.div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-16 rounded-[30px] border-2 border-[#1f1f1f]/80 p-6 md:p-8" style={{ backgroundColor: omni.panelSoft }}>
          <div className="mb-7 flex items-center justify-between gap-4">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Talk to your AI agent right now</h3>
            <span className="rounded-xl border-2 border-[#171717] px-4 py-1 text-xs uppercase tracking-[0.16em]" style={{ color: omni.burnt }}>
              Live Demo
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[22px] border-2 border-[#1f1f1f]/80 p-5" style={{ backgroundColor: omni.paper }}>
              <label className="text-sm" htmlFor="demo-phone" style={{ color: omni.slate }}>Phone number</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-[#1f1f1f]/50 bg-white/50 px-4 py-3">
                <Phone className="h-4 w-4" style={{ color: omni.olive }} />
                <input
                  id="demo-phone"
                  type="tel"
                  placeholder="+1 555 123 4567"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#8f94ab]"
                />
              </div>

              <label className="mt-4 block text-sm" htmlFor="demo-name" style={{ color: omni.slate }}>Name</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-[#1f1f1f]/50 bg-white/50 px-4 py-3">
                <UserRound className="h-4 w-4" style={{ color: omni.olive }} />
                <input
                  id="demo-name"
                  type="text"
                  placeholder="Your first name"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#8f94ab]"
                />
              </div>

              <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-[#171717] px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]">
                <PhoneCall className="h-4 w-4" />
                Get a Call
              </button>
            </div>

            <div className="rounded-[22px] border-2 border-[#1f1f1f]/80 p-4" style={{ backgroundColor: omni.paper }}>
              <p className="mb-3 text-xs uppercase tracking-[0.14em]" style={{ color: omni.slate }}>Agent Modes</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Funeral",
                  "Law",
                  "Sales",
                  "Coaching",
                ].map((mode, index) => (
                  <button
                    key={mode}
                    className="rounded-xl border-2 px-4 py-4 text-left text-sm font-medium transition"
                    style={
                      index === 0
                        ? {
                            borderColor: "#1d1d1d",
                            backgroundColor: "rgba(123,140,98,0.2)",
                            color: omni.ink,
                          }
                        : {
                            borderColor: "rgba(23,23,23,0.5)",
                            backgroundColor: "rgba(255,255,255,0.45)",
                            color: omni.slate,
                          }
                    }
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-16 rounded-[30px] border-2 border-[#1f1f1f]/80 p-6 md:p-8" style={{ backgroundColor: omni.panel }}>
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Describe your business",
                body: "Tell us your workflows, tone, and customer journey in plain language.",
                icon: Building2,
              },
              {
                title: "We generate your AI presence",
                body: "OpenCosmo composes voice, avatar, memory, and behavior into one deployable identity.",
                icon: Sparkles,
              },
              {
                title: "It starts working instantly",
                body: "Your agent begins handling intake, follow-up, and scheduling within minutes.",
                icon: PhoneCall,
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-2xl border-2 border-[#1f1f1f]/75 p-5" style={{ backgroundColor: omni.paper }}>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#1f1f1f]" style={{ backgroundColor: "rgba(201,117,76,0.2)" }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: omni.slate }}>Step {index + 1}</p>
                  <h4 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: omni.slate }}>{step.body}</p>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-16 rounded-[30px] border-2 border-[#1f1f1f]/85 p-8" style={{ backgroundColor: omni.panelSoft }}>
          <p className="text-xs uppercase tracking-[0.16em]" style={{ color: omni.slate }}>Social Proof</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Businesses are replacing static websites with living AI
          </h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { value: "2 min", label: "to deploy" },
              { value: "24/7", label: "availability" },
              { value: "10x", label: "engagement" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-full border-2 border-[#1f1f1f] p-8 text-center" style={{ backgroundColor: omni.paper }}>
                <p className="text-4xl font-semibold tracking-tight">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.1em]" style={{ color: omni.slate }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-16 rounded-[30px] border-2 border-[#1f1f1f]/85 p-8 text-center md:p-12" style={{ backgroundColor: omni.panel }}>
          <h3 className="text-4xl font-semibold tracking-tight md:text-6xl">Stop being a website. Become a presence.</h3>
          <p className="mx-auto mt-4 max-w-3xl text-lg" style={{ color: omni.slate }}>
            Build a voice and avatar layer that represents your expertise with continuity, empathy, and speed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-xl border-2 border-[#171717] bg-[#171717] px-8 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]">
              Start Free
            </button>
            <button className="rounded-xl border-2 border-[#171717] px-8 py-3 text-sm font-semibold transition hover:translate-y-[-1px]" style={{ backgroundColor: omni.paper }}>
              Book Demo
            </button>
          </div>
          {/* <div className="mt-8 inline-flex items-center gap-2 text-sm" style={{ color: omni.slate }}>
            <MoveRight className="h-4 w-4" />
            Picasso meets Apple designing AI systems diagrams for a next-gen control plane.
          </div> */}
        </motion.section>
      </div>
    </main>
  );
}
