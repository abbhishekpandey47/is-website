"use client";
import Image from "next/image";
import Link from "next/link";
import ScrollToFaqButton from "./ScrollToFaqButton";
import { useState, useEffect } from "react";
// blob GIF removed; using Framer HTML background instead

const rotatingBrands = [
  { name: "Perplexity", key: "perplexity", logo: "/CommLogo/perplexity.png" },
  { name: "ChatGPT", key: "chatgpt", logo: "/CommLogo/chatgpt.png" },
  { name: "Claude", key: "claude", logo: "/CommLogo/claude.png" },
  { name: "Gemini", key: "gemini", logo: "/CommLogo/gemini.png" },
  { name: "Grok", key: "grok", logo: "/CommLogo/grok.png" },
  { name: "Copilot", key: "microsoft-copilot", logo: "/CommLogo/copilot.png" },
  { name: "DeepSeek", key: "deepseek", logo: "/CommLogo/deepseek.png" },
  { name: "Google AI", key: "google-ai-overviews", logo: "/CommLogo/gemini.png" },
];

function BrandBadge({ brand }) {
  return (
    <span className="brand-badge" data-brand={brand.key} aria-hidden>
      <span
        className="brand-badge-inner"
        style={{ transform: "scale(0.9)" }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={300}
          height={300}
          className="brand-logo"
          unoptimized
        />
      </span>
    </span>
  );
}

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((idx) => (idx + 1) % rotatingBrands.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section w-full mt-24 flex justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-6 items-center">
          <div className="hero-heading w-full text-center mb-6">
            <div className="heading-bg" aria-hidden />

            <div className="relative z-10">
              <h1
                className="hero-line hero-line-inline"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                <span className="hero-prefix">Show up in</span>{" "}
                <span className="brand-inline">
                  <BrandBadge brand={rotatingBrands[currentIdx]} />
                  <span
                    className="brand-inline-text rotator-text text-align-left"
                    key={rotatingBrands[currentIdx].key}
                  >
                    {rotatingBrands[currentIdx].name}
                  </span>
                </span>
              </h1>
              <h1
                className="hero-line mt-2"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                answers where technical buyers actually decide.
              </h1>
            </div>
          </div>

          <p
            className="text-lg md:text-xl text-white/90 mb-6 text-center max-w-3xl"
            style={{ lineHeight: 1.6 }}
          >
            AI Search is reshaping how customers search and find solutions for
            their needs. Our LLM Visibility Audit enables SaaS companies to
            track, optimize, and boost their presence in LLM-powered Searches,
            keeping you visible, relevant, and ahead of the competition
          </p>

          <div className="flex justify-center gap-4 mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-sm"
            >
              Book a Call
            </Link>
            <ScrollToFaqButton className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-b from-black/10 to-black/20 border border-white/10 backdrop-blur-sm shadow-inner shadow-white/10 text-sm">
              Learn More
            </ScrollToFaqButton>
          </div>
        </div>
      </div>

      <style>{`
            .rotator-text {
              display: inline-block;
              width: auto;
              transition: opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
              opacity: 1;
              will-change: opacity, transform;
              animation: fadeInUp 0.5s cubic-bezier(.4,0,.2,1);
            }
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(30%) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
						.hero-section {
							background: radial-gradient(circle at 50% 42%, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.15) 28%, rgba(15, 23, 42, 0) 54%);
						}

						.hero-heading { position: relative; padding-top: 8px; padding-bottom: 8px; }
						.heading-bg { position: absolute; left: 50%; transform: translateX(-50%); width: 820px; height: 420px; background: radial-gradient(circle at 50% 45%, rgba(59,130,246,0.55) 0%, rgba(79,70,229,0.35) 45%, transparent 70%); filter: blur(88px) saturate(120%); z-index: 0; border-radius: 50%; top: -30px ; opacity: 0.5; }
						.hero-line { font-weight: 700; color: white; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
						.hero-line-inline { display: inline-flex; align-items: center; gap: 0.75rem; flex-wrap: nowrap; white-space: nowrap; }
						.hero-prefix { display: inline-block; }
						.brand-inline { display: inline-flex; align-items: center; gap: 0.5rem;text-align: center; white-space: nowrap; }
						.brand-inline-text { font-size: 1em; letter-spacing: 0.06em; font-family: inherit; }
            .brand-badge {
              position: relative;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: 1em;
              width: 1em;
              font-size: inherit;
              vertical-align: middle;
            }
            @media (min-width: 640px) {
              .brand-badge {
                height: 1.15em;
                width: 1.15em;
                border-radius: 0.5em;
              }
            }
            .brand-badge-inner {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              justify-content: center;
            }
            .brand-logo {
              height: 1em;
              width: auto;
              max-width: 1.5em;
              object-fit: contain;
              filter: drop-shadow(0 6px 6px rgba(15, 23, 42, 0.25));
              vertical-align: middle;
            }
					`}</style>
    </section>
  );
}
