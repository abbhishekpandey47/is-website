"use client";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
import CalendarBooking from "../../../calendarButton";

import { Marquee } from "@devnomic/marquee";

const InfrasityVsDevRelHome = () => {
  const headingText = useMemo(() => {
    return {
      title: "Skip the DevRel hire.".split(" "),
      subtitle: "Scale  your  GTM".split(" "),
      titles: "with engineering excellence.".split(" "),
    };
  }, []);

  const description = useMemo(() => {
    return "Get dedicated technical content, developer advocacy, and multi-channel GTM execution. Built by engineers, scaled for growth, delivered from day one.";
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
      "heroPagePara",
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

  const NewMarquee = () => {
    const fileMemo = useMemo(() => companies, []);
    const duration = "80s";

    return (
      <div className="pb-2">
        <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          <div
            className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden px-5 lg:px-12"
            aria-hidden={false}
          >
            <Marquee
              className="custom-marquee-mask"
              innerClassName="custom-marquee-track"
              pauseOnHover={true}
              fade={false}
              direction="left"
            >
              <div className="flex gap-10 items-center mx-4">
                {companies.map((company, index) => (
                  <div key={index} className={`mix-blend-color-burn`}>
                    <div
                      key={company}
                      className="text-lg font-semibold text-neutral-foreground"
                    >
                      {company}
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>

        <style jsx global>{`
          /* Smooth fade at left/right edges: mask-image works well (with -webkit prefix fallback) */
          .custom-marquee-mask {
            /* adjust percentages to change width of fade */
            -webkit-mask-image: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 10%,
              rgba(0, 0, 0, 1) 90%,
              rgba(0, 0, 0, 0) 100%
            );
            mask-image: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 10%,
              rgba(0, 0, 0, 1) 90%,
              rgba(0, 0, 0, 0) 100%
            );
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
            /* ensure overlays/gaps are not clipped by mask */
          }

          /* Force the library's animated track to run slower.
           innerClassName attaches this class to the moving track, so overriding animation-duration
           here slows the scroll. */
          .custom-marquee-track {
            -webkit-animation-duration: ${duration} !important;
            animation-duration: ${duration} !important;
            /* keep linear timing for smooth constant speed */
            -webkit-animation-timing-function: linear !important;
            animation-timing-function: linear !important;
          }

          /* Some environments set animation on a child; add a safer override for any descendant animation */
          .custom-marquee-track * {
            -webkit-animation-duration: ${duration} !important;
            animation-duration: ${duration} !important;
          }

          /* Optional: nice image smoothing */
          .custom-marquee-mask img {
            transition: transform 300ms ease, opacity 300ms ease;
            will-change: transform, opacity;
          }

          /* responsive tweak: smaller height on small screens */
          @media (max-width: 640px) {
            .custom-marquee-mask img {
              height: 36px;
              width: auto;
            }
          }
        `}</style>
      </div>
    );
  };

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

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center flex flex-col justify-center pt-16 max-sm:pt-4  items-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in bg-white/15">
            Now shipping: Engineering-led GTM at scale
          </div>
          <div className="flex flex-col gap-[40px] md:gap-[30px] max-w-[70vw] max-sm:max-w-[95vw] z-1">
            <div className="quicksand-bold w-[70vw] max-lg:text-[4em] max-lg:pt-30 max-md:pt-0 text-[5em] text-white tracking-tight leading-[85px] max-md:text-[3.5em] max-md:tracking-tighter max-md:leading-[60px] max-sm:w-[100%] ">
              <h1>
                {headingText.title.map((word, index) => (
                  <span key={index} className="HeroWordSpan">
                    {word}{" "}
                  </span>
                ))}
                <div className="">
                  {headingText.subtitle.map((word, index) => (
                    <span
                      key={index}
                      className="HeroWordSpan specialtext md:h-[93px]"
                    >
                      {" "}
                      {word}{" "}
                    </span>
                  ))}
                  {headingText.titles.map((word, index) => (
                    <span key={index} className="HeroWordSpan">
                      {word}{" "}
                    </span>
                  ))}
                </div>
              </h1>
            </div>
            <div className="flex flex-col items-center gap-10">
              <h2 className="quicksand-mediam text-[1.5em] w-[60vw] max-lg:w-[60vw] max-sm:w-[85vw] max-sm:text-[1.2em] text-center m-auto text-[wheat] heroPagePara">
                {description}
              </h2>

              {/* CTAs */}

              <div className="flex gap-5 cursor-pointer" style={{ zIndex: 1 }}>
                <CalendarBooking
                  buttonText="Book a Free Consultation"
                  width="w-52"
                />
              </div>

              {/* Social Proof - Company Logos */}
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground mb-8">
                  Trusted by engineering teams at high-growth startups
                </p>
                {NewMarquee()}
              </div>

              <div
                className="grid grid-cols-3 max-w-xl mx-auto text-center animate-slide-up pt-5 divide-x divide-border"
                style={{ animationDelay: "0.4s" }}
              >
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
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default InfrasityVsDevRelHome;
