import React, { useEffect, useState } from "react";

export default function BackgroundGradient() {
  const [wavePosition, setWavePosition] = useState(0);

  // Animate wave movement
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePosition((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0d0a1a] via-[#3b3072] to-[#0d0a1a] animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>

      {/* Second animated wave layer */}
      <div className="absolute bottom-0 left-0 w-full h-1/3">
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              fill="#0d0a1a"
              fillOpacity="0.5"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,138.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="15s"
                repeatCount="indefinite"
                values="
                  M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,138.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,133.3C672,128,768,96,864,90.7C960,85,1056,107,1152,122.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,138.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
}
