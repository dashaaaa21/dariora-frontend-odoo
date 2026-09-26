"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("api_token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#050505] text-[#f5f3f1]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 py-24">
        <div className="editorial-label text-[#66635f]">SETTINGS</div>
        <h1 className="display mt-8 text-[clamp(40px,8vw,125px)]">
          Platform Settings
        </h1>
        <p className="mt-8 text-[#a6a3a0]">Settings page for DARIORA Academy Platform</p>
      </div>
    </main>
  );
}
