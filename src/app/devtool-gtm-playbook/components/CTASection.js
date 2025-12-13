'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-8">
      <div className="max-w-4xl w-full text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Build Your <span className="text-cyan-400">Growth Engine</span>?
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Get the complete playbook and start implementing a systematic approach to developer growth today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <button className="group bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40">
            Get the Playbook
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Secondary Button */}
          <button className="group bg-transparent border-2 border-zinc-700 hover:border-cyan-400 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Talk to Infrastly
          </button>
        </div>
      </div>
    </div>
  );
}