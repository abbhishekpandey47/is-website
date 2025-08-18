"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// SVG Imports (you'll update actual files later)
import TechnicalBlogsIcon from "./svg/technicalBlogs";
import WhitepaperIcon from "./svg/whitepaper";
import OnePagerIcon from "./svg/onePager";
import ReleaseNotesIcon from "./svg/releaseNotes";
import CLIDocsIcon from "./svg/cliDocs";
import UseCaseIcon from "./svg/useCase";

const WhatWeCreate = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const cardData = [
        {
            id: "1",
            title: "Technical Blogs",
            description:
                "In-depth posts (tutorials, deep dives, feature explainers) written by engineers, showcasing your product’s architecture and use-cases in detail.",
            icon: <TechnicalBlogsIcon />,
        },
        {
            id: "2",
            title: "White paper & eBooks",
            description:
                "Comprehensive resources that analyze industry problems or best practices, positioning your company as a thought leader.",
            icon: <WhitepaperIcon />,
        },
        {
            id: "3",
            title: "One-Pagers",
            description:
                "Concise overview documents and cheatsheets highlighting core features or solutions – perfect for sales decks and quick reference.",
            icon: <OnePagerIcon />,
        },
        {
            id: "4",
            title: "Release Notes",
            description:
                "Clear, informative changelogs and upgrade guides that help users understand new features, fixes and improvements.",
            icon: <ReleaseNotesIcon />,
        },
        {
            id: "5",
            title: "CLI Documentation",
            description:
                "Accurate, example-driven manuals and tutorials for command-line tools and APIs, written by specialists familiar with your tech stack.",
            icon: <CLIDocsIcon />,
        },
        {
            id: "6",
            title: "Use Case Guides & Playbooks",
            description:
                "Concise overview documents and cheatsheets highlighting core features or solutions – perfect for sales decks and quick reference.",
            icon: <UseCaseIcon />,
        },
    ];

    return (
        <div>
            <div className="max-w-6xl mx-auto text-center relative z-10 py-10 pt-14 max-sm:px-4">
                <div className="quicksand-bold text-[37px] max-sm:text-[28px] tracking-tighter leading-[80px] max-sm:leading-[35px] text-white text-center flex justify-center mb-2">
                    <h1 className="leading-[80px] max-sm:leading-[35px] text-center max-lg:text-center max-lg:mx-auto">
                        What We Create
                    </h1>
                </div>

                <div className="max-w-[70%] max-sm:max-w-[90%] mx-auto mb-8">
                    <p className="font-[quicksand] text-[18px] md:text-[17px] max-sm:text-[16px] text-white leading-relaxed tracking-wide font-light">
                        End-to-end content solutions crafted by engineers for engineers.                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center p-0 max-sm:p-4">
                <div className="w-full">
                    <div className="grid grid-cols-3 gap-10 max-sm:grid-cols-1 max-sm:gap-6 max-w-6xl w-full mx-auto">
                        {cardData.map((card) => (
                            <div
                                key={card.id}
                                className="relative group w-full"
                                onMouseEnter={() => setHoveredCard(card.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div
                                    className="w-full relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                                    style={{
                                        background:
                                            "linear-gradient(to top right, #020207 50%, #5F64FF80 100%)",
                                        border: "1px solid #D8D8D833",
                                        position: "relative",
                                        overflow: "hidden",
                                        transition:
                                            "background 0.6s ease, border-bottom-width 0.5s ease",
                                        height: "305px",
                                        borderBottomWidth: "1px",
                                        borderBottomColor: "#D8D8D833",
                                    }}
                                >
                                    <div className="absolute inset-0 pointer-events-none" />
                                    <div
                                        className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === card.id
                                                ? "scale-[3] opacity-60"
                                                : "scale-100 opacity-30"
                                            }`}
                                    />
                                    <div className="p-8 max-sm:p-4 max-sm:mt-0">
                                        <div className="w-16 h-16 max-sm:w-12 max-sm:h-12 p-4 max-sm:p-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                            {card.icon}
                                        </div>
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="text-xl max-sm:text-lg font-bold text-white tracking-tighter font-sans">
                                                {card.title}
                                            </h2>
                                        </div>
                                        <p className="text-sm max-sm:text-[14px] text-[#afafaf] tracking-wider leading-relaxed font-light mb-0">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatWeCreate;
