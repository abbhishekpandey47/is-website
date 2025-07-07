"use clinet";

import Cta from "./cta";
import YCStartupLanding from "./hero";
import Testimonials from "./testimonials";
import WhatWeDo from "./whatWeDo";
import WhyYC from "./whyYC";
import YCWork from "./ycWork";
import FAQSection from "../technical-writing-services/FAQ";

export default function Page() {
  return (
    <div>
      <YCStartupLanding />
      <YCWork />
      <WhatWeDo />
      <WhyYC />
      <FAQSection />
      <Testimonials />

      <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10"></div>

      <Cta />

    </div>
  );
}
