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
      description: "We believe in the power of engineering-led growth and technical excellence in everything we do."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries and explore new ways to solve complex developer marketing challenges."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work together as a team, sharing knowledge and supporting each other's growth and success."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "We focus on measurable outcomes and data-driven decisions to deliver exceptional value to our clients."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We're building tools and strategies that help developers worldwide build better products and communities."
    },
    {
      icon: Heart,
      title: "Developer Love",
      description: "We genuinely care about developers and are passionate about making their lives easier and more productive."
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Discovery
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            The initial insight came after we noticed the emerging trend of chat-based platforms like Slack and Microsoft Teams partially replacing email in B2B comms, and how that broke most existing post-sales workflows.
          </p>
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={index} className="culture-value">
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Culture Highlights */}
        <div className="culture-card">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                How it started
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advith and Robert met at Caltech and then later met Marty during the Kleiner Perkins Fellowship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cultureHighlights.map((highlight, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <highlight.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{highlight.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="culture-card mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Team Members</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Remote First</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">3x</div>
              <div className="text-muted-foreground">Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCulture;
