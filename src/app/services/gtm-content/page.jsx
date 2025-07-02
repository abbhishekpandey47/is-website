"use client";
import HeroHome from "./hero";
import Cta from "./cta";
import WhyChoose from "./whyyc";
import WhatWeCreate from "./whatWeCreate";
import TechWeCover from "./techWeCover";
import RealResult from "./realResult";
import WhoItIs from "./whoItIs";

export default function Page() {
    return (
        <div className="text-white">
            <HeroHome />
            <WhyChoose />
            <WhatWeCreate />
            <TechWeCover />
            <RealResult />
            <WhoItIs />

            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10"></div>

            <Cta />
        </div>
    );
}
