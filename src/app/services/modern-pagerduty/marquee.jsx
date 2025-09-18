"use client";
import React from "react";

// Clean logo list - 11 logos for 6+5 layout
const logoList = [
  "aviator.png", "cedana.png", "cerbos.png", 
  "Codegiant.png", "daytona.png", "DevZero.png", 
  "firefly.png", "kapstan.png", "Zenml.png", 
];

const LogoSection = ({show = false}) => {
  // Split logos into two rows: 6 for first row, 5 for second row
  const firstRow = logoList.slice(0, 9);
  const secondRow = logoList.slice(9, 11);

  return (
    <div className="font-[quicksand] py-4 px-4">
      <div className="max-w-6xl mx-auto text-center">
       {show ? (
  <p className="text-[13px] text-[#939db8] mb-10 max-w-2xl mx-auto uppercase">
    Loved by teams around the world
  </p>
) : (
  <>
    <h2 className="text-2xl font-bold text-white mb-2">
      Loved by teams around the world
    </h2>
    <p className="text-[16px] text-gray-400 mb-16 max-w-2xl mx-auto">
      Software engineers from high-growth startups to <br /> Fortune 500 companies choose Better Stack.
    </p>
  </>
)}


        <div className="space-y-8">
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
            {firstRow.map((logo, index) => (
              <div key={index} className="flex items-center justify-center p-3">
                <img
                  src={`/trustedby-bw/bw/${logo}`}
                  alt={logo.replace('.png', '').replace('.svg', '')}
                  className="h-10 md:h-10 w-auto opacity-60 grayscale hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
            {secondRow.map((logo, index) => (
              <div key={index} className="flex items-center justify-center p-3">
                <img
                  src={`/trustedby-bw/bw/${logo}`}
                  alt={logo.replace('.png', '').replace('.svg', '')}
                  className="h-10 md:h-10 w-auto opacity-60 grayscale hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSection;