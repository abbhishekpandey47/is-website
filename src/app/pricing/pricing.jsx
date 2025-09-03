import CalendarBooking from "../calendarButton";
import Testimonials from "./testimonials";

const PricingPage = () => {
    // All 4 testimonials from your backend


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
            <section className="relative overflow-hidden">
                <div className="mx-auto px-6 py-20 pt-36 text-center">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-[#d6daff] font-medium tracking-wider uppercase text-sm mb-6">PRICING</p>
                        <h1 className="quicksand-bold text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                            Find a plan that fits your growth stage
                        </h1>
                        <div className="text-[#b4b4b8] text-lg mb-10">
                            <p className="text-[#b4b4b8] text-[16px]">No upfront commitment. No fluff. Start your journey toward developer-first content<br className="hidden md:block" />and GTM clarity — in under 5 minutes.</p>
                        </div>
                        <CalendarBooking width="w-40" />
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="mx-auto py-10">
                <div className="grid md:grid-cols-2 gap-12 md:gap-8 max-w-3xl lg:max-w-5xl mx-auto p-2">

                    {/* Startup Plan */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-[#7dffa2] transition-colors rounded-2xl p-6 md:p-8">
                        <div className="mb-8">
                            <h3 className="quicksand-semibold text-2xl text-[#e8bfff] font-bold mb-2">Starter Plan</h3>
                            <p className="text-[40px] leading-[50px] text-white mb-6">For early-stage infra, AI, and DevTool startups</p>
                            <p className="text-md text-[#bababe]">Designed for teams who need developer-focused content to drive sign-ups, not vanity traffic.</p>
                        </div>
                        <div className="bg-white bg-opacity-15 flex-none h-px overflow-hidden relative w-full mb-8"></div>


                        <div className="space-y-4 mb-8">
                            <div className="md:flex md:space-x-8">
                                {/* First Column */}
                                <div className="md:w-1/2">
                                    {startupFeatures.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3 mb-4">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="140" height="140" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" strokeWidth="1" />

                                                    <path d="M35 60l15 15L85 40" stroke="#7dff9d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Column */}
                                <div className="md:w-1/2">
                                    {startupFeatures.slice(5).map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3 mb-4">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" strokeWidth="1" />

                                                    <path d="M35 60l15 15L85 40" stroke="#7dff9d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-6 md:p-8 transition-colors duration-300 relative">
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
                                            <rect x="8" y="8" width="104" height="104" rx="32" ry="32" fill="#3a4a5c" stroke="#5a6a7c" strokeWidth="1" />

                                            <path d="M35 60l15 15L85 40" stroke="#7dff9d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
            <Testimonials />
        </div>
    );
};

export default PricingPage;
