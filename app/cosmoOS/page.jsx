import Link from "next/link";
import {
  PricingTable,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "CosmoOS",
};

export default function CosmoOSPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] px-6 py-24 text-[#0f172a]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d7deec] bg-white px-5 py-4 shadow-sm">
          <Link href="/" className="text-xl font-semibold tracking-tight text-[#1f2a44]">
            CosmoOS
          </Link>

          <SignedIn>
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </header>

        <section className="mb-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1c9baa]">The AI that actually does things</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#0f172a] md:text-6xl">
            Your Autonomous Executive
            <br />
            Assistant
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
            Clears your inbox, sends emails, manages your calendar, and generates leads -all from your favorite chat app.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg">Start Free Trial</Button>
            </SignUpButton>
            <Button size="lg" variant="outline" className="text-lg">See How It Works</Button>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">Powerful Features</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
              <Card key={feature.key} className="border-[#d7deec] bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#1c9baa]">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-[#334155]">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-10">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">Simple, Transparent Pricing</h2>
          <div className="rounded-2xl border border-[#d7deec] bg-white p-4 shadow-sm md:p-8">
            <PricingTable />
            <SignedOut>
              <div className="mt-8 text-center">
                <SignUpButton mode="modal">
                  <Button size="lg" className="text-lg">Try 7 days free</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-[#7b2532] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
