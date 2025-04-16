import React from 'react';

export default function Hero() {

    const svgColor = "#afb0af";

  return (
    <div className="flex flex-col items-center justify-center p-8 pt-40 w-full max-w-4xl mx-auto">
   <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke={svgColor}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </div>
      <div className="flex items-center justify-center font-medium text-sm" style={{ color: svgColor }}>
        ROI Calculator
      </div>
    </div>
      
      <div className="text-center">
        <h1 className="text-7xl font-semibold mt-8">
          See how much time <br />
          and money Fluent <br />
          can save your team
        </h1>
      </div>
    </div>
  );
}