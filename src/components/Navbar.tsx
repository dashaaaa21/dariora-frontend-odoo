"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import NavLink from "./NavLink";
import { cn } from "@/lib/classNames";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[var(--obsidian-black)]/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-[88px] max-w-[1360px] items-center justify-between px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
        >
          <img
            src="/logo.png"
            alt="DARIORA Logo"
            className="h-32 w-32 object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--neon-red)]"
          >
            Account
          </Link>

          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-red)]" />
        </div>
      </div>
    </header>
  );
}
