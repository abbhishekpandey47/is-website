"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const fileList = [
  "aviator.png",
  "mocha.png",
  "cedana.png",
  "mvp-grow.png",
  "cerbos.png",
  "qodo-logo.png",
  "Codegiant.png",
  "Scalekit-logo.png",
  "cycloid.png",
  "scalr.png",
  "daytona.png",
  "stackOne.png",
  "DevZero.png",
  "terrateam.png",
  "env0-infra-1.png",
  "tracetest.png",
  "firefly.png",
  "TravisCI-Full-Color.png",
  "firstock-logo.png",
  "vapi-logo.png",
  "kapstan.png",
  "Zenml.png",
  "Kubiya.png",
  "lovable-logo.png",
  "Meteor-ops.png",
  "middleware-logo.png",
];

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
                  width={150}
                  height={50}
                  className="w-40 max-sm:w-30 mt-8"
                  src={`/trustedby-bw/bw/${file}`}
                  alt="Ratio is 3.9"
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
