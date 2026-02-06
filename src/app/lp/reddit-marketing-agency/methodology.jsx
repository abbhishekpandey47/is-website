const InfraMethodologyTimeline = () => {
    const timelineSteps = [
        {
            id: '01',
            title: 'Strategic Research',
            copy:
                'We start by researching your product, industry trends, and competitors to build a data-driven Reddit marketing strategy. Our team identifies high-potential subreddits, relevant discussion topics, and communities where your brand can gain authentic visibility.',
        },
        {
            id: '02',
            title: 'Thread Targeting',
            copy:
                'Next, we shortlist the best Reddit threads and conversation topics for brand promotion. We create engagement samples and comment drafts that reflect your unique value proposition and brand voice, ensuring all content feels organic and community-first.',
        },
        {
            id: '03',
            title: 'Organic Engagement',
            copy:
                'With your approval, we use karma-rich accounts to post comments, create threads, and join discussions. This real-time Reddit engagement strategy helps boost credibility, drive organic conversation, and connect your brand with your ideal audience.',
        },
        {
            id: '04',
            title: 'Growth Optimization',
            copy:
                'We monitor engagement metrics and audience sentiment closely. As one of the best Reddit marketing agency for B2B SaaS, based on performance, we refine our Reddit marketing approach and, if suitable, run targeted Reddit ad campaigns to amplify reach.',
        },
    ];

    return (
        <div className="text-white p-8 md:p-[3rem] md:px-[4rem]">
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center">
                    <h2 className="md:leading-[80px] text-center max-lg:text-center max-lg:mx-auto">
                        Our Proven Reddit Marketing Process for Authentic Brand Growth
                    </h2>
                </div>
            </div>

            <div className="flex justify-center my-4 mb-2">
                <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
            </div>

            {/* Desktop Version */}
            <div className="max-w-7xl mx-auto relative hidden md:block py-20 mt-12">
                <img
                    src="/reddit/methodolgy.svg"
                    alt="Reddit marketing methodology"
                    className="w-full h-auto"
                />
            </div>

            {/* Mobile Version */}
            <div className="md:hidden max-w-md mx-auto mt-8">
                <div className="space-y-6">
                    {/* Step 1 Card */}
                    {/* <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Step 1</div>
                    </div> */}
                    <div className="bg-[#0f1228] rounded-2xl p-6 border border-gray-700/50">
                        <div className="text-7xl font-bold text-gray-800/60 mb-4">01</div>
                        <h3 className="quicksand-bold text-white text-xl mb-3">Strategic Research</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            We start by researching your product, industry trends, and competitors to build a data-driven Reddit marketing strategy. Our team identifies high-potential subreddits, relevant discussion topics, and communities where your brand can gain authentic visibility.
                        </p>
                    </div>

                    {/* Step 2 Card */}
                    {/* <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Step 2</div>
                    </div> */}
                    <div className="bg-[#0f1228] rounded-2xl p-6 border border-gray-700/50">
                        <div className="text-7xl font-bold text-gray-800/60 mb-4">02</div>
                        <h3 className="quicksand-bold text-white text-xl mb-3">Thread Targeting</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Next, we shortlist the best Reddit threads and conversation topics for brand promotion. We create engagement samples and comment drafts that reflect your unique value proposition and brand voice, ensuring all content feels organic and community-first.
                        </p>
                    </div>

                    {/* Step 3 Card */}
                    {/* <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Step 3</div>
                    </div> */}
                    <div className="bg-[#0f1228] rounded-2xl p-6 border border-gray-700/50">
                        <div className="text-7xl font-bold text-gray-800/60 mb-4">03</div>
                        <h3 className="quicksand-bold text-white text-xl mb-3">Organic Engagement</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            With your approval, we use karma-rich accounts to post comments, create threads, and join discussions. This real-time Reddit engagement strategy helps boost credibility, drive organic conversation, and connect your brand with your ideal audience.
                        </p>
                    </div>

                    {/* Step 4 Card */}
                    {/* <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Step 4</div>
                    </div> */}
                    <div className="bg-[#0f1228] rounded-2xl p-6 border border-gray-700/50 mb-8">
                        <div className="text-7xl font-bold text-gray-800/60 mb-4">04</div>
                        <h3 className="quicksand-bold text-white text-xl mb-3">Growth Optimization</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            We monitor engagement metrics and audience sentiment closely. As one of the best Reddit marketing agency for B2B SaaS, based on performance, we refine our Reddit marketing approach and, if suitable, run targeted Reddit ad campaigns to amplify reach.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfraMethodologyTimeline;
