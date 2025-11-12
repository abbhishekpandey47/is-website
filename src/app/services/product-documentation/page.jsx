'use client';

import { useState } from 'react';
import { ArrowRight, Zap, Code, Terminal, GitBranch, Users, Search, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import NewMarquee from '../developer-marketing-agency/marquee';
import CTA from '../developer-marketing-agency/cta';
import Testimonials from '../developer-marketing-agency/Testimonial';
import Showcase from '../../../Components/docs/Showcase.jsx';

export default function ProductDocumentationPage() {
  const [activeTab, setActiveTab] = useState('quickstart');

  const showcaseItems = [
    {
      name: 'Amnic',
      url: 'https://docs.amnic.com',
      description: 'Amnic partnered with Infrasity to design a developer-focused documentation system for its AI-driven observability platform. Across four weeks, we built detailed integration pages, quick-start guides, and troubleshooting docs — each reinforced with GIFs, SDK snippets, and real use cases. The result is a GitBook documentation hub that not only explains Amnic\'s product capabilities but also showcases its engineering depth to enterprise teams.',
      mediaLabel: 'Amnic docs preview',
      loomId: 'af4d20e3a62b41dcae9afb0c06d9466f',
    },
    {
      name: 'DevZero',
      url: 'https://www.devzero.io/docs',
      description: 'DevZero partnered with Infrasity to create documentation that accelerates developer onboarding for its secure cloud development environments. We built SDK and CLI references, environment setup flows, and troubleshooting guides focused on how engineers spin up, connect, and scale their sandboxes. Each doc combines code samples, animated sequences, and short deployment walkthroughs — helping DevZero users move from first command to first build in minutes. The documentation now doubles as both a product guide and a GTM asset, showcasing DevZero\'s engineering strength to teams adopting remote dev environments.',
      mediaLabel: 'DevZero onboarding docs preview',
      loomId: '1f571827c2fd4bdfac1962bf562d0184',
    },
    {
      name: 'Kubiya',
      url: 'https://docs.kubiya.ai',
      description: 'Kubiya\'s team worked with Infrasity to turn their AI agent platform into documentation engineers actually use. We built a clear hierarchy for SDKs, APIs, and workflows — showing how Kubiya connects prompts to real infrastructure actions. Each guide includes runnable examples, CLI outputs, and embedded GIFs illustrating how agents execute tasks like provisioning environments or managing secrets. The documentation became a live extension of Kubiya\'s product — helping engineers understand, trust, and adopt AI-driven DevOps automation faster.',
      mediaLabel: 'Kubiya docs preview',
      loomId: 'b098784944f843d8b76e979e194f966f',
    },
    {
      name: 'StackGen',
      url: 'https://stackgen.example.com/docs',
      description: 'StackGen\'s documentation is designed to make complex, AI-driven infrastructure automation accessible to engineers. Infrasity structured the content around real-world workflows — from stack generation to IaC validation — ensuring every guide balances conceptual clarity with command-level depth. Each section integrates CLI examples, architecture diagrams, and agent-execution visuals to help developers understand how AI interacts with Terraform and cloud APIs. The resulting docs act as a complete narrative of how StackGen translates infrastructure intent into working code — written for those who build, not just read.',
      mediaLabel: 'StackGen integration docs preview',
      loomId: '97d1ab6b2aac49e09208a6c3deadfb9a',
    },
  ];

  const differenceCards = [
    {
      icon: Users,
      title: 'Engineer-First Approach',
      description: 'We test your product before we write a single line of doc.',
    },
    {
      icon: Search,
      title: 'Growth-Driven Structure',
      description: 'Docs optimized for both SEO and developer intent.',
    },
    {
      icon: Code,
      title: 'Real-World Examples',
      description: 'Every doc includes working code, commands, and context.',
    },
  ];

  const deliverables = [
    {
      id: 'quickstart',
      icon: Zap,
      title: 'Quickstart Guides',
      description: 'Get your users from install to impact fast.',
    },
    {
      id: 'api',
      icon: Code,
      title: 'API & SDK Docs',
      description: 'Real examples, versioned endpoints, and clear error references.',
    },
    {
      id: 'cli',
      icon: Terminal,
      title: 'CLI & Workflow Docs',
      description: 'Command-line usage with code explanations.',
    },
    {
      id: 'integration',
      icon: GitBranch,
      title: 'Integration Recipes',
      description: 'Framework examples tested end-to-end.',
    },
  ];

  const process = [
    {
      number: '01',
      icon: Search,
      file: 'discovery.yaml',
      title: 'Understand your product',
      description: 'We dive deep into your codebase and test your product hands-on',
    },
    {
      number: '02',
      icon: GitBranch,
      file: 'toc.json',
      title: 'Structure content flow',
      description: 'Build an information architecture that matches developer intent',
    },
    {
      number: '03',
      icon: Code,
      file: 'drafts.md',
      title: 'Write + review',
      description: 'Create docs with real code examples and your team\'s feedback',
    },
    {
      number: '04',
      icon: CheckCircle2,
      file: 'deploy.sh',
      title: 'Publish + measure',
      description: 'Launch your docs and track adoption metrics that matter',
    },
  ];

  const metrics = [
    { value: '+48%', label: 'time-on-page', company: '(Kubiya)' },
    { value: '+30%', label: 'onboarding completions', company: '(DevZero)' },
    { value: '-35%', label: 'support tickets', company: '(Tracetest)' },
  ];

  const edgeFeatures = [
    {
      icon: Users,
      title: 'Engineer-Led Research',
      description: 'We test your product and understand your codebase before writing a single line',
    },
    {
      icon: Search,
      title: 'SEO + Growth Optimization',
      description: 'Docs structured for both search engines and developer success',
    },
    {
      icon: Code,
      title: 'Code-First Examples',
      description: 'Every guide includes working code examples, tested end-to-end',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06080D] via-[#0B0E18] to-[#11142B]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Background Pattern */}
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero"
              width="80"
              height="80"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)" />
        </svg>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_-20%,rgba(123,97,255,0.3),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto">
          {/* Trust badge */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full text-xs uppercase tracking-widest text-cyan-400/70 border border-cyan-400/20 bg-cyan-400/5">
              ✨ trusted by engineering-led startups
            </span>
          </div>

          {/* Hero content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white">
                Documentation That Drives{' '}
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] text-transparent bg-clip-text">
                  Developer Adoption
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(123,97,255,0.4)]"
                >
                  See Example Docs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0E1018]/80 backdrop-blur-md text-white font-semibold rounded-lg border border-[#1E2236] hover:bg-[#0E1018] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]"
                >
                  Book a Docs Audit
                </Link>
              </div>

              {/* Trust line */}
              <p className="text-sm text-gray-500 font-mono">
                Built by engineers, not copywriters.
              </p>
            </div>

            {/* Code preview */}
            <div className="relative">
              <div className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] overflow-hidden shadow-[0_0_40px_rgba(123,97,255,0.15)]">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0C14] border-b border-[#1E2236]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 text-xs text-gray-500 font-mono">quickstart.md</span>
                  <div className="ml-auto text-xs text-gray-600">→ rendered-docs</div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-[#1E2236]">
                  {/* Markdown */}
                  <div className="p-6 bg-[#0A0C14]">
                    <div className="space-y-3 font-mono text-sm">
                      <div className="text-cyan-400">## Quick Start</div>
                      <div className="text-gray-400">Install the SDK:</div>
                      <div className="bg-[#06080D] px-3 py-2 rounded border border-[#1E2236]">
                        <code className="text-emerald-400">npm install @infrasity/sdk</code>
                      </div>
                      <div className="text-gray-400">Initialize in your app</div>
                      <div className="text-gray-600">_</div>
                    </div>
                  </div>

                  {/* Rendered */}
                  <div className="p-6 bg-gradient-to-br from-[#0E1018] to-[#0A0C14]">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Quick Start
                      </h3>
                      <p className="text-sm text-gray-300">Install the SDK:</p>
                      <div className="bg-[#06080D] px-3 py-2 rounded font-mono text-sm border border-[#1E2236]">
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

      {/* Shared: Trusted By Logos Marquee */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-8 mb-1"></div>
        <NewMarquee />
      </div>

      {/* Shared: Docs in Action Showcase */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <Showcase items={showcaseItems} />
      </div>

      {/* The Infrasity Difference */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Infrasity Difference</h2>
              <p className="text-lg md:text-xl text-gray-400">Why founders choose Infrasity for docs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {differenceCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] p-8 hover:border-[#7B61FF]/30 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-300">
                    <Icon className="w-12 h-12 mb-6" style={{ color: '#00D4FF' }} />
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* What We Build */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">What We Build</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {deliverables.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 border-[#00D4FF]/50 shadow-[0_0_40px_rgba(123,97,255,0.2)]'
                        : 'bg-[#0E1018]/80 backdrop-blur-md border-[#1E2236] hover:border-[#1E2236] hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-4 ${activeTab === item.id ? 'text-[#00D4FF]' : 'text-gray-400'}`} />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Code preview for selected tab */}
            <div className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] p-8">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-sm text-gray-400">quickstart-guides.md</span>
              </div>
              <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`# Quick Start

1. Install the package
   npm install @your-sdk/core

2. Initialize in your app
   const client = new SDK({
     apiKey: process.env.API_KEY
   });

3. Make your first request
   const result = await client.getData();`}
              </pre>
            </div>
          </div>
        </section>
      </div>

      {/* Process */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              We Build Docs Like You Build Code
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center text-white font-bold text-lg border-4 border-[#06080D] shadow-[0_0_30px_rgba(123,97,255,0.4)]">
                      {step.number}
                    </div>
                    <div className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] p-6 pt-12 hover:border-[#7B61FF]/30 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-300">
                      <Icon className="w-8 h-8 text-[#00D4FF] mb-4" />
                      <code className="text-sm text-gray-500 font-mono">{step.file}</code>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Metrics */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              What Happens After Launch
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {metrics.map((metric, i) => (
                <div key={i} className="bg-gradient-to-br from-[#00D4FF]/10 via-[#7B61FF]/5 to-[#B14EFF]/10 backdrop-blur-md rounded-2xl border border-[#00D4FF]/30 p-8 text-center hover:shadow-[0_0_40px_rgba(123,97,255,0.2)] transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-transparent bg-clip-text mb-2">{metric.value}</div>
                  <div className="text-lg text-white mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-500">{metric.company}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* The Infrasity Edge */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Docs Aren't Content. They're Product.
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                That's why AI, Infra, and DevTool startups trust Infrasity with their documentation layer.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {edgeFeatures.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] p-8 hover:border-[#7B61FF]/30 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-300">
                    <Icon className="w-12 h-12 text-[#00D4FF] mb-6" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Shared: Testimonials */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10"></div>
        <Testimonials />
      </div>

      {/* Shared: CTA Banner */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
        <CTA />
      </div>
    </div>
  );
}
