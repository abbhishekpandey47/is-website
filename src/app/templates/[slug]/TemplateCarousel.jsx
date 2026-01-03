"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Template Carousel Component
const TemplateCarousel = ({ slides, title = "Sample Outline" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    { image: "/template-samples/template-sample-1.png", alt: "Template Example 1" },
    { image: "/template-samples/template-sample-2.png", alt: "Template Example 2" },
    { image: "/template-samples/template-sample-3.png", alt: "Template Example 3" }
  ];

  const activeSlides = Array.isArray(slides) && slides.length ? slides : defaultSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 quicksand-bold text-center">{title}</h2>
      
      <div className="relative rounded-xl overflow-hidden max-w-2xl mx-auto shadow-2xl">
        <div className="relative w-full bg-gradient-to-br from-[#1e1b4b]/20 to-[#312e81]/20" style={{ paddingBottom: '45%' }}>
          {activeSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 p-4 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.src || slide.image}
                alt={slide.alt || "Template Example"}
                fill
                className="object-contain p-2"
                priority={index === 0}
                quality={85}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 py-4 bg-gradient-to-br from-[#1e1b4b]/60 to-[#312e81]/60">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-purple-500 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCarousel;
