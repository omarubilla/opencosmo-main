export const metadata = {
  title: "Privacy Policy | OpenCosmo",
  description: "Privacy Policy for Cosmo OS.",
};

const sections = [
  {
    title: "1. Information We Access",
    paragraphs: [
      "When you connect your Google account, we may access:",
      "Gmail Data",
      "Email content",
      "Email metadata (sender, subject, timestamps)",
      "Google Calendar Data",
      "Events",
      "Scheduling details",
      "Attendee information",
      "We only access this data to provide core functionality.",
    ],
  },
  {
    title: "2. How We Use Your Data",
    paragraphs: [
      "We use your data to:",
      "Analyze and prioritize emails",
      "Generate and draft responses",
      "Schedule and manage calendar events",
      "Create summaries and action items",
      "Improve system performance",
      "We do NOT:",
      "Sell your data",
      "Use your data for advertising",
      "Share your data with third parties for marketing",
    ],
  },
  {
    title: "3. Data Storage",
    paragraphs: [
      "We minimize data storage.",
      "Data may be processed temporarily to generate outputs",
      "We do not store email content longer than necessary",
      "Logs may include limited metadata for debugging and performance",
    ],
  },
  {
    title: "4. Data Sharing",
    paragraphs: [
      "We do not sell or rent your data.",
      "We may share data only:",
      "With service providers necessary to operate the system (e.g., AI model providers)",
      "When required by law",
    ],
  },
  {
    title: "5. AI Processing",
    paragraphs: [
      "Your data may be processed by AI models (e.g., Claude API) to:",
      "Generate responses",
      "Analyze context",
      "Execute workflows",
      "These providers process data strictly to deliver functionality.",
    ],
  },
  {
    title: "6. Security",
    paragraphs: [
      "We implement reasonable safeguards, including:",
      "Secure API authentication (OAuth 2.0)",
      "Encrypted data transmission (HTTPS)",
      "Access controls and permission scoping",
      "However, no system is 100% secure.",
    ],
  },
  {
    title: "7. User Control",
    paragraphs: [
      "You can:",
      "Revoke access at any time via your Google account",
      "Disconnect Cosmo OS from your account",
      "Request deletion of stored data (if applicable)",
    ],
  },
  {
    title: "8. Google API Compliance",
    paragraphs: [
      "Cosmo OS complies with Google API Services User Data Policy.",
      "Specifically:",
      "We only use data to provide user-facing functionality",
      "We do not transfer or sell user data",
      "We limit access to the minimum required scopes",
    ],
  },
  {
    title: "9. Children's Privacy",
    paragraphs: [
      "Cosmo OS is not intended for users under 13.",
      "We do not knowingly collect data from children.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy.",
      "We will notify users of significant changes.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] px-6 py-16 text-[#171717] md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.18em] text-[#7b8c62]">OpenCosmo</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Privacy Policy for OpenCosmo</h1>
        <p className="mt-4 text-base text-[#5f6882]">Last Updated: 3-30-26</p>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-[#2e2a25]">
          <p>Cosmo OS ("we," "our," or "us") respects your privacy and is committed to protecting your data.</p>
          <p>This Privacy Policy explains how we collect, use, and protect your information.</p>
        </div>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <div className="space-y-3 text-base leading-7 text-[#3b3631]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">11. Contact</h2>
          <p className="text-base leading-7 text-[#3b3631]">For privacy-related inquiries:</p>
          <a className="text-base font-medium text-[#7b8c62] underline underline-offset-4" href="mailto:kevin@opencosmo.ai">
            kevin@opencosmo.ai
          </a>
        </section>
      </div>
    </main>
  );
}