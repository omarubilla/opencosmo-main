import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingTable, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="logo-container">
            <Link href="/">
              <span className="logo-text">CosmoOS</span>
            </Link>
            <SignedIn>
              <div className="nav-actions">
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="nav-actions">
                <Link href="/sign-in">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Sign up</Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-heading">
        <div className="text-center">
          <p>
            <span className="hero-subtitle">
              The AI that actually does things
            </span>
          </p>
          <h1>
            Your Autonomous Executive <br />
            Assistant
          </h1>

          <p className="hero-description">
            Clears your inbox, sends emails, manages your calendar, and
            generates leads -all from your favorite chat app.
          </p>
          <div className="hero-buttons">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-heading">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          {[
            {
              key: "email-management",
              title: "Autonomous Email Management",
              description:
                "AI processes your emails every 15 minutes, categorizes them, and drafts intelligent replies",
            },
            {
              key: "task-extraction",
              title: "Smart Task Extraction",
              description:
                "Automatically creates tasks from your emails and calendar events. Never miss a to-do again",
            },
            {
              key: "calendar-intelligence",
              title: "Calendar Intelligence",
              description:
                "Suggests optimal meeting times, detects conflicts, and keeps your schedule organized",
            },
            {
              key: "voice-ai",
              title: "Voice AI",
              description:
                "Run natural voice conversations with your assistant to capture tasks, trigger actions, and move work forward hands-free",
            },
            {
              key: "lead-generation",
              title: "Lead Generation",
              description:
                "Identify high-intent prospects, enrich contact details, and generate personalized outreach drafts in minutes",
            },
            {
              key: "more",
              title: "+More",
              description:
                "Expandable workflows for custom automations, integrations, and assistant capabilities as your team grows",
            },
          ].map((feature) => (
            <Card key={feature.key} className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1c9baa]">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-black">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-heading" id="pricing">
        <h2>Simple, Transparent Pricing</h2>
        <PricingTable />
        <SignedOut>
          <div className="hero-buttons" style={{ marginTop: "2rem" }}>
            <Link href="/sign-up">
              <Button size="lg" className="text-lg">
                Try 7 days free
              </Button>
            </Link>
          </div>
        </SignedOut>
      </section>
    </div>
  );
}
