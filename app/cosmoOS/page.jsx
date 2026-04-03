import Link from "next/link";
import {
  PricingTable,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TopNav from "../_components/TopNav";

export const metadata = {
  title: "CosmoOS",
};

export default function CosmoOSPage() {
  return (
    <main className="landing-wrapper">
      <TopNav />

      <section className="section-heading pt-32 text-center">
        <p>
          <span className="hero-subtitle">The AI that actually does things</span>
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-black md:text-6xl">
          Your Autonomous Executive
          <br />
          Assistant
        </h1>

        <p className="hero-description">
          Clears your inbox, sends emails, manages your calendar, and generates leads -all from your favorite chat app.
        </p>

        <div className="hero-buttons">
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg">Start Free Trial</Button>
          </SignUpButton>
          <Button size="lg" variant="outline" className="text-lg">See How It Works</Button>
        </div>
      </section>

      <section className="section-heading">
        <h2 className="mb-8 text-center text-3xl font-bold text-black md:text-4xl">Powerful Features</h2>
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
                <CardTitle className="text-xl font-bold text-[#1c9baa]">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-black">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-heading pb-12" id="pricing">
        <h2 className="mb-6 text-center text-3xl font-bold text-black md:text-4xl">Simple, Transparent Pricing</h2>
        <PricingTable />
        <SignedOut>
          <div className="hero-buttons" style={{ marginTop: "2rem" }}>
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg">Try 7 days free</Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </section>

      <div className="pb-10 text-center">
        <Link href="/" className="text-sm font-medium text-[#7b2532] hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
