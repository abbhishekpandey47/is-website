'use client';

import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              Documentation That Drives{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Developer Adoption
              </span>
        </h1>

            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
          We build SDK, API, CLI, and integration docs that engineers actually use—written by engineers, optimized for growth.
        </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
          <button
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 hover:scale-105"
          >
            See Example Docs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200"
          >
            Book a Docs Audit
          </button>
        </div>

            {/* Trust line */}
            <p className="text-sm text-slate-500 font-mono">
          Built by engineers, not copywriters.
        </p>
      </div>

          {/* Right: Visual placeholder - markdown→render animation */}
          <div className="relative">
            <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 text-xs text-slate-500 font-mono">quickstart.md</span>
              </div>

              {/* Code content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-cyan-400 font-mono text-sm">## Quick Start</div>
                  <div className="text-slate-400 text-sm">Install the SDK:</div>
                </div>

                <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800">
                  <code className="text-emerald-400 font-mono text-sm">
                    npm install @infrasity/sdk
                  </code>
                </div>

                <div className="space-y-2">
                  <div className="text-slate-400 text-sm">Initialize in your app:</div>
                  <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800 space-y-1">
                    <code className="block text-purple-400 font-mono text-sm">
                      <span className="text-slate-500">const</span> client = <span className="text-cyan-400">new</span> SDK({'{'}
                    </code>
                    <code className="block text-slate-400 font-mono text-sm pl-4">
                      apiKey: process.env.API_KEY
                    </code>
                    <code className="block text-purple-400 font-mono text-sm">{'}'});</code>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-slate-600">
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-xs font-mono">renders to polished docs</span>
                </div>
              </div>

              {/* Gradient overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-2xl -z-10 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
