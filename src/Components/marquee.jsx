"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";
import { clientLogo , clientPaddingMap } from "@/clients";

const fileList = clientLogo

// Dynamic padding configuration for each logo
const getLogoPadding = (filename) => {
  const paddingMap = clientPaddingMap

  // Return specific padding or default p-4
  return paddingMap[filename] || 'p-4';
};

const MarqueeDef = ({ text }) => {
  const fileMemo = useMemo(() => fileList, [fileList]);

  return (
    <div className="max-lg:mt-[30vh] max-sm:mt-[0vh] max bg-gradient-to-br from-[#DEE4EA] to-[#ebeef1] pt-10 pb-2.5 card glass">
      <h2 className="text-center pb-1 text-black quicksand-bold text-2xl">
        {text || "We are the growth strategists for some of the fastest-growing B2B SaaS startups"}
      </h2>
      <Marquee
        className="motion-reduce:overflow-auto"
        innerClassName="motion-reduce:animate-none"
        fade={true}
        direction="left"
        reverse={false}
        pauseOnHover={false}
        speed={40}
      >
        <div className="flex gap-20 max-sm:gap-10 items-center mx-4">
          {fileMemo.map((file, index) => {
            return (
              <div
                key={index}
                className={`flex-shrink-0 mix-blend-color-burn w-[160px] flex justify-center items-center`}
              >
                <Image
                  loading="lazy"
                  width={160}
                  height={80}
                  className={`${getLogoPadding(file)} object-contain opacity-90`}
                  src={`/trustedby/${file}`}
                  alt="Trusted by logo"
                />
              </div>
            );
          })}
        </div>
      </Marquee>

      {/* Duplicate marquee for seamless loop - fixes overlapping issue */}
      <style jsx>{`
        .marquee-container {
          overflow: hidden;
        }
        
        .marquee-content {
          display: flex;
          animation: scroll-left 30s linear infinite;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeDef;