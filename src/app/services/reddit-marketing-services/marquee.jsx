"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const fileList = [
    { name: "hyperwise.svg", hasBackground: false },
    { name: "eclipse.svg", hasBackground: true },
    { name: "together.svg", hasBackground: false },
    { name: "susaventures.png", hasBackground: true },
    { name: "firestreak.png", hasBackground: true },
    { name: "yc.avif", hasBackground: false },
    { name: "khosala.avif", hasBackground: false }
];

const TrustedBySection = () => {
    const [visibleIndex, setVisibleIndex] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    useEffect(() => {
        const initialTimeout = setTimeout(() => {
            setVisibleIndex(2); // Move to third logo quickly
        }, 500);

        const normalInterval = setTimeout(() => {
            const interval = setInterval(() => {
                setVisibleIndex((prev) => (prev + 1) % fileList.length);
            }, 2000);
            return () => clearInterval(interval);
        }, 2500);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(normalInterval);
        };
    }, []);

    return (
        <div className="text-left text-white">
            <div className="hidden md:flex items-left justify-left gap-2 text-lg md:text-[22px]">
                <span>Trusted at startups backed by</span>

                <div className="relative h-8 inline-block mx-1 w-[190px] -mx-2">
                    {fileList.map((file, index) => (
                        <div
                            key={`logo-${index}`}
                            className={`absolute inset-0 h-8 flex items-center justify-center transition-all duration-500 ${index === visibleIndex
                                ? 'opacity-100 translate-y-0'
                                : index === (visibleIndex - 1 + fileList.length) % fileList.length
                                    ? 'opacity-0 -translate-y-8'
                                    : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <Image
                                loading="lazy"
                                width={170}
                                height={32}
                                className={`max-w-[190px] h-[32px] object-contain ${file.hasBackground ? "bg-white rounded-xl" : ""}`}
                                src={`/reddit/${file.name}`}
                                alt={`Company logo ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <span>and more.</span>
            </div>

            {isMobile && <div className="md:hidden flex flex-col items-center justify-center gap-3 text-lg">
                <span className="text-center">Trusted at startups backed by</span>

                <div className="relative h-8 inline-block w-[190px]">
                    {fileList.map((file, index) => (
                        <div
                            key={`logo-${index}`}
                            className={`absolute inset-0 h-8 flex items-center justify-center transition-all duration-400 ${index === visibleIndex
                                ? 'opacity-100 translate-y-0'
                                : index === (visibleIndex - 1 + fileList.length) % fileList.length
                                    ? 'opacity-0 -translate-y-8'
                                    : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <Image
                                loading="lazy"
                                width={170}
                                height={32}
                                className={`max-w-[190px] h-[32px] object-contain ${file.hasBackground ? "bg-white rounded-xl" : ""}`}
                                src={`/reddit/${file.name}`}
                                alt={`Company logo ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <span className="text-center">and more.</span>
            </div>}
        </div>
    );
};

export default TrustedBySection;