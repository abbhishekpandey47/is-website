"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CalendarBooking from "../../calendarButton";

export default function YCStartupLanding() {
  const BackgroundSVG = () => (
    <svg
      width="140"
      height="10"
      viewBox="0 0 1440 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <g clipPath="url(#clip0_647_203)">
        <g filter="url(#filter0_f_647_203)">
          <circle cx="1436" cy="31" r="402" fill="#5F64FF" fillOpacity="0.6" />
        </g>
        <g filter="url(#filter1_f_647_203)">
          <circle cx="-162" cy="449" r="402" fill="#5F64FF" fillOpacity="0.6" />
        </g>
        <g filter="url(#filter2_f_647_203)">
          <circle cx="842" cy="885" r="328" fill="#5F64FF" fillOpacity="0.5" />
        </g>
      </g>
      <defs>
        <filter id="filter0_f_647_203" x="660" y="-745" width="1552" height="1552" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="187" result="effect1_foregroundBlur_647_203" />
        </filter>
        <filter id="filter1_f_647_203" x="-938" y="-327" width="1552" height="1552" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="187" result="effect1_foregroundBlur_647_203" />
        </filter>
        <filter id="filter2_f_647_203" x="140" y="183" width="1404" height="1404" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="187" result="effect1_foregroundBlur_647_203" />
        </filter>
        <clipPath id="clip0_647_203">
          <rect width="1455" height="1507" fill="white" transform="translate(-15 -449)" />
        </clipPath>
      </defs>
    </svg>
  );
  return (
    <div
      className="flex items-center pb-20 pt-40 overflow-hidden relative"
    >
      <div className="inset-0 z-0">
        <BackgroundSVG />
      </div>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="w-full lg:w-[120%] text-center lg:text-left p-8 lg:m-0 lg:ml-20">
            <div className="half-ring"></div>

            <h1
              className="text-5xl lg:text-6xl font-bold quicksand-bold tracking-wide text-white  mb-8"
              style={{ lineHeight: "1.3" }}
            >
              Content led <span className="text-white">GTM & developer <br className="hidden lg:block" /> marketing service</span>
              <br />
              for <span className="text-orange-500">Y Combinator</span>{" "}Startup
            </h1>

            <p className="w-full lg:w-[82%] text-xl md:text-xl text-[#ffe8a8] leading-relaxed font-[320] mb-8">
We work with startups from Y Combinator batch such as Cadana (W24), Middleware (W220, GerMocha (S22), and Aviator (W21). We have delivered developer-first content, launch-ready docs, and GTM assets that fuel early growth.            </p>

            <CalendarBooking />
          </div>

          <div className="relative flex justify-end lg:justify-end lg:ml-36 mb-10 lg:mb-24 ">
            <div className="absolute right-16 top-16 w-full h-full opacity-20 rounded-2xl overflow-hidden">
              <Image
                src={`/ai-page/yc-web.png`}
                alt="Background"
                width={800}
                height={600}
                className="w-full h-full object-cover object-left-top scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl blur-xl transform rotate-3 scale-105"></div>

            <div className="relative bg-gray-100 overflow-hidden shadow-2xl max-w-md w-full z-10"
              style={{
                border: "1px solid #5c5c63",
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              <div className="bg-white aspect-[4/3] flex items-center justify-center">
                <Image
                  src={`/ai-page/yc-web.png`}
                  alt="Y Combinator Screenshot"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`

       .half-ring {
          position: absolute;
          left: -300px;
          top: -250px;
          width: 780px;
          height: 800px;
          border: 2px solid #2d3159;
          border-radius: 50%;
          opacity: 0.8;
          z-index: -1;
          `}
      </style>
    </div>

  );
}