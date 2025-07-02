import React, { useEffect, useState } from "react";

export default function WhoItIs() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
            };

            handleResize();

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    const cards = [
        {
            title: "Founders",
            description: "Technical founders who need GTM support but don't have bandwidth for content creation."
        },
        {
            title: "Heads of Growth",
            description: "Growth leaders at technical startups who need content that actually converts developers."
        },
        {
            title: "PMMs",
            description: "Product marketers who need technical content expertise for developer-focused products."
        },
        {
            title: "Content Leads",
            description: "Content leaders at pre-Series B startups without internal DevRel or technical writing teams."
        }
    ];
    return (
        <>
            <div className="p-6 sm:m-4 pb-10 md:p-6" >
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                        <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                            Who{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                                }}
                            >it's</span>{" "}for? {" "}
                        </h2>
                    </div>

                    <div className="flex justify-center my-6 mb-8">
                        <div class="w-[148px] h-1 rounded-full"
                            style={{
                                backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                            }}
                        ></div>
                    </div>
                    <div className="max-w-[70%] mx-auto mb-8">
                        <p className="text-[18px] md:text-[18px] text-white leading-relaxed tracking-wide font-light">
                            Perfect for pre-Series B startups who need technical content expertise but don't <br className="hidden md:block" /> have internal resources.
                        </p>
                    </div>
                </div>

                {isMobile ? <div className="flex items-center justify-center p-8">
                    <div className="max-w-7xl w-full">
                        <div className="flex flex-col sm:flex-row items-center justify-center">
                            {cards.map((card, index) => (
                                <React.Fragment key={index}>
                                    {/* Content Section */}
                                    <div className="flex-1 px-4 py-4 text-center sm:text-left">
                                        <h3
                                            className="text-[22px] quicksand-bold mb-1"
                                            style={{ color: '#6B5BE7' }}
                                        >
                                            {card.title}
                                        </h3>

                                        <p
                                            className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide leading-relaxed"
                                            style={{ color: '#FFFFFF' }}
                                        >
                                            {card.description}
                                        </p>
                                    </div>

                                    {index < cards.length - 1 && (
                                        <div className="flex items-center justify-center mx-2">
                                            <div
                                                className="w-16 h-px sm:w-px sm:h-24"
                                                style={{ backgroundColor: '#AFAFAF80' }}
                                            ></div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                    : <div className="flex items-center justify-center p-8">
                        <div className="max-w-7xl w-full">
                            <div className="flex flex-row items-center justify-center">
                                {cards.map((card, index) => (
                                    <React.Fragment key={index}>
                                        {/* Content Section */}
                                        <div className="flex-1 px-4 py-4">
                                            <h3
                                                className="text-[22px] quicksand-bold mb-1"
                                                style={{ color: '#6B5BE7' }}
                                            >
                                                {card.title}
                                            </h3>

                                            <p
                                                className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide leading-relaxed"
                                                style={{ color: '#FFFFFF' }}
                                            >
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Vertical divider line */}
                                        {index < cards.length - 1 && (
                                            <div className="flex items-center justify-center mx-2 self-stretch">
                                                <div
                                                    className="w-px h-16"
                                                    style={{ backgroundColor: '#AFAFAF80' }}
                                                ></div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}