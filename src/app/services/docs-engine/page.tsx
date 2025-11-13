import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ClientInteractive from './ClientInteractive';
import {
  trustedCompanies,
  caseStudies,
  differenceCards,
  process,
  metrics,
  edgeFeatures,
} from './_data';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function DocsEnginePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          {/* Trust badge */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
              ✨ trusted by engineering-led startups
            </span>
          </div>

          {/* Hero content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                Documentation That Drives{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Developer Adoption
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Link href="#case-studies" className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all inline-flex items-center justify-center gap-2 text-center">
                  See Example Docs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact?topic=docs-audit" className="px-8 py-4 bg-slate-800/50 backdrop-blur text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-all text-center">
                  Book a Docs Audit
                </Link>
              </div>
            </div>

            {/* Code preview */}
            <div className="relative">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-950/50 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 text-xs text-slate-500 font-mono">quickstart.md</span>
                  <div className="ml-auto text-xs text-slate-600">→ rendered-docs</div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-slate-800">
                  {/* Markdown */}
                  <div className="p-6 bg-slate-950/30">
                    <div className="space-y-3 font-mono text-sm">
                      <div className="text-cyan-400">## Quick Start</div>
                      <div className="text-slate-400">Install the SDK:</div>
                      <div className="bg-slate-950 px-3 py-2 rounded border border-slate-800">
                        <code className="text-emerald-400">npm install @infrasity/sdk</code>
                      </div>
                      <div className="text-slate-400">Initialize in your app</div>
                      <div className="text-slate-500">_</div>
                    </div>
                  </div>

                  {/* Rendered */}
                  <div className="p-6 bg-gradient-to-br from-blue-950/20 to-slate-950/30">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Quick Start
                      </h3>
                      <p className="text-sm text-slate-300">Install the SDK:</p>
                      <div className="bg-slate-950 px-3 py-2 rounded font-mono text-sm border border-slate-800">
                        <code className="text-emerald-400">$ npm install @infrasity/sdk</code>
                      </div>
                      <div className="text-xs text-green-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Ready to use
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 mb-8">Trusted by engineering-led startups</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustedCompanies.map((company, i) => (
              <div key={i} className="flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur rounded-lg border border-slate-800 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
                  <span className="text-xl font-bold text-cyan-400">{company.initial}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              The fastest-growing AI and DevTool companies trust Infrasity with their documentation.
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              From SDKs to CLIs — we've helped next-gen infrastructure and agentic platforms turn documentation into their strongest adoption driver.
            </p>
          </div>

          <div className="space-y-10">
            {caseStudies.map((study, i) => (
              <div
                key={study.name}
                className="group relative rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 p-[1px] transition-all duration-300 hover:from-cyan-500/35 hover:via-blue-500/20 hover:to-purple-500/35"
              >
                <div
                  className={`relative flex flex-col lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''} overflow-hidden rounded-[1.05rem] bg-slate-950/80`}
                >
                  <div className="relative flex-1 aspect-video min-h-[320px] lg:min-h-[400px]">
                    {study.loomId ? (
                      <div className="absolute inset-0 p-3 lg:p-4">
                        <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-950 shadow-[0_0_45px_rgba(56,189,248,0.15)]">
                          <iframe 
                            src={`https://www.loom.com/embed/${study.loomId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=true&loop=true&muted=true&controls=false&t=0`}
                            frameBorder="0" 
                            allowFullScreen
                            allow="autoplay; fullscreen"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            title={study.mediaLabel}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 p-3 lg:p-4">
                        <div
                          aria-label={`${study.mediaLabel} animation placeholder`}
                          className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_0_45px_rgba(56,189,248,0.15)]"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.25),transparent_60%)]" />
                          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),transparent_40%,rgba(168,85,247,0.08))]" />
                          <div className="relative z-10 flex h-full w-full items-center justify-center">
                            <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-800/60 bg-slate-900/70 px-8 py-10 text-center backdrop-blur-sm">
                              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Preview</span>
                              <span className="font-mono text-sm text-slate-300">Looping docs GIF placeholder</span>
                              <span className="text-[11px] text-slate-500">smooth 0.8x motion</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 px-6 py-8 lg:px-10 lg:py-12 flex flex-col justify-center gap-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/25 to-purple-500/25 flex items-center justify-center border border-cyan-500/40 shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                        <span className="text-2xl font-bold text-cyan-400">{study.name.substring(0, 2)}</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-white">{study.name}</p>
                        <Link href={study.url} className="inline-flex items-center gap-2 font-mono text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                          {study.url}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    <p className="text-lg text-slate-300 leading-relaxed">{study.description}</p>
                    <Link
                      href={study.url}
                      className="inline-flex w-max items-center gap-2 rounded-lg bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 opacity-0 translate-y-2 shadow-[0_10px_30px_rgba(56,189,248,0.15)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    >
                      View Docs
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="text-slate-400">Want your docs to look (and perform) like these?</p>
            <div className="flex justify-center">
              <Link href="/contact?topic=docs-audit" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all inline-flex items-center justify-center gap-2">
                Book a Docs Audit <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Infrasity Difference */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Infrasity Difference</h2>
            <p className="text-xl text-slate-400">Why founders choose Infrasity for docs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differenceCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-slate-950/50 backdrop-blur rounded-xl border border-slate-800 p-8 hover:border-cyan-500/30 transition-colors">
                  <Icon className="w-12 h-12 text-cyan-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Build - Client Interactive */}
      <ClientInteractive />

      {/* Process */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            We Build Docs Like You Build Code
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg border-4 border-slate-950">
                    {step.number}
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur rounded-xl border border-slate-800 p-6 pt-12 hover:border-cyan-500/30 transition-colors">
                    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                    <code className="text-sm text-slate-500 font-mono">{step.file}</code>
                    <h3 className="text-lg font-bold text-white mt-3 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            What Happens After Launch
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur rounded-xl border border-cyan-500/30 p-8 text-center">
                  <Icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold text-cyan-400 mb-2">{metric.value}</div>
                  <div className="text-lg text-white mb-1">{metric.label}</div>
                  <div className="text-sm text-slate-500">{metric.company}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Infrasity Edge */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Docs Aren't Content. They're Product.
            </h2>
            <p className="text-xl text-slate-400">
              That's why AI, Infra, and DevTool startups trust Infrasity with their documentation layer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {edgeFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-slate-950/50 backdrop-blur rounded-xl border border-slate-800 p-8 hover:border-cyan-500/30 transition-colors">
                  <Icon className="w-12 h-12 text-cyan-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur rounded-2xl border border-cyan-500/30 p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="relative text-center space-y-6">
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
                ready to level up your docs?
              </div>
              <h2 className="text-4xl font-bold text-white">
                Ready to turn your docs into your best growth channel?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 items-stretch sm:items-center">
                <Link href="/contact?topic=docs-audit" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all inline-flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Audit My Docs
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pricing#docs" className="px-8 py-4 bg-slate-800/50 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-all">
                  Get Pricing Deck
                </Link>
              </div>
              <p className="text-slate-400 pt-4">
                Join Kubiya, DevZero, Firefly, and other engineering-led startups
              </p>
            </div>
          </div>

          {/* Code block */}
          <div className="mt-12 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 p-6">
            <pre className="text-cyan-400 font-mono text-sm">
{`// Building great docs
const documentation = {
  quality: 'excellent',
  impact: 'measurable',
  adoption: 'increasing'
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
