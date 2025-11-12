'use client';

import { ArrowRight, Check, Sparkles, Calendar, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main CTA Card */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-30" />

          <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Limited Time Offer</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to 10x Your
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Developer Experience?
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-8 max-w-3xl">
              Get documentation that converts visitors into users. We handle everything from API references to interactive tutorials.
            </p>

            {/* Benefits list */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                'Complete documentation overhaul in 4 weeks',
                'Written by senior engineers',
                'SEO-optimized for discoverability',
                'Interactive code examples included',
                'Version control & migration guides',
                'Ongoing maintenance available'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row gap-4">
              <button className="group flex-1 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Free Documentation Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex-1 px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat with Our Team
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-10 border-t border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-gray-400">Happy Clients</div>
                  </div>
                  <div className="w-px h-12 bg-gray-800" />
                  <div>
                    <div className="text-2xl font-bold text-white">4.9/5</div>
                    <div className="text-sm text-gray-400">Client Rating</div>
                  </div>
                  <div className="w-px h-12 bg-gray-800" />
                  <div>
                    <div className="text-2xl font-bold text-white">24hr</div>
                    <div className="text-sm text-gray-400">Response Time</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>3 spots left this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Mini Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              q: "How long does it take?",
              a: "Most projects complete in 2-4 weeks depending on scope."
            },
            {
              q: "What if I need changes?",
              a: "Unlimited revisions during development, plus ongoing support."
            },
            {
              q: "Do you work with all stacks?",
              a: "Yes! We document any language, framework, or platform."
            }
          ].map((faq) => (
            <div key={faq.q} className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
              <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}