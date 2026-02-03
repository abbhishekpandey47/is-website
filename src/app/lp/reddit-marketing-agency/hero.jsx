"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const ContactPopupButton = dynamic(() => import("./ContactPopupButton"), {
  loading: () => <div className="h-11 w-52 bg-gray-700 rounded animate-pulse" />,
});

const TrustedSection = dynamic(() => import("./TrustedSection"), {
  loading: () => <div className="h-8 w-80 bg-gray-700 rounded animate-pulse" />,
});

const TrustedMarquee = dynamic(() => import("./TrustedMarquee"), {
  loading: () => <div className="h-32 w-full bg-gray-700/30 rounded animate-pulse" />,
});

export default function AIStartupLanding() {
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
            className="relative flex flex-col items-left justify-left px-6 pt-20 max-sm:pb-0"
        //   style={{ background: "#171a3d" }}

        >
            <div className="inset-0 z-0">
                <BackgroundSVG />
            </div>

            {/* Content */}
            <div className="max-w-[85%] max-sm:max-w-[95%] mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[4.5em] max-md:text-[3.2em] max-sm:text-[2.4em] leading-[80px] max-md:leading-[60px] max-sm:leading-[45px] text-white text-center mb-12 max-sm:mb-6">                    <h1 className="leading-[80px] max-md:leading-[60px] max-sm:leading-[45px] text-center max-lg:text-center max-lg:mx-auto tracking-normal">
                    <span className="text-[#ff4500]">Reddit </span>Marketing Agency for<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600"> AI Agents <span className="text-white">&</span> SaaS Startups </span>
                </h1>
                </div>

                {/* Description */}
                <div className="max-w-[85%] max-sm:max-w-[95%] mx-auto mb-10 max-sm:mb-6">
                    <p className="text-[24px] md:text-[24px] max-sm:text-[18px] text-[#f5deb3] leading-snug font-light tracking-normal">
                        Most startups get flagged or ignored on Reddit. We help you show up where your ICP hangs out like r/devops, r/nocode, and r/platform_engineering  with LLM-friendly comments, karma-rich accounts, and stealth thread strategies.
                    </p>
                </div>

                <div className="justify-center items-center">

<div className="flex flex-row gap-4 justify-center items-center mb-6">
                        <TrustedSection />
                    </div>
                    <div className="flex flex-col items-center">
                        {/* Center - Book a Demo button */}
                        <div className="flex flex-col items-center">
                            <ContactPopupButton buttonText="Book a Strategy Call" width="w-52" height="h-11" textSize="text-sm" textWeight="quicksand-semibold" />
                            <p className="text-[0.75rem] px-[1rem] py-[0.75rem]">Free Reddit audit included</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: Image positioned on the right */}
            {/* <div className=" absolute right-0 bottom-0 mb-[270px] max-sm:hidden">
                <Image
                    width={600}
                    height={200}
                    className="w-[28rem] h-auto border-l-[1.5px] border-t-[1.5px] border-b-[1.5px] border-[#373737] rounded-l-2xl"
                    loading="lazy"
                    priority={false}
                    src="/reddit/hero.png"
                    alt="Hero Image"
                />
            </div> */}

            <div className="w-full justify-center items-center flex flex-col pt-16 max-sm:pt-12">
                <TrustedMarquee />
            </div>

        </div>
    );
}
