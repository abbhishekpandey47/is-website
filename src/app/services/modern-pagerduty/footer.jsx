// components/Footer.jsx
"use client";

import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <section className="bg-[#121826] font-[quicksand] relative overflow-hidden">
        
      <div className="absolute inset-0 -z-10">
        <Image
          src="/modern/Footer-bg.jpg"      
          alt="Footer background"
          fill                        
          priority                    
          className="object-cover opacity-40"
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
        />
      </div>

      <div className="container mx-auto px-4 pt-10 pb-28 flex flex-col items-center text-center">
        <p className="text-[13px] text-[#939db8] mb-8 max-w-2xl mx-auto uppercase">
    Sign up for free
  </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
          Get up & running

          <br />
          <span className="block">in 30 seconds</span>
        </h1>

        <p className="mt-4 text-lg text-[#939db8] max-w-[500px]">
          Get notified with a radically better< br />
infrastructure monitoring platform.
        </p>

        <form className="mt-8 flex flex-col sm:flex-row items-center w-full sm:w-auto">
          <input
            type="email"
            placeholder="Your work e-mail"
            required
            className="w-full sm:w-[324px] px-4 py-3 rounded-xl bg-[#1A1F2E] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-blue-600 to-purple-600 sm:mr-3"
          />
          <button
            type="submit"
            className="mt-3 sm:mt-0 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
          >
            Start in 30 seconds
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-[14px]">
          Start monitoring for free or{" "}
          <a
            href="https://betterstack.com/book-a-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border-b border-blue-400 hover:text-blue-300"
          >
            book a demo
          </a>
        </p>
      </div>
    </section>
  );
};

export default Footer;
