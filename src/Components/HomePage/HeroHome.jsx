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

    return () => { };
  }, []);

  const [color, setColor] = useState("#ffffff");

  return (
    <div className=" py-10 max-lg:pt-0 bgImageHero pb-20">
      <div className="moving-dot"></div>
      <div className="moving-dot2"></div>

      <div className="text-center flex flex-col justify-center pt-32 max-sm:pt-36  items-center">
        <div className="flex flex-col gap-[40px] md:gap-[30px] max-w-[70vw] max-sm:max-w-[95vw] ">
          <div className="quicksand-bold w-[70vw] max-lg:text-[4em] max-lg:pt-30 max-md:pt-0 text-[5em] text-white tracking-tight leading-[85px] max-md:text-[3.5em] max-md:tracking-tighter max-md:leading-[60px] max-sm:w-[100%] ">
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
              {/* <Link
                href="/contact"
                className="relative z-10 btn bg-btnprimary text-white hover:bg-btnprimaryhov quicksand-bold"
              >
                Book a Free Demo
              </Link> */}
              <CalendarBooking buttonText="Book a Free Consultation" width="w-52" />
              <div className="flex justify-center mt-4">
                <ClutchBadge />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-line divider-top"></div>
      <div className="max-2xl:hidden divider-line divider-left"></div>
      {/* <div className="divider-line divider-bottom"></div> */}
      <div className="max-2xl:hidden divider-line divider-right"></div>
      <Particles
        className="absolute inset-0"
        quantity={250}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default HeroHome;