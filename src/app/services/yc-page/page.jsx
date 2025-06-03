"use clinet";

import YCStartupLanding from "./hero";
import WhatWeDo from "./whatWeDo";
import YCWork from "./ycWork";

export default function Page() {
  return (
    <div>
      <YCStartupLanding />
      <YCWork />
      <WhatWeDo />
    </div>
  );
}
