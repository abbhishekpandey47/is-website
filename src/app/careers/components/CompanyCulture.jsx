"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Heart, 
  Lightbulb, 
  Users, 
  Target, 
  Zap, 
  Globe,
  Code,
  MessageSquare,
  Trophy,
  Coffee
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CompanyCulture = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".culture-card",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".culture-value",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Code,
      title: "Engineering First",
      description: "We're an engineering-led team. Every piece of content, video, or GTM playbook starts with technical depth and product understanding."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly experiment — from new content frameworks to developer-led campaigns — finding creative ways to connect technical ideas with real audiences."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work as one team — writers, engineers, designers, and strategists — learning, iterating, and growing together."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "We measure impact, not output. Every deliverable is tied to traffic, engagement, and tangible customer growth."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "We've partnered with 30+ startups across DevTool, Infra, and AI — helping teams around the world tell better stories and scale faster."
    },
    {
      icon: Heart,
      title: "Developer Empathy",
      description: "We exist for builders. Everything we do is about making developers' lives easier — by turning their complex work into clarity."
    }
  ];

  const cultureHighlights = [
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Work from anywhere with flexible hours that fit your lifestyle and productivity patterns."
    },
    {
      icon: MessageSquare,
      title: "Open Communication",
      description: "Transparent communication at all levels with regular team check-ins and company-wide updates."
    },
    {
      icon: Trophy,
      title: "Growth Opportunities",
      description: "Continuous learning with dedicated time for skill development and conference attendance."
    },
    {
      icon: Zap,
      title: "Fast-Paced Environment",
      description: "Move quickly, experiment often, and learn from both successes and failures in a supportive environment."
    }
  ];

  return (
    <section ref={sectionRef} id="culture" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-white">
            Discovery
          </h2>
          <div className="text-gray-400 text-[15px] leading-relaxed max-w-4xl mx-auto space-y-4">
            <p>
              The idea for Infrasity was simple: most early-stage DevTool startups know how to build great products — but struggle to explain why they matter.
            </p>
            <p>
              We saw that gap while working with engineering teams that shipped brilliant tech yet couldn't communicate its value to users or investors. That's where Infrasity began — to bridge the space between engineering and storytelling.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={index} className="culture-value">
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-[15px] leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How It Started */}
        <div className="culture-card">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">
                How It Started
              </h3>
              <div className="text-gray-400 text-[15px] leading-relaxed max-w-4xl mx-auto space-y-4">
                <p>
                  Infrasity began in early 2024 as a weekend experiment. Back then, it was just Shan, balancing a full-time job and helping one client with developer-focused content.
                </p>
                <p>
                  By September 2024, that side project turned into something real. The 2BHK apartment where it started became our first office — and the foundation of a team that believes in engineering-led growth.
                </p>
                <p>
                  Today, Infrasity works with 15+ DevTool, Infra, and AI startups — helping them scale through content, GTM, and DevRel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 my-20 opacity-60" />

        {/* What Defines Us */}
        <div className="culture-card">
          <div className="bg-gradient-to-br from-[#0C0C0C] to-[#151515] rounded-3xl p-12 border border-gray-800/30 max-w-6xl mx-auto">
            {/* Tagline and Title */}
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-medium">
                Our Culture
              </p>
              <h3 className="text-3xl font-semibold tracking-tight text-white">
                What Defines Us
              </h3>
            </div>

            {/* Tightened two-column layout */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* Left side - Purpose (40% width) */}
              <div className="md:col-span-2">
                <p className="text-gray-400 text-[15px] leading-relaxed">
                  Infrasity helps DevTool, Infra, and AI startups scale through technical content, GTM, and developer storytelling.
                </p>
              </div>
              
              {/* Right side - Principles Cards (2×2 + full-width) */}
              <div className="md:col-span-3 space-y-4">
                {/* 2×2 Grid for first 4 cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative">
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-white/10 hover:bg-[#121212] hover:translate-y-[-2px] transition-all duration-300 h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                          1
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-white mb-2">Learn Relentlessly</h4>
                          <p className="text-gray-400 text-[15px] leading-relaxed">Every project teaches us something new about code, systems, or growth.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-white/10 hover:bg-[#121212] hover:translate-y-[-2px] transition-all duration-300 h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                          2
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-white mb-2">Radical Transparency</h4>
                          <p className="text-gray-400 text-[15px] leading-relaxed">We keep context open and decisions clear so everyone knows their impact.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-white/10 hover:bg-[#121212] hover:translate-y-[-2px] transition-all duration-300 h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                          3
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-white mb-2">Ownership & Craft</h4>
                          <p className="text-gray-400 text-[15px] leading-relaxed">You'll see your work live in developer communities and product launches.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-white/10 hover:bg-[#121212] hover:translate-y-[-2px] transition-all duration-300 h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                          4
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-white mb-2">Progress Over Perfection</h4>
                          <p className="text-gray-400 text-[15px] leading-relaxed">We value momentum. Ship, iterate, improve — that's how compounding happens.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-width card for "Builders Helping Builders" */}
                <div className="group relative">
                  <div className="bg-gray-900/30 rounded-lg p-4 border border-white/10 hover:bg-[#121212] hover:translate-y-[-2px] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                        5
                      </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-white mb-2">Builders Helping Builders</h4>
                          <p className="text-gray-400 text-[15px] leading-relaxed">Our mission is to help other builders grow faster by translating complexity into clarity.</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CompanyCulture;
