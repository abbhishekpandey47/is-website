import React from "react";

export default function Hero() {
  const svgColor = "#afb0af";

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 pt-32 md:pt-40 w-full max-w-4xl mx-auto">
      <div className="quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-7">
        <h1 className=" max-sm:w-[95%] leading-[80px] max-sm:leading-[69px] text-left max-lg:text-center max-lg:mx-auto">
          ROI Calculator
        </h1>
      </div>

      <div className="text-white items-center justify-center quicksand-semibold lg:ml-40">
        <p className="w-3/4 max-sm:w-[90%] text-center max-lg:mx-auto">
          Calculate how much you can save by outsourcing technical content for
          your DevTool, Infra, or AI Startup,{" "}
          <span className="font-bold">in just 10 seconds.</span>
        </p>
      </div>
    </div>
  );
}
