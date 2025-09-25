"use client";

import "../index.css";
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { SidebarProvider } from "@/Components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppSidebar } from "@/Components/AppSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const queryClient = new QueryClient();

export default function CrmLayout({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [verifyUser , setVerifyUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);

      if (!user) {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!firebaseUser) return;
    const verifyUser = async () => {
      try {
        const token = await firebaseUser.getIdToken();

        const res = await fetch("/api/authVerify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log ("Response from /api/authVerify:", res);
        const result = await res.json();
        setVerifyUser(result.user);
        console.log("Verified User:", result.user);
        if (res.ok) {
          // Handle redirection based on the user role
          if (result.user.isAdmin) {
            router.push("/threadflow"); // Redirect to admin page
          } else {
            router.push(`/threadflow/c/${result.user.company.slug}`); // Redirect to client page
          }
        } else {
          router.push("/unauthorized"); // Handle unauthorized access
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        router.push("/unauthorized");
      }
    };

    verifyUser();
  }, [firebaseUser]);

  return (
    <div className="crm-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar companySlug={verifyUser?.company?.slug} isAdmin={verifyUser?.isAdmin} companyName = {verifyUser?.company?.name} />
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}
