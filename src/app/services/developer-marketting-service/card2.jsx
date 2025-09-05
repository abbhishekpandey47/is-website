"use client"

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const FeatureCards = () => {
  const cards = [
    {
      id: 1,
      title: "Ship product knowledge, not just features",
      description: "Developer adoption depends on crisp docs, release notes, and GitHub examples. We build these so your product is discoverable and usable from day one.",
      imageAlt: "MCP servers illustration",
      image: "c1.png",
      design: < MCPToolsInterface />
    },
    {
      id: 2,
      title: "Show up where developers are",
      description: "From Reddit to GitHub Discussions, we seed conversations that spark trust. No spam, just consistent engagement where your users already live.",
      imageAlt: "Auth management illustration",
      image: "c2.png",
      design: <OrbitLogos />
    },
    {
      id: 3,
      title: "Content Developers Actually Read",
      description: "From hands-on tutorials to comparison blogs and SDK examples, Infrasity creates the content that answers developer questions and builds long-term trust.",
      imageAlt: "Tools illustration",
      image: "c3.png",
      design: <div className="relative w-full flex flex-wrap justify-center bg-black overflow-hidden min-h-[200px] -mb-5 mt-5">
      {/* Pills (visible) */}
      <div className="relative z-10 flex flex-wrap justify-center gap-0 px-6">
     <Pill label="“How-to Guide" isPattern={false} iconUrl="https://framerusercontent.com/images/HgSJ7Rgtu1wlY4m5ugoPh27M8.svg" />
      <Pill label="Comparison" isPattern={true} />
      <Pill label="Release Note" iconUrl="https://framerusercontent.com/images/deP5Emns5JYXary7hz0Icm245NY.svg" />
      <Pill label="Tutorial" iconUrl="https://framerusercontent.com/images/SwOk89pCA23qMeJlAcxU7IyRw.svg" />
      <Pill label="Explainer" iconUrl="https://framerusercontent.com/images/eFYSSb2rsQ20Xy4Zw3hXmHafiMs.png" />
      <Pill label="Integration Example" iconUrl="https://framerusercontent.com/images/3NHXgLzpd82ROkKyt6peYL6OFhs.svg" />
      <Pill label="SDK Docs" iconUrl="https://framerusercontent.com/images/6hAErI1Rk4yOzvuhtIqtiYkGQ.png" />
      <Pill label="How-to Guide" iconUrl="https://framerusercontent.com/images/y34nsuMXQ1cGa6JUzRxXJ7jn0c.png" />
      <Pill label="Comparison" iconUrl="https://framerusercontent.com/images/276WO0YitRvZ7zBTjFFeSUdqM1w.svg" />
      <Pill label="Release Note" iconUrl="https://framerusercontent.com/images/deP5Emns5JYXary7hz0Icm245NY.svg" />
      <Pill label="Tutorial" iconUrl="https://framerusercontent.com/images/SwOk89pCA23qMeJlAcxU7IyRw.svg" />
      <Pill label="Explainer" iconUrl="https://framerusercontent.com/images/eFYSSb2rsQ20Xy4Zw3hXmHafiMs.png" />
      <Pill label="Integration Example" iconUrl="https://framerusercontent.com/images/3NHXgLzpd82ROkKyt6peYL6OFhs.svg" />
      <Pill label="SDK Docs" iconUrl="https://framerusercontent.com/images/6hAErI1Rk4yOzvuhtIqtiYkGQ.png" />
  
           </div>

      {/* Enhanced Black Fade-out overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at center center, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%),
            linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 5%, transparent 25%, transparent 95%, rgba(0,0,0,0.9) 95%, rgba(0,0,0,1) 100%),
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 5%, transparent 25%, transparent 75%, rgba(0,0,0,0.9) 95%, rgba(0,0,0,1) 100%)
          `
        }}
      />
    </div>,
    },
    {
      id: 4,
      title: "From One Video to Many Surfaces",
      description: "We turn a single demo into YouTube explainers, doc embeds, shorts, and landing page assets — giving your product visibility everywhere developers learn.",
      imageAlt: "Custom requests illustration",
      image: "c4.png",
      design: <DarkPipedreamDiagram />
    }
  ];

  return (
   <div className="p-6">
  <div className="max-w-5xl mx-auto relative">
    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-pink-500/5 via-pink-300 to-pink-500/5 shadow-pink-400/50"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-20">
      {cards.map((card) => (
        <div
          key={card.id}
          className="g-gray-800 rounded-lg border border-gray-700 pb-6 shadow-sm shadow-white/30 transition-shadow duration-200"
        >
          <div className="mb-6">
            {card.design ? (
              <div>{card.design}</div>
            ) : (
              <img
                src={`/landingfolio/${card.image}`}
                alt={card.imageAlt}
                className="w-full h-full rounded"
              />
            )}
          </div>

          {/* Title */}
          <div className="px-5">
            <h3 className="text-lg font-semibold text-white mb-3">
              {card.title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {card.description}
            </p>

            <button className="px-5 py-2 text-sm font-medium text-gray-200 bg-gray-700/20 border border-gray-600 rounded-md hover:bg-gray-600/30 hover:border-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800">
              Learn more
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default FeatureCards;


const MCPToolsInterface = () => {
  const toolSets = [
    {
      logo: "https://framerusercontent.com/images/deP5Emns5JYXary7hz0Icm245NY.svg",
      tools: ["Docs", "Release Notes", "Sample Apps"],
      extraCount: 6,
      name: "Surfaces"
    },
    {
      logo: "https://framerusercontent.com/images/wNeivcUdPcU22wpDo7aZDHm5jsw.svg",
      tools: ["API References", "Guides", "Changelog"],
      extraCount: 12,
      name: "Outputs"
    }
  ];

  const [toggles, setToggles] = useState(toolSets.map(() => true));

  const toggleSwitch = (index) => {
    setToggles((prev) =>
      prev.map((t, i) => (i === index ? !t : t))
    );
  };

  const DashedLine = ({ className, vertical = false }) => (
    <div className={`${className} ${vertical ? "w-px h-full" : "h-px w-full"}`}>
      <svg
        className="w-full h-full"
        viewBox={vertical ? "0 0 1 100" : "0 0 100 1"}
        preserveAspectRatio="none"
      >
        <path
          d={vertical ? "M 0.5 0 L 0.5 100" : "M 0 0.5 L 100 0.5"}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  const ConnectionCross = ({ className }) => (
    <div
      className={`absolute ${className} w-3 h-3 flex items-center justify-center`}
    >
      <div className="absolute w-3 h-px bg-white/15"></div>
      <div className="absolute w-px h-3 bg-white/15"></div>
    </div>
  );

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 text-white -mb-10">
      <div className="relative">
        <DashedLine className="absolute top-8 left-0 right-0" />
        <DashedLine className="absolute top-[120px] left-0 right-0" />
        <DashedLine className="absolute bottom-4 left-0 right-0" />

        <DashedLine className="absolute left-8 top-0 bottom-0" vertical />
        <DashedLine className="absolute right-8 top-0 bottom-0" vertical />

        <ConnectionCross className="top-8 left-8 -translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-8 right-8 translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-24 left-8 -translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-24 right-8 translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="bottom-8 left-8 -translate-x-1.5 translate-y-1.5" />
        <ConnectionCross className="bottom-8 right-8 translate-x-1.5 translate-y-1.5" />

        <div className="space-y-8 py-8">
          {toolSets.map((toolSet, index) => {
            const isActive = toggles[index];
            return (
              <div key={index} className="px-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-sm overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center">
                      <img
                        src={toolSet.logo}
                        alt="Service logo"
                        className="w-4 h-4 object-contain filter brightness-0 invert"
                      />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">
                      {toolSet.name}
                    </span>
                  </div>

                  <div
                    className={`relative cursor-pointer`}
                    onClick={() => toggleSwitch(index)}
                  >
                    <div
                      className={`w-11 h-6 rounded-full shadow-sm flex items-center px-0.5 transition-colors duration-200
                        ${isActive ? "bg-emerald-500 justify-end" : "bg-gray-600 justify-start"}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center space-x-2 flex-wrap transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-40 grayscale"
                  }`}
                >
                  {toolSet.tools.map((tool, toolIndex) => (
                    <div
                      key={toolIndex}
                      className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm font-mono whitespace-nowrap"
                    >
                      {tool}
                    </div>
                  ))}

                  <div className="text-gray-400 text-sm font-medium ml-1">
                    +{toolSet.extraCount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



const circle1 = [
  "/landingfolio/reddita.svg",
  "/landingfolio/github.png",
  "/landingfolio/dev.webp",
  "/landingfolio/stack.png",
  "/landingfolio/chatpng.png",
];

const circle2 = [
  "/landingfolio/y.svg",
  "/landingfolio/Discord.png",
  "/landingfolio/share.png",
  "/landingfolio/people.png",
  "/landingfolio/upvote.jpeg",
];

const circle3 = [
    "/landingfolio/y.svg",
  "/landingfolio/Discord.png",
  "/landingfolio/share.png",
  "/landingfolio/people.png",
  "/landingfolio/upvote.jpeg",
];

function OrbitLogos() {
  return (
    <div className="relative flex items-center justify-center h-[200px] w-[450px] text-white overflow-hidden mb-12 pt-40">
      {/* Center logo */}
      <div className="absolute w-28 h-28 rounded-full flex items-center justify-center  shadow-lg z-10">
         <Image
                alt="Center Logo"
                src="/CommLogo/infrasity-small-logo.svg"
                width={32}
                height={32}
                className="rounded-full object-cover"
         />
      </div>

      <div className="absolute w-[250px] h-[250px] rounded-full border border-gray-700 animate-spin-slowest">
        {circle1.map((src, i) => {
          const angle = (i / circle1.length) * 360;
          return (
            <div
              key={i}
              className="absolute w-8 h-8 -ml-4 -mt-4"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(125px) rotate(-${angle}deg)`,
              }}
            >
              <Image
                src={src}
                alt={`logo1-${i}`}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>
          );
        })}
      </div>
<div className="absolute w-[400px] h-[400px] rounded-full border border-gray-700 animate-spin-reverse">
  {circle2.map((src, i) => {
    const angle = (i / circle2.length) * 360;
    return (
      <div
        key={i}
        className="absolute w-8 h-8 -ml-4 -mt-4"
        style={{
          top: "50%",
          left: "50%",
          transform: `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`,
        }}
      >
        <Image
          src={src}
          alt={`logo2-${i}`}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </div>
    );
  })}
</div>


      <div className="absolute w-[550px] h-[550px] rounded-full border border-gray-700 animate-spin-slowest">
        {circle3.map((src, i) => {
          const angle = (i / circle3.length) * 360;
          return (
            <div
              key={i}
              className="absolute w-8 h-8 -ml-4 -mt-4"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(275px) rotate(-${angle}deg)`,
              }}
            >
              <Image
                src={src}
                alt={`logo3-${i}`}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}


const Pill = ({ label, iconUrl, isPattern = false, isSelected = false }) => {
  return (
    <div className="relative inline-block m-1 group">
      <div
        className={`rounded-md px-2 py-1 flex items-center gap-1.5 transition-all duration-300
          bg-gradient-to-b from-gray-800 to-gray-900
          shadow-[0_0_0_1px_rgba(171,171,171,0.25),0_1px_2px_0_rgba(0,0,0,0.15),0_2px_5px_-1px_rgba(0,0,0,0.08),0_4px_8px_0_rgba(0,0,0,0.1)]
          dark:shadow-[0_0_0_1px_rgba(75,85,99,0.5),0_1px_2px_0_rgba(0,0,0,0.25),0_2px_5px_-1px_rgba(0,0,0,0.2),0_4px_8px_0_rgba(0,0,0,0.3)]
          relative overflow-hidden`}
      >
        <div className="w-4 h-8 relative flex-shrink-0">
          {isPattern ? (
            <div
              className="absolute inset-0 bg-repeat bg-left-top bg-[length:64px_auto] opacity-100"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126"><path id="a" d="M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z" fill="rgb(136,136,136,0.2)" fill-rule="evenodd"/></svg>')`,
              }}
            />
          ) : iconUrl ? (
            <img src={iconUrl} alt="" className="w-full h-full object-contain" />
          ) : null}
        </div>

        {/* Label */}
        <p className="text-lgs font-medium text-gray-200 whitespace-nowrap">
          {label}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-emerald-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div
        className={`absolute -inset-0.5 rounded-full shadow-[0_1px_7px_4px_rgb(57,209,140)] transition-opacity duration-200
          ${isSelected ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};





const DarkPipedreamDiagram = () => {
 return (
 <div className="flex items-center justify-center bg-black text-white mt-10 mb-32">
 <style>{`
 .dashed-line {
 animation: dash-move 2s linear infinite;
 }
 @keyframes dash-move {
 from {
 stroke-dashoffset: 0;
 }
 to {
 stroke-dashoffset: -18.4;
 }
 }
 `}</style>
 <div className="flex items-center relative">
 <div className="border border-gray-600 rounded-lg p-4">
 <p className="font-medium text-lg">Your app</p>
 <div className="flex space-x-2 mt-2">
 <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path
 d="M 1.031 0 C 0.46 0 0 0.46 0 1.031 L 0 20.969 C 0 21.54 0.46 22 1.031 22 L 20.969 22 C 21.54 22 22 21.54 22 20.969 L 22 1.031 C 22 0.46 21.54 0 20.969 0 Z M 16.947 8.938 C 17.508 8.938 18.005 8.971 18.439 9.039 C 18.848 9.101 19.249 9.205 19.636 9.351 L 19.636 11.604 C 19.45 11.476 19.253 11.365 19.047 11.273 C 18.834 11.177 18.614 11.098 18.389 11.035 C 17.964 10.916 17.524 10.855 17.082 10.852 C 16.807 10.852 16.557 10.877 16.331 10.93 C 16.13 10.973 15.938 11.048 15.76 11.152 C 15.604 11.248 15.485 11.362 15.4 11.495 C 15.314 11.629 15.27 11.785 15.272 11.944 C 15.272 12.124 15.32 12.286 15.415 12.429 C 15.51 12.572 15.646 12.708 15.821 12.836 C 15.996 12.964 16.209 13.089 16.459 13.212 C 16.709 13.336 16.992 13.463 17.308 13.593 C 17.738 13.774 18.125 13.966 18.468 14.169 C 18.811 14.372 19.105 14.603 19.351 14.859 C 19.597 15.115 19.784 15.407 19.914 15.736 C 20.044 16.066 20.11 16.448 20.11 16.885 C 20.11 17.487 19.995 17.994 19.768 18.403 C 19.546 18.806 19.227 19.148 18.84 19.398 C 18.423 19.662 17.961 19.847 17.477 19.944 C 16.958 20.054 16.411 20.109 15.836 20.109 C 15.271 20.111 14.706 20.061 14.15 19.959 C 13.668 19.875 13.202 19.723 12.764 19.507 L 12.764 17.096 C 13.592 17.801 14.643 18.19 15.731 18.196 C 16.036 18.196 16.303 18.168 16.53 18.113 C 16.758 18.058 16.948 17.981 17.101 17.884 C 17.254 17.785 17.367 17.67 17.443 17.536 C 17.615 17.218 17.588 16.829 17.375 16.538 C 17.239 16.357 17.073 16.202 16.883 16.079 C 16.648 15.923 16.401 15.787 16.143 15.672 C 15.838 15.533 15.531 15.4 15.22 15.273 C 14.379 14.922 13.752 14.492 13.338 13.985 C 12.926 13.478 12.719 12.865 12.719 12.147 C 12.719 11.584 12.832 11.101 13.057 10.697 C 13.282 10.292 13.589 9.96 13.977 9.698 C 14.388 9.427 14.845 9.232 15.325 9.122 C 15.856 8.996 16.401 8.935 16.947 8.938 Z M 3.094 9.11 L 11.86 9.11 L 11.86 11.095 L 8.714 11.095 L 8.714 19.938 L 6.223 19.938 L 6.223 11.095 L 3.094 11.095 Z"
 fill="rgb(255, 255, 255)"
 />
 </svg>
 <svg className="w-6 h-6" viewBox="0 0 22.11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path
 d="M 13.118 0.165 L 13.943 0.348 L 14.612 0.587 L 15.153 0.862 L 15.565 1.155 L 15.877 1.467 L 16.106 1.778 L 16.253 2.081 L 16.344 2.356 L 16.381 2.594 L 16.399 2.778 L 16.39 2.897 L 16.39 7.792 L 16.344 8.369 L 16.225 8.873 L 16.032 9.295 L 15.794 9.643 L 15.519 9.927 L 15.217 10.157 L 14.896 10.331 L 14.575 10.459 L 14.272 10.551 L 13.997 10.615 L 13.759 10.652 L 13.567 10.67 L 8.094 10.67 L 7.462 10.716 L 6.921 10.844 L 6.462 11.046 L 6.087 11.293 L 5.784 11.587 L 5.537 11.908 L 5.353 12.237 L 5.216 12.577 L 5.124 12.898 L 5.06 13.191 L 5.023 13.438 L 5.005 13.631 L 5.005 16.436 L 2.961 16.436 L 2.768 16.408 L 2.512 16.344 L 2.218 16.234 L 1.897 16.069 L 1.567 15.831 L 1.237 15.501 L 0.917 15.079 L 0.623 14.538 L 0.367 13.869 L 0.174 13.063 L 0.046 12.1 L 0 10.972 L 0.055 9.854 L 0.202 8.901 L 0.422 8.103 L 0.715 7.452 L 1.045 6.93 L 1.412 6.527 L 1.797 6.224 L 2.182 6.004 L 2.548 5.858 L 2.878 5.766 L 3.172 5.72 L 3.392 5.711 L 3.538 5.711 L 3.593 5.72 L 11.073 5.72 L 11.073 4.959 L 5.72 4.959 L 5.711 2.438 L 5.692 2.099 L 5.738 1.788 L 5.839 1.503 L 5.995 1.247 L 6.224 1.008 L 6.508 0.798 L 6.857 0.614 L 7.26 0.449 L 7.728 0.312 L 8.259 0.202 L 8.846 0.11 L 9.497 0.055 L 10.202 0.018 L 10.972 0 L 12.137 0.046 Z M 7.342 1.98 L 7.132 2.282 L 7.058 2.658 L 7.132 3.034 L 7.342 3.346 L 7.645 3.547 L 8.021 3.63 L 8.397 3.547 L 8.699 3.346 L 8.91 3.034 L 8.983 2.658 L 8.91 2.282 L 8.699 1.98 L 8.397 1.778 L 8.021 1.696 L 7.645 1.778 Z M 19.342 5.601 L 19.598 5.656 L 19.892 5.766 L 20.213 5.931 L 20.543 6.178 L 20.873 6.499 L 21.193 6.93 L 21.487 7.471 L 21.743 8.14 L 21.936 8.947 L 22.064 9.9 L 22.11 11.027 L 22.055 12.155 L 21.908 13.108 L 21.688 13.897 L 21.395 14.547 L 21.065 15.07 L 20.698 15.482 L 20.313 15.785 L 19.928 16.005 L 19.562 16.152 L 19.232 16.234 L 18.938 16.28 L 18.718 16.298 L 18.572 16.289 L 11.037 16.289 L 11.037 17.041 L 16.39 17.041 L 16.399 19.571 L 16.418 19.901 L 16.372 20.212 L 16.271 20.497 L 16.115 20.762 L 15.886 20.992 L 15.602 21.212 L 15.253 21.395 L 14.85 21.551 L 14.383 21.688 L 13.851 21.807 L 13.264 21.89 L 12.613 21.954 L 11.908 21.991 L 11.138 22 L 9.973 21.963 L 8.993 21.835 L 8.168 21.652 L 7.498 21.422 L 6.958 21.147 L 6.545 20.845 L 6.233 20.533 L 6.004 20.222 L 5.858 19.919 L 5.766 19.644 L 5.729 19.415 L 5.711 19.232 L 5.72 19.112 L 5.72 14.217 L 5.766 13.631 L 5.885 13.136 L 6.078 12.714 L 6.316 12.366 L 6.591 12.072 L 6.893 11.852 L 7.214 11.669 L 7.535 11.541 L 7.838 11.449 L 8.113 11.394 L 8.351 11.357 L 8.543 11.339 L 8.663 11.33 L 14.016 11.33 L 14.648 11.284 L 15.189 11.156 L 15.648 10.963 L 16.023 10.707 L 16.326 10.413 L 16.573 10.092 L 16.757 9.762 L 16.894 9.432 L 16.986 9.112 L 17.05 8.818 L 17.087 8.562 L 17.105 8.369 L 17.105 5.564 L 19.021 5.564 L 19.149 5.573 Z M 13.411 18.663 L 13.2 18.966 L 13.127 19.342 L 13.2 19.718 L 13.411 20.02 L 13.713 20.231 L 14.089 20.304 L 14.465 20.231 L 14.768 20.02 L 14.978 19.718 L 15.052 19.342 L 14.978 18.966 L 14.768 18.663 L 14.465 18.453 L 14.089 18.379 L 13.713 18.453 Z"
 fill="rgb(255, 255, 255)"
 />
 </svg>
 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <g>
 <path d="M 0 0 L 24 0 L 24 24 L 0 24 Z" fill="transparent" />
 <path
 d="M 8.717 18.555 C 8.717 18.555 7.794 19.116 9.358 19.276 C 11.24 19.516 12.243 19.477 14.327 19.076 C 14.745 19.333 15.188 19.547 15.649 19.717 C 10.961 21.721 5.03 19.597 8.717 18.555 Z M 8.116 15.95 C 8.116 15.95 7.114 16.712 8.677 16.873 C 10.721 17.073 12.324 17.113 15.09 16.553 C 15.359 16.825 15.688 17.031 16.051 17.153 C 10.401 18.836 4.069 17.313 8.116 15.95 Z M 19.177 20.518 C 19.177 20.518 19.858 21.079 18.416 21.52 C 15.731 22.322 7.155 22.562 4.751 21.52 C 3.909 21.16 5.512 20.638 6.026 20.558 C 6.547 20.438 6.828 20.438 6.828 20.438 C 5.906 19.797 0.697 21.76 4.184 22.321 C 13.761 23.884 21.656 21.64 19.171 20.518 Z M 9.15 13.225 C 9.15 13.225 4.782 14.267 7.587 14.627 C 8.789 14.788 11.153 14.747 13.357 14.587 C 15.16 14.427 16.965 14.107 16.965 14.107 C 16.965 14.107 16.324 14.388 15.883 14.668 C 11.435 15.831 2.899 15.31 5.344 14.107 C 7.427 13.105 9.151 13.226 9.151 13.226 Z M 16.965 17.593 C 21.453 15.268 19.369 13.025 17.926 13.305 C 17.566 13.385 17.405 13.465 17.405 13.465 C 17.405 13.465 17.525 13.225 17.806 13.145 C 20.651 12.143 22.895 16.15 16.883 17.713 C 16.883 17.713 16.923 17.673 16.963 17.593 Z M 9.592 23.924 C 13.92 24.205 20.533 23.764 20.692 21.719 C 20.692 21.719 20.372 22.522 17.126 23.122 C 13.439 23.803 8.871 23.722 6.186 23.282 C 6.186 23.282 6.747 23.763 9.592 23.924 Z"
 fill="rgb(255, 255, 255)"
 />
 <path
 d="M 14.247 0.001 C 14.247 0.001 16.732 2.525 11.883 6.332 C 7.996 9.418 11.002 11.181 11.883 13.185 C 9.598 11.141 7.956 9.338 9.078 7.655 C 10.72 5.17 15.249 3.975 14.247 0.001 Z M 12.972 11.502 C 14.135 12.824 12.652 14.026 12.652 14.026 C 12.652 14.026 15.617 12.504 14.255 10.62 C 13.013 8.817 12.05 7.935 17.26 4.93 C 17.26 4.93 9.045 6.973 12.972 11.502 Z"
 fill="rgb(255, 255, 255)"
 />
 </g>
 </svg>
 </div>
 </div>

 <svg className="w-32 h-20" viewBox="0 0 115 80" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(0 39.95)">
 <path class="dashed-line" d="M 0 0 L 115 0" fill="transparent" stroke="rgb(255, 255, 255)" strokeDasharray="9.2 9.2" stroke-linecap="butt" stroke-width="1" />
 </g>
 </svg>

 <div className="w-2 h-2 bg-white rounded-full"></div>

 <div className="relative bg-green-500 rounded-md p-4">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-green-500 bg-gray-900 rounded-xl p-2">
 Pipedream Connect
 </div>
 </div>

 <svg className="w-32 h-32" viewBox="0 0 102.5 183" xmlns="http://www.w3.org/2000/svg">
 <g>
 <path d="M 0 93.759 L 0.504 93.645 L 39.972 93.712 C 55.146 93.738 67.461 81.444 67.461 66.27 L 67.461 34.302 C 67.461 15.358 82.818 0 101.763 0 L 101.763 0" fill="transparent" stroke="rgb(57, 209, 140)" />
 <path d="M 0 93.759 L 0.504 93.645 L 40.066 93.712 C 55.203 93.738 67.461 106.017 67.461 121.154 L 67.461 144.069 C 67.461 163.013 82.818 178.371 101.763 178.371 L 101.763 178.371" fill="transparent" stroke="rgb(57, 209, 140)" />
 <path d="M 5.717 93.645 L 101.763 93.759" fill="transparent" stroke="rgb(57, 209, 140)" />
 </g>
 </svg>

 <div className="flex flex-col space-y-4">
 <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg p-2">
 <svg className="w-5 h-5" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
 </svg>
 </div>

 <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg p-2">
 <img src="https://framerusercontent.com/images/fOGS30H04nLKlVAy0oNDZKH6o.png" alt="Salesforce" className="w-5 h-5" />
 </div>

 <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg p-2 mt-5">
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><g clip-path="url(#a)"><path fill="#fff" d="M22.606 10.245a5.986 5.986 0 0 0-.516-4.91 6.047 6.047 0 0 0-6.51-2.9 6.065 6.065 0 0 0-10.275 2.17 5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .511 4.91 6.051 6.051 0 0 0 6.515 2.901 5.983 5.983 0 0 0 4.508 2.01 6.056 6.056 0 0 0 5.772-4.205 5.99 5.99 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073Zm-9.022 12.608a4.475 4.475 0 0 1-2.876-1.04l.142-.081 4.778-2.758a.795.795 0 0 0 .393-.682v-6.737l2.02 1.169a.072.072 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494Zm-9.66-4.125a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.758a.772.772 0 0 0 .78 0l5.843-3.368v2.332a.081.081 0 0 1-.033.062l-4.84 2.791a4.5 4.5 0 0 1-6.14-1.646ZM2.664 8.319A4.485 4.485 0 0 1 5.03 6.347v5.677a.766.766 0 0 0 .387.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786a4.504 4.504 0 0 1-1.647-6.141v.023Zm16.596 3.856-5.833-3.387 2.015-1.164a.076.076 0 0 1 .072 0l4.83 2.791a4.495 4.495 0 0 1-.677 8.104v-5.677a.79.79 0 0 0-.407-.667Zm2.011-3.023-.142-.085-4.773-2.782a.776.776 0 0 0-.786 0L9.733 9.653V7.321a.066.066 0 0 1 .029-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.02Zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.498a4.5 4.5 0 0 1 7.375-3.454l-.142.08-4.778 2.759a.795.795 0 0 0-.392.681l-.005 6.723Zm1.097-2.366 2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5-.005-3Z"/></g><defs><clipPath id="a"><path fill="#fffff" d="M.324.424h24v24h-24z"/></clipPath></defs></svg>
 </div>
 </div>
 </div>
 </div>
 );
};