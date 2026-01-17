"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const fileList = [
  "aviator.png",
  "mocha.png",
  "cedana.png",
  "dhiwise.png",
  "amnic.png",
  "oso.png",
  "ox-sec.svg",
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
];

const getLogoPadding = (filename) => {
  const paddingMap = {
    'aviator.png': 'p-3',
    'mocha.png': 'p-8',
    'cedana.png': 'p-5',
    'dhiwise.png': 'p-2',
    'amnic.png': 'p-5 filter brightness-0 invert',
    'mvp-grow.png': 'p-4',
    'cerbos.png': 'p-4',
    'qodo-logo.png': 'p-8',
    'Codegiant.png': 'p-4',
    'Scalekit-logo.png': 'p-4',
    'cycloid.png': 'p-7',
    'scalr.png': 'p-4',
    'daytona.png': 'p-5',
    'oso.png': 'p-12',
    'ox-sec.svg': 'p-8',
    'stackOne.png': 'p-4',
    'DevZero.png': 'p-4',
    'terrateam.png': 'p-4',
    'env0-infra-1.png': 'p-6',
    'tracetest.png': 'p-4',
    'firefly.png': 'p-5',
    'TravisCI-Full-Color.png': 'p-5',
    'firstock-logo.png': 'p-5',
    'vapi-logo.png': 'p-10',
    'kapstan.png': 'p-4',
    'Zenml.png': 'p-4',
    'Kubiya.png': 'p-5',
    'lovable-logo.png': 'p-4',
    'Meteor-ops.png': 'p-4',
  };

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
        <div className="flex gap-28 max-sm:gap-10 items-center mx-4">
          {fileMemo.map((file, index) => {
            return (
              <div key={index} className="mix-blend-color-burn">
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
