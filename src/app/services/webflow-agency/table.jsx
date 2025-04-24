import React from "react";
import CalendlyButton from "../service-video-production/calendlyButton";
import Image from "next/image";
import logo from "./images/logo/infrasity_logo.png";

export default function Webtable() {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-2 md:p-6 py-4 mt-10 text-sm md:text-md">
      <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-white pb-3 text-[16px]">
      Why High-Growth Startups Work With Us
      </h1>

      {/* Mobile and Desktop table with horizontal scroll for small screens */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="min-w-[800px] grid grid-cols-4 gap-4 md:gap-8 text-start">
          {/* Left Column */}
          <div
            className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 rounded-lg justify-start pt-3"
            style={{
              backgroundColor: "#141318",
              backgroundImage: `radial-gradient(circle at top left, #065f46 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              borderTop: "2px solid rgba(4, 58, 42, 0.6)",
              borderLeft: "2px solid rgba(4, 58, 42, 0.6)",
              borderRight: "2px solid rgba(60, 63, 84, 0.3)",
              borderBottom: "2px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            <div className="border-b-2 border-solid border-[#91919b] w-full pb-8 flex items-center justify-center pt-3">
              <p className="font-bold text-white pb-3 text-[16px]">{""}</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
              <p className="font-bold text-white pb-3 text-[16px]">Pricing</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
              <p className="font-bold text-white pb-3 text-[16px]">Start Time</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
              <p className="font-bold text-white pb-3 text-[16px]">Specialization</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
              <p className="font-bold text-white pb-3 text-[16px]">
              Speed to Launch
              </p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
              <p className="font-bold text-white pb-3 text-[16px]">
              Design Philosophy
              </p>
            </div>
            <div className="w-full flex items-center">
              <p className="font-bold text-white pb-3 text-[16px]">
              Collaboration Style
              </p>
            </div>
          </div>

          {/* Middle Column */}
          <div
            className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 justify-start w-full rounded-lg"
            style={{
              backgroundColor: "#141318",
              backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            }}
          >
            <div className="border-b-2 border-solid border-[#91919b] w-full pb-1 flex items-center justify-center">
              <Image
                src={logo}
                width={130}
                height={40}
                loading="lazy"
                className="justify-center text-center items-center flex pb-3 pt-3"
                alt="Infrasity Logo"
              />
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Scope-based. Per page. No retainers.</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">
              Start in 2 business days
              </p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Only B2B SaaS, infra, and AI. We know what YC-style startups need to ship fast</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">First draft in less than 7 days</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Clean. On-brand. Built to impress investors and customers.</p>
            </div>
            <div className="w-full flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Slack-native. Works like an extension of your team.</p>
            </div>
          </div>

          <div
            className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 rounded-lg justify-start"
            style={{
              backgroundColor: "#141318",
              backgroundImage: `radial-gradient(circle at top left, #4b5563 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              borderTop: "2px solid rgba(38, 43, 51, 0.6)",
              borderLeft: "2px solid rgba(38, 43, 51, 0.6)",
              borderRight: "2px solid rgba(60, 63, 84, 0.3)",
              borderBottom: "2px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            <div className="border-b-2 border-solid border-[#91919b] w-full pb-3 flex items-center justify-center pt-3">
              <p className="font-bold text-white pb-3 text-[16px]">
                Freelancers
              </p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Unpredictable. Hourly. Scope creep.</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">	Takes a week or more</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Generalists. Often not startup-ready</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Variable</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Varies widely</p>
            </div>
            <div className="w-full flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Email, DMs, WhatsApp chaos</p>
            </div>
          </div>

          {/* Far Right Column */}
          <div
            className="flex flex-col gap-4 md:gap-6 text-center rounded-lg p-2 md:p-2 justify-start"
            style={{
              backgroundColor: "#141318",
              backgroundImage: `radial-gradient(circle at top left, #1e3a8a 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              borderTop: "2px solid rgba(12, 24, 91, 0.6)",
              borderLeft: "2px solid rgba(12, 24, 91, 0.6)",
              borderRight: "2px solid rgba(60, 63, 84, 0.3)",
              borderBottom: "2px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            <div className="border-b-2 border-solid border-[#91919b] w-full pb-3 flex items-center justify-center pt-3">
              <p className="font-bold text-white pb-3 text-[16px]">
                Other Agencies
              </p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Expensive monthly retainers.</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Takes 2–3 weeks</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">
              Often built for enterprises
              </p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Slow due to approvals and layers</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">Often overdesigned</p>
            </div>
            <div className="w-full flex items-center justify-center">
              <p className="text-white pb-3 text-[16px]">
              Email chains. PM bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Add this CSS to your global styles or component
// to hide the scrollbar until user interacts with it
const scrollbarStyles = `
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;  /* Chrome, Safari and Opera */
    }
    
    .scrollbar-hide:hover::-webkit-scrollbar,
    .scrollbar-hide:active::-webkit-scrollbar,
    .scrollbar-hide:focus::-webkit-scrollbar {
      display: auto;  /* Show on interaction */
    }
  `;

// // You can inject this style into your app using next/head or include in your CSS file
