"use client";
import React, { useMemo } from "react";
import HomeMarquee from "@/Components/HomePage/HomeMarquee";
import { motion } from "framer-motion"; 
import CardMotion from "./cardsmotion";
import CardComponent from "@/app/services/webflow/CardComponent";
import AnimatedCard from "@/app/services/webflow/AnimatedCard";
import CustomerReview from "@/app/services/webflow/CustomerReview";
import ThirdPartyIntegrations from "./ThirdPartyIntegrations";
import css1 from "./images/thecss/css4.png";
import css2 from "./images/thecss/css5.png";
import WebflowMarquee from "@/app/services/webflow/Webflowmarquee";
import FAQ from "@/app/services/service-video-production/FAQ";
import BookDemo from "./bookDemo";
import TestimonialSlider from "./testimonials";
import Webtable from "./table";
import img1 from './images/devs/dev1.png';
import img2 from './images/devs/dev2.png';
import img3 from './images/devs/dev3.png';
import img4 from './images/devs/dev4.png';
import img5 from './images/devs/dev5.png';
import img6 from './images/devs/dev6.png';

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
    image: css1,
    title: "Simple Pricing",
    desc: "We keep straightforward pricing based on what you opt for at our Webflow expert agency. Choose a way to work with us. No Contracts. Cancel anytime.",
  },
  {
    image: css2,
    title: "Quick Delivery",
    desc: "We as a Webflow Agency deliver full-fledged Webflow website in just 2 weeks*. Our turnaround time for hourly work is just 2 days.",
  },
  {
    image: css1,
    title: "Certified Developers",
    desc: "We make sure that our developers have passed all Webflow certification tests on Webflow university.",
  },
  {
    image: css2,
    title: "Beautiful Interactions",
    desc: "We create simple and beautiful animations that improve the user's overall experience.",
  },
  {
    image: css1,
    title: "Responsive Design",
    desc: "We as a Webflow design agency ensure that all the designs we develop in Webflow has similar experiences across all the devices.",
  },
  {
    image: css2,
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
      <div className="min-h-screen bg-[#0a0a1a]  text-white overflow-hidden relative">
        <section className="py-12 md:py-20 lg:py-32 relative text-center ">
          {/* Clutch badge */}
          <div className="flex justify-center mt-20">
            <div className="bg-black text-white px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="bg-white text-black rounded-full px-3 py-0.5">
                {" xyz "}
              </span>
              <span>5.0 Rating</span>
              <span className="text-yellow-300">★★★★★</span>
            </div>
          </div>

          {/* Subheadline */}
          <p className="font-medium text-lg m-3">
            A full-service webflow agency
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl mx-auto font-bold mb-6">
            Get
            <span className="bg-gradient-to-l from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              high-converting
            </span>{" "}
            <span className="text-white">Webflow</span> Websites{" "}
            <span className="bg-gradient-to-l from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              in just 2 weeks.
            </span>
          </h1>

          {/* Paragraph */}
          <p className="max-w-3xl mx-auto mb-8 text-base sm:text-lg">
            We as a Webflow expert agency help SaaS, IT, and B2B companies get
            more clients with Webflow websites that are optimized for more
            leads. Our Webflow development agency provides Webflow website
            design, Webflow development and maintenance, SEO, and Webflow
            migration services.
          </p>

          {/* Call to Action */}
          <div className="flex justify-center">
            <button className="bg-[#6169FC] px-6 py-3 rounded-md shadow-md text-white">
              Book a Call
            </button>
          </div>

          
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          > 
          <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5">
          </div>
          <div className="bg-black"><WebflowMarquee /></div>
          </div>

          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          > 
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5">
          </div>

          <p className="max-w-5xl mx-auto mb-8 text-5xl font-semibold mt-10">
            5x your potential with our Range Of Webflow Development Services!
          </p>
          <p className="max-w-3xl mx-auto mb-8 text-base font-normal sm:text-lg">
            Unlock your brand’s full potential with our Webflow design company,
            offering expert solutions tailored to your needs. As a leading
            Webflow development agency, we specialize in creating
            high-performing websites that are not only visually stunning but
            also optimized for conversions. Partner with us to experience a
            seamless blend of creativity and technical expertise.
          </p>

          <div>
            <CardMotion
              serviceArr={serviceArr}
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#6169FC] px-4 py-3 rounded-md shadow-md text-white">
              Book a Call
            </button>
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

          <p className="max-w-6xl mx-auto mb-5 text-4xl font-semibold mt-20">
            Why you should choose us as your Webflow Partner.
          </p>
          <p className="max-w-3xl mx-auto mb-8 text-base font-normal sm:text-lg">
            We have over 17+ years of experience in design and development.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl justify-center mx-auto">
            {serviceCards.map((card, index) => (
              <CardComponent
              key={index}
              image={card.image}
              title={card.title}
              desc={card.desc}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button className="bg-[#6169FC] px-4 py-3 rounded-md shadow-md text-white mt-10">
              Book a Call
            </button>
          </div>
            </div>

          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          > 
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5">
          </div>
          <AnimatedCard />
          </div>

          
          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          > 
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5">
          </div>
          <Webtable/>
          </div>


          <div
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 mb-5"></div>
            <TestimonialSlider />
          </div>

          <div
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 mb-5"></div>
            <ThirdPartyIntegrations />
          </div>

          <div
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
            }}
          >
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 mb-5"></div>
            <FAQ />
          </div>

          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 "></div>
            <div className="w-full flex justify-center items-center">
              <BookDemo />
            </div>

        </section>
      </div>
    </motion.div>
  );
};

export default page;
