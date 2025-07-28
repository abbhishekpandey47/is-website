import Link from "next/link";
import React from "react";
import { Award, ArrowRight, X } from "lucide-react";

export default function AwardBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white pb-2 pt-1 px-3 sm:px-4">
      <div>
    <div className="relative w-full px-4 py-1">
  {/* Close Button */}
  <button
    onClick={() => setIsVisible(false)}
    className="absolute right-2 top-2 text-white hover:text-gray-200 hover:bg-purple-800/90 rounded-full focus:outline-none z-10 cursor-pointer"
    aria-label="Close banner"
  >
    <X className="h-4 w-4 sm:h-5 sm:w-5" />
  </button>

  {/* Banner Content */}
  <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-center text-xs sm:text-sm md:text-base px-6 sm:px-0 z-20">
    <Award className="h-4 w-4 md:w-6 flex-shrink-0" />
    <p className="text-white">
      Infrasity has been recognized as the{" "}
      <span className="font-bold">#1 Startup in New Delhi, India</span> by HackerNoon's Startups of the Year Awards 2024.{" "}
      <Link
  href="https://hackernoon.com/startups/winner-award?type=city&slug=asia-new-delhi-dl-india&rank=1"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center font-medium hover:underline text-xs sm:text-sm ml-1 z-20"
  aria-label="Read more about Infrasity's award"
>
  <span className="whitespace-nowrap z-20 cursor-pointer">Know More</span>
  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 z-20 cursor-pointer" />
</Link>

    </p>
  </div>
</div>



        {/* <div className="divider-line divider-top"></div> */}

        <div className=" flex items-center justify-center md:px-4">
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


    </div>
  );
}
