"use client";
import FAQ from "@/app/services/tech-video-production/FAQ";
import AnimatedCard from "@/app/services/webflow-agency/AnimatedCard";
import CardComponent from "@/app/services/webflow-agency/CardComponent";
import WebflowMarquee from "@/app/services/webflow-agency/Webflowmarquee";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BookDemo from "../../book-a-demo/cta";
import ContactForm from "../../calendarButton";
import ServicesSection from "./ServicesSection";
import TestimonialSlider from "./Testimonials";
import ThirdPartyIntegrations from "./ThirdPartyIntegrations";
import ClutchBadge from "./clutch";
import Webtable from "./table";
// Use root-relative paths for public assets
const css5 = "/webflow-age/thecss/css1.png";
const css4 = "/webflow-age/thecss/css6.png";
const css3 = "/webflow-age/thecss/css3.png";
const css1 = "/webflow-age/thecss/css4.png";
const css2 = "/webflow-age/thecss/css5.png";
const css6 = "/webflow-age/thecss/css2.png";

const img1 = "/webflow-age/devs/dev1.png";
const img2 = "/webflow-age/devs/dev2.png";
const img3 = "/webflow-age/devs/dev3.png";
const img4 = "/webflow-age/devs/dev4.png";
const img5 = "/webflow-age/devs/dev5.png";
const img6 = "/webflow-age/devs/dev6.png";

const serviceArr = [
  {
    head: "Webflow Development",
    para: "Upgrade your online presence with our Webflow Development agency. We create perfect websites that load fast, look great on any device, and are fully optimized for search engines. Boost your digital presence with our custom Webflow development company solutions.",
    image: img1,
  },
  {
    head: "Website Design",
    para: "Our Webflow design agency specializes in creating visually stunning websites on the Webflow platform. Our Webflow design studio creates designs that not only capture but also effectively convey your brand's message, carefully optimized for maximum conversion.",
    image: img2,
  },
  {
    head: "Webflow SEO",
    para: "Improve your website's visibility with our Webflow SEO services. Our focus is on optimizing your on-page SEO, content marketing, ensuring higher Google rankings, and attracting more traffic to your site. Trust our Webflow agency to enhance your online presence and drive results through effective SEO strategies.",
    image: img3,
  },
  {
    head: "Website Speed Optimization",
    para: "Supercharge your website's performance with our Webflow agency's Website Speed Optimization services. Our experienced team is dedicated to enhancing your site's speed, optimizing every element for lightning-fast loading. Let us elevate your user experience and ensure your website performs at its peak efficiency.",
    image: img4,
  },
  {
    head: "Webflow Integrations",
    para: "Connect your Webflow site with various tools, be it HubSpot, Salesforce, Greenhouse, and more. We've got your integration needs covered.",
    image: img5,
  },
  {
    head: "Webflow Migration",
    para: "Our experienced certified Webflow team ensures a seamless migration of your WordPress, Wix, Squarespace, or any other platform to Webflow. We prioritize a smooth transition, perfect SEO optimization, and excellent site speed. Your requirements are carefully followed throughout the migration process.",
    image: img6,
  },
];

const htmlString = `<script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script> <div class="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="14" data-height="50" data-nofollow="true" data-expandifr="true" data-scale="100" data-clutchcompany-id="2350194"></div>`;

const serviceCards = [
  {
    image: css5,
    title: "Flexible Pricing",
    desc: "We work with early-stage teams who value speed and flexibility. Whether it’s a multi-page build or just a homepage, we scope based on what you actually need — even if it’s one page at a time.",
  },
  {
    image: css3,
    title: "Fast Turnaround",
    desc: "Early-stage startups move fast — and we’re built for that. We've delivered investor-ready Webflow pages in under a week, from idea to launch.",
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
    desc: "Whether it’s launch day, a demo link, or your deck’s footer — we build sites that explain what you do clearly and make people take you seriously.",
  },
  {
    image: css4,
    title: "Page Speed Optimization",
    desc: "We build a site with a clean structure so it won’t impact the page speed. As a Webflow development agency, we ensure that Google’s core web vitals are in green.",
  },
];

const page = () => {

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden relative">
        <section className="py-28 md:py-20 lg:py-32 relative text-center mt-">
          <p className="font-medium text-lg m-3">
            A full-service webflow agency for B2B SaaS Companies
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl mx-auto font-bold mb-6">
            Your go-to
            <span className="text-white bg-clip-text text-transparent">
              {" "}
              Webflow agency
            </span>{" "}
            <span className="text-white"></span>{" "}
            <span className="text-white bg-clip-text text-transparent">
              trusted by <span className="text-[#fb651e]">Y Combinator</span>{" "}
              backed startups
            </span>
          </h1>

          {/* Paragraph */}
          <p className="max-w-3xl mx-auto mb-8 text-base sm:text-lg">
            Trusted by startups backed by leading VCs — from Palo Alto to Tel
            Aviv — we build Webflow sites that help early-stage DevTool, AI, and
            infra teams look sharp from day one.
            <br />
            From landing pages to full site builds, we handle the design and dev
            so your team can stay focused on scaling your B2B SaaS — not
            wrangling front-end code.
          </p>

          {/* Call to Action */}
          {isMobile && (
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="mb-4 md:mb-0">
                <ContactForm name="Book a Demo" />
              </div>

              <div className="flex items-center md:ml-4 space-x-4">
                <div className="hidden md:block h-6 border-l-2 border-gray-400"></div>
                <div className="pt-2 md:pt-7">
                  <ClutchBadge />
                </div>
              </div>
            </div>
          )}

          {!isMobile && (
            <div className="flex justify-center md:justify-center items-center">
              <div className="flex-col">
                <ContactForm name="Book a Demo" />
              </div>
              <div className="flex items-center ml-4 space-x-4">
                <div className="h-6 border-l-2 border-gray-400"></div>
                <div className="pt-7">
                  <ClutchBadge />
                </div>
              </div>
            </div>
          )}

          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full my-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <div>
              <WebflowMarquee text="Trusted by the fastest-growing B2B SaaS startups — from seed to $40M+ ARR." />
            </div>
          </div>

          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <ServicesSection />
          </div>

          {/* Why Choose Us Section */}
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <p className="max-w-6xl mx-auto mb-5 text-4xl font-semibold mt-20">
              Why Top B2B Startups Trust Us with Their Webflow Stack.
            </p>
            <p className="max-w-3xl mx-auto mb-8 text-base font-normal sm:text-lg">
              From incubated DevTool startups to funded AI platforms — we’ve
              shipped clean, conversion-ready Webflow sites that launch fast and
              scale with your story.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {serviceCards.map((card, index) => (
                <div className="p-2 md:p-3">
                  <CardComponent
                    key={index}
                    image={card.image}
                    title={card.title}
                    desc={card.desc}
                  />
                </div>
              ))}
            </div>{" "}
          </div>
          {/**  recent project */}
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <div>
              <AnimatedCard />
            </div>
          </div>

          {/**table */}
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <div>
              <Webtable />
              <div className="flex justify-center">
                <div className="flex justify-center md:justify-start mt-4 font-semibold">
                  <ContactForm name="Book a Demo" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <ThirdPartyIntegrations />
          </div>

          {/**faq */}

          <div
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <FAQ />
          </div>

          <div
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <TestimonialSlider />
          </div>

          <div
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <div className=" flex mt-8 justify-center items-center">
              <BookDemo />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default page;
