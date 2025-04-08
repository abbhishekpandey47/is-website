"use client";

import React, { useEffect, useRef, useState } from "react";

const CalendlyButton = ({ name }) => {
  const calendlyLoaded = useRef(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const embedRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      calendlyLoaded.current = true;
    };
    document.body.appendChild(script);

    return () => {
      if (link.parentNode) document.head.removeChild(link);
      if (script.parentNode) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (
      isPopupOpen &&
      calendlyLoaded.current &&
      embedRef.current &&
      window.Calendly
    ) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/meet-shan/30min?hide_event_type_details=1",
        parentElement: embedRef.current,
        branding: false,
      });
    }
  }, [isPopupOpen]);

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* Button to trigger  */}
      <button
        className="text-m quicksand-semibold rounded-[5px] flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
        onClick={openPopup}
      >
        {name || "Book a Demo"}
      </button>

      {/* Custom Popup */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            zIndex: 1000,
            paddingTop: "0",
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              padding: "40px 20px 20px 20px",
              borderRadius: "10px",
              width: "80%",
              maxWidth: "600px",
              height: "100%",
              maxHeight: "800px",
              marginTop: "0",
              overflowY: "auto",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              style={{
                position: "fixed",
                top: "10px",
                left: "calc(50% - 290px)",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "black",
                background: "white",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                zIndex: 1001,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              ×
            </button>

            <div
              ref={embedRef}
              style={{ width: "100%", height: "100%", minHeight: "600px" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendlyButton;
