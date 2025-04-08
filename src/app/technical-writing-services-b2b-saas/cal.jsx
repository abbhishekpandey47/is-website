"use client"; // Important for Next.js

import React, { useEffect, useRef } from "react";

const CalendlyButton = ({ name }) => {
  const calendlyLoaded = useRef(false);

  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Calendly JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      calendlyLoaded.current = true;
    };
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (link.parentNode) document.head.removeChild(link);
      if (script.parentNode) document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly && calendlyLoaded.current) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/meet-shan/30min?hide_event_type_details=1",
        branding: false,
      });
    } else {
      console.log("Calendly not loaded yet");
    }
  };

  return (
    <button
      className="text-m quicksand-semibold rounded-[5px] flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
      onClick={openCalendly}
    >
      {name || "Book a Demo"}
    </button>
  );
};

export default CalendlyButton;
