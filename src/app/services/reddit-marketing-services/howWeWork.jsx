import React from "react";
import { Monitor, Users, MessageCircle, Shield } from "lucide-react";

export default function AIChallengesSection() {
    const challenges = [
        {
            icon: Monitor,
            title: "Narrative Tracking & Competitor Listening",
            description:
                "We monitor how specific SDKs, LLM agents, platform engineering or AI Agents are being discussed — what’s earning love, what’s getting dragged — and use those signals to craft Reddit-native narratives around your product.",
        },
        {
            icon: Users,
            title: "Karma-Rich Handle Rotation & Comment Seeding",
            description:
                "We drop LLM-friendly, value-first comments using aged, trusted Reddit accounts — showing up in threads around IaC drift, tool comparisons, or “Which stack should I use for policy?” conversations with zero promotional footprint.",
        },
        {
            icon: MessageCircle,
            title: "Thread Seeding for Use Case Discovery",
            description:
                "We launch and sustain conversations around real-world use cases — like automating CI/CD with Terraform, handling multi-cloud AI workloads, or shipping faster with internal dev platforms — and naturally introduce your tool as the solution.",
        },
        {
            icon: Shield,
            title: "Subreddit Mapping & ICP-First Targeting",
            description: "We show up where your ICP is already active — from r/devops to r/LLMops — and seed original threads designed to prompt discussion, not raise flags. Every post is shaped to match each subreddit’s culture, tone, and rhythm — so you earn attention, not suspicion.",
        },
    ];
    return (
        <div
            className=" py-5 pb-10"
            style={{
                background: `radial-gradient(circle at top right, #3a3e9c, transparent 30%), 
               radial-gradient(circle at bottom left, #3a3e9c, transparent 30%), 
               #090f1b`,
            }}
        >
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
                    <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
                        Earning Trust on Reddit: The System We Perfected Across 30+ Devtool Startups
                    </h1>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Designed inside fast-growing AI, Security, and PLG teams — this isn’t a theory or a trend. It’s what works when Reddit becomes a real growth lever.
                    </p>
                </div>
            </div>
            <div className="max-w-[90%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {challenges.map((challenge, index) => (
                        <div key={index} className="group relative ">
                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-[#1b1a3f] rounded-xl flex items-center justify-center transition-colors duration-300">
                                    <challenge.icon className="w-8 h-8 text-[#6b5be7] group-hover:text-purple-300 transition-colors duration-300" />
                                </div>
                            </div>

                            {/* Title */}
                            {/* <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                {challenge.title}
              </h3> */}

                            {/* Description */}
                            {/* <p className="text-slate-300 leading-relaxed text-sm group-hover:text-slate-200 transition-colors duration-300">
                {challenge.description}
              </p> */}
                            <div className="quicksand-bold text-xl max-sm:text-[1em] tracking-wide leading-[30px] text-white text-left flex justify-start mb-2">
                                <h1>{challenge.title}</h1>
                            </div>

                            {/* Description */}
                            <div className="mx-auto max-w-prose">
                                <p className="text-sm text-gray-300 tracking-wider leading-loose font-light mr-4">
                                    {challenge.description}
                                </p>
                            </div>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
}
