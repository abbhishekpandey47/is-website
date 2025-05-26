"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const fileList = [
  "KUBIYA.AΙ",
  "FIREFLY",
  "DEVZERO",
  "ZenML",
  "Trecest",
  "YC Company",
];

const MarqueePage = () => {
  const fileMemo = useMemo(() => fileList, [fileList]);
  return (
    <div className="inset-0 flex justify-center items-center bg-[#171a3d]">
      <div
        className="w-[90%] max bg-gradient-to-br from-[#DEE4EA] to-[#ebeef1] pt-10 pb-2.5 card glass"
        style={{
          backgroundColor: "#171a3d",
          backgroundImage: `radial-gradient(circle at top right, #090d1a 0%, transparent 30%)`,
          border: "1px solid rgba(45, 51, 71, 1)",
        }}
      >
        <h2 className="text-center pb-1 text-white quicksand-bold text-xl mb-3">
          We are the growth strategists for some of the fastest-growing B2B SaaS
          startups
        </h2>

        <div className="flex gap-20 max-sm:gap-10 items-center mx-4">
          {fileMemo.map((file, index) => {
            return (
              <div key={index} className="flex-shrink-0 w-auto">
                <h2
                  className="text-center pb-1 text-white quicksand-bold text-2xl mt-8"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  {file}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarqueePage;
