import Image from "next/image";
import Link from "next/link";

export default function RedditComment() {
  return (
    <div className="max-w-7xl mx-auto text-center relative z-10 pt-4">
      <div className="md:flex items-center md:justify-between px-8 pb-10 lg:px-16">
        {/* Left Side Content */}
        <div className="flex-1 max-w-2xl mb-14 md:mb-0 text-center md:text-left">
          <h2 className="font-[quicksand] text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1]">
            <div>Try Our New</div>
            <div className="mt-2">
              <span className="text-[#ff4500]">Reddit</span> Comment Generator
            </div>
          </h2>


          <p className="font-[quicksand] text-xl text-gray-300 mb-4 font-medium">
            Build Reddit authority with smart, context-aware replies.
          </p>

          <p className="font-[quicksand] text-lg text-gray-400 mb-12 leading-relaxed">
            Get more eyes on your brand by showing up in top Reddit conversations — the smart way.
            <br />
            Drive authentic engagement with smart, subreddit-aware replies
          </p>
          <div className="flex justify-center items-center">

          <Link href="/tools/reddit-comment-generator" className="bg-[#3c4199] hover:opacity-80 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Reddit Comment Generator
          </Link>
          </div>
        </div>

        {/* Right Side - Placeholder for your image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="flex items-center justify-center shadow-2xl shadow-gray-100/20">
            <Image
              src={`/reddit/reddit-comment.png`}
              height={500}
              width={500}
              alt="reddit comment imgae"
              className="bg-gray-800 bg-opacity-30 rounded-xl border border-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}