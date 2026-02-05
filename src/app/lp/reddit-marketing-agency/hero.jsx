"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const ContactPopupButton = dynamic(() => import("./ContactPopupButton"), {
  loading: () => <div className="h-11 w-52 bg-gray-700 rounded animate-pulse" />,
});

// const TrustedSection = dynamic(() => import("./TrustedSection"), {
//   loading: () => <div className="h-8 w-80 bg-gray-700 rounded animate-pulse" />,
// });

const TrustedMarquee = dynamic(() => import("./TrustedMarquee"), {
  loading: () => <div className="h-32 w-full bg-gray-700/30 rounded animate-pulse" />,
});

export default function AIStartupLanding() {

    return (
        <div
            className="relative flex flex-col items-left justify-left pt-20 max-sm:pb-0"
        //   style={{ background: "#171a3d" }}

        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                    src="/reddit/redditbg.svg"
                    alt="Reddit Background"
                    fill
                    priority
                    className="object-cover object-center"
                />
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
                    {/* <div className="flex flex-row gap-4 justify-center items-center mb-6">
                        <TrustedSection />
                    </div> */}
                    <div className="flex flex-col items-center">
                        {/* Center - Book a Demo button */}
                        <div className="flex flex-col items-center">
                            <ContactPopupButton buttonText="Book a Strategy Call" width="w-52" height="h-11" textSize="text-sm" textWeight="quicksand-semibold" />
                            <p className="text-[0.75rem] px-[1rem] py-[0.75rem]">Free Reddit audit included</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full justify-center items-center flex flex-col pt-12 max-sm:pt-12 relative z-10">
                    <TrustedMarquee />
            </div>

        </div>
    );
}
