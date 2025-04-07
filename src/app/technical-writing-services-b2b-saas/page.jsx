"use client";
import ReadyToStart from "@/Components/HomePage/ReadyToStart";
import React, { useEffect, useContext, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
import { Carousel } from "antd";
import AppContext from "@/context/Infracontext";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
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
import BookDemo from "../blog/[slug]/bookDemo";

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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-400 rounded-md mr-2"></div>
            <p className="text-white quicksand-bold text-4xl">Step {ind + 1}</p>
          </div>
          <div>
            <h2
              className="quicksand-bold text-white text-[3em] max-lg:text-[2em] leading-[45px] max-md:text-center"
              dangerouslySetInnerHTML={{ __html: data.hTag }}
            ></h2>

            <div>
              <p className="quicksand-medium text-white max-lg:text-[0.8em] max-md:text-[1.2em] max-md:text-center">
                {data.pTag}
              </p>
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
    pTag: "After working with over 30 customers, we found that the real challenge is not just creating content, but identifying the right topics and keywords that resonate with your developer audience. To solve this, we align with your startup's goals and conduct targeted keyword research, focusing on terms with the right monthly search volumes (MSVs) to help your blog rank on the first page. Our developer-authored blogs ensure technical accuracy and real-world insights, delivering value to both experts and those seeking deeper knowledge.",
  },
  {
    imgLink: "/blog_as_service/2.png",
    hTag: "<p>Outline Generation & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Content Creation</span></p>",
    pTag: "A solid outline is key to producing effective technical content, guiding logical flow and clarity. After identifying the right keywords, we craft a detailed outline with optimal headings, long-tail and short-tail keywords, and relevant Google-asked questions. We also plan the ideal number of images to boost engagement. With this outline, our engineers create content tailored for both on-page SEO and community engagement, whether for your website or platforms like Dev.to, Medium, or Reddit, delivering valuable insights that resonate with your audience.",
  },
  {
    imgLink: "/blog_as_service/3.jpg",
    hTag: "<p>Content Delivery & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Metrics Analysis</span></p>",
    pTag: "Once the content is ready, we deliver it along with a comprehensive analysis of key metrics. This includes not only tracking the content's performance in terms of SEO and engagement but also evaluating specific aspects like website traffic and SERP rankings. Our content features focused on hands-on examples, such as integrating your product with a Java SDK or utilizing your observability product alongside open-source monitoring tools. Our goal is to continuously refine our strategy based on these real-time results, driving ongoing improvements in visibility and reach.",
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
    <div className=" max-w-full mx-auto overflow-hidden">
      <div className="absolute top-0 left-0 pl-12 pt-16">
        <Image
          loading="lazy"
          width={200}
          height={200}
          src="/logodata/infrasity_logo.png"
          alt="Infrasity Logo"
        />
      </div>

      {/* Blog Engagement Section */}
      <section className="w-full mx-auto lg:mt-24 sm:mt-16 md:mt-24 py-20 relative overflow-hidden addGrid2">
        <div className="max-w-full flex xxs:flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center ">
          {/* Left side content */}
          <div className="lg:ml-[50px] justify-center sm:w-full lg:w-[60vw] lg:flex lg:flex-col lg:items-start">
            <h2 className="text-5xl text-center md:text-center lg:text-start lg:text-6xl md:text-6xl quicksand-bold mt-8 text-white mb-10 leading-tight">
              Docs That Don’t Just Explain, they
              <span className="text-[#5F64FF]"> drive </span>
              <span className="text-[#5F64FF]"> Sell, Support, </span>
              and <span className="text-[#5F64FF]"> Scale</span>
            </h2>
            <ul className="space-y-6 lg:w-[70%] mb-10">
              <li className="flex items-start text-white ">
                <span className="text-xl mr-3">•</span>
                <p className="text-lg quicksand-medium">
                  Built for DevTools companies to help users get started, not
                  stuck — with real examples, SDK integration to speed up dev
                  onboarding.
                </p>
              </li>
              <li className="flex items-start text-white">
                <span className="text-xl mr-3">•</span>
                <p className="text-lg quicksand-medium">
                  Explains your product through real use cases — not fluffy
                  feature lists
                </p>
              </li>
              <li className="flex items-start text-white">
                <span className="text-xl mr-3">•</span>
                <p className="text-lg  quicksand-medium">
                  Equips sales with demo-ready artifacts that double as
                  self-serve onboarding for developers.
                </p>
              </li>
            </ul>
            <div className="flex justify-center md:justify-center lg:justify-start">
              <button
                className="  text-m quicksand-semibold rounded-[5px] flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700  hover:before:-translate-x-40"
                onClick={() =>
                  window.open("https://calendly.com/meet-shan", "_blank")
                }
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Right side image */}
          <div className="mt-20 lg:mt-0 md:mt-0 ">
            <img
              src="/blog_as_service/blogHeading.png"
              alt="Blog interface with writer tool"
              className="w-[500px] h-auto"
            />
          </div>
        </div>
      </section>
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

      <div>
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
      </div>

      <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-20 mb-12"></div>
      <div className="w-full flex justify-center items-center">
        <BookDemo />
      </div>
    </div>
  );
};

export default page;
