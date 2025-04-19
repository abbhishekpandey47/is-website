import React from "react";
import CalendlyButton from "../service-video-production/calendlyButton";
import Image from "next/image";
import logo from "./images/logo/infrasity_logo.png";

export default function Webtable() {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-2 md:p-6 py-4 mt-10 text-sm md:text-md">
      <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-white">
        infrasity Agency vs Other Offerings
      </h1>

      {/* Mobile and Desktop table with horizontal scroll for small screens */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="min-w-[800px] grid grid-cols-4 gap-2 md:gap-16 text-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-8 p-2 md:p-8 font-semibold justify-end rounded-lg">
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-bold text-white">{""}</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-base text-white">Cost</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-base text-white">Quality</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-base text-white">Revisions</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-base text-white">Project Starting Time</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-base text-white">Chat Communication</p>
            </div>
            <div className="w-full">
              <p className="font-base text-white">Account Manager</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-4 md:gap-8 text-center p-2 md:p-10 justify-end w-full bg-[#23233b] rounded-lg">
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <span className="flex justify-center items-center">
                <Image
                  src={logo}
                  width={120}
                  height={40}
                  loading="lazy"
                  className="justify-center text-center items-center flex"
                  alt="Infrasity Logo"
                />
              </span>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Affordable</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Pixel Perfect, High-quality </p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Unlimited</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">3 Working days</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Through slack</p>
            </div>
            <div className="w-full">
              <p className="text-white">Yes, dedicated</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-8 text-center p-2 md:p-8 rounded-lg justify-end">
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-bold text-white">Freelancers</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Expensive</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Quality Varies</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Chargeable</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">1-2 weeks</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Freelance platform</p>
            </div>
            <div className="w-full">
              <p className="text-white">No</p>
            </div>
          </div>

          {/* Far Right Column */}
          <div className="flex flex-col gap-4 md:gap-8 text-center p-2 md:p-8 justify-end">
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="font-bold text-white">Other Agencies</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Very expensive</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">High-quality</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Limited or Chargeable</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">Few weeks</p>
            </div>
            <div className="border-b border-solid border-gray-300 w-full pb-2">
              <p className="text-white">No, usually email</p>
            </div>
            <div className="w-full">
              <p className="text-white">Yes (Additional Charge)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <CalendlyButton name="Book a Demo" />
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

// You can inject this style into your app using next/head or include in your CSS file