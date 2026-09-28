"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type User = {
  id: number;
  name: string;
  login: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      await apiFetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await apiFetch("/api/me");
        setUser(data);
      } catch (error) {
        console.error(error);
        setError("You are not authenticated.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-[#050505] text-[#f5f3f1]">
        <div className="editorial-label text-[#66635f]">
          Loading / DARIORA
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#050505] text-[#f5f3f1]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 py-24 md:py-32">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0 border-b border-white/10 pb-8 md:pb-8">

          <div className="flex-1">
            <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
              DARIORA / DASHBOARD
            </div>

            <h1 className="display mt-4 md:mt-8 text-[clamp(40px,8vw,125px)]">
              WELCOME
              <br />
              <span className="text-[#ff3b16]">
                BACK.
              </span>
            </h1>
          </div>

          <div className="text-left md:text-right w-full md:w-auto md:ml-8">
            <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
              ACCOUNT
            </div>

            <p className="mt-2 md:mt-3 text-[14px] md:text-[18px] font-medium">
              {user.name}
            </p>

            <p className="mt-1 text-[12px] md:text-[13px] text-[#66635f]">
              {user.login}
            </p>
          </div>

        </div>


        {/* USER INFO */}
        <section className="mt-16 md:mt-24">

          <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
            YOUR ACCOUNT
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/10">

            <div className="border-b sm:border-b-0 sm:border-r border-white/10 py-6 md:py-8 pr-0 sm:pr-6 md:pr-8">
              <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
                NAME
              </div>

              <div className="mt-4 text-[18px] md:text-[24px]">
                {user.name}
              </div>
            </div>

            <div className="border-b sm:border-b-0 lg:border-r border-white/10 py-6 md:py-8 px-0 sm:px-6 md:px-8">
              <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
                LOGIN
              </div>

              <div className="mt-4 text-[18px] md:text-[24px] break-all">
                {user.login}
              </div>
            </div>

            <div className="py-6 md:py-8 pl-0 lg:pl-8">
              <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
                EMAIL
              </div>

              <div className="mt-4 text-[18px] md:text-[24px] break-all">
                {user.email || "—"}
              </div>
            </div>

          </div>

        </section>


        {/* QUICK NAVIGATION */}
        <section className="mt-16 md:mt-32">

          <div className="editorial-label text-[#66635f] text-[10px] md:text-[11px]">
            EXPLORE
          </div>

          <div className="mt-6 md:mt-8">

            <Link
              href="/courses"
              className="group flex min-h-[80px] md:min-h-[120px] items-center border-t border-white/10"
            >
              <span className="w-[60px] md:w-[100px] text-[11px] md:text-[12px] text-[#66635f]">
                01
              </span>

              <span className="flex-1 text-[clamp(28px,5vw,70px)] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-3">
                COURSES
              </span>

              <span className="text-[18px] md:text-[24px] text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2">
                →
              </span>
            </Link>


            <Link
              href="/students"
              className="group flex min-h-[80px] md:min-h-[120px] items-center border-t border-white/10"
            >
              <span className="w-[60px] md:w-[100px] text-[11px] md:text-[12px] text-[#66635f]">
                02
              </span>

              <span className="flex-1 text-[clamp(28px,5vw,70px)] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-3">
                STUDENTS
              </span>

              <span className="text-[18px] md:text-[24px] text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2">
                →
              </span>
            </Link>


            <Link
              href="/enrollments"
              className="group flex min-h-[80px] md:min-h-[120px] items-center border-t border-white/10"
            >
              <span className="w-[60px] md:w-[100px] text-[11px] md:text-[12px] text-[#66635f]">
                03
              </span>

              <span className="flex-1 text-[clamp(28px,5vw,70px)] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-3">
                ENROLLMENTS
              </span>

              <span className="text-[18px] md:text-[24px] text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2">
                →
              </span>
            </Link>

            <div className="border-t border-white/10" />

          </div>

        </section>


        {/* ACTIONS */}
        <section className="mt-16 md:mt-32 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 border-t border-white/10 pt-8">

          <button
            onClick={handleLogout}
            className="btn-primary-sm flex-1 sm:flex-initial"
          >

            <span className="btn-primary__label">Sign out</span>

            <span className="btn-primary__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7H17V17" />
              </svg>
            </span>

          </button>

          <Link
            href="/"
            className="btn-secondary-sm flex-1 sm:flex-initial"
          >

            <span>← Back to Dariora</span>

          </Link>

        </section>

      </div>
    </main>
  );
}
