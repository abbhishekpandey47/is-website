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
    <div className="min-h-screen relative text-white py-20 px-8">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl quicksand-bold mb-4">
            What You Get: <span className="specialtext">Templates, SOPs & Tools</span>
          </h1>
          <p className="text-[wheat] text-lg quicksand-semibold">
            Practical, ready-to-use frameworks you can implement today.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-[#888]/20 backdrop-blur-sm border border-white/10 ring-1 ring-black/5 rounded-xl p-8 hover:border-white/30 transition-all duration-300 group"
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl quicksand-semibold pt-2">{section.title}</h2>
              </div>

              {/* List Items */}
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-[wheat]">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed quicksand-light">{item}</span>
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