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
    <main className="min-h-screen bg-[#f4efe6] text-[#171717]">
      <TopNav />

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-32 text-center sm:px-6 lg:px-8">
        <p>
          <span className="hero-subtitle">The AI that actually does things</span>
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-black md:text-6xl">
          Your Autonomous Executive
          <br />
          Assistant
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-[#2f2f2f] md:text-[2rem]">
          Clears your inbox, sends emails, manages your calendar, and generates leads -all from your favorite chat app.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg">Start Free Trial</Button>
          </SignUpButton>
          <Button size="lg" variant="outline" className="text-lg">See How It Works</Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-black md:text-4xl">Powerful Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <Card key={feature.key} className="border border-[#d8d3cb] bg-[#f8f5ef] p-6 shadow-none">
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-bold text-[#1c9baa]">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed text-[#252525]">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8" id="pricing">
        <h2 className="mb-6 text-center text-3xl font-bold text-black md:text-4xl">Simple, Transparent Pricing</h2>
        <PricingTable />
        <SignedOut>
          <div className="mt-8 flex justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg">Try 7 days free</Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </section>

      <div className="pb-12 text-center">
        <Link href="/" className="text-sm font-medium text-[#7b2532] hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
