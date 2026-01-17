"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const fileList = [
  "aviator.png","mocha.png","cedana.png","dhiwise.png","amnic.png","oso.png","ox-sec.svg",
  "mvp-grow.png","cerbos.png","qodo-logo.png","Codegiant.png","Scalekit-logo.png","cycloid.png",
  "scalr.png","daytona.png","stackOne.png","DevZero.png","terrateam.png","env0-infra-1.png",
  "tracetest.png","firefly.png","TravisCI-Full-Color.png","firstock-logo.png","vapi-logo.png",
  "kapstan.png","Zenml.png","Kubiya.png","lovable-logo.png","Meteor-ops.png"
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
    'oso.png': 'p-12 ',
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

  return paddingMap[filename] || 'p-4';
};

const NewMarquee = () => {
  const fileMemo = useMemo(() => fileList, []);
  const duration = "80s"; 

  return (
    <div className="pb-2 relative">
      {/* Background matching masterPlaybook */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>
      
      <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto relative z-10">
        <div
          className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden px-5 lg:px-12 py-8"
          aria-hidden={false}
        >
        <p className="w-full text-center text-lg text-white mb-6">
          We are the growth strategists for some of the fastest-growing B2B SaaS startups
        </p>
         
          <Marquee
            className="custom-marquee-mask"
            innerClassName="custom-marquee-track"
            pauseOnHover={true}
            fade={false}
            direction="left"
          >
            <div className="flex gap-10 items-center mx-4">
              {fileMemo.map((file, index) => (
                <div key={index} className={`mix-blend-color-burn ${getLogoPadding(file)}`}>
                  <Image
                    loading="lazy"
                    width={100}
                    height={80}
                    className="object-contain opacity-90"
                    src={`/trustedby-bw/bw/${file}`}
                    alt={file}
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
        
     
     
      </div>

      <style jsx global>{`
        /* Smooth fade at left/right edges: mask-image works well (with -webkit prefix fallback) */
        .custom-marquee-mask {
          /* adjust percentages to change width of fade */
          -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          /* ensure overlays/gaps are not clipped by mask */
        }

        /* Force the library's animated track to run slower.
           innerClassName attaches this class to the moving track, so overriding animation-duration
           here slows the scroll. */
        .custom-marquee-track {
          -webkit-animation-duration: ${duration} !important;
          animation-duration: ${duration} !important;
          /* keep linear timing for smooth constant speed */
          -webkit-animation-timing-function: linear !important;
          animation-timing-function: linear !important;
        }

        /* Some environments set animation on a child; add a safer override for any descendant animation */
        .custom-marquee-track * {
          -webkit-animation-duration: ${duration} !important;
          animation-duration: ${duration} !important;
        }

        /* Optional: nice image smoothing */
        .custom-marquee-mask img {
          transition: transform 300ms ease, opacity 300ms ease;
          will-change: transform, opacity;
        }

        /* responsive tweak: smaller height on small screens */
        @media (max-width: 640px) {
          .custom-marquee-mask img { height: 36px; width: auto; }
        }
      `}</style>
    </div>
  );
};

export default NewMarquee;