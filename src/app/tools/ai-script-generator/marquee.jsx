"use client";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";
import { useMemo } from "react";

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
    'dhiwise.png': 'p-2',
    'oso.png': 'p-12',
    'ox-sec.svg': 'p-8',
    'qodo-logo.svg': 'p-8',
    'stackOne.svg': 'p-4',
    'mocha.png': 'p-8',
    'aviator.png': 'p-3',
    'firstock-logo.webp': 'p-5',
    'amnic.png': 'p-5 filter brightness-0 invert',
    'cedana.png': 'p-5',
    'cerbos.png': 'p-4',
    'codegiant-infra-1.png': 'p-3',
    'cycloid.webp': 'p-7',
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

const BlackMarquee = () => {
  const fileMemo = useMemo(() => fileList, [fileList]);
  return (
    <div className="justify-center items-center flex flex-col pb-10">
      <div
        className="w-[90%] pb-1"
        style={{
          backgroundColor: "#171a3d",
          backgroundImage: `radial-gradient(circle at top right, #090d1a 0%, transparent 30%)`,
          border: "1.5px solid rgba(45, 51, 71, 1)",
          borderRadius: "16px",
        }}
      >
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
    </div>
  );
};

export default BlackMarquee;
