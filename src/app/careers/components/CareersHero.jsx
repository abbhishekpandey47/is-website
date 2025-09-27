"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Floating elements animation
      gsap.to(".floating-icon", {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-icon" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating-icon" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-approved/10 rounded-full blur-3xl floating-icon" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 bg-purple-500/20 text-purple-400 border border-purple-500/30">
            🚀 We're Hiring - Join Our Mission
          </div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Build the Future of Developer Growth
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join Infrasity and work at the intersection of engineering, storytelling, and GTM. We partner with YC and VC-backed startups in infra, AI, and DevTools—helping them scale adoption through technical content, DevRel, and product-driven narratives.
          </p>


          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <a
              href="#open-positions"
              className="inline-flex items-center text-lg rounded-full bg-black px-8 py-4 text-white font-medium hover:bg-gray-900 transition"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
