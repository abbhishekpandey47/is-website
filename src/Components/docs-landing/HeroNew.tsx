'use client';

import { ArrowRight, Code2, FileText, Terminal, Zap, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroNew() {
  const [activeWord, setActiveWord] = useState(0);
  const words = ['SDKs', 'APIs', 'CLIs', 'Integrations'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-lg p-4">
          <Code2 className="w-6 h-6 text-purple-400" />
        </div>
      </div>

      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-4">
          <FileText className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      <div className="absolute bottom-40 left-20 animate-float">
        <div className="bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-lg p-4">
          <Terminal className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-300">Trusted by 500+ DevTools Companies</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block text-white mb-2">Documentation for</span>
          <span className="relative inline-block min-h-[1.2em]">
            {words.map((word, index) => (
              <span
                key={word}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeWord
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform -translate-y-4'
                }`}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {word}
                </span>
              </span>
            ))}
          </span>
          <span className="block text-white mt-2">That Developers Love</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
          We transform complex technical products into crystal-clear documentation.
          Written by engineers, optimized for adoption.
        </p>

        {/* Features list */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            'API Reference',
            'SDK Guides',
            'Interactive Examples',
            'Version Control'
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Sample Docs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            Get Documentation Audit
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <p className="text-gray-500 mb-6">Trusted by leading developer tools</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {['Stripe', 'Twilio', 'Vercel', 'Supabase', 'Railway'].map((company) => (
              <div key={company} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}