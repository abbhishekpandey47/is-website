'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <div className="relative flex items-center justify-center px-8 py-16">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl quicksand-bold text-white mb-6">
          Ready to Build Your <span className="specialtext">Growth Engine</span>?
        </h1>

        {/* Subheading */}
        <p className="text-[wheat] text-lg md:text-xl mb-10 max-w-2xl mx-auto quicksand-semibold">
          Get the complete playbook and start implementing a systematic approach to developer growth today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <button className="group bg-btnprimary hover:bg-btnprimaryhov text-white quicksand-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg">
            Get the Playbook
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Secondary Button */}
          <button className="group bg-[#888]/20 backdrop-blur-sm border-2 ring-1 ring-black/5 border-white/20 hover:border-white/40 text-white quicksand-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Talk to Infrasity
          </button>
        </div>
      </div>
    </div>
  );
}