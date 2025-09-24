"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, FileText, TrendingUp, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  {
    icon: DollarSign,
    category: "Cost",
    devrel: "$150k–$200k/year + equity",
    infrasity: "Fraction of cost, flat monthly pricing",
  },
  {
    icon: Clock,
    category: "Speed to First Output",
    devrel: "3–6 months ramp-up",
    infrasity: "Developer Content shipping in week 1",
  },
  {
    icon: FileText,
    category: "Technical Output",
    devrel: "Blogs, talks, occasional demos",
    infrasity: "Blogs, SDK docs, explainer videos, Reddit GTM",
  },
  {
    icon: TrendingUp,
    category: "Team Bandwidth",
    devrel: "Limited to one person's bandwidth",
    infrasity: "Team-based, multi-specialist output at scale",
  },
  {
    icon: Users,
    category: "Adoption Channels",
    devrel: "Evangelism within niche communities",
    infrasity: "Multi-channel distribution + developer engagement",
  },
];

const InfrasityComparison = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Header
      gsap.from(".cmp-chip", {
        y: -8,
        opacity: 0,
        duration: reduced ? 0.2 : 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(".cmp-heading", {
        y: 24,
        opacity: 0,
        duration: reduced ? 0.25 : 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(".cmp-sub", {
        y: 16,
        opacity: 0,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // Table: rows stagger
      gsap.from(".cmp-row", {
        opacity: 0,
        y: reduced ? 0 : 14,
        duration: reduced ? 0.2 : 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".cmp-table", start: "top 85%" },
      });

      // Quote + CTA
      gsap.from(".cmp-quote", {
        opacity: 0,
        y: 18,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cmp-quote", start: "top 90%" },
      });
      gsap.from(".cmp-cta", {
        opacity: 0,
        y: 16,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cmp-cta", start: "top 95%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="py-20 bg-surface"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="cmp-chip inline-flex items-center px-4 py-2 bg-[#5F64FF]/10 text-[#5F64FF] rounded-full text-sm font-medium mb-4">
             Side-by-side comparison
          </div>
          <h2 className="cmp-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            DevRel is authentic but expensive. <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Infrasity gives you DevRel + GTM at scale.
            </span>
          </h2>
          <p className="cmp-sub text-lg text-muted-foreground max-w-3xl mx-auto">
            Founders often face the trade-off: hire a single DevRel, or plug into a full engineering-led GTM team.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="cmp-table bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-card border-border">
            <div className="p-6" />
            <div className="p-6 text-center border-l border-border">
              <h3 className="text-xl font-semibold text-foreground">DevRel Hire</h3>
            </div>
            <div className="p-6 text-center border-t-2 border-l-2  border-r-2 rounded-tl-lg rounded-tr-lg border-[#5F64FF]  bg-white/10">
              <h3 className="text-xl font-semibold text-primary">Infrasity</h3>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={row.category}
              className={`cmp-row grid grid-cols-3 border-border`}
            >
              {/* Category */}
              <div className="p-6 flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <row.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{row.category}</span>
              </div>

              {/* DevRel */}
              <div className="p-6 border-l border-border flex items-center">
                <span className="text-muted-foreground">{row.devrel}</span>
              </div>

              {/* Infrasity */}
              <div className={`p-6 border-l-2 border-r-2  border-[#5F64FF] bg-white/10 flex items-center ${index === comparisonData.length - 1 ? 
                'border-[#5F64FF] border-b-2 rounded-bl-lg rounded-br-lg ' : ''
              }`}>
                <span className="text-foreground font-medium">{row.infrasity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Quote */}
        <div className="cmp-quote bg-white/10 border-primary rounded-xl p-8 mb-12 shadow-sm">
          <blockquote className="text-2xl md:text-3xl font-semibold text-foreground text-center">
            "Why settle for one voice, when you can have an entire GTM team?"
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default InfrasityComparison;
