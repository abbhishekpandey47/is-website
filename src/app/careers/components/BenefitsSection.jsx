"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BenefitsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".benefit-category",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-6">


        {/* CTA Section */}
        <div className="benefit-card mt-20">
          <div className="max-w-6xl mx-auto mx-6 md:mx-16 bg-gradient-to-r from-blue-800 to-purple-800 relative flex flex-col items-center rounded-xl p-16 text-center overflow-hidden bg-cover bg-no-repeat">
            <h3 className="text-2xl md:text-3xl font-bold text-white max-w-xl mb-6">
              Ready to join our team?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for 
              engineering excellence and developer advocacy.
            </p>
            <div className="flex justify-center">
              <a
                href="#open-positions"
                className="inline-flex items-center text-lg rounded-full bg-black px-8 py-4 text-white font-medium hover:bg-gray-900 transition"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
