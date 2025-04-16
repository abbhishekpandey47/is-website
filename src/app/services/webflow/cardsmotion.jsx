"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CardMotion = ({ mainHeading, subHeading, serviceArr }) => {
  const containerRef = useRef(null);
  const [cardsPosition, setCardsPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);

  const cardWidth = 700; // Adjusted width for the new layout
  const gap = 32; // Gap between cards
  const totalCardsWidth = serviceArr.length * (cardWidth + gap) - gap; // Total width of all cards
  const containerPadding = 100; // Space before the first card

  const handleWheel = (e) => {
    const scrollAmount = e.deltaY;

    // If hovering over the cards, lock vertical scrolling
    if (isHovering) {
      e.preventDefault();

      // Calculate new position
      let newPosition = cardsPosition - scrollAmount;

      // Prevent scrolling beyond the last card
      if (newPosition < -totalCardsWidth + cardWidth) {
        newPosition = -totalCardsWidth + cardWidth;
        setIsAtEnd(true); // Allow vertical scrolling after reaching the last card
      } else {
        setIsAtEnd(false);
      }

      // Prevent scrolling beyond the first card (with padding)
      if (newPosition > containerPadding) {
        newPosition = containerPadding;
        setIsAtStart(true); // Allow vertical scrolling after reaching the first card
      } else {
        setIsAtStart(false);
      }

      setCardsPosition(newPosition);
    } else {
      // If not hovering over the cards, allow normal vertical scrolling
      if (!isAtEnd && !isAtStart) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [cardsPosition, isHovering, isAtEnd, isAtStart]);

  return (
    <div className="mt-4 px-4 py-16 cursor-pointer">
      {/* Main Heading */}
      <div
        className="text-3xl font-bold mb-6 text-white text-center"
        dangerouslySetInnerHTML={{ __html: mainHeading }}
      ></div>

      {/* Sub Heading */}
      <p className="text-center text-white mb-10 text-lg">{subHeading}</p>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="overflow-hidden max-w-8xl mx-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="flex flex-nowrap gap-8"
          animate={{ x: cardsPosition }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }} 
          style={{ paddingLeft: containerPadding }} 
        >
          {serviceArr.map((service, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-xl shadow-lg flex-shrink-0 w-[780px] flex items-stretch gap-6 border border-white"
              // style={{
              //   backgroundColor: "#141318",
              //   backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 90%)`,
              //   boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              //   border: "2px solid rgba(60, 63, 84, 0.3)",
              // }}
              style={{
                background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              }}
    
            >
              {/* Left Section: Text */}
              <div className="flex-1 p-6 flex flex-col justify-center text-start">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {service.head}
                </h3>
                <p className="text-base text-white">{service.para}</p>
              </div>

              {/* Right Section: Image */}
              <div className="flex-shrink-0 w-1/2 h-full">
                <Image
                  src={service.image}
                  alt={service.head}
                  className="w-full h-full object-cover"
                  width={600}
                  height={550}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardMotion;
