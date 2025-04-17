import { Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const BookDemo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const calendlyLoaded = useRef(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const embedRef = useRef(null);
  const modalRef = useRef(null);

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
    
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closePopup();
      }
    };
    
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const openPopup = () => {
    setIsExpanded(true);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsExpanded(false)
    setIsPopupOpen(false);
  };

  return (
    <div className="w-[100%] lg:w-[65%] bg-[linear-gradient(to_right,#1966ff,#d129ff,#8c1eff)] p-[2px] rounded-2xl flex justify-center items-center shadow-2xl backdrop-blur-lg">
      <section className={`w-full bg-[#0D0A1A] relative rounded-2xl shadow-lg min-h-[50vh] md:min-h-[50vh] ${
          isExpanded ? "h-[120vh]" : "lg:min-h-[35vh]"
        } overflow-hidden`}>
        {/* Stars */}
        <Stars />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <h1 className="text-3xlc text-white text-purple sm:text-3xl md:text-3xl quicksand-bold text-center mb-4">
            Trusted by fastest growing B2B SaaS Startups.
          </h1>
          <p className="text-m text-white md:text-lg quicksand-medium text-gray text-center max-w-2xl mb-8">
            Trusted by YC startups. Built for developer-first companies.
          </p>
          
          <button 
            className="magic-button group rounded-md px-6 py-3 text-white font-medium text-m transition-all duration-300 hover:scale-105"
            onClick={openPopup}
          >
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 transition-transform group-hover:rotate-12" />
              <span className="quicksand-medium">Book Demo</span>
            </div>
          </button>
        </div>
      </section>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-8xl h-[90vh] lg:h-[150vh] lg:min-h-[95vh] relative"
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-xl text-black bg-white rounded-full shadow-md z-10 hover:bg-gray-100"
            >
              ×
            </button>
            
            <div 
              ref={embedRef} 
              className="w-full h-full"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

const Stars = () => {
  const smallStars = Array.from({ length: 100 }).map((_, i) => ({
    id: `small-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation:
      i % 3 === 0
        ? "animate-float"
        : i % 3 === 1
        ? "animate-float-delay-1"
        : "animate-float-delay-2",
  }));

  const mediumStars = Array.from({ length: 30 }).map((_, i) => ({
    id: `medium-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation:
      i % 3 === 0
        ? "animate-float"
        : i % 3 === 1
        ? "animate-float-delay-1"
        : "animate-float-delay-2",
  }));

  const largeStars = Array.from({ length: 15 }).map((_, i) => ({
    id: `large-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation:
      i % 3 === 0
        ? "animate-pulse-slow"
        : i % 3 === 1
        ? "animate-float-delay-1"
        : "animate-scale-slow",
  }));

  return (
    <div className="absolute inset-0 z-0">
      {smallStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-small ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
      {mediumStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-medium ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
      {largeStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-large ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
    </div>
  );
};

export default BookDemo;