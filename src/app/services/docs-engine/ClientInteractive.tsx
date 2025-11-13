'use client';

import type { Deliverable } from './_data';
import { deliverables } from './_data';

export default function ClientInteractive() {
  return (
    <>
      {/* What We Build */}
      <section id="what-we-build" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              What We{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Build
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Documentation and GTM systems that shorten activation time, increase self-serve adoption, and reduce support load for engineering-led startups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                >
                  {/* Icon in square */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:border-cyan-500/50 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Metric */}
                  <div className="text-sm font-semibold text-cyan-400 mb-2">
                    {item.metric}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Benefit bullet */}
                  <div className="text-sm text-slate-300 mb-3">
                    {item.benefit}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

