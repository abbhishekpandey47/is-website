"use client";

import BookDemo from "../book-a-demo/cta";
import CalendlyButton from "./cal";
import CalendarBooking from "../calendarButton";
import FAQSection from "./FAQ";
import Hero from "./hero";
import ContentROICalculator from "./roi-cal";

export default function Page() {
  return (
    <div>
      <div>
        <Hero />
      </div>

      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-12 mt-12"></div>
        <ContentROICalculator />
      </div>

      <div className="w-full flex justify-center items-center z-0">
        <CalendarBooking />
      </div>

      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div
          className="w-full h-px shadow-pink-400/50 bg-gradient-to-r 
        from-pink-500/5 via-pink-300 to-pink-500/5 mb-12 mt-12"
        ></div>
        <FAQSection />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
        <div className=" flex justify-center items-center">
          <BookDemo />
        </div>
      </div>
      <div className="mb-20"></div>
    </div>
  );
}
