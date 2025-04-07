"use client";

import { useState, useEffect, useRef } from "react";

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Sample data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Small Business Owner",
      image: "/api/placeholder/80/80",
      quote:
        "Since integrating this solution into our workflow, we've experienced a significant improvement in efficiency and collaboration.",
    },
    {
      id: 2,
      name: "David Patel",
      position: "Project Manager",
      image: "/api/placeholder/80/80",
      quote:
        "I've tested numerous options in this category, but one stands out for its intuitive design and comprehensive functionality.",
    },
    {
      id: 3,
      name: "Emily Carter",
      position: "Operations Manager",
      image: "/api/placeholder/80/80",
      quote:
        "The tool we've adopted has surpassed our expectations, providing invaluable insights and support as our business continues to grow.",
    },
    {
      id: 4,
      name: "Michael Chen",
      position: "Marketing Director",
      image: "/api/placeholder/80/80",
      quote:
        "The analytics capabilities have transformed how we approach our campaigns. We're now able to make data-driven decisions faster than ever.",
    },
    {
      id: 5,
      name: "Priya Singh",
      position: "CTO",
      image: "/api/placeholder/80/80",
      quote:
        "Integration was seamless, and the technical support has been responsive to all our questions. A reliable solution for our tech stack.",
    },
    {
      id: 6,
      name: "James Wilson",
      position: "E-commerce Manager",
      image: "/api/placeholder/80/80",
      quote:
        "Our conversion rates have improved by 35% since implementing this platform. The ROI has been remarkable in just three months.",
    },
    {
      id: 7,
      name: "Sophia Rodriguez",
      position: "Customer Success Lead",
      image: "/api/placeholder/80/80",
      quote:
        "Our customer satisfaction scores have reached an all-time high. The intuitive interface makes onboarding new clients a breeze.",
    },
    {
      id: 8,
      name: "Thomas Wright",
      position: "Sales Director",
      image: "/api/placeholder/80/80",
      quote:
        "The automation features have freed up our sales team to focus on building relationships rather than administrative tasks.",
    },
    {
      id: 9,
      name: "Aisha Patel",
      position: "Product Manager",
      image: "/api/placeholder/80/80",
      quote:
        "Feature requests are implemented quickly, and the product roadmap aligns perfectly with our evolving needs as a growing company.",
    },
    {
      id: 10,
      name: "Robert Kim",
      position: "Data Analyst",
      image: "/api/placeholder/80/80",
      quote:
        "The reporting capabilities provide deep insights that were previously impossible to obtain without extensive manual effort.",
    },
    {
      id: 11,
      name: "Olivia Martinez",
      position: "HR Director",
      image: "/api/placeholder/80/80",
      quote:
        "Managing our team's workflow has never been easier. The collaborative features have improved our internal communication significantly.",
    },
    {
      id: 12,
      name: "Daniel Johnson",
      position: "Financial Analyst",
      image: "/api/placeholder/80/80",
      quote:
        "The ROI tracking features have made budget planning much more precise. We can now allocate resources with greater confidence.",
    },
    {
      id: 13,
      name: "Emma Thompson",
      position: "Content Strategist",
      image: "/api/placeholder/80/80",
      quote:
        "The platform's content management tools have streamlined our publishing process and improved our editorial workflow considerably.",
    },
    {
      id: 14,
      name: "Lucas Garcia",
      position: "IT Administrator",
      image: "/api/placeholder/80/80",
      quote:
        "Security and compliance features are robust, giving us peace of mind when handling sensitive client data across our organization.",
    },
    {
      id: 15,
      name: "Zoe Williams",
      position: "UX Designer",
      image: "/api/placeholder/80/80",
      quote:
        "The user interface is exceptionally well-designed. As a designer myself, I appreciate the attention to detail and thoughtful user flows.",
    },
  ];

  // 3 testimonials per slide
  const slidesCount = Math.ceil(testimonials.length / 3);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What people say
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover what our satisfied customers have to say about their
          experiences with our products/services.
        </p>
      </div>

      {/* sestimonial slider */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, #1f2337 0%, #111226 80%)",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="grid grid-rows-6 gap-4 h-full">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="border border-gray-500 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* carousel area  */}
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
                className="min-w-full flex justify-center gap-8 overflow-x-auto p-4"
                style={{ pointerEvents: "auto" }}
              >
                {testimonials
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-80"
                      draggable="false"
                    >
                      <div
                        className="rounded-2xl p-6 h-full relative overflow-hidden"
                        style={{
                          backgroundColor: "#141318",
                          backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                          border: "2px solid rgba(60, 63, 84, 0.3)",
                        }}
                      >
                        <div className="flex flex-col items-start text-left">
                          <div className="flex items-center mb-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-indigo-400">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                draggable="false"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {item.name}
                              </h3>
                              <p className="text-indigo-400 text-sm">
                                {item.position}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{item.quote}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* navigation  */}
        <div className="flex justify-center mt-8 relative z-10">
          <button
            onClick={handlePrev}
            className="mx-2 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

          <div className="flex items-center mx-4">
            {Array.from({ length: slidesCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => jumpToSlide(index)}
                className={`mx-1 w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-indigo-500 w-4" : "bg-gray-500"
                } transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="mx-2 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        </div>
      </div>
    </div>
  );
}
