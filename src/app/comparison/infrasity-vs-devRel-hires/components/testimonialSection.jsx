"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "@devnomic/marquee/dist/index.css";

const testimonials = [
  {
    quote:
      "Infrasity shipped more technical content in their first month than our previous DevRel hire did in six. The quality is exceptional and the distribution reach is incredible.",
    author: "Sarah Chen",
    role: "CTO",
    company: "DevFlow",
    avatar: "SC",
  },
  {
    quote:
      "We were stuck between hiring an expensive DevRel or going without. Infrasity gave us a full GTM team for a fraction of the cost. Our developer engagement is up 300%.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "CloudNative Labs",
    avatar: "MR",
  },
  {
    quote:
      "The engineering depth they bring to content creation is unmatched. They understand our product better than most of our own team members within weeks.",
    author: "Alex Kim",
    role: "VP Engineering",
    company: "DataStream",
    avatar: "AK",
  },
];

const companies = [
  "DevFlow",
  "CloudNative Labs",
  "DataStream",
  "TechVenture",
  "BuildPlatform",
  "CodeBase",
];

function useSlidesPerView() {
  // 1 on small, 2 on md, 3 on lg
  const [spv, setSpv] = useState(1);
  useEffect(() => {
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const compute = () => setSpv(mqLg.matches ? 3 : mqMd.matches ? 2 : 1);
    compute();
    mqMd.addEventListener("change", compute);
    mqLg.addEventListener("change", compute);
    return () => {
      mqMd.removeEventListener("change", compute);
      mqLg.removeEventListener("change", compute);
    };
  }, []);
  return spv;
}

const TestimonialsSection = () => {
  const spv = useSlidesPerView();
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const pauseIntentRef = useRef(false);

  // Duplicate slides for seamless loop (x3 for smoother cycles)
  const slides = useMemo(() => [...testimonials, ...testimonials, ...testimonials], []);

  const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getPixelsPerSecond = () => {
    // Feel free to tweak these speeds
    const md = window.matchMedia("(min-width: 768px)").matches;
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    if (lg) return 110; // faster on large screens
    if (md) return 90;
    return 70; // smaller screens a bit slower
  };

  const buildAnimation = () => {
    if (!wrapperRef.current || !trackRef.current) return;

    // Kill any existing tween
    if (animRef.current) animRef.current.kill();

    const wrap = wrapperRef.current;
    const slideWidth = wrap.clientWidth / spv;

    // We want the loop distance to be exactly one original set (not all duplicates)
    const loopDistance = slideWidth * testimonials.length;

    // Reset position to the start of a cycle to avoid drift
    gsap.set(trackRef.current, { x: 0 });

    if (prefersReduced()) {
      // Respect reduced motion
      return;
    }

    // Duration derived from distance / speed (px per second)
    const pps = getPixelsPerSecond();
    const duration = loopDistance / pps; // seconds per cycle

    animRef.current = gsap.to(trackRef.current, {
      x: -loopDistance,
      duration,
      ease: "none",
      repeat: -1,
      onRepeat: () => gsap.set(trackRef.current, { x: 0 }),
    });
  };

  useEffect(() => {
    buildAnimation();

    const onResize = () => buildAnimation();
    const onVisibility = () => {
      // Pause when tab is hidden, resume when visible (unless user is hovering)
      if (!animRef.current) return;
      if (document.hidden) animRef.current.pause();
      else if (!pauseIntentRef.current) animRef.current.resume();
    };

    const onReducedMotionChange = () => buildAnimation();
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    mqReduced.addEventListener?.("change", onReducedMotionChange);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      mqReduced.removeEventListener?.("change", onReducedMotionChange);
      if (animRef.current) animRef.current.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spv]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const pause = () => {
      pauseIntentRef.current = true;
      if (animRef.current) animRef.current.pause();
    };
    const resume = () => {
      pauseIntentRef.current = false;
      if (animRef.current) animRef.current.resume();
    };

    // Hover to pause (desktop)
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    // Touch to pause while finger is down (mobile)
    const onTouchStart = () => pause();
    const onTouchEnd = () => resume();
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-foreground mb-6">
            What founders are saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of engineering leaders who chose scalable GTM over expensive DevRel hires.
          </p>
        </div>

        {/* Auto-scrolling Carousel (responsive + hover/touch pause) */}
        <div
          className="relative"
          aria-roledescription="carousel"
          aria-label="Testimonials auto carousel"
        >
          <div
            ref={wrapperRef}
            className="overflow-hidden rounded-2xl"
          >
            <div
              ref={trackRef}
              className="flex touch-none select-none"
              style={{ willChange: "transform" }}
            >
              {slides.map((t, i) => (
                <article
                  key={`${t.author}-${i}`}
                  className="basis-full md:basis-1/2 lg:basis-1/3 shrink-0 p-3"
                  aria-roledescription="slide"
                  aria-label={`${(i % testimonials.length) + 1} of ${testimonials.length}`}
                >
                  <div className="h-full bg-[#2a2d5a]/30 border border-purple-500/30 backdrop-blur-sm rounded-2xl p-6">
                    <div className="mb-6">
                      <svg
                        className="w-8 h-8 text-brand/30 mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-neutral-foreground leading-relaxed">“{t.quote}”</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand font-semibold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-foreground">{t.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {t.role} at {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
