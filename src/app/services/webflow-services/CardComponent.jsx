import Image from "next/image";
import { useState, useEffect } from "react";

const CardComponent = ({ image, title, desc, variant = "default" }) => {
  return (
    <div
      className="shadow-md bg-gradient-to-br from-[#231442] to-[#331a63] flex flex-col text-start min-h-[300px] rounded-xl"
      style={{
        background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
      }}
    >
      <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/100 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

      {/* Image Section */}
      <div className="w-full h-[200px] ">
        {image ? (
          <Image
            src={image.src}
            alt={title || "Card Image"}
            width={450}
            height={0}
            className="object-contain rounded-t-xl"
          />
        ) : (
          <span className="text-lg">🖼️</span>
        )}
      </div>

      {/* Title Section */}
      <h3 className="text-4xl mb-3 px-4 text-white">{title}</h3>

      {/* Description Section */}
      <p className="text-base text-white px-4 mb-1 ">{desc}</p>
    </div>
  );
};

export default CardComponent;
