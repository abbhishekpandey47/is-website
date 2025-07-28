import Link from "next/link";
import React from "react";
import { ArrowRight, X } from "lucide-react";

export default function AwardBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white pb-2 py-2 px-3 sm:px-4">
      <div className="flex items-center justify-center md:px-4">
        <div className="lg:mx-auto flex items-center justify-center">
          <div className="md:max-w-lg bg-white/15 rounded-lg border border-white/30 flex items-center justify-between gap-3 py-1 px-4 hover:bg-white/20 transition-all duration-200 group">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="bg-white/20 rounded-full p-1">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
              <div className="z-20">
                <Link className="z-10" href="/playbook/reddit-b2b-marketing">
                  <p className="text-sm font-medium text-white text-center cursor-pointer">
                    Download Free Playbook: Reddit B2B Playbook
                  </p>
                </Link>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full p-1 z-10 cursor-pointer"
            >
              <X className="z-10" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}