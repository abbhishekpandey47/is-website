"use client";

import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { useCallback, useMemo } from "react";
import { clientPaddingMap, serviceClientLogo } from "@/clients";

const logoFiles = serviceClientLogo;

export default function TrustedMarquee() {
    const getLogoPadding = useCallback((filename) => {
        const paddingMap = clientPaddingMap;
        return paddingMap[filename] || 'p-4';
    }, []);

    const memoizedLogos = useMemo(() => logoFiles, []);
    const logoRows = useMemo(() => {
        const firstRow = [];
        const secondRow = [];
        memoizedLogos.forEach((logo, index) => {
            if (index % 2 === 0) {
                firstRow.push(logo);
            } else {
                secondRow.push(logo);
            }
        });
        return [firstRow, secondRow];
    }, [memoizedLogos]);

    return (
        <div
            className="relative w-full pt-10 pb-8 max-sm:pt-6"
        >
             <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h3 className=" md:leading-[40px] text-center max-lg:text-center max-lg:mx-auto">
                        Trusted by Builders at {" "}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Innovative AI Startups</span>
                    </h3>
                </div>
            <div className="space-y-6 mt-6">
                {logoRows.map((row, rowIndex) => (
                    <Marquee
                        key={rowIndex}
                        className="motion-reduce:overflow-auto"
                        innerClassName="motion-reduce:animate-none"
                        reverse={rowIndex % 2 === 1}
                    >
                        <div className="flex gap-6 items-center mx-4">
                            {row.map((logoFile, idx) => (
                                <div
                                    key={`${logoFile}-${idx}`}
                                    className="flex items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,_#1b1530,_#2a1b47)] h-[56px] px-6"
                                >
                                    <Image
                                        loading="lazy"
                                        width={140}
                                        height={40}
                                        className={`${getLogoPadding(logoFile)} object-contain opacity-100`}
                                        src={`/trustedby-bw/bw/${logoFile}`}
                                        alt="Company Logo"
                                    />
                                </div>
                            ))}
                        </div>
                    </Marquee>
                ))}
            </div>
        </div>
    );
}
