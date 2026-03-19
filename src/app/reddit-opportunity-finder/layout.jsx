"use client";

import "../index.css";
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Search } from "lucide-react";

const queryClient = new QueryClient();

export default function SerpScoutLayout({ children }) {

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
