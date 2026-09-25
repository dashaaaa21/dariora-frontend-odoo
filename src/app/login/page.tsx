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
        body: JSON.stringify({
          login,
          password,
        }),
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
    <main className="min-h-[calc(100vh-88px)] bg-[#050505] text-[#f5f3f1]">
      <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-[1360px] grid-cols-12 px-10">

        {/* LEFT */}
        <div className="col-span-7 flex flex-col justify-between border-r border-white/10 py-16">

          <div>
            <div className="editorial-label text-[#66635f]">
              DARIORA / ACCOUNT
            </div>

            <h1 className="display mt-16 max-w-[800px] text-[clamp(80px,9vw,145px)]">
              WELCOME
              <br />
              <span className="text-[#ff3b16]">
                BACK.
              </span>
            </h1>
          </div>

          <div className="max-w-[430px]">
            <p className="text-[16px] leading-[1.6] text-[#a6a3a0]">
              Continue your learning journey.
              Access your courses, track your progress
              and build with AI.
            </p>

            <div className="mt-8 editorial-label text-[#66635f]">
              AI EDUCATION PLATFORM / 2026
            </div>
          </div>

        </div>


        {/* RIGHT */}
        <div className="col-span-5 flex items-center px-16">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[430px]"
          >

            <div className="editorial-label text-[#66635f]">
              SIGN IN
            </div>

            <h2 className="mt-5 text-[32px] font-medium tracking-[-0.04em]">
              Access your account
            </h2>


            {/* LOGIN */}
            <div className="mt-12">

              <label
                htmlFor="login"
                className="editorial-label text-[#a6a3a0]"
              >
                EMAIL / LOGIN
              </label>

              <input
                id="login"
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                placeholder="you@example.com"
                autoComplete="username"
                required
                className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[18px] text-[#f5f3f1] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
              />

            </div>


            {/* PASSWORD */}
            <div className="mt-10">

              <label
                htmlFor="password"
                className="editorial-label text-[#a6a3a0]"
              >
                PASSWORD
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[18px] text-[#f5f3f1] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
              />

            </div>


            {/* ERROR */}
            {error && (
              <div className="mt-6 border-l border-[#ff3b16] pl-4 text-[13px] leading-6 text-[#ff8b78]">
                {error}
              </div>
            )}


            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-12 flex items-center gap-4 text-[12px] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40"
            >

              <span className="border-b border-[#f5f3f1] pb-2 transition-colors group-hover:border-[#ff3b16] group-hover:text-[#ff3b16]">
                {loading ? "Signing in..." : "Sign in"}
              </span>

              {!loading && (
                <span className="text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              )}

            </button>


            {/* BACK */}
            <Link
              href="/"
              className="mt-12 inline-block text-[11px] uppercase tracking-[0.1em] text-[#66635f] transition-colors hover:text-[#f5f3f1]"
            >
              ← Back to Dariora
            </Link>

          </form>

        </div>

      </div>
    </main>
  );
}
