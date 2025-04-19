"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CardMotion = ({ mainHeading, subHeading, serviceArr }) => {
  const containerRef = useRef(null);
  const [cardsPosition, setCardsPosition] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);

  const cardWidth = 780; // Width for desktop
  const gap = 32;
  const totalCardsWidth = serviceArr.length * (cardWidth + gap) - gap;
  const containerPadding = 100;

  const handleWheel = (e) => {
    e.preventDefault();
    const scrollAmount = e.deltaY;
    const scrollMultiplier = 1.5;

    let newPosition = cardsPosition - scrollAmount * scrollMultiplier;
    const containerWidth = containerRef.current.clientWidth;
    const minPosition = -(totalCardsWidth - containerWidth + containerPadding);

    if (newPosition < minPosition) {
      newPosition = minPosition;
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }

    if (newPosition > containerPadding) {
      newPosition = containerPadding;
      setIsAtStart(true);
    } else {
      setIsAtStart(false);
    }

    setCardsPosition(newPosition);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;

    const touchX = e.touches[0].clientX;
    const deltaX = touchStartX - touchX;

    let newPosition = cardsPosition - deltaX;
    const containerWidth = containerRef.current.clientWidth;
    const minPosition = -(totalCardsWidth - containerWidth + containerPadding);

    if (newPosition < minPosition) {
      newPosition = minPosition;
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }

    if (newPosition > containerPadding) {
      newPosition = containerPadding;
      setIsAtStart(true);
    } else {
      setIsAtStart(false);
    }

    setCardsPosition(newPosition);
    setTouchStartX(touchX);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [cardsPosition, touchStartX]);

  return (
    <div className="mt-4 px-4 py-16 cursor-pointer">
      <div
        className="text-3xl font-bold mb-6 text-white text-center"
        dangerouslySetInnerHTML={{ __html: mainHeading }}
      ></div>

      <p className="text-center text-white mb-10 text-lg">{subHeading}</p>

      <div ref={containerRef} className="overflow-hidden max-w-8xl mx-auto">
        <motion.div
          className="flex flex-nowrap gap-8"
          animate={{ x: cardsPosition }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          style={{ paddingLeft: containerPadding }}
        >
          {serviceArr.map((service, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-xl shadow-lg flex-shrink-0 w-[90vw] md:w-[780px] flex items-stretch gap-6"
              style={{
                background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              }}
            >
              <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/100 rounded-full blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-0 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

              {/* Text */}
              <div className="flex-1 p-6 flex flex-col justify-center text-start rounded-xl">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {service.head}
                </h3>
                <p className="text-base text-white">{service.para}</p>
              </div>

              {/* Image */}
              <div className="flex-shrink-0 w-1/2 h-full hidden md:block sm:block">
                <Image
                  src={service.image}
                  alt={service.head}
                  className="w-full h-full object-cover rounded-r-xl"
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