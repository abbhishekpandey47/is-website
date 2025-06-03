"use clinet";

import YCStartupLanding from "./hero";
import WhatWeDo from "./whatWeDo";
import WhyYC from "./whyYC";
import YCWork from "./ycWork";

export default function Page() {
  return (
    <div>
      <YCStartupLanding />
      <YCWork />
      <WhatWeDo />
      <WhyYC />
    </div>
  );
}
