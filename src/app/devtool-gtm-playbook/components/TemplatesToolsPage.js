'use client';

import { FileText, PenTool, Globe, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function TemplatesToolsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Documentation Templates',
      items: [
        'API reference templates',
        'SDK integration guides',
        'Onboarding walkthrough flows',
      ],
    },
    {
      icon: PenTool,
      title: 'Content Production Templates',
      items: [
        'Blog post outlines',
        'Case study frameworks',
        'Technical tutorial structure',
      ],
    },
    {
      icon: Globe,
      title: 'Distribution Frameworks',
      items: [
        'Forum posting guidelines',
        'Reddit SOP & checklist',
        'Community outreach playbook',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Metrics Setup',
      items: [
        'GA4 configuration guide',
        'SEO fundamentals checklist',
        'User feedback loop setup',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What You Get: <span className="text-cyan-400">Templates, SOPs & Tools</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Practical, ready-to-use frameworks you can implement today.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <section.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold pt-2">{section.title}</h2>
              </div>

              {/* List Items */}
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}