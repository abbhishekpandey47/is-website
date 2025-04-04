import React from "react";

export default function BackgroundGradient() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient background - changed from white/pink to dark blue shades */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0a1a] via-[#3b3072] to-[#0d0a1a]"></div>

      {/* Wave shape overlay - changed from white to a lighter blue */}
      <div className="absolute bottom-0 left-0 w-full h-1/2">
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              fill="#16122b"
              fillOpacity="0.3"
              d="M0,128L80,133.3C160,139,320,149,480,176C640,203,800,245,960,234.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
