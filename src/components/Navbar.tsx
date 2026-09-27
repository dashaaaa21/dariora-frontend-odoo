"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050505]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[88px] max-w-[1360px] items-center justify-between px-10">

        {/* Logo */}
        <Link
          href="/"
          className="text-[18px] font-medium tracking-[-0.04em]"
        >
          DARIORA
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/courses"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[#a6a3a0] transition-colors hover:text-[#f5f3f1]"
          >
            Courses

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#ff3b16] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[#a6a3a0] transition-colors hover:text-[#f5f3f1]"
          >
            AI Tools

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#ff3b16] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[#a6a3a0] transition-colors hover:text-[#f5f3f1]"
          >
            Learn

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#ff3b16] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[#a6a3a0] transition-colors hover:text-[#f5f3f1]"
          >
            About

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#ff3b16] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-[12px] uppercase tracking-[0.08em] text-[#a6a3a0] transition-colors hover:text-[#ff3b16]"
          >
            Account
          </Link>

          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b16]" />
        </div>
      </div>
    </header>
  );
}
