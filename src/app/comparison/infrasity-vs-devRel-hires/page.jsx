"use client";
import React, { useEffect, useContext } from "react";
import { ScrollTrigger, CustomEase } from "gsap/all";
import { gsap } from "gsap";
import AppContext from "../../../context/Infracontext";
import InfrasityVsDevRelHome from "./components/home";
import CodeShowcase from "./components/codeShowCase";
import FeaturesSection from "./components/featuresSection";
import ProcessSection from "./components/processSection";
import TestimonialsSection from "./components/testimonialSection";
import InfrasityComparison from "./components/infrasityComparisonSection";
import PricingSection from "./components/pricingSection";
import CtaSection from "./components/cta";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("custom", "M0,0 C0.01,1.01 0,1 1,1.05");

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
];

const Comparison = () => {
  const context = useContext(AppContext);

  const { setProgress, progress } = context;

  useEffect(() => {
    setProgress(100);

    return () => {};
  }, []);

  return (
    <div className="text-white overflow-x-hidden overflow-y-hidden">
      <InfrasityVsDevRelHome/>
      <CodeShowcase/>
      <FeaturesSection />
      <ProcessSection />
      <InfrasityComparison />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection/>
    </div>
  );
};

export default Comparison;
