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
      <div className="max-w-6xl mx-auto text-center relative z-10 py-14 ">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
          Go to market faster with use cases, landing pages, and product docs.{" "}
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto mb-8">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
          No head of marketing? No problem. We act as your GTM engine across content, docs, and site strategy.
          </p>
        </div>
      </div>
      <div className=" flex items-center justify-center p-10">
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full">
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
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "kubiya"
                  ? "scale-[3] opacity-60"
                  : "scale-100 opacity-30"
                  }`}
              ></div>

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
                      borderTopLeftRadius: "1rem",
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

          {/* Second Card*/}
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
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "kubiya"
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
                    Webflow Development
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                 Landing pages and websites tailored to B2B SaaS/DevTools, delivered fast - often under a week.
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light flex items-center">
                   Responsive design 
                    <span className="ml-4 text-gray-400">|</span>{" "}
                  </p>

                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light flex items-center">
                    Conversion Focused 
                    <span className="ml-4 text-gray-400">|</span>{" "}
                  </p>

                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    SEO Driven
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
      <div className="flex items-center justify-center">
        <div
          className="w-[90%]"
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
            <div
              className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "kubiya"
                ? "scale-[3] opacity-60"
                : "scale-100 opacity-30"
                }`}
            ></div>

            <div className="flex">
              {/* Left Side - Content */}
              <div className="flex-1 p-8">
                <div className="w-16 h-16 p-4 rounded-lg bg-[#1c1f4b] mb-6">
                  <EditIcon />
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white quicksand-bold tracking-tighter">
                    Explainer & Demo Videos
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                  Product demos, walkthroughs, and use-case explainers crafted by our engineers.
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Product demos
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Technical Walkthroughs
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <RightIcon />
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    User friendly stories
                  </p>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="flex-1">
                <div className="h-full min-h-[200px] top-10 left-4 bottom-0 right-0 relative overflow-hidden rounded-xl">
                  <div
                    className=" p-4 h-full relative overflow-hidden rounded-xl"
                    style={{
                      border: "1.5px solid #223170",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center text-slate-600 text-lg font-medium rounded-xl">
                      <Image
                        src={`/ai-page/third.png`}
                        alt="Kubiya Dashboard"
                        height={500}
                        width={600}
                        className="absolute inset-0 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-10 bg-gray-900 min-h-screen pb-20">
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full">
          {/* First Card */}
          <div
            className="w-full lg:w-[70%] relative group"
            onMouseEnter={() => setHoveredCard("usecase")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
              style={{
                background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                border: "2px solid #2f2f37",
                transition: "all 0.3s ease",
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "usecase" ? "scale-[3] opacity-60" : "scale-100 opacity-30"
                  }`}
              ></div>

              {/* Icon */}
              <div className="p-8">
                <div className="w-16 h-16 p-4 rounded-lg bg-[#1c1f4b] flex items-center justify-center text-white">
                  <EditIcon />
                </div>
              </div>

              {/* Content */}
              <div className="px-8 -mb-20">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white tracking-tighter">
                    Use Case Libraries
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                  Product use-case and quickstart libraries showing customers how to solve real problems.
                </p>

                <div className="flex items-center space-x-3 mb-2 ">
                  <div className="text-purple-400">
                    <RightIcon />
                  </div>
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Integration tutorials
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-purple-400">
                    <RightIcon />
                  </div>
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    CLI Documentation
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-purple-400">
                    <RightIcon />
                  </div>
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Step-by-step guides
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="pl-8 pt-8">
                <div className="h-72 right-0 bottom-0 left-60 top-0 relative overflow-hidden rounded-tl-2xl">
                  <div
                    className="h-full relative overflow-hidden rounded-tl-2xl"
                    style={{
                      border: "1.5px solid #223170",
                    }}
                  >
                    <Image
                      src={`/ai-page/use.png`}
                      alt="Kubiya Dashboard"
                      width={500}
                      height={300}
                      objectFit="cover"
                      className="absolute inset-0 right-0 bottom-0 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card  */}
          <div
            className="w-full lg:w-[30%] relative group"
            onMouseEnter={() => setHoveredCard("launch")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
              style={{
                background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                border: "2px solid #2f2f37",
                transition: "all 0.3s ease",
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === "launch" ? "scale-[3] opacity-60" : "scale-100 opacity-30"
                  }`}
              ></div>

              {/* Icon */}
              <div className="p-8">
                <div className="w-16 h-16 p-4 rounded-lg bg-[#1c1f4b] flex items-center justify-center text-white">
                  <EditIcon />
                </div>
              </div>

              {/* Content */}
              <div className="px-8 -mb-7">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-white tracking-tighter">
                    Launch Campaigns
                  </h2>
                </div>

                <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                  Coordinated go-to-market campaigns with launch collateral and community distribution.
                </p>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-purple-400">
                    <RightIcon />
                  </div>
                  <p className="text-sm text-gray-400 tracking-wider font-light flex items-center">
                    Product Hunt launches
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-purple-400">
                    <RightIcon />
                  </div>
                  <p className="text-sm text-gray-400 tracking-wider font-light flex items-center">
                    Dev community seeding
                  </p>
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-purple-400">
                    <RightIcon />
                  </div>
                  <p className="text-sm text-gray-400 tracking-wider font-light">
                    Reddit engagement
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="pt-8 pl-8">
                <div className="relative h-48 bottom-0 right-0 w-full">
                  <div
                    className="bg-white/95 p-4 h-full relative overflow-hidden rounded-tl-2xl"
                    style={{
                      border: "1.5px solid #223170",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium rounded-tl-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center rounded-tl-2xl">
                        <Image
                          src={`/ai-page/launch.png`}
                          alt="Kubiya Dashboard"
                          layout="fill"
                          objectFit="cover"
                          className="absolute inset-0 object-cover"
                        />                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    </div>
  );
};

export default WhatWeDo;
