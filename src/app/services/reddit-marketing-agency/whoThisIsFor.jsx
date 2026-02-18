import Image from 'next/image';
import React from 'react';

const StartupHeroSection = () => {
    return (
        <div className=" text-white p-[2rem] md:px-[5rem] flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full">
                <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 md:gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        <div className="max-w-6xl text-left relative z-10">
                            <div className="quicksand-bold text-[30px] tracking-tighter md:leading-[80px] text-white text-left flex justify-left mb-2">
                                <h2 className="leading-[80px] max-sm:leading-[69px] text-left max-lg:mx-auto">
                                    Who This Is For
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="mx-auto mb-8">
                                <p className="font-[quicksand] text-[18px] md:text-[18px] text-white tracking-wide leading-relaxed font-[320]">
                                    We work with early to growth-stage B2B companies whose buyers research before they buy.
                                    If your product is discovered through community discussions, comparisons, and peer recommendations, this is built for you.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {[
                                "AI and LLM platforms",
                                "DevTools and infrastructure products",
                                "Technical B2B SaaS (developer, engineering, or ops-focused)",
                                "Workflow, automation, and productivity platforms",
                                "Customer support, messaging, and operational tools",
                                "Seed to Series B+ teams building awareness or strengthening category credibility",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg
                                            className="w-9 h-9"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.5 13.8H10.1299C8.72143 13.8 8.01721 13.8 7.72228 13.3385C7.42735 12.8769 7.72321 12.2379 8.31493 10.9597L11.0463 5.06006C11.4205 4.25182 11.6075 3.8477 11.8038 3.89091C12 3.93413 12 4.37946 12 5.27013V9.7C12 9.9357 12 10.0536 12.0732 10.1268C12.1464 10.2 12.2643 10.2 12.5 10.2H13.8701C15.2786 10.2 15.9828 10.2 16.2777 10.6615C16.5726 11.1231 16.2768 11.7621 15.6851 13.0402L12.9537 18.9399C12.5795 19.7482 12.3925 20.1523 12.1962 20.1091C12 20.0659 12 19.6205 12 18.7299V14.3C12 14.0643 12 13.9464 11.9268 13.8732C11.8536 13.8 11.7357 13.8 11.5 13.8Z"
                                                fill="#6b5be7"
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-[quicksand] font-bold text-[18px] md:text-[18px] text-white tracking-wide leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="rounded-lg flex items-center justify-center">
                            <img
                                src="/reddit/whothisisfor.png"
                                alt="Who this is for Image"
                                className="w-[287px] h-[422px] lg:w-[487px] lg:h-[622px] object-cover"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default StartupHeroSection;