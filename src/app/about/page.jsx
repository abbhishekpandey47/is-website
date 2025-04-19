"use client";
import React, { useEffect, useState } from "react";
import BookDemo from "../blog/[slug]/bookDemo";
import Timeline from "./timeline";
import LogoMoving from "./logomoving";

const about = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  //Team Data
  const founder = {
    name: "Shantanu Das",
    role: "CEO, Founder",
    bio: " Before founding Infrasity, Shan spent years leading infrastructureteams for Fortune 500 companies & startups, focusing on cloud infrastructure,  platform engineering later on his career, where he was one of key member in building platform engineering teams for Experian, UK. His work at ThoughtWorks and EY gave him deep technical expertise in building scalable systems and high-performance engineering teams Beyond engineering, Shan is also a top-rated Udemy instructor, having trained thousands of engineers in cloud technologies, DevOps, and infrastructure best practices. Recognizing a gap in how early-stage startups communicate their technical value to developers, Shan bootstrapped Infrasity—now one of the fastest-growing GTM & DevRel solutions companies based out of the capital of India. Infrasity helps incubated and Y Combinator-backed startups, AI agent companies, and DevTools businesses scale their product adoption, developer engagement, and technical positioning. Today, Infrasity partners with high-growth startups to refine their go-to-market strategies, developer relations, and content-led growth efforts. From technical how-to guides and developer explainer videos to product documentation and DevRel initiatives, Infrasity ensures that technical products reach the right audience, drive adoption, and build strong developer communities.",
    imageSrc: "/members/shan2.jpeg",
  };
  const advisor = {
    name: "Amit Eyal Govrin",
    role: "Co-Founder",
    company: "KUBIYA.AI",
    bio: "    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus quisquam tempore harum magnam non dolore aliquam, cupiditate ullam a repudiandae aspernatur eveniet temporibus ducimus mollitia  adipisicing elit. Voluptatibus quisquam tempore  adipisicing elit. Voluptatibus quisquam tempore?",
    imageSrc: "/members/amit.jpeg",
  };
  //USP data
  const uspData = [
    {
      id: 1,
      title: "Built for DevTool & B2B SaaS Startups",
      description:
        "We specialize in working with early-stage, Y Combinator-backed, and fast-growing SaaS startups—helping them scale faster with content that speaks directly to developers and decision-makers.",
      linkText: "How we build trust with technical audiences →",
      linkUrl: "#",
    },
    {
      id: 2,
      title: "DevRel Meets GTM for devtool companies",
      description:
        "Infrasity bridges the gap between developer relations and go-to-market strategy. From SDK use cases and how-to guides to launch campaigns—we help you grow awareness, drive adoption, and build trust with technical users.",
      linkText: "How we predictably generate demand →",
      linkUrl: "#",
    },
    {
      id: 3,
      title: "Speed Without Sacrificing Technical Depth",
      description:
        "We move fast without compromising on accuracy. Our team of engineers, technical writers, and subject-matter experts ensures every piece of content is technically sound, well-researched, and ready to publish.",
      linkText: "What our clients say about our work →",
      linkUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      <section className=" py-10 w-full mt-10 px-4 md:px-12 lg:px-16  overflow-hidden relative addGrid2">
        <h1
          className="text-center text-red mt-20
                     text-7xl quicksand-bold max-sm:text-[3.3rem]"
        >
          About{" "}
          <span className="text-center text-7xl quicksand-bold max-sm:text-[3.3rem] specialtext ">
            Infrasity
          </span>
        </h1>

        <div className="flex justify-center ">
          <p className="text-center mt-6 text-white quicksand-light w-1/2 max-md:w-3/4 max-sm:w-4/5 tracking-tight leading-relaxed ">
            Infrasity is one of the fastest-growing accelerators supporting
            early-stage Y Combinator and incubated startups. We specialize in
            developer relations services and go-to-market strategies, with a
            strong focus on creating technical content and use case guides using
            SDKs. Our goal is to help DevTool companies accelerate developer
            onboarding and adoption.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="w-full px-4 md:px-12 lg:px-16  overflow-hidden relative">
        <div
                  style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
        }}
        
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 mb-5"></div>
</div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start items-center ">
            {/* Text Content */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl quicksand-bold text-white mb-8 tracking-tight">
                Meet our Founder
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl quicksand-bold text-white mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-gray-400 quicksand-medium text-lg">
                    {founder.role}
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="quicksand-medium text-base leading-relaxed">
                    Before founding Infrasity, Shan spent years leading
                    infrastructure teams for Fortune 500 companies & startups,
                    focusing on cloud infrastructure, platform engineering later
                    on his career, where he was one of key member in building
                    platform engineering teams for Experian, UK. His work at
                    ThoughtWorks and EY gave him deep technical expertise in
                    building scalable systems and high-performance engineering
                    teams.
                  </p>
                  <p className="quicksand-medium text-base leading-relaxed">
                    Beyond engineering, Shan is also a top-rated Udemy
                    instructor, having trained thousands of engineers in cloud
                    technologies, DevOps, and infrastructure best practices.
                  </p>
                  <p className="quicksand-medium text-base leading-relaxed">
                    Recognizing a gap in how early-stage startups communicate
                    their technical value to developers, Shan bootstrapped
                    Infrasity—now one of the fastest-growing GTM & DevRel
                    solutions companies based out of the capital of India.
                    Infrasity helps incubated and Y Combinator-backed startups,
                    AI agent companies, and DevTools businesses scale their
                    product adoption, developer engagement, and technical
                    positioning.
                  </p>
                  <p className="quicksand-medium text-base leading-relaxed">
                    Today, Infrasity partners with high-growth startups to
                    refine their go-to-market strategies, developer relations,
                    and content-led growth efforts. From technical how-to guides
                    and developer explainer videos to product documentation and
                    DevRel initiatives, Infrasity ensures that technical
                    products reach the right audience, drive adoption, and build
                    strong developer communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Image  */}
            <div>
              <div className="relative w-full mt-20 aspect-[4/3] rounded-xl overflow-hidden border-4 border-[#4C2A85]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img
                  src={founder.imageSrc}
                  alt={founder.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="flex justify-center items-center mt-6">
                <a
                  href="https://www.linkedin.com/in/shantanu-das-devops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/fluency/48/linkedin.png"
                    alt="linkedin"
                    className=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Advisor Section */}
      <section className="w-full py-12 mt-5 px-6 md:px-12 lg:px-16  overflow-hidden">
        <div
                 style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
                }}
                
              >
                <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 mb-5"></div>
        
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl quicksand-bold text-white mb-16 tracking-tight opacity-0 ${
              isVisible ? "opacity-100 animate-fade-in" : ""
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Advisors
          </h2>

          <div className="flex justify-center">
            <div
              className="transform translate-y-8 opacity-0 transition duration-1000 ease-out"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "500ms",
              }}
            >
              {/* Image  */}
              <div className="relative w-[300px] h-[300px] rounded-xl overflow-hidden border-2 border-[#4C2A85]/30 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img
                  src={advisor.imageSrc}
                  alt={advisor.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div className="flex justify-center items-center mt-6">
                <a
                  href="https://www.linkedin.com/in/amitgovrin/"
                  target="_blank"
                  aria-label="LinkedIn profile"
                >
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/fluency/48/linkedin.png"
                    alt="linkedin"
                  />
                </a>
              </div>

              {/* Image text */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl quicksand-bold text-white">
                  {advisor.name}
                </h3>
                <p className="text-gray-400 quicksand-bold">Advisor</p>
                <p className="text-gray-400 quicksand">
                  {advisor.role}, {advisor.company}
                </p>
                <p className="mt-4 max-w-lg mx-auto quicksand-medium text-m">
                  Amit is a seasoned business executive, entrepreneur, and
                  founder of Kubiya.ai, where he’s in a mission of redefining
                  DevOps through AI-powered automation. Before Kubiya Amit has
                  held leadership roles at AWS, Glilot Capital, and
                  Microsoft-acquired Cloudyn. He brings deep expertise in
                  go-to-market strategy, product-market fit, and scaling
                  early-stage B2B SaaS startups. As an advisor to Infrasity,
                  Amit helps shape strategic growth initiatives for DevTool and
                  infrastructure startups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* why infrasity section */}
      <section className="w-full  py-10 px-6 md:px-10">
        <div
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
                  }}
                  
                >
                  <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 pt-0.5 mb-5"></div>
          </div>
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-5xl md:text-6xl quicksand-bold text-white-800 mb-20 text-center opacity-0 ${
              isVisible ? "opacity-100 animate-fade-in-up" : ""
            }`}
            style={{ transitionDelay: "1900ms" }}
          >
            What makes{" "}
            <span className="quicksand-bold specialtext">Infrasity</span>{" "}
            different?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
            {uspData.map((usp, index) => (
              <div
                key={usp.id}
                className={`opacity-0 ${
                  isVisible ? "opacity-100 animate-fade-in-up" : ""
                }`}
                style={{ transitionDelay: `${2000 + index * 150}ms` }}
              >
                <h3 className="text-2xl quicksand-bold text-purple-700 mb-4">
                  {usp.title}
                </h3>
                <p className="text-white-600 quicksand-medium leading-relaxed ">
                  {usp.description}
                </p>
                {/* <a
                                    href={usp.linkUrl}
                                    className="text-purple-600 hover:text-purple-800 transition-colors quicksand-medium inline-flex items-center"
                                >
                                    {usp.linkText}
                                </a> */}
              </div>
            ))}
          </div>
        </div>
      </section>
  

<div >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-6 mt-8"></div>
        < Timeline />
      </div>
      

      {/* Book demo section */}
      <div  style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}>
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-12"></div>
      <div className="w-full flex justify-center items-center"> 
        <BookDemo />
      </div>
      </div>


      <div>
        < LogoMoving />
      </div>
    </div>
  );
};

export default about;