"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const fileList = [
    { name: "hyperwise.svg", hasBackground: false },
    { name: "eclipse.svg", hasBackground: true },
    { name: "together.svg", hasBackground: false },
    { name: "vineventures.svg", hasBackground: true },
    { name: "susaventures.png", hasBackground: true },
    { name: "firestreak.png", hasBackground: true },
    { name: "yc.avif", hasBackground: false },
    { name: "khosala.avif", hasBackground: false }
];

const TrustedBySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        // Start the animation immediately by setting the interval
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= fileList.length) {
                    return 0;  // Reset to first logo once we reach the end
                }

                return nextIndex;
            });
        }, 2000); // 2 seconds interval for each image change

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
                                className="h-8 flex items-center justify-center flex-shrink-0"
                            >
                                <Image
                                    loading="lazy"
                                    width={170}
                                    height={32}
                                    className={`max-w-[190px] h-[32px] object-contain ${file.hasBackground ? "bg-white rounded-xl" : ""}`}
                                    src={`/reddit/${file.name}`}
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
