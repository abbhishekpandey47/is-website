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
          const hideOffset = 250;
          if (
            scrollPosition >= sectionTop + 340 &&
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
      head: "Founders & CEOs",
      title: "Founders & CEOs",
      description:
        "Free up your time from writing tutorials. We transform your vision into content that attracts customers and impresses investors, while you focus on product and strategy.",
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
      ),
    },
    webflow: {
      head: "Content & DevRel Leaders",
      title: "Content & DevRel Leaders",
      description:
        "Scale your technical content without losing quality or maintaining your voice. We already speak AI, DevOps, and cloud.",
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ),
    },
    growth: {
      head: "Marketing & Growth Heads",
      title: "Marketing & Growth Heads",
      description:
        "Align content with GTM goals: product launches, SEO, sales enablement. Think of us as your on-demand technical content squad that executes quickly on campaign needs.",
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3V19A2 2 0 0 0 5 21H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 16L12 11L16 15L21 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
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
      className="bg-gradient-to-b text-white min-h-screen relative pb-14"
      ref={serviceSectionRef}
      style={{
        background:
          "linear-gradient(to right bottom, #2d327d 0%, #090e1b 50%, #2d327d 150%)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-8 py-14">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            A Partner to Founders, Content Heads, and Growth Leads
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            We know you juggle many hats. Infrasity is built to lighten that
            load. We operate as an extension of your team, not an external black
            box.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`fixed left-8 top-28 transform -translate-y-1/2 w-80 ${
            isMobile ? "hidden" : "flex flex-col"
          }`}
          style={{
            zIndex: 10,
            ...getSidebarStyles(),
          }}
        >
          <nav className="space-y-6">
            {Object.entries(services).map(([key, service]) => (
              <div key={key} className="relative">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-4 flex-shrink-0 ${
                      activeSection === key ? "bg-white" : "bg-gray-500"
                    }`}
                  ></div>
                  <div
                    onClick={() => scrollToSection(key)}
                    className={`cursor-pointer transition-all duration-300 ${
                      activeSection === key
                        ? "text-white text-xl font-normal"
                        : "text-gray-400 text-lg hover:text-gray-300"
                    }`}
                  >
                    {service.head}
                  </div>
                </div>
                {service !== "Webflow Maintenance & Support" && (
                  <div className="h-[1.5px] bg-gray-600 mt-6 ml-7"></div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Content area */}
        <div className="ml-0 lg:ml-96 space-y-0">
          {Object.entries(services).map(([key, service], index) => (
            <div
              key={key}
              ref={sectionRefs[key]}
              className="flex py-5 flex-col justify-center"
              id={`service-${key}`}
            >
              <div className="max-w-4xl">
                {/* Service Card */}
                <div
                  className="border-2 border-gray-500 rounded-2xl p-8"
                  style={{
                    background: `
    linear-gradient(190deg, #2a2e72 10%, rgb(25 30 68) 50%, rgba(15, 23, 42, 0.9) 100%)
  `,
                    border: "2px solid rgb(58 60 83)",
                    borderRadius: "16px",
                  }}
                >
                  {/* Icon Block */}
                  <div className="bg-[#232861] rounded-xl p-3 mb-6 inline-block">
                    {service.icon}
                  </div>

                  <div className="quicksand-bold text-[27px] max-sm:text-[1em] leading-[40px] text-white text-center flex justify-left mb-2">
                    <h1 className="text-left ">{service.title}</h1>
                  </div>

                  {/* Description */}
                  <div className="mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
