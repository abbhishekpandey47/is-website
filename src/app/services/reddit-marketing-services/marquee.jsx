"use client";
import React, { useEffect, useState, useCallback } from "react";
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
    const [isAnimating, setIsAnimating] = useState(true);

    const nextLogo = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= fileList.length - 1) {
                // Reset to beginning without animation
                setIsAnimating(false);
                setTimeout(() => {
                    setCurrentIndex(0);
                    setIsAnimating(true);
                }, 50);
                return prevIndex;
            }
            return prevIndex + 1;
        });
    }, []);

    useEffect(() => {
        // Start animation immediately on load
        const immediateTimeout = setTimeout(nextLogo, 700);

        // Then continue with regular intervals
        const interval = setInterval(nextLogo, 2500);

        return () => {
            clearTimeout(immediateTimeout);
            clearInterval(interval);
        };
    }, [nextLogo]);

    return (
        <div className="text-left text-white">
            <div className="flex flex-col sm:flex-row sm:items-left sm:justify-left gap-2 text-base sm:text-lg md:text-[22px]">
                <span className="sm:inline">Trusted at startups backed by</span>

                {/* Vertical Logo Rotator */}
                <div className="relative h-6 sm:h-8 overflow-hidden inline-block mx-0 sm:mx-1">
                    <div
                        className={`flex flex-col ${isAnimating ? 'transition-transform duration-500 ease-in-out' : ''}`}
                        style={{
                            transform: `translateY(${-currentIndex * 32}px)`,
                            willChange: 'transform'
                        }}
                    >
                        {fileList.map((file, index) => (
                            <div
                                key={`logo-${file.name}-${index}`}
                                className="h-6 sm:h-8 flex items-center justify-center flex-shrink-0"
                            >
                                <Image
                                    src={`/reddit/${file.name}`}
                                    alt={`${file.name.split('.')[0]} logo`}
                                    width={170}
                                    height={32}
                                    className={`
                                        max-w-[120px] sm:max-w-[190px] 
                                        h-[24px] sm:h-[32px] 
                                        object-contain
                                        ${file.hasBackground ? "bg-white rounded-xl" : ""}
                                    `}
                                    priority={index === 0}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <span className="sm:inline">and more.</span>
            </div>
        </div>
    );
};

export default TrustedBySection;