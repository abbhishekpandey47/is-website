import Link from "next/link";
import React from "react";
import { Award, ArrowRight, X } from "lucide-react";

export default function AwardBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 sm:px-4">
      <div>
      <div className="mx-auto flex items-center justify-center">
        <div className="flex items-center justify-center flex-grow gap-0 sm:gap-2 text-xs sm:text-sm md:text-base -mb-4">
          <Award className="h-4 w-4 sm:h-5 sm:w-full md:h-6 md:w-6  flex-shrink-0" />
          <p className="text-center lg:text-center">
            Infrasity has been recognized as the{" "}
            <span className="font-bold">#1 Startup in New Delhi,India</span> by
            HackerNoon's Startups of the Year Awards 2024.
          </p>
          <Link
            href="https://hackernoon.com/startups/winner-award?type=city&slug=asia-new-delhi-dl-india&rank=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline whitespace-nowrap text-xs sm:text-sm"
            aria-label="Read more about Infrasity's award as #1 Startup in New Delhi"
          >
            <span className="hidden z-10 xs:inline">Know More</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0 sm:ml-1" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white z-10 hover:text-gray-200 focus:outline-none ml-1"
          aria-label="Close banner"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        </div>

<div className="relative pt-10 px-4">
          <div className="container mx-auto flex items-center justify-center">
            <div className="max-w-lg bg-white/15 rounded-lg border border-white/30 flex items-center justify-between gap-3 py-1 px-4 hover:bg-white/20 transition-all duration-200 group">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="bg-white/20 rounded-full p-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
                <div className="z-20">
                  <Link className="z-10" href="/playbook/reddit-b2b-marketing">
                  <p className="text-sm font-medium text-white text-center">
                    Download Free Playbook: Reddit B2B Playbook
                  </p>
                  </Link>
                </div>
              </div>
              <button
          onClick={() => setIsVisible(false)}
                className="text-white/60 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full p-1"
              >
                <X className="z-10" size={16} />
              </button>
            </div>
          </div>
        </div>


      </div>


    </div>
  );
}
