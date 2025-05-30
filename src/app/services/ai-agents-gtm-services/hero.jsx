"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import CalendarBooking from "../../calendarButton";

export default function AIStartupLanding() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-20 pt-40"
      style={{ background: "#171a3d" }}
    >
      <div className="animated-bg"></div>

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="quicksand-bold text-[4em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-16">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Content & GTM Services for <br />
            Agentic{" "}
            <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">
              AI Startups
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-5xl mx-auto mb-14">
          <p className="text-xl md:text-xl text-[#e7d2ac] leading-relaxed font-light">
            From technical blogs and SEO-rich use-case libraries to onboarding
            videos and tailored go-to-market strategy, we help AI agent startups
            communicate complex value, drive developer adoption, and <br />
            shorten time-to-value for new users.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-5">
          <CalendarBooking />
        </div>

        {/* Subtext */}
        <p className="text-[#d9d9d9] text-[15px] font-[300]">
          Get a free consultation and see how infrasity can fast track your
          content.
        </p>
      </div>

      <style jsx>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #171a3d;
          overflow: hidden;
        }

        .animated-bg::before {
          content: "";
          position: absolute;
          width: 1200px;
          height: 1200px;
          background: radial-gradient(circle, #090d1a 0%, transparent 70%);
          border-radius: 50%;
          animation: moveCircle1 15s infinite linear;
          opacity: 0.8;
        }

        .animated-bg::after {
          content: "";
          position: absolute;
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, #090d1a 0%, transparent 70%);
          border-radius: 50%;
          animation: moveCircle2 20s infinite linear reverse;
          opacity: 0.8;
        }

        @keyframes moveCircle1 {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(100vw, 0) rotate(90deg);
          }
          50% {
            transform: translate(100vw, 100vh) rotate(180deg);
          }
          75% {
            transform: translate(0, 100vh) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }

        @keyframes moveCircle2 {
          0% {
            transform: translate(100vw, 100vh) rotate(0deg);
          }
          25% {
            transform: translate(0, 100vh) rotate(90deg);
          }
          50% {
            transform: translate(0, 0) rotate(180deg);
          }
          75% {
            transform: translate(100vw, 0) rotate(270deg);
          }
          100% {
            transform: translate(100vw, 100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
