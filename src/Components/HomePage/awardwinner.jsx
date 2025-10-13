import Link from "next/link";
import React from "react";
import { ArrowRight, X } from "lucide-react";

export default function AwardBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-4 px-2 sm:px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-3 px-3 sm:px-4 md:px-6 hover:bg-white/15 transition-all duration-300 group shadow-lg w-full max-w-4xl">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer flex-1 min-w-0">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 rounded-full p-1.5 sm:p-2 shadow-md flex-shrink-0">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href="/playbook/developer-marketing">
                  <p className="text-sm sm:text-base font-semibold text-white cursor-pointer hover:text-purple-200 transition-colors duration-200 leading-tight">
                    <span className="hidden sm:inline">Download Free Playbook: [2025] Developer Marketing Playbook for B2B SaaS Startups</span>
                    <span className="sm:hidden">Download Free Playbook: [2025] Dev Marketing Playbook for B2B SaaS</span>
                  </p>
                </Link>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-full p-1.5 sm:p-2 cursor-pointer flex-shrink-0"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}