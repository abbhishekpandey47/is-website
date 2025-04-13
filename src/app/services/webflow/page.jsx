"use client";
import React, { useMemo } from "react";
import HomeMarquee from "@/Components/HomePage/HomeMarquee";
import CardMotion from "./cardsmotion";

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
    id: "1",
    head: "Developer Led Tech Content",
    para: "Our in-house engineers craft highly technical content, including blogs, how-to guides, and whitepapers, by working hands-on with your product. This ensures the utmost technological credibility and delivers deep insights that resonate with engineers and developers.",
  },
  {
    id: "2",
    head: "Video Production",
    para: "Our in-house engineers works closely with your product hands-on, to craft videos that showcase its true potential. By understanding the tech through and through, we create videos that engage developers and decision-makers, ensuring the highest level of credibility and authenticity.",
  },
  {
    id: "3",
    head: "Growth Engineering",
    para: "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
  },
  {
    id: "1",
    head: "Developer Led Tech Content",
    para: "Our in-house engineers craft highly technical content, including blogs, how-to guides, and whitepapers, by working hands-on with your product. This ensures the utmost technological credibility and delivers deep insights that resonate with engineers and developers.",
  },
  {
    id: "2",
    head: "Video Production",
    para: "Our in-house engineers works closely with your product hands-on, to craft videos that showcase its true potential. By understanding the tech through and through, we create videos that engage developers and decision-makers, ensuring the highest level of credibility and authenticity.",
  },
  {
    id: "3",
    head: "Growth Engineering",
    para: "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
  },
];

const page = () => {
  const fileMemo = useMemo(() => fileList, [fileList]);

  return (
    <div className="min-h-screen bg-[#0a0a1a] bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 mt-3">
        {Array.from({ length: 30 }).map((_, rowIndex) =>
          Array.from({ length: 50 }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="absolute rounded-full bg-white"
              style={{
                width: "2px",
                height: "2px",
                top: `${rowIndex * 5.5}%`,
                left: `${colIndex * 3}%`,
                opacity: 1,
              }}
            />
          ))
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950 pointer-events-none" />
      </div>

      <section className="py-12 md:py-20 lg:py-32 relative text-center">
        {/* Clutch badge */}
        <div className="flex justify-center mt-20">
          <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="bg-white text-black rounded-full px-2 py-0.5">
              {" xyz "}
            </span>
            <span>5.0 Rating</span>
            <span className="text-yellow-300">★★★★★</span>
          </div>
        </div>

        {/* Subheadline */}
        <p className="font-medium text-lg m-3">A full-service webflow agency</p>

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
          more clients with Webflow websites that are optimized for more leads.
          Our Webflow development agency provides Webflow website design,
          Webflow development and maintenance, SEO, and Webflow migration
          services.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center">
          <button className="bg-[#6169FC] px-6 py-3 rounded-md shadow-md text-white">
            Book a Call
          </button>
        </div>

        <div className="mt-10 mb-10">
          {/* trusted by */}
          <HomeMarquee />
        </div>

        <p className="max-w-5xl mx-auto mb-8 text-5xl font-semibold">
          5x your potential with our Range Of Webflow Development Services!
        </p>
        <p className="max-w-3xl mx-auto mb-8 text-base font-normal sm:text-lg">
          Unlock your brand’s full potential with our Webflow design company,
          offering expert solutions tailored to your needs. As a leading Webflow
          development agency, we specialize in creating high-performing websites
          that are not only visually stunning but also optimized for
          conversions. Partner with us to experience a seamless blend of
          creativity and technical expertise.
        </p>

        <div>
          <CardMotion
            mainHeading={""}
            subHeading={""}
            serviceArr={serviceArr}
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-[#6169FC] px-6 py-3 rounded-md shadow-md text-white">
            Book a Call
          </button>
        </div>

      </section>
    </div>
  );
};

export default page;
