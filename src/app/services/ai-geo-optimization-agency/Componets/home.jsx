"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CalendarBooking from "../../../calendarButton";


const rotatingBrands = [
  { name: "Perplexity", key: "perplexity", logo: "/CommLogo/perplexity.svg" },
  { name: "ChatGPT", key: "chatgpt", logo: "/CommLogo/chatgpt.svg" },
  { name: "Claude", key: "claude", logo: "/CommLogo/claude.svg" },
  { name: "Grok", key: "grok", logo: "/CommLogo/grok.svg" },
  { name: "Google AI", key: "google-ai-overviews", logo: "/CommLogo/googleai.svg" },
];

function BrandBadge({ brand }) {
  return (
    <span className="brand-badge" data-brand={brand.key} aria-hidden>
      <span className="brand-badge-inner">
        <Image
          src={brand.logo}
          alt={brand.name}
          width={40}
          height={40}
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

  const currentBrand = rotatingBrands[currentIdx];

  return (
    <section className="w-full flex flex-col pb-10 items-center justify-end bg-transparent">
      {/* Card background image */}
      <div className="relative w-full shadow-2xl -mt-18">
        <Image
          src="/aeo/aeoHome.svg"
          alt="Home Background"
          fill
          priority
          className="absolute inset-0 object-cover !h-[175%]"
        />
        {/* Content above image */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mt-[15rem]">
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-4 leading-tight">
            When Buyers Ask{' '}
            <span className="brand-inline">
              <BrandBadge brand={currentBrand} />
              <span className="brand-inline-text rotator-text" key={currentBrand.key}>
                {currentBrand.name}
              </span>
            </span>{' '}
            About Your Category, Be the Answer
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">AEO/GEO services for B2B SaaS and AI companies to increase visibility, citations, and share of voice across leading AI engines.</p>
            <div className="flex flex-col items-center">
                                     <CalendarBooking text="Book a Call" />
            </div>
        </div>
      
        <style jsx>{`
          .brand-inline {
            margin: 0 0.4rem;
            display: inline-flex;
            gap: 0.45rem;
            align-items: baseline;
            white-space: nowrap;
          }
          .brand-inline-text {
            font-size: 1.05em;
            letter-spacing: 0.06em;
            font-family: inherit;
            text-transform: unset;
          }
          .brand-badge {
            position: relative;
            display: inline-flex;
            align-items: baseline;
            justify-content: center;
            width: 1.25em;
            height: 1.25em;
          }
          .brand-badge-inner {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: baseline;
            justify-content: center;
          }
          .brand-logo {
            width: 100%;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.45));
          }
          .rotator-text {
            display: inline-block;
            transition: opacity 0.5s ease, transform 0.5s ease;
            animation: fadeInUp 0.45s ease;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20%) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
   
    </section>
  );
}
