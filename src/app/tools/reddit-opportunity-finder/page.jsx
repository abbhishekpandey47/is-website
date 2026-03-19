"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useAnimation } from "framer-motion";
import TrustedMarquee from "@/app/lp/reddit-marketing-agency/TrustedMarquee";

const CTA_URL = "/reddit-opportunity-finder";

/* ── Spring + easing presets (Linear/Vercel feel) ─────────────────────── */

const SPRING = { type: "spring", stiffness: 280, damping: 60 };
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const HOVER_SPRING = { type: "spring", stiffness: 400, damping: 25 };

/* ── Reduced motion wrapper ───────────────────────────────────────────── */

function useMotionSafe() {
  const reduced = useReducedMotion();
  return !reduced;
}

/* ── Shared button components ─────────────────────────────────────────── */

function PrimaryCTA({ className = "" }) {
  const motionSafe = useMotionSafe();
  return (
    <motion.div
      whileHover={motionSafe ? { scale: 1.03 } : {}}
      whileTap={motionSafe ? { scale: 0.97 } : {}}
      transition={HOVER_SPRING}
      className="inline-flex"
    >
      <Link
        href={CTA_URL}
        className={`group inline-flex items-center rounded-[5px] bg-[#5f64ff] px-6 py-2.5 text-[14px] font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(95,100,255,0.3)] ${className}`}
      >
        <span>Try Reddit Scout Free</span>
        <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
      </Link>
    </motion.div>
  );
}

