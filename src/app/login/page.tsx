"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
      });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <div className="mx-auto flex min-h-screen max-w-[1360px] flex-col items-center justify-center px-10">

        {/* Container */}
        <div className="w-full max-w-[500px]">

          {/* Logo */}
          <Link href="/" className="mb-16 block">
            <img
              src="/logo.png"
              alt="DARIORA"
              className="h-16 w-16 object-contain"
            />
          </Link>

          {/* Heading */}
          <div className="mb-12">
            <h1 className="headline-large leading-tight">
              WELCOME
              <br />
              <span className="text-[#FF1A0A]">BACK</span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="body-text mb-12 max-w-[400px]">
            Sign in to your DARIORA account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-12">

            {/* Email Input */}
            <div>
              <label htmlFor="login" className="tech-label mb-4 block text-[#B8B8B8]">
                EMAIL
              </label>
              <input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="you@example.com"
                autoComplete="username"
                required
                className="w-full border-b border-[#777777]/30 bg-transparent px-0 py-3 text-[18px] text-[#F5F5F5] placeholder-[#777777]/50 outline-none transition-colors focus:border-[#FF1A0A]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="tech-label mb-4 block text-[#B8B8B8]">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full border-b border-[#777777]/30 bg-transparent px-0 py-3 text-[18px] text-[#F5F5F5] placeholder-[#777777]/50 outline-none transition-colors focus:border-[#FF1A0A]"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded border border-[#FF1A0A]/50 bg-[#FF1A0A]/10 px-4 py-3 text-sm text-[#FF8B78]">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              <span className="btn-primary__label">
                {loading ? "Signing in..." : "Sign in"}
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

          {/* Sign Up Link */}
          <div className="mt-12 text-center text-sm text-[#777777]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#FF1A0A] hover:text-[#FF4B16] transition-colors">
              Sign up
            </Link>
          </div>

          {/* Back Link */}
          <Link
            href="/"
            className="mt-16 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#777777] hover:text-[#F5F5F5] transition-colors"
          >
            <span>←</span>
            <span>Back to Dariora</span>
          </Link>

        </div>

      </div>
    </main>
  );
}
