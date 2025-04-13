"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardMotion = ({ mainHeading, subHeading, serviceArr }) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [cardsPosition, setCardsPosition] = useState(0);
  
  // Calculate maximum scroll distance (depends on number of cards and their width)
  const calculateMaxScroll = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    // Assuming each card is 320px + 32px gap (w-80 with gap-8)
    const totalCardsWidth = serviceArr.length * 352;
    
    // If all cards fit in the container, no need to scroll
    if (totalCardsWidth <= containerWidth) return 0;
    
    // Otherwise, calculate max scroll distance
    return containerWidth - totalCardsWidth;
  };

  useEffect(() => {
    // Update window width on mount and resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle mouse events
  const handleMouseEnter = (e) => {
    setIsHovering(true);
    setCursorPosition(e.clientX);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    
    // Calculate the distance the mouse has moved
    const delta = e.clientX - cursorPosition;
    
    // Update cursor position
    setCursorPosition(e.clientX);
    
    // Calculate new position with boundaries
    const maxScroll = calculateMaxScroll();
    const newPosition = Math.min(0, Math.max(maxScroll, cardsPosition + delta));
    
    // Update cards position
    setCardsPosition(newPosition);
  };

  // Prevent default wheel behavior when hovering cards
  const handleWheel = (e) => {
    if (isHovering) {
      e.preventDefault();
      
      // Move cards horizontally based on wheel movement
      const scrollAmount = e.deltaY;
      
      // Calculate new position with boundaries
      const maxScroll = calculateMaxScroll();
      const newPosition = Math.min(0, Math.max(maxScroll, cardsPosition - scrollAmount));
      
      // Update cards position
      setCardsPosition(newPosition);
    }
  };

  useEffect(() => {
    // Add wheel event listener to container
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHovering, cardsPosition]);

  return (
    <div className="mt-20 px-4 py-16 cursor-pointer">
      <div
        className="text-3xl font-bold mb-6 text-white text-center"
        dangerouslySetInnerHTML={{ __html: mainHeading }}
      ></div>

      <p className="text-center text-gray-300 mb-10 text-lg">{subHeading}</p>

      <div 
        ref={containerRef}
        className="overflow-hidden max-w-10xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          className="flex flex-nowrap gap-8"
          animate={{ x: cardsPosition }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {serviceArr.map((service, index) => (
            <div
              key={index}
              className="bg-white text-black p-7 rounded-xl shadow-lg flex-shrink-0 w-full md:w-80"
            >
              <h3 className="text-xl font-semibold mb-2">{service.head}</h3>
              <p className="text-base text-gray-700">{service.para}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardMotion;