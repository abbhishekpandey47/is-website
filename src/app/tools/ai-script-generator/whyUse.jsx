"use client";

import React, { useState } from "react";
import { ArrowUpRight, Brain, PaperclipIcon, Sparkles, Subscript, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CLIDocsIcon from "@/app/services/technical-content-gtm/svg/cliDocs";


const WhyUse = () => {
    const [hoveredCard, setHoveredCard] = useState(null);


const cardData = [
  {
    id: "1",
    title: "Generate Scripts in a Matter of Seconds",
    description: "Your script gets ready in seconds, so DevTools and AI infrastructure teams can keep pace with product updates, feature launches, and release cycles!",
    icon: <Timer stroke="#6b5be7" />,
  },
  {
    id: "2",
    title: "Scripts are Specifically for DevTools, AI Agents of Infrastructure",
    description:
      "Our video script generator is context-aware for developer tools, infrastructure, and AI agents. This means your scripts will reflect the technical depth, industry language, and product nuances that matter to your audience.",
    icon: <Brain stroke="#6b5be7" />,
  },
  {
    id: "3",
    title: "Loaded with Content That’s Already Context-Aware",
    description:
      "This script generator with pre-loaded content includes industry-specific frameworks, use cases and terminology. This reduces your editing time, allowing you to focus more on the delivery!",
    icon: <Sparkles stroke="#6b5be7" />,
  },
];


    return (
        <div className="pb-16">
            <div className="max-w-6xl mx-auto text-center relative pb-8 z-10 max-sm:px-4">
                <div className="quicksand-bold text-[37px] max-sm:text-[28px] tracking-tighter leading-[80px] max-sm:leading-[35px] text-white text-center flex justify-center mb-2">
                    <h2 className="leading-[80px] max-sm:leading-[35px] text-center max-lg:text-center max-lg:mx-auto">
                       Why Use Our Video Script Generator?

                    </h2>
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
                                        height: "355px",
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
                                        <div className="flex items-center justify-center w-10 h-10 max-sm:w-12 max-sm:h-12 p-2 max-sm:p-2 rounded-lg bg-[#1e2252] mb-6 max-sm:mb-4">
                                            {card.icon}
                                        </div>
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="font-[quicksand] text-xl max-sm:text-lg font-bold text-white tracking-tighter">
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

export default WhyUse;
