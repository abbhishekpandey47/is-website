"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import CalendarBooking from "../../calendarButton";
import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import TrustedBySection from "./marquee";

const logoFiles = [
    "aviator.png",
    "mocha.png",
    "cedana.png",
    "dhiwise.png",
    "amnic.png",
    "mvp-grow.png",
    "cerbos.png",
    "qodo-logo.png",
    "Codegiant.png",
    "Scalekit-logo.png",
    "cycloid.png",
    "scalr.png",
    "daytona.png",
    "stackOne.png",
    "DevZero.png",
    "terrateam.png",
    "env0-infra-1.png",
    "tracetest.png",
    "firefly.png",
    "TravisCI-Full-Color.png",
    "firstock-logo.png",
    "vapi-logo.png",
    "kapstan.png",
    "Zenml.png",
    "Kubiya.png",
    "lovable-logo.png",
    "Meteor-ops.png",
    "middleware-logo.png",
];

export default function AIStartupLanding() {
    const memoizedLogos = useMemo(() => logoFiles, []);
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
            className="relative flex flex-col items-left justify-left px-6 pt-40 max-sm:pb-0"
        //   style={{ background: "#171a3d" }}

        >
            <div className="inset-0 z-0">
                <BackgroundSVG />
            </div>

            {/* Content */}
            <div className="max-w-[85%] max-sm:max-w-[95%] mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[4.5em] max-md:text-[3.2em] max-sm:text-[2.4em] leading-[80px] max-md:leading-[60px] max-sm:leading-[45px] text-white text-center mb-16 max-sm:mb-8">                    <h1 className="leading-[80px] max-md:leading-[60px] max-sm:leading-[45px] text-center max-lg:text-center max-lg:mx-auto tracking-normal">
                    Content That Compounds.<br />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    >
                        GTM That Moves Metrics.
                    </span>
                </h1>
                </div>

                {/* Description */}
                <div className="max-w-full max-sm:max-w-[95%] mx-auto mb-14 max-sm:mb-8">
                    <p className="text-[24px] md:text-[24px] max-sm:text-[18px] text-[#f5deb3] leading-snug font-light tracking-normal">
                        From Seed to Series B, Infrasity partners with VC-backed startups to produce high-leverage, <br />engineering-first content that educates users, drives traffic,<br />
                        and accelerates time-to-market.
                    </p>
                </div>

                <div className="lg:mb-20 justify-center items-center">
                    <div className="hidden max-sm:flex flex-col items-center gap-6">
                        <CalendarBooking />
                    </div>

                    <div className="flex flex-row gap-4 justify-center items-center">
                        <div className="hidden md:block">
                            <CalendarBooking />
                        </div>
                    </div>


                </div>
            </div>

            <div className="w-full justify-center items-center flex flex-col pt-20 max-sm:pt-16">
                <div
                    className="w-[100%] pt-10 pb-1 max-sm:pt-6"
                    style={{
                        backgroundColor: "#171a3d",
                        backgroundImage: `radial-gradient(circle at top right, #090d1a 0%, transparent 30%)`,
                        border: "1.5px solid rgba(45, 51, 71, 1)",
                        borderRadius: "16px",
                        zIndex: 0,
                    }}
                >
                    <h2 className="text-center pb-1 text-white quicksand-bold text-2xl max-sm:text-xl max-sm:px-4">
                        Trusted by Builders at Innovative AI Startups
                    </h2>
                    <Marquee
                        className="motion-reduce:overflow-auto"
                        innerClassName="motion-reduce:animate-none"
                    >
                        <div className="flex gap-20 max-sm:gap-10 items-center mx-4">
                            {memoizedLogos.map((logoFile, idx) => {
                                return (
                                    <div key={idx} className="mix-blend-color-burn">
                                        <Image
                                            loading="lazy"
                                            width={100}
                                            height={40}
                                            className={
                                                logoFile.includes('amnic') || logoFile.includes('special-height')
                                                    ? "w-35 h-10 max-sm:w-30 max-sm:h-8 my-8 max-sm:my-6 object-contain"
                                                    : "w-35 max-sm:w-30 my-8 max-sm:my-6"
                                            }
                                            src={`/trustedby-bw/bw/${logoFile}`}
                                            alt="Company Logo"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Marquee>
                </div>
            </div>
        </div>
    );
}