"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import RightIcon from "./svg/correct";
import EditIcon from "./svg/editIcon";

const WhatWeDo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div
      style={{
        background: "linear-gradient(to top right, #020207 40%, #020207 90%)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 py-10 pt-4">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            What we do{" "}
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto mb-8">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Comprehensive technical content and development services designed
            for YC startups.
          </p>
        </div>
      </div>
      <div className=" flex items-center justify-center p-10">
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full">
          {/* First Card - 40% width */}
          <div
            className="w-full lg:w-[50%] relative group"
            onMouseEnter={() => setHoveredCard("kubiya")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
              style={{
                background:
                  "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                border: "2px solid #2f2f37",
                transition: "all 0.3s ease",
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${
                  hoveredCard === "kubiya"
                    ? "scale-[3] opacity-60"
                    : "scale-100 opacity-30"
                }`}
              ></div>

              {/* Image Placeholder */}
              <div className="p-8">
                <div className="w-16 h-16 p-4 rounded-lg bg-[#1c1f4b] -mb-8">
                  <EditIcon />
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white quicksand-bold tracking-tighter">
                    Technical Content and Blogs
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                  SEO-driven developer articles, whitepapers and product docs
                  written by engineers for engineers
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    How-to guides
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    APK / SDK documentation
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Integration playbooks
                  </p>
                </div>
              </div>
              <div className="h-80 relative overflow-hidden -mt-28">
                <div className="absolute top-32 left-32 right-0 bottom-0">
                 <div
  className="bg-white/95 p-4 h-full relative overflow-hidden"
  style={{
    border: "1.5px solid #223170",
    borderTopLeftRadius: "1rem",       // example rounding size
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium">
    <Image
      src={`/ai-page/first.png`}
      alt="Kubiya Dashboard"
      layout="fill"
      objectFit="cover"
      className="absolute inset-0 object-cover"
    />
  </div>
</div>

                </div>
              </div>
            </div>
          </div>

          {/* Second Card - 80% width */}
          <div
            className="w-full lg:w-[65%] relative group"
            onMouseEnter={() => setHoveredCard("kubiya")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
              style={{
                background:
                  "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                border: "2px solid #2f2f37",
                transition: "all 0.3s ease",
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${
                  hoveredCard === "kubiya"
                    ? "scale-[3] opacity-60"
                    : "scale-100 opacity-30"
                }`}
              ></div>

              {/* Image Placeholder */}
              <div className="p-8">
                <div className="w-16 h-16 p-4 rounded-lg bg-[#1c1f4b] -mb-8">
                  <EditIcon />
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white quicksand-bold tracking-tighter">
                    Technical Content and Blogs
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                  SEO-driven developer articles, whitepapers and product docs
                  written by engineers for engineers
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light flex items-center">
                    How-to guides
                    <span className="ml-4 text-gray-400">|</span>{" "}
                    {/* equal horizontal margin and matching color */}
                  </p>

                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light flex items-center">
                    Integration playbooks
                    <span className="ml-4 text-gray-400">|</span>{" "}
                    {/* equal horizontal margin and matching color */}
                  </p>

                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Integration playbooks
                  </p>
                </div>
              </div>
              <div className="h-[270px] relative overflow-hidden">
                <div className="absolute top-4 left-32 right-0 bottom-0">
                  <div
                    className="bg-white/95 p-4 h-full relative overflow-hidden"
                    style={{
    border: "1.5px solid #223170",
    borderTopLeftRadius: "1rem",      
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium">
                      <Image
                        src={`/ai-page/second.png`}
                        alt="Kubiya Dashboard"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div
            className="w-full lg:w-[50%] relative group"
            onMouseEnter={() => setHoveredCard("kubiya")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
              style={{
                background:
                  "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                border: "2px solid #2f2f37",
                transition: "all 0.3s ease",
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${
                  hoveredCard === "kubiya"
                    ? "scale-[3] opacity-60"
                    : "scale-100 opacity-30"
                }`}
              ></div>

              {/* Image Placeholder */}
              <div className="p-8">
                <div className="w-16 h-16 p-4 rounded-lg bg-[#1c1f4b] -mb-8">
                  <EditIcon />
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white quicksand-bold tracking-tighter">
                    Technical Content and Blogs
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                  SEO-driven developer articles, whitepapers and product docs
                  written by engineers for engineers
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    How-to guides
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    APK / SDK documentation
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Integration playbooks
                  </p>
                </div>
              </div>
              <div className="h-80 relative overflow-hidden -mt-28">
                <div className="absolute top-32 left-32 right-0 bottom-0">
                 <div
  className="bg-white/95 p-4 h-full relative overflow-hidden"
  style={{
    border: "1.5px solid #223170",
    borderTopLeftRadius: "1rem",       // example rounding size
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium">
    <Image
      src={`/ai-page/first.png`}
      alt="Kubiya Dashboard"
      layout="fill"
      objectFit="cover"
      className="absolute inset-0 object-cover"
    />
  </div>
</div>

                </div>
              </div>
            </div>
          </div>

      
    </div>
  );
};

export default WhatWeDo;
