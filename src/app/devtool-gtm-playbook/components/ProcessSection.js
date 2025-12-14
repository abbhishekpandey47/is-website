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
    <div className="min-h-screen relative text-white flex items-center justify-center p-8">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl quicksand-bold mb-4">
            How It All <span className="specialtext">Fits Together</span>
          </h1>
          <p className="text-[wheat] text-lg quicksand-semibold">
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
                  <div className="w-full h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}

              {/* Card */}
              <div 
                className="relative rounded-lg p-6 hover:border-white/30 transition-all duration-300 h-full overflow-hidden"
                style={{
                  background: 'rgba(136, 136, 136, 0.2)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}
              >
                {/* Subtle gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-50 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Number */}
                  <div className="text-white text-sm font-mono mb-4 quicksand-semibold">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl quicksand-semibold mb-1 text-white">{step.title}</h3>
                    <p className="text-white text-sm mb-3 quicksand-semibold">{step.subtitle}</p>
                    <p className="text-[wheat] text-sm leading-relaxed quicksand-light">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Bottom highlight line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}