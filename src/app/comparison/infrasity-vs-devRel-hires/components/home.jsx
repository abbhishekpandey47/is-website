"use client";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { ArrowRight, Play, Terminal, Copy, Check } from "lucide-react";
// import Particles from "../ui/particles";
// import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
// import ClutchBadge from "./clutch";
// import CalendarBooking from "../../app/calendarButton";

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

  return (
    <section className="pt-24 pb-20" >
          <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 
                   [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero"
            width="80"
            height="80"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)" />
      </svg>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center flex flex-col justify-center pt-16 max-sm:pt-36  items-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in bg-white/15">
            🚀 Now shipping: Engineering-led GTM at scale
          </div>
          <div className="flex flex-col gap-[40px] md:gap-[30px] max-w-[70vw] max-sm:max-w-[95vw] ">
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

              <div className="flex gap-5 cursor-pointer">
                <Link
                  href="/"
                  className="inline-flex justify-center items-center 
    text-sm quicksand-semibold 
    bg-[#5F64FF] 
    rounded-[5px] relative overflow-hidden 
    border border-[#3b82f6] 
    text-white shadow-2xl transition-all 
    z-10 w-52 h-12
    
    before:ease before:absolute before:right-0 before:top-0 
    before:h-12 before:w-6 before:translate-x-12 
    before:rotate-6 before:bg-white before:opacity-10 before:duration-700 
    hover:before:-translate-x-40"
                >
                  Start Your GTM Engine
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  // onClick={openModal}
                  className="btn bg-white/15 text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-900 quicksand-semibold cursor-pointer"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>
            </div>
                <div
            className="grid grid-cols-3 gap-24 max-w-xl mx-auto text-center animate-slide-up pt-5"
            style={{ animationDelay: "0.4s" }}
          >
            <div>
              <div className="text-3xl font-bold ">10x</div>
              <div className="text-muted-foreground">Faster output</div>
            </div>
            <div>
              <div className="text-3xl font-bold ">50+</div>
              <div className="text-muted-foreground">Channels</div>
            </div>
            <div>
              <div className="text-3xl font-bold ">3M+</div>
              <div className="text-muted-foreground">Developer reach</div>
            </div>
          </div>
          </div>{" "}
      
        </div>
      </div>
    </section>
  );
};

export default InfrasityVsDevRelHome;
