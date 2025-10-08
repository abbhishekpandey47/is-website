"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ========= YouTube helpers ========= */
function isYouTubeUrl(url = "") {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}
function getYouTubeId(url = "") {
  try {
    const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
  } catch {}
  return "";
}
function toYouTubeEmbed(url = "") {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0` : "";
}

/* ========= Component ========= */
export default function VideoTestimonials({
  items = [],
  className = "",
  brandColor = "bg-btnprimary",
  autoplayMs = 0, // set >0 (e.g. 7000) to auto-advance
}) {
  const data = items.length ? items : [DEFAULT_ITEM];

  const [index, setIndex] = useState(0);
  const [openVideo, setOpenVideo] = useState(null);

  const slideCount = data.length;
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

  // Optional auto-advance (paused while dialog is open)
  useEffect(() => {
    if (!autoplayMs || slideCount < 2 || openVideo) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, slideCount, next, openVideo]);

  // Keyboard arrows on the whole section
  const containerRef = useRef(null);
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Accessibility live region
  const liveMsg = useMemo(
    () => `Showing testimonial ${slideCount ? index + 1 : 0} of ${slideCount}`,
    [index, slideCount]
  );

  return (
    <section className={`${className}`} aria-label="Customer video testimonials">
      <div
        className="container outline-none"
        tabIndex={0}
        ref={containerRef}
        onKeyDown={onKeyDown}
      >
        {/* Top-right controls (hide when only one slide) */}
        {slideCount > 1 && (
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
              <button
                onClick={prev}
                aria-label="Previous"
                className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-muted/80"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-muted/80"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Track: each slide contains BOTH columns */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-300 ease-out will-change-transform"
            style={{
            //   width: `${Math.max(1, data.length) * 100}%`,
              transform: `translate3d(${-index * 100}%, 0, 0)`,
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {data.map((item, i) => (
              <div key={item.id || i} className="w-full shrink-0 basis-full p-8 border-[1px] border-[#A259FF] rounded-[15px] ">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  {/* Left: text (per slide) */}
                  <div>
                    {item.eyebrow ? (
                      <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                        {item.eyebrow}
                      </p>
                    ) : null}
                    {item.heading ? (
                      <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl leading-tight">
                        {item.heading}
                      </h2>
                    ) : null}
                    {item.blurb ? (
                      <p className="mt-4 text-lg text-muted-foreground max-w-xl">{item.blurb}</p>
                    ) : null}
                    {item.cta?.href && item.cta?.label ? (
                      <div className="mt-8">
                        <a
                          href={item.cta.href}
                          className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.cta.label}
                        </a>
                      </div>
                    ) : null}
                  </div>

                  {/* Right: cover + quote card (per slide) */}
                  <div className="relative">
                    {/* Cover */}
                    <div className="flex w-full justify-center">
                      <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-navshadow">
                        {item.headshotSrc ? (
                          <Image
                            alt={item.headshotAlt || item.personName || "Testimonial image"}
                            src={item.headshotSrc}
                            fill
                            sizes="(min-width: 1024px) 32vw, 90vw"
                            className="object-contain"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                            No cover image
                          </div>
                        )}

                        {(item.videoUrl || item.videoSrc) ? (
                          <button
                            onClick={() => setOpenVideo(item)}
                            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full ${brandColor} text-white shadow-lg h-14 w-14 md:h-16 md:w-16 focus:outline-none focus:ring-2 focus:ring-ring`}
                            aria-label="Play video"
                          >
                            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                              {/* <circle cx="12" cy="12" r="12" fill="currentColor" /> */}
                              <path d="M9 6v12l9-6-9-6z" fill="#fff" fillOpacity="0.9" />
                            </svg>
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {/* Quote (same max-w as cover to avoid overflow) */}
                    {(item.quote || item.personName || item.companyLogoSrc) && (
                      <div className="mx-auto mt-4 w-full max-w-md rounded-md bg-amber-50 p-6 shadow-sm border border-border">
                        <div>
                          {item.companyLogoSrc ? (
                            <div className="relative h-8 w-32 shrink-0 p-4 mb-4">
                              <Image
                                alt={item.companyLogoAlt || ""}
                                src={item.companyLogoSrc}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                          <div className="min-w-0">
                            {item.quote ? (
                              <blockquote className="italic text-base md:text-lg leading-relaxed text-black">
                                “{item.quote}”
                              </blockquote>
                            ) : null}
                            {(item.personName || item.personTitle) && (
                              <div className="mt-3">
                                {item.personName ? <div className="font-bold text-black">{item.personName}</div> : null}
                                {item.personTitle ? (
                                  <div className="text-sm text-black">{item.personTitle}</div>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {liveMsg}
          </p>
        </div>
      </div>

      <VideoDialog openItem={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}

/* ========= Centered modal (NOT full-screen) ========= */
function VideoDialog({ openItem, onClose }) {
  const iframeRef = useRef(null);

  const url = openItem?.videoUrl || openItem?.videoSrc || "";
  const isYT = isYouTubeUrl(url);
  const embed = isYT ? toYouTubeEmbed(url) : "";

  // Esc to close + lock scroll while open
  useEffect(() => {
    if (!openItem) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openItem, onClose]);

  if (!openItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
        aria-label="Close video"
      >
        <XIcon className="h-5 w-5" />
      </button>

      {/* Centered modal panel with safe sizing */}
      <div
        className="flex h-full w-full items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-[90vw] md:max-w-3xl lg:max-w-4xl">
          <div
            className="relative w-full overflow-hidden rounded-lg bg-black shadow-2xl"
            style={{ paddingTop: "56.25%" }}
          >
            {isYT ? (
              <iframe
                ref={iframeRef}
                src={embed}
                title={openItem.personName || "Testimonial video"}
                className="absolute left-0 top-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                autoPlay
                controls
                playsInline
                className="absolute left-0 top-0 h-full w-full"
                src={url}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========= Icons ========= */
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
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6L6 18" /><path d="M6 6l12 12" />
    </svg>
  );
}
