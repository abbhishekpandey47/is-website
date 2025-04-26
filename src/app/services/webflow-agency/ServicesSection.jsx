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
          const hideOffset = 300;
          if (
            scrollPosition >= sectionTop + 300 &&
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
      head: "Webflow Design",
      title: "Web Design for Fast-Moving Startups",
      icon: "🔺",
      description:
        "Your product changes weekly — your site should too. We help YC-backed and modern SaaS companies launch Webflow sites that scale with their roadmap, from feature drops to pricing experiments to new verticals. Test messaging, ship new pages, and move fast — without waiting on dev cycles.",
      features: [
        "UX/UI tailored to GTM needs",
        "Conversion-first layout logic",
        "Dev-free content workflows",
        "Smooth Lottie and scroll-based interactions",
      ],
    },
    webflow: {
      head: "Webflow Development",
      title: "Webflow Development",
      icon: "W",
      description:
        "Startups don’t move slow — you’re shipping new features every week, pivoting messaging, launching products, maybe even prepping a KubeCon demo. Your site can’t be a blocker. That’s why early teams — especially YC-backed and B2B SaaS startups — move to Webflow. We help you set up a system where landing pages, announcements, and copy updates take hours, not weeks.",
      features: [
        "Spin up new landing pages in hours, not weeks",
        "Launch product updates, demos, and announcements fast",
        "Test new messaging and run experiments without dev bottlenecks",
        "Keep your site evolving alongside your product roadmap",
      ],
    },
    growth: {
      head: "Webflow Migration",
      title: "Migration to Webflow",
      icon: "📊",
      description:
        "Migrating platforms shouldn’t mean starting over.We help you move from WordPress, Wix, or Framer — without losing traffic, SEO, or structure..",
      features: [
        "Migrate seamlessly from WordPress without SEO or content loss",
        "Switch from Wix or Squarespace with zero downtime",
        "Move from Framer or custom-built CMS to Webflow effortlessly",
        "Structured migrations that protect your rankings, URLs, and performance",
      ],
    },
    strategy: {
      head: "Maintenance & Support",
      title: "Webflow Maintenance & Support",
      icon: "💼",
      description:
        "Early-stage startups rarely stick to one design.Your branding evolves, product positioning shifts, and your website needs frequent updates—fast. We help you maintain a pixel-perfect Webflow site, translating Figma prototypes rapidly into production-ready pages without bottlenecks..",
      features: [
        "Rapid updates from Figma prototypes to live Webflow",
        "Seamless branding changes & design refreshes",
        "Seamless, same-day design updates from Day 1",
        "Ongoing, expert Webflow support—no dev delays",
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
        Webflow Website That Evolve As Fast As Your
        <span className="text-[#9333ea]"> Product</span>
      </h1>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`fixed left-0 top-16 w-72 p-12 ${
            isMobile ? "hidden" : "flex flex-col"
          }`}
          style={{
            zIndex: 10,
            ...getSidebarStyles(),
          }}
        >
          <h2 className="w-full text-[19px] text-left font-semibold mb-12">
            Webflow for Startups
          </h2>

          <nav className="space-y-8">
            {Object.entries(services).map(([key, service]) => (
              <div
                key={key}
                onClick={() => scrollToSection(key)}
                className={`cursor-pointer text-[16px] transition-colors duration-300 flex items-center ${
                  activeSection === key ? "text-white" : "text-gray-400"
                }`}
              >
                {activeSection === key && (
                  <span className="text-cyan-400 mr-2 text-lg">●</span>
                )}
                <span className={activeSection === key ? "font-medium" : ""}>
                  {service.head}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Content area with proper spacing */}
        <div className="ml-0 md:ml-64 py-4 -mb-36 mt-14 ">
          {Object.entries(services).map(([key, service]) => (
            <div
              key={key}
              ref={sectionRefs[key]}
              className="py-20 border-t border-gray-700"
              id={`service-${key}`}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
              }}
            >
              <div className="flex items-center mb-6">
                {key === "web" && (
                  <span className="text-pink-300 text-3xl mr-4">
                    <svg
                      width="30"
                      height="33"
                      viewBox="0 0 30 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.3242 5.00967L23.5217 27.1011C23.1087 29.0009 20.6162 29.4724 19.5378 27.8548L14.5766 20.4129C14.2526 19.927 13.7489 19.5897 13.1763 19.4752L5.92423 18.0248C3.92806 17.6255 3.49611 14.9637 5.26359 13.9537L25.08 2.63008C26.7355 1.68404 28.7292 3.14639 28.3242 5.00967Z"
                        fill="#F5D2FC"
                      />
                    </svg>
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
                      width="29"
                      height="33"
                      viewBox="0 0 29 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.7725 28.6108C28.7754 29.1868 28.6596 29.7568 28.4329 30.2832C28.2062 30.8095 27.8736 31.2801 27.4573 31.6637C27.041 32.0473 26.5505 32.3353 26.0182 32.5085C25.4859 32.6816 24.924 32.7361 24.3698 32.6682C22.3522 32.3601 20.8739 30.5483 20.9231 28.4441V4.25254C20.8743 2.14614 22.3564 0.333302 24.3765 0.0285465C24.9302 -0.0383537 25.4914 0.0168339 26.0228 0.190459C26.5543 0.364084 27.0441 0.65219 27.4596 1.03572C27.8752 1.41925 28.2071 1.88947 28.4334 2.41526C28.6597 2.94106 28.7753 3.51046 28.7725 4.0858V28.6108Z"
                        fill="#00B8C0"
                      />
                      <path
                        d="M4.08096 24.602C6.24855 24.602 8.00567 26.4155 8.00567 28.6524C8.00567 30.8895 6.24855 32.7029 4.08096 32.7029C1.91338 32.7029 0.15625 30.8895 0.15625 28.6526C0.15625 26.4155 1.91338 24.602 4.08096 24.602ZM14.4077 12.3257C12.2299 12.4489 10.5401 14.3342 10.5908 16.5846V27.4645C10.5908 30.4171 11.8497 32.2097 13.6941 32.5917C14.2659 32.7114 14.8564 32.6981 15.4227 32.553C15.9889 32.4079 16.5168 32.1345 16.968 31.7527C17.4192 31.3708 17.7823 30.8902 18.0311 30.3455C18.28 29.8009 18.4082 29.2059 18.4065 28.6037V16.3971C18.4075 15.8575 18.3043 15.323 18.103 14.825C17.9017 14.327 17.6063 13.8753 17.2341 13.4963C16.8619 13.1173 16.4202 12.8186 15.935 12.6177C15.4497 12.4167 14.9305 12.3174 14.4077 12.3257Z"
                        fill="#E9FEFF"
                      />
                    </svg>{" "}
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
                    <span className="text-lg text-left">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
