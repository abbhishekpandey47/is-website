"use client";

import dynamic from "next/dynamic";
import CalendarBooking from "../../calendarButton";

const ContactPopupButton = dynamic(
  () => import("../../lp/reddit-marketing-agency/ContactPopupButton"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 md:mt-8 h-12 w-40 rounded-full bg-white/10 animate-pulse" />
    ),
  }
);

export default function CTA({ isAdsVariant = false }) {
  return (
    <div className="px-8 py-16">
      <div
        className="max-w-[1240px] mx-auto text-center relative overflow-hidden rounded-2xl"
        style={{
          background: "#0e0b1b",
          border: "1.5px solid rgba(45, 51, 71, 1)",
        }}
      >
        {/* Top purple gradient accent line */}
        <div className="absolute top-0 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(95,100,255,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-8 md:px-[90px] py-16 md:py-[80px]">
          {/* Heading */}
          <div className="quicksand-bold text-[30px] md:text-[42px] max-sm:text-[1.6em] leading-tight text-white text-center flex justify-center mb-3">
            <h2 className="leading-tight text-center max-lg:mx-auto text-[28px] md:text-[60px] max-sm:text-[1.6em]">
              70+ dev-first startups trust <span className="text-[#5F64FF]">Infrasity</span>
              <br />
              Ready to be <em className="not-italic text-[#5F64FF]">next?</em>
            </h2>
          </div>

          {/* Subtext */}
          <div className="max-w-[520px] mx-auto mb-8">
            <p className="text-[16px] md:text-[17px] text-gray-300 leading-relaxed font-light">
              We'll audit your current developer visibility, map the competitive landscape, and deliver a month-by-month engagement plan before we take a dollar.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap items-center">
            {isAdsVariant ? (
              <ContactPopupButton
                buttonText="Book a Strategy Call"
                width="w-auto"
                textSize="text-sm"
              />
            ) : (
              <CalendarBooking
                buttonText="Book a Demo"
                width="w-auto"
                textSize="text-sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
