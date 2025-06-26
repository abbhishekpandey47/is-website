import CalendarBooking from "../calendarButton";

const PricingPage = () => {
    // All 4 testimonials from your backend
    const testimonials = [
        {
            id: 1,
            name: "Cindy Blake",
            imageUrl: "/Testimon/cindyFirefly.jpg",
            alt: "Cindy Blake, VP Marketing, Firefly",
            title: "VP Marketting, Firefly",
            quote:
                "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
            highlight: ["quick to onboard", "responsive", "collaborative"],
        },
        {
            id: 2,
            name: "Josh",
            imageUrl: "/Testimon/joshTerraTeam.jpg",
            alt: "Josh, Co-Founder, Terrateam",
            title: "Co-Founder, Terrateam",
            quote:
                "The Infrasity team has been fantastic to work with. Their attention to detail and level of accuracy is top notch. I'd fully recommend their services to anyone.",
            highlight: ["attention to detail", "level of accuracy", "top notch"],
        },
        {
            id: 3,
            name: "Shaked Askayo",
            imageUrl: "/Testimon/Shaked.png",
            alt: "Shaked Askayo, CTO, Kubiya.ai",
            title: "CTO, Kubiya.ai",
            quote:
                "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
            highlight: [
                "significantly enhanced the visibility and appeal of our product",
            ],
        },
        {
            id: 4,
            name: "Frank Weissmann",
            imageUrl: "/Testimon/Frank.jpg",
            alt: "Frank Weissmann, Customer Success Lead, firefly.ai",
            title: "Customer Success Lead, firefly.ai",
            quote:
                "Infrasity's work has improved the client's SEO, earning a score of over 75%. They'vs also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time.",
            highlight: ["over 75%", "quick turnaround time"],
        }
    ];

    const startupFeatures = [
        "4 long-form technical blogs/month (with diagrams or code where needed)",
        "1 SDK guide or integration walkthrough (React/Node.js/Python/etc.)",
        "SEO-backed topic ideation based on monthly search volume (MSV)",
        "Developer persona mapping + content format mix (e.g., how-to, comparison, teardown)",
        "Internal collaboration via Notion or Slack",
        "Weekly async updates + Google Doc delivery",
        "Up to 2 revisions/post",
        "Optional CMS publishing (Markdown or Webflow)",
        "7–10 day turnaround/post",
        "1 onboarding call + content roadmap setup",
        "Support for founder-led POV content (upon request)",
    ];

    const enterpriseFeatures = [
        "6–8 technical blogs/month",
        "2 video walkthroughs/month",
        "Use case libraries, onboarding docs, SDK examples",
        "Landing page + feature copy",
        "Dedicated content strategist ",
        "Monthly performance tracking + content calendar"
    ];

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black">
                <div className="container mx-auto px-6 py-20 pt-36 text-center">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-[#d6daff] font-medium tracking-wider uppercase text-sm mb-6">PRICING</p>
                        <h1 className="quicksand-bold text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Find a plan that fits your growth stage No upfront commitment. No fluff.
                        </h1>
                        <div className="text-[#b4b4b8] text-lg mb-10">
                            <p className="text-[#b4b4b8] text-[16px]">Start your journey toward developer-first content<br className="hidden md:block" />and GTM clarity — in under 5 minutes.</p>
                        </div>
                        <CalendarBooking width="w-40" />
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="container mx-auto py-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Startup Plan */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-[#7dffa2] transition-colors rounded-2xl p-8">
                        <div className="mb-8">
                            <h3 className="quicksand-semibold text-2xl text-[#e8bfff] font-bold mb-2">Starter Plan</h3>
                            <p className="text-[40px] leading-[50px] text-white mb-6">For early-stage infra, AI, and DevTool startups</p>
                            <p className="text-md text-[#bababe]">Designed for teams who need developer-focused content to drive sign-ups, not vanity traffic.</p>
                        </div>
                        <div className="bg-white bg-opacity-15 flex-none h-px overflow-hidden relative w-full mb-8"></div>


                        <div className="space-y-4 mb-8">
                            <div className="flex space-x-8">
                                {/* First Column */}
                                <div className="w-1/2">
                                    {startupFeatures.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3 mb-4">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="140" height="140" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" stroke-width="1" />

                                                    <path d="M35 60l15 15L85 40" stroke="#7dff9d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Column */}
                                <div className="w-1/2">
                                    {startupFeatures.slice(5).map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3 mb-4">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" stroke-width="1" />

                                                    <path d="M35 60l15 15L85 40" stroke="#7dff9d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* <button className="w-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 py-3 rounded-lg font-medium border-0 text-white">
                            Sign up
                        </button> */}
                        <CalendarBooking buttonText="Sign up" width="w-full" bgGradient="bg-gradient-to-r from-gray-800 to-gray-800" borderColor="" />

                        <p className="text-xs text-gray-500 mt-4 text-center">Get a 30-day POC to test Infrasity  for your business</p>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-8 transition-colors duration-300 relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm font-medium">Popular</span>
                        </div>

                        <div className="mb-8">
                            <h3 className="quicksand-semibold text-[#99e2ff] text-3xl font-bold mb-2">Scale Plan</h3>
                            <p className="text-[40px] leading-[50px] text-white mb-6">For growing teams who need DevRel-style content at volume</p>
                            <p className="text-md text-[#bababe]">When you’re ready to scale content across docs, demos, and GTM efforts.</p>
                        </div>
                        <div className="bg-white bg-opacity-15 flex-none h-px overflow-hidden relative w-full mb-8"></div>

                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-purple-400 mb-4">What you get:</h4>
                        </div>

                        <div className="space-y-4 mb-8">
                            {enterpriseFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" stroke-width="1" />

                                            <path d="M35 60l15 15L85 40" stroke="#7dff9d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                        </svg>
                                    </div>
                                    <span className="text-[16px] text-[#DAD1F1]">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity duration-300 py-3 rounded-lg font-medium border-0 text-white">
                            Talk to sales
                        </button> */}
                        <div className="pb-12 pt-16">
                            <CalendarBooking buttonText="Talk to sales" width="w-full" bgGradient="bg-gradient-to-r from-purple-600 to-pink-600" borderColor="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Custom 3-Column Layout with Vertical Centering */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <p className="text-gray-400 mb-4">Why teams backed by YC, Boldstart, and Eclipse trust Infrasity</p>
                    <h2 className="text-2xl md:text-3xl font-bold">Here’s how we help them ship content fast — and with depth.</h2>
                </div>

                {/* Desktop Layout: Left-Middle-Right with vertical centering */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-0 max-w-7xl mx-auto relative">
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
                                            {testimonials[0].title}, {testimonials[0].company}
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className="text-[#DAD1F1] leading-relaxed text-left"
                                    dangerouslySetInnerHTML={{
                                        __html: testimonials[0].highlight.reduce((acc, phrase) => {
                                            const regex = new RegExp(`(${phrase})`, 'gi'); // Case-insensitive matching for each phrase
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
        </div>
    );
};

export default PricingPage;