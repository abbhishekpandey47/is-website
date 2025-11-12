'use client';

import {
  Code2,
  GitBranch,
  Search,
  Shield,
  Sparkles,
  Users,
  Layers,
  Gauge,
  FileCode,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: FileCode,
    title: 'API Documentation',
    description: 'Comprehensive REST & GraphQL API docs with interactive examples and request builders.',
    gradient: 'from-blue-500 to-cyan-500',
    benefits: ['OpenAPI/Swagger', 'Try it now', 'Code samples']
  },
  {
    icon: Code2,
    title: 'SDK References',
    description: 'Language-specific SDK documentation with installation guides and best practices.',
    gradient: 'from-purple-500 to-pink-500',
    benefits: ['Auto-generated', 'Type-safe', 'Multi-language']
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Maintain documentation for multiple versions with seamless migration guides.',
    gradient: 'from-emerald-500 to-teal-500',
    benefits: ['Git integration', 'Changelog', 'Migration paths']
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'AI-powered search that understands developer intent and surfaces relevant content.',
    gradient: 'from-orange-500 to-red-500',
    benefits: ['Semantic search', 'Code-aware', 'Instant results']
  },
  {
    icon: Gauge,
    title: 'Performance Metrics',
    description: 'Track documentation usage, popular endpoints, and developer journey analytics.',
    gradient: 'from-indigo-500 to-blue-500',
    benefits: ['Usage analytics', 'Heatmaps', 'User flows']
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in authentication examples, security best practices, and compliance docs.',
    gradient: 'from-gray-600 to-gray-800',
    benefits: ['Auth patterns', 'OWASP guides', 'Compliance']
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-black relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need for
            <span className="block mt-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              World-Class Documentation
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From API references to SDK guides, we handle every aspect of your technical documentation.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {feature.description}
              </p>

              {/* Benefits list */}
              <div className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <span className="text-sm text-gray-500">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional features bar */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Plus Everything Else</h3>
              <p className="text-gray-400">Custom components, webhooks, CLI docs, and more.</p>
            </div>

            <div className="flex gap-4">
              {[Globe, Lock, Zap, Users, Layers].map((Icon, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}