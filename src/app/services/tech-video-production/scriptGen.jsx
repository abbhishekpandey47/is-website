import Image from "next/image";
import Link from "next/link";

export default function ScriptGen() {
  return (
    <div className="max-w-7xl mx-auto text-center relative z-10 pt-8 lg:pt-12">
      <div className="flex flex-col-reverse md:flex-row items-center md:justify-between px-6 pb-16 lg:px-16 gap-8 lg:gap-16">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
              ✨ New Feature
            </span>
          </div>
          
          <h1 className="font-[quicksand] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <div className="mb-2">Try Our New</div>
            <div class="specialtext">
            Script Generator for Your Tech Product Videos
            </div>
          </h1>

          <p className="font-[quicksand] text-xl sm:text-2xl text-gray-200 mb-6 font-medium leading-relaxed">
          Turn complex technical concepts into clear, compelling narratives for tech product videos, onboarding content, and B2B video marketing campaigns. 
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-3 text-left">
              <p className="font-[quicksand] text-gray-300 text-lg leading-relaxed">
              Waste no time on scripts and create high-impact scripts for tech video production. It is faster, smarter, and more engaging than ever.
              </p>
            </div>
            
            <div className="flex items-start gap-3 text-left">
              <p className="font-[quicksand] text-gray-300 text-lg leading-relaxed">
              Perfect tool for SaaS video production where accuracy and clarity matter most.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <Link 
              href="/tools/ai-script-generator" 
              className="group bg-gradient-to-r from-[#3c4199] via-[#4c51bf] to-[#5a67d8] hover:from-[#2d3178] hover:via-[#3c4299] hover:to-[#4c51bf] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 border border-purple-500/20 backdrop-blur-sm w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Generate Script
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
          
          </div>

         
        </div>

        <div className="flex-1 flex justify-center md:justify-end max-w-md md:max-w-none">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-600/50 backdrop-blur-sm overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300">
              <Image
                src={`/reddit/script-gen.png`}
                height={500}
                width={700}
                alt="Technical Video Script Generator Interface"
  className="w-full h-auto md:w-[800px] md:h-auto" 
                priority
              />
              

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                ✨ AI Powered
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}