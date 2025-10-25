"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <div className="w-full mt-16">
      <div className="relative overflow-hidden rounded-2xl py-6 md:py-10 lg:py-7">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>

        {/* Overlay effects */}
        <div className="inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-64 bg-gradient-to-tl from-purple-300/10 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative md:gap-4 px-6 md:px-12 flex flex-col md:flex-row items-center md:justify-between -mt-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="font-[quicksand] text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to achieve similar results for your startup?
            </h2>
            <p className="text-gray-300 mt-4 text-lg">
              Let's discuss how we can help you scale through technical content and developer marketing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-0 md:mt-5">
            <Link
              href="/contact"
              className="w-full md:w-auto group no-underline inline-flex items-center gap-2 bg-black backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="text-[18px] text-center">Book a Call</span>
              <ArrowRight className="h-5 w-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/case-studies"
              className="w-full md:w-auto group no-underline inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="text-[18px] text-center">View More Case Studies</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
