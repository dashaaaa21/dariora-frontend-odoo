"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--obsidian-black)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-12">
          <img
            src="/logo.png"
            alt="DARIORA"
            className="h-20 w-20 object-contain"
          />
        </Link>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="headline-large mb-4">
            WELCOME
            <br />
            <span className="text-[var(--neon-red)]">BACK</span>
          </h1>
          <p className="body-text">
            Sign in to your DARIORA account
          </p>
        </div>

        {/* Form Container */}
        <div className="glass p-8 rounded-lg mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="tech-label block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)] focus:ring-1 focus:ring-[var(--neon-red)]/50"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="tech-label block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)] focus:ring-1 focus:ring-[var(--neon-red)]/50"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[var(--neon-red)]/10 border border-[var(--neon-red)]/50 text-[var(--neon-red)] px-4 py-3 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="btn-primary__label">
                {loading ? "Signing in..." : "Sign In"}
              </span>
              {!loading && (
                <span className="btn-primary__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7H17V17" />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-sm text-[var(--steel-gray)]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[var(--neon-red)] hover:text-[var(--electric-orange)] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
