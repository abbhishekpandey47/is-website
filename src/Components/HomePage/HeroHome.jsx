"use client";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import Particles from "../ui/particles";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
import { Typewriter } from "react-simple-typewriter";
import ClutchBadge from "./clutch";
import CalendarBooking from "../../app/calendarButton";
import Image from "next/image";

const HeroHome = () => {
  const headingText = useMemo(() => {
    console.log("Memoizing heading text");
    return {
      title: "Tech Content Marketing Services for B2B SaaS".split(" "),
      subtitle: "startups".split(" "),
    };
  }, []);

  const description = useMemo(() => {
    console.log("Memoizing description text");
    return "At Infrasity, we drive growth for DevTools and early stage SaaS startups with impactful tech content marketing, driving visibility and engagement across key developer platforms.";
  }, []);

   useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        gsap.fromTo(
          ".HeroWordSpan",
          { opacity: 0 },
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
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 1.5,
          }
        );
      });
    }
  }, []);
  
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="relative min-h-screen overflow-hidden py-10 max-lg:pt-0 pb-20 bg-[#0D0A1A]">
      <div className="absolute inset-0 w-full h-full -mt-48" style={{ zIndex: 1 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="1193"
          viewBox="0 0 1920 1193"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <ellipse cx="978" cy="3.5" rx="1377" ry="571.5" fill="url(#paint0_radial_341_815)"/>
          <rect x="2103.94" y="1192.27" width="910" height="291" rx="145.5" transform="rotate(-158.033 2103.94 1192.27)" fill="url(#paint1_radial_341_815)"/>
          <rect x="1726" y="616" width="521" height="291" rx="145.5" transform="rotate(180 1726 616)" fill="url(#paint2_radial_341_815)"/>
          <rect x="1358.33" y="-3.43506" width="583.562" height="326.239" rx="163.119" transform="rotate(135 1358.33 -3.43506)" fill="url(#paint3_radial_341_815)"/>
          <rect x="-53.9999" y="965" width="808" height="452" rx="226" transform="rotate(-90 -53.9999 965)" fill="url(#paint4_radial_341_815)"/>
          <defs>
           
            <radialGradient id="paint1_radial_341_815" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(2392.13 642.773) rotate(72.6348) scale(895.521 2632.63)">
              <stop stopColor="#9F7AEA"/>
              <stop offset="0.868563" stopColor="#D9D9D9" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint2_radial_341_815" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1986 -61.4999) rotate(86.6209) scale(984.416 1762.41)">
              <stop stopColor="#9F7AEA"/>
              <stop offset="0.868563" stopColor="#D9D9D9" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint3_radial_341_815" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1135.77 -598.542) rotate(42.4013) scale(1003.53 1795.08)">
              <stop stopColor="#9F7AEA"/>
              <stop offset="1" stopColor="#D9D9D9" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint4_radial_341_815" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(846 -14) rotate(105.64) scale(1508.93 2698.33)">
              <stop stopColor="#9B9EF2"/>
              <stop offset="0.868563" stopColor="#D9D9D9" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="moving-dot" style={{ zIndex: 3 }}></div>
      <div className="moving-dot2" style={{ zIndex: 3 }}></div>

      <div className="text-center flex flex-col justify-center pt-32 max-sm:pt-36 items-center relative" style={{ zIndex: 10 }}>
        <div className="flex flex-col gap-[40px] md:gap-[30px] max-w-[70vw] max-sm:max-w-[95vw]">
          <div className="quicksand-bold w-[70vw] max-lg:text-[4em] max-lg:pt-30 max-md:pt-0 text-[5em] text-white tracking-tight leading-[85px] max-md:text-[3.5em] max-md:tracking-tighter max-md:leading-[60px] max-sm:w-[100%]">
            <h1>
              {headingText.title.map((word, index) => (
                <span key={index} className="HeroWordSpan">
                  {word}{" "}
                </span>
              ))}
              <div className="flex max-sm:flex-col justify-center">
                <span className="HeroWordSpan specialtext md:h-[93px]">
                  <Typewriter
                    words={[
                      "SaaS",
                      "DevOps",
                      "Obsevability",
                      "MLOps",
                      "LLMOps",
                    ]}
                    cursor
                    loop={1000}
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={100}
                    delaySpeed={1000}
                  />
                </span>
                {headingText.subtitle.map((word, index) => (
                  <span
                    key={index}
                    className="HeroWordSpan specialtext md:h-[93px]"
                  >
                    {" "}
                    {word}{" "}
                  </span>
                ))}
              </div>
            </h1>
          </div>
          <div className="flex flex-col items-center gap-10">
            <h2 className="quicksand-mediam text-[1.5em] w-[50vw] max-lg:w-[60vw] max-sm:w-[85vw] max-sm:text-[1.2em] text-center m-auto text-[wheat] heroPagePara">
              {description}
            </h2>

            <div className="items-center gap-4">
              <CalendarBooking buttonText="Book a Free Demo" />
              <div className="flex justify-center mt-4">
                <ClutchBadge />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-line divider-top" style={{ zIndex: 5 }}></div>
      <div className="max-2xl:hidden divider-line divider-left" style={{ zIndex: 5 }}></div>
      <div className="max-2xl:hidden divider-line divider-right" style={{ zIndex: 5 }}></div>

      <Particles
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        quantity={250}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default HeroHome;