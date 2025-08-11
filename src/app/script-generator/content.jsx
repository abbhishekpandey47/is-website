import React from 'react';

export default function VideoScriptContent() {
  return (
    <div className="text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-transparent border border-white/20 rounded-3xl p-12">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="font-[quicksand] text-xl md:text-2xl font-bold text-white">
              Generate engaging video scripts in seconds
            </h1>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <p className="text-lg leading-relaxed text-gray-300">
              Staring at a blank page while deadlines loom? VEED's AI script generator eliminates writer's block by creating scripts for any format — TikTok videos, Instagram Reels, YouTube content, and marketing campaigns. Describe your video idea, and get a complete script with hooks, key points, and calls-to-action. Then, refine the script with your expertise and brand voice.
            </p>

            {/* Right Column */}
            <p className="text-lg leading-relaxed text-gray-300">
              Skip the complicated workflow of multiple platforms. Once your script is ready, you can turn it into a professional video with lifelike voiceovers, AI avatars, background music, captions, and stock footage. No need to juggle tools and software. Create professional-quality content in one seamless platform. Get started now for free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}