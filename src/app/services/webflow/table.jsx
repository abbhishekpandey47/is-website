import React from "react";

export default function Webtable() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto p-4 px-8 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        theCSS Agency vs Other Offerings
      </h1>

      <div className="w-full grid grid-cols-4 py-16 gap-8 ">
        {/* Left Column */}
        <div className="flex flex-col gap-4 p-6">
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-medium text-white">Cost</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-medium text-white">Quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-medium text-white">Revisions</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-medium text-white">Project Starting Time</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-medium text-white">Chat Communication</p>
          </div>
          <div>
            <p className="font-medium text-white">Account Manager</p>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col gap-4 text-center bg-blue-950 p-6">
          <div className="border-b border-solid border-gray-300 pb-2 ">
            <p className="font-bold text-white">Affordable</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-bold text-white">
              Pixel Perfect, High-quality
            </p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-bold text-white">Unlimited</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-bold text-white">3 Working days</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="font-bold text-white">Through Slack</p>
          </div>
          <div>
            <p className="font-bold text-white">Yes, dedicated</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 text-center p-6">
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Expensive</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Quality Varies</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Chargeable</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">1-2 weeks</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Freelance platform</p>
          </div>
          <div>
            <p className="text-white">No</p>
          </div>
        </div>

        {/* Far Right Column */}
        <div className="flex flex-col gap-4 text-center p-6">
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Very expensive</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">High-quality</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Limited or Chargeable</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">Few weeks</p>
          </div>
          <div className="border-b border-solid border-gray-300 pb-2">
            <p className="text-white">No, usually email</p>
          </div>
          <div>
            <p className="text-white">Yes (Additional Charge)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-[#6169FC] px-4 py-3 mt-8 rounded-md shadow-md text-white">
          Book a Call
        </button>
      </div>
    </div>
  );
}