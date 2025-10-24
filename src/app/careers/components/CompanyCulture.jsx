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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Discovery
          </h2>
          <div className="text-xl text-zinc-400 max-w-4xl mx-auto space-y-4">
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
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
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
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                How It Started
              </h3>
              <div className="text-xl text-muted-foreground max-w-4xl mx-auto space-y-4">
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

        {/* What Defines Us */}
        <div className="culture-card mt-20">
          <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                What Defines Us
              </h3>
              <div className="text-xl text-muted-foreground max-w-4xl mx-auto space-y-4 mb-12">
                <p>
                  Infrasity is built by engineers who love simplifying complexity — turning technical depth into stories that help products grow.
                </p>
                <p>
                  We work with DevTool, Infra, and AI startups, helping them go from idea to visibility through content, GTM, and developer-focused storytelling.
                </p>
                <p>
                  Every project starts with curiosity, technical precision, and a shared drive to build things that matter.
                </p>
              </div>
            </div>

            <div className="text-center mb-12">
              <h4 className="text-2xl font-bold mb-8">Our Principles</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-3">Learn Relentlessly</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Every repo we open or SDK we document teaches us something new. Continuous learning drives everything we build.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold mb-3">Radical Transparency</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We keep context open and decisions clear — so everyone knows how their work impacts the bigger picture.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold mb-3">Ownership & Craft</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Each person owns their outcome. You'll see your work directly shaping launches, GTM campaigns, and developer communities.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold mb-3">Progress Over Perfection</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We value momentum. Ship, iterate, improve — that's how compounding happens.
                </p>
              </div>

              <div className="text-center md:col-span-2">
                <h4 className="text-xl font-bold mb-3">Builders Helping Builders</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is simple — help other builders grow faster by translating complexity into clarity and adoption.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CompanyCulture;
