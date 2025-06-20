"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CalendarBooking from "../../calendarButton";

export default function YCStartupLanding() {
  return (
    <div
      className="flex items-center pb-20 pt-40 overflow-hidden relative"
    >
      <div className="animated-bg">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
        <div className="wave-layer"></div>
        <div className="pulse-layer"></div>
        <div className="gradient-overlay"></div>
        <div className="transition-orb"></div>
        <div className="transition-orb"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="w-[120%] text-left p-8 lg:m-0 lg:ml-20">
            <div className="half-ring"></div>

            <h1
              className="text-5xl lg:text-6xl font-bold quicksand-bold tracking-wide text-white  mb-8"
              style={{ lineHeight: "1.3" }}
            >
              Your <span className="text-white">GTM & Technical</span>
              <br />
              <span className="text-white">Content Partner</span>
              <br />
              for <span className="text-orange-500">YC Startups</span>
            </h1>

            <p className="w-[82%] text-xl md:text-xl text-[#ffe8a8] leading-relaxed font-[320] mb-8">
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

       .half-ring {
          position: absolute;
          left: -300px;
          top: -250px;
          width: 780px;
          height: 800px;
          border: 2px solid #2d3159;
          border-radius: 50%;
          opacity: 0.8;
          z-index: -1;
        }
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #2c3077;
          overflow: hidden;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.8;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .orb-1 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, #080915 0%, #080915 40%, transparent 70%);
          top: -350px;
          left: -350px;
          animation: float1 28s infinite ease-in-out;
        }

        .orb-2 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, #080915 0%, #080915 35%, transparent 65%);
          top: 30%;
          right: -350px;
          animation: float2 35s infinite ease-in-out reverse;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, #080915 0%, #080915 30%, transparent 60%);
          bottom: -275px;
          left: 25%;
          animation: float3 42s infinite ease-in-out;
        }

        .orb-4 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #080915 0%, #080915 45%, transparent 75%);
          top: 10%;
          left: 50%;
          animation: float4 50s infinite ease-in-out reverse;
        }

        .wave-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at 30% 40%,
            rgba(8, 9, 21, 0.3) 0%,
            transparent 60%
          );
          animation: waveShift 30s infinite ease-in-out;
        }

        .pulse-layer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(8, 9, 21, 0.2) 0%,
            transparent 70%
          );
          animation: pulse 20s infinite ease-in-out;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at 70% 60%,
            rgba(8, 9, 21, 0.25) 0%,
            transparent 70%
          );
          animation: gradientRotate 45s infinite ease-in-out reverse;
        }

        .transition-orb {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(8, 9, 21, 0.6) 0%, transparent 70%);
          filter: blur(50px);
          opacity: 0;
          animation: fadeInOut 22s infinite ease-in-out;
        }

        .transition-orb:nth-child(8) {
          top: 15%;
          left: 15%;
          animation-delay: -11s;
        }

        .transition-orb:nth-child(9) {
          bottom: 15%;
          right: 15%;
          animation-delay: -5.5s;
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(400px, 250px) scale(1.1);
          }
          50% {
            transform: translate(700px, 150px) scale(0.9);
          }
          75% {
            transform: translate(300px, 500px) scale(1.05);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(-350px, -200px) scale(1.2);
          }
          40% {
            transform: translate(-500px, 150px) scale(0.8);
          }
          60% {
            transform: translate(-250px, 350px) scale(1.1);
          }
          80% {
            transform: translate(-150px, -250px) scale(0.95);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          30% {
            transform: translate(300px, -400px) scale(1.15);
          }
          60% {
            transform: translate(-200px, -300px) scale(0.85);
          }
          90% {
            transform: translate(150px, -150px) scale(1.05);
          }
        }

        @keyframes float4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-400px, 200px) scale(0.9);
          }
          50% {
            transform: translate(-200px, -300px) scale(1.2);
          }
          75% {
            transform: translate(300px, 150px) scale(0.95);
          }
        }

        @keyframes waveShift {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.05;
          }
        }

        @keyframes gradientRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.4);
          }
        }
      `}</style>
    </div>
  );
}