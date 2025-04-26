import { useState, useEffect, useRef } from "react";

export default function ScrollingServicesSection() {
  const [activeSection, setActiveSection] = useState("web");
  const [menuPosition, setMenuPosition] = useState("off");
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

        if (serviceSectionRef.current) {
          const sectionTop = serviceSectionRef.current.offsetTop;
          const sectionBottom =
            sectionTop + serviceSectionRef.current.offsetHeight;
          const hideOffset = 400;
          if (
            scrollPosition >= sectionTop + 200 &&
            scrollPosition <= sectionBottom - hideOffset
          ) {
            if (menuPosition === "off" || menuPosition === "exiting") {
              setMenuPosition("entering");
              setTimeout(() => setMenuPosition("active"), 50);
            }
          } else {
            if (menuPosition === "active" || menuPosition === "entering") {
              setMenuPosition("exiting");
              setTimeout(() => setMenuPosition("off"), 300);
            }
          }
        }

        if (menuPosition === "active" || menuPosition === "entering") {
          let currentSection = null;

          Object.entries(sectionRefs).forEach(([key, ref]) => {
            if (ref.current) {
              const rect = ref.current.getBoundingClientRect();
              if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
                currentSection = key;
              }
            }
          });

          if (currentSection && currentSection !== activeSection) {
            setActiveSection(currentSection);
          }
        }

        scrollThrottleRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll);

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

  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
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
      icon: "🔺",
      description:
        "Upgrade your online presence with our Webflow Development agency. We create perfect websites that load fast, look great on any device, and are fully optimized for search engines. Boost your digital presence with our custom Webflow development company solutions.",
      features: [
        "UX/UI design",
        "Custom assets design",
        "Conversion-driven approach",
        "Lottie animations",
      ],
    },
    webflow: {
      title: "Webflow Development",
      icon: "W",
      description:
        "Build to grow. Fast, highly optimized and easy-to-scale Webflow websites built to eliminate bottlenecks and allow faster time-to-market.",
      features: [
        "Migrations from different platforms",
        "Website automations and integrations",
        "CMS and CRM implementation",
        "Extensive quality assurance",
      ],
    },
    growth: {
      title: "Growth",
      icon: "📊",
      description:
        "Growing qualified pipeline. Helping GTM experts drive more traffic with the help of our SEO and Ads experts. The same people who got you to land on this page.",
      features: [
        "SEO research and strategy",
        "Content production",
        "Technical and on-page SEO",
        "Performance advertising",
      ],
    },
    strategy: {
      title: "Strategy & Consulting",
      icon: "💼",
      description:
        "Expert guidance to shape your digital strategy and achieve business objectives.",
      features: [
        "Digital transformation roadmaps",
        "Technology stack planning",
        "Market research and insights",
        "Business process optimization",
      ],
    },
  };

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
      <h1 className="text-4xl text-left sm:text-5xl lg:text-6xl max-w-4xl mx-auto font-bold mt-14 ml-8">
        End-to-grow
        <span className="text-[#9333ea]"> solution</span>
      </h1>
      <div className="max-w-6xl mx-auto px-6">
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
        <div className="ml-0 md:ml-64 py-12 -mb-36 ">
          {Object.entries(services).map(([key, service]) => (
            <div
              key={key}
              ref={sectionRefs[key]}
              className="py-24 min-h-screen border-t border-b border-gray-700 first:border-t-0"
              id={`service-${key}`}
            >
              <div className="flex items-center mb-6">
                {key === "web" && (
                  <span className="text-pink-300 text-3xl mr-4">
                    {service.icon}
                  </span>
                )}
                {key === "webflow" && (
                  <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-2xl">
                      {service.icon}
                    </span>
                  </div>
                )}
                {key === "growth" && (
                  <div className="flex mr-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="24"
                        width="6"
                        height="12"
                        rx="1"
                        fill="#6B7280"
                      />
                      <rect
                        x="16"
                        y="18"
                        width="6"
                        height="18"
                        rx="1"
                        fill="#6B7280"
                      />
                      <rect
                        x="28"
                        y="10"
                        width="6"
                        height="26"
                        rx="1"
                        fill="#10B981"
                      />
                    </svg>
                  </div>
                )}
                {key === "strategy" && (
                  <div className="mr-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="10"
                        height="10"
                        rx="1"
                        fill="#10B981"
                      />
                      <rect
                        x="4"
                        y="18"
                        width="10"
                        height="10"
                        rx="1"
                        fill="#10B981"
                        fillOpacity="0.7"
                      />
                      <rect
                        x="18"
                        y="4"
                        width="10"
                        height="10"
                        rx="1"
                        fill="#10B981"
                        fillOpacity="0.5"
                      />
                      <rect
                        x="18"
                        y="18"
                        width="10"
                        height="10"
                        rx="1"
                        fill="#10B981"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                )}
                <h3 className="text-4xl font-bold text-left">
                  {service.title}
                </h3>
              </div>

              <p className="text-lg mb-8 max-w-3xl text-left">
                {service.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>

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
