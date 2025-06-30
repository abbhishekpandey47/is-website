import { useState } from "react";

export default function WhatWeCreate() {
    const [activeSection, setActiveSection] = useState("Technical Blogs");

    const sections = {
        "Technical Blogs": {
            title: "Drive thought leadership, build trust, improve SEO, and explain complex things simply.",
            features: [
                "Start with a clear TLDR or summary block",
                "Break down complex features or flows with diagrams or code snippets",
                "Include benchmarks, real metrics, or performance results",
                "Focus on why something matters, not just how it works",
                "Link to GitHub repos or live demos",
                "End with 'next steps' or related blog posts"
            ]
        },
        "Use Case Guides": {
            title: "Show real-world applications, solve specific problems, and guide implementation.",
            features: [
                "Begin with the problem statement and target audience",
                "Provide step-by-step implementation examples",
                "Include common pitfalls and troubleshooting tips",
                "Show before/after comparisons or results",
                "Add interactive demos or sandbox environments",
                "Conclude with optimization recommendations"
            ]
        },
        "Product Hunt Launch Kits": {
            title: "Maximize launch success with comprehensive preparation and execution strategies.",
            features: [
                "Create compelling launch narratives and messaging",
                "Prepare visual assets, GIFs, and demo videos",
                "Build hunter and maker community engagement",
                "Schedule coordinated social media campaigns",
                "Set up analytics and conversion tracking",
                "Plan post-launch follow-up and community building"
            ]
        },
        "Docs & CLI Guides": {
            title: "Create comprehensive documentation that developers actually want to use.",
            features: [
                "Structure with progressive disclosure principles",
                "Include copy-paste code examples and commands",
                "Add interactive API explorers or CLI simulators",
                "Provide multiple language/framework examples",
                "Include troubleshooting and FAQ sections",
                "Maintain version compatibility matrices"
            ]
        },
        "One Pagers & Deck Slides": {
            title: "Communicate complex ideas clearly with impactful visual storytelling.",
            features: [
                "Lead with the most important insight or data point",
                "Use consistent visual hierarchy and branding",
                "Include compelling charts, graphs, or infographics",
                "Tell a story with logical flow and clear transitions",
                "Add speaker notes and presentation guidelines",
                "Provide exportable formats for different contexts"
            ]
        },
        "Docs & CLI Guides 1": {
            title: "Create comprehensive documentation that developers actually want to use.",
            features: [
                "Structure with progressive disclosure principles",
                "Include copy-paste code examples and commands",
                "Add interactive API explorers or CLI simulators",
                "Provide multiple language/framework examples",
                "Include troubleshooting and FAQ sections",
                "Maintain version compatibility matrices"
            ]
        },
        "Docs & CLI Guides 2": {
            title: "Create comprehensive documentation that developers actually want to use.",
            features: [
                "Structure with progressive disclosure principles",
                "Include copy-paste code examples and commands",
                "Add interactive API explorers or CLI simulators",
                "Provide multiple language/framework examples",
                "Include troubleshooting and FAQ sections",
                "Maintain version compatibility matrices"
            ]
        },
        "One Pagers & Deck Slides 1": {
            title: "Communicate complex ideas clearly with impactful visual storytelling.",
            features: [
                "Lead with the most important insight or data point",
                "Use consistent visual hierarchy and branding",
                "Include compelling charts, graphs, or infographics",
                "Tell a story with logical flow and clear transitions",
                "Add speaker notes and presentation guidelines",
                "Provide exportable formats for different contexts"
            ]
        },
    };

    const sectionKeys = Object.keys(sections);
    return (
        <div className="p-8 pb-10 md:p-[2rem]" >
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        Why{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                            }}
                        >YC-Backed</span>{" "}Startups Work with Infrasity
                    </h2>
                </div>

                <div class="flex justify-center my-6 mb-8">
                    <div class="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    ></div>
                </div>
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[18px] md:text-[17px] text-white leading-relaxed tracking-wide font-light">
                        Most technical startups struggle with content that actually converts developers <br /> and drives meaningful growth.                    </p>
                </div>
            </div>
            <div className="p-10 rounded-3xl"
                style={{
                    background: "linear-gradient(to right, #000000 0%, #0e1329 50%, #353586 100%)",
                    border: "1px solid #393a52",
                    transition: "all 0.3s ease",
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Navigation Pills with Horizontal Scroll */}
                    <div className="mb-6">
                        <div className="overflow-x-auto scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', }}
                        >
                            <div className="flex space-x-4 pb-4 min-w-max">
                                {sectionKeys.map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => setActiveSection(section)}
                                        className={`px-6 py-2 rounded-full text-sm font-[quicksand] font-medium whitespace-nowrap transition-all duration-300
        border ${activeSection === section
                                                ? "bg-[#252761ba] border-[#51538f] text-white"
                                                : "border-transparent hover:bg-[#252761ba] hover:border-[#51538f] hover:text-white"
                                            }`}
                                    >
                                        {section}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="bg-white bg-opacity-15 flex-none h-px overflow-hidden relative w-full"></div>

                    {/* Main Content Card */}
                    <div className="pt-8"
                    >
                        {/* Title */}
                        <h1 className="text-[18px] font-[quicksand] font-medium text-white mb-10 leading-relaxed">
                            {sections[activeSection].title}
                        </h1>

                        <div className="grid md:grid-cols-2 gap-8">
                            {sections[activeSection].features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_854_1771" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_854_1771)">
                                                    <path d="M9.5501 18.0001L3.8501 12.3001L5.2751 10.8751L9.5501 15.1501L18.7251 5.9751L20.1501 7.4001L9.5501 18.0001Z" fill="#4ADE80" />
                                                </g>
                                            </svg>

                                        </div>
                                    </div>
                                    {/* Feature Text */}
                                    <p className="text-[16px] md:text-[16px] text-white leading-relaxed tracking-wide font-light">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Visual Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    </div>
                </div>

                <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
            </div>
        </div>
    )
}