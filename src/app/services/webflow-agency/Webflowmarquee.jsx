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
  "oso.png",
  "ox-sec.svg",
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

// Dynamic padding configuration for each logo
const getLogoPadding = (filename) => {
  const paddingMap = {
    'dhiwise.svg': 'p-6',
    'middleware-logo.svg': 'p-3',
    'qodo-logo.svg': 'p-8',
    'stackOne.svg': 'p-4',
    'mocha.png': 'p-8',
    'aviator.png': 'p-3',
    'firstock-logo.webp': 'p-5',
    'amnic.png': 'p-6',
     'oso.png': 'p-12',
    'ox-sec.svg': 'p-8',
    'cedana.png': 'p-5',
    'cerbos.png': 'p-4',
    'codegiant-infra-1.png': 'p-3',
    'cycloid.png': 'p-7',
    'daytona-removebg-preview-e1721477918328.png': 'p-5',
    'DevZero.png': 'p-4',
    'env0-infra-1.png': 'p-6',
    'firefly.png': 'p-5',
    'Group-14967.png': 'p-4',
    'images-removebg-preview.png': 'p-6',
    'images__2_-removebg-preview.png': 'p-6',
    'kapstan.png': 'p-4',
    'kubiya.png': 'p-5',
    'logo-landscape-removebg-preview.png': 'p-2',
    'lovable-logo.png': 'p-4',
    'Mask-group.png': 'p-5',
    'scalr.png': 'p-4',
    'TravisCI-Full-Color.png': 'p-5',
    'terrateam.png': 'p-4',
    'vapi.png': 'p-5',
  };

  // Return specific padding or default p-4
  return paddingMap[filename] || 'p-4';
};

const MarqueeDef = ({ text }) => {
  const fileMemo = useMemo(() => fileList, [fileList]);

  return (
    <div className="max-lg:mt-[30vh] max-sm:mt-[0vh] bg-white rounded-3xl pt-16 pb-1">
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
                className="flex-shrink-0 mix-blend-color-burn min-w-[160px] flex justify-center items-center"
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