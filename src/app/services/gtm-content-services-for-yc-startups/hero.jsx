"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CalendarBooking from "../../calendarButton";

export default function YCStartupLanding() {
  return (
    <div
      className="flex items-center pb-20 pt-40 overflow-hidden relative"
      style={{ background: "#2c3077" }}
    >
      <div className="animated-bg"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="w-[100%] text-left ml-20">
            <h1
              className="text-5xl lg:text-6xl font-bold quicksand-bold tracking-tighter text-white mb-8"
              style={{ lineHeight: "1.3" }}
            >
              Your <span className="text-white">GTM & Technical</span>
              <br />
              <span className="text-white">Content Partner</span>
              <br />
              for <span className="text-orange-500">YC Startups</span>
            </h1>

            <p className="text-xl md:text-xl text-[#e7d2ac] leading-relaxed font-light mb-8">
              We blend engineering expertise with marketing speed, building
              conversion-focused sites and developer-focused content so you can
              launch faster.
            </p>

            {/* CTA Button */}
            <CalendarBooking />
          </div>

          {/* Right Side - Screenshot Image */}
          <div className="relative flex justify-end lg:justify-end lg:ml-36 ">
            <div className="absolute right-16 top-16 w-full h-full opacity-20 rounded-2xl overflow-hidden">
              <Image
                src={`/ai-page/yc-web.png`}
                alt="Background"
                width={800}
                height={600}
                className="w-full h-full object-cover object-left-top scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl blur-xl transform rotate-3 scale-105"></div>

            <div className="relative bg-gray-100 overflow-hidden shadow-2xl max-w-md w-full z-10"
              style={{
                border: "1px solid #5c5c63",
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              {/* Screenshot Image */}
              <div className="bg-white aspect-[4/3] flex items-center justify-center">
                <Image
                  src={`/ai-page/yc-web.png`}
                  alt="Y Combinator Screenshot"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #2c3077;
          overflow: hidden;
        }

        .animated-bg::before {
          content: "";
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(
            circle,
            rgba(147, 51, 234, 0.1) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: moveCircle1 20s infinite linear;
          top: -200px;
          left: -200px;
        }

        .animated-bg::after {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.1) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: moveCircle2 25s infinite linear reverse;
          bottom: -200px;
          right: -200px;
        }

        @keyframes moveCircle1 {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(200px, 100px) rotate(90deg);
          }
          50% {
            transform: translate(100px, 200px) rotate(180deg);
          }
          75% {
            transform: translate(-100px, 100px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }

        @keyframes moveCircle2 {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-150px, -100px) rotate(90deg);
          }
          50% {
            transform: translate(-50px, -150px) rotate(180deg);
          }
          75% {
            transform: translate(100px, -100px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
