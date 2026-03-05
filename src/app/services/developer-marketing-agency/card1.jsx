"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, memo, useMemo, useCallback } from "react";

const ContactPopupButton = dynamic(
  () => import("../../lp/reddit-marketing-agency/ContactPopupButton"),
  {
    ssr: false,
    loading: () => (
      <div className="h-9 w-36 rounded-full bg-zinc-800 animate-pulse" />
    ),
  }
);

const words = [
  { text: "We take developer" },
  { text: "marketing off your" },
  { text: "plate" },
  { text: "so adoption" },
  { text: "doesn't slip" },
];

const WordSpan = memo(({ word, index, isActive }) => (
  <span
    className="relative inline-block pr-3 transition-all duration-300 ease-in-out transform-gpu will-change-transform"
  >
    <span 
      className={`relative z-10 bg-gradient-to-br from-gray-200 to-zinc-400 bg-clip-text text-transparent transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-50'
      }`}
    >
      {word.text}
    </span>
  </span>
));

WordSpan.displayName = 'WordSpan';

const SVGMasks = memo(({ words, getMaskId }) => (
  <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
    <defs>
      {words.map((word, index) => (
        <mask key={index} id={getMaskId(index)}>
          <text
            x="0"
            y="40"  
            fill="white"
            fontSize="48" 
            fontFamily="quicksand"
            fontWeight="600"
            dominantBaseline="middle"
          >
            {word.text}
          </text>
        </mask>
      ))}
    </defs>
  </svg>
));

SVGMasks.displayName = 'SVGMasks';

const CTAButton = memo(({ isAdsVariant = false }) => (
  isAdsVariant ? (
    <ContactPopupButton
      buttonText="Book a Strategy Call"
      width="w-52"
      height="h-11"
      textSize="text-base"
      textWeight="quicksand-semibold"
    />
  ) : (
    <Link
      href="/contact"
      className="group relative inline-flex rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(108,91,233,0.6)_0%,rgba(108,91,233,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="relative z-10 rounded-full bg-zinc-950 px-6 py-2 ring-1 ring-white/10">
        Book a demo
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#6c5be9]/0 via-[#6c5be9]/90 to-[#6c5be9]/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </Link>
  )
));

CTAButton.displayName = 'CTAButton';

export default memo(function VideoTextHero({ isAdsVariant = false }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getMaskId = useCallback((index) => `text-mask-${index}`, []);

  const renderedWords = useMemo(() => 
    words.map((word, index) => (
      <WordSpan
        key={`word-${index}`}
        word={word}
        index={index}
        isActive={active === index}
      />
    )), 
    [active]
  );

  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 md:px-8 py-20">
      <SVGMasks words={words} getMaskId={getMaskId} />

      <div className="max-w-5xl">
        <span className="block text-lg font-medium leading-[1.75] -tracking-[0.04em] text-zinc-400 md:text-xl lg:text-xl xl:text-[20px]">
          The smarter shortcut to developer marketing
        </span>
        
        <h2 className="relative block font-[quicksand] text-[20px] leading-tight font-semibold md:text-[32px] lg:text-[40px] xl:text-[48px]">
          {renderedWords}
        </h2>

        {/* CTA  */}
        <div className="mt-6 flex flex-col items-start justify-center gap-y-8">
          <div className="mt-10 gap-4 justify-center items-center">
            <CTAButton isAdsVariant={isAdsVariant} />
          </div>
        </div>
      </div>
    </section>
  );
});