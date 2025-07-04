"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FireFly from "./svg/firefly";
import FireFly2 from "./svg/envSVG";
import DevZero from "./svg/devzero";

const WorkWith = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div
            style={{
                background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                transition: "all 0.3s ease",
            }}
        >
            <div className="max-w-6xl mx-auto text-center relative z-10 py-10 pt-4 max-sm:px-4">
                <div className="quicksand-bold text-[37px] max-sm:text-[28px] tracking-tighter leading-[80px] max-sm:leading-[35px] text-white text-center flex justify-center mb-2">
                    <h1 className="leading-[80px] max-sm:leading-[35px] text-center max-lg:text-center max-lg:mx-auto">
                        Who We Work With
                    </h1>
                </div>

                {/* Description */}
                <div className="max-w-[70%] max-sm:max-w-[90%] mx-auto mb-8">
                    <p className="font-[quicksand] text-[18px] md:text-[17px] max-sm:text-[16px] text-white leading-relaxed tracking-wide font-light">
                        Leading infrastructure platforms trust us to communicate their complex tech clearly.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center p-10 max-sm:p-4">
                <div className="w-full">
                    <div className="flex gap-10 max-sm:flex-col max-sm:gap-6 max-w-6xl w-full mx-auto">

                        {/* Firefly Card - 40% width on desktop, full width on mobile */}
                        <div
                            className="relative group w-[45%] max-sm:w-full"
                            onMouseEnter={() => setHoveredCard("firefly")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className="w-full relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "firefly"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1px solid #D8D8D833",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease, border-bottom-width 0.5s ease",
                                    height: "370px",
                                    borderBottomWidth: hoveredCard === "firefly" ? "5px" : "1.5px",
                                    borderBottomColor: hoveredCard === "firefly" ? "#5c5c63" : "#D8D8D833"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(600px circle at ${hoveredCard === "firefly" ? '100% 0%' : '120% -20%'}, 
                    rgba(139, 92, 246, ${hoveredCard === "firefly" ? '0.3' : '0'}) 0%, 
                    rgba(59, 130, 246, ${hoveredCard === "firefly" ? '0.2' : '0'}) 30%, 
                    rgba(147, 51, 234, ${hoveredCard === "firefly" ? '0.1' : '0'}) 50%, 
                    transparent 70%)`,
                                        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: hoveredCard === "firefly" ? 'scale(1)' : 'scale(0.8)',
                                        opacity: hoveredCard === "firefly" ? 1 : 0
                                    }}
                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "firefly"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                <div className="h-52 max-sm:h-40 relative overflow-hidden">
                                    {/* Background image - hidden on mobile */}
                                    <div className="absolute left-[202px] bottom-[10px] w-full h-full opacity-20 rounded-bl-2xl overflow-hidden max-sm:hidden">
                                        <Image
                                            src={`/ai-page/firefly.png`}
                                            alt="Background"
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover object-left-top scale-110 transition-all duration-300 ease-in-out hover:scale-125"
                                        />
                                    </div>

                                    {/* Main image container */}
                                    <div className="absolute top-0 left-52 right-0 bottom-4 max-sm:relative max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:top-0">
                                        <div className="h-full w-96 max-sm:w-full max-sm:h-40 rounded-bl-2xl max-sm:rounded-2xl p-4 max-sm:p-2 relative overflow-hidden" >
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-lg font-medium">
                                                <Image
                                                    src="/ai-page/firefly.png"
                                                    alt="Firefly Dashboard"
                                                    height={300}
                                                    width={338}
                                                    className="absolute inset-0 object-cover max-sm:object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 max-sm:p-4 -mt-32 max-sm:mt-0">{/* Removed negative margin on mobile */}
                                    <div className="w-16 h-16 max-sm:w-12 max-sm:h-12 p-4 max-sm:p-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                        <FireFly />
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="quicksand-bold text-xl max-sm:text-lg font-bold text-white tracking-tighter font-sans">
                                            Firefly
                                        </h2>
                                    </div>
                                    <p className="text-[15px] max-sm:text-[14px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0">
                                        A rapidly growing lac platform (raised $23M in Series A) whose customers include Cisco, ZoomInfo and Fortune 500. Firefly relies on Infrasity for strategic developer content that highlights its multi-cloud control plane.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* env0 Card - 60% width on desktop, full width on mobile */}
                        <div
                            className="relative group w-[55%] max-sm:w-full"
                        >
                            <div
                                className="w-full relative h-[370px] max-sm:h-auto max-sm:min-h-[300px] bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl max-sm:rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "env0"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1px solid #D8D8D833",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "env0"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                {/* Two column layout - Content left, Image right on desktop, stacked on mobile */}
                                <div className="flex h-80 max-sm:flex-col max-sm:h-auto">
                                    {/* Left side - Content with icon */}
                                    <div className="flex-1 p-8 max-sm:p-4 flex flex-col justify-center max-sm:justify-start">
                                        <div className="w-16 h-16 max-sm:w-12 max-sm:h-12 p-4 max-sm:p-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                            <FireFly2 />
                                        </div>
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="quicksand-bold text-xl max-sm:text-lg font-bold text-white tracking-tighter font-sans">
                                                Envo
                                            </h2>
                                        </div>
                                        <p className="text-[15px] max-sm:text-[14px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0 mr-8 max-sm:mr-0">
                                            Leading Terraform workflow automation (Series A $35M; 450% growth in 2022) used by VMware, PayPal, MGM and more. Env0 partners with Infrasity for technical blogs and whitepapers.
                                        </p>
                                    </div>

                                    {/* Right side - Image */}
                                    <div className="flex-1 flex max-sm:mt-4 max-sm:relative">
                                        {/* Background image - hidden on mobile */}
                                        <div className="absolute top-32 left-80 right-0 bottom-0 max-sm:hidden">
                                            <div className="absolute right-3 top-4 w-full h-full opacity-20 rounded-tl-2xl overflow-hidden">
                                                <Image
                                                    src={`/ai-page/firefly.png`}
                                                    alt="Background"
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full object-cover object-left-top scale-110"
                                                />
                                            </div>
                                            <div className="h-[400px] rounded-tl-2xl p-4 relative overflow-hidden" >
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-lg font-medium">
                                                    <Image
                                                        src="/ai-page/env0.png"
                                                        alt="Env0 Dashboard"
                                                        height={800}
                                                        width={600}
                                                        className="absolute inset-0 object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile image container */}
                                        <div className="hidden max-sm:block absolute inset-0 p-4">
                                            <div
                                                className="h-full w-full rounded-2xl p-2 relative overflow-hidden"
                                                style={{
                                                    border: "1px solid #5c5c63",
                                                }}
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Image
                                                        src="/ai-page/env0.png"
                                                        alt="Env0 Dashboard"
                                                        height={800}
                                                        width={600}
                                                        className="absolute inset-0 object-cover max-sm:object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Part 2 */}
            <div className="flex items-center justify-center px-10 max-sm:px-4">
                <div className="w-full">
                    <div className="flex gap-10 max-sm:flex-col max-sm:gap-6 max-w-6xl w-full mx-auto mb-8">

                        {/* spacelift Card */}
                        <div
                            className="relative group w-[55%] max-sm:w-full"
                        >
                            <div
                                className="w-full h-[540px] max-sm:h-auto max-sm:min-h-[400px] relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl max-sm:rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1px solid #D8D8D833",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"

                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "firefly"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                <div className="p-6 max-sm:p-4">
                                    <div className="w-16 h-16 max-sm:w-12 max-sm:h-12 pt-3 max-sm:pt-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                        <Image
                                            height={400}
                                            width={400}
                                            src="/ai-page/spacelift-logo.png"
                                            alt="spacelift logo"
                                            className="w-28 h-8 max-sm:w-20 max-sm:h-6"
                                        />
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="quicksand-bold text-xl max-sm:text-lg font-bold text-white tracking-tighter font-sans">
                                            Spacelift
                                        </h2>
                                    </div>
                                    <p className="text-[15px] max-sm:text-[14px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0">
                                        Infrastructure-as-Code platform (Series B $15M, backed by Insight Partners) for Terraform and Pulumi. Our collaboration has included detailed release notes and tutorials.
                                    </p>
                                </div>
                                <div className="h-full max-sm:h-auto relative overflow-hidden">
                                    {/* Background image with white overlay - hidden on mobile */}
                                    <div className="absolute w-full h-full opacity-50 mt-6 ml-14 rounded-bl-[100px] overflow-hidden max-sm:hidden">
                                        {/* White overlay */}
                                        <div className="w-[500px] rounded-3xl absolute inset-0 bg-white opacity-20 z-10"></div>
                                        {/* Background Image */}
                                        <Image
                                            src="/ai-page/spacelift.png"
                                            alt="Background"
                                            height={500}
                                            width={500}
                                            className="object-cover rounded-3xl brightness-1 z-0"
                                        />
                                    </div>

                                    {/* Main image container */}
                                    <div className="h-full bottom-0 max-sm:h-auto max-sm:relative">
                                        <div className="rounded-bl-2xl p-4 h-full max-sm:h-auto max-sm:p-2 max-sm:rounded-2xl relative overflow-hidden">
                                            <div className="flex items-center justify-center bottom-0 mt-6 max-sm:mt-4 text-slate-600 text-lg font-medium">
                                                <Image
                                                    src="/ai-page/spacelift.png"
                                                    alt="Spacelift Dashboard"
                                                    height={500}
                                                    width={550}
                                                    className="object-cover rounded-3xl max-sm:rounded-2xl max-sm:object-contain max-sm:w-full max-sm:h-48"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* devzero Card */}
                        <div
                            className="relative group w-[45%] max-sm:w-full"
                        >
                            <div
                                className="w-full relative h-[540px] max-sm:h-auto max-sm:min-h-[400px] bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl max-sm:rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "DevZero"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1px solid #D8D8D833",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div className="absolute inset-0 pointer-events-none" />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "env0"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                <div className="h-80 max-sm:h-48 relative overflow-hidden">
                                    {/* Background image with white overlay - hidden on mobile */}
                                    <div className="absolute left-[168px] bottom-[6px] w-full h-full opacity-80 rounded-bl-2xl overflow-hidden max-sm:hidden">
                                        <div className="w-[500px] rounded-bl-3xl absolute inset-0 bg-white opacity-20 z-10"></div>
                                        <Image
                                            src="/ai-page/devzero1.png"
                                            alt="Background"
                                            height={500}
                                            width={738}
                                            className="w-[700px] h-full absolute inset-0 object-cover object-left"
                                        />
                                    </div>

                                    {/* Main image container */}
                                    <div className="absolute top-0 left-[178px] right-0 bottom-4 max-sm:relative max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:top-0">
                                        <div className="h-full w-96 max-sm:w-full max-sm:h-48 rounded-bl-3xl max-sm:rounded-2xl p-4 max-sm:p-2 relative overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-lg font-medium">
                                                <Image
                                                    src="/ai-page/devzero1.png"
                                                    alt="DevZero Dashboard"
                                                    height={500}
                                                    width={738}
                                                    className="w-[700px] max-sm:w-full h-full absolute inset-0 object-cover max-sm:object-contain object-left"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 p-8 max-sm:p-4 flex flex-col justify-center -mt-10 max-sm:mt-0">{/* Removed negative margin on mobile */}
                                    <div className="w-16 h-16 max-sm:w-12 max-sm:h-12 py-4 max-sm:py-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                        <DevZero />
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="quicksand-bold text-xl max-sm:text-lg font-bold text-white tracking-tighter font-sans">
                                            DevZero
                                        </h2>
                                    </div>
                                    <p className="text-[15px] max-sm:text-[14px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0 mr-8 max-sm:mr-0">
                                        Cloud IDE startup (raised $26M seed+Series A) founded by ex-Uber engineers. Infrasity supports DevZero with crisp one-pagers and use-case guides.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-10 max-sm:p-4">
                <div className="w-full">
                    <div className="flex gap-10 max-sm:flex-col max-sm:gap-6 max-w-6xl w-full mx-auto">

                        {/* Firefly Card - 40% width on desktop, full width on mobile */}
                        <div
                            className="relative group w-[45%] max-sm:w-full"
                            onMouseEnter={() => setHoveredCard("firefly")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className="w-full relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: "linear-gradient(to top right, #020207 50%,#464cc0 100%)",
                                    border: "1px solid #D8D8D833",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease, border-bottom-width 0.5s ease",
                                    height: "370px",
                                    borderBottomWidth: "1.5px",
                                    borderBottomColor: "#D8D8D833"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "firefly"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>
                                <div className="p-8 max-sm:p-4 max-sm:mt-0">{/* Removed negative margin on mobile */}
                                    <div className="w-16 h-16 max-sm:w-12 max-sm:h-12 p-4 max-sm:p-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                        <FireFly />
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="quicksand-bold text-xl max-sm:text-lg font-bold text-white tracking-tighter font-sans">
                                            Firefly
                                        </h2>
                                    </div>
                                    <p className="text-[15px] max-sm:text-[14px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0">
                                        A rapidly growing lac platform (raised $23M in Series A) whose customers include Cisco, ZoomInfo and Fortune 500. Firefly relies on Infrasity for strategic developer content that highlights its multi-cloud control plane.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WorkWith;