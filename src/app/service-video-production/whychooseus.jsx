import { useState, useEffect } from "react";

export default function SaasGlassyBoxes() {
  // First row boxes
  const firstRow = [
    {
      icon: "home",
      title: "Get a SaaS-specific expert team",
      description:
        "Unlike traditional agencies that produce videos for all kinds of industries, we only work with SaaS companies. There's no one-size-fits-all approach here.",
    },
    {
      icon: "code",
      title: "Launch new campaigns or refresh old ads",
      description:
        "Emotionally engage and convert your audience with eye-catching videos and GIFs, or refresh your campaigns with improved video ads.",
    },
    {
      icon: "users",
      title: "Video testing and experimentation",
      description:
        "Find out which video ad, messaging, product, or campaigns resonate the most with your audience by following a proven framework for A/B testing and experimentation.",
    },
  ];

  // Second row boxes
  const secondRow = [
    {
      icon: "pie-chart",
      title: "Manage everything in one place",
      description:
        "Get everything taken care of — from script and storyboarding to talent sourcing and production. We also look after music sourcing and licensing for you.",
    },
    {
      icon: "zap",
      title: "Reduce efforts for your in-house team",
      description:
        "Produce videos with our professional motion graphics designer, senior copywriter, and creative director to help your internal team save time and prioritize what matters most.",
    },
  ];

  // Icons mapping using img tags
  const getIcon = (iconName) => {
    const iconMap = {
      home: "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336c6b18c45f5075d19cec6_experts.svg",
      code: "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336be210025631469370345_social-ads-icon.svg",
      users:
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336be1ff798eeb3cad3b6e2_video-ad-icon.svg",
      "pie-chart":
        "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/6336c6d2b2a17b201ab2bc4a_reporting.svg",
      zap: "https://cdn.prod.website-files.com/5edfe73de8531a5ba0827643/5edfe73de8531a45bb827755_box-icon-2.svg",
    };

    return iconMap[iconName] || "/api/placeholder/24/24";
  };

  // Responsive GlassyBox component
  const GlassyBox = ({ title, description, icon }) => {
    return (
      <div
        className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-md 
        rounded-2xl p-5 border border-gray-700 shadow-lg m-2
        w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20rem)]"
      >
        <div className="bg-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
          <img
            src={getIcon(icon)}
            alt={`${icon} icon`}
            className="w-5 h-5 text-white"
          />
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
      </div>
    );
  };

  return (
    <div className="max-w-[1566px] mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-white text-lg md:text-xl">WHY INFRASITY?</h2>
        <p className="quicksand-bold text-3xl md:text-4xl text-white mb-2">
          We drive growth for your <br /> B2B SaaS {"  "}
          <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">
            with video ads
          </span>
        </p>
      </div>
      <div
        className="py-12 relative"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #111113, #1b1b1f, #18151e, #0d0a1a)",
        }}
      >
        {/* First Row - max of 3 boxes */}
        <div className="flex flex-wrap justify-center px-4 sm:px-6 max-w-7xl mx-auto">
          {firstRow.map((box, index) => (
            <GlassyBox
              key={`first-${index}`}
              icon={box.icon}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>

        {/* Second Row - max of 2 boxes */}
        <div className="flex flex-wrap justify-center px-4 sm:px-6 mt-4 max-w-7xl mx-auto">
          {secondRow.map((box, index) => (
            <GlassyBox
              key={`second-${index}`}
              icon={box.icon}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
