
import Image from 'next/image';

export default function ThirdSection() {
  return (
    <section className="relative w-full py-24 px-4 overflow-hidden bg-transparent">
      {/* Purple blurred background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div
          className="rounded-full blur-3xl"
          style={{
            backgroundColor: "#c30fff",
            filter: "blur(100px)",
            width: "40vw",
            height: "30vh",
            opacity: 0.6,
            maxWidth: 1200,
            left: 0,
            right: 0,
            margin: "auto",
          }}
        />
      </div>

      {/* Section Heading and Image */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mb-20 text-center">
        <div className="inline-block px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
          <p className="text-violet-100 text-base font-medium">Activate the fastest growing marketing channel</p>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{background: 'linear-gradient(0deg, rgba(255,255,255,0.8) 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Turn AI Search into Brand Growth
        </h2>
          <div className="w-full flex justify-center mb-6 absolute z-[-1]">
          <Image
            src="https://framerusercontent.com/images/aootIzwv3wiOmpUg9vnbUWVqA1U.png"
            alt="AI Search Growth"
            width={420}
            height={260} // use actual image height if known
            className="w-full h-auto object-contain rounded-xl"
            priority
          />
    </div>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-2" style={{textAlign: 'center'}}>
          60% of adults are researching products and services on ChatGPT, Google AI Overviews, Perplexity, and Amazon RUFUS, making these key new marketing channels. Monitor how your brand appears, uncover consumer trends, and generate optimized content to lead the AI conversation via our end-to-end workflow
        </p>

        {/* LLM Visibility Audit — three-card layout matching earlier design */}
        <div className="relative z-10 max-w-4xl mx-auto mt-8 mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">Our proven steps to increase visibility and get business results from AI Search</h3>
          <p className="text-white/80 mb-4">Our LLM Visibility Audit gives your SaaS company a competitive edge by ensuring you’re optimized for LLMs. Here’s what you get:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative flex flex-col rounded-[16px] border border-[#23232b] bg-[#0f0f12] p-6">
              <div className="h-[0.1rem] w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#0ea5e9] opacity-60 mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Benchmark of your current site traffic LLMs</h4>
              <p className="text-white/80 text-sm mb-4">Learn how much traffic your site is currently receiving from LLMs, like ChatGPT, Perplexity, and Claude. Understand how well this traffic is converting and what value you get from LLM referral traffic. Gain insights into which page types perform the best on which platforms.</p>

              <h4 className="text-lg font-semibold text-white mb-2">Close your AI visibility gap</h4>
              <p className="text-white/80 text-sm">Our audit will make you understand the current performance of your AI visibility for your category and most relevant keywords. We will also provide actionable insights to improve your domain’s visibility.</p>
            </div>

            <div className="relative flex flex-col rounded-[16px] border border-[#23232b] bg-[#0f0f12] p-6">
              <div className="h-[0.1rem] w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#0ea5e9] opacity-60 mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Uncover who is talking about your brand and where</h4>
              <p className="text-white/80 text-sm">Find out which websites are influencing AI Search responses and which citations are mentioning your brand already. And – more importantly – where you are not mentioned yet. This insight will guide your Digital PR strategy.</p>
            </div>

            <div className="relative flex flex-col rounded-[16px] border border-[#23232b] bg-[#0f0f12] p-6">
              <div className="h-[0.1rem] w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#0ea5e9] opacity-60 mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">An action plan to understand the next steps</h4>
              <p className="text-white/80 text-sm mb-4">Not only will we go through all our findings with you in a 60-minute call but we will also send you an action plan with your priorities to improve your AI visibility.</p>
              <a href="/contact" className="inline-block mt-auto px-4 py-2 rounded-md bg-gradient-to-b from-gray-200 via-white to-gray-200 text-black font-semibold border border-white/10">Book the audit</a>
            </div>
          </div>
        </div>
      </div>

  

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-24">
        {/* Row 1: Card left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Card */}
          <div className="bg-[#18181c]/90 border border-[#23232b] rounded-2xl shadow-2xl p-0 flex flex-col min-h-[340px] w-full mx-auto overflow-hidden">
            
          </div>
          {/* Text */}
          <div className="flex flex-col gap-3">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">Benchmark of your current site traffic LLMs</h3>
            <p className="text-white/80 text-lg max-w-xl">Track your brand's performance across AI platforms like ChatGPT, Perplexity, Gemini, and Rufus. See exactly how your products appear in AI-generated responses and recommendations, with real-time alerts for visibility drops.</p>
          </div>
        </div>
        {/* Row 2: Text left, card right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="flex flex-col gap-3 order-2 md:order-1">
            <div className="mb-2">
              <span className="bg-black border border-[#222] rounded-[6px] px-3 py-1 text-xs text-white font-medium">Competitor Tracking</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">Competitive Intelligence</h3>
            <p className="text-white/80 text-lg max-w-xl">Monitor your competitors' AI search performance alongside your own. Analyzes how your brand and key competitors rank across AI platforms, providing strategic insights for market positioning.</p>
          </div>
          {/* Card */}
          <div className="bg-[#18181c]/90 border border-[#23232b] rounded-2xl shadow-2xl p-0 flex flex-col min-h-[340px] w-full mx-auto overflow-hidden order-1 md:order-2">
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center items-center p-6">
                {/* Radar/graph placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#512feb] via-[#c30fff] to-[#23232b] opacity-40 mb-4 flex items-center justify-center">
                  <span className="text-xs text-white/80">Radar</span>
                </div>
                <div className="text-xs text-white/70 font-medium text-center">Identifying Opportunities…</div>
              </div>
              <div className="flex flex-col gap-1 p-4">
                <div className="bg-black border border-[#222] rounded-[6px] px-3 py-1 text-xs text-white font-medium">Competitor Tracking</div>
                <div className="bg-[#fff]/[0.05] border border-[#222] rounded-lg px-3 py-1 text-xs text-white font-medium">Citation Gap</div>
                <div className="bg-[#fff]/[0.05] border border-[#222] rounded-lg px-3 py-1 text-xs text-white font-medium">Mention Gap</div>
                <div className="bg-[#fff]/[0.05] border border-[#222] rounded-lg px-3 py-1 text-xs text-white font-medium">Topic Gap</div>
                <div className="bg-[#fff]/[0.05] border border-[#222] rounded-lg px-3 py-1 text-xs text-white font-medium">Repeat Task</div>
              </div>
            </div>
          </div>
        </div>
        {/* Row 3: Card left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Card */}
          <div className="bg-[#18181c]/90 border border-[#23232b] rounded-2xl shadow-2xl p-0 flex flex-col min-h-[340px] w-full mx-auto overflow-hidden">
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  className="bg-[#23232b] border border-[#23232b] rounded px-3 py-2 text-white text-sm w-full"
                  placeholder="Generate content.."
                  disabled
                />
                <button className="ml-2 bg-[#23232b] text-white text-xs rounded px-4 py-2 border border-[#23232b]">Generate</button>
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div className="flex-1 bg-[#23232b] rounded-lg h-16" />
                <div className="flex-1 bg-[#23232b] rounded-lg h-16" />
                <div className="flex-1 bg-[#23232b] rounded-lg h-16" />
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="flex flex-col gap-3">
            <div className="mb-2">
              <span className="bg-black border border-[#222] rounded-[6px] px-3 py-1 text-xs text-white font-medium">Content Optimization</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">Generate GEO Content</h3>
            <p className="text-white/80 text-lg max-w-xl">Our end-to-end GEO workflow automatically generates and optimizes product content specifically for LLM consumption, ensuring your brand ranks prominently in AI search results.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
