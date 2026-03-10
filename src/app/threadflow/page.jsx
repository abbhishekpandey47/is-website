"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return; // layout handles redirect to signin

      try {
        const token = await user.getIdToken(true);
        const res = await fetch("/api/authVerify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { user: verifiedUser } = await res.json();

        if (verifiedUser?.isAdmin) {
          router.replace("/threadflow/client-dashboard");
        } else if (verifiedUser?.company?.slug) {
          router.replace(`/threadflow/c/${verifiedUser.company.slug}/client-dashboard`);
        } else {
          router.replace("/threadflow/client-dashboard");
        }
      } catch {
        router.replace("/threadflow/client-dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="animate-pulse text-[rgba(255,255,255,0.4)] text-[13px]">
        Redirecting to dashboard...
      </div>
    </div>
  );
}
