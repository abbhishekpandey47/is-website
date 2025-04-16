"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardMotion = ({ mainHeading, subHeading, serviceArr }) => {
  const containerRef = useRef(null);
  const [cardsPosition, setCardsPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);

  const cardWidth = 500; // Width of each card
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
          transition={{ type: "spring", stiffness: 150, damping: 20 }} // Slower and smoother transition
          style={{ paddingLeft: containerPadding }} // Add space before the first card
        >
          {serviceArr.map((service, index) => (
            <div
              key={index}
              className="bg-white text-black p-7 rounded-xl shadow-lg flex-shrink-0 w-[500px] bg-gradient-to-br from-[#231442] to-[#331a63] border border-white"
            >
              {/* Image Section */}
              <div className="h-[200px] w-full mb-4 overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.head}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-2">{service.head}</h3>

              {/* Description */}
              <p className="text-base text-white">{service.para}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardMotion;