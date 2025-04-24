"use client";
import React, { useMemo } from "react";
import HomeMarquee from "@/Components/HomePage/HomeMarquee";
import { motion } from "framer-motion";
import CardMotion from "./cardsmotion";
import CardComponent from "@/app/services/webflow-services/CardComponent";
import AnimatedCard from "@/app/services/webflow-services/AnimatedCard";
import CustomerReview from "@/app/services/webflow-services/CustomerReview";
import ThirdPartyIntegrations from "./ThirdPartyIntegrations";
import WebflowMarquee from "@/app/services/webflow-services/Webflowmarquee";
import FAQ from "@/app/services/service-video-production/FAQ";
import BookDemo from "./bookDemo";
import TestimonialSlider from "./Testimonials";
import Webtable from "./table";
import CalendlyButton from "../service-video-production/calendlyButton";
import css5 from "./images/thecss/css1.png";
import css4 from "./images/thecss/css6.png";
import css3 from "./images/thecss/css3.png";
import css1 from "./images/thecss/css4.png";
import css2 from "./images/thecss/css5.png";
import css6 from "./images/thecss/css2.png";

import img1 from "./images/devs/dev1.png";
import img2 from "./images/devs/dev2.png";
import img3 from "./images/devs/dev3.png";
import img4 from "./images/devs/dev4.png";
import img5 from "./images/devs/dev5.png";
import img6 from "./images/devs/dev6.png";

const fileList = [
  "aviator.png",
  "firstock-logo.webp",
  "cedana.png",
  "cerbos.png",
  "codegiant-infra-1.png",
  "cycloid.png",
  "daytona-removebg-preview-e1721477918328.png",
  "DevZero.png",
  "env0-infra-1.png",
  "firefly.png",
  "Group-14967.png",
  "images-removebg-preview.png",
  "images__2_-removebg-preview.png",
  "kapstan.png",
  "kubiya.png",
  "logo-landscape-removebg-preview.png",
  "lovable-logo.png",
  "Mask-group.png",
  "middleware-logo.svg",
  "scalr.png",
  "stackOne.svg",
  "TravisCI-Full-Color.png",
  "terrateam.png",
  "vapi.png",
  "qodo-logo.svg",
];

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
  const fileMemo = useMemo(() => fileList, [fileList]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move up from 50px
      animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y 0
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
    >
      <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden relative">
        <section className="py-12 md:py-20 lg:py-32 relative text-center">
          {/* Clutch badge */}
          <div className="flex justify-center mt-20">
            <div className="bg-black text-white px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="bg-white text-black rounded-full px-3 py-0.5">
                {" INFRASITY "}
              </span>
              <span>5.0 Rating</span>
              <span className="text-purple-600">★★★★★</span>
            </div>
          </div>

          {/* Subheadline */}
          <p className="font-medium text-lg m-3">
            A full-service webflow agency for B2B SaaS Companies
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl mx-auto font-bold mb-6">
            Your go-to
            <span className="bg-gradient-to-l from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Webflow partner 
            </span>{" "}
            <span className="text-white"></span> {" "}
            <span className="bg-gradient-to-l from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              trusted by Y Combinator backed startups
            </span>
          </h1>

          {/* Paragraph */}
          <p className="max-w-3xl mx-auto mb-8 text-base sm:text-lg">
          Trusted by startups backed by leading VCs — from Palo Alto to Tel Aviv — we build Webflow sites that help early-stage DevTool, AI, and infra teams look sharp from day one.
          <br />From landing pages to full site builds, we handle the design and dev so your team can stay focused on scaling your B2B SaaS — not wrangling front-end code.
          </p>

          {/* Call to Action */}
          <div className="flex justify-center">
            <div className="flex justify-center md:justify-start">
              <CalendlyButton name="Book a Demo" />
            </div>
          </div>

          {/* Webflow Marquee */}
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <div>
              <WebflowMarquee />
            </div>
          </div>

          {/* Services Section */}
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <p className="max-w-5xl mx-auto mb-8 text-5xl font-semibold mt-10">
            Great startups use their website to control the narrative early. 

            </p>
            <p className="max-w-3xl mx-auto mb-8 text-base font-normal sm:text-lg">
            We’ve built Webflow sites for teams now doing $40M+ in ARR.<br />
If you’re raising, hiring, or launching — we’ll help you ship a site that earns attention.<br />
Backed by experience, shipped with speed, built to make people care.<br />

            </p>
            <div>
              <CardMotion serviceArr={serviceArr} />
            </div>
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
              Why you should choose us as your Webflow Partner.
            </p>
            <p className="max-w-3xl mx-auto mb-8 text-base font-normal sm:text-lg">
              We have over 17+ years of experience in design and development.
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
            <div className="flex justify-center">
              <div className="flex justify-center md:justify-start mt-8">
                <CalendlyButton name="Book a Demo" />
              </div>
            </div>
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
                  <CalendlyButton name="Book a Demo" />
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
            <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
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
