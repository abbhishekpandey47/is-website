"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { clientPaddingMap, serviceClientLogo } from "@/clients";

const logoFiles = serviceClientLogo;

export default function TrustedMarquee({
    heading = "",
    highlight = "",
    wrapperClassName,
    headingClassName,
    highlightClassName,
    headingStyle,
    spacingClassName = "pt-28",
    maskColor = "rgba(12, 8, 24, 0.95)",
    maskFadeColor = "rgba(12, 8, 24, 0)",
    maskWidth = 72
}) {
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

    const resolvedWrapperClassName =
        wrapperClassName ||
        "quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2";
    const resolvedHeadingClassName =
        headingClassName || "md:leading-[40px] text-center max-lg:text-center max-lg:mx-auto";
    const resolvedHighlightClassName =
        highlightClassName ||
        "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600";

    return (
        <div className={`relative w-full ${spacingClassName} pb-8 max-sm:pt-6`}>
            <div className={resolvedWrapperClassName}>
                <h3 className={resolvedHeadingClassName} style={headingStyle}>
                    {heading}{" "}
                    <span className={resolvedHighlightClassName}>{highlight}</span>
                </h3>
            </div>
            <div
                className="space-y-6 mt-12 relative z-0 marquee__rows"
                style={{
                    "--marquee-mask-color": maskColor,
                    "--marquee-mask-fade": maskFadeColor,
                    "--marquee-mask-width": `${maskWidth}px`,
                    "--marquee-border-radius": "24px"
                }}
            >
                {logoRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="marquee">
                        <div className={`marquee__track${rowIndex % 2 === 1 ? " marquee__track--reverse" : ""}`}>
                            {[...row, ...row].map((logoFile, idx) => (
                                <div
                                    key={`${logoFile}-${idx}`}
                                    // style={{"background": "linear-gradient(225deg, #24126A 0%, rgba(70.64, 35.32, 208, 0) 100%)"}}
                                    className="flex items-center justify-center h-[56px] px-6"
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
                    </div>
                ))}
            </div>
            <style jsx>{`
                .marquee {
                    overflow: hidden;
                }
                .marquee__rows {
                    position: relative;
                }
                .marquee__rows::before,
                .marquee__rows::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    width: var(--marquee-mask-width, 72px);
                    height: 100%;
                    pointer-events: none;
                    z-index: 10;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                .marquee__rows::before {
                    left: 0;
                    background: linear-gradient(to right, var(--marquee-mask-color), var(--marquee-mask-fade));
                }
                .marquee__rows::after {
                    right: 0;
                    background: linear-gradient(to left, var(--marquee-mask-color), var(--marquee-mask-fade));
                }
                .marquee__track {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    width: max-content;
                    animation: marquee 42s linear infinite;
                    mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 14%,
                        black 86%,
                        transparent 100%
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 14%,
                        black 86%,
                        transparent 100%
                    );
                }
                .marquee__track--reverse {
                    animation-direction: reverse;
                }
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee__track {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
}
