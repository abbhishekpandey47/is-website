import React from "react";

export default function Webtable() {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-4 px-8 mt-10 text-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        theCSS Agency vs Other Offerings
      </h1>

      <div className="w-full grid grid-cols-4 py-20 gap-12 text-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6 p-6 font-semibold justify-end">
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-bold text-white">{""}</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-base text-white">Cost</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-base text-white">Quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-base text-white">Revisions</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-base text-white">Project Starting Time</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-base text-white">Chat Communication</p>
          </div>
          <div className="w-64">
            <p className="font-base text-white">Account Manager</p>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col gap-6 text-center bg-[#080875] p-6 rounded-md justify-end items-center">
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-bold text-white">Infasity</p>
            <p className="font-medium text-white">(agency)</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Affordable</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Pixel Perfect, High-quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Unlimited</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">3 Working days</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Through Slack</p>
          </div>
          <div className="w-64">
            <p className="text-white">Yes, dedicated</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 text-center p-6 justify-end">
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-medium text-white">Freelancers</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Expensive</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Quality Varies</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Chargeable</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">1-2 weeks</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Freelance platform</p>
          </div>
          <div className="w-64">
            <p className="text-white">No</p>
          </div>
        </div>

        {/* Far Right Column */}
        <div className="flex flex-col gap-6 text-center p-6 justify-end">
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="font-medium text-white">Other Agencies</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Very expensive</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">High-quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Limited or Chargeable</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">Few weeks</p>
          </div>
          <div className="border-b border-solid border-gray-300 w-64 pb-2">
            <p className="text-white">No, usually email</p>
          </div>
          <div className="w-64">
            <p className="text-white">Yes (Additional Charge)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-[#6169FC] px-6 py-3 mt-8 rounded-md shadow-md text-white">
          <a href="https://calendly.com/meet-shan" target="_blank"> Book a Call </a>
        </button>
      </div>
    </div>
  );
}