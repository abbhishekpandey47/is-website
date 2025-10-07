"use client";

import React from "react";

export default function Testimonials({ heading, subHeading }) {

    const testimonials = [
        {
            id: 1,
            name: "Cindy Blake",
            imageUrl: "/Testimon/cindyFirefly.jpg",
            alt: "Cindy Blake, VP Marketing, Firefly",
            title: "VP Marketing, Firefly.ai",
            company: "Firefly",
            quote:
                "Infrasity helped us 7x our organic traffic through developer-first storytelling.",
            metric: "+781%",
            metricLabel: "Organic Traffic Growth",
            color: "from-violet-500 to-purple-600"
        },
        {
            id: 2,
            name: "ScaleKit Team",
            imageUrl: "/Testimon/joshTerraTeam.jpg",
            alt: "ScaleKit Team",
            title: "ScaleKit.com",
            company: "ScaleKit",
            quote:
                "Achieved 44% more developer signups in just 9 months with targeted DevRel",
            metric: "+828%",
            metricLabel: "Developer Signups",
            color: "from-emerald-500 to-teal-600"
        },
        {
            id: 3,
            name: "Shaked Askayo",
            imageUrl: "/Testimon/Shaked.png",
            alt: "Shaked Askayo, CTO, Kubiya.ai",
            title: "CTO, Kubiya.ai",
            company: "Kubiya",
            quote:
                "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market.",
            metric: "9mo",
            metricLabel: "To Leadership",
            color: "from-cyan-500 to-blue-600"
        }
    ];

    const caseStudies = [
        {
            icon: "🚀",
            title: "Firefly.ai",
            result: "+781%",
            description: "Organic Traffic Growth",
            details: "From 3.7K to 32.6K monthly organic visitors through developer-first content strategy",
            tactics: ["Strategic technical content", "Developer community activation", "SEO-optimized documentation"],
            color: "from-violet-500/20 to-purple-500/20",
            border: "border-violet-500/30"
        },
        {
            icon: "⚡",
            title: "ScaleKit.com",
            result: "+828%",
            description: "Developer Signups",
            details: "Achieved 44% more developer signups in just 9 months with targeted DevRel",
            tactics: ["Interactive code samples", "Developer-first messaging", "Community-driven growth"],
            color: "from-emerald-500/20 to-teal-500/20",
            border: "border-emerald-500/30"
        }
    ];

    return (
        <section className="mx-auto px-6 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-white">Real Results from </span>
                        <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Real DevTools</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        See how leading startups transformed their developer marketing into growth engines.
                    </p>
                </div>

                {/* Case Studies */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {caseStudies.map((study, index) => (
                        <div key={index} className="group relative">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${study.color.replace('/20', '/40')} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
                            <div className={`relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border ${study.border} hover:border-opacity-60 transition-all duration-300`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-3xl">{study.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{study.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-3xl font-bold bg-gradient-to-r ${study.color.replace('/20', '')} bg-clip-text text-transparent`}>
                                                {study.result}
                                            </span>
                                            <span className="text-gray-400">{study.description}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-gray-300 mb-6 leading-relaxed">{study.details}</p>
                                
                                <div className="space-y-2">
                                    {study.tactics.map((tactic, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                                            <span className="text-sm text-gray-400">{tactic}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <div className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-violet-400">Case Study</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="text-center mb-16">
                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="space-y-2">
                            <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">781%</div>
                            <div className="text-gray-400">Average Growth</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">44%</div>
                            <div className="text-gray-400">Higher Conversion</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">9mo</div>
                            <div className="text-gray-400">To Market Leader</div>
                        </div>
                    </div>
                </div>

                {/* About Infrasity */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-75"></div>
                    <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-12 border border-white/10">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                                <span className="text-violet-300 text-sm font-medium">💡 About Infrasity</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white">
                                Built by <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Engineers</span>. 
                                Designed for <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Developers</span>.
                            </h3>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Infrasity specializes in developer-centric GTM — from content strategy and 
                                video explainers to documentation and community activation.
                            </p>
                        </div>

                        {/* Services */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            {[
                                { icon: "📝", title: "Content Strategy", desc: "Technical content that developers actually want to read" },
                                { icon: "📚", title: "Documentation", desc: "Transform docs into your most powerful growth asset" },
                                { icon: "🎥", title: "Video Explainers", desc: "Visual storytelling for complex technical concepts" },
                                { icon: "👥", title: "Community Activation", desc: "Build and engage developer communities that scale" }
                            ].map((service, index) => (
                                <div key={index} className="text-center space-y-3 p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
                                    <div className="text-2xl">{service.icon}</div>
                                    <h4 className="text-white font-semibold">{service.title}</h4>
                                    <p className="text-gray-400 text-sm">{service.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trusted By */}
                        <div className="text-center">
                            <div className="text-gray-400 text-sm mb-6 uppercase tracking-wider">TRUSTED BY LEADING DEVTOOLS</div>
                            <div className="flex flex-wrap justify-center items-center gap-8">
                                {["FireFly", "ScaleKit", "Kubiya", "DevZero", "StackGen"].map((company, index) => (
                                    <div key={index} className="px-6 py-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <span className="text-gray-300 font-medium">{company}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div className="mt-12 pt-8 border-t border-slate-700">
                            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                    <span className="text-xs text-gray-500 ml-2">testimonial.sh</span>
                                </div>
                                <blockquote className="text-lg text-white italic mb-4">
                                    "Infrasity helped us 7x our organic traffic through developer-first storytelling."
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">F</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Firefly.ai Team</div>
                                        <div className="text-gray-400 text-sm">DevTool Startup</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    <h2 className="text-center max-lg:mx-auto tracking-wide">
                        Why {" "}
 <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">Y Combinator Companies - Boldstart, and Eclipse </span> trust Infrasity
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    ></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide">
                        Here's how we help them ship content fast — and with depth.                                </p>
                </div>
            </div>

            {/* Desktop Layout: Left-Middle-Right with vertical centering */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-0 max-w-5xl mx-auto relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <div className="w-[1000px] h-[1000px] rounded-full blur-[50px] opacity-40"
                        style={{ background: 'radial-gradient(circle, #3e2189 0%, #3e2189 25%, #3e2189 50%, rgba(91, 33, 182, 0.3) 75%, transparent 100%)' }}></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[60px] opacity-25"
                        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(124, 58, 237, 0.4) 30%, rgba(124, 58, 237, 0.2) 60%, transparent 100%)' }}></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full blur-[40px] opacity-30"
                        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)' }}></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full blur-[20px] opacity-20"
                        style={{ background: 'radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 100%)' }}></div>
                </div>
                {/* Left Column - 1 testimonial (vertically centered) */}
                <div className="flex items-center z-50">
                    <div className="w-[95%]">
                        <div className="bg-[#2a2d5a]/30 border border-purple-500/30  backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonials[0].imageUrl}
                                    alt={testimonials[0].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                />
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">{testimonials[0].name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {testimonials[0].title}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-[#DAD1F1] leading-relaxed text-left"
                                dangerouslySetInnerHTML={{
                                    __html: testimonials[0].highlight.reduce((acc, phrase) => {
                                        const regex = new RegExp(`(${phrase})`, 'gi');
                                        return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                    }, testimonials[0].quote)
                                }}
                            />

                        </div>
                    </div>
                </div>

                {/* Middle Column - 2 testimonials */}
                <div className="space-y-4 z-50">
                    {testimonials[1] && (
                        <div className="w-[95%] bg-[#2a2d5a]/30 border rounded-2xl p-8 border-purple-500/30 transition-colors duration-300">
                            <div className="flex items-center justify-left mb-4 z-50">
                                <img
                                    src={testimonials[1].imageUrl}
                                    alt={testimonials[1].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                />
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">{testimonials[1].name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {testimonials[1].title}, {testimonials[1].company}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-[#DAD1F1] leading-relaxed text-left"
                                dangerouslySetInnerHTML={{
                                    __html: testimonials[1].highlight.reduce((acc, phrase) => {
                                        const regex = new RegExp(`(${phrase})`, 'gi'); // Case-insensitive matching for each phrase
                                        return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                    }, testimonials[1].quote)
                                }}
                            />

                        </div>
                    )}

                    {testimonials[2] && (
                        <div className="w-[95%] bg-[#2a2d5a]/30 border border-purple-500/30  backdrop-blur-sm rounded-2xl p-8 transition-colors duration-300">
                            <div className="flex items-center justify-left mb-4 z-50">
                                <img
                                    src={testimonials[2].imageUrl}
                                    alt={testimonials[2].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                />
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">{testimonials[2].name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {testimonials[2].title}, {testimonials[2].company}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-[#DAD1F1] leading-relaxed text-left"
                                dangerouslySetInnerHTML={{
                                    __html: testimonials[2].highlight.reduce((acc, phrase) => {
                                        const regex = new RegExp(`(${phrase})`, 'gi');
                                        return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                    }, testimonials[2].quote)
                                }}
                            />

                        </div>
                    )}
                </div>

                {/* Right Column - 1 testimonial (vertically centered) */}
                <div className="flex items-center z-50">
                    <div className="w-[95%]">
                        {testimonials[3] && (
                            <div className="bg-[#2a2d5a]/30 border border-purple-500/30 backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonials[3].imageUrl}
                                        alt={testimonials[3].name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-white">{testimonials[3].name}</h4>
                                        <p className="text-sm text-gray-400">
                                            {testimonials[3].title}, {testimonials[3].company}
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className="text-[#DAD1F1] leading-relaxed text-left"
                                    dangerouslySetInnerHTML={{
                                        __html: testimonials[3].highlight.reduce((acc, phrase) => {
                                            const regex = new RegExp(`(${phrase})`, 'gi');
                                            return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                        }, testimonials[3].quote)
                                    }}
                                />

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Single Column */}
            <div className="lg:hidden space-y-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-purple-500/50 transition-colors duration-300">
                        <div className="flex items-left justify-left mb-6">
                            <img
                                src={testimonial.imageUrl}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                            />
                            <div className="text-left">
                                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                <p className="text-sm text-gray-400">
                                    {testimonial.title}, {testimonial.company}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed text-left">
                            "{testimonial.quote}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
}
