import { useState, useEffect, useRef } from "react";

export default function ServicesSectionWithContainedMenu() {
  const [activeSection, setActiveSection] = useState("webflow");
  const sectionRefs = {
    web: useRef(null),
    webflow: useRef(null),
    growth: useRef(null),
    strategy: useRef(null),
  };
  const servicesContainerRef = useRef(null);

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      if (!servicesContainerRef.current) return;

      const scrollPosition = window.scrollY;
      const containerTop = servicesContainerRef.current.offsetTop;
      const containerBottom =
        containerTop + servicesContainerRef.current.offsetHeight;

      // Only activate scroll detection within the services section
      if (scrollPosition >= containerTop && scrollPosition <= containerBottom) {
        // Find which section is currently visible
        Object.entries(sectionRefs).forEach(([key, ref]) => {
          if (
            ref.current &&
            ref.current.offsetTop <= scrollPosition + 200 &&
            ref.current.offsetTop + ref.current.offsetHeight > scrollPosition
          ) {
            setActiveSection(key);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to section when menu item is clicked
  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const services = {
    web: {
      title: "Web design",
      icon: "🔺",
      description:
        "Design beyond pretty pixels. Performance design approach that resonates with target audiences, matches your brand, and most importantly – converts.",
      features: [
        "UX/UI design",
        "Custom assets design",
        "Conversion-driven approach",
        "Lottie animations",
      ],
    },
    webflow: {
      title: "Webflow development",
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
      title: "Strategy & consulting",
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

  return (
    <div className="bg-gray-900 text-white">
      {/* Example Header Section */}
      <div className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Agency Website</h1>
        <p className="text-xl max-w-2xl mx-auto">
          This is an example header section. The services section below will
          have a fixed left menu only within its container.
        </p>
      </div>

      {/* Services Section with contained fixed menu */}
      <div ref={servicesContainerRef} className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row">
            {/* Left menu - fixed only within services section */}
            <div
              className="hidden md:block w-64 md:sticky self-start"
              style={{
                top: "24px",
                maxHeight: "calc(100vh - 48px)",
                overflow: "auto",
              }}
            >
              <h2 className="text-xl font-semibold mb-12">OUR SERVICES</h2>

              <nav className="space-y-8">
                {Object.entries(services).map(([key, service]) => (
                  <div
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`cursor-pointer text-xl transition-colors duration-300 ${
                      activeSection === key ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {activeSection === key && key === "growth" && (
                      <span className="text-cyan-400 mr-2">●</span>
                    )}
                    {service.title}
                  </div>
                ))}
              </nav>
            </div>

            {/* Scrollable content sections */}
            <div className="flex-1 md:pl-12">
              {Object.entries(services).map(([key, service]) => (
                <div
                  key={key}
                  ref={sectionRefs[key]}
                  className="py-20 min-h-screen border-t border-gray-700 first:border-t-0"
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
                      <div className="mr-4">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0"
                            y="28"
                            width="8"
                            height="12"
                            rx="2"
                            fill="#6B7280"
                          />
                          <rect
                            x="16"
                            y="20"
                            width="8"
                            height="20"
                            rx="2"
                            fill="#6B7280"
                          />
                          <rect
                            x="32"
                            y="12"
                            width="8"
                            height="28"
                            rx="2"
                            fill="#10B981"
                          />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-4xl font-bold">{service.title}</h3>
                  </div>

                  <p className="text-lg mb-8 max-w-3xl">
                    {service.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
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
      </div>

      {/* Example Footer Section */}
      <div className="py-20 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg">
            This is an example footer section that appears after the services
            section.
          </p>
        </div>
      </div>
    </div>
  );
}
