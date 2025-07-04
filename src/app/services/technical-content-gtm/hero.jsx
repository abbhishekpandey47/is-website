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

      <div className="w-[93%] max-w-6xl mx-auto text-center relative z-10">
        <div className="quicksand-bold text-[4em] max-sm:text-[4em] tracking-wide leading-[80px] text-white text-center flex justify-center mb-16">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            <span className="text-[#6b5be7]"> Infrasity </span> - Technical Content & GTM Experts for Infrastructure <br /> Platforms
          </h1>
        </div>

        {/* Description */}
        <div className="w-[89%] mx-auto mb-14">
          <p className="text-[20.5px] text-[#f5deb3] tracking-wide leading-relaxed font-light">
            Infrasity creates deep, developer-focused content that educates engineers and drives growth. We're the content and GTM partner trusted by leading infrastructure innovators - from Firefly and Envo to Spacelift and DevZero- to tell their product story in clear, technical terms.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-5">
          <CalendarBooking />
        </div>
      </div>

    </div>
  );
}
