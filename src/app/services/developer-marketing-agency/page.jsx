"use client"

import Image from "next/image";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Hero from "./hero";
import Card1 from "./card1";
import RealResult from "./realresults";
import NewMarquee from "@/Components/NewMarquee";

// Lazy load with dynamic imports for better performance
// Only loads when scrolled into view or immediately if above fold
const Card2 = dynamic(() => import("./card2"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const WhyInfrasity = dynamic(() => import("./WhyInfrasity"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const IndustrySection = dynamic(() => import("./IndustrySection"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const IntegrationsSection = dynamic(() => import("./IntegrationsSection"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const FeatureComparison = dynamic(() => import("./FeatureComparison"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const Testimonials = dynamic(() => import("./Testimonial"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const SuccessStories = dynamic(() => import("../../../Components/SuccessStories"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
const VideoTestimonials = dynamic(() => import("../../playbook/developer-marketing/testimonials"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});
import { Videos } from "../../playbook/developer-marketing/videosData";
const CTA = dynamic(() => import("./cta"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full" />
});

// Memoized gradient divider component
const GradientDivider = ({ className = "" }) => (
  <div className={`w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 ${className}`}></div>
);

// Memoized section wrapper with gradient background
const SectionWrapper = ({ children, gradient = true }) => (
  <div
    style={gradient ? {
      background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
    } : {}}
  >
    {children}
  </div>
);

// Lazy loaded section component
const LazySection = ({ Component, dividerClass = "mt-16 mb-1", showDivider = true, gradient = true }) => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    unobserveAfterVisible: true
  });

  return (
    <SectionWrapper gradient={gradient}>
      {showDivider && <GradientDivider className={dividerClass} />}
      <div ref={ref}>
        {hasBeenVisible && <Component />}
      </div>
    </SectionWrapper>
  );
};

export default function Page() {
  const searchParams = useSearchParams();
  const isAdsVariant = searchParams.get('app') === 'ads';
  return (
    <div className="">
      <Hero isAdsVariant={isAdsVariant} />
      <NewMarquee />

      {/* RealResult - Second fold, no lazy load */}
      <SectionWrapper>
        <GradientDivider className="mt-8 mb-1" />
        <RealResult />
      </SectionWrapper>

      {/* Card1 */}
      <SectionWrapper>
        <GradientDivider className="mt-8 mb-1" />
        <Card1 isAdsVariant={isAdsVariant} />
      </SectionWrapper>
      
      {/* Card2 - Lazy load */}
      <SectionWrapper>
        <GradientDivider className="mt-0 mb-1" />
        <LazySection Component={Card2} showDivider={false} gradient={false} />
      </SectionWrapper>
      
      {/* WhyInfrasity - Lazy load */}
      <LazySection Component={WhyInfrasity} />
      
      {/* IndustrySection - Lazy load */}
      <LazySection Component={IndustrySection} />
      
      {/* IntegrationsSection - Lazy load */}
      <SectionWrapper>
        <GradientDivider className="mt-16 mb-16" />
        <LazySection Component={() => <IntegrationsSection isAdsVariant={isAdsVariant} />} showDivider={false} gradient={false} />
      </SectionWrapper>
      
      {/* FeatureComparison - Lazy load */}
      <LazySection Component={FeatureComparison} />
      
      {/* Testimonials - Lazy load */}
      <LazySection Component={Testimonials} dividerClass="mt-10" />
      
      {/* SuccessStories - Lazy load */}
      <SectionWrapper>
        <GradientDivider className="mt-10 mb-12" />
        <LazySection Component={SuccessStories} showDivider={false} gradient={false} />
      </SectionWrapper>
      
      {/* Video Testimonials - Lazy load */}
      <SectionWrapper>
        <GradientDivider className="mt-10 mb-1" />
        <div className="relative mt-28">
          {/* Background Blob / Gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #ff79c6, #5b36ff 70%)",
              opacity: 0.3,
              filter: "blur(120px)",
            }}
          ></div>
          <div className="flex justify-center">
            <LazySection 
              Component={() => <VideoTestimonials className="max-w-6xl" items={Videos} />}
              showDivider={false}
              gradient={false}
            />
          </div>
        </div>
      </SectionWrapper>
      
      {/* CTA - Lazy load */}
      <SectionWrapper>
        <GradientDivider className="mt-10 mb-12" />
        <LazySection Component={() => <CTA isAdsVariant={isAdsVariant} />} showDivider={false} gradient={false} />
      </SectionWrapper>
    </div>
  )
}