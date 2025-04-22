"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CalendlyButton from "../service-video-production/calendlyButton";

const CardMotion = ({ mainHeading, subHeading, serviceArr }) => {
  const containerRef = useRef(null);
  const [cardsPosition, setCardsPosition] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);

  const cardWidth = 780;
  const gap = 32;
  const totalCardsWidth = serviceArr.length * (cardWidth + gap) - gap;
  const containerPadding = 100;

  const clampScroll = (pos) => {
    const containerWidth = containerRef.current.clientWidth;
    const minPosition = -(totalCardsWidth - containerWidth + containerPadding);

    if (pos < minPosition) {
      setIsAtEnd(true);
      return minPosition;
    } else {
      setIsAtEnd(false);
    }

    if (pos > containerPadding) {
      setIsAtStart(true);
      return containerPadding;
    } else {
      setIsAtStart(false);
    }

    return pos;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const scrollAmount = e.deltaY * 1.5;
    const newPos = clampScroll(cardsPosition - scrollAmount);
    setCardsPosition(newPos);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const deltaX = touchStartX - e.touches[0].clientX;
    const newPos = clampScroll(cardsPosition - deltaX);
    setCardsPosition(newPos);
    setTouchStartX(e.touches[0].clientX);
  };

  // Automatically scroll the carousel in mobile view
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const interval = setInterval(() => {
        setCardsPosition((prevPosition) => {
          const newPos = clampScroll(prevPosition - cardWidth - gap);
          return newPos;
        });
      }, 3000); // Scroll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [cardsPosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [cardsPosition, touchStartX]);

  return (
    <div className="mt-4 md:px-4 md:py-16 cursor-pointer">
      <h2
        className="text-3xl font-bold mb-6 text-white text-center"
        dangerouslySetInnerHTML={{ __html: mainHeading }}
      />
      <p className="text-center text-white mb-10 text-lg">{subHeading}</p>

      <div
        ref={containerRef}
        className="overflow-hidden max-w-8xl mx-auto touch-pan-x"
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
              className="relative bg-white text-black rounded-xl shadow-lg flex-shrink-0 w-[90vw] md:w-[780px] flex flex-col-reverse md:flex-row items-stretch gap-6 overflow-hidden "
              style={{
                backgroundColor: "#141318",
                backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                border: "2px solid rgba(60, 63, 84, 0.3)",
              }}
            >
              {/* Gradient blobs */}
              <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500 rounded-full blur-3xl" />
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />

              {/* Text Section */}
              <div className="flex-1 p-6 flex flex-col justify-start text-start ">
                <h3 className="text-lg md:text-2xl font-semibold mb-4 text-white ">
                  {service.head}
                </h3>
                <p className="text-sm md:text-base text-white">
                  {service.para}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-[250px] md:h-full flex-shrink-0">
                <Image
                  src={service.image}
                  alt={`Service: ${service.head}`}
                  className="w-full h-full object-cover md:rounded-r-xl"
                  width={600}
                  height={550}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center mt-6 md:mt-10">
        <CalendlyButton name="Book a Demo" />
      </div>
    </div>
  );
};

export default CardMotion;
