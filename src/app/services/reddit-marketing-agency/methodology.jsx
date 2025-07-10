import React from 'react';

const InfraMethodologyTimeline = () => {
    return (
        <div className="bg-black text-white p-8 md:p-[3rem] md:px-[4rem]">
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center">
                    <h2 className=" md:leading-[80px] text-center max-lg:text-center max-lg:mx-auto">
                        The Execution Framework Behind 100+{" "}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Reddit Touchpoints</span>
                    </h2>
                </div>
            </div>

            <div class="flex justify-center my-4 mb-2">
                <div class="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
            </div>

            {/* Desktop Version */}
            <div className="max-w-7xl mx-auto relative hidden md:block">
                <style jsx>{`
  .horizontal-dashed {
    height: 1px;
    background-image: repeating-linear-gradient(
      to right,
      #818285 0 6px,
      transparent 6px 12px
    );
    background-size: 12px 1px;
    background-repeat: repeat-x;
    background-position: center;
    display: block;
  }

  .vertical-dashed {
    width: 1px;
    background-image: repeating-linear-gradient(
      to bottom,
      #818285 0 6px,
      transparent 6px 12px
    );
    background-size: 1px 12px;
    background-repeat: repeat-y;
    background-position: center;
    display: block;
  }
`}</style>

                {/* Horizontal dashed lines */}
                <div className="absolute left-0 right-0 horizontal-dashed" style={{ top: '50px' }}></div>
                <div className="absolute left-0 right-0 horizontal-dashed" style={{ bottom: '50px' }}></div>

                {/* Vertical dashed lines */}
                <div className="absolute vertical-dashed" style={{ left: '12.5%', top: '50px', bottom: '50px' }}></div>
                <div className="absolute vertical-dashed" style={{ left: '37.5%', top: '50px', bottom: '50px' }}></div>
                <div className="absolute vertical-dashed" style={{ left: '62.5%', top: '50px', bottom: '50px' }}></div>
                <div className="absolute vertical-dashed" style={{ left: '87.5%', top: '50px', bottom: '50px' }}></div>

                <div className="relative" style={{ height: '800px', paddingTop: '70px', paddingBottom: '70px' }}>

                    <div className="absolute" style={{ left: '2.5%', top: '70px', width: '33%' }}>
                        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50 mt-8"
                            style={{
                                background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                                border: "2px solid #393a52",
                                transition: "all 0.3s ease",
                            }}

                        >
                            <div className="flex items-start mb-4">
                                <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <svg className="w-6 h-6 text-[#6b5be7]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                        <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal mr-12">Technical audit + Reddit scan</h3>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 tracking-wider leading-loose font-light mr-4">
                                We break down your product and ICP, then map relevant Reddit subreddits and content themes where real traction is possible.
                            </p>
                        </div>
                    </div>

                    <div className="absolute" style={{ left: '22.5%', top: '140px', width: '33%' }}>
                        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50 mt-44"
                            style={{
                                background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                                border: "2px solid #393a52",
                                transition: "all 0.3s ease",
                            }}>
                            <div className="flex items-start mb-4">
                                <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                        <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal mr-4">Karma-rich handle creation + comment seeding</h3>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 tracking-wider leading-loose font-light mr-4">
                                Activate karma-rich accounts and begin comment-driven engagement — showing up with insight-first contributions in live threads.
                            </p>
                        </div>
                    </div>

                    <div className="absolute" style={{ left: '70.5%', top: '270px', width: '33%' }}>
                        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50"
                            style={{
                                background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                                border: "2px solid #393a52",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div className="flex items-start mb-4">
                                <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                        <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal mr-4">Sentiment tracking + Reddit ad boost</h3>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 tracking-wider leading-loose font-light mr-4">
                                We start original discussions designed to spark feedback and curiosity — and maintain active presence to guide the conversation.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute" style={{ left: '48.5%', top: '530px', width: '33%' }}>
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50 bottom-0"
                        style={{
                            background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                            border: "2px solid #393a52",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div className="flex items-start mb-4">
                            <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                    <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal mr-4">Thread creation + live responses</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 tracking-wider leading-loose font-light mr-4">
                            Monitor responses and engagement signals — then optionally use targeted Reddit ads (≤10%) to amplify momentum without killing authenticity.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between text-center -mt-4 mb-12">
                    <div className="quicksand-semibold text-3xl font-light text-white" style={{ width: '25%' }}>Week 1</div>
                    <div className="quicksand-semibold text-3xl font-light text-white" style={{ width: '25%' }}>Week 2</div>
                    <div className="quicksand-semibold text-3xl font-light text-white" style={{ width: '25%' }}>Week 3</div>
                    <div className="quicksand-semibold text-3xl font-light text-white" style={{ width: '25%' }}>Week 4</div>
                </div>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden max-w-md mx-auto mt-8">
                <div className="space-y-6">
                    {/* Week 1 Card */}
                    <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Week 1</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50"
                        style={{
                            background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                            border: "2px solid #393a52",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div className="flex items-start mb-4">
                            <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                <svg className="w-6 h-6 text-[#6b5be7]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                    <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal">Technical audit + Reddit scan</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 tracking-wider leading-loose font-light">
                            We break down your product and ICP, then map relevant Reddit subreddits and content themes where real traction is possible.
                        </p>
                    </div>

                    {/* Week 2 Card */}
                    <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Week 2</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50"
                        style={{
                            background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                            border: "2px solid #393a52",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div className="flex items-start mb-4">
                            <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                    <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal">Karma-rich handle creation + comment seeding</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 tracking-wider leading-loose font-light">
                            Activate karma-rich accounts and begin comment-driven engagement — showing up with insight-first contributions in live threads.
                        </p>
                    </div>

                    {/* Week 3 Card */}
                    <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Week 3</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50"
                        style={{
                            background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                            border: "2px solid #393a52",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div className="flex items-start mb-4">
                            <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                    <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal">Sentiment tracking + Reddit ad boost</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 tracking-wider leading-loose font-light">
                            We start original discussions designed to spark feedback and curiosity — and maintain active presence to guide the conversation.
                        </p>
                    </div>

                    {/* Week 4 Card */}
                    <div className="text-center mb-4">
                        <div className="quicksand-semibold text-2xl font-light text-white">Week 4</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50 mb-8"
                        style={{
                            background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                            border: "2px solid #393a52",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div className="flex items-start mb-4">
                            <div className="w-10 h-10 bg-[#232a5f] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 0 00-2-2H4zm0 2h12v8H4V6z" />
                                    <path d="M6 8h8v2H6V8zm0 4h5v2H6v-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="quicksand-semibold text-white font-semibold text-lg leading-tight tracking-normal">Thread creation + live responses</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 tracking-wider leading-loose font-light">
                            Monitor responses and engagement signals — then optionally use targeted Reddit ads (≤10%) to amplify momentum without killing authenticity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfraMethodologyTimeline;