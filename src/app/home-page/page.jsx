"use clinet";

import HeroHome from "./hero";
import MarqueePage from "./marquee";

export default function Page() {
  return (
    <div className="text-white overflow-x-hidden overflow-y-hidden">
      <HeroHome />
      <MarqueePage />
    </div>
  );
}
