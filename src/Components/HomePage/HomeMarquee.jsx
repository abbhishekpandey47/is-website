"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const fileList = [
  "mocha.png",
  "aviator.png",
  "firstock-logo.webp",
  "dhiwise.svg",
  "amnic.png",
  "cedana.png",
  "cerbos.png",
  "codegiant-infra-1.png",
  "cycloid.png",
  "daytona-removebg-preview-e1721477918328.png",
  "DevZero.png",
  "env0-infra-1.png",
  "firefly.png",
  "Group-14967.png",
  "images-removebg-preview.png",
  "images__2_-removebg-preview.png",
  "kapstan.png",
  "kubiya.png",
  "logo-landscape-removebg-preview.png",
  "lovable-logo.png",
  "Mask-group.png",
  "middleware-logo.svg",
  "scalr.png",
  "stackOne.svg",
  "TravisCI-Full-Color.png",
  "terrateam.png",
  "vapi.png",
  "qodo-logo.svg",
];

const HomeMarquee = () => {
  const fileMemo = useMemo(() => fileList, [fileList]);
  return (
    <div className="max-lg:mt-[30vh] max-sm:mt-[0vh] max bg-gradient-to-br from-[#DEE4EA] to-[#ebeef1] pt-10 pb-2.5 card glass">
      <h2 className="text-center pb-1 text-black quicksand-bold text-2xl">
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
                className="flex-shrink-0 mix-blend-color-burn"
              >
                <Image
                  loading="lazy"
                  width={160}
                  height={80}
                  className="w-[160px] h-[80px] max-sm:w-[120px] max-sm:h-[60px] object-contain"
                  src={`/trustedby/${file}`}
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

export default HomeMarquee;
