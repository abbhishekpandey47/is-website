import React from 'react';

export default function VideoScriptContent() {
  return (
    <div className="text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-transparent border border-white/20 rounded-3xl p-12">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="font-[quicksand] text-xl md:text-2xl font-bold text-white">
            Generate High-Impact Video <span class="specialtext">Scripts for Engineering Startups in Seconds</span>
            </h1>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <p className="text-lg leading-relaxed text-gray-300">
          Stop wasting hours figuring out what to say in your product videos. Infrasity’s Video Script Generator is purpose-built for AI, DevTool, and infrastructure-focused startups, covering everything from cost optimization workflows to side-by-side tool comparisons (e.g., code review platforms, IaC automation tools). It deep dives into real developer workflows like Kubernetes tuning, CI/CD speed-ups, or testing automation.
            </p>

            {/* Right Column */}
            <p className="text-lg leading-relaxed text-gray-300">
           Tell us your product, use case, and audience, and get a script that’s already optimized for hooks, technical clarity, and developer engagement. Whether you’re launching a new feature, breaking down a complex workflow, or showing how your tool outperforms the competition, our script generator delivers ready-to-use scripts grounded in real GTM research, trending technical conversations, and platform-specific performance data. You’re not just creating content, you’re creating traction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}