import React from "react";

export default function Hero() {
  const svgColor = "#afb0af";

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 pt-32 md:pt-40 w-full max-w-4xl mx-auto">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4 md:mt-8 mb-4 md:mb-6">
          ROI Calculator
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300 mt-2 md:mt-4 mb-8 md:mb-12 leading-relaxed">
          Calculate how much you can save by outsourcing technical content for
          your DevTool, Infra, or AI Startup, in just 10 seconds.
        </p>
      </div>
    </div>
  );
}
