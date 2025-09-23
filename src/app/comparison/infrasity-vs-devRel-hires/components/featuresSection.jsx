"use client";

import { 
  Zap, 
  TrendingUp, 
  Target, 
  Code, 
  BarChart3, 
  Users 
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: "Ship Content Week 1",
    description:
      "No 3-6 month ramp-up. Our engineering team starts producing technical content, demos, and documentation from day one.",
  },
  {
    icon: TrendingUp,
    title: "Scale Beyond One Person",
    description:
      "Why rely on a single DevRel hire? Get the output of an entire GTM team — specialists in content, docs, and distribution working simultaneously.",
  },
  {
    icon: Target,
    title: "Content That Converts to Adoption",
    description:
      "Each deliverable is created with distribution in mind, so developers discover your product through guides, code, and examples.",
  },
  {
    icon: Code,
    title: "Engineering-First Content",
    description:
      "Deep dives, SDK docs, code samples, and architecture guides — all written by engineers who’ve shipped real infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Growth",
    description:
      "Every deliverable tied to outcomes: developer engagement, sign-ups, community traction, and revenue impact.",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Fuel authentic developer communities around your product with content + engagement that feels native, not forced marketing.",
  },
];

const IndustryCard = ({ icon, title, description }) => {
  const cardRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);

      // distance to center for proximity glow
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      setIsNear(dist <= 220);

      // card tilt
      const dx = (x - rect.width / 2) / rect.width;  // -0.5..0.5
      const dy = (y - rect.height / 2) / rect.height;
      cardRef.current.style.setProperty("--tilt-x", `${dx * 10}deg`);
      cardRef.current.style.setProperty("--tilt-y", `${-dy * 10}deg`);
    };

    const handleLeave = () => {
      setIsNear(false);
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--tilt-x", "0deg");
      cardRef.current.style.setProperty("--tilt-y", "0deg");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const Icon = icon;

  return (
   <div
  ref={cardRef}
  className="feature-card group relative w-full rounded-[15px] h-[260px] px-6 py-5 flex flex-col justify-center cursor-pointer border border-border/60 
             backdrop-blur-xl shadow-lg transition-transform duration-300"
  style={{
    transform:
      "perspective(1000px) rotateY(var(--tilt-x)) rotateX(var(--tilt-y))",
  }}
>
  {/* base surface */}
  <div className="absolute inset-[1px] z-10 rounded-[15px] bg-[#01041A]" />

  {/* content */}
  <div className="relative z-30">
    <Icon className="w-7 h-7 text-primary" />
    <h3 className="text-foreground text-xl font-semibold mt-2">{title}</h3>
    <p className="text-muted-foreground mt-1">{description}</p>
  </div>

  {/* spotlight layers */}
  <div
    className={`pointer-events-none absolute inset-[1px] z-20 rounded-[15px] transition-opacity duration-300 ease-in-out ${
      isNear ? "opacity-80" : "opacity-0"
    }`}
    style={{
      background:
        "radial-gradient(200px at var(--mouse-x) var(--mouse-y), rgb(38, 38, 38), transparent 100%)",
    }}
  ></div>

  <div
    className={`pointer-events-none absolute inset-0 rounded-[15px] transition-opacity duration-300 ease-in-out ${
      isNear ? "opacity-100" : "opacity-0"
    }`}
    style={{
      background:
        "radial-gradient(200px at var(--mouse-x) var(--mouse-y), rgb(24, 106, 255), rgb(0, 88, 254), rgb(41, 48, 75) 100%)",
    }}
  ></div>

  <div
    className={`pointer-events-none absolute inset-0 rounded-[15px] transition-opacity duration-300 ease-in-out ${
      isNear ? "opacity-100" : "opacity-0"
    }`}
    style={{
      background:
        "radial-gradient(50px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2), transparent 100%)",
    }}
  ></div>
</div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Header animations
      gsap.from(".feat-chip", {
        y: -8,
        opacity: 0,
        duration: reduced ? 0.2 : 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(".feat-heading", {
        y: 24,
        opacity: 0,
        duration: reduced ? 0.25 : 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(".feat-sub", {
        y: 16,
        opacity: 0,
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // Cards stagger
      gsap.from(".feature-card", {
        opacity: 0,
        y: reduced ? 0 : 28,
        scale: reduced ? 1 : 0.98,
        duration: reduced ? 0.25 : 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".feature-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="feat-chip inline-flex items-center px-4 py-2 bg-[#5F64FF]/10 text-[#5F64FF] rounded-full text-sm font-medium mb-4">
            ✨ Everything you need to scale
          </div>
          <h2 className="feat-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            DevRel + GTM + Engineering
          </h2>
          <p className="feat-sub text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop choosing between authentic developer relations and scalable growth. 
            Get both with a dedicated engineering-led GTM team.
          </p>
        </div>

        {/* Features Grid */}
        <div className="feature-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <IndustryCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to see how we compare to traditional DevRel hires?
          </p>
          <a
            href="#comparison"
            className="inline-flex items-center text-primary hover:opacity-90 font-semibold group"
          >
            View the comparison
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
