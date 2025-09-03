import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Use root-relative paths for public assets
const css5 = "/webflow-age/thecss/css1.png";
const css4 = "/webflow-age/thecss/css6.png";
const css3 = "/webflow-age/thecss/css3.png";
const css1 = "/webflow-age/thecss/css4.png";
const css2 = "/webflow-age/thecss/css5.png";
const css6 = "/webflow-age/thecss/css2.png";

export default function ServiceCardCarousel() {
  const serviceCards = [
    {
      image: css5,
      title: "Flexible Pricing",
      desc: "We work with early-stage teams who value speed and flexibility. Whether it's a multi-page build or just a homepage, we scope based on what you actually need — even if it's one page at a time.",
    },
    {
      image: css3,
      title: "Fast Turnaround",
      desc: "Early-stage startups move fast — and we're built for that. We've delivered investor-ready Webflow pages in under a week, from idea to launch.",
    },
    {
      image: css2,
      title: "Product-Aware Team",
      desc: "Our Webflow specialists work directly with founders and marketing leads — so every build aligns with the product narrative and gets shipped faster, with less back and forth.",
    },
    {
      image: css6,
      title: "Modern Interactions",
      desc: "YC startups build with urgency — and we match that urgency with clean, responsive UI. From scroll behavior to micro-animations, we design with precision, so every interaction feels fast, modern, and intentional.",
    },
    {
      image: css1,
      title: "Built for First Impressions",
      desc: "Whether it's launch day, a demo link, or your deck's footer — we build sites that explain what you do clearly and make people take you seriously.",
    },
    {
      image: css4,
      title: "Page Speed Optimization",
      desc: "We build a site with a clean structure so it won't impact the page speed. As a Webflow development agency, we ensure that Google's core web vitals are in green.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? serviceCards.length - (isMobile ? 1 : 3) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= serviceCards.length - (isMobile ? 1 : 3) ? 0 : prevIndex + 1
    );
  };

  const scrollToCard = (index) => {
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.offsetWidth / (isMobile ? 1 : 3);
      cardsRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToCard(currentIndex);
  }, [currentIndex, isMobile]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden">
        <div
          ref={cardsRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className={`snap-center transition-all duration-500 p-4 ${
                isMobile ? "w-full flex-shrink-0" : "w-1/3 flex-shrink-0"
              }`}
            >
              <ServiceCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          className="p-2 bg-black border border-solid-[0.5px] border-gray-600 shadow-md rounded-full hover:bg-gray-500 hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 transition-all duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-black border border-solid border-gray-600 shadow-md rounded-full hover:bg-gray-500 hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 transition-all duration-300"
          aria-label="Next card"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ card }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative h-full rounded-xl shadow-lg overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: "#212728",
        backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        border: "2px solid rgba(60, 63, 84, 0.3)",
      }}
    >
      {isHovering && (
        <div
          className="absolute pointer-events-none blur-xl opacity-30 z-10 rounded-full"
          style={{
            backgroundColor: "#515254",
            width: "320px",
            height: "320px",
            transform: `translate(${cursorPosition.x - 160}px, ${
              cursorPosition.y - 160
            }px)`,
            transition: "transform 0.05s ease-out",
          }}
        ></div>
      )}

      <div className="relative z-0 p-6 flex flex-col h-full">
        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl text-left font-bold mb-3">{card.title}</h3>
          <p className="text-[#83848e] text-left text-sm">{card.desc}</p>
        </div>

        {/* Image */}
        <div className="mb-4 overflow-hidden rounded-lg mt-12">
          <Image
            src={card.image}
            alt={`Service: ${card.title}`}
            className="w-full h-full object-cover md:rounded-r-xl"
            width={600}
            height={550}
          />
        </div>
      </div>
    </div>
  );
}
