"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CalendarBooking from "../../contact/page";

export default function ContactPopupButton({
  buttonText = "Book a Meeting",
  bgGradient = "",
  width = "w-40",
  height = "h-12",
  textSize = "text-sm",
  textWeight = "quicksand-semibold",
  borderColor = "#3b82f6",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const portalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    portalRef.current = modalRoot;
    setIsMounted(true);

    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
      setIsMounted(false);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setShowThankYou(false);
    setBookingDetails(null);
  };

  const openModal = () => setIsOpen(true);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex justify-center items-center 
          ${textSize} ${textWeight} 
          ${bgGradient || "bg-[#5F64FF]"} 
          rounded-[5px] relative overflow-hidden 
          ${borderColor ? `border border-[${borderColor}]` : ""} 
          text-white shadow-2xl transition-all 
          z-10 ${width} ${height} px-6
          
          before:ease before:absolute before:right-0 before:top-0 
          before:h-12 before:w-6 before:translate-x-12 
          before:rotate-6 before:bg-white before:opacity-10 before:duration-700 
          hover:before:-translate-x-40
        `}
      >
        <span className="text-center w-full">{buttonText}</span>
      </button>

        {isOpen && isMounted && portalRef.current &&
          ReactDOM.createPortal(
            <div
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeModal();
              }}
            >
              <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border-2" style={{ 
                maxHeight: '90vh',
                background: "linear-gradient(to right, #0e1329 0%, #0e1329 10%, #353586 100%)",
                borderColor: "#393a52"
              }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="p-6 md:p-8 overflow-y-auto" style={{ maxHeight: '85vh' }}>
                  {showThankYou ? (
                    <div className="text-center py-12">
                      <div className="mb-6">
                        <svg className="w-16 h-16 mx-auto text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                      {bookingDetails && (
                        <div className="mb-6">
                          <p className="text-gray-300 mb-2">Your meeting has been scheduled for:</p>
                          <p className="font-semibold text-lg text-white">
                            {bookingDetails.date} at {bookingDetails.time}
                            {bookingDetails.timezone && (
                              <> {bookingDetails.timezone}</>
                            )}
                          </p>
                        </div>
                      )}
                      <p className="text-gray-300 mb-6">A confirmation email has been sent to your inbox.</p>
                      <button
                        onClick={closeModal}
                        className="bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-6 rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <CalendarBooking 
                      onSuccess={(details) => {
                        setBookingDetails(details);
                        setShowThankYou(true);
                      }} 
                      forceAdsApp={true} 
                    />
                  )}
                </div>
              </div>
            </div>
          ,
          portalRef.current
          )}
    </>
  );
}
