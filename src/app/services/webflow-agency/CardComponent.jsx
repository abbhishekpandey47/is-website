import Image from "next/image";
import { useState, useEffect } from "react";

const CardComponent = ({ image, title, desc, variant = "default" }) => {
  return (
    <div
      className="shadow-md bg-gradient-to-br from-[#231442] to-[#331a63] flex flex-col text-start rounded-xl relative p-2  h-full"
      style={{
        backgroundColor: "#141318",
        backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        border: "2px solid rgba(60, 63, 84, 0.3)",
      }}
    >
      {/* Background Glow Effects */}
      <div className="absolute -bottom-20 -right-40 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/100 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

      {/* Image Section */}
      <div className="w-full h-[120px] md:h-[150px] rounded-t-xl overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={title || "Card Image"}
            width={450}
            height={300}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-lg">🖼️</span>
        )}
      </div>

      {/* Title Section */}
      <h3 className="text-base md:text-lg lg:text-2xl font-semibold mt-2 mb-1 md:mb-2 lg:mb-3 px-1 md:px-2 lg:px-4 text-white">
        {title}
      </h3>

      {/* Description Section */}
      <p className="text-xs md:text-sm lg:text-base text-white px-1 md:px-2 lg:px-4 mb-1 md:mb-2">
        {desc}
      </p>
    </div>
  );
};

export default CardComponent;