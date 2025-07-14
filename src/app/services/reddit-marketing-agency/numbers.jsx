import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "110%",
      label: "increase in traffic from LLMs such as ChatGPT, Gemini, Perplexity, etc."
    },
    {
      number: "60+",
      label: "upvotes across key Reddit threads (in first 30 days)"
    },
    {
      number: "100+",
      label: "organic product mentions in developer discussions"
    },
    {
      number: "20%",
      label: "growth in qualified leads from r/devops and related subreddits"
    }
  ];

  return (
    <section className="bg-[#000000] p-8 md:p-[4rem] md:px-[5rem] -mt-8">
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
Real Threads. Real Signups                    </h2>
                </div>
                <div class="flex justify-center my-6 mb-8">
                    <div class="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
No use this one Reddit Metrics That Move the Needle — Traffic, Upvotes, Trials

                    </p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
      <div className="max-w-7xl justify-center items-center">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center bg-[#2b2a2aa8] py-6 rounded-2xl group hover:scale-105 transition-transform duration-300"
              style={{
background: "radial-gradient(ellipse at bottom center, rgba(255, 255, 255, 0.2) 5%, rgba(17, 17, 17, 0.4) 60%, rgba(17, 17, 17, 0.6) 100%)",
                                border: "1.5px solid #2b2a2aa8",
                                transition: "all 0.3s ease",
                            }}
            >
              <div className="mb-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl quicksand-bold text-white tracking-tight">
                  {stat.number}
                </span>
              </div>
              <p className="font-[quicksand] text-sm sm:text-base lg:text-lg text-gray-400 font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default StatsSection;