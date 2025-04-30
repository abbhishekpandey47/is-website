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
                      height="40px"
                      width="37px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <g transform="translate(0 1)">
                        <path
                          fill="#FCC309"
                          d="M332.8,485.4H179.2c0-18.773,15.36-34.133,34.133-34.133h85.333C317.44,451.267,332.8,466.627,332.8,485.4"
                        />
                        <path
                          fill="#FD9808"
                          d="M324.267,451.267h-25.6c18.773,0,34.133,15.36,34.133,34.133h25.6C358.4,466.627,343.04,451.267,324.267,451.267"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M213.333,451.267h-25.6c-18.773,0-34.133,15.36-34.133,34.133h25.6C179.2,466.627,194.56,451.267,213.333,451.267"
                        />
                        <polygon
                          fill="#FCC309"
                          points="290.133,451.267 221.867,451.267 231.253,383 280.747,383"
                        />
                        <polygon
                          fill="#FFFFFF"
                          points="213.333,383 196.267,451.267 221.867,451.267 231.253,383"
                        />
                        <polygon
                          fill="#FD9808"
                          points="298.667,383 280.747,383 290.133,451.267 315.733,451.267"
                        />
                        <g>
                          <path
                            fill="#FFDD09"
                            d="M349.867,442.733h-25.6c18.773,0,34.133,23.04,34.133,51.2h17.067c5.12,0,8.533-7.68,7.68-14.507C378.027,458.093,365.227,442.733,349.867,442.733"
                          />
                          <polygon
                            fill="#FFDD09"
                            points="324.267,383 306.347,383 315.733,451.267 341.333,451.267"
                          />
                          <path
                            fill="#FFDD09"
                            d="M477.867,314.733H34.133V54.467C34.133,38.253,47.787,24.6,64,24.6h384c16.213,0,29.867,13.653,29.867,29.867V314.733z"
                          />
                        </g>
                        <path
                          fill="#FFFFFF"
                          d="M64,24.6H38.4c-16.213,0-29.867,13.653-29.867,29.867v260.267h25.6V54.467C34.133,38.253,47.787,24.6,64,24.6"
                        />
                        <path
                          fill="#FD9808"
                          d="M473.6,24.6H448c16.213,0,29.867,13.653,29.867,29.867v260.267h25.6V54.467C503.467,38.253,489.813,24.6,473.6,24.6"
                        />
                        <path
                          fill="#FCC309"
                          d="M448,383H64c-16.213,0-29.867-13.653-29.867-29.867v-38.4h443.733v38.4C477.867,369.347,464.213,383,448,383"
                        />
                        <path
                          fill="#FFFFFF"
                          d="M34.133,353.133v-38.4h-25.6v38.4C8.533,369.347,22.187,383,38.4,383H64C47.787,383,34.133,369.347,34.133,353.133"
                        />
                        <path
                          fill="#FD9808"
                          d="M477.867,314.733v38.4C477.867,369.347,464.213,383,448,383h25.6c16.213,0,29.867-13.653,29.867-29.867v-38.4H477.867z"
                        />
                        <path d="M503.467,323.267H8.533c-5.12,0-8.533-3.413-8.533-8.533V280.6c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v25.6h477.867V54.467c0-11.947-9.387-21.333-21.333-21.333H38.4c-11.947,0-21.333,9.387-21.333,21.333v157.867c0,5.12-3.413,8.533-8.533,8.533S0,217.453,0,212.333V54.467c0-21.333,17.067-38.4,38.4-38.4h435.2c21.333,0,38.4,17.067,38.4,38.4v260.267C512,319.853,508.587,323.267,503.467,323.267z" />
                        <path d="M17.067,246.467c0-5.12-3.413-8.533-8.533-8.533S0,241.347,0,246.467C0,251.587,3.413,255,8.533,255S17.067,251.587,17.067,246.467" />
                        <polygon
                          fill="#15A143"
                          points="85.333,178.2 204.8,178.2 204.8,58.733 85.333,58.733"
                        />
                        <polygon
                          fill="#1CD759"
                          points="85.333,178.2 179.2,178.2 179.2,58.733 85.333,58.733"
                        />
                        <path d="M358.4,493.933H153.6c-5.12,0-8.533-3.413-8.533-8.533c0-23.893,18.773-42.667,42.667-42.667h136.533c23.893,0,42.667,18.773,42.667,42.667C366.933,490.52,363.52,493.933,358.4,493.933z M163.84,476.867h185.173c-3.413-10.24-12.8-17.067-23.893-17.067H187.733C176.64,459.8,167.253,466.627,163.84,476.867z" />
                        <path d="M315.733,459.8H196.267c-2.56,0-5.12-0.853-6.827-3.413c-1.707-1.707-1.707-4.267-1.707-6.827l17.067-68.267c0.853-3.413,4.267-6.827,8.533-6.827h85.333c4.267,0,7.68,2.56,8.533,6.827l17.067,68.267c0.853,2.56,0,5.12-1.707,7.68C320.853,458.947,318.293,459.8,315.733,459.8z M207.36,442.733h97.28l-12.8-51.2h-71.68L207.36,442.733z" />
                        <path d="M473.6,391.533H38.4c-21.333,0-38.4-17.067-38.4-38.4v-38.4c0-5.12,3.413-8.533,8.533-8.533h494.933c5.12,0,8.533,3.413,8.533,8.533v38.4C512,374.467,494.933,391.533,473.6,391.533z M17.067,323.267v29.867c0,11.947,9.387,21.333,21.333,21.333h435.2c11.947,0,21.333-9.387,21.333-21.333v-29.867H17.067z" />
                        <path d="M426.667,280.6h-128c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h128c5.12,0,8.533,3.413,8.533,8.533S431.787,280.6,426.667,280.6z" />
                        <path d="M170.667,229.4H85.333c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h85.333c5.12,0,8.533,3.413,8.533,8.533C179.2,225.987,175.787,229.4,170.667,229.4z" />
                        <path d="M384,229.4H256c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h128c5.12,0,8.533,3.413,8.533,8.533C392.533,225.987,389.12,229.4,384,229.4z" />
                        <path d="M256,280.6H128c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h128c5.12,0,8.533,3.413,8.533,8.533S261.12,280.6,256,280.6z" />
                        <path d="M426.667,127h-128c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h128c5.12,0,8.533,3.413,8.533,8.533S431.787,127,426.667,127z" />
                        <path d="M426.667,178.2h-85.333c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h85.333c5.12,0,8.533,3.413,8.533,8.533C435.2,174.787,431.787,178.2,426.667,178.2z" />
                        <path d="M273.067,178.2H256c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h17.067c5.12,0,8.533,3.413,8.533,8.533C281.6,174.787,278.187,178.2,273.067,178.2z" />
                        <path d="M384,75.8H256c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h128c5.12,0,8.533,3.413,8.533,8.533S389.12,75.8,384,75.8z" />
                        <path d="M213.333,186.733H76.8V50.2h136.533V186.733z M93.867,169.667h102.4v-102.4h-102.4V169.667z" />
                      </g>
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
                    <div className="w-4 h-4 bg-gradient-to-r from-[#1966ff] to-[#8c1eff] rounded-full flex items-center justify-center mr-3 mt-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2.5 w-2.5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
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
