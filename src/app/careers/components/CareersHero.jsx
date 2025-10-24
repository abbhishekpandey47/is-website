"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Users, Zap, Globe } from "lucide-react";
import CalendarBooking from "../../calendarButton";


gsap.registerPlugin(ScrollTrigger);

const CareersHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        ".hero-title",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
        }
      );

      gsap.fromTo(
        ".hero-stats",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1,
          stagger: 0.1,
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: "15+", label: "Team Members" },
    { icon: Globe, value: "In-Office", label: "New Delhi, India" },
    { icon: Zap, value: "30+", label: "B2B & AI startups Served" },
    { icon: Rocket, value: "2.5×", label: "Year-on-Year Growth" },
  ];

  return (
    <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 bg-zinc-800 text-zinc-300 border border-zinc-700">
            🚀 We're Hiring - Join Our Mission
          </div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Building the future of developer marketing.
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join the team helping DevTool, Infra, and AI startups scale through content, GTM, and DevRel.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stats text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 mb-4">
                  <stat.icon className="w-8 h-8 text-zinc-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <a
              href="#open-positions"
              className="inline-flex items-center text-lg rounded-full bg-black px-8 py-4 text-white font-medium hover:bg-gray-900 transition"
            >
              View Open Positions
            </a>

            <CalendarBooking 
              buttonText="Book a Free Consultation" 
              width="w-52" 
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
