'use client';

import { Code, FileText, Megaphone, Share2, BarChart3 } from 'lucide-react';

export default function GrowthJourney() {
  const steps = [
    {
      number: '01',
      icon: Code,
      title: 'Build',
      subtitle: 'Product',
      description: 'Ship your core product with developer experience in mind.',
    },
    {
      number: '02',
      icon: FileText,
      title: 'Document',
      subtitle: 'Docs + Onboarding',
      description: 'Create docs that convert visitors into activated users.',
    },
    {
      number: '03',
      icon: Megaphone,
      title: 'Publish',
      subtitle: 'Content + Dev Marketing',
      description: 'Technical content that resonates with your audience.',
    },
    {
      number: '04',
      icon: Share2,
      title: 'Distribute',
      subtitle: 'Reddit, Forums, SEO',
      description: 'Systematic distribution across developer channels.',
    },
    {
      number: '05',
      icon: BarChart3,
      title: 'Analyze',
      subtitle: 'Feedback & Metrics',
      description: 'Measure, learn, iterate. Repeat what works.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How It All <span className="text-cyan-400">Fits Together</span>
          </h1>
          <p className="text-gray-400 text-lg">
            A systematic journey from product to repeatable growth.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px">
                  <div className="w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full"></div>
                </div>
              )}

              {/* Card */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 h-full">
                {/* Number */}
                <div className="text-cyan-400 text-sm font-mono mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="absolute top-3 left-3 w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                  <p className="text-cyan-400 text-sm mb-3">{step.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}