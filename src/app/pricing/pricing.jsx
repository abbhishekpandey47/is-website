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
        "Amnic AI",
        "Cost Analyzer",
        "Anomaly Detection",
        "Recommendations",
        "Kubernetes Visibility",
        "Save charts & views",
        "Amortized views",
        "Unit Economics",
        "Cost by Tags",
        "Cost Summary",
        "Alerts",
        "and more..."
    ];

    const enterpriseFeatures = [
        "Unlimited data retention",
        "Access to our cost experts",
        "Design partner status",
        "Reports"
    ];

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black">
                <div className="container mx-auto px-6 py-20 pt-36 text-center">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-[#d6daff] font-medium tracking-wider uppercase text-sm mb-6">PRICING</p>
                        <h1 className="quicksand-bold text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Find a plan that works
                        </h1>
                        <div className="text-[#b4b4b8] text-lg mb-10">
                            <p className="text-[#b4b4b8] text-[16px]">One month trial. No credit card needed.</p>
                            <p className="text-[#b4b4b8] text-[16px]">Get started on your cloud cost observability<br className="hidden md:block" />journey in 5-minutes</p>
                        </div>
                        <CalendarBooking />
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="container mx-auto py-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Startup Plan */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-[#7dffa2] transition-colors rounded-2xl p-8">
                        <div className="mb-8">
                            <h3 className="quicksand-semibold text-2xl text-[#e8bfff] font-bold mb-2">Startup</h3>
                            <p className="text-lg text-white mb-4">For Small teams</p>
                            <p className="text-sm text-gray-400">Who have to manage their cloud spend continuously</p>
                        </div>
                        <div className="bg-white bg-opacity-15 flex-none h-px overflow-hidden relative w-full mb-8"></div>


                        <div className="space-y-4 mb-8">
                            <div className="flex space-x-8">
                                {/* First Column */}
                                <div className="w-1/2">
                                    {startupFeatures.slice(0, Math.ceil(startupFeatures.length / 2)).map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3 mb-4">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="140" height="140" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" stroke-width="1" />

                                                    <path d="M35 60l15 15L85 40" stroke="#7dff9d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Column */}
                                <div className="w-1/2">
                                    {startupFeatures.slice(Math.ceil(startupFeatures.length / 2)).map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3 mb-4">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" stroke-width="1" />

                                                    <path d="M35 60l15 15L85 40" stroke="#7dff9d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <button className="w-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 py-3 rounded-lg font-medium border-0 text-white">
                            Sign up
                        </button>
                        <p className="text-xs text-gray-500 mt-4 text-center">Get a 30-day POC to test Amnic for your business</p>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-8 hover:border-purple-500 transition-colors duration-300 relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-full text-sm font-medium">Popular</span>
                        </div>

                        <div className="mb-8">
                            <h3 className="quicksand-semibold text-[#99e2ff] text-3xl font-bold mb-2">Enterprise</h3>
                            <p className="text-lg text-white mb-4">For Large Organizations</p>
                            <p className="text-sm text-gray-400">With multiple teams managing and monitoring cloud costs</p>
                        </div>
                        <div className="bg-white bg-opacity-15 flex-none h-px overflow-hidden relative w-full mb-8"></div>

                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-purple-400 mb-4">Everything in Startup</h4>
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
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity duration-300 py-3 rounded-lg font-medium border-0 text-white">
                            Talk to sales
                        </button>
                        <p className="text-xs text-gray-500 mt-4 text-center">Our teams will be in touch with you in a maximum of 48 business hours.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Custom 3-Column Layout with Vertical Centering */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <p className="text-gray-400 mb-4">Trusted source of truth for DevOps industry leaders</p>
                    <h2 className="text-4xl md:text-5xl font-bold">Hear what they have to say</h2>
                </div>

                {/* Desktop Layout: Left-Middle-Right with vertical centering */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* Left Column - 1 testimonial (vertically centered) */}
                    <div className="flex items-center min-h-full">
                        <div className="w-full">

                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-colors duration-300">
                                <div className="text-left mb-6">
                                    <img
                                        src={testimonials[0].imageUrl}
                                        alt={testimonials[0].name}
                                        className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-purple-500/30"
                                    />
                                    <h4 className="font-semibold text-white">{testimonials[0].name}</h4>
                                    <p className="text-sm text-gray-400">{testimonials[0].title}, {testimonials[0].company}</p>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed text-left">
                                    "{testimonials[0].quote}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - 2 testimonials */}
                    <div className="space-y-6">
                        {testimonials[1] && (
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-colors duration-300">
                                <div className="text-center mb-6">
                                    <img
                                        src={testimonials[1].imageUrl}
                                        alt={testimonials[1].name}
                                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-purple-500/30"
                                    />
                                    <h4 className="font-semibold text-white">{testimonials[1].name}</h4>
                                    <p className="text-sm text-gray-400">{testimonials[1].title}, {testimonials[1].company}</p>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-center">
                                    "{testimonials[1].quote}"
                                </p>
                            </div>
                        )}

                        {testimonials[2] && (
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-colors duration-300">
                                <div className="text-center mb-6">
                                    <img
                                        src={testimonials[2].imageUrl}
                                        alt={testimonials[2].name}
                                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-purple-500/30"
                                    />
                                    <h4 className="font-semibold text-white">{testimonials[2].name}</h4>
                                    <p className="text-sm text-gray-400">{testimonials[2].title}, {testimonials[2].company}</p>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-center">
                                    "{testimonials[2].quote}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - 1 testimonial (vertically centered) */}
                    <div className="flex items-center min-h-full">
                        <div className="w-full">
                            {testimonials[3] && (
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-colors duration-300">
                                    <div className="text-left mb-6">
                                        <img
                                            src={testimonials[3].imageUrl}
                                            alt={testimonials[3].name}
                                            className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-purple-500/30"
                                        />
                                        <h4 className="font-semibold text-white">{testimonials[3].name}</h4>
                                        <p className="text-sm text-gray-400">{testimonials[3].title}, {testimonials[3].company}</p>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed text-left">
                                        "{testimonials[3].quote}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - Single Column */}
                <div className="lg:hidden space-y-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-colors duration-300">
                            <div className="text-center mb-6">
                                <img
                                    src={testimonial.imageUrl}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-purple-500/30"
                                />
                                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                <p className="text-sm text-gray-400">{testimonial.title}, {testimonial.company}</p>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed text-center">
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