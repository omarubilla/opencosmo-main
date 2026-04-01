"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function TopNav() {
  const { user } = useUser();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isNight = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setTheme(isNight ? "light" : "dark");
  };

  const headerClass = isNight
    ? "bg-[#001121] border-[#1f1f23]"
    : "bg-[#faf8f3] border-[#e6e0d7]";

  const brandTitleClass = isNight ? "text-white" : "text-[#4a4540]";
  const brandSubtitleClass = isNight ? "text-[#d6d6dc]" : "text-[#7d7268]";
  const navTextClass = isNight ? "text-[#ececf1]" : "text-[#6b6158]";
  const navHoverClass = isNight ? "hover:text-white" : "hover:text-[#4a4540]";
  const toggleClass = isNight
    ? "bg-[#17171b] text-white border-[#2a2a31]"
    : "bg-[#f8f8f8] text-[#2f2f35] border-[#d9d9de]";

  const toggleLabel = mounted
    ? (isNight ? "Switch to day mode" : "Switch to night mode")
    : "Toggle theme";

  if (user) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-200 ${headerClass}`}>
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/opencosmo69.png"
            alt="OpenCosmo Logo"
            width={36}
            height={36}
            className="w-9 h-9 rounded-md object-contain"
          />
          <div className="leading-tight">
            <p className={`text-[18px] font-semibold transition-colors duration-200 ${brandTitleClass}`}>OpenCosmo</p>
            <p className={`text-[10px] tracking-[0.16em] uppercase transition-colors duration-200 ${brandSubtitleClass}`}>Command Center</p>
          </div>
        </Link>

        <nav className={`hidden md:flex items-center gap-8 text-sm transition-colors duration-200 ${navTextClass}`}>
          <Link href="/" className={`transition ${navHoverClass}`}>Home</Link>
          <Link href="/SMBs" className={`relative transition ${navHoverClass}`}>
            SMBs
            <span className="pointer-events-none absolute -right-6 -top-2 rounded-full bg-[#7a1f2b] px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none tracking-[0.02em] text-white">
              New
            </span>
          </Link>
          <Link href="/enterprise" className={`transition ${navHoverClass}`}>Enterprise</Link>
          {/* <Link href="/developers" className={`transition ${navHoverClass}`}>Developers</Link> */}
          {/* <a href="#" className={`transition ${navHoverClass}`}>About</a> */}
        </nav>

        <div className="flex items-center gap-2">
          {/* <button
            type="button"
            onClick={toggleMode}
            aria-label={toggleLabel}
            title={mounted ? (isNight ? "Day mode" : "Night mode") : "Theme"}
            className={`h-9 w-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${toggleClass}`}
          >
            {mounted && isNight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button> */}

          {/* <SignInButton mode="modal" forceRedirectUrl="/" fallbackRedirectUrl="/">
            <button className="px-4 py-2 rounded-full bg-[var(--brand-red)] text-white text-sm font-medium hover:bg-[var(--brand-red-hover)] transition">
              Login
            </button>
          </SignInButton> */}
        </div>
      </div>
    </header>
  );
}
