"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FireFly from "./svg/firefly";
import FireFly2 from "./svg/envSVG";



const WorkWith = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div
            style={{
                background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                transition: "all 0.3s ease",
            }}
        >
            <div className="max-w-6xl mx-auto text-center relative z-10 py-10 pt-4">
                <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
                    <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
                        Who We Work With
                    </h1>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Leading infrastructure platforms trust us to communicate their complex tech clearly.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center p-10">
                <div className="w-full">
                    <div className="flex gap-10 max-w-6xl w-full mx-auto mb-8">

                        {/* Kubiya Card - 40% width */}
                        <div
                            className="relative group w-[45%]"
                            onMouseEnter={() => setHoveredCard("firefly")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className="w-full h-[370px] relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "firefly"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1.5px solid #2f2f37",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
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

                                <div className="h-52 relative overflow-hidden">
                                    <div className="absolute left-[202px] bottom-[10px] w-full h-full opacity-20 rounded-bl-2xl overflow-hidden">
                                        <Image
                                            src={`/ai-page/firefly.png`}
                                            alt="Background"
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover object-left-top scale-110"
                                        />
                                    </div>
                                    <div className="absolute top-0 left-52 right-0 bottom-4">
                                        <div
                                            className="bg-white/95 rounded-bl-2xl p-4 h-full relative overflow-hidden"
                                            style={{
                                                border: "1px solid #5c5c63",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium">
                                                <Image
                                                    src="/ai-page/firefly.png"
                                                    alt="Kubiya Dashboard"
                                                    height={300}
                                                    width={300}
                                                    className="absolute inset-0 object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 -mt-32">
                                    <div className="w-16 h-16 p-4 rounded-lg bg-[#1e2252] mb-6">
                                        <FireFly />
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="quicksand-bold text-xl font-bold text-white tracking-tighter font-sans">
                                            Firefly
                                        </h2>

                                    </div>
                                    <p className="text-[15px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0">
                                        A rapidly growing lac platform (raised $23M in Series A) whose customers include Cisco, ZoomInfo and Fortune 500. Firefly relies on Infrasity for strategic developer content that highlights its multi-cloud control plane.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* env0 Card - 60% width */}
                        <div
                            className="relative group w-[55%]"
                            onMouseEnter={() => setHoveredCard("env0")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className="w-full relative h-[370px] bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "env0"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1.5px solid #2f2f37",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(600px circle at ${hoveredCard === "env0" ? '100% 0%' : '120% -20%'}, 
                                            rgba(139, 92, 246, ${hoveredCard === "env0" ? '0.3' : '0'}) 0%, 
                                            rgba(59, 130, 246, ${hoveredCard === "env0" ? '0.2' : '0'}) 30%, 
                                            rgba(147, 51, 234, ${hoveredCard === "env0" ? '0.1' : '0'}) 50%, 
                                            transparent 70%)`,
                                        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: hoveredCard === "env0" ? 'scale(1)' : 'scale(0.8)',
                                        opacity: hoveredCard === "env0" ? 1 : 0
                                    }}
                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "env0"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                {/* Two column layout - Content left, Image right */}
                                <div className="flex h-80">


                                    {/* Left side - Content with icon */}
                                    <div className="flex-1 p-8 flex flex-col justify-center">
                                        <div className="w-16 h-16 p-4 rounded-lg bg-[#1e2252] mb-6">

                                            <FireFly2 />
                                        </div>
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="quicksand-bold text-xl font-bold text-white tracking-tighter font-sans">
                                                Envo
                                            </h2>
                                        </div>
                                        <p className="text-[15px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0 mr-8">
                                            Leading Terraform workflow automation (Series A $35M; 450% growth in 2022) used by VMware, PayPal, MGM and more. Env0 partners with Infrasity for technical blogs and whitepapers.
                                        </p>
                                    </div>

                                    {/* Right side - Image */}
                                    <div className="flex-1 flex">
                                        <div className="absolute top-32 left-80 right-0 bottom-0">
                                            <div className="absolute right-3 top-4 w-full h-full opacity-20 rounded-tl-2xl overflow-hidden">
                                                <Image
                                                    src={`/ai-page/firefly.png`}
                                                    alt="Background"
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full object-cover object-left-top scale-110"
                                                />
                                            </div>
                                            <div
                                                className="h-[400px] rounded-tl-2xl p-4 relative overflow-hidden"
                                                style={{
                                                    border: "1px solid #5c5c63",
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center text-slate-600 text-lg font-medium">
                                                    <Image
                                                        src="/ai-page/env0.png"
                                                        alt="Kubiya Dashboard"
                                                        height={800}
                                                        width={600}
                                                        className="absolute inset-0 object-cover"
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

            <div className="flex items-center justify-center p-10">
                <div className="w-full">
                    <div className="flex gap-10 max-w-6xl w-full mx-auto mb-8">

                        {/* Kubiya Card - 40% width */}
                        <div
                            className="relative group w-[45%]"
                            onMouseEnter={() => setHoveredCard("spacelift")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className="w-full h-[370px] relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "spacelift"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1.5px solid #2f2f37",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(600px circle at ${hoveredCard === "spacelift" ? '100% 0%' : '120% -20%'}, 
                                            rgba(139, 92, 246, ${hoveredCard === "spacelift" ? '0.3' : '0'}) 0%, 
                                            rgba(59, 130, 246, ${hoveredCard === "spacelift" ? '0.2' : '0'}) 30%, 
                                            rgba(147, 51, 234, ${hoveredCard === "spacelift" ? '0.1' : '0'}) 50%, 
                                            transparent 70%)`,
                                        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: hoveredCard === "spacelift" ? 'scale(1)' : 'scale(0.8)',
                                        opacity: hoveredCard === "spacelift" ? 1 : 0
                                    }}
                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "firefly"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                <div className="h-52 relative overflow-hidden">
                                    <div className="absolute left-[202px] bottom-[10px] w-full h-full opacity-20 rounded-bl-2xl overflow-hidden">
                                        <Image
                                            src={`/ai-page/firefly.png`}
                                            alt="Background"
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover object-left-top scale-110"
                                        />
                                    </div>
                                    <div className="absolute top-0 left-52 right-0 bottom-4">
                                        <div
                                            className="bg-white/95 rounded-bl-2xl p-4 h-full relative overflow-hidden"
                                            style={{
                                                border: "1px solid #5c5c63",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium">
                                                <Image
                                                    src="/ai-page/firefly.png"
                                                    alt="Kubiya Dashboard"
                                                    height={300}
                                                    width={300}
                                                    className="absolute inset-0 object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 -mt-32">
                                    <div className="w-16 h-16 p-4 rounded-lg bg-[#1e2252] mb-6">
                                        <FireFly />
                                    </div>
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="quicksand-bold text-xl font-bold text-white tracking-tighter font-sans">
                                            Spacelift
                                        </h2>

                                    </div>
                                    <p className="text-[15px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0">
                                        Infrastructure-as-Code platform (Series B $15M, backed by Insight Partners) for Terraform and Pulumi. Our collaboration has included detailed release notes and tutorials.                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* env0 Card - 60% width */}
                        <div
                            className="relative group w-[55%]"
                            onMouseEnter={() => setHoveredCard("DevZero")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className="w-full relative h-[370px] bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                style={{
                                    background: hoveredCard === "DevZero"
                                        ? "#2c3077"
                                        : "linear-gradient(to top right, #020207 40%,#464cc0 90%)",
                                    border: "1.5px solid #2f2f37",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "background 0.6s ease"
                                }}
                            >
                                {/* Glowy gradient overlay animation */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(600px circle at ${hoveredCard === "DevZero" ? '100% 0%' : '120% -20%'}, 
                                            rgba(139, 92, 246, ${hoveredCard === "DevZero" ? '0.3' : '0'}) 0%, 
                                            rgba(59, 130, 246, ${hoveredCard === "DevZero" ? '0.2' : '0'}) 30%, 
                                            rgba(147, 51, 234, ${hoveredCard === "DevZero" ? '0.1' : '0'}) 50%, 
                                            transparent 70%)`,
                                        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: hoveredCard === "DevZero" ? 'scale(1)' : 'scale(0.8)',
                                        opacity: hoveredCard === "DevZero" ? 1 : 0
                                    }}
                                />
                                <div
                                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "env0"
                                        ? "scale-[3] opacity-60"
                                        : "scale-100 opacity-30"
                                        }`}
                                ></div>

                                {/* Two column layout - Content left, Image right */}
                                <div className="flex h-80">


                                    {/* Left side - Content with icon */}
                                    <div className="flex-1 p-8 flex flex-col justify-center">
                                        <div className="w-16 h-16 p-4 rounded-lg bg-[#1e2252] mb-6">

                                            <FireFly2 />
                                        </div>
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="quicksand-bold text-xl font-bold text-white tracking-tighter font-sans">
                                                DevZero
                                            </h2>
                                        </div>
                                        <p className="text-[15px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0 mr-8">
                                            Cloud IDE startup (raised $26M seed+Series A) founded by ex-Uber engineers. Infrasity supports DevZero with crisp one-pagers and use-case guides.                                        </p>
                                    </div>

                                    {/* Right side - Image */}
                                    <div className="flex-1 flex">
                                        <div className="absolute top-32 left-80 right-0 bottom-0">
                                            <div className="absolute right-3 top-4 w-full h-full opacity-20 rounded-tl-2xl overflow-hidden">
                                                <Image
                                                    src={`/ai-page/firefly.png`}
                                                    alt="Background"
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full object-cover object-left-top scale-110"
                                                />
                                            </div>
                                            <div
                                                className="h-[400px] rounded-tl-2xl p-4 relative overflow-hidden"
                                                style={{
                                                    border: "1px solid #5c5c63",
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center text-slate-600 text-lg font-medium">
                                                    <Image
                                                        src="/ai-page/env0.png"
                                                        alt="Kubiya Dashboard"
                                                        height={800}
                                                        width={600}
                                                        className="absolute inset-0 object-cover"
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

        </div>
    );
};

export default WorkWith;