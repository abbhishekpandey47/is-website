
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
    <section className="p-8 md:p-[6rem] md:px-[5rem]">
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Reddit Metrics{" "}</span>That Move the Needle Traffic, Upvotes, Trials
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                    </p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
      <div className="max-w-7xl justify-center items-center mt-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-6 bg-[#0D0A1A]/50 rounded-3xl p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-gray-700/50">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center py-6"
            >
              <div className="mb-3">
                <span className="text-4xl sm:text-5xl lg:text-7xl xl:text-7xl font-weight-[400] text-white tracking-tight">
                  {stat.number}
                </span>
              </div>
              <p className="text-[16px] text-[#F2F2F2] leading-tight">
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
