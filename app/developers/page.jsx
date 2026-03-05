"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import TopNav from "../_components/TopNav";

export default function DevelopersPage() {
  const [showSdkPopup, setShowSdkPopup] = useState(false);

  return (
    <div className="min-h-screen bg-[#001121]">
      <TopNav />
      <main className="pt-16">
        <video
          className="w-screen h-[calc(100vh-4rem)] object-cover"
          src="/spacetravel.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setShowSdkPopup(true)}
        />

        {showSdkPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.25 }, y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-6 py-4 rounded-xl bg-[var(--brand-red-hover)] text-[#f5f2ed] shadow-2xl border border-black/20"
          >
            <p className="text-lg font-semibold tracking-wide">SDK coming soon</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
