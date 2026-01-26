'use client';

import React from 'react';
import { CheckCircle, ArrowRight, Search, Linkedin, Github, FileText, Users, Zap, Calendar, MessageCircle, Coffee } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CTA from '@/app/services/developer-marketing-agency/cta';

export default function WebSummitLanding() {

  const whoItIsFor = [
    {
      title: 'Early-stage B2B SaaS startups',
      description: 'Pre-seed to Series A, refining product-market fit'
    },
    {
      title: 'AI, infra, OSS, devtools, security companies',
      description: 'Technical products solving developer problems'
    },
    {
      title: 'Teams in beta or stealth',
      description: 'Building in private, preparing for public visibility'
    },
    {
      title: 'Selling to technical buyers',
      description: 'Developers, platform teams, engineering leads, CTOs'
    },
    {
      title: 'Small teams without full GTM or DevRel bandwidth',
      description: 'Founders wearing multiple hats, no dedicated marketing yet'
    }
  ];

  const whatMatters = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Signal',
      subtitle: 'What actually sticks when you explain your product',
      description: 'At Web Summit, founders repeatedly hear how others describe their product back to them. This surfaces what sticks, what confuses people, and where your messaging breaks down.',
      points: [
        'How people describe your product in one sentence',
        'Which value props land vs. which create confusion',
        'Whether your positioning feels differentiated or crowded'
      ]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Context',
      subtitle: 'Where you stand in the market',
      description: 'Web Summit exposes you to your competitive landscape in real time. You\'ll learn how crowded or differentiated your category really is — and how buyers actually frame the problem you\'re solving.',
      points: [
        'What competitors and adjacent players are building',
        'How buyers frame the problem space',
        'Whether your category is emerging, crowded, or misunderstood'
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Relationships',
      subtitle: 'Connections that compound over time',
      description: 'The real value often shows up weeks or months later. Web Summit creates opportunities for warm intros, peer learning, and follow-ups that matter — not instant deals.',
      points: [
        'Warm intros to investors, partners, and customers',
        'Peer learning from founders at similar stages',
        'Post-event follow-ups that lead to real conversations'
      ]
    }
  ];

  const preCheckItems = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Google search for your company name',
      description: 'What comes up when someone searches your company? Is it you, or noise?',
      tip: 'Try searching in an incognito window. Check if your website, LinkedIn, and relevant content appear on the first page.'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: 'LinkedIn company page',
      description: 'Clear tagline, recent activity, and visible team members.',
      tip: 'Your company page should explain what you do in one line. Recent posts signal active momentum.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Founder LinkedIn profiles',
      description: 'Your background tells the story before you do.',
      tip: 'Technical credibility, relevant experience, and clear current role. Investors and partners check founders first.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Blog, docs, or technical content',
      description: 'Technical credibility lives in public artifacts.',
      tip: 'Even a few well-written posts or documentation pages signal seriousness to technical buyers.'
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub repos and demos',
      description: 'Open source presence, code quality signals, or working demos.',
      tip: 'For devtools and infra companies, GitHub is often the first place developers look to evaluate you.'
    }
  ];

  const eveningActivities = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Opening Night',
      description: 'The first evening sets the tone. Informal, high-energy, and full of first impressions.',
      detail: 'This is often where you\'ll have your first unstructured conversations with other attendees.'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Meet & Greet Gatherings',
      description: 'Smaller, curated groups organized by vertical, stage, or interest.',
      detail: 'These intimate settings often lead to deeper conversations than the main floor.'
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Activity-Based Meetups',
      description: 'From dinners to creative sessions. Shared experiences build faster rapport.',
      detail: 'Side activities create natural conversation starters and memorable connections.'
    }
  ];

  const infrasityServices = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Developer-first technical content',
      description: 'Blog posts, tutorials, and guides that developers actually read and trust.',
      benefit: 'Builds credibility with technical buyers before they talk to you'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Clear, explanatory landing pages',
      description: 'Pages that explain real value, not marketing speak. Technical clarity over hype.',
      benefit: 'Visitors understand what you do in seconds, not minutes'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Docs, guides, and walkthroughs',
      description: 'The artifacts that build technical credibility and reduce sales friction.',
      benefit: 'Developers can self-serve and evaluate your product independently'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Early visibility and launch narratives',
      description: 'Not hype — clarity that resonates with technical buyers and communities.',
      benefit: 'Your launch reaches the right audience with the right message'
    }
  ];

  const whyItMatters = [
    {
      title: 'The first real external narrative test',
      description: 'Web Summit is often the first time strangers explain your product back to you. What they say reveals what\'s actually landing — and what\'s getting lost.',
      tip: 'Pay attention to how people describe you after a 2-minute conversation.'
    },
    {
      title: 'A visibility inflection point',
      description: 'For early-stage teams, this is when the wider market starts to form impressions. The narrative that emerges here tends to stick.',
      tip: 'First impressions at scale are hard to undo. Preparation matters.'
    },
    {
      title: 'Preparation compounds',
      description: 'Teams that prep well have better conversations, clearer follow-ups, and stronger post-event momentum. The work you do now shows up for months.',
      tip: 'The ROI of pre-summit preparation far exceeds the cost.'
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
              <p className="text-violet-100 text-base font-medium">Web Summit Doha 2026</p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A Practical Pre-Check for Early-Stage SaaS Teams Attending{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web Summit Doha 2026
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              Web Summit isn't just about being present — it's where your product narrative, visibility, and positioning get tested in the open.
            </p>

            <p className="text-lg text-white/70 mb-6">
              This page helps early-stage teams prepare before they walk the floor.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-sm"
            >
              Book a Call <ArrowRight className="w-4 h-4" />
            </Link>
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
              Built for founders and early teams navigating their first major conference exposure
            </h2>
            <p className="text-lg text-white/70">
              If any of these describe your team, you're in the right place.
            </p>
          </div>

          <div className="space-y-4">
            {whoItIsFor.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-violet-400/40 transition">
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/40 rounded-xl text-center">
            <p className="text-2xl font-semibold text-white">"This is exactly us."</p>
            <p className="text-white/70 mt-2">If that's your reaction, keep reading.</p>
          </div>
        </div>
      </section>

      {/* What Web Summit Actually Delivers */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">What Actually Matters</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Web Summit Doha 2026 Actually Delivers
            </h2>
            <p className="text-lg text-white/70 max-w-3xl">
              Avoid the hype. Here's what we've observed actually matters for early-stage technical teams.
            </p>
            <p className="text-lg text-white/60 mt-4 max-w-3xl">
              The value isn't in collecting badges or attending keynotes — it's in the unstructured conversations that pressure-test your narrative.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatMatters.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-violet-400/40 transition">
                <div className="text-violet-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-violet-300 mb-4 font-medium">{item.subtitle}</p>
                <p className="text-white/60 mb-6 text-sm">{item.description}</p>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Check Section */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Pre-Check</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Comes Up When Someone Looks You Up?
            </h2>
            <p className="text-lg text-white/70 max-w-3xl">
              Between conversations at Web Summit, people will look you up. They'll Google your company, check your LinkedIn, and scan for any public content that tells them who you are.
            </p>
            <p className="text-lg text-white/60 mt-4">
              This pre-check ensures what they find matches the story you tell.
            </p>
          </div>

          <div className="space-y-6">
            {preCheckItems.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-violet-400/40 transition">
                <div className="flex gap-4">
                  <div className="text-violet-400 flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/70 mb-4">{item.description}</p>
                    <div className="bg-violet-500/10 border-l-4 border-violet-400 pl-4 py-3 rounded-r-lg">
                      <p className="text-sm text-white/70">{item.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-500/10 border border-blue-400/40 rounded-xl">
            <p className="text-white font-semibold">Pro tip: Do this check now, not the week before the summit. Fixing gaps takes time.</p>
          </div>
        </div>
      </section>

      {/* Evening Activities */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Evening & Post-Session Activities</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where the Real Conversations Happen
            </h2>
            <p className="text-lg text-white/70 max-w-3xl">
              Beyond the daytime talks and expo floor, Web Summit Doha includes a range of informal activities where some of the most valuable conversations happen.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">After conference hours</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">Not tied to tracks</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">Mixed founders, operators & investors</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {eveningActivities.map((activity, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-violet-400/40 transition">
                <div className="text-violet-400 mb-4">{activity.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">{activity.title}</h3>
                <p className="text-white/70 mb-4">{activity.description}</p>
                <p className="text-sm text-white/50">{activity.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/40 p-8 rounded-xl text-center">
            <p className="text-lg font-semibold text-white mb-2">Many meaningful connections happen outside scheduled sessions.</p>
            <p className="text-white/70">Plan for evening availability, not just daytime meetings.</p>
          </div>
        </div>
      </section>

      {/* Infrasity Section */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logodata/infrasity_logo.png"
                alt="Infrasity Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Infrasity Helps Dev-First Startups
            </h2>
            <p className="text-lg text-white/70 max-w-3xl">
              We already work with Doha-based and MENA startups, including teams like OLLM, helping them turn deep technical work into clear signal.
            </p>
            <p className="text-lg text-white/60 mt-4 max-w-3xl">
              For early-stage teams without dedicated DevRel or GTM, we provide the layer that bridges engineering and external visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {infrasityServices.map((service, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-violet-400/40 transition">
                <div className="text-violet-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-white/70 mb-4">{service.description}</p>
                <div className="bg-violet-500/10 p-3 rounded-lg">
                  <p className="text-sm text-violet-300 font-medium">{service.benefit}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border-2 border-violet-400/40 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">What Infrasity Is</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-white mb-2">An early DevRel + GTM layer</p>
                <p className="text-white/60">Before you hire a full team</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-white mb-2">Focused on technical audiences</p>
                <p className="text-white/60">Developers, platform teams, CTOs</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-white mb-2">Turning depth into signal</p>
                <p className="text-white/60">Not hype, not marketing speak</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-white mb-2">Especially useful for teams preparing for moments like Web Summit</p>
                <p className="text-white/60">When your narrative meets external scrutiny for the first time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
              <p className="text-violet-100 text-base font-medium">Why This Matters</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why This Matters Before Web Summit
            </h2>
            <p className="text-lg text-white/70 max-w-3xl">
              Web Summit Doha 2026 isn't just another conference. For early-stage teams, it's a visibility milestone that shapes how the market perceives you.
            </p>
          </div>

          <div className="space-y-8">
            {whyItMatters.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-violet-400/40 transition border-l-4 border-l-violet-400">
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-white/70 mb-4">{item.description}</p>
                <div className="bg-violet-500/10 p-4 rounded-lg">
                  <p className="text-sm text-white/70"><span className="text-violet-300 font-medium">Remember:</span> {item.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/40 p-8 rounded-xl text-center">
            <p className="text-lg font-semibold text-white mb-2">Web Summit Doha 2026 is often the first time external audiences explain your product back to you.</p>
            <p className="text-white/70">Preparation determines whether those conversations are productive or confusing.</p>
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
