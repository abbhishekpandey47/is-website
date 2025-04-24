"use client";

import { useState, useEffect, useRef } from "react";

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deviceType, setDeviceType] = useState("desktop"); // "mobile", "tablet", or "desktop"
  const sliderRef = useRef(null);

  // Sample data
  const testimonials = [
    {
      id: 4,
      name: "Amit Eyal Govrin",
      image: "/Testimon/devzeroDebo.jpeg",
      alt: "Shaked Askayo, CTO, Kubiya.ai",
      position: "Founder, Kubiya",
      quote:
        "As an AI agentic platform, it was important for us to build a website that clearly communicates what we do — fast. Infrasity helped us create our platform tour and other key pages that now give users a clean, structured view of the product. They understood how to balance technical depth with modern design, and executed fast.",
      highlight: [
        "significantly enhanced the visibility and appeal of our product",
      ],
    },
    {
      id: 8,
      name: "Debosmit Ray ",
      image: "/Testimon/devzeroDebo1.png",
      alt: "Founder, DevZero",
      position: "Founder, DevZero",
      quote:
        "Infrasity helped us move fast without compromising on clarity. From our updated landing pages to detailed product sections, they captured the nuance of what DevZero offers to engineering teams — and translated that into clean, no-fluff Webflow pages that are easy to maintain and scale.",
      highlight: [
        "technical content",
        "tech stacks",
        "easier to engage users",
        "great content partner",
      ],
    },
  ];

  // Determine number of testimonials per slide based on device type
  const getTestimonialsPerSlide = () => {
    switch (deviceType) {
      case "mobile":
        return 1;
      case "tablet":
        return 2;
      default:
        return 3;
    }
  };

  const testimonialsPerSlide = getTestimonialsPerSlide();
  const slidesCount = Math.ceil(testimonials.length / testimonialsPerSlide);

  // Handle resize and determine device type
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Initial check
    handleResize();

    // Set up event listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Reset current index when device type changes to avoid out-of-bounds indices
  useEffect(() => {
    setCurrentIndex(0);
  }, [deviceType]);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesCount);
    }, 5000); // change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slidesCount]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slidesCount - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesCount);
  };

  const jumpToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Dynamically calculate card width based on device type
  const getCardWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "w-full"; // Full width for mobile
      case "tablet":
        return "w-80"; // Original width for tablets
      default:
        return "w-80"; // Original width for desktop
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-5xl md:text-6xl quicksand-bold text-white mb-16 text-center">
        Why top engineering teams rely on Infrasity for content ?
      </h2>
      {/* testimonial slider */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, #0d0a1a 0%, #0d0a1a 80%)",
          borderRadius: "16px",
          padding: "2rem",
        }}
      >
        {/* carousel area */}
        <div
          ref={sliderRef}
          className="relative"
          style={{ userSelect: "none" }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              WebkitUserDrag: "none",
            }}
          >
            {Array.from({ length: slidesCount }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 p-4"
                style={{ pointerEvents: "auto" }}
              >
                {testimonials
                  .slice(
                    slideIndex * testimonialsPerSlide,
                    slideIndex * testimonialsPerSlide + testimonialsPerSlide
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`flex-shrink-0 ${getCardWidth()} mx-auto sm:mx-2`}
                      draggable="false"
                    >
                      <div
                        className="rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden"
                        style={{
                          backgroundColor: "#141318",
                          backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                          border: "2px solid rgba(60, 63, 84, 0.3)",
                        }}
                      >
                        <div className="flex flex-col items-start text-left">
                          <div className="flex items-center mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mr-3 sm:mr-4 border-2 border-indigo-400">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                draggable="false"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                                {item.name}
                              </h3>
                              <p className="text-indigo-400 text-xs sm:text-sm">
                                {item.position}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            {item.quote}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* navigation */}
        {/* <div className="flex justify-center mt-6 sm:mt-8 relative z-10">
          <button
            onClick={handlePrev}
            className="mx-2 p-1 sm:p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center mx-2 sm:mx-4">
            {Array.from({ length: slidesCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => jumpToSlide(index)}
                className={`mx-1 w-2 h-2 rounded-full ${
                  index === currentIndex
                    ? "bg-indigo-500 w-3 sm:w-4"
                    : "bg-gray-500"
                } transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="mx-2 p-1 sm:p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
}
