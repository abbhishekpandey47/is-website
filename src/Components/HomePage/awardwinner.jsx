"use client";
import Link from "next/link";
import React from "react";
import { ArrowRight, X } from "lucide-react";

export default function AwardBanner() {
  const [isVisible, setIsVisible] = React.useState(true);
  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-1.5 sm:py-2 px-2 sm:px-4 overflow-hidden z-50">
      {/* Subtle Background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-md border border-white/20 flex items-center justify-between gap-2 px-3 hover:bg-white/15 transition-all duration-300 group shadow-md w-full max-w-md h-[36px] sm:h-[38px]">
            
            {/* Clickable Link */}
            <Link
              href="/playbook/developer-marketing"
              className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer justify-center relative z-10"
            >
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 rounded-full p-[3px] flex-shrink-0">
                <ArrowRight className="h-3 w-3 text-white" />
              </div>
              <p className="text-[0.78rem] sm:text-[0.82rem] font-medium text-white hover:text-purple-200 transition-colors duration-200 leading-tight text-center truncate">
                Download Free Developer Marketing Playbook [2026]
              </p>
            </Link>

            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-full p-1 cursor-pointer flex-shrink-0"
              aria-label="Close banner"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}