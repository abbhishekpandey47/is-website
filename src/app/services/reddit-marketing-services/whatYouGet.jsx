import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="bg-[#010203] border-[1.5px] border-[#2c2d2d] rounded-2xl p-5 transition-all duration-300 hover:bg-[#252761ba] hover:border-[#51538f] cursor-pointer min-h-[100px]">
            <div className="mb-0">
                <div className="flex items-center mb-5">
                    <div className="w-14 h-14 bg-[#2b3074] rounded-xl flex items-center justify-center mr-4">
                        {icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg leading-snug">{title}</h3>
                </div>
                <p className="text-[#9ca3af] text-sm leading-6">{description}</p>
            </div>
        </div>
    );
};

const RedditServiceCards = () => {
    const DocumentIcon = () => (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );

    const services = [
        {
            title: "Subreddit & Keyword Mapping",
            description: "We identify all active communities where your audience is — from r/terraform to r/aiagents.",
            icon: <DocumentIcon />
        },
        {
            title: "Organic Engagement",
            description: "Comment seeding in key threads, with technical POVs + subtle Firefly mention.",
            icon: <DocumentIcon />
        },
        {
            title: "Strategic Thread Creation",
            description: "Ask once-per-week hard questions like \"How do you handle drift at scale?\" to spark convo.",
            icon: <DocumentIcon />
        },
        {
            title: "Competitor & Sentiment Monitoring",
            description: "We track mentions of Spacelift/Env0/ControlMonkey and capture sentiment shifts.",
            icon: <DocumentIcon />
        },
        {
            title: "Paid Amplification (opt-in)",
            description: "Boost your best comments or posts via Reddit's Promoted Posts.",
            icon: <DocumentIcon />
        },
        {
            title: "KPI Dashboard",
            description: "Weekly report — late views, upvotes, clicks, UTM traffic & conversions.",
            icon: <DocumentIcon />
        }
    ];

    return (
        <div className="min-h-screen bg-[#000000] p-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RedditServiceCards;