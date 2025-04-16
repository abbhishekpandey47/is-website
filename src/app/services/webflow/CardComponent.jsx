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
    <div className="shadow-md bg-gradient-to-br from-[#231442] to-[#331a63] flex flex-col text-start min-h-[250px] bg-white border rounded-xl p-4"
    style={{
      background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
    }}

    >
      {/* Image Section */}
      <div className="w-full h-[200px] overflow-hidden items-stretch rounded-md ">
        {image ? (
          <Image
            src={image.src}
            alt={title || "Card Image"}
            width={450} 
            height={0} 
            className="object-contain border-2 border-black"
          />
        ) : (
          <span className="text-lg">🖼️</span> 
        )}
      </div>

      {/* Title Section */}
      <h3 className="text-4xl mb-3 text-white px-4">{title}</h3>

      {/* Description Section */}
      <p className="text-base text-white px-5">{desc}</p>
    </div>
  );
};

export default CardComponent;