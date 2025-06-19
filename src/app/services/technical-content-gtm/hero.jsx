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

      <div className="w-[93%] max-w-6xl mx-auto text-center relative z-10">
        <div className="quicksand-bold text-[4em] max-sm:text-[4em] tracking-wide leading-[80px] text-white text-center flex justify-center mb-16">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            <span className="text-[#6b5be7]"> Infrasity </span> - Technical Content & GTM Experts for Infrastructure <br /> Platforms
          </h1>
        </div>

        {/* Description */}
        <div className="w-[89%] mx-auto mb-14">
          <p className="text-[20.5px] text-[#f5deb3] tracking-wide leading-relaxed font-light">
            Infrasity creates deep, developer-focused content that educates engineers and drives growth. We're the content and GTM partner trusted by leading infrastructure innovators - from Firefly and Envo to Spacelift and DevZero- to tell their product story in clear, technical terms.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-5">
          <CalendarBooking />
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
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.8;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .orb-1 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #080915 0%, #080915 40%, transparent 70%);
          top: -350px;
          left: -350px;
          animation: float1 28s infinite ease-in-out;
        }
        .orb-2 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #080915 0%, #080915 35%, transparent 65%);
          top: 30%;
          right: -350px;
          animation: float2 35s infinite ease-in-out reverse;
        }
        .orb-3 {
          width: 750px;
          height: 750px;
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
      `}</style>    </div>
  );
}
