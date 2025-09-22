'use client'

import '../index.css';
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { SidebarProvider } from "@/Components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppSidebar } from "@/Components/AppSidebar";

const queryClient = new QueryClient();

export default function CrmLayout({ children }) {
    return (
        <div className="crm-theme">
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <SidebarProvider>
                    <div className="min-h-screen flex w-full">
                        <AppSidebar />
                        <main className="flex-1 overflow-hidden">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </TooltipProvider>
        </QueryClientProvider>
        </div>
    );
}