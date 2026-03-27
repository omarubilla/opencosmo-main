"use client";
import React from 'react';
import { ChevronDown, Zap, Loader2, Globe, ShieldCheck } from 'lucide-react';

export default function LandingHero({ onDemoClick, onEnterpriseClick }) {
  const arcSectionRef = React.useRef(null);
  const [isArcVisible, setIsArcVisible] = React.useState(false);
  const launchDate = React.useMemo(() => new Date(2026, 2, 30, 22, 0, 0), []);
  const [websiteUrl, setWebsiteUrl] = React.useState('');
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanError, setScanError] = React.useState('');
  const [scanResult, setScanResult] = React.useState(null);
  const [timeRemaining, setTimeRemaining] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const isFeatureLive = React.useMemo(() => Date.now() >= launchDate.getTime(), [launchDate, timeRemaining]);

  const normalizeUrl = (rawValue) => {
    const trimmed = rawValue.trim();
    if (!trimmed) return '';

    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withProtocol).toString();
  };

  const categorizeBusiness = (host) => {
    const lowerHost = host.toLowerCase();

    if (/shop|store|boutique|retail|market/.test(lowerHost)) return 'E-commerce';
    if (/law|legal|attorney/.test(lowerHost)) return 'Legal Services';
    if (/clinic|health|medical|dental/.test(lowerHost)) return 'Healthcare';
    if (/agency|studio|design|marketing/.test(lowerHost)) return 'Agency / Services';
    if (/edu|academy|course|learn/.test(lowerHost)) return 'Education';
    return 'Professional Services';
  };

  const buildAiAssessment = (normalizedUrl) => {
    const host = new URL(normalizedUrl).hostname.replace(/^www\./, '');
    const businessType = categorizeBusiness(host);

    return {
      businessType,
      scanSummary: `We scanned ${host} and mapped AI opportunities by downside risk and knowledge abstraction, then prioritized safe implementation paths first.`,
      recommendations: [
        {
          title: 'Simple Selections and Recommendations',
          aiType: 'Automation Assistant',
          safetyProfile: 'Low downside / low abstraction',
          whatItDoes: 'Handles repetitive triage tasks: FAQs, lead qualification, ticket routing, and basic document drafting.',
          estimatedSavings: '$2,500 - $6,000 / month',
          swot: {
            strengths: 'Fast deployment and measurable productivity lift in 2-4 weeks.',
            weaknesses: 'Limited strategic depth; needs clear guardrails and templates.',
            opportunities: 'Reduce manual workload by 15-30% and improve response times.',
            threats: 'Bad prompts or stale knowledge can degrade output quality.'
          }
        },
        {
          title: 'Important Choices',
          aiType: 'Decision Support Copilot',
          safetyProfile: 'Medium downside / medium abstraction',
          whatItDoes: 'Supports pricing, resource planning, campaign optimization, and operations decisions with explainable recommendations.',
          estimatedSavings: '$5,000 - $14,000 / month',
          swot: {
            strengths: 'Improves consistency in business decisions and surfaces hidden patterns.',
            weaknesses: 'Requires good internal data hygiene to perform reliably.',
            opportunities: 'Increase margin and planning quality with weekly AI-assisted reviews.',
            threats: 'Over-reliance without human review can introduce avoidable errors.'
          }
        },
        {
          title: 'Informed Guidance',
          aiType: 'Strategic Advisory Agent',
          safetyProfile: 'High downside / high context sensitivity',
          whatItDoes: 'Provides scenario planning, risk forecasting, and rollout strategy guidance with explicit human approvals.',
          estimatedSavings: '$8,000 - $25,000 / month',
          swot: {
            strengths: 'High leverage for leadership, planning, and change management.',
            weaknesses: 'Needs governance, review workflows, and domain owner oversight.',
            opportunities: 'Enable safer expansion into new markets and service lines.',
            threats: 'Wrong assumptions can cascade if governance is weak.'
          }
        }
      ]
    };
  };

  const handleWebsiteScan = async (event) => {
    event.preventDefault();
    setScanError('');
    setScanResult(null);

    if (!isFeatureLive) {
      setScanError('Website scanning is temporarily unavailable. Launching March 30 at 10:00 PM.');
      return;
    }

    let normalizedUrl = '';
    try {
      normalizedUrl = normalizeUrl(websiteUrl);
      if (!normalizedUrl) {
        setScanError('Please enter your website URL first.');
        return;
      }
    } catch {
      setScanError('Please enter a valid website URL (example: yoursite.com).');
      return;
    }

    setIsScanning(true);

    // Simulate website scanning for now. Replace with a real API call when backend is ready.
    await new Promise((resolve) => setTimeout(resolve, 2200));

    setScanResult(buildAiAssessment(normalizedUrl));
    setIsScanning(false);
  };

  const approachSections = [
    {
      title: 'Our take on Recursive Self-Improvement',
      paragraphs: [
        'Despite years of industrial and academic research, most approaches to Recursive Self-Improvement are still too slow and expensive to be practical; each step of self-improvement requires extensive training of LLMs (or even retraining them from scratch).',
        'This does not scale.',
        'OpenCosmo is building intelligent systems that improve themselves at the execution layer — not the model layer.',
        'This works now.',
        'And it is fast.',
        'Fast enough that in a few months, we will be offering it for free.',
        'It will enable us — and you — to create reliable reasoning systems that solve real-world, practical problems and workflows that businesses face every day.'
      ]
    },
    {
      title: 'Why not Reinforcement Learning?',
      paragraphs: [
        'We\'ve used RL for years.',
        'But RL post-training has severe limitations.',
        'It\'s slow, expensive, and requires millions of data points.',
        'These limitations make effective RL training impractical for all but a handful of companies.',
        'Already, we see reasoning models struggling with problems outside of coding and math.',
        'Why do those domains work well?',
        'Because in those domains, it\'s possible to generate large amounts of synthetic data cheaply — which is crucial for RL.',
        'But that\'s not true for most real-world workflows.',
        'OpenCosmo takes a different path.',
        'Our approach finds effective, task-specific reasoning strategies using far less data — hundreds of data points instead of millions — while remaining fully compatible with the models you already use.',
        'No retraining.',
        'No fine-tuning bottlenecks.',
        'No waiting.'
      ]
    },
    {
      title: 'OpenCosmo builds on top — not into — the model',
      paragraphs: [
        'LLMs are amazing.',
        'They are not just models — they are massive, compressed databases of human knowledge.',
        'But if you use them naively, you will not reliably access that knowledge.',
        'And it\'s not just prompt optimization.',
        'You have to know what to ask — not just how to ask it.',
        'You have to extract fragments of information and synthesize them step by step — until the full answer emerges.',
        'The knowledge is there.',
        'But it is fragmented.',
        'OpenCosmo builds the intelligence layer on top of LLMs to extract, verify, and synthesize that hidden information.'
      ]
    },
    {
      title: 'Self-improvement — at the system level',
      paragraphs: [
        'Self-improvement is how we do it — quickly.',
        'The more problems OpenCosmo executes, the better it becomes at executing the next.',
        'Our systems are continuously improving.',
        'They adapt to each model\'s internal structure — its quirks, biases, and retrieval patterns — and learn how to extract and combine information more effectively over time.',
        'We do not embed intelligence into the models.',
        'We build an execution layer around them.',
        'A complete intelligent system that governs how models are used — how decisions are made — and how results are verified.'
      ]
    },
    {
      title: 'And soon — it runs itself',
      paragraphs: [
        'This is just the beginning.',
        'Soon, OpenCosmo will:',
        'Automatically refine its own reasoning strategies',
        'Improve task execution across workflows',
        'Learn from every interaction, without retraining models',
        'Recursive self-improvement, without touching the model.'
      ]
    }
  ];

  React.useEffect(() => {
    const arcNode = arcSectionRef.current;
    if (!arcNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsArcVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(arcNode);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const updateCountdown = () => {
      const diff = launchDate.getTime() - Date.now();

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [launchDate]);

  const handleDemoClick = () => {
    onDemoClick();
  };

  const handleEnterpriseClick = () => {
    onEnterpriseClick?.();
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle circular gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e8e0d5] dark:bg-[#2a2d36] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e8e0d5] dark:bg-[#2a2d36] rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center space-y-4 mt-16">
          <h1 className="text-5xl md:text-6xl font-light text-[#4a4540] dark:text-[#ececf1] tracking-tight">
            OpenCosmo
            <span className="block mt-2 font-extralight italic text-[#6b6158] dark:text-[#c7c8cf]">
              We empower business owners — elevate your existing workflow.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#7d7268] dark:text-[#c7c8cf] font-light mt-6 leading-relaxed">
            Discover the power of no-code ai agents, crafted with elegance and precision
          </p>
        </div>

        {/* Legacy Prompt Composer retained for reference only. */}
        {/*
        <div className="mt-8 w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#202124] text-white shadow-2xl">
          <div className="px-6 pt-5 pb-4">
            <textarea
              placeholder="Ask Cosmo to create a prototype..."
              className="h-12 w-full resize-none bg-transparent text-lg text-white placeholder:text-white/60 focus:outline-none"
            />
          </div>
        </div>
        */}

        {/* Website AI Fit Scanner */}
        <section className="mt-8 w-full max-w-4xl rounded-[28px] border border-[#d7d2ca] bg-[#f8f5ef] p-6 text-[#2e2a25] shadow-[0_18px_50px_rgba(51,39,24,0.12)] dark:border-[#343842] dark:bg-[#17191f] dark:text-[#ececf1]">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8b7d70] dark:text-[#9aa0ad]">
              Safe AI Rollout Planner
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
              Enter your website URL to get your AI strategy map
            </h3>
            <p className="mt-2 text-sm md:text-base text-[#655b51] dark:text-[#bcc1cc]">
              We classify your business and recommend the safest first AI initiatives, with SWOT analysis and estimated savings.
            </p>
          </div>

          {!isFeatureLive ? (
            <div className="mb-4 rounded-2xl border border-[#cfbfa8] bg-[#fdf4e7] p-4 dark:border-[#5b4a2f] dark:bg-[#221c14]">
              <p className="text-xs uppercase tracking-[0.14em] text-[#8a5a1c] dark:text-[#d9b982]">Coming Soon</p>
              <p className="mt-1 text-sm md:text-base font-medium text-[#5e3f17] dark:text-[#f3d6a7]">
                Scanner is unavailable until March 30 at 10:00 PM.
              </p>
              <p className="mt-2 text-lg md:text-xl font-semibold tracking-wide text-[#3f2a0d] dark:text-[#ffe5bf]">
                {String(timeRemaining.days).padStart(2, '0')}d : {String(timeRemaining.hours).padStart(2, '0')}h : {String(timeRemaining.minutes).padStart(2, '0')}m : {String(timeRemaining.seconds).padStart(2, '0')}s
              </p>
            </div>
          ) : null}

          <form onSubmit={handleWebsiteScan} className="space-y-3">
            <label htmlFor="website-url" className="text-sm font-medium">
              Business website URL
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8e8478] dark:text-[#9aa0ad]" />
                <input
                  id="website-url"
                  type="text"
                  value={websiteUrl}
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  placeholder="example.com"
                  disabled={!isFeatureLive || isScanning}
                  className="h-11 w-full rounded-xl border border-[#cdc5bb] bg-white pl-10 pr-4 text-[15px] outline-none transition focus:border-[#b8934f] dark:border-[#3a3f4c] dark:bg-[#12141a]"
                />
              </div>
              <button
                type="submit"
                disabled={isScanning || !isFeatureLive}
                className={`h-11 min-w-[168px] rounded-xl px-5 text-sm font-semibold transition ${
                  !isFeatureLive
                    ? 'bg-[#d7d7d7] text-[#6f6f6f] cursor-not-allowed dark:bg-[#3a3d46] dark:text-[#9aa0ad]'
                    : 'bg-[#2f2a24] text-white hover:bg-[#1f1b17] dark:bg-[#e8eaef] dark:text-[#121319] dark:hover:bg-white'
                } ${isScanning ? 'opacity-80' : ''}`}
              >
                {isScanning ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scanning...
                  </span>
                ) : !isFeatureLive ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#9ea3ad]" aria-hidden="true" />
                    Connected
                  </span>
                ) : (
                  'Scan my website'
                )}
              </button>
            </div>
            {scanError ? (
              <p className="text-sm text-[#d05045] dark:text-[#ff8c80]">{scanError}</p>
            ) : null}
          </form>

          {isScanning ? (
            <div className="mt-5 rounded-2xl border border-dashed border-[#c7bfb4] bg-[#f2ede4] p-4 dark:border-[#3d4352] dark:bg-[#111319]">
              <p className="inline-flex items-center gap-2 text-sm md:text-base text-[#5d5348] dark:text-[#bcc1cc]">
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning website structure, services, and potential AI opportunities...
              </p>
            </div>
          ) : null}

          {scanResult ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#d4cabb] bg-white p-4 dark:border-[#333947] dark:bg-[#10131a]">
                <p className="text-xs uppercase tracking-[0.14em] text-[#8c7f72] dark:text-[#9aa0ad]">Business category</p>
                <p className="mt-1 text-lg font-semibold">{scanResult.businessType}</p>
                <p className="mt-2 text-sm text-[#5e554c] dark:text-[#bcc1cc]">{scanResult.scanSummary}</p>
              </div>

              <div className="space-y-3">
                {scanResult.recommendations.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#dacfc1] bg-[#fffdfa] p-4 dark:border-[#3a404d] dark:bg-[#12151d]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base md:text-lg font-semibold tracking-tight">{item.title}</h4>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f0e6d6] px-3 py-1 text-xs font-medium text-[#5b4b34] dark:bg-[#2a3242] dark:text-[#c8d6f0]">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {item.safetyProfile}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#52483d] dark:text-[#d5d8df]">{item.aiType}</p>
                    <p className="mt-2 text-sm text-[#5f554a] dark:text-[#bcc1cc]">{item.whatItDoes}</p>
                    <p className="mt-3 text-sm font-semibold text-[#3c342b] dark:text-white">Estimated savings: {item.estimatedSavings}</p>
                    <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                      <p><span className="font-semibold">S:</span> {item.swot.strengths}</p>
                      <p><span className="font-semibold">W:</span> {item.swot.weaknesses}</p>
                      <p><span className="font-semibold">O:</span> {item.swot.opportunities}</p>
                      <p><span className="font-semibold">T:</span> {item.swot.threats}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Demo Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDemoClick}
            className="group relative px-8 py-3 rounded-full bg-[#f5f2ed] dark:bg-[#17171b] text-[#c89f5b] font-medium text-sm tracking-wide transition-all"
            style={{
              boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
            }}
            onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
            onMouseUp={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
          >
            <span className="relative flex items-center gap-2">
              try-demo
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>

          <button
            onClick={handleEnterpriseClick}
            className="group relative px-8 py-3 rounded-full bg-[#f5f2ed] dark:bg-[#17171b] text-[#3b3631] dark:text-[#ececf1] font-medium text-sm tracking-wide transition-all"
            style={{
              boxShadow: '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'
            }}
            onMouseDown={(e) => e.currentTarget.style.boxShadow = 'inset 4px 4px 8px #d4cec3, inset -4px -4px 8px #ffffff'}
            onMouseUp={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 16px #d4cec3, -8px -8px 16px #ffffff'}
          >
            <span className="relative flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--brand-red)] fill-current" />
              enterprise
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* ARC section */}
        <section
          ref={arcSectionRef}
          className="w-full bg-black text-white py-24 px-6 md:px-12 lg:px-24 rounded-3xl"
        >
          <div className="max-w-5xl mx-auto">
            <div
              className={`mb-12 transition-all duration-700 ease-out ${
                isArcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-sm text-neutral-400 tracking-widest uppercase mb-3">
                Benchmark
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Why ARC-AGI?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 text-lg text-neutral-300 leading-relaxed">
              <div
                className={`transition-all duration-700 delay-100 ease-out ${
                  isArcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <p className="mb-6">
                  Most AI systems rely on patterns they&apos;ve already seen.
                  <span className="text-white"> ARC-AGI tests something harder:</span>
                </p>

                <p className="text-white text-xl md:text-2xl font-medium mb-6">
                  Can a system solve new problems it has never seen before?
                </p>

                <p>
                  There&apos;s no large dataset. No memorization.
                  Just a few examples - and the need to figure out the rule.
                </p>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ease-out ${
                  isArcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <p className="mb-6">
                  This is where most models fail.
                </p>

                <p className="mb-6">
                  <span className="text-white">OpenCosmo is built for this.</span>
                </p>

                <p className="mb-6">
                  We don&apos;t make models bigger - we make systems smarter.
                </p>

                <p>
                  By improving how models are used, OpenCosmo enables real reasoning,
                  fast adaptation, and continuous improvement on entirely new tasks.
                </p>
              </div>
            </div>

            <div
              className={`mt-16 border-t border-neutral-800 pt-6 transition-all duration-700 delay-300 ease-out ${
                isArcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-red-500">
                ARC reveals the future of AI: not bigger models - better systems.
              </p>
            </div>
          </div>
        </section>

        {/* Sticky headline + scrollable narrative */}
        <section className="mt-14 w-full max-w-6xl lg:h-screen lg:overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start h-full">
            <div className="lg:h-screen self-start flex items-center">
              <div className="w-full py-8 lg:py-0">
                <p className="text-[1.2rem] md:text-[1.35rem] font-semibold tracking-tight text-[#1b1027] dark:text-[#ececf1]">
                  Approach
                </p>
                <h2 className="mt-6 text-[1.9rem] leading-[1.04] md:text-[2.4rem] md:leading-[1.02] lg:text-[2.95rem] lg:leading-[1.02] font-medium tracking-[-0.02em] text-[#14071f] dark:text-[#ececf1]">
                  Recursive Self-Improvement is the holy grail of AI - what if it's possible to do this today?
                </h2>
              </div>
            </div>

            <div className="space-y-14 lg:pr-2 lg:h-screen lg:overflow-y-auto lg:pr-6">
              {approachSections.map((section) => (
                <article key={section.title} className="space-y-5">
                  <h3 className="text-[1.85rem] md:text-[2.4rem] leading-tight tracking-tight text-[#1b1027] dark:text-[#ececf1] font-semibold">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={`${section.title}-${paragraph}`}
                        className="text-[1.03rem] md:text-[1.12rem] leading-relaxed text-[#3e3548] dark:text-[#c7c8cf]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