function GhostCTA({ href, children }) {
  const motionSafe = useMotionSafe();
  return (
    <motion.div
      whileHover={motionSafe ? { scale: 1.03 } : {}}
      whileTap={motionSafe ? { scale: 0.97 } : {}}
      transition={HOVER_SPRING}
      className="inline-flex"
    >
      <Link
        href={href}
        className="inline-flex items-center rounded-[5px] border border-white/15 px-6 py-2.5 text-[14px] font-medium text-gray-300 transition-colors hover:border-white/30 hover:text-white"
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ── Counter animation for card numbers ───────────────────────────────── */

function AnimatedNumber({ value, inView }) {
  const [display, setDisplay] = useState("00");
  const motionSafe = useMotionSafe();

  useEffect(() => {
    if (!inView || !motionSafe) {
      if (!motionSafe) setDisplay(value);
      return;
    }
    const target = parseInt(value, 10);
    const duration = 400;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(String(current).padStart(2, "0"));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, motionSafe]);

  return <>{display}</>;
}

/* ── Feature card ─────────────────────────────────────────────────────── */

function FeatureCard({ screenshot, num, heading, subtitle, previewHeight = 280, index = 0, inView }) {
  const motionSafe = useMotionSafe();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={motionSafe ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-[24px] p-[1px]"
      style={{ cursor: "default" }}
    >
      {/* Light beam tracing border edge */}
      <div
        className="absolute inset-0 rounded-[24px] border-trace transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0.3 }}
      />
      {/* Soft glow following the beam */}
      <div
        className="absolute inset-[-3px] rounded-[27px] blur-[10px] border-trace-glow transition-opacity duration-300"
        style={{ opacity: hovered ? 0.6 : 0.15 }}
      />

      {/* Card inner */}
      <motion.div
        animate={{
          y: hovered ? -6 : 0,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 80px rgba(0,0,0,0.5), 0 8px 30px rgba(0,0,0,0.4)"
            : "0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-[23px] bg-[#0e0b1b]"
      >
        {/* ZONE 1 — screenshot */}
        <div className="relative overflow-hidden" style={{ height: previewHeight }}>
          <motion.img
            src={screenshot}
            alt={typeof heading === "string" ? heading : "Feature screenshot"}
            className="w-full h-full object-cover object-top"
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 40px 20px #0e0b1b" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: 140,
              background: "linear-gradient(to bottom, transparent 0%, #0e0b1b 100%)",
            }}
          />
        </div>

        {/* ZONE 2 — caption */}
        <div className="px-7 pb-7 pt-5 border-t border-white/[0.05]">
          <span className="block mb-3 font-mono text-[11px] text-white/[0.35]">
            <AnimatedNumber value={num} inView={inView} />
          </span>
          <h3
            className="mb-2.5 text-white"
            style={{
              fontSize: "clamp(22px, 2.5vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {heading}
          </h3>
          <p className="text-[14px] font-light text-white/[0.45] leading-snug">
            {subtitle}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Browser chrome wrapper ────────────────────────────────────────────── */

function BrowserChrome({ children, url = "infrasity.com/tools/reddit-scout" }) {
  return (
    <div
      className="overflow-hidden rounded-[20px] bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)]"
      style={{
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
        <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
        <div className="ml-3 flex h-[24px] flex-1 items-center rounded-md bg-white/[0.04] px-3">
          <span className="text-[11px] text-gray-500">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════════════════════ */

const heroChildren = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function FadeSlide({ y = 16, delay = 0, children, className = "" }) {
  const motionSafe = useMotionSafe();
  return (
    <motion.div
      initial={motionSafe ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const motionSafe = useMotionSafe();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#581c87]/20 via-transparent to-transparent" />

      {/* Orb 1 — indigo, top-left */}
      {motionSafe && (
        <motion.div
          className="absolute -z-10 pointer-events-none rounded-full"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(95,100,255,0.25) 0%, transparent 70%)",
            filter: "blur(100px)",
            top: "-10%",
            left: "-5%",
          }}
          animate={{
            x: [0, 80, 20, 100, 0],
            y: [0, 60, 120, 40, 0],
          }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      {/* Orb 2 — purple, bottom-right */}
      {motionSafe && (
        <motion.div
          className="absolute -z-10 pointer-events-none rounded-full"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
            filter: "blur(100px)",
            bottom: "5%",
            right: "-5%",
          }}
          animate={{
            x: [0, -70, -30, -90, 0],
            y: [0, -50, -100, -30, 0],
          }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-10 md:pt-44 md:pb-14 grid grid-cols-1 md:grid-cols-[1fr_280px] items-center gap-12">
        {/* Left — hero text */}
        <div>
          <FadeSlide y={16} delay={0}>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-gray-400">
                AI-powered Reddit &amp; SERP analysis
              </span>
            </div>
          </FadeSlide>

          <FadeSlide y={24} delay={0.1}>
            <h1
              className="font-[quicksand] text-white mb-4 max-w-[750px]"
              style={{
                fontSize: "clamp(60px, 7vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Reddit threads your
              <br />
              competitors are winning.
              <br />
              Now you can too.
            </h1>
          </FadeSlide>

          <FadeSlide y={16} delay={0.26}>
            <p
              className="mb-8 max-w-[500px]"
              style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
            >
              Paste your domain. Get every Reddit thread ranking on Google for your keywords — plus where your competitors are cited and you aren&apos;t.
            </p>
          </FadeSlide>

          <FadeSlide y={12} delay={0.34}>
            <div className="flex items-center gap-4 mb-4">
              <PrimaryCTA />
              <GhostCTA href="#features">See how it works</GhostCTA>
            </div>
          </FadeSlide>

          <FadeSlide y={0} delay={0.42}>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Free to start · No credit card required
            </p>
          </FadeSlide>
        </div>

        {/* Right — Product Hunt badge */}
        <FadeSlide y={16} delay={0.5} className="hidden md:flex items-center justify-center self-center">
          <a
            href="https://www.producthunt.com/products/reddit-opportunity-finder-by-infrasity?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-reddit-opportunity-finder-by-infrasity"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1100763&theme=light&t=1773946604966"
              alt="Reddit Opportunity Finder by Infrasity on Product Hunt"
              width="250"
              height="54"
              style={{ width: 250, height: 54 }}
              loading="eager"
            />
          </a>
        </FadeSlide>
      </div>

      {/* Hero product card — full width, float effect */}
      <motion.div
        className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-20"
        initial={motionSafe ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
        animate={motionSafe ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.5 }}
      >
        <motion.div
          animate={motionSafe ? { y: [0, -8, 0] } : {}}
          transition={motionSafe ? {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          } : {}}
          style={{ willChange: "transform" }}
        >
          <BrowserChrome>
            <img
              src="/aeo/hero_image_reddit_finder.png"
              alt="Reddit Scout — Analysis Dashboard"
              className="w-full block"
            />
          </BrowserChrome>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGOS BAR
   ══════════════════════════════════════════════════════════════════════════ */

function LogoCloud() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[90%] justify-center items-center flex flex-col relative z-10">
        <TrustedMarquee spacingClassName="pt-10" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURES
   ══════════════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section id="features" className="py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section intro */}
        <motion.div
          className="mb-10 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <p className="mb-2 text-[13px] text-[#5f64ff] tracking-[0.01em]">
            Everything in one pass
          </p>
          <h2 className="font-[quicksand] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            One URL.
            <br />
            <span className="text-white/60">Full picture.</span>
          </h2>
          <p className="max-w-[480px] text-[16px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            One click fetches Google-ranked Reddit threads, keyword clusters, and AI citation gaps — all from a single domain input.
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <FeatureCard
            screenshot="/reddit-opportunity-finder/Domain Section.png"
            num="01"
            heading={<>Paste your domain.<br />That&apos;s it.</>}
            subtitle="One URL triggers the entire analysis — no forms, no setup."
            previewHeight={280}
            index={0}
            inView={inView}
          />
          <FeatureCard
            screenshot="/reddit-opportunity-finder/Overview.png"
            num="02"
            heading={<>Your company profile,<br />auto-generated.</>}
            subtitle="Paste a URL. Get capabilities, ICP, and problem spaces — no forms, no setup."
            previewHeight={280}
            index={1}
            inView={inView}
          />
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard
            screenshot="/reddit-opportunity-finder/keyword section image.png"
            num="03"
            heading={<>20 keywords.<br />Zero research.</>}
            subtitle="Generated from your actual positioning. Labeled by intent. Ready to run."
            previewHeight={360}
            index={2}
            inView={inView}
          />
          <FeatureCard
            screenshot="/aeo/Result Image 6.png"
            num="04"
            heading={<>One click.<br />Full analysis.</>}
            subtitle="SERP dork links, Reddit threads, and AI citations — pulled and structured in one pass."
            previewHeight={360}
            index={3}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Mid-page CTA ─────────────────────────────────────────────────────── */

function MidCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className="py-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <PrimaryCTA />
      <p className="mt-4 text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>
        Free to start · No credit card required
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS — with scroll-driven step highlighting
   ══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { num: "01", title: "Paste your domain", desc: "One URL triggers a full company scrape — capabilities, ICP, problem spaces, all auto-generated." },
  { num: "02", title: "Review your keywords", desc: "20 AI-generated keywords with prompt clusters. Edit, add, or remove before running." },
  { num: "03", title: "Run analysis", desc: "One click fetches SERP dork threads, top Reddit posts, new posts, and AI citation data simultaneously." },
  { num: "04", title: "Act on the signal", desc: "Engage high-ranking threads, close citation gaps, and make Reddit a repeatable pipeline source." },
];

function StepItem({ step, index, isActive }) {
  const motionSafe = useMotionSafe();
  return (
    <div className="flex gap-5 py-5 relative">
      <motion.span
        className="shrink-0 text-[13px] font-semibold pt-0.5"
        animate={{
          color: isActive ? "rgba(95,100,255,1)" : "rgba(95,100,255,0.6)",
        }}
        transition={{ duration: 0.3 }}
      >
        {step.num}
      </motion.span>
      <div className="flex-1">
        <motion.h3
          className="mb-1.5 text-[16px] font-semibold tracking-[-0.01em]"
          animate={{
            color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.75)",
          }}
          transition={{ duration: 0.3 }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="text-[14px] font-light"
          style={{ lineHeight: 1.6 }}
          animate={{
            color: isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.35)",
          }}
          transition={{ duration: 0.3 }}
        >
          {step.desc}
        </motion.p>
      </div>
      {/* Accent line draws on active */}
      {index < STEPS.length - 1 && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: isActive ? "#5f64ff" : "rgba(255,255,255,0.06)" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        />
      )}
      {index < STEPS.length - 1 && !isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]" />
      )}
    </div>
  );
}

function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!stepsRef.current || !sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const scrollProgress = Math.max(0, Math.min(1, -sectionRect.top / (sectionHeight - window.innerHeight)));
      const step = Math.min(STEPS.length - 1, Math.floor(scrollProgress * STEPS.length));
      setActiveStep(step);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 border-y border-white/[0.06]" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Left — steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <p className="mb-2 text-[13px] text-[#5f64ff] tracking-[0.01em]">
              How it works
            </p>
            <h2
              className="font-[quicksand] font-bold text-white mb-4"
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              URL in.
              <br />
              <span className="text-white">Reddit map out.</span>
            </h2>
            <p
              className="max-w-[400px] text-[15px] font-light leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              30 seconds from domain to full Reddit coverage. No manual
              research. No guesswork. No agency needed.
            </p>

            <div ref={stepsRef}>
              {STEPS.map((s, i) => (
                <StepItem key={s.num} step={s} index={i} isActive={i === activeStep} />
              ))}
            </div>

            <div className="mt-8">
              <PrimaryCTA />
            </div>
          </motion.div>

          {/* Right — sticky browser screenshot */}
          <motion.div
            className="sticky top-32"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            <BrowserChrome>
              <img
                src="/reddit-opportunity-finder/Domain Section.png"
                alt="Reddit Scout — Domain Input"
                className="w-full block"
              />
            </BrowserChrome>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FINAL CTA — dramatic entrance
   ══════════════════════════════════════════════════════════════════════════ */

function WordByWord({ text, inView, delay = 0 }) {
  const motionSafe = useMotionSafe();
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={motionSafe ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: delay + i * 0.04 }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const motionSafe = useMotionSafe();

  return (
    <section className="py-20 border-t border-white/[0.06] relative overflow-hidden" ref={ref}>
      {/* Background glow orb */}
      {motionSafe && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(95,100,255,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      )}

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          className="mb-4 text-[12px] tracking-[0.1em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get started free
        </motion.p>

        <h2
          className="text-white mb-4"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
          }}
        >
          <WordByWord text="Your competitors are" inView={inView} delay={0.15} />
          <br />
          <WordByWord text="already there." inView={inView} delay={0.25} />
          <br />
          <WordByWord text="Are you?" inView={inView} delay={0.35} />
        </h2>

        <motion.p
          className="mx-auto max-w-lg text-[16px] font-light leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={motionSafe ? { opacity: 0, y: 16 } : { opacity: 1 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.45 }}
        >
          They&apos;re cited in Reddit threads ranking on Page 1 for your keywords. Reddit Scout shows you exactly which ones.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={motionSafe ? { opacity: 0, scale: 0.95 } : { opacity: 1 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ ...SPRING, delay: 0.55 }}
        >
          <PrimaryCTA />
          <GhostCTA href="/contact">Talk to the team</GhostCTA>
        </motion.div>

        <motion.p
          className="mt-4 text-[12px]"
          style={{ color: "rgba(255,255,255,0.25)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          Free to try · B2B SaaS &amp; DevTools · Built by Infrasity
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════ */

export default function RedditScoutLanding() {
  return (
    <div className="relative">
      <Hero />
      <LogoCloud />
      <FeaturesSection />
      <MidCTA />
      <HowItWorks />
      <CTA />
    </div>
  );
}
