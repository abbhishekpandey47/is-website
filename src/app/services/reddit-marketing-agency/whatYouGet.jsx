
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
            description: "We research relevant subreddits, Reddit keywords, and active discussions to identify where your buyers already spend time. This helps us build a Reddit marketing strategy that fits naturally into existing conversations.",
            icon: <DocumentIcon />
        },
        {
            title: "Trusted Account Management",
            description: "We use established Reddit profiles with strong history and credibility to participate in discussions with real insights ensuring natural engagement without spam, flags, or account risk.",
            icon: <DocumentIcon />
        },
        {
            title: "Strategic Thread Creation & Engagement",
            description: "We create and support high-signal threads around the real problems your buyers are discussing, positioning your product as a credible solution through context & not promotion.",
            icon: <DocumentIcon />
        },
        {
            title: "Competitor & Category Monitoring",
            description: "We monitor Reddit conversations around your category, competitors, and product to identify sentiment trends, discussion gaps, and opportunities to enter conversations at the right time.",
            icon: <DocumentIcon />
        },
        {
            title: "Selective Paid Amplification",
            description: "When organic posts perform well, we amplify them using Reddit Ads to increase visibility among high-intent audiences focusing on precision, not broad reach.",
            icon: <DocumentIcon />
        },
        {
            title: "Reddit Analytics & KPI Tracking",
            description: "You get weekly visibility into performance including upvotes, traffic, thread visibility, and conversions so you can clearly see how Reddit contributes to pipeline.",
            icon: <DocumentIcon />
        }
    ];

    return (
        <div className=" p-8 md:p-[4rem] md:px-[5rem] -mt-8">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        How We Run Reddit Marketing Campaigns
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Sets it apart from generic Reddit service promises. Great for credibility.


                    </p>
                </div>
            </div>
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
