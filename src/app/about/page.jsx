'use client'
import React, { useEffect, useState } from "react";


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
        imageSrc: "/members/shan2.jpeg"
    };
    const advisor = {
        name: "Amit Eyal Govrin",
        role: "Co-Founder",
        company: "KUBIYA.AI",
        bio: "    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus quisquam tempore harum magnam non dolore aliquam, cupiditate ullam a repudiandae aspernatur eveniet temporibus ducimus mollitia  adipisicing elit. Voluptatibus quisquam tempore  adipisicing elit. Voluptatibus quisquam tempore?",
        imageSrc: "/members/amit.jpeg"
    };
    //USP data
    const uspData = [
        {
            id: 1,
            title: "Built for DevTool & B2B SaaS Startups",
            description: "We specialize in working with early-stage, Y Combinator-backed, and fast-growing SaaS startups—helping them scale faster with content that speaks directly to developers and decision-makers.",
            linkText: "How we build trust with technical audiences →",
            linkUrl: "#"
        },
        {
            id: 2,
            title: "DevRel Meets GTM",
            description: "Infrasity bridges the gap between developer relations and go-to-market strategy. From SDK use cases and how-to guides to launch campaigns—we help you grow awareness, drive adoption, and build trust with technical users.",
            linkText: "How we predictably generate demand →",
            linkUrl: "#"
        },
        {
            id: 3,
            title: "Speed Without Sacrificing Technical Depth",
            description: "We move fast without compromising on accuracy. Our team of engineers, technical writers, and subject-matter experts ensures every piece of content is technically sound, well-researched, and ready to publish.",
            linkText: "What our clients say about our work →",
            linkUrl: "#"
        }
    ];

    return (


        <div className="min-h-screen ">

            <section className="h-[65vh] flex flex-col justify-center addGrid2">
                <h1
                    className='text-center text-red mt-16
                     text-7xl quicksand-bold max-sm:text-[3.3rem]'
                >
                    About <span className='text-center text-7xl quicksand-bold max-sm:text-[3.3rem] specialtext '>Infrasity</span>
                </h1>

                <div className='flex justify-center '>


                    <p
                        className='text-center mt-6 text-white quicksand-light w-1/2 max-md:w-3/4 max-sm:w-4/5'
                    >
                        Infrasity is one of the fastest-growing accelerators supporting early-stage Y Combinator and incubated startups. We specialize in developer relations services and go-to-market strategies, with a strong focus on creating technical content and use case guides using SDKs. Our goal is to help DevTool companies accelerate developer onboarding and adoption.

                    </p>

                </div>

            </section>


            {/* Founder Section */}
            <section className="w-full py-20 px-6 md:px-12 lg:px-16 overflow-hidden">
                <div
                    className={`w-full h-px bg-white/30 mb-16 opacity-0 ${isVisible ? "opacity-100 animate-fade-in" : ""
                        }`}
                    style={{ transitionDelay: "300ms" }}
                ></div>

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-start items-center justify-between gap-10">
                        {/* Text Content  */}
                        <div
                            className="w-full lg:w-1/2 text-left transform translate-y-8 opacity-0 transition duration-1000 ease-out"
                            style={{
                                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                                opacity: isVisible ? 1 : 0,
                                transitionDelay: "400ms"
                            }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                                Meet our Founder
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{founder.name}</h3>
                                    <p className="text-gray-400 text-lg">{founder.role}</p>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-gray-300 text-m leading-relaxed">
                                        Before founding Infrasity, Shan spent years leading infrastructure
                                        teams for Fortune 500 companies & startups, focusing on cloud infrastructure,
                                        platform engineering later on his career, where he was one of key member in building platform engineering teams for Experian, UK. His work at ThoughtWorks and EY
                                        gave him deep technical expertise in building scalable systems and
                                        high-performance engineering teams.

                                    </p>
                                    <p className="text-gray-300 text-m leading-relaxed">
                                        Beyond engineering, Shan is also a top-rated Udemy instructor, having
                                        trained thousands of engineers in cloud technologies, DevOps, and
                                        infrastructure best practices.

                                    </p>
                                    <p className="text-gray-300 text-m leading-relaxed">
                                        Recognizing a gap in how early-stage startups communicate their
                                        technical value to developers, Shan bootstrapped Infrasity—now one of
                                        the fastest-growing GTM & DevRel solutions companies based out of the capital of India. Infrasity helps incubated and Y Combinator-backed startups, AI agent companies, and
                                        DevTools businesses scale their product adoption, developer
                                        engagement, and technical positioning.

                                    </p>
                                    <p className="text-gray-300 text-m leading-relaxed">
                                        Today, Infrasity partners with high-growth startups to refine their
                                        go-to-market strategies, developer relations, and content-led growth
                                        efforts. From technical how-to guides and developer explainer videos
                                        to product documentation and DevRel initiatives, Infrasity ensures
                                        that technical products reach the right audience, drive adoption, and
                                        build strong developer communities.


                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div
                            className="w-full lg:w-[45%] transform translate-y-8 opacity-0 transition duration-1000 ease-out"
                            style={{
                                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                                opacity: isVisible ? 1 : 0,
                                transitionDelay: "600ms"
                            }}
                        >
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-4 border-[#4C2A85]/30">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                                <img
                                    src={founder.imageSrc}
                                    alt={founder.name}
                                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Advisor Section */}
            <section className="w-full py-20 px-6 md:px-12 lg:px-16  overflow-hidden">
                <div
                    className={`w-full h-px bg-white/30 mb-16 opacity-0 ${isVisible ? "opacity-100 animate-fade-in" : ""
                        }`}
                    style={{ transitionDelay: "300ms" }}
                ></div>

                <div className="max-w-7xl mx-auto text-center">
                    <h2
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 tracking-tight opacity-0 ${isVisible ? "opacity-100 animate-fade-in" : ""
                            }`}
                        style={{ transitionDelay: "400ms" }}
                    >
                        Investors and Advisors
                    </h2>

                    <div className="flex justify-center">
                        <div
                            className="transform translate-y-8 opacity-0 transition duration-1000 ease-out"
                            style={{
                                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                                opacity: isVisible ? 1 : 0,
                                transitionDelay: "500ms"
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

                            {/* Image text */}
                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-bold text-white">{advisor.name}</h3>
                                <p className="text-gray-400">
                                    {advisor.role}, {advisor.company}
                                </p>
                                <p className="mt-4 max-w-lg mx-auto text-gray-300 text-sm">
                                    Amit is a seasoned business executive, entrepreneur, and founder of Kubiya.ai, where he’s in a mission of  redefining DevOps through AI-powered automation. Before Kubiya Amit has held leadership roles at AWS, Glilot Capital, and Microsoft-acquired Cloudyn. He brings deep expertise in go-to-market strategy, product-market fit, and scaling early-stage B2B SaaS startups. As an advisor to Infrasity, Amit helps shape strategic growth initiatives for DevTool and infrastructure startups.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* why infrasity section */}
            <section className="w-full  py-20 px-6 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className={`text-5xl md:text-6xl quicksand-bold text-white-800 mb-20 text-center opacity-0 ${isVisible ? 'opacity-100 animate-fade-in-up' : ''
                            }`}
                        style={{ transitionDelay: '1900ms' }}
                    >
                        What makes <span className="font-mono specialtext">Infrasity</span> different?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                        {uspData.map((usp, index) => (
                            <div
                                key={usp.id}
                                className={`opacity-0 ${isVisible ? 'opacity-100 animate-fade-in-up' : ''}`}
                                style={{ transitionDelay: `${2000 + (index * 150)}ms` }}
                            >
                                <h3 className="text-2xl quicksand-bold text-purple-700 mb-6">{usp.title}</h3>
                                <p className="text-gray-600 quicksand  mb-6 leading-relaxed">
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
            {/* Book demo section */}
            <section className="w-full py-10 px-4 md:px-10">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl p-10 md:p-14 shadow-xl">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                        {/* Left column with heading */}
                        <div
                            className={`md:w-1/2 opacity-0 ${isVisible ? 'opacity-100 animate-fade-in-up' : ''
                                }`}
                            style={{ transitionDelay: '2300ms' }}
                        >
                            <h2 className="text-5xl  font-bold text-white mb-4 leading-tight">
                                Trusted by fastest <br /> growing B2B SaaS Startups.
                            </h2>
                        </div>

                        {/* Right column with text and button */}
                        <div className="md:w-1/2 flex flex-col items-start gap-6">
                            <p
                                className={`text-white/90 text-lg mb-6 opacity-0 ${isVisible ? 'opacity-100 animate-fade-in-up' : ''
                                    }`}
                                style={{ transitionDelay: '2500ms' }}
                            >
                                Trusted by YC startups. Built for developer-first companies.
                            </p>

                            <div
                                className={`opacity-0 ${isVisible ? 'opacity-100 animate-fade-in-up' : ''
                                    }`}
                                style={{ transitionDelay: '2700ms' }}
                            >
                                <a href="https://calendly.com/meet-shan">
                                    <button
                                        className="bg-gray-900 hover:bg-black text-white quicksand px-4 py-4 h-auto text-lg rounded-[10px] "
                                    >
                                        Book a Demo
                                    </button>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default about;