import ContactPopupButton from "./ContactPopupButton";


const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-900 border-[1.5px] border-[#2c2d2d] rounded-2xl p-5 transition-all duration-300 hover:bg-[#252761ba] hover:border-[#51538f] cursor-pointer min-h-[100px]">
            <div className="mb-0">
                <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-[#2b3074] rounded-xl flex items-center justify-center mr-4">
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
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.20001 9.6001H16.8V12.0001H7.20001V9.6001ZM7.20001 14.4001H13.2V16.8001H7.20001V14.4001Z" fill="white"/>
</svg>

    );

    const services = [
        {
            title: "Subreddit & Keyword Mapping",
            description: "We surface high-signal topics that invite your ICP to engage — blending into existing conversation patterns while steering the narrative toward your strengths.",
            icon: <DocumentIcon />
        },
        {
            title: "Organic Engagement",
            description: "We use karma-rich Reddit accounts to participate in live discussions with technical clarity and cultural fluency, showing up where it counts, and never triggering flags.",
            icon: <DocumentIcon />
        },
        {
            title: "Strategic Thread Creation",
            description: "Ask once-per-week hard questions like \"How do you handle drift at scale?\" to spark convo.",
            icon: <DocumentIcon />
        },
        {
            title: "Competitor & Sentiment Monitoring",
            description: "We monitor how Reddit talks about tools in categories like infrastructure automation, data observability, and AI agent platforms — identifying sentiment shifts and conversation gaps where your product can enter naturally and earn attention.",
            icon: <DocumentIcon />
        },
        {
            title: "Selective Paid Amplification",
            description: "If something works organically, we’ll selectively amplify it using Reddit’s native ad format. Less than 10% of our impact, used for signal, not reach.",
            icon: <DocumentIcon />
        },
        {
            title: "KPI Dashboard",
            description: "You get weekly visibility into what’s working — upvotes, traffic, clicks, conversions — and how each Reddit thread contributes to the bigger picture.",
            icon: <DocumentIcon />
        }
    ];

    return (
        <div className=" p-8 md:p-[4rem] md:px-[5rem] -mt-8">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        The Quiet Reddit System Refined Across 30+ {" "}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Breakout Startups</span>
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
               <div className="flex flex-col items-center mt-4">
                                    {/* Center - Book a Demo button */}
                                    <div className="flex flex-col items-center mt-4">
                                        <ContactPopupButton buttonText="Book a Strategy Call" width="w-52" height="h-11" textSize="text-sm" textWeight="quicksand-semibold" />
                                        <p className="text-[0.75rem] px-[1rem] py-[0.75rem]">Free Reddit audit included</p>
                                    </div>
                                </div>
        </div>
    );
};

export default RedditServiceCards;
