'use client';

import {
  MessageSquare,
  FileSearch,
  Palette,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We analyze your product, APIs, and existing documentation to understand your needs.',
    icon: MessageSquare,
    duration: '30 mins',
    deliverables: ['Requirements doc', 'Scope definition', 'Timeline'],
    color: 'purple'
  },
  {
    number: '02',
    title: 'Documentation Audit',
    description: 'Deep dive into your codebase, API specs, and user feedback to identify gaps.',
    icon: FileSearch,
    duration: '2-3 days',
    deliverables: ['Audit report', 'Priority matrix', 'Content strategy'],
    color: 'blue'
  },
  {
    number: '03',
    title: 'Design & Development',
    description: 'Create comprehensive documentation with examples, guides, and interactive components.',
    icon: Palette,
    duration: '2-4 weeks',
    deliverables: ['Complete docs', 'Code samples', 'API playground'],
    color: 'cyan'
  },
  {
    number: '04',
    title: 'Launch & Optimize',
    description: 'Deploy documentation, set up analytics, and continuously improve based on usage data.',
    icon: Rocket,
    duration: 'Ongoing',
    deliverables: ['Live docs', 'Analytics setup', 'Monthly reports'],
    color: 'emerald'
  }
];

export default function Process() {
  return (
    <section className="py-24 px-6 bg-gray-950 relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Our Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            From Zero to Documentation Hero
            <span className="block mt-2 text-2xl text-gray-400 font-normal">
              in Just 4 Weeks
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our battle-tested process ensures your documentation is comprehensive, accurate, and developer-friendly.
          </p>
        </div>

        {/* Process steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-12 top-24 bottom-0 w-px bg-gradient-to-b from-gray-700 to-transparent" />
              )}

              <div className="flex gap-6">
                {/* Step number and icon */}
                <div className="flex-shrink-0">
                  <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br
                    ${step.color === 'purple' ? 'from-purple-500/20 to-purple-600/10' : ''}
                    ${step.color === 'blue' ? 'from-blue-500/20 to-blue-600/10' : ''}
                    ${step.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/10' : ''}
                    ${step.color === 'emerald' ? 'from-emerald-500/20 to-emerald-600/10' : ''}
                    backdrop-blur-sm border border-gray-800 flex items-center justify-center group hover:scale-105 transition-transform`}
                  >
                    <step.icon className={`w-8 h-8
                      ${step.color === 'purple' ? 'text-purple-400' : ''}
                      ${step.color === 'blue' ? 'text-blue-400' : ''}
                      ${step.color === 'cyan' ? 'text-cyan-400' : ''}
                      ${step.color === 'emerald' ? 'text-emerald-400' : ''}
                    `} />

                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-400">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <span className="px-3 py-1 bg-gray-800/50 rounded-lg text-sm text-gray-400 border border-gray-700">
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4 text-lg">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="flex flex-wrap gap-3">
                    {step.deliverables.map((deliverable) => (
                      <div key={deliverable} className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-lg border border-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline summary */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/10 via-cyan-900/10 to-emerald-900/10 backdrop-blur-sm border border-gray-800 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Ready to Transform Your Docs?
              </h3>
              <p className="text-gray-400">
                Join 500+ companies with documentation that converts.
              </p>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors flex items-center gap-2">
                <Users className="w-5 h-5" />
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}