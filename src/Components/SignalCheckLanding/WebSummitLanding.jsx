'use client';

import React from 'react';
import { CheckCircle, ArrowRight, Search, Linkedin, FileText, Users, Zap, MessageSquare, TrendingUp, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CTA from '@/app/services/developer-marketing-agency/cta';

export default function WebSummitLanding() {

  const whoItIsFor = [
    'Are at Web Summit Qatar 2026 as a founder, builder, or early team',
    'Lead a tech-first product (infra, AI, devtools, OSS, security)',
    'Are early-stage (pre-seed to Series A) and still refining your narrative',
    'Sell to technical buyers or sophisticated partners',
    'Want to show signal, not noise'
  ];

  const whatHappens = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      number: '1',
      title: 'Conversations get compressed',
      description: 'Across content tracks, expo halls, meetups, and hallway chats, strangers distill your product into a 1-line description — whether it\'s accurate or not.'
    },
    {
      icon: <Search className="w-8 h-8" />,
      number: '2',
      title: 'Searches happen instantly',
      description: 'After 2–3 sentences, people Google you, check your LinkedIn, and scan your docs or demos.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: '3',
      title: 'Impressions stick',
      description: 'At an event this big — with investors, partners, and media in the mix — first impressions compound long after Doha.'
    }
  ];

  const whatWeDo = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Core story refinement',
      description: 'Clear value props that survive pressure tests — not buzzwords.'
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Search & public signal alignment',
      description: 'Your Google / LinkedIn / homepage / docs all reinforce the same story.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Technical content that drives credibility',
      description: 'Not fluff — content that speaks to technical buyers first.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Pre-Summit rehearsal',
      description: 'Practice critical spoken and written messaging before conversations matter.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0A1A] text-white">
      {/* Hero Section */}
      <section className="w-full mt-24 flex justify-center items-center overflow-hidden" style={{
        background: 'radial-gradient(circle at 50% 42%, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.15) 28%, rgba(15, 23, 42, 0) 54%)'
      }}>
        <div className="relative z-10 w-full max-w-4xl px-6 py-24">
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Doha | Feb 1–4, 2026 | 30,000+ attendees</p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Web Summit Qatar 2026 is where the global tech ecosystem gathers —{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                but the story they walk away with starts before you speak.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl font-medium">
              Turn casual conversations into clarity — not confusion.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-base mt-4"
            >
              Book Your Pre-Summit Narrative Check <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Why This Matters To You</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Web Summit Qatar isn't just another conference
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mb-6">
              It's the Middle East's fastest-growing global tech stage, with thousands of startups, hundreds of investors, masterclasses, and world-class speakers shaping what's next.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/40 rounded-xl p-8">
            <p className="text-lg text-white/90 mb-4">
              But here's the reality most early-stage founders <span className="text-white font-semibold">don't prepare for</span>:
            </p>
            <p className="text-xl text-white font-medium mb-4">
              After a quick chat, people look you up online.
            </p>
            <p className="text-lg text-white/80 mb-4">
              They <span className="italic">judge</span> your product, positioning, and credibility — before your next conversation starts.
            </p>
            <p className="text-xl text-violet-300 font-semibold">
              If they don't immediately get you, interest evaporates.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Who This Is For</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              This is for you if you:
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {whoItIsFor.map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-violet-400/40 transition">
                <CheckCircle className="w-6 h-6 text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-white/90">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border-2 border-violet-400/40 rounded-xl p-8 text-center">
            <p className="text-xl text-white font-semibold">
              This is not for teams that just want another badge.
            </p>
          </div>
        </div>
      </section>

      {/* What Actually Happens */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">What Actually Happens</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Actually Happens at Web Summit
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatHappens.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-violet-400/40 transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-400 font-bold text-xl">
                    {item.number}
                  </div>
                  <div className="text-violet-400">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">What We Do For You</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lock in a clear, defensible narrative before you land in Doha
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {whatWeDo.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-violet-400/40 transition">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-violet-500/10 border-l-4 border-violet-400 p-6 rounded-r-xl">
            <p className="text-white/90 text-lg">
              This isn't marketing smoke — it's practical preparation that keeps you confident on stage, floor, and follow-ups.
            </p>
          </div>
        </div>
      </section>

      {/* Reality Check */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Reality Check</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Web Summit Qatar 2026 will be big — <span className="italic">global</span> big.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* If narrative isn't tight */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-red-300">If your narrative isn't tight:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-white/80">People <span className="italic">misinterpret</span> your value</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-white/80">Investors remember you as "nice, but unclear"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-white/80">Conversations end <span className="italic">before they begin</span></span>
                </li>
              </ul>
            </div>

            {/* If narrative is tight */}
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-green-300">If your narrative is tight:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-white/80">Follow-ups come from <span className="italic">clarity</span>, not confusion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-white/80">Warm intros turn into meetings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-white/80">Momentum continues long after Doha</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/40 rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Book Your Pre-Summit Check
            </h2>
            <p className="text-lg text-white/80 mb-4">
              <span className="font-semibold text-white">This is not a pitch.</span>
            </p>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              It's a practical review aimed at making sure that when people search you — before or after a talk — they see <span className="italic">signal, not noise.</span>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-base"
            >
              Book a 15-min Narrative Check <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-white/50 mt-4 italic">
              (Slots fill up fast before big events like Web Summit.)
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>

      {/* CTA - Using common component */}
      <CTA />
    </div>
  );
}
