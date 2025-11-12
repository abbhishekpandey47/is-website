'use client';

import { useState } from 'react';
import { ChevronRight, Code, BookOpen, Terminal, Zap, Users, Search, GitBranch } from 'lucide-react';

export default function DocsLanding() {
  const [activeTab, setActiveTab] = useState('quickstart');

  const docTypes = [
    {
      id: 'quickstart',
      title: 'Quickstart Guides',
      description: 'Get your users from install to impact fast.',
      icon: Zap,
    },
    {
      id: 'api',
      title: 'API & SDK Docs',
      description: 'Real examples, versioned endpoints, and clear error references.',
      icon: Code,
    },
    {
      id: 'cli',
      title: 'CLI & Workflow Docs',
      description: 'Command-line usage with code explanations.',
      icon: Terminal,
    },
    {
      id: 'integration',
      title: 'Integration Recipes',
      description: 'Framework examples tested end-to-end.',
      icon: GitBranch,
    },
  ];

  const process = [
    {
      number: '01',
      code: 'discovery.yaml',
      title: 'Understand your product',
      description: 'We dive deep into your codebase and test your product hands-on',
    },
    {
      number: '02',
      code: 'toc.json',
      title: 'Structure content flow',
      description: 'Build an information architecture that matches developer intent',
    },
    {
      number: '03',
      code: 'drafts.md',
      title: 'Write + review',
      description: 'Create docs with real code examples and your team\'s feedback',
    },
    {
      number: '04',
      code: 'deploy.sh',
      title: 'Publish + measure',
      description: 'Launch your docs and track adoption metrics that matter',
    },
  ];

  const metrics = [
    { value: '+48%', label: 'time-on-page', company: '(Kubiya)' },
    { value: '+30%', label: 'onboarding completions', company: '(DevZero)' },
    { value: '-35%', label: 'support tickets', company: '(Tracetest)' },
  ];

  const features = [
    {
      title: 'Engineer-Led Research',
      description: 'We test your product and understand your codebase before writing a single line',
      icon: Users,
    },
    {
      title: 'SEO + Growth Optimization',
      description: 'Docs structured for both search engines and developer success',
      icon: Search,
    },
    {
      title: 'Code-First Examples',
      description: 'Every guide includes working code examples, tested end-to-end',
      icon: Code,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Infrasity Docs
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm mb-6 border border-blue-500/30">
              ✨ trusted by engineering-led startups
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Documentation That Drives <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Developer Adoption</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                See Example Docs <ChevronRight size={20} />
              </button>
              <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition">
                Book a Docs Audit
              </button>
            </div>
          </div>

          {/* Code Preview */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-16">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-4">quickstart.md</div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
{`## Quick Start

Install the SDK:
\`\`\`bash
npm install @infrasity/sdk
\`\`\`

Initialize in your app:
\`\`\`javascript
const client = new SDK({
  apiKey: process.env.API_KEY
});
\`\`\`

Make your first request:
\`\`\`javascript
const result = await client.getData();
\`\`\``}
              </pre>
            </div>
            <div>
              <div className="bg-blue-600/20 rounded-lg p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold mb-2">Quick Start</h3>
                <p className="text-slate-300 mb-4">Install the SDK:</p>
                <div className="bg-slate-900 rounded p-3 font-mono text-sm text-cyan-400">
                  $ npm install @infrasity/sdk
                </div>
                <p className="text-slate-400 text-sm mt-4">✓ Ready to use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-6 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 mb-8">Trusted by engineering-led startups</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Kubiya', 'DevZero', 'Firefly', 'Tracetest'].map((company, i) => (
              <div key={i} className="flex items-center justify-center py-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <span className="font-semibold text-slate-300">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">What We Build</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            From SDKs to CLIs — we've helped next-gen infrastructure and agentic platforms turn documentation into their strongest adoption driver.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {docTypes.map((doc) => {
              const Icon = doc.icon;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveTab(doc.id)}
                  className={`p-6 rounded-lg border transition text-left ${
                    activeTab === doc.id
                      ? 'bg-blue-600/20 border-blue-500/50'
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
                  }`}
                >
                  <Icon className="mb-3" size={24} />
                  <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                  <p className="text-slate-300 text-sm">{doc.description}</p>
                </button>
              );
            })}
          </div>

          {/* Code Example */}
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-4">quickstart-guides.md</div>
            <pre className="text-sm text-slate-300 overflow-x-auto">
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

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-800/50 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">We Build Docs Like You Build Code</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            A structured, developer-first approach to documentation
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-3 top-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50 pt-24">
                  <div className="text-sm text-slate-400 font-mono mb-3">{step.code}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Happens After Launch</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-8 border border-blue-500/30 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{metric.value}</div>
                <div className="text-slate-300 mb-1">{metric.label}</div>
                <div className="text-slate-500 text-sm">{metric.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Docs Aren't Content. They're Product.</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            That's why AI, Infra, and DevTool startups trust Infrasity with their documentation layer.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-slate-900/50 rounded-lg p-8 border border-slate-700/50">
                  <Icon className="mb-4 text-blue-400" size={32} />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-lg p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold mb-6">Ready to turn your docs into your best growth channel?</h2>
            <p className="text-slate-300 mb-8">Join Kubiya, DevZero, Firefly, and other engineering-led startups</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                Audit My Docs <ChevronRight size={20} />
              </button>
              <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition">
                Get Pricing Deck
              </button>
            </div>
          </div>

          {/* Code Block */}
          <div className="mt-16 bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 text-left max-w-2xl mx-auto">
            <pre className="text-sm text-cyan-400 overflow-x-auto">
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

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>&copy; 2025 Infrasity. Documentation that drives developer adoption.</p>
        </div>
      </footer>
    </div>
  );
}

