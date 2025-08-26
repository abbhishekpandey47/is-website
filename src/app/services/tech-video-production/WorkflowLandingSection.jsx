import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function WorkflowLandingSection() {
    return (
        <div className="flex items-center justify-center px-6 py-12 pb-20">
            <div className="max-w-6xl w-full mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Content */}
                    <div className="space-y-8 flex items-center lg:items-start">
                        <div className="space-y-2 text-center lg:text-left">
                            <div className="mb-12">
<p
  className="quicksand-bold text-3xl md:text-5xl lg:text-6xl text-white mb-4 tracking-normal"
  style={{ lineHeight: "1.1" }}
>
  One prompt to turn <br className="md:hidden" />
  <span className="bg-gradient-to-r mt-1 from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">
    ideas into workflows
  </span>
</p>

                            </div>

                            <p className="font-[quicksand] text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Workato's leading iPaaS engine connects your systems,
                                applies business logic, and automates tasks.
                            </p>


                            <div className="flex justify-center lg:justify-start">
                                <Link
                                    href="/tools/ai-script-generator"
                                    className="group bg-[#5f64ff] text-black font-semibold px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                                    <span>Learn more</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Video  */}
                    <div className="relative">
                        <video
                            className="w-full h-auto rounded-lg shadow-lg"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/video-page/script-gen.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
            </div>
        </div>
    );
}