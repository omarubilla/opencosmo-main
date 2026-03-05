"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#2B2D31]">OpenCosmo</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#enterprise" className="text-gray-600 hover:text-gray-900 transition-colors">
              Enterprise
            </a>
            <a href="#developers" className="text-gray-600 hover:text-gray-900 transition-colors">
              Developers
            </a>
            <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">
              Resources
            </a>
            {/* <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a> */}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 rounded-md bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white transition-colors">
              Book a Strategy Call
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a href="#enterprise" className="text-gray-600 hover:text-gray-900 transition-colors">
                Enterprise
              </a>
              <a href="#developers" className="text-gray-600 hover:text-gray-900 transition-colors">
                Developers
              </a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">
                Resources
              </a>
              {/* <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a> */}
              <div className="flex flex-col gap-2 pt-4">
                <button className="w-full px-4 py-2 rounded-md bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white transition-colors">
                  Book a Strategy Call
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
