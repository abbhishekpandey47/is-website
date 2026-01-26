'use client';

import React, { useState } from 'react';
import { ChevronRight, Zap, Shield, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignalCheckLanding() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Monitoring',
      description: 'Get instant alerts and updates on signal strength and network performance'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with enterprise-grade security'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Advanced Analytics',
      description: 'Detailed insights and reports to optimize your network coverage'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Collaboration',
      description: 'Share reports and collaborate with your team in real-time'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Al-Mansouri',
      role: 'Network Manager',
      company: 'Doha Telecom',
      text: 'Signal Check has transformed how we monitor our network. The real-time alerts have reduced downtime by 40%.'
    },
    {
      name: 'Fatima Al-Thani',
      role: 'IT Director',
      company: 'Qatar Tech Solutions',
      text: 'The analytics dashboard is incredibly intuitive. Our team adopted it immediately without any training.'
    },
    {
      name: 'Mohammed Al-Dosari',
      role: 'Operations Lead',
      company: 'Gulf Communications',
      text: 'Best investment we made this year. The ROI has been exceptional.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams',
      features: [
        'Up to 5 monitoring points',
        'Basic analytics',
        'Email alerts',
        'Community support'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing businesses',
      features: [
        'Unlimited monitoring points',
        'Advanced analytics',
        'SMS & Email alerts',
        'Priority support',
        'Custom reports',
        'API access'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'SLA guarantee',
        'On-premise option'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold">
              SC
            </div>
            <span className="text-xl font-bold">Signal Check</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition">Testimonials</a>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold transition">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2">
                <span className="text-cyan-400 text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Now Available in Doha
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Monitor Your Network
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Signal Strength</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                Real-time monitoring and analytics for optimal network performance. Get instant alerts and detailed insights to keep your connectivity at peak levels.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {isSubmitted && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-green-400">
                  ✓ Thanks! Check your email for next steps.
                </div>
              )}

              <div className="flex gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  Free for 14 days
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  No credit card required
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-3/4"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-1/2"></div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-400">98.5%</div>
                      <div className="text-xs text-slate-400 mt-2">Uptime</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-400">-85dBm</div>
                      <div className="text-xs text-slate-400 mt-2">Signal</div>
                    </div>
                  </div>
                  <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Network Load</span>
                      <span className="text-cyan-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-300">Everything you need to monitor and optimize your network</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition group">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Teams</h2>
            <p className="text-xl text-slate-300">See what our customers have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-300">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 transition transform hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500 border-0 ring-2 ring-cyan-400'
                    : 'bg-slate-800/50 border border-slate-700/50'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={plan.highlighted ? 'text-white/80' : 'text-slate-400'}>{plan.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-white/80' : 'text-slate-400'}>{plan.period}</span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                    plan.highlighted
                      ? 'bg-white text-cyan-600 hover:bg-slate-100'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span className={plan.highlighted ? 'text-white/90' : 'text-slate-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">Join hundreds of teams already monitoring their network with Signal Check</p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
                  SC
                </div>
                <span className="font-bold">Signal Check</span>
              </div>
              <p className="text-slate-400 text-sm">Real-time network monitoring for optimal performance</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 flex justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2024 Signal Check. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-400 transition">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-cyan-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
