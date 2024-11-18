'use client'
import React from 'react';
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase } from 'gsap/all'
import { useEffect } from 'react';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);

const infraArr = [
    "Content by engineers with product experience",
    "Accurate, in-depth tech documentation",
    "Full service from ideation to SEO",
    "Specialized SEO for DevOps, Kubernetes, Cloud",
    "Explainer videos ensuring technical precision",
];

const traditionalAgenArr = [
    "Limited understanding of development workflows",
    "More focus on general marketing and lack of technical resources",
    "Tech content writing requires high level of  accuracy and detail, which doesn't align with general writing style",
    "Lack in understanding of latest trends, tools and technologies in tech development",
];

const WhyInfra = () => {
    useEffect(() => {
        gsap.fromTo(".whyInfraUpperHead", {
            opacity: 0,
            y: 55,

        },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".whyInfraUpperHead",
                    toggleActions: "restart none none none"
                }
            }
        )

        gsap.fromTo(".whyInfraCards", {
            opacity: 0,
            y: 55,
            scale: 1.3
        },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
                scale: 1,
                scrollTrigger: {
                    trigger: ".whyInfraCards",
                    toggleActions: "restart none none none",
                }
            }
        )



        return () => {

        }
    }, [])

    return (
        <div>
            <div className="relative addGrid2">
                <div className="whyinfra"></div>
                <div>
                    <h1 className="text-white text-center max-xs:text-3xl text-[3em] quicksand-bold pt-10 whyInfraUpperHead">Why <span className="specialtext">Infrasity</span>?</h1>
                </div>
                <div className="flex justify-center whyInfraUpperHead">
                    <p className="text-center text-[wheat] pt-5 w-2/3 quicksand-semibold max-lg:w-3/4 max-xs:w-full max-xs:px-5">
                        Infrasity delivers technically accurate content crafted by engineers with real-world experience. We offer end-to-end services, including blogs, videos, and SEO, tailored to your industry. Our content brings depth and credibility, driving growth while freeing up your team.
                    </p>
                </div>
            </div>
            <div className="flex justify-center gap-7 pt-12 max-lg:flex-col max-lg:items-center">
                <div>
                    <div className="bg-[#888]/20 backdrop-blur-sm ring-1 ring-black/5 isolate aspect-video rounded-xl image-full w-[450px] max-sm:w-[350px] shadow-xl whyInfraCards">
                        <div className="card-body">
                            <div className="flex justify-center items-center mb-3 h-[18%]">
                                <h2 className="text-center text-white quicksand-bold text-4xl max-sm:text-xl mb-4">
                                    <Image
                                        loading="lazy"
                                        width={300}
                                        height={300}
                                        src="/logodata/infrasity_logo.png"
                                        alt="Infrasity Logo"
                                        className="w-auto h-[3.8rem] max-sm:h-[12]"
                                    />
                                </h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                {infraArr.map((item, index) => (
                                    <div key={index} className="flex gap-5 items-center">
                                        <div>
                                            <img
                                                src="/svgPatterns/tick.svg"
                                                alt="Bullet point icon"
                                            />
                                        </div>
                                        <p className="text-white max-sm:text-sm text-opacity-50 quicksand-semibold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-[#888]/20 backdrop-blur-sm ring-1 ring-black/5 isolate aspect-video rounded-xl image-full w-[450px] max-sm:w-[350px] shadow-xl whyInfraCards pb-2">
                        <div className="card-body">
                            <div className="h-[18%]">
                                <h2 className="text-center text-white quicksand-bold text-4xl max-sm:text-xl p-4 mb-4">Traditional agencies</h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                {traditionalAgenArr.map((item, index) => (
                                    <div key={index} className="flex gap-5 items-center quicksand-medium">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                                                <rect x="0.5" width="28" height="28" rx="5" fill="red" fillOpacity="0.7" />
                                                <path d="M9.5 19L14.5 14M14.5 14L19.5 9M14.5 14L9.5 9M14.5 14L19.5 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-white max-sm:text-sm text-opacity-50 quicksand-semibold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyInfra;
