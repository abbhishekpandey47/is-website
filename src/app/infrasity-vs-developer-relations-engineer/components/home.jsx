"use client";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
import CalendarBooking from "../../calendarButton";
import  Marquee from "./marquee";

const InfrasityVsDevRelHome = () => {
  const headingText = useMemo(() => {
    return {
      title: "Skip the DevRel hire.".split(" "),
      subtitle: "Scale  your  GTM".split(" "),
      titles: "with engineering excellence.".split(" "),
    };
  }, []);

  const description = useMemo(() => {
    return "Go beyond a single developer relations hire, Infrasity delivers technical guides, SDK docs, blogs, and videos at the pace startups need.";
  }, []);

  useLayoutEffect(() => {
    gsap.fromTo(
      ".HeroWordSpan",
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power3.out",
        duration: 1.5,
      }
    );

    gsap.fromTo(
      ".heroPagePara",
      {
        opacity: 0,
        y: 55,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 1.5,
      }
    );

    return () => {};
  }, []);

  const companies = [
    "DevFlow",
    "CloudNative Labs",
    "DataStream",
    "TechVenture",
    "BuildPlatform",
    "CodeBase",
  ];


  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* dotted grid background with directional blur */}
      <div
        className="absolute"
        style={{
          left: "16rem",
          top: "15rem",
          width: "58rem",
          height: "27rem",
          opacity: 0.4,
          zIndex: 0,
        }}
      >
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            {/* dotted grid pattern */}
            <pattern
              id="dotted-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0 H40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
              <path
                d="M0 0 V40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            </pattern>

            {/* custom multi-side fade */}
            <linearGradient id="fade-horizontal" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />{" "}
              {/* strong blur left */}
              <stop offset="15%" stopColor="white" stopOpacity="1" />{" "}
              {/* sharp center starts */}
              <stop offset="85%" stopColor="white" stopOpacity="1" />{" "}
              {/* sharp center ends */}
              <stop offset="100%" stopColor="white" stopOpacity="0" />{" "}
              {/* strong blur right */}
            </linearGradient>

            <linearGradient id="fade-vertical" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />{" "}
              {/* blur top */}
              <stop offset="15%" stopColor="white" stopOpacity="1" />{" "}
              {/* sharp area */}
              <stop offset="85%" stopColor="white" stopOpacity="1" />{" "}
              {/* sharp area */}
              <stop offset="100%" stopColor="white" stopOpacity="0" />{" "}
              {/* blur bottom */}
            </linearGradient>

            {/* combine horizontal + vertical */}
            <mask id="multi-fade">
              <rect width="100%" height="100%" fill="url(#fade-horizontal)" />
              <rect width="100%" height="100%" fill="url(#fade-vertical)" />
            </mask>
          </defs>

          {/* apply dotted grid with fade mask */}
          <rect
            width="100%"
            height="100%"
            fill="url(#dotted-grid)"
            mask="url(#multi-fade)"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
  {/* Spotlight Background */}
  <div
    aria-hidden
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(ellipse at 50% 50%, #272b40 0%, transparent 70%)",
      width: "100%",
      height: "100%",
    }}
  />

  <div className="text-center flex flex-col justify-center pt-16 max-sm:pt-4 items-center">
    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in bg-white/15">
      Now shipping: Engineering-led GTM at scale
    </div>

    <div className="flex flex-col gap-[40px] md:gap-[30px] max-w-[70vw] max-sm:max-w-[95vw] z-10">
      <div className="quicksand-bold w-[70vw] max-lg:text-[4em] max-lg:pt-30 max-md:pt-0 text-[5em] text-white tracking-tight leading-[85px] max-md:text-[3.5em] max-md:tracking-tighter max-md:leading-[60px] max-sm:w-[100%] ">
        <h1>
          {headingText.title.map((word, index) => (
            <span key={index} className="HeroWordSpan">{word} </span>
          ))}
          <div>
            {headingText.subtitle.map((word, index) => (
              <span key={index} className="HeroWordSpan specialtext md:h-[93px]">{word} </span>
            ))}
            {headingText.titles.map((word, index) => (
              <span key={index} className="HeroWordSpan">{word} </span>
            ))}
          </div>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-10">
        <h2 className="quicksand-mediam text-[1.5em] w-[60vw] max-lg:w-[60vw] max-sm:w-[85vw] max-sm:text-[1.2em] text-center m-auto text-[wheat] heroPagePara">
          {description}
        </h2>

        {/* CTA */}
        <div className="flex gap-5 cursor-pointer z-10">
          <CalendarBooking buttonText="Book a Free Consultation" width="w-52" />
        </div>


        <Marquee />
   

        {/* Stats */}
        <div className="grid grid-cols-3 max-w-xl mx-auto text-center animate-slide-up pt-5 divide-x divide-border z-10">
          <div className="px-6">
            <div className="text-3xl font-bold">10x</div>
            <div className="text-muted-foreground">Faster output</div>
          </div>
          <div className="px-6">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-muted-foreground">Channels</div>
          </div>
          <div className="px-6">
            <div className="text-3xl font-bold">3M+</div>
            <div className="text-muted-foreground">Developer reach</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </section>
  );
};

export default InfrasityVsDevRelHome;
