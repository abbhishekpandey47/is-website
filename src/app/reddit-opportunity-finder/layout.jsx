"use client";

import "../index.css";
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { Search, LogOut, User } from "lucide-react";

const queryClient = new QueryClient();

export default function SerpScoutLayout({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [verifyUser, setVerifyUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);

      if (!user) {
        window.location.href = "/auth/signin?redirect=/reddit-opportunity-finder";
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!firebaseUser) return;
    let cancelled = false;
    const verify = async () => {
      try {
        const token = await firebaseUser.getIdToken(true);
        const res = await fetch("/api/authVerify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response from /api/authVerify:", res);
        const result = await res.json();
        if (!cancelled) {
          setVerifyUser(result.user);
        }
        console.log("Verified User:", result.user);
        if (!res.ok) {
          router.push("/unauthorized");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error verifying user:", error);
          router.push("/unauthorized");
        }
      }
    };

    verify();
    return () => { cancelled = true; };
  }, [firebaseUser, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  return (
    <div className="crm-theme" suppressHydrationWarning>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen w-full bg-background">
            {/* Top navbar */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-16 items-center justify-between px-6 sm:px-8 lg:px-12">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">Reddit Opportunity Finder</span>
                  </div>
                  {verifyUser?.company?.name && (
                    <span className="hidden sm:inline-flex text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                      {verifyUser.company.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {firebaseUser && (
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        <span className="max-w-[160px] truncate">{firebaseUser.email}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="px-6 sm:px-8 lg:px-12 py-6">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}
