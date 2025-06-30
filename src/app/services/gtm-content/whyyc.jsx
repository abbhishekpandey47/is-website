import React, { useState, useEffect, useRef } from 'react';

const ScrollAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDescription, setShowDescription] = useState(false);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    const sections = [
        {
            title: "Founder-Led Growth Needs Firepower",
            description: "Most early-stage teams lack time, in-house marketers, or documentation experts. We embed with your team to plan, write, and ship content that would otherwise take weeks internally."
        },
        {
            title: "Technical Founders? We Get You.",
            description: "We understand the technical complexity of your product and can translate complex features into compelling marketing messages that resonate with your target audience."
        },
        {
            title: "Built for Speed and SEO.",
            description: "Our streamlined process ensures rapid content delivery while maintaining SEO best practices. We focus on creating content that ranks well and converts visitors into customers."
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const windowCenter = window.innerHeight / 2;

            // Calculate scroll progress within the container
            const scrollProgress = Math.max(0, Math.min(1, (windowCenter - containerRect.top) / containerRect.height));

            // Determine active section based on scroll progress
            const sectionIndex = Math.floor(scrollProgress * sections.length);
            const clampedIndex = Math.max(0, Math.min(sections.length - 1, sectionIndex));

            // Show description after a delay when section becomes active
            if (clampedIndex !== activeIndex) {
                setActiveIndex(clampedIndex);
                setShowDescription(false);
                setTimeout(() => {
                    setShowDescription(true);
                }, 300); // Delay before showing description
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeIndex, sections.length]);

    // Initialize description visibility for first load
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDescription(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

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

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[18px] md:text-[17px] text-white leading-relaxed tracking-wide font-light">
                        Most technical startups struggle with content that actually converts developers <br /> and drives meaningful growth.                    </p>
                </div>
            </div>

            <div
                ref={containerRef}
                className="h-[400px] px-4 md:px-8 lg:px-12"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

                        {/* Left Column - Empty/Black */}
                        <div className="space-y-8 lg:sticky lg:top-20">
                            {sections.map((section, index) => (
                                <div
                                    key={index}
                                    ref={el => itemRefs.current[index] = el}
                                    className="h-16"
                                >
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            <div className="space-y-0">
                                {sections.map((section, index) => (
                                    <div
                                        key={index}
                                        className="transition-all duration-500 ease-out"
                                    >
                                        <div className="backdrop-blur-sm rounded-lg px-0 py-4 relative">
                                            {/* Title - Always visible */}
                                            <div className={`flex ${activeIndex === index ? 'text-start' : 'text-start'} space-x-4 mb-4`}>
                                                <div
                                                    className={`absolute mt-1 left-0 w-[5px] rounded-full transition-all duration-500 ${activeIndex === index ? 'bg-[#6B5BE7] h-32' : 'bg-gray-600 h-6'
                                                        }`}
                                                />
                                                <h3
                                                    className={`text-2xl quicksand-semibold transition-all duration-500 ml-8 ${activeIndex === index ? 'text-white' : 'text-gray-400 pb-1'
                                                        }`}
                                                >
                                                    {section.title}
                                                </h3>
                                            </div>

                                            {/* Description - Only shows when active and after delay */}
                                            <div
                                                className={`ml-4 transition-all duration-700 ease-out overflow-hidden ${activeIndex === index && showDescription
                                                    ? 'max-h-96 opacity-100 transform translate-y-0'
                                                    : 'max-h-0 opacity-0 transform -translate-y-4'
                                                    }`}
                                            >
                                                <p className="text-[20px] md:text-[17px] text-white leading-relaxed tracking-wide font-light pb-8">
                                                    {section.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollAccordion;