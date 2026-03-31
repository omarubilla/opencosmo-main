export const metadata = {
  title: "Terms of Service | OpenCosmo",
  description: "Terms of Service for OpenCosmo.",
};

const sections = [
  {
    title: "1. Description of Service",
    paragraphs: [
      "Cosmo OS is an AI-powered execution system that can:",
      "Analyze and triage email inboxes",
      "Draft and send emails on your behalf",
      "Schedule, modify, and manage calendar events",
      "Generate summaries, action items, and workflows",
      "Automate tasks using connected services (e.g., Gmail, Google Calendar)",
      'The system operates on a recurring automated cycle ("heartbeat") and may act without manual prompts based on your configuration.',
    ],
  },
  {
    title: "2. User Authorization",
    paragraphs: [
      "By connecting your Google account, you explicitly authorize Cosmo OS to:",
      "Read email metadata and content",
      "Draft and send emails",
      "Access and manage calendar events",
      "You acknowledge that:",
      "Actions may be performed autonomously",
      "Drafts and actions are AI-generated",
      "You are responsible for reviewing outputs where appropriate",
    ],
  },
  {
    title: "3. User Responsibilities",
    paragraphs: [
      "You agree to:",
      "Provide accurate account information",
      "Use the Service in compliance with applicable laws",
      "Not use Cosmo OS for harmful, abusive, or illegal purposes",
      "Monitor automated actions if using autonomous features",
      "You are solely responsible for:",
      "Emails sent on your behalf",
      "Calendar changes executed by the system",
      "Any consequences of automated workflows",
    ],
  },
  {
    title: "4. AI Limitations Disclaimer",
    paragraphs: [
      "Cosmo OS uses artificial intelligence to generate outputs.",
      "We do not guarantee:",
      "Accuracy",
      "Completeness",
      "Correct interpretation of intent",
      "AI-generated actions may contain errors.",
      "Use of the Service is at your own risk.",
    ],
  },
  {
    title: "5. Third-Party Services",
    paragraphs: [
      "Cosmo OS integrates with third-party services such as:",
      "Google Gmail",
      "Google Calendar",
      "We are not responsible for:",
      "Changes to third-party APIs",
      "Service interruptions",
      "Data handling by those providers",
      "Your use of those services is subject to their respective terms.",
    ],
  },
  {
    title: "6. Data Access and Permissions",
    paragraphs: [
      "We only access data necessary to provide functionality, including:",
      "Email content and metadata",
      "Calendar events and scheduling data",
      "We do not sell user data.",
      "See our Privacy Policy for full details.",
    ],
  },
  {
    title: "7. Termination",
    paragraphs: [
      "You may:",
      "Disconnect your Google account at any time",
      "Stop using the Service at any time",
      "We reserve the right to suspend or terminate access if:",
      "Terms are violated",
      "Abuse or misuse is detected",
    ],
  },
  {
    title: "8. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law:",
      "Cosmo OS is not liable for:",
      "Missed emails",
      "Incorrect scheduling",
      "Unintended automated actions",
      "Business or personal losses",
      'The Service is provided "as is."',
    ],
  },
  {
    title: "9. Modifications",
    paragraphs: [
      "We may update these Terms at any time.",
      "Continued use of the Service constitutes acceptance of updated Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] px-6 py-16 text-[#171717] md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.18em] text-[#7b8c62]">OpenCosmo</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Terms of Service for Cosmo OS</h1>
        <p className="mt-4 text-base text-[#5f6882]">Last Updated: 3-30-26</p>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-[#2e2a25]">
          <p>Welcome to Cosmo OS ("we," "our," or "us"), an autonomous AI operating system ("Service") that assists users by managing email, scheduling, and workflow automation.</p>
          <p>By accessing or using Cosmo OS, you agree to these Terms of Service.</p>
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
          <h2 className="text-2xl font-semibold tracking-tight">10. Contact</h2>
          <p className="text-base leading-7 text-[#3b3631]">For questions, contact:</p>
          <a className="text-base font-medium text-[#7b8c62] underline underline-offset-4" href="mailto:kevin@opencosmo.ai">
            kevin@opencosmo.ai
          </a>
        </section>
      </div>
    </main>
  );
}