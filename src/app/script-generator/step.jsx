import Image from "next/image"

export default function AIScriptStep() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-[quicksand] text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            HOW TO USE THE <span class="specialtext">AI SCRIPT<br />
            GENERATOR:</span>
          </h1>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-gray-800/60 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-white-500/50 transition-all duration-300">
            <div className="flex justify-center mb-8">
              <div className="rounded-2xl flex items-center justify-center">
                <Image 
                src="/script-tool/i1.avif"
                height={200}
                width={200}
                alt="step image"
                />
              </div>
            </div>

            <div className="mb-4">
              <span className=" font-[quicksand] text-white-400 text-sm font-bold tracking-wider">STEP 1</span>
            </div>

            <h2 className="font-[quicksand] text-2xl font-bold mb-2 md:mb-14 text-white">Type a prompt</h2>

            <p className="text-gray-300 leading-relaxed">
              Enter a few words or sentences describing your video idea or topic. 
              Our AI will generate a script based on your prompt.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800/60 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-white-500/50 transition-all duration-300">
            <div className="flex justify-center mb-8">
              <div className="rounded-2xl flex items-center justify-center">
                <Image 
                src="/script-tool/i2.avif"
                height={200}
                width={200}
                alt="step image"
                />
              </div>
            </div>

            <div className="mb-4">
              <span className="font-[quicksand] text-white-400 text-sm font-bold tracking-wider">STEP 2</span>
            </div>

            <h2 className="font-[quicksand] text-2xl font-bold mb-2 md:mb-14 text-white">Perfect your script</h2>

            <p className="text-gray-300 leading-relaxed">
              Refine your AI script to match your brand voice and message. 
              You can adjust the tone and target audience.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800/60 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-white-500/50 transition-all duration-300">
            <div className="flex justify-center mb-8">
              <div className="rounded-2xl flex items-center justify-center">
                <Image 
                src="/script-tool/i3.avif"
                height={200}
                width={200}
                alt="step image"
                />
              </div>
            </div>

            <div className="mb-4">
              <span className="font-[quicksand] text-white-400 text-sm font-bold tracking-wider">STEP 3</span>
            </div>

            <h2 className="font-[quicksand] text-2xl font-bold mb-2 md:mb-6 text-white">Copy script or generate video</h2>

            <p className="text-gray-300 leading-relaxed">
              Copy your script, or let our AI turn it into a complete video with narration, 
              captions, and footage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}