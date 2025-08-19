import React from "react";
import CalendarBooking from "../../calendarButton";

export default function Cta() {
  return (
    <div>
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h2 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
           Ready to Supercharge Your Technical Marketing?
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
         Book a free demo with our team and see how Infrasity can engineer your growth. We'll show you exactly how our content strategy aligns with
your platform's goals and users.
          </p>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-center">
          <CalendarBooking />
        </div>
       
      </div>
    </div>
  );
}
