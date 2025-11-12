'use client';

import { Star, Quote, TrendingUp, Users, Clock, Code } from 'lucide-react';

const testimonials = [
  {
    quote: "Infrasity transformed our messy API docs into a beautiful, searchable documentation site. Developer adoption increased by 300% in 3 months.",
    author: "Sarah Chen",
    role: "CTO",
    company: "StreamAPI",
    avatar: "SC",
    rating: 5,
    metric: { icon: TrendingUp, value: "300%", label: "Adoption increase" }
  },
  {
    quote: "The team understood our complex SDK architecture immediately. They delivered documentation that our developers actually want to read.",
    author: "Marcus Johnson",
    role: "Head of DevRel",
    company: "CloudScale",
    avatar: "MJ",
    rating: 5,
    metric: { icon: Users, value: "50K+", label: "Monthly visitors" }
  },
  {
    quote: "We went from spending 20 hours/week on support to just 3. The documentation answers everything before users need to ask.",
    author: "Elena Rodriguez",
    role: "Engineering Lead",
    company: "DataPipe",
    avatar: "ER",
    rating: 5,
    metric: { icon: Clock, value: "85%", label: "Support time saved" }
  },
  {
    quote: "Best documentation investment we've made. Clean code examples, interactive API playground, and version management all included.",
    author: "David Park",
    role: "VP Engineering",
    company: "APIFirst",
    avatar: "DP",
    rating: 5,
    metric: { icon: Code, value: "100+", label: "Code examples" }
  }
];

const stats = [
  { value: "500+", label: "Projects Documented" },
  { value: "2M+", label: "Developers Reached" },
  { value: "4.9", label: "Average Rating" },
  { value: "72hr", label: "Avg. Turnaround" }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">Social Proof</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by Developer Teams
            <span className="block mt-2 text-2xl text-gray-400 font-normal">
              Don't just take our word for it
            </span>
          </h2>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-800 opacity-50" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-lg mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Metric */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 mb-6">
                <testimonial.metric.icon className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-white">{testimonial.metric.value}</span>
                <span className="text-sm text-gray-400">{testimonial.metric.label}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Join these companies in delivering world-class developer documentation
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
            Get Your Documentation Audit
          </button>
        </div>
      </div>
    </section>
  );
}