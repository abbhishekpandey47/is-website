"use client";
import React, { useEffect, useContext } from "react";
import { ScrollTrigger, CustomEase } from "gsap/all";
import { gsap } from "gsap";
import AppContext from "../../../context/Infracontext";
import InfrasityVsDevRelHome from "./home";
import CodeShowcase from "./codeShowCase";
import FeaturesSection from "./featuresSection";
import ProcessSection from "./processSection";
import TestimonialsSection from "./testimonialSection";
import InfrasityComparison from "./infrasityComparisonSection";
import CtaSection from "./cta";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("custom", "M0,0 C0.01,1.01 0,1 1,1.05");


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
      <TestimonialsSection />
      <CtaSection/>
    </div>
  );
};

export default Comparison;
