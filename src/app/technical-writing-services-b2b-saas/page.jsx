"use client";
import ReadyToStart from "@/Components/HomePage/ReadyToStart";
import React, { useEffect, useContext, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
import { Carousel } from "antd";
import AppContext from "@/context/Infracontext";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
import { motion } from "framer-motion";
import Image from "next/image";
import HowWorks from "@/Components/HomePage/HowWorks";
import Link from "next/link";
import { OrbitingCirclesDemo } from "@/Components/HomePage/OrbitTime";
import { BorderBeam } from "@/Components/ui/border-beam";
import { Badge, Card, Space } from "antd";

import postMetaData from "../../../posts/_postMetadata";
import authorData from "../../../posts/_authorData";
import NewMarquee from "./marquee";
import BlogTypes from "./blogTypes";
import WhyChooseInfrasity from "./whychoose";
import StorytellingSection from "./storyTelling";
import FAQ from "@/Components/HomePage/FAQ";
import FAQSection from "./FAQ";
import TestimonialSlider from "./testimonials";
import BookDemo from "./bookDemo";
import CalendlyButton from "./cal";
import ClutchBadge from "./clutch";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const PageCard = ({ ind = 1, data = { data } }) => {
  return (
    <div
      className={`p-10 max-lg:p-4 gap-10 ${
        ind % 2 == 0 ? "flex" : "flex flex-row-reverse"
      } max-md:flex-col`}
    >
      <div className="w-1/2 max-md:w-full flex flex-col justify-center">
        <Image
          loading="lazy"
          width={703}
          height={400}
          className="rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200"
          src={data.imgLink}
          alt="Ratio is 1.7589"
        />
      </div>
      <div
        className={`w-[40%] max-md:w-full max-lg:w-1/2 flex flex-col justify-center serviceasblogcard card-${ind}`}
      >
        <div className="h-[80%] max-lg:h-full flex flex-col justify-center gap-5 max-lg:gap-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex flex-col">
              <h3 className="text-white quicksand-bold text-2xl leading-tight">
                Step
              </h3>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg flex items-center justify-center transform rotate-3 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20 rounded-t-lg"></div>
                <span className="text-white font-bold text-2xl relative z-10">
                  {ind + 1}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full shadow-md"></div>
            </div>
          </div>
          <div>
            <h2
              className="quicksand-bold text-white text-[2em] max-lg:text-[2em] leading-[45px] max-md:text-center"
              dangerouslySetInnerHTML={{ __html: data.hTag }}
            ></h2>

            <div>
              <ul className="space-y-2 lg:w-[95%] mt-4 mb-6">
                <li className="flex items-start text-white">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#1966ff] to-[#8c1eff] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2 text-white"
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
                  </div>
                  <p className="text-sm pl-3 quicksand-medium">{data.p1}</p>
                </li>
                <li className="flex items-start text-white">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#1966ff] to-[#8c1eff] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2 text-white"
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
                  </div>
                  <p className="text-sm pl-3 quicksand-medium">{data.p2}</p>
                </li>
                <li className="flex items-start text-white">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#1966ff] to-[#8c1eff] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2 text-white"
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
                  </div>
                  <p className="text-sm pl-3 quicksand-medium">{data.p3}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dataService = [
  {
    imgLink: "/blog_as_service/6.png",
    hTag: "<p>Understanding Challenges & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Keyword Discovery</span></p>",
    p1: "Help identify the right topics and keywords that resonate with your developer audience.",
    p2: "Align with your products goals and use targeted keyword research based on MSVs ",
    p3: "Developer-authored blogs ensure technical accuracy and real-world insights.",
  },

  {
    imgLink: "/blog_as_service/7.png",
    hTag: "<p>Outline Generation & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Content Creation</span></p>",
    p1: "Craft detailed outlines with the right mix of headings, keywords, and Google-asked questions.",
    p2: "Plan content structure and visuals to boost clarity, SEO, and engagement.",
    p3: "Engineers write content tailored for your site and platforms like Dev.to or Reddi",
  },
  {
    imgLink: "/blog_as_service/8.png",
    hTag: "<p>Content Delivery & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Metrics Analysis</span></p>",
    p1: "Deliver content with a detailed analysis of SEO, traffic, and SERP performance.",
    p2: "Include hands-on examples like Java SDK integrations.",
    p3: "Continuously refine strategy based on real-time data to boost visibility and reach.",
  },
];

const serviceArr = [
  {
    head: "Worked",
    para: "Worked with 15+ early-stage startups, helping them fuel website traffic with our proven technical content in the form of blogs as code",
    percent: 15,
    percentPara: "early-stage startups",
  },
  {
    head: "SEO",
    para: "Consistently assisted customers get ranked on the first page of the SERP and fuel their website traffic, delivering a 15% increase in traffic to their site with a significant portion coming directly from our SEO efforts.",
    percent: 15,
    percentPara: "Increase in website traffic",
  },
  {
    head: "Case Studies",
    para: "According to a study by Hubspot, Companies that blog consistently see 55% more website visitors than those who do not leverage this approach.",
    percent: 55,
    percentPara: "more website visitors",
  },
];

const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const page = () => {
  const context = useContext(AppContext);

  const { setProgress, progress } = context;
  const serviceMemoArr = useMemo(() => serviceArr, [serviceArr]);
  const dataMemoArr = useMemo(() => dataService, [dataService]);

  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const sorted = [...postMetaData].sort((a, b) => {
      const dateA = new Date(a.publishedOn).getTime();
      const dateB = new Date(b.publishedOn).getTime();
      return dateB - dateA; // Sorts in descending order (newest first)
    });
    setSortedPosts(sorted);
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".serviceasblogcard").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: card,
            toggleActions: "restart reverse restart none",
          },
        }
      );
    });

    return () => {};
  }, []);

  useEffect(() => {
    setProgress(100);

    return () => {};
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move up from 50px
      animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y 0
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
    >
      <div className="relative max-w-full mx-auto overflow-hidden px-4">
        <div>
          <div className="bg-[#0a0a1a] text-white overflow-hidden relative">
            <section className="py-12 md:py-20 lg:pt-32 relative text-center">
              <div className="absolute top-0 left-0 w-full pt-10 flex justify-center lg:pt-16 lg:justify-start lg:pl-16">
                <Link href="https://www.infrasity.com/" passHref>
                  <Image
                    loading="lazy"
                    width={200}
                    height={200}
                    src="/logodata/infrasity_logo.png"
                    alt="Infrasity Logo"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
              </div>
              {/* Blog Engagement Section */}
              <div className="flex justify-center mt-10">
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
                Turn Documentation Into Your Growth Engine
              </p>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl mx-auto font-bold mb-6">
                Content Built for DevTools Startups
                <span className="bg-gradient-to-l from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Written to Convert,
                </span>{" "}
                <span className="text-white"></span>{" "}
                <span className="bg-gradient-to-l from-purple-700 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                  Scale, and Support.
                </span>
              </h1>

              {/* Paragraph */}
              <p className="max-w-3xl mx-auto text-base sm:text-lg">
                Built for DevTools companies, Infrasity helps users get started
                — not stuck — with real-world examples and SDK-integrated
                content that accelerates developer onboarding. We explain your
                product through practical use cases and equip sales teams with
                demo-ready artifacts that double as self-serve onboarding for
                technical users.
              </p>
            </section>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-9 ml-10 lg:ml-32">
              <CalendlyButton name="Book a Demo" />
              <div className="border-l-2 border-gray-400 h-6"></div>
              <ClutchBadge />
            </div>
          </div>
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>

          <div
            className="mb-24"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <NewMarquee />
          </div>
          <div>
            <BlogTypes />
          </div>

          <div
            className="flex flex-col gap-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-5"></div>
            <div className="text-center">
              <h1 className="quicksand-bold text-white text-[3em] max-lg:text-[2em] leading-[45px] max-md:text-cente">
                Launch-ready docs for DevTools & engineering teams
              </h1>
            </div>
            {dataMemoArr.map((data, index) => {
              return <PageCard ind={index} data={data} />;
            })}
          </div>
          {/* Why Choose Infrasity section */}
          <div>
            <WhyChooseInfrasity />
          </div>
          {/* story Telling section */}
          <div
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-12"></div>

            <StorytellingSection />
          </div>
          <div
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-12"></div>

            <FAQSection />
          </div>

          <div
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
            }}
          >
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-12"></div>

            <TestimonialSlider />
          </div>

          {/* <div>
        <div
          className="px-8 space-y-9 relative blogDiv"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
          }}
        >
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-12"></div>

          <div className="whyinfra "></div>

          <div className="quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center">
            <h2 className="w-3/4 leading-[80px] max-sm:w-[95%] max-sm:leading-[69px]">
              <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">
                Distribute
              </span>
            </h2>
          </div>

          <div className="text-center text-white quicksand-semibold flex justify-center">
            <p className="w-1/2 max-sm:w-[90%]">
              We distribute your content across key platforms like Reddit,
              Dev.to, and other developer communities, ensuring it reaches the
              right technical audience and drives engagement where it matters
              most.
            </p>
          </div>

          <div className="flex justify-center">
            <OrbitingCirclesDemo />
          </div>
        </div>
      </div> */}

          {/* <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-20 mb-12"></div>
      <div className="w-full flex justify-center items-center">
        <BookDemo />
      </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default page;
