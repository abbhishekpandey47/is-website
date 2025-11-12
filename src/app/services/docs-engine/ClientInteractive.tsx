'use client';

import { useState } from 'react';
import { ArrowRight, Zap, Code, Terminal } from 'lucide-react';
import type { Deliverable } from './_data';
import { deliverables } from './_data';

export default function ClientInteractive() {
  const [activeTab, setActiveTab] = useState<string>('quickstart');

  return (
    <>
      {/* What We Build */}
      <section id="what-we-build" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">What We Build</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-4 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </button>
              );
            })}
          </div>

          {/* Code preview for selected tab */}
          <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-sm text-slate-400">quickstart-guides.md</span>
            </div>
            <pre className="text-slate-300 font-mono text-sm overflow-x-auto">
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
    </>
  );
}

