"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/threadflow/client-dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="animate-pulse text-[rgba(255,255,255,0.4)] text-[13px]">
        Redirecting to dashboard...
      </div>
    </div>
  );
}
