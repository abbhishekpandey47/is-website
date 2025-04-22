  import React from "react";
  import CalendlyButton from "../service-video-production/calendlyButton";
  import Image from "next/image";
  import logo from "./images/logo/infrasity_logo.png";

  export default function Webtable() {
    return (
      <div className="flex flex-col items-center max-w-7xl mx-auto p-2 md:p-6 py-4 mt-10 text-sm md:text-md">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-white pb-3 text-[16px]">
          INFRASITY Agency vs Other Offerings
        </h1>

        {/* Mobile and Desktop table with horizontal scroll for small screens */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="min-w-[800px] grid grid-cols-4 gap-4 md:gap-8 text-start">

            {/* Left Column */}
            <div className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 rounded-lg justify-start pt-3">
              <div className="border-b-2 border-solid border-[#91919b] w-full pb-8 flex items-center justify-center pt-3">
                <p className="font-bold text-white pb-3 text-[16px]">{""}</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
                <p className="font-bold text-white pb-3 text-[16px]">Cost</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
                <p className="font-bold text-white pb-3 text-[16px]">Quality</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
                <p className="font-bold text-white pb-3 text-[16px]">Revisions</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
                <p className="font-bold text-white pb-3 text-[16px]">Project Starting Time</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center">
                <p className="font-bold text-white pb-3 text-[16px]">Chat Communication</p>
              </div>
              <div className="w-full flex items-center">
                <p className="font-bold text-white pb-3 text-[16px]">Account Manager</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 justify-start w-full rounded-lg"
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
                <p className="text-white pb-3 text-[16px]">Affordable</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Pixel Perfect, High-quality</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Unlimited</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">3 Working days</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Through slack</p>
              </div>
              <div className="w-full flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Yes, dedicated</p>
              </div>
            </div> 

            <div className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 rounded-lg justify-start">
              <div className="border-b-2 border-solid border-[#91919b] w-full pb-3 flex items-center justify-center pt-3">
                <p className="font-bold text-white pb-3 text-[16px]">Freelancers</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Expensive</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Quality Varies</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Chargeable</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">1-2 weeks</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Freelance platform</p>
              </div>
              <div className="w-full flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">No</p>
              </div>
            </div>

            {/* Far Right Column */}
            <div className="flex flex-col gap-4 md:gap-6 text-center p-2 md:p-2 justify-start">
              <div className="border-b-2 border-solid border-[#91919b] w-full pb-3 flex items-center justify-center pt-3">
                <p className="font-bold text-white pb-3 text-[16px]">Other Agencies</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Very expensive</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">High-quality</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Limited or Chargeable</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Few weeks</p>
              </div>
              <div className="border-b border-solid border-gray-300 w-full pb-2 flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">No, usually email</p>
              </div>
              <div className="w-full flex items-center justify-center">
                <p className="text-white pb-3 text-[16px]">Yes (Additional Charge)</p>
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

