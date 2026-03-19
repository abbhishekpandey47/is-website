"use client";

import Link from "next/link";
// ArrowRight no longer needed — removed "Learn more" links from cards
import CalendarBooking from "../../calendarButton";
import TrustedMarquee from "@/app/lp/reddit-marketing-agency/TrustedMarquee";

const CTA_URL = "/reddit-opportunity-finder";

/* ── Feature card (Resend two-zone layout, Infrasity styling) ──────────── */

function FeatureCard({ screenshot, num, heading, subtitle, previewHeight = 280 }) {
  return (
    <div
      className="overflow-hidden rounded-[23px] bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-[3px]"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* ZONE 1 — screenshot */}
      <div className="relative overflow-hidden" style={{ height: previewHeight }}>
        <img
          src={screenshot}
          alt={heading}
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 140,
            background: "linear-gradient(to bottom, transparent 0%, #0e0b1b 100%)",
          }}
        />
      </div>

      {/* ZONE 2 — caption (Linear style) */}
      <div className="px-7 pb-7 pt-5 border-t border-white/[0.05]">
        <span className="block mb-3 font-mono text-[11px] text-white/[0.35]">
          {num}
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
    </div>
  );
}

/* ── Browser chrome wrapper ────────────────────────────────────────────── */

function BrowserChrome({ children, url = "reddit-scout.infrasity.com" }) {
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

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#581c87]/20 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-10 md:pt-44 md:pb-14">
        {/* Badge */}
        <div className="mb-6 animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-gray-400">
            AI-powered Reddit &amp; SERP intelligence
          </span>
        </div>

        {/* h1 — LEFT aligned, 72-80px, plain white, NO gradient */}
        <h1
          className="font-[quicksand] text-white mb-6 max-w-[750px] animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:80ms]"
          style={{
            fontSize: "clamp(60px, 7vw, 80px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          Find where your
          <br />
          audience
          <br />
          already talks
        </h1>

        {/* Description */}
        <p
          className="text-gray-300 mb-8 max-w-[500px] animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:160ms]"
          style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7 }}
        >
          Reddit Radar analyzes your domain, generates targeted keywords, and
          surfaces every Reddit thread ranking on Google — plus every AI
          citation opportunity your competitors are already winning. One URL.
          Full picture.
        </p>

        {/* Two CTA buttons side by side */}
        <div className="flex items-center gap-4 mb-4 animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:240ms]">
          <CalendarBooking
            buttonText="Get Started →"
            href={CTA_URL}
            width="w-auto"
            height="h-12"
            textSize="text-sm"
          />
          <Link
            href="#features"
            className="inline-flex h-12 items-center rounded-[5px] border border-white/15 px-6 text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"
          >
            See how it works
          </Link>
        </div>

        {/* Footnote */}
        <p className="text-[13px] text-gray-600 animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:280ms]">
          Free to start · No credit card required
        </p>
      </div>

      {/* Hero product card — analyze screenshot in browser chrome */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-20 animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:360ms]">
        <BrowserChrome>
          <img
            src="/reddit-scout/analyze.png"
            alt="Reddit Radar — Analysis Dashboard"
            className="w-full block"
          />
        </BrowserChrome>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGOS BAR — reuse the global TrustedMarquee component
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
   FEATURES — section header + 2-col / 3-col card grid
   ══════════════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section intro — LEFT aligned */}
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-[13px] text-[#5f64ff] tracking-[0.01em]">
            Everything in one pass
          </p>
          <h2 className="font-[quicksand] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            First-class
            <br />
            <span className="text-gray-400 italic">Reddit intelligence</span>
          </h2>
          <p className="mt-5 max-w-[480px] text-[16px] font-light text-gray-400 leading-relaxed">
            Stop manually searching subreddits. Reddit Radar does the research,
            finds the signal, and shows you exactly where to show up.
          </p>
        </div>

        {/* Row 1 — 2 equal columns (Domain → Overview) */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <FeatureCard
            screenshot="/reddit-opportunity-finder/Domain Section.png"
            num="01"
            heading={<>Paste your domain.<br />That&apos;s it.</>}
            subtitle="One URL triggers the entire analysis — no forms, no setup."
            previewHeight={280}
          />
          <FeatureCard
            screenshot="/reddit-opportunity-finder/Overview.png"
            num="02"
            heading={<>Your company profile,<br />auto-generated.</>}
            subtitle="Capabilities, ICP, and problem spaces — extracted in seconds."
            previewHeight={280}
          />
        </div>

        {/* Row 2 — 3 equal columns (Keywords → Analyze → Configure) */}
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            screenshot="/reddit-opportunity-finder/keyword section image.png"
            num="03"
            heading={<>20 keywords.<br />Zero research.</>}
            subtitle="AI-generated with prompt clusters, labeled by intent, ready to run."
            previewHeight={240}
          />
          <FeatureCard
            screenshot="/reddit-opportunity-finder/Save and configure.png"
            num="04"
            heading={<>Save & configure<br />your strategy.</>}
            subtitle="Track saved keywords, manage competitors, and monitor results over time."
            previewHeight={240}
          />
          <FeatureCard
            screenshot="/reddit-opportunity-finder/Anaylysis.png"
            num="05"
            heading={<>One click.<br />Full analysis.</>}
            subtitle="SERP dork, Reddit threads, and AI citations — in a single pass."
            previewHeight={240}
          />
        </div>
      </div>
    </section>
  );
}

