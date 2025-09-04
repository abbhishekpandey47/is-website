import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// Use root-relative paths for public assets
const img1 = "/webflow-age/devs/dev1.png";
const img2 = "/webflow-age/devs/dev2.png";
const img3 = "/webflow-age/devs/dev3.png";
const img4 = "/webflow-age/devs/dev4.png";
const img5 = "/webflow-age/devs/dev5.png";
const img6 = "/webflow-age/devs/dev6.png";

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

        // Check if we're in the services section
        if (serviceSectionRef.current) {
          const sectionTop = serviceSectionRef.current.offsetTop;
          const sectionBottom =
            sectionTop + serviceSectionRef.current.offsetHeight;
          const hideOffset = 300;
          // Update menu position state based on scroll
          if (
            scrollPosition >= sectionTop + 200 &&
            scrollPosition <= sectionBottom - hideOffset
          ) {
            // We're inside the services section
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
          // Find the actual visible section in the viewport
          let currentSection = null;

          // Check each section from top to bottom
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
      image: img1,
    },
    webflow: {
      head: "Webflow Development",
      title: "Webflow Development",
      icon: "W",
      description:
        "Startups don't move slow — you're shipping new features every week, pivoting messaging, launching products, maybe even prepping a KubeCon demo. Your site can't be a blocker. That's why early teams — especially YC-backed and B2B SaaS startups — move to Webflow. We help you set up a system where landing pages, announcements, and copy updates take hours, not weeks.",
      features: [
        "Spin up new landing pages in hours, not weeks",
        "Launch product updates, demos, and announcements fast",
        "Test new messaging and run experiments without dev bottlenecks",
        "Keep your site evolving alongside your product roadmap",
      ],
      image: img2,
    },
    growth: {
      head: "Webflow Migration",
      title: "Migration to Webflow",
      icon: "📊",
      description:
        "Migrating platforms shouldn't mean starting over.We help you move from WordPress, Wix, or Framer — without losing traffic, SEO, or structure..",
      features: [
        "Migrate seamlessly from WordPress without SEO or content loss",
        "Switch from Wix or Squarespace with zero downtime",
        "Move from Framer or custom-built CMS to Webflow effortlessly",
        "Structured migrations that protect your rankings, URLs, and performance",
      ],
      image: img3,
    },
    strategy: {
      head: "Maintenance & Support",
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
      image: img4,
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
                className={`cursor-pointer text-sm transition-colors duration-300 flex items-center ${
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
        <div className="ml-0 md:ml-64 pt-20">
          {Object.entries(services).map(([key, service]) => (
            <div
              key={key}
              ref={sectionRefs[key]}
              className="relative bg-white text-black rounded-xl shadow-lg flex-shrink-0 w-[90vw] md:w-[780px] flex flex-col-reverse md:flex-row items-stretch gap-6 overflow-hidden mb-16 "
              style={{
                backgroundColor: "#141318",
                backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                border: "2px solid rgba(60, 63, 84, 0.3)",
              }}
            >
              <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500 rounded-full blur-3xl" />
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />

              <div className="flex-1 p-6 flex flex-col justify-start text-start">
                <h3 className="text-lg md:text-2xl font-semibold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-white">
                  {service.description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-[400px] md:h-[250px] lg:h-full flex-shrink-0">
                <Image
                  src={service.image}
                  alt={`Service: ${service.head}`}
                  className="w-full h-full object-cover md:rounded-r-xl"
                  width={600}
                  height={550}
                />
              </div>
            </div>
          ))}

          {/* {Object.entries(services).map(([key, service]) => (
            <div
              key={key}
              // ref={sectionRefs[key]}
              className="mb-12"
              id={`service-${key}`}
              style={{
                backgroundColor: "#141318",
                backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                border: "2px solid rgba(60, 63, 84, 0.3)",
              }}
            >
              <div className="relative rounded-xl shadow-lg overflow-hidden p-6">
                <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500 rounded-full blur-3xl" />
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />

                <div className="flex items-center mb-6">
                  <h3 className="text-4xl font-bold text-left text-white">
                    {service.title}
                  </h3>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-stretch gap-6">
                  <div className="flex-1 flex flex-col justify-start text-start">
                    <p className="text-lg max-w-3xl text-left text-white">
                      {service.description}
                    </p>
                  </div>

                  <div className="w-full md:w-1/2 h-[400px] md:h-[250px] lg:h-full flex-shrink-0">
                    <Image
                      src={service.image}
                      alt={`Service: ${service.title}`}
                      className="w-full h-full object-cover md:rounded-r-xl"
                      width={600}
                      height={550}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
