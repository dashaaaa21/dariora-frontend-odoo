"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        await apiFetch("/api/me");

        setAuthenticated(true);
      } catch {
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-[#050505] text-[#f5f3f1]">
        <div className="editorial-label text-[#66635f]">
          AUTHENTICATING / DARIORA
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
