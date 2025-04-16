import Image from "next/image";
import { useState, useEffect } from "react";

const CardComponent = ({ image, title, desc, variant = "default" }) => {
  const [hover, setHover] = useState(false);
  
  // Different gradient variations
  const gradientStyles = {
    default: {
      background: `linear-gradient(135deg, #231442 0%, #331a63 100%)`,
      hoverBackground: `linear-gradient(135deg, #2a174d 0%, #3b1e73 100%)`
    },
    cosmic: {
      background: `linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)`,
      hoverBackground: `linear-gradient(135deg, #16123a 0%, #3c3676 50%, #2d2d4e 100%)`
    },
    aurora: {
      background: `linear-gradient(135deg, #1a2a6c 0%, #2d3f87 25%, #2a265f 50%, #342056 75%, #261447 100%)`,
      hoverBackground: `linear-gradient(135deg, #1e3080 0%, #32469c 25%, #312c70 50%, #3d2665 75%, #2d1853 100%)`
    },
    neon: {
      background: `linear-gradient(135deg, #0d0d2d 0%, #231844 35%, #310e68 65%, #3b0764 100%)`,
      hoverBackground: `linear-gradient(135deg, #120d46 0%, #2c1d5a 35%, #3c1180 65%, #47097a 100%)`
    },
    midnight: {
      background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)`,
      hoverBackground: `linear-gradient(135deg, #141f38 0%, #263449 50%, #24215a 100%)`
    }
  };

  // Get the current gradient style based on variant
  const currentStyle = gradientStyles[variant] || gradientStyles.default;
  
  return (
    <div
      className={`transition-all duration-500 flex flex-col text-start min-h-[250px] border rounded-xl p-4 relative overflow-hidden ${
        hover ? "scale-[1.02]" : ""
      }`}
      style={{
        background: hover ? currentStyle.hoverBackground : currentStyle.background,
        boxShadow: hover 
          ? "0 12px 42px 0 rgba(76, 29, 149, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)" 
          : "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        border: hover 
          ? "2px solid rgba(139, 92, 246, 0.5)" 
          : "2px solid rgba(60, 63, 84, 0.3)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${hover ? 'center' : 'top right'}, rgba(139, 92, 246, 0.15) 0%, transparent ${hover ? '70%' : '90%'})`,
          opacity: hover ? 0.4 : 0.2,
        }}
      />

      {/* Subtle mesh gradient effect */}
      <div 
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
          opacity: 0.07,
        }}
      />

      {/* Image Section with subtle border glow on hover */}
      <div className="w-full h-[150px] overflow-hidden rounded-md relative">
        {image ? (
          <div className={`transition-all duration-500 ${hover ? "scale-[1.03]" : ""}`}>
            <Image
              src={image.src}
              alt={title || "Card Image"}
              width={450}
              height={0}
              className={`object-contain transition-all duration-500 ${
                hover ? "brightness-110" : "brightness-100"
              }`}
              style={{
                border: hover 
                  ? "2px solid rgba(139, 92, 246, 0.6)" 
                  : "2px solid rgba(30, 30, 35, 0.8)",
                boxShadow: hover 
                  ? "0 0 15px rgba(139, 92, 246, 0.3)" 
                  : "none"
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">🖼️</span>
          </div>
        )}
      </div>

      {/* Title Section with subtle animation */}
      <h3 className={`text-3xl mb-2 mt-4 text-white px-4 transition-all duration-500 ${
        hover ? "text-purple-300" : "text-white"
      }`}>
        {title}
      </h3>

      {/* Description Section with subtle animation */}
      <p className={`text-base px-4 transition-all duration-500 ${
        hover ? "text-purple-200" : "text-gray-300"
      }`}>
        {desc}
      </p>
    </div>
  );
};

export default CardComponent;