import React from "react";
import CalendlyButton from "../service-video-production/calendlyButton";
import Image from "next/image";
import logo from "./images/logo/infrasity_logo.png";

export default function Webtable() {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-6 px-1 py-4 mt-10 text-md">
       <h1 className="text-3xl font-bold mb-8 text-center text-white">
        infrasity Agency vs Other Offerings
      </h1>

      <div className="w-full grid grid-cols-4 gap-16 text-start">
        {/* Left Column */}
        <div className="flex flex-col gap-8 p-8 font-semibold justify-end rounded-lg">
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-bold text-white">{""}</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-base text-white">Cost</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-base text-white">Quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-base text-white">Revisions</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-base text-white">Project Starting Time</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-base text-white">Chat Communication</p>
          </div>
          <div className="w-72">
            <p className="font-base text-white">Account Manager</p>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col gap-8 text-center p-10 justify-end w-[350px] bg-[#23233b] rounded-lg">
          <div className="border-b border-solid border-gray-300 w-72 pb-2 ">
            <span className="flex justify-center items-center">
            <Image
              src={logo}
              width={150}
              height={50}
              loading="lazy"
              className="justify-center text-center items-center flex"
              alt="Infrasity Logo"
            />
            </span>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Affordable</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Pixel Perfect, High-quality </p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Unlimited</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">3 Working days
            </p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Through slack</p>
          </div>
          <div className="w-72">
            <p className="text-white">Yes, dedicated</p>
          </div>
        </div>


        {/* Right Column */}
        <div className="flex flex-col gap-8 text-center p-8  rounded-lg justify-end">
          <div className="border-b border-solid border-gray-300  w-72 pb-2">
            <p className="font-bold text-white">Freelancers</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Expensive</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Quality Varies</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Chargeable</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">1-2 weeks</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Freelance platform</p>
          </div>
          <div className="w-72">
            <p className="text-white">No</p>
          </div>
        </div>

        {/* Far Right Column */}
        <div className="flex flex-col gap-8 text-center p-8 justify-end">
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="font-bold text-white">Other Agencies</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Very expensive</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">High-quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Limited or Chargeable</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">Few weeks</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-72 pb-2">
            <p className="text-white">No, usually email</p>
          </div>
          <div className="w-72">
            <p className="text-white">Yes (Additional Charge)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex justify-center md:justify-start mt-6">
          <CalendlyButton name="Book a Demo" />
        </div>
      </div>
    </div>
  );
}


