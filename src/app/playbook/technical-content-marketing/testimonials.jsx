"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * VideoTestimonials (JS version)
 * -------------------------------------------
 * Dependency‑free, responsive video testimonial carousel for Next.js.
 * Works with your Tailwind config (border/input/card/muted tokens, btnprimary, etc.).
 *
 * Props (plain JS):
 * - heading?: string
 * - eyebrow?: string
 * - blurb?: string
 * - cta?: { label: string, href: string }
 * - items: Array<{
 *     id: string,
 *     eyebrow?: string,
 *     heading?: string,
 *     blurb: string,
 *     ctaHref?: string,
 *     ctaLabel?: string,
 *     headshotSrc: string,
 *     headshotAlt?: string,
 *     companyLogoSrc: string,
 *     companyLogoAlt?: string,
 *     quote: string,
 *     personName: string,
 *     personTitle: string,
 *     videoSrc?: string,
 *   }>
 * - brandColor?: Tailwind bg-* class for Play button (defaults to your theme's btnprimary)
 */

export default function VideoTestimonials({
  heading = "Hear directly from our customers",
  eyebrow = "Case studies",
  blurb,
  cta,
  items = [],
  className = "",
  brandColor = "bg-btnprimary",
}) {
  const [index, setIndex] = useState(0);
  const slideCount = items.length || DEFAULT_ITEMS.length;

  const clamp = useCallback(
    (n) => {
      if (slideCount === 0) return 0;
      if (n < 0) return slideCount - 1;
      if (n >= slideCount) return 0;
      return n;
    },
    [slideCount]
  );

  const goTo = useCallback((n) => setIndex(clamp(n)), [clamp]);
  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [clamp]);
  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [clamp]);

  // Touch/drag support
  const trackRef = useRef(null);
  const startX = useRef(null);
  const deltaX = useRef(0);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
    deltaX.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (startX.current == null) return;
    deltaX.current = e.clientX - startX.current;
    if (trackRef.current) {
      const pct = -index * 100 + (-deltaX.current / (trackRef.current.clientWidth || 1)) * 100;
      trackRef.current.style.transform = `translate3d(${pct}%,0,0)`;
    }
  };
  const onPointerUp = () => {
    if (startX.current == null) return;
    const threshold = 48; // px
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    // reset transform to the current slide
    if (trackRef.current) {
      const pct = -index * 100;
      trackRef.current.style.transform = `translate3d(${pct}%,0,0)`;
    }
    startX.current = null;
    deltaX.current = 0;
  };

  useEffect(() => {
    if (!trackRef.current) return;
    const pct = -index * 100;
    trackRef.current.style.transform = `translate3d(${pct}%,0,0)`;
  }, [index]);

  const [openVideo, setOpenVideo] = useState(null);
  const liveMsg = useMemo(() => `Showing testimonial ${slideCount ? index + 1 : 0} of ${slideCount}`, [index, slideCount]);

  const data = items.length ? items : DEFAULT_ITEMS;

  return (
    <section className={`w-full ${className}`} aria-label="Customer video testimonials">
      <div className="container">
        {/* Top bar: nav dots + arrows (top-right like the reference) */}
        <div className="mb-4 flex items-center justify-end gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 w-2 rounded-full transition ${i === index ? "bg-foreground" : "bg-muted"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} aria-label="Previous" className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-muted/80">
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Next" className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-muted/80">
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Two-column layout to match screenshot */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: text block */}
          <div>
            {eyebrow ? (
              <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">{eyebrow}</p>
            ) : null}
            <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl leading-tight">
              {heading}
            </h2>
            {blurb ? (
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">{blurb}</p>
            ) : null}
            {cta ? (
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent hover:text-accent-foreground"
                >
                  {cta.label}
                </a>
              </div>
            ) : null}
          </div>

          {/* Right: carousel viewport */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-2xl"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div
                ref={trackRef}
                className="flex transition-transform duration-300 ease-out will-change-transform"
                style={{ width: `${Math.max(1, data.length) * 100}%`, transform: `translate3d(${-index * 100}%,0,0)` }}
                aria-live="polite"
                aria-atomic="true"
              >
                {data.map((t, i) => (
                  <Slide key={t.id || i} item={t} selected={i === index} brandColor={brandColor} onPlay={() => setOpenVideo(t)} />
                ))}
              </div>
            </div>
            <p className="sr-only" aria-live="polite">{liveMsg}</p>
          </div>
        </div>
      </div>

      <VideoDialog openItem={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}

function Slide({ item, selected, brandColor, onPlay }) {
  return (
    <div className="w-full shrink-0 basis-full p-0">
      {/* Compact cover: centered thumbnail with play button */}
      <div className="flex w-full justify-center">
        <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-navshadow">
          <Image
            alt={item.headshotAlt || item.personName || "Testimonial image"}
            src={item.headshotSrc}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover"
          />
          {item.videoSrc ? (
            <button
              onClick={onPlay}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full ${brandColor} text-white shadow-lg h-14 w-14 md:h-16 md:w-16 focus:outline-none focus:ring-2 focus:ring-ring`}({ openItem, onClose }) {({ openItem, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (openItem) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [openItem]);

  return (
    <dialog ref={ref} onClose={onClose} className="backdrop:bg-black/60 rounded-2xl p-0 border-0 w-[min(90vw,960px)]">
      {openItem ? (
        <div className="relative">
          <video autoPlay controls playsInline className="h-full w-full rounded-2xl" src={openItem.videoSrc} />
          <button
            onClick={() => ref.current?.close()}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90"
            aria-label="Close video"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

/* ---------------- Icons (inline SVG) ---------------- */
function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
    </svg>
  );
}
function PlayCircledIcon(props) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="32" cy="32" r="32" fill="currentColor" />
      <path d="M28 40.37V23.63L40.88 32 28 40.37Z" fill="white" fillOpacity="0.89" />
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6L6 18" /><path d="M6 6l12 12" />
    </svg>
  );
}

/* ---------------- Example data (replace) ---------------- */
export const DEFAULT_ITEMS = [
  {
    id: "1",
    eyebrow: "Case studies",
    heading: "Hear directly from our customers",
    blurb: "Learn how HubSpot Academy used Surveys to boost signups by 10%.",
    ctaHref: "/customers",
    ctaLabel: "See case studies",
    headshotSrc: "/images/examples/eric.jpg",
    headshotAlt: "Eric Peters",
    companyLogoSrc: "/images/examples/hubspot.svg",
    companyLogoAlt: "HubSpot",
    quote: "If you can't figure out why users are bouncing, Surveys is a really direct way to ask them.",
    personName: "Eric Peters",
    personTitle: "Growth Marketer, HubSpot",
    videoSrc: "/videos/examples/hubspot.mp4",
  },
  {
    id: "2",
    blurb: "Learn how the UK's no.1 job portal optimizes user experience.",
    headshotSrc: "/images/examples/brett.jpg",
    headshotAlt: "Brett Orr",
    companyLogoSrc: "/images/examples/reed.svg",
    companyLogoAlt: "Reed.co.uk",
    quote: "We like to make people happy at Reed.co.uk and Surveys shows us how well we are doing.",
    personName: "Brett Orr",
    personTitle: "Lead Product Owner, Reed.co.uk",
    videoSrc: "/videos/examples/reed.mp4",
  },
  {
    id: "3",
    blurb: "Learn how landing‑page gurus optimize their pages.",
    headshotSrc: "/images/examples/michael.jpg",
    headshotAlt: "Michael Aagaard",
    companyLogoSrc: "/images/examples/unbounce.svg",
    companyLogoAlt: "Unbounce",
    quote: "I used to have a bunch of different tools I had to pay for, but with this platform you get everything in one bundle.",
    personName: "Michael Aagaard",
    personTitle: "Senior Conversion Optimizer, Unbounce",
    videoSrc: "/videos/examples/unbounce.mp4",
  },
];
