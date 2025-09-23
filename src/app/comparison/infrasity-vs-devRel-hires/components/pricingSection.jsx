"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: "Starter",
    price: "$3,000",
    period: "/month",
    description: "Perfect for early-stage startups testing GTM strategies",
    features: [
      "4 technical blog posts/month",
      "Basic SDK documentation",
      "Reddit & HackerNews distribution",
      "Monthly strategy calls",
      "Email support",
    ],
    popular: false,
    cta: "Start Trial",
  },
  {
    name: "Growth",
    price: "$8,000",
    period: "/month",
    description: "Scale your developer marketing with comprehensive GTM",
    features: [
      "12 technical pieces/month",
      "Video tutorials & demos",
      "Multi-channel distribution (20+)",
      "Community building",
      "Weekly strategy calls",
      "Priority Slack support",
      "Custom landing pages",
    ],
    popular: true,
    cta: "Start Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-scale engineering-led GTM for high-growth companies",
    features: [
      "Unlimited content production",
      "Dedicated GTM team",
      "Custom distribution strategy",
      "Developer relations management",
      "24/7 priority support",
      "Custom integrations",
      "Executive reporting",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const PricingSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Header bits
      gsap.from(".pricing-chip", {
        y: -8,
        opacity: 0,
        duration: reduced ? 0.2 : 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".pricing-heading", {
        y: 24,
        opacity: 0,
        scale: reduced ? 1 : 0.98,
        duration: reduced ? 0.25 : 0.8,
        ease: "power3.out",
        delay: 0.05,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".pricing-sub", {
        y: 16,
        opacity: 0,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".pricing-callout", {
        y: 28,
        opacity: 0,
        duration: reduced ? 0.25 : 0.7,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Cards
      gsap.utils.toArray(".pricing-card").forEach((card, i) => {
        gsap.from(card, {
          y: reduced ? 0 : 40,
          opacity: 0,
          duration: reduced ? 0.25 : 0.8,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });

        // Features inside each card
        const items = card.querySelectorAll(".feature-item");
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () =>
            gsap.from(items, {
              opacity: 0,
              y: reduced ? 0 : 8,
              duration: reduced ? 0.15 : 0.35,
              stagger: 0.05,
              ease: "power1.out",
            }),
        });

        // Popular badge pop
        const badge = card.querySelector(".popular-badge");
        if (badge) {
          gsap.fromTo(
            badge,
            { y: -10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduced ? 0.2 : 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: { trigger: card, start: "top 90%" },
            }
          );
        }
      });

      // Bottom CTA
      gsap.from(".pricing-bottom", {
        y: 20,
        opacity: 0,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pricing-bottom", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="pricing-chip inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
            💰 Fraction of a DevRel hire cost
          </div>
          <h2 className="pricing-heading text-4xl md:text-5xl font-bold text-neutral-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="pricing-sub text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get enterprise-level GTM capabilities without the enterprise price
            tag. All plans include a 14-day free trial.
          </p>

          {/* Cost Comparison Callout */}
          <div className="pricing-callout inline-flex items-center gap-6 bg-brand/5 border border-brand/20 rounded-xl p-6 text-left max-w-2xl bg-[#5F64FF]/10">
            <div className="flex-shrink-0 w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 px-4 rounded-lg text-sm font-medium py-3 h-12 ">
              <Zap className="w-6 h-6 text-brand" />
            </div>
            <div>
              <div className="font-semibold text-neutral-foreground">
                DevRel Hire: $150k-$200k/year + equity + 3-6 month ramp-up
              </div>
              <div className="text-sm text-muted-foreground">
                Our Growth plan: $96k/year, starts shipping week 1
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card bg-gray-900/50 backdrop-blur-sm border border-[#7dffa2] transition-colors rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? "border-purple-500/50 rounded-2xl duration-300 relative scale-105"
                  : "border-divider bg-surface hover:border-brand/50 scale-95"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="popular-badge absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`${
                    plan.popular
                      ? "quicksand-semibold text-[#99e2ff] text-3xl font-bold mb-2"
                      : "quicksand-semibold text-2xl text-[#e8bfff] font-bold mb-2 "
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-neutral-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8 min-h-[17rem]">
                {plan.features.map((feature) => (
                  <div key={feature} className="feature-item flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.popular
                    ? `inline-flex justify-center items-center 
    text-sm quicksand-semibold 
    bg-gradient-to-r from-purple-600 to-pink-600 
    rounded-[5px] relative overflow-hidden 
    text-white shadow-2xl transition-all 
    z-10 w-full h-12
    before:ease before:absolute before:right-0 before:top-0 
    before:h-12 before:w-6 before:translate-x-12 
    before:rotate-6 before:bg-white before:opacity-10 before:duration-700 
    hover:before:-translate-x-40`
                    : `inline-flex justify-center items-center 
    text-sm quicksand-semibold 
    bg-gradient-to-r from-gray-800 to-gray-800 
    rounded-[5px] relative overflow-hidden 
    text-white shadow-2xl transition-all 
    z-10 w-full h-12
    before:ease before:absolute before:right-0 before:top-0 
    before:h-12 before:w-6 before:translate-x-12 
    before:rotate-6 before:bg-white before:opacity-10 before:duration-700 
    hover:before:-translate-x-40`
                }`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pricing-bottom text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Have questions? Want to see how we stack up against DevRel hires?
          </p>
          <Button variant="outline" size="lg" className="border-divider">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
