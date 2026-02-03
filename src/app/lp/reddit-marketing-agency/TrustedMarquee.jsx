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

    return (
        <div
            className="w-[100%] pt-8 pb-1 max-sm:pt-4"
            style={{
                backgroundColor: "#171a3d",
                backgroundImage: `radial-gradient(circle at top right, #090d1a 0%, transparent 30%)`,
                border: "1.5px solid rgba(45, 51, 71, 1)",
                borderRadius: "16px",
                zIndex: 0,
            }}
        >
            <h2 className="text-center pb-1 text-white quicksand-bold text-2xl max-sm:text-xl max-sm:px-4">
                Trusted by Builders at Innovative AI Startups
            </h2>
            <Marquee
                className="motion-reduce:overflow-auto"
                innerClassName="motion-reduce:animate-none"
            >
                <div className="flex gap-20 max-sm:gap-10 items-center mx-4">
                    {memoizedLogos.map((logoFile, idx) => {
                        return (
                            <div key={idx} className="mix-blend-color-burn">
                                <Image
                                    loading="lazy"
                                    width={160}
                                    height={80}
                                    className={`${getLogoPadding(logoFile)} object-contain opacity-90`}
                                    src={`/trustedby-bw/bw/${logoFile}`}
                                    alt="Company Logo"
                                />
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        </div>
    );
}
