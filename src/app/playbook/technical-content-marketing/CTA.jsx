import React from "react";
import CalendarBooking from "../../calendarButton";

export default function Cta() {
  return (
    <div>
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Ready to Turn <span className="text-[#ff4500]">Developer Marketing</span> Into Your Growth Engine?
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            50+ DevTool startups figured it out before you. Don't be the one still struggling with generic marketing.
            <br />
            <br />
            Engineered Developer Marketing, not guesswork. Trusted by AI, DevTools, and B2B SaaS founders.
          </p>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-center">
          <CalendarBooking />
        </div>
        <div className="max-w-[70%] mx-auto">
          <p className="text-[15px] text-gray-300 leading-relaxed font-light text-center mt-4">
          </p>
        </div>
      </div>
    </div>
  );
}
