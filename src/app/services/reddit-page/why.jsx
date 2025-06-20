import React from 'react';
import { X, Check } from 'lucide-react';

export default function RedditMarketingSlide() {
    const failurePoints = [
        "Fresh accounts → auto-flagged",
        "Obvious links → removed",
        "Generic replies = ignored",
        "Same post in 10 subs → banned",
        "No upvotes = no reach"
    ];

    const solutions = [
        "We use aged, karma-rich Reddit accounts",
        "We build trust before we ever drop a link",
        "We write value-first, LLM-friendly comments",
        "We tailor posts to each sub's culture",
        "We write to earn real, sticky engagement"
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-normal leading-[80px] text-white text-center flex justify-center mb-2">
                        <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
                            Why Most Reddit Marketing Fails{' '}
                            <span className="text-[#6b5be7]">(And Ours Doesn't)</span>
                        </h1>
                    </div>


                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <div className="bg-[#270102] border-[1px] border-[#ff0000] rounded-lg p-6">
                        <h2 className="quicksand-semibold text-3xl font-semibold text-[#ff0000] mb-6">What Fails</h2>
                        <div className="space-y-6">
                            {failurePoints.map((point, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <X style={{ stroke: '#ff0000' }} size={20} />
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