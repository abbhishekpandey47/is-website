"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export default function Threadflow() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 100%", "end 95%"],
  });

  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.2, 1], [0.6, 0.9, 1]);
  const shadowRaw = useTransform(scrollYProgress, [0, 1], [0.35, 0]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 140, damping: 24, mass: 0.6 });
  const y = useSpring(yRaw, { stiffness: 140, damping: 24, mass: 0.6 });
  const opacity = useSpring(opacityRaw, { stiffness: 120, damping: 28, mass: 0.7 });

  const boxShadow = useTransform(
    shadowRaw,
    (s) => `0 24px 60px rgba(0,0,0,${0.35 + s * 0.25})`
  );

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="w-full overflow-visible py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">Complete oversight of {" "}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Reddit comments and approvals</span>
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Your Reddit conversations, simplified. One dashboard for tracking, managing, and engaging smarter.
                    </p>
                </div>
            </div>
        <div
          className="mx-auto w-full max-w-[1100px]"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {/* Image container with no background */}
          <m.div
            className="relative w-full overflow-hidden rounded-2xl border border-zinc-700/40 bg-[#0f1729]"
            style={{
              transformOrigin: "50% 100%",
              rotateX,
              y,
              opacity,
              boxShadow,
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Exact aspect ratio, no background color */}
            <div className="relative w-full aspect-[6912/4468] bg-transparent">
              <Image
                src="/reddit/Threadflow.png"
                alt="Threadflow dashboard"
                fill
                style={{ objectFit: "contain", backgroundColor: "transparent" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1100px"
                priority
                quality={90}
              />
            </div>
          </m.div>
        </div>

        {/* CTA buttons */}
        {/* <div className="mx-auto mt-10 flex w-full max-w-2xl items-center justify-center gap-4 px-2">
          <m.a
            href="/threadflow"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center rounded-lg bg-[#8159dc] px-5 py-3 font-semibold text-zinc-100 shadow-sm transition hover:brightness-110"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </m.a>
          <m.a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/90 px-5 py-3 font-medium text-white/95 transition hover:bg-white/10"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Request a Demo
          </m.a>
        </div> */}
      </section>
    </LazyMotion>
  );
}
