"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const fileList = [
    "ventures.avif",
    "SEQUOIA.avif",
    "andreessen.avif",
    "khosala.avif",
    "yc.avif"
];

const TrustedBySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                // When we reach beyond the last item, reset to 0 without animation
                if (nextIndex > fileList.length) {
                    setShouldAnimate(false);
                    setTimeout(() => {
                        setCurrentIndex(1);
                        setShouldAnimate(true);
                    }, 50);
                    return 0;
                }

                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Create array with duplicated first item at the end for seamless loop
    const displayList = [...fileList, fileList[0]];

    return (
        <div className="text-left text-white">
            <div className="flex items-left justify-left gap-2 text-lg md:text-[22px]">
                <span>Trusted at startups backed by</span>

                {/* Vertical Logo Rotator */}
                <div className="relative h-8 overflow-hidden inline-block mx-1">
                    <div
                        className={`flex flex-col ${shouldAnimate ? 'transition-transform duration-700 ease-in-out' : ''}`}
                        style={{
                            transform: `translateY(${-currentIndex * 32}px)`
                        }}
                    >
                        {displayList.map((file, index) => (
                            <div
                                key={`logo-${index}`}
                                className="h-8 flex items-center justify-center flex-shrink-0 -mx-2"
                            >
                                <Image
                                    loading="lazy"
                                    width={170}
                                    height={32}
                                    className="max-w-[190px] max-h-[32px] object-contain"
                                    src={`/reddit/${file}`}
                                    alt={`Company logo ${(index % fileList.length) + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <span>and more.</span>
            </div>
        </div>
    );
};

export default TrustedBySection;