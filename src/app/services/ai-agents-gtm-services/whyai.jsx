import React from "react";
import { Monitor, Users, MessageCircle, Shield } from "lucide-react";

export default function AIChallengesSection() {
  const challenges = [
    {
      icon: Monitor,
      title: "New Interface Paradigms",
      description:
        "Your AI agent may replace or augment traditional UIs with conversational or autonomous workflows. Explaining this novel interface is hard - users might not immediately grasp how to use it or why it's better.",
    },
    {
      icon: Users,
      title: "Hard-to-Explain Infrastructure",
      description:
        "Behind the scenes, agentic platforms rely on complex AI models, tool orchestration, and real-time decision-making. Communicating how it all works (and why it's reliable and secure) can overwhelm a non-expert audience.",
    },
    {
      icon: MessageCircle,
      title: "Real Time Feedback Loops",
      description:
        "Many AI agents learn and adapt on the fly. It's a powerful feature, but conveying its value requires storytelling and education. Users need to understand what the agent is doing and trust it to make the right decisions in real time.",
    },
    {
      icon: Shield,
      title: "Trust and Adoption Hurdles",
      description:
        "Handing over tasks to an autonomous agent can feel risky. Prospective customers and developers might worry about control, safety, or ROI. Without clear content to address these concerns, even groundbreaking tech can face adoption headwinds.",
    },
  ];

  return (
    <div
      className=" py-20"
      style={{
        background: `radial-gradient(circle at top right, #3a3e9c, transparent 30%), 
               radial-gradient(circle at bottom left, #3a3e9c, transparent 30%), 
               #090f1b`,
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Why Al Agent Startups Need a New Content Playbook
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto mb-8">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Al agent platforms face unique Go-to-Market challenges. Your product
            introduces a new way of working. To win over developers and
            stakeholders, you must answer their key questions:
            <br />{" "}
            <span className="font-normal text-[19px]">
              "What can I build? How do I integrate? Where do I start?"
            </span>
          </p>
        </div>
      </div>
      <div className="max-w-[85%] mx-auto">
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
