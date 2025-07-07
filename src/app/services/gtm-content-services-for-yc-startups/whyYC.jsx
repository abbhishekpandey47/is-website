"use client";

import { useState } from "react";
import RightIcon from "./svg/correct";

const HoverCards = () => {
    const [activeCard, setActiveCard] = useState(0);

    const cards = [
        {
            title: "Delivery That Matches YC Pacing",
            description:
                "YC startups don’t wait — neither do we,we move at the same speed as you — fast, focused, and always shipping",
            time: "2 WEEKS",
            tagLine: "Product Docs, SDK Guides, Use Cases"
        },
        {

            title: "Technical Credibility",
            description:
                "Content that doesn’t need babysitting — written by folks who speak infrastructure, SDKs, and APIs like your team does",
            time: "100% | Authored by practitioners, not generalists",
            tagLine: "Engineering authored content",
        },
        {

            title: "Your DevRel Team, Without the Hiring Lag",
            description: "Full DevRel/content team instantly, no recruiting delays. ",
            time: "DAY 1 | Operational from kickoff",
            tagLine: "Ready from start",
        },
        {

            title: "5x faster and ~75% cheaper",
            description:
                "Our content helps startups 3–5x traffic and increase signups — without founders writing a word.",
            time: "40% | Avg. lift in qualified inbound",
            tagLine: "More traffic with regular content",
        },
    ];

    return (
        <div className="bg-gradient-to-br from-blue-900/40 via-[#0a0f1c] to-slate-900 pt-10">
            <div className="w-full mx-auto text-center relative z-10 py-10 pt-4">
                <div className="quicksand-bold text-[37px] max-sm:text-[25px] tracking-tighter leading-[40px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:mx-auto tracking-wide">
                        Content Partner <span>Behind</span>  Several <span className="text-orange-500">YC</span> Growth Stories{" "}
                    </h2>
                </div>
                <div class="flex justify-center my-6 mb-8">
                    <div class="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    ></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Startups backed by Y Combinator rely on us to craft product explainers, SDK docs, and use-case libraries
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center p-4 max-sm:p-4">
                <div className="flex md:flex-row flex-col md:h-64 gap-4 w-full justify-center items-start md:items-start max-w-sm md:max-w-7xl mx-auto">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`relative bg-gradient-to-br from-[#0a0f1b] to-blue-900/40 backdrop-blur-sm rounded-2xl border-2 cursor-pointer md:flex-shrink-0 w-full md:w-56 transition-all duration-700 ease-out transform hover:scale-[1.02] md:active:scale-100 active:scale-[0.98] border-[#323640] ${activeCard === index
                                ? "md:w-[35%] h-60 border-[#454671] shadow-2xl shadow-pink"
                                : "h-24 lg:h-36 md:border-slate-700/60 border-slate-700/60 hover:border-slate-600/80"
                                }`}
                            onMouseEnter={() => setActiveCard(index)}
                            onMouseLeave={() => setActiveCard(0)}
                            onClick={() => setActiveCard(activeCard === index ? 0 : index)}
                            style={{
                                background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                                border: "2px solid #2f2f37",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div className="px-8 md:px-8 max-sm:px-6 pt-8 md:pt-8 max-sm:pt-6 flex flex-col h-full">

                                {/* Title Row */}
                                <div
                                    className={`flex-shrink-0 mb-4 ${activeCard === index ? "mr-0" : "md:mr-1"
                                        }`}
                                >
                                    <h3 className="text-white text-[21px] md:text-[21px] max-sm:text-[19px] font-semibold leading-tight tracking-wide">
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Description Row  */}
                                <div className="flex-1 overflow-hidden">
                                    <div
                                        className={`transition-all duration-500 ease-out ${activeCard === index
                                            ? "opacity-100 translate-y-0 delay-200"
                                            : "opacity-0 translate-y-2 delay-0"
                                            }`}

                                    >
                                        <p className="md:h-10 text-[17px] md:text-[15px] max-sm:text-[15px] text-[#afafaf] leading-relaxed tracking-wide font-[330] max-sm:mb-4">
                                            {card.description}
                                        </p>


                                        <div>
                                            <div className="flex items-center space-x-2 pt-14 max-sm:pt-8">
                                                <div className="flex-shrink-0">
                                                    <RightIcon />
                                                </div>
                                                <p className="text-sm text-[#ffa600] tracking-wider font-[330] leading-tight">
                                                    {card.time}
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent rounded-2xl pointer-events-none" />

                            <div
                                className={`absolute inset-0 rounded-2xl transition-all duration-600 ease-out ${activeCard === index
                                    ? "bg-gradient-to-r from-pink-500/5 to-blue-500/5 opacity-100"
                                    : "bg-gradient-to-r from-pink-500/5 to-blue-500/5 opacity-0"
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HoverCards;