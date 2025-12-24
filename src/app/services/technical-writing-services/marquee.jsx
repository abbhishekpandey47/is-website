"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";
import { clientPaddingMap , serviceClientLogo } from "@/clients";

const fileList = serviceClientLogo

const getLogoPadding = (filename) => {
    const paddingMap = clientPaddingMap;

  // Return specific padding or default p-4
  return paddingMap[filename] || 'p-4';
};


const NewMarquee = () => {
  const fileMemo = useMemo(() => fileList, [fileList]);
  return (
    <div className="max-lg:mt-[30vh] max-sm:mt-[0vh] pt-16 pb-1">
      <h2 className="text-center pb-1 text-white quicksand-bold text-2xl">
        We are the growth strategists for some of the fastest-growing B2B SaaS
        startups
      </h2>
      <Marquee
        className="motion-reduce:overflow-auto"
        innerClassName="motion-reduce:animate-none"
      >
        <div className="flex gap-20 max-sm:gap-10 items-center mx-4">
          {fileMemo.map((file, index) => {
            return (
              <div
                key={index}
                className="flex-shrink-0 w-auto mix-blend-color-burn"
              >
                <Image
                  loading="lazy"
                  width={160}
                  height={80}
                  className={`${getLogoPadding(file)} object-contain opacity-90`}
                  src={`/trustedby-bw/bw/${file}`}
                  alt="Trusted by logo"
                />
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default NewMarquee;
