import Link from "next/link";
import React from "react";
import { Award, ArrowRight, X } from "lucide-react";

export default function AwardBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="hidden md:block w-6"></div>

        <div className="flex items-center justify-center flex-grow gap-2 text-sm md:text-base">
          <Award className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
          <p className="text-center">
            Infrasity has been recognized as the{" "}
            <span className="font-bold">#1 Startup in New Delhi</span> by
            HackerNoon's Startups of the Year Awards 2025.
          </p>
          <Link
            href="https://hackernoon.com/startups/winner-award?type=city&slug=asia-new-delhi-dl-india&rank=1"
            className=" relative z-10 flex items-center ml-2 font-medium hover:underline whitespace-nowrap "
          >
            Know More <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white z-10 hover:text-gray-200 focus:outline-none"
          aria-label="Close banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
