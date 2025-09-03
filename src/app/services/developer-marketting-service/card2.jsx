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
      title: "One story, many surfaces",
      description: "A single product video can become a YouTube demo, doc embed, and short-form clip. We repurpose content across channels so nothing goes stale.",
      imageAlt: "Tools illustration",
      image: "c3.png",
      design: <div className="relative bg-black pt-8 flex flex-wrap gap-4 justify-center items-center overflow-hidden">
  {/* Gradient overlay */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at center, rgba(25,102,255,0.3), rgba(209,41,255,0.2), rgba(0,0,0,0.9))",
    }}
  ></div>
     <Pill label="Send to Slack" isPattern={false} iconUrl="https://framerusercontent.com/images/HgSJ7Rgtu1wlY4m5ugoPh27M8.svg" />
      <Pill label="Tool label" isPattern={true} />
      <Pill label="Create page" iconUrl="https://framerusercontent.com/images/deP5Emns5JYXary7hz0Icm245NY.svg" />
      <Pill label="Summarize text" iconUrl="https://framerusercontent.com/images/SwOk89pCA23qMeJlAcxU7IyRw.svg" />
      <Pill label="Create a pin" iconUrl="https://framerusercontent.com/images/eFYSSb2rsQ20Xy4Zw3hXmHafiMs.png" />
      <Pill label="Create row" iconUrl="https://framerusercontent.com/images/3NHXgLzpd82ROkKyt6peYL6OFhs.svg" />
      <Pill label="Add to new row" iconUrl="https://framerusercontent.com/images/6hAErI1Rk4yOzvuhtIqtiYkGQ.png" />
      <Pill label="Get RSS" iconUrl="https://framerusercontent.com/images/y34nsuMXQ1cGa6JUzRxXJ7jn0c.png" />
      <Pill label="Create order" iconUrl="https://framerusercontent.com/images/276WO0YitRvZ7zBTjFFeSUdqM1w.svg" />
      <Pill label="Get Stripe sales" iconUrl="https://framerusercontent.com/images/n633YieGsyurEJVRQYTV9NJkPk.png" />
      <Pill label="Create event" iconUrl="https://framerusercontent.com/images/POqrokMFJqkFZTHtUNf4gUp2Jc.png" />
      <Pill label="Send photo" iconUrl="https://framerusercontent.com/images/AivTqnTKX4huKzVYrpTTt3GELU.svg" />
      <Pill label="Create issue" iconUrl="https://framerusercontent.com/images/wNeivcUdPcU22wpDo7aZDHm5jsw.svg" />
      <Pill label="Monitor inbox" iconUrl="https://framerusercontent.com/images/ldXgClNPKa5Kf9yDz94cahCcyA.png" />
      <Pill label="Tool label" isPattern={true} />
    </div>,
    },
    {
      id: 4,
      title: "From code to community",
      description: "We connect the dots: blog posts, docs, GitHub repos, and social proof. Everything funnels back to your core goal — faster developer adoption.",
      imageAlt: "Custom requests illustration",
      image: "c4.png"
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

  // keep toggle state for each toolSet
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
        {/* Horizontal dashed lines */}
        <DashedLine className="absolute top-8 left-0 right-0" />
        <DashedLine className="absolute top-[120px] left-0 right-0" />
        <DashedLine className="absolute bottom-4 left-0 right-0" />

        {/* Vertical dashed lines */}
        <DashedLine className="absolute left-8 top-0 bottom-0" vertical />
        <DashedLine className="absolute right-8 top-0 bottom-0" vertical />

        {/* Connection crosses */}
        <ConnectionCross className="top-8 left-8 -translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-8 right-8 translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-24 left-8 -translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-24 right-8 translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="bottom-8 left-8 -translate-x-1.5 translate-y-1.5" />
        <ConnectionCross className="bottom-8 right-8 translate-x-1.5 translate-y-1.5" />

        {/* Tool sections */}
        <div className="space-y-8 py-8">
          {toolSets.map((toolSet, index) => {
            const isActive = toggles[index];
            return (
              <div key={index} className="px-10">
                {/* Header with logo + toggle */}
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

                  {/* Toggle switch */}
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

                {/* Tools row */}
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
  "https://framerusercontent.com/images/276WO0YitRvZ7zBTjFFeSUdqM1w.svg",
  "https://framerusercontent.com/images/n633YieGsyurEJVRQYTV9NJkPk.png",
  "https://framerusercontent.com/images/3NHXgLzpd82ROkKyt6peYL6OFhs.svg",
  "https://framerusercontent.com/images/SwOk89pCA23qMeJlAcxU7IyRw.svg",
  "https://framerusercontent.com/images/QBNJ7cvbiKkcxhWEs4RrY6BYT0E.png",
  "https://framerusercontent.com/images/87hLs84LpgsjaIqNbzWD38JL9b4.png",
  "https://framerusercontent.com/images/eFYSSb2rsQ20Xy4Zw3hXmHafiMs.png",
];

function OrbitLogos() {
  return (
    <div className="relative flex items-center justify-center h-[200px] w-[450px] text-white overflow-hidden">
      {/* Center logo */}
      <div className="absolute w-28 h-28 rounded-full flex items-center justify-center border border-gray-700 shadow-lg z-10">
        <span className="text-sm font-semibold">Logo</span>
      </div>

      {/* Small circle */}
      <div className="absolute w-[250px] h-[250px] rounded-full border border-gray-700 animate-spin-slow">
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

      {/* Medium circle */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-gray-700 animate-spin-slower">
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

      {/* Large circle */}
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
    <div className="relative inline-block m-1">
      <div
        className={`rounded-md px-2 py-1 flex items-center gap-1.5 transition-all duration-200
          bg-gradient-to-b from-gray-800 to-gray-900
          shadow-[0_0_0_1px_rgba(171,171,171,0.25),0_1px_2px_0_rgba(0,0,0,0.15),0_2px_5px_-1px_rgba(0,0,0,0.08),0_4px_8px_0_rgba(0,0,0,0.1)]
          dark:shadow-[0_0_0_1px_rgba(75,85,99,0.5),0_1px_2px_0_rgba(0,0,0,0.25),0_2px_5px_-1px_rgba(0,0,0,0.2),0_4px_8px_0_rgba(0,0,0,0.3)]`}
      >
        <div className="w-4 h-4 relative flex-shrink-0">
          {isPattern ? (
            <div
              className="absolute inset-0 bg-repeat bg-left-top bg-[length:64px_auto] opacity-100"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126"><path id="a" d="M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z" fill="rgb(136,136,136,0.2)" fill-rule="evenodd"/></svg>')`,
              }}
            />
          ) : iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>
        <p className="text-xs font-medium text-gray-200 whitespace-nowrap">
          {label}
        </p>
      </div>
      <div
        className={`absolute -inset-0.5 rounded-full shadow-[0_1px_7px_4px_rgb(57,209,140)] transition-opacity duration-200
          ${isSelected ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};