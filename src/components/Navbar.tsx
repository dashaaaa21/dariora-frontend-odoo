"use client";

import Link from "next/link";

export default function Navbar() {
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
          <Link
            href="/courses"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]"
          >
            Courses

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/students"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]"
          >
            Students

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/enrollments"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]"
          >
            Enrollments

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]"
          >
            AI Tools

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]"
          >
            Learn

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative text-[12px] uppercase tracking-[0.08em] text-[var(--steel-gray)] transition-colors duration-300 hover:text-[var(--pure-white)]"
          >
            About

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
          </Link>
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
