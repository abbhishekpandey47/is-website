import React from 'react';
import { X, Check } from 'lucide-react';

export default function RedditMarketingSlide() {
    const failurePoints = [
        "Fresh accounts → instantly flagged",
        "Posting links too early → removed by mods",
        "Generic replies → ignored or downvoted",
        "Crossposting → banned for spam",
        "No upvotes → zero visibility"
    ];

    const solutions = [
        "Use aged, karma-rich accounts with history",
        "Earn trust before mentioning your product",
        "Write LLM-optimized, value-driven responses",
        "Adapt tone to each subreddit’s culture",
        "Focus on helpful content that gets upvoted naturally"
    ];

    return (
        <div className="bg-black text-white p-8 flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-normal leading-[80px] text-white text-center flex justify-center mb-2">
                        <h2 className=" leading-[50px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
                            What We Learned Running Reddit for the Fastest-Growing
                            {' '}<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">B2B Startups</span>
                        </h2>
                    </div>
                    <div class="flex justify-center my-6 mb-10">
                        <div class="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <div className="bg-[#270102] border-[1px] border-[#F87171] rounded-lg p-6">
                        <h2 className="quicksand-semibold text-3xl font-semibold text-[#F87171] mb-6">What Fails</h2>
                        <div className="space-y-6">
                            {failurePoints.map((point, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <X style={{ stroke: '#F87171' }} size={20} />
                                    <p className="text-[17px] md:text-[17px] text-[#ffffff] leading-none tracking-wide font-light">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How We Fix It Column */}
                    <div className="bg-[#071e0b] border-[1px] border-[#28b837] rounded-lg p-6">
                        <h2 className="quicksand-semibold text-3xl font-semibold text-[#28b837] mb-6">How we fix it</h2>
                        <div className="space-y-6">
                            {solutions.map((solution, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Check style={{ stroke: '#28b837' }} size={20} />
                                    <p className="text-[17px] md:text-[17px] text-[#ffffff] leading-none tracking-wide font-light">{solution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}