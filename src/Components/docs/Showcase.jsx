'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Showcase({ items }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The fastest-growing AI and DevTool companies trust Infrasity with their documentation.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            From SDKs to CLIs — we've helped next-gen infrastructure and agentic platforms turn documentation into their strongest adoption driver.
          </p>
        </div>

        <div className="space-y-10">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="group relative rounded-2xl bg-gradient-to-r from-[#00D4FF]/10 via-[#7B61FF]/5 to-[#B14EFF]/10 p-[1px] transition-all duration-300 hover:from-[#00D4FF]/20 hover:via-[#7B61FF]/10 hover:to-[#B14EFF]/20"
            >
              <div
                className={`relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl bg-[#0E1018]/90 backdrop-blur-md`}
                style={{ direction: i % 2 === 1 ? 'rtl' : 'ltr' }}
              >
                <div className="relative min-h-[320px] lg:min-h-[400px]" style={{ direction: 'ltr' }}>
                  {item.loomId ? (
                    <div className="absolute inset-0 p-3 lg:p-4">
                      <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#06080D] shadow-[0_0_40px_rgba(123,97,255,0.15)]">
                        <iframe
                          src={`https://www.loom.com/embed/${item.loomId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=true&loop=true&muted=true&controls=false&t=0`}
                          frameBorder="0"
                          webkitallowfullscreen="true"
                          mozallowfullscreen="true"
                          allowFullScreen
                          allow="autoplay; fullscreen"
                          className="absolute inset-0 w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 p-3 lg:p-4">
                      <div
                        aria-label={`${item.mediaLabel} animation placeholder`}
                        className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0E1018] to-[#06080D] shadow-[0_0_40px_rgba(123,97,255,0.15)]"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.15),transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(123,97,255,0.15),transparent_60%)]" />
                        <div className="relative z-10 flex h-full w-full items-center justify-center">
                          <div className="flex flex-col items-center gap-3 rounded-xl border border-[#1E2236] bg-[#0E1018]/70 px-8 py-10 text-center backdrop-blur-sm">
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Preview</span>
                            <span className="font-mono text-sm text-gray-300">Looping docs video placeholder</span>
                            <span className="text-[11px] text-gray-500">smooth 0.8x motion</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-8 lg:px-10 lg:py-12 flex flex-col justify-center gap-5" style={{ direction: 'ltr' }}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D4FF]/25 to-[#7B61FF]/25 flex items-center justify-center border border-[#00D4FF]/40 shadow-[0_0_25px_rgba(0,212,255,0.2)]">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-transparent bg-clip-text">
                        {item.name.substring(0, 2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-white">{item.name}</p>
                      <Link href={item.url} className="inline-flex items-center gap-2 font-mono text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                        {item.url}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">{item.description}</p>
                  <Link
                    href={item.url}
                    className="inline-flex w-max items-center gap-2 rounded-lg bg-gradient-to-r from-[#00D4FF]/10 to-[#7B61FF]/10 border border-[#00D4FF]/20 px-5 py-2 text-sm font-semibold text-cyan-300 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] focus-visible:translate-y-0 focus-visible:opacity-100"
                  >
                    View Docs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-400">Want your docs to look (and perform) like these?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(123,97,255,0.4)] inline-flex items-center gap-2 w-max">
              Book a Docs Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-[#0E1018]/80 backdrop-blur-md text-white font-semibold rounded-lg border border-[#1E2236] hover:bg-[#0E1018] transition-all duration-300 inline-flex items-center justify-center w-max">
              See How We Build Docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