/* ── FOLD 2 — Mid-page CTA after feature cards ────────────────────────── */

function MidCTA() {
  return (
    <div className="py-14 text-center">
      <Link
        href={CTA_URL}
        className="inline-flex h-11 items-center gap-2 rounded-[5px] border border-white/15 bg-white/[0.04] px-6 text-sm text-gray-300 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        Try it free — no signup needed
        <span className="text-[#5f64ff]">→</span>
      </Link>
    </div>
  );
}

/* ── FOLD 3 — Strong CTA after how-it-works ────────────────────────────── */

function PostStepsCTA() {
  return (
    <div className="py-20 text-center">
      <CalendarBooking
        buttonText="Get Started →"
        href={CTA_URL}
        width="w-auto"
        height="h-12"
        textSize="text-sm"
      />
      <p className="mt-4 text-[13px] text-gray-600">
        Free to start · No credit card required
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS — steps left, browser screenshot right
   ══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    num: "01",
    title: "Paste your domain",
    desc: "One URL triggers a full company scrape — capabilities, ICP, problem spaces, all auto-generated.",
  },
  {
    num: "02",
    title: "Review your keywords",
    desc: "20 AI-generated keywords with prompt clusters. Edit, add, or remove before running.",
  },
  {
    num: "03",
    title: "Run analysis",
    desc: "One click fetches SERP dork threads, top Reddit posts, new posts, and AI citation data simultaneously.",
  },
  {
    num: "04",
    title: "Act on the signal",
    desc: "Engage high-ranking threads, close citation gaps, and make Reddit a repeatable pipeline source.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 md:py-28 border-y border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 items-start">
          {/* Left — steps */}
          <div>
            <p className="mb-3 text-[13px] text-[#5f64ff] tracking-[0.01em]">
              How it works
            </p>
            <h2 className="font-[quicksand] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              URL in.
              <br />
              <span className="text-gray-400 italic">Reddit map out.</span>
            </h2>
            <p className="max-w-[440px] text-[16px] font-light text-gray-400 leading-relaxed mb-10">
              30 seconds from domain to full Reddit intelligence. No manual
              research. No guesswork. No agency needed.
            </p>

            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className="flex gap-5 py-6"
                style={{
                  borderBottom:
                    i < STEPS.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <span className="shrink-0 text-[13px] font-semibold text-[#5f64ff]/40 pt-0.5">
                  {s.num}
                </span>
                <div>
                  <h3 className="mb-1.5 text-[17px] font-semibold text-white tracking-[-0.01em]">
                    {s.title}
                  </h3>
                  <p className="text-[14px] font-light text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — sticky browser screenshot */}
          <div className="sticky top-32">
            <BrowserChrome url="reddit-opportunity-finder.infrasity.com">
              <img
                src="/reddit-opportunity-finder/Domain Section.png"
                alt="Reddit Opportunity Finder — Domain Input"
                className="w-full block"
              />
            </BrowserChrome>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA
   ══════════════════════════════════════════════════════════════════════════ */

function CTA() {
  return (
    <section className="py-32 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          className="text-white mb-6"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Stop guessing.
          <br />
          Start owning
          <br />
          the conversation.
        </h2>
        <p className="mx-auto max-w-lg text-[16px] font-light text-gray-400 leading-relaxed mb-10">
          Your competitors are already cited in Reddit threads ranking on
          Page 1 for your keywords. Reddit Radar shows you exactly which
          ones — and how to take them back.
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <CalendarBooking
            buttonText="Get Started →"
            href={CTA_URL}
            width="w-auto"
            height="h-12"
            textSize="text-sm"
          />
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-[5px] border border-white/15 bg-white/[0.04] px-6 text-sm text-gray-300 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            Talk to the team
          </Link>
        </div>
        <p className="text-[12px] text-gray-600">
          Free to start · No credit card required · Built by Infrasity
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE — inherits site body bg, font, nav, footer
   ══════════════════════════════════════════════════════════════════════════ */

export default function SerpScoutLanding() {
  return (
    <div className="relative">
      <Hero />
      <LogoCloud />
      <FeaturesSection />
      <MidCTA />
      <HowItWorks />
      <PostStepsCTA />
      <CTA />
    </div>
  );
}
