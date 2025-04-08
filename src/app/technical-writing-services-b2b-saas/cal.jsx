// components/CalendlyPopupButton.jsx
"use client"; // Important for Next.js client components

import React from "react";

const CalendlyPopupButton = () => {
  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/kolhesatish96",
      });
    }
  };

  return (
    <button
      className="text-m quicksand-semibold rounded-[5px] flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
      onClick={openCalendlyPopup}
    >
      Book a Demo
    </button>
  );
};

export default CalendlyPopupButton;
