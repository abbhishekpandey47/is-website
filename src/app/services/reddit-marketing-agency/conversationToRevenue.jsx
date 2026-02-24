
// Card data moved outside the component for clarity
const conversationCards = [
    {
        key: 1,
        title: '1. Book a Strategy Call',
        description: 'A focused call is scheduled to understand your SaaS product, ICP, category positioning, and revenue goals. The discussion maps how Reddit conversations, high-intent threads, and buyer prompts align with your demand generation strategy.',
        image: '/reddit/revenue1.svg',
    },
    {
        key: 2,
        title: '2. Conduct a Reddit & Competitor Intelligence Audit',
        description: 'Brand mentions, sentiment trends, competitor share of voice, subreddit activity, and keyword-level prompt coverage are analyzed to establish a visibility baseline and identify growth opportunities.',
        image: '/reddit/revenue2.svg',
    },
    {
        key: 3,
        title: '3. Execute Targeted Engagement Across Buying Threads',
        description: 'Participation begins across comparison posts, recommendation discussions, and ICP-relevant subreddits to increase organic brand mentions and presence within decision-stage conversations.',
        image: '/reddit/revenue3.svg',
    },
    {
        key: 4,
        title: '4. Track Visibility, Sentiment & LLM Presence',
        description: 'Share of voice, sentiment shifts, prompt rankings, and LLM-surfaced brand mentions are monitored using advanced tools, with monthly reporting guiding sustained visibility growth across Reddit and AI discovery platforms.',
        image: '/reddit/revenue4.svg',
    },
];

export default function ConversationToRevenue() {
    // For brevity, only the main container and a sample step are shown. Expand as needed for full fidelity.
    return (
        <div className="p-8 md:p-[4rem] md:px-[5rem]">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        The Reddit Growth System Built for High-Growth{' '}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>B2B Startups</span>
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>
                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        We identify high-intent discussions, contribute meaningful narratives, and position
                        your brand where purchase decisions are already happening.
                    </p>
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24 }}
                >
                    {conversationCards.map(card => (
                        <div
                            key={card.key}
                            style={{
                                background: '#0e0b1b',
                                border: '1px solid rgba(119,119,119,0.5)',
                                borderRadius: 23,
                                overflow: 'hidden',
                                minHeight: 420,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                boxShadow: '0 4px 32px 0 rgba(95,100,255,0.10)',
                            }}
                        >
                            <div style={{ borderRadius: '16px 16px 0 0', width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' , marginTop: '16px'}}>
                                <img src={card.image} alt={card.title} style={{ borderRadius:'12px', height: '100%', objectFit: 'contain', margin: '0 auto' }} />
                            </div>
                            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <div style={{ color: '#fff', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{card.title}</div>
                                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: '1.6' }}>{card.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
