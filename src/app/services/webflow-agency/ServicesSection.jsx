import { useState, useEffect, useRef } from "react";

export default function ScrollingServicesSection() {
  const [activeSection, setActiveSection] = useState("web");
  const [menuPosition, setMenuPosition] = useState("off"); // "off", "entering", "active", "exiting"
  const serviceSectionRef = useRef(null);
  const scrollThrottleRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const sectionRefs = {
    web: useRef(null),
    webflow: useRef(null),
    growth: useRef(null),
    strategy: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;

      scrollThrottleRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        // Check if we're in the services section
        if (serviceSectionRef.current) {
          const sectionTop = serviceSectionRef.current.offsetTop;
          const sectionBottom =
            sectionTop + serviceSectionRef.current.offsetHeight;
          const hideOffset = 300;
          // Update menu position state based on scroll
          if (
            scrollPosition >= sectionTop &&
            scrollPosition <= sectionBottom - hideOffset
          ) {
            // We're inside the services section
            if (menuPosition === "off" || menuPosition === "exiting") {
              setMenuPosition("entering");
              setTimeout(() => setMenuPosition("active"), 50);
            }
          } else {
            // We're outside the services section
            if (menuPosition === "active" || menuPosition === "entering") {
              setMenuPosition("exiting");
              setTimeout(() => setMenuPosition("off"), 300);
            }
          }
        }

        // Update active section only if we're within the services section
        if (menuPosition === "active" || menuPosition === "entering") {
          // Find the actual visible section in the viewport
          let currentSection = null;

          // Check each section from top to bottom
          Object.entries(sectionRefs).forEach(([key, ref]) => {
            if (ref.current) {
              const rect = ref.current.getBoundingClientRect();
              // Consider a section "in view" if its top is within the upper half of the viewport
              if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
                currentSection = key;
              }
            }
          });

          // Only update if we found a section and it's different from current
          if (currentSection && currentSection !== activeSection) {
            setActiveSection(currentSection);
          }
        }

        scrollThrottleRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check after a short delay to ensure refs are set
    const initialTimer = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initialTimer);
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [activeSection, menuPosition]);

  // Function to scroll to section when menu item is clicked
  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      // Set active section immediately to avoid flickering
      setActiveSection(sectionId);

      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const services = {
    web: {
      title: "Web Design",
      description:
        "Upgrade your online presence with our Webflow Development agency. We create perfect websites that load fast, look great on any device, and are fully optimized for search engines. Boost your digital presence with our custom Webflow development company solutions.",
    },
    webflow: {
      title: "Webflow Development",
      description:
        "Build to grow. Fast, highly optimized and easy-to-scale Webflow websites built to eliminate bottlenecks and allow faster time-to-market.",
    },
    growth: {
      title: "Growth",
      description:
        "Growing qualified pipeline. Helping GTM experts drive more traffic with the help of our SEO and Ads experts. The same people who got you to land on this page.",
    },
    strategy: {
      title: "Strategy & Consulting",
      description:
        "Expert guidance to shape your digital strategy and achieve business objectives.",
    },
  };

  // Calculate sidebar position and visibility styles based on menuPosition state
  const getSidebarStyles = () => {
    switch (menuPosition) {
      case "off":
        return {
          transform: "translateX(-100%)",
          opacity: 0,
          pointerEvents: "none",
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        };
      case "entering":
        return {
          transform: "translateX(-80%)",
          opacity: 0.5,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        };
      case "active":
        return {
          transform: "translateX(0)",
          opacity: 1,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        };
      case "exiting":
        return {
          transform: "translateX(-60%)",
          opacity: 0.3,
          pointerEvents: "none",
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        };
      default:
        return {
          transform: "translateX(-100%)",
          opacity: 0,
        };
    }
  };

  return (
    <div
      className="bg-navy-900 text-white min-h-screen relative"
      ref={serviceSectionRef}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Fixed sidebar menu with controlled visibility and animation */}
        <div
          className={`fixed left-0 top-16 w-72 p-12 mb-36 ${
            isMobile ? "hidden" : "flex flex-col"
          }`}
          style={{
            zIndex: 10,
            ...getSidebarStyles(),
          }}
        >
          <h2 className="text-xl font-semibold mb-12">OUR SERVICES</h2>

          <nav className="space-y-8">
            {Object.entries(services).map(([key, service]) => (
              <div
                key={key}
                onClick={() => scrollToSection(key)}
                className={`cursor-pointer text-xl transition-colors duration-300 flex items-center ${
                  activeSection === key ? "text-white" : "text-gray-400"
                }`}
              >
                {activeSection === key && (
                  <span className="text-cyan-400 mr-2 text-lg">●</span>
                )}
                <span className={activeSection === key ? "font-medium" : ""}>
                  {service.title.split(" ")[0]}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Content area with proper spacing */}
        <div className="ml-0 md:ml-64 py-12">
          {Object.entries(services).map(([key, service]) => (
            <div
              key={key}
              ref={sectionRefs[key]}
              className="py-24 min-h-screen border-t border-gray-700 first:border-t-0"
              id={`service-${key}`}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-4xl font-bold text-left">
                  {service.title}
                </h3>
              </div>

              <p className="text-lg mb-8 max-w-3xl text-left">
                {service.description}
              </p>

              <div className="mt-12">
                <a
                  href={`#service-${key}`}
                  className="flex items-center text-lg border-b border-gray-500 pb-1 w-max"
                >
                  Explore service
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
