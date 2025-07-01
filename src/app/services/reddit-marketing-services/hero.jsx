"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import CalendarBooking from "../../calendarButton";
import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import TrustedBySection from "./marquee";


const fileList = [
    { name: "hyperwise.svg", hasBackground: false },
    { name: "eclipse.svg", hasBackground: true },
    { name: "together.svg", hasBackground: false },
    { name: "susaventures.png", hasBackground: true },
    { name: "firestreak.png", hasBackground: true },
    { name: "yc.avif", hasBackground: false },
    { name: "khosala.avif", hasBackground: false }
];

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
                    <span className="text-[#ff4500]">Reddit </span>Marketing Agency for<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600"> AI Agents <span className="text-white">&</span> SaaS Startups </span>
                </h1>
                </div>

                {/* Description */}
                <div className="max-w-[85%] max-sm:max-w-[95%] mx-auto mb-14 max-sm:mb-8">
                    <p className="text-[24px] md:text-[24px] max-sm:text-[18px] text-[#f5deb3] leading-snug font-light tracking-normal">
                        Most startups get flagged or ignored on Reddit. We help you show up where your ICP hangs out like r/devops, r/nocode, and r/platform_engineering  with LLM-friendly comments, karma-rich accounts, and stealth thread strategies.
                    </p>
                </div>

                <div className="lg:mb-28 justify-center items-center">
                    <div className="hidden max-sm:flex flex-col items-center gap-6">
                        <CalendarBooking />
                        <div className="w-full flex justify-center">
                            <Image
                                width={600}
                                height={200}
                                className="w-[320px] h-auto border-[1.5px] border-[#373737] rounded-2xl"
                                loading="lazy"
                                priority={false}
                                src="/reddit/hero.png"
                                alt="Hero Image"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 justify-center items-center">
                        <div className="hidden md:block">
                            <CalendarBooking />
                        </div>
                        <TrustedBySection />
                    </div>


                </div>
            </div>

            {/* Desktop: Image positioned on the right */}
            <div className=" absolute right-0 bottom-0 mb-[200px] max-sm:hidden">
                <Image
                    width={600}
                    height={200}
                    className="w-[28rem] h-auto border-l-[1.5px] border-t-[1.5px] border-b-[1.5px] border-[#373737] rounded-l-2xl"
                    loading="lazy"
                    priority={false}
                    src="/reddit/hero.png"
                    alt="Hero Image"
                />
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
                                                logoFile === 'amnic.png'
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

            <style jsx>{`
                .half-ring {
                    position: absolute;
                    left: -18.75rem;
                    top: -15.625rem;
                    width: 48.75rem;
                    height: 50rem;
                    border: 2px solid #2d3159;
                    border-radius: 50%;
                    opacity: 0.8;
                    z-index: -1;
                }

                .animated-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #2c3077;
                    overflow: hidden;
                }

                .floating-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(3.75rem);
                    opacity: 0.8;
                    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }

                .orb-1 {
                    width: 43.75rem;
                    height: 43.75rem;
                    background: radial-gradient(circle, #080915 0%, #080915 40%, transparent 70%);
                    top: -21.875rem;
                    left: -21.875rem;
                    animation: float1 28s infinite ease-in-out;
                }

                .orb-2 {
                    width: 43.75rem;
                    height: 43.75rem;
                    background: radial-gradient(circle, #080915 0%, #080915 35%, transparent 65%);
                    top: 30%;
                    right: -21.875rem;
                    animation: float2 35s infinite ease-in-out reverse;
                }

                .orb-3 {
                    width: 34.375rem;
                    height: 34.375rem;
                    background: radial-gradient(circle, #080915 0%, #080915 30%, transparent 60%);
                    bottom: -17.1875rem;
                    left: 25%;
                    animation: float3 42s infinite ease-in-out;
                }

                .orb-4 {
                    width: 50rem;
                    height: 50rem;
                    background: radial-gradient(circle, #080915 0%, #080915 45%, transparent 75%);
                    top: 10%;
                    left: 50%;
                    animation: float4 50s infinite ease-in-out reverse;
                }

                .wave-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(
                        ellipse at 30% 40%,
                        rgba(8, 9, 21, 0.3) 0%,
                        transparent 60%
                    );
                    animation: waveShift 30s infinite ease-in-out;
                }

                .pulse-layer {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 120%;
                    height: 120%;
                    border-radius: 50%;
                    background: radial-gradient(
                        circle,
                        rgba(8, 9, 21, 0.2) 0%,
                        transparent 70%
                    );
                    animation: pulse 20s infinite ease-in-out;
                }

                .gradient-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(
                        ellipse at 70% 60%,
                        rgba(8, 9, 21, 0.25) 0%,
                        transparent 70%
                    );
                    animation: gradientRotate 45s infinite ease-in-out reverse;
                }

                .transition-orb {
                    position: absolute;
                    width: 28.125rem;
                    height: 28.125rem;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(8, 9, 21, 0.6) 0%, transparent 70%);
                    filter: blur(3.125rem);
                    opacity: 0;
                    animation: fadeInOut 22s infinite ease-in-out;
                }

                .transition-orb:nth-child(8) {
                    top: 15%;
                    left: 15%;
                    animation-delay: -11s;
                }

                .transition-orb:nth-child(9) {
                    bottom: 15%;
                    right: 15%;
                    animation-delay: -5.5s;
                }

                @media (max-width: 640px) {
                    .orb-1 {
                        width: 25rem;
                        height: 25rem;
                        top: -12.5rem;
                        left: -12.5rem;
                        filter: blur(2rem);
                    }

                    .orb-2 {
                        width: 25rem;
                        height: 25rem;
                        right: -12.5rem;
                        filter: blur(2rem);
                    }

                    .orb-3 {
                        width: 20rem;
                        height: 20rem;
                        bottom: -10rem;
                        filter: blur(2rem);
                    }

                    .orb-4 {
                        width: 30rem;
                        height: 30rem;
                        filter: blur(2rem);
                    }

                    .transition-orb {
                        width: 18rem;
                        height: 18rem;
                        filter: blur(2rem);
                    }
                }

                @keyframes float1 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(25rem, 15.625rem) scale(1.1);
                    }
                    50% {
                        transform: translate(43.75rem, 9.375rem) scale(0.9);
                    }
                    75% {
                        transform: translate(18.75rem, 31.25rem) scale(1.05);
                    }
                }

                @keyframes float2 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    20% {
                        transform: translate(-21.875rem, -12.5rem) scale(1.2);
                    }
                    40% {
                        transform: translate(-31.25rem, 9.375rem) scale(0.8);
                    }
                    60% {
                        transform: translate(-15.625rem, 21.875rem) scale(1.1);
                    }
                    80% {
                        transform: translate(-9.375rem, -15.625rem) scale(0.95);
                    }
                }

                @keyframes float3 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    30% {
                        transform: translate(18.75rem, -25rem) scale(1.15);
                    }
                    60% {
                        transform: translate(-12.5rem, -18.75rem) scale(0.85);
                    }
                    90% {
                        transform: translate(9.375rem, -9.375rem) scale(1.05);
                    }
                }

                @keyframes float4 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(-25rem, 12.5rem) scale(0.9);
                    }
                    50% {
                        transform: translate(-12.5rem, -18.75rem) scale(1.2);
                    }
                    75% {
                        transform: translate(18.75rem, 9.375rem) scale(0.95);
                    }
                }

                @keyframes waveShift {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0%);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.3);
                        opacity: 0.05;
                    }
                }

                @keyframes gradientRotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(1.4);
                    }
                }
            `}</style>
        </div>
    );
}