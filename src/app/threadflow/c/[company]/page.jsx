"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CompanyDashboardRedirect() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.company) {
      router.replace(`/threadflow/c/${params.company}/client-dashboard`);
    }
  }, [router, params]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="animate-pulse text-[rgba(255,255,255,0.4)] text-[13px]">
        Redirecting to dashboard...
      </div>
    </div>
  );
}
