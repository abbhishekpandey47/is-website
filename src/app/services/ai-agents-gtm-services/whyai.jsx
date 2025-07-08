import React from "react";

export default function AIChallengesSection() {
  const challenges = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_297_257" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_297_257)">
            <path d="M7.06742 25.6067C6.49888 25.6067 6.01217 25.4043 5.6073 24.9994C5.20243 24.5946 5 24.1079 5 23.5393V21.4719C5 20.9034 5.20243 20.4167 5.6073 20.0118C6.01217 19.6069 6.49888 19.4045 7.06742 19.4045H13.2697C13.8382 19.4045 14.3249 19.6069 14.7298 20.0118C15.1346 20.4167 15.3371 20.9034 15.3371 21.4719V23.5393C15.3371 24.1079 15.1346 24.5946 14.7298 24.9994C14.3249 25.4043 13.8382 25.6067 13.2697 25.6067H7.06742ZM19.4719 25.6067C18.9034 25.6067 18.4167 25.4043 18.0118 24.9994C17.6069 24.5946 17.4045 24.1079 17.4045 23.5393V9.06742C17.4045 8.49888 17.6069 8.01217 18.0118 7.6073C18.4167 7.20243 18.9034 7 19.4719 7H25.6742C26.2427 7 26.7294 7.20243 27.1343 7.6073C27.5391 8.01217 27.7416 8.49888 27.7416 9.06742V23.5393C27.7416 24.1079 27.5391 24.5946 27.1343 24.9994C26.7294 25.4043 26.2427 25.6067 25.6742 25.6067H19.4719ZM7.06742 23.5393H13.2697V21.4719H7.06742V23.5393ZM19.4719 23.5393H25.6742V9.06742H19.4719V23.5393ZM22.573 22.5056C22.8659 22.5056 23.1114 22.4066 23.3095 22.2084C23.5077 22.0103 23.6067 21.7648 23.6067 21.4719C23.6067 21.179 23.5077 20.9335 23.3095 20.7354C23.1114 20.5373 22.8659 20.4382 22.573 20.4382C22.2801 20.4382 22.0346 20.5373 21.8365 20.7354C21.6384 20.9335 21.5393 21.179 21.5393 21.4719C21.5393 21.7648 21.6384 22.0103 21.8365 22.2084C22.0346 22.4066 22.2801 22.5056 22.573 22.5056ZM7.06742 17.3371C6.49888 17.3371 6.01217 17.1346 5.6073 16.7298C5.20243 16.3249 5 15.8382 5 15.2697V9.06742C5 8.49888 5.20243 8.01217 5.6073 7.6073C6.01217 7.20243 6.49888 7 7.06742 7H13.2697C13.8382 7 14.3249 7.20243 14.7298 7.6073C15.1346 8.01217 15.3371 8.49888 15.3371 9.06742V15.2697C15.3371 15.8382 15.1346 16.3249 14.7298 16.7298C14.3249 17.1346 13.8382 17.3371 13.2697 17.3371H7.06742ZM11.2022 12.1685C11.4951 12.1685 11.7406 12.0695 11.9388 11.8713C12.1369 11.6732 12.236 11.4277 12.236 11.1348C12.236 10.8419 12.1369 10.5964 11.9388 10.3983C11.7406 10.2002 11.4951 10.1011 11.2022 10.1011C10.9094 10.1011 10.6639 10.2002 10.4657 10.3983C10.2676 10.5964 10.1685 10.8419 10.1685 11.1348C10.1685 11.4277 10.2676 11.6732 10.4657 11.8713C10.6639 12.0695 10.9094 12.1685 11.2022 12.1685ZM7.06742 14.9337L9.13483 12.1685L11.4607 15.2697H13.2697V9.06742H7.06742V14.9337Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "New Interface Paradigms",
      description:
        "Your AI agent may replace or augment traditional UIs with conversational or autonomous workflows. Explaining this novel interface is hard - users might not immediately grasp how to use it or why it's better.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_297_265" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_297_265)">
            <path d="M7 26.6742V19.4382H10.1011V15.3034H15.2697V13.236H12.1685V6H20.4382V13.236H17.3371V15.3034H22.5056V19.4382H25.6067V26.6742H17.3371V19.4382H20.4382V17.3708H12.1685V19.4382H15.2697V26.6742H7ZM14.236 11.1685H18.3708V8.06742H14.236V11.1685ZM9.06742 24.6067H13.2022V21.5056H9.06742V24.6067ZM19.4045 24.6067H23.5393V21.5056H19.4045V24.6067Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "Hard-to-Explain Infrastructure",
      description:
        "Behind the scenes, agentic platforms rely on complex AI models, tool orchestration, and real-time decision-making. Communicating how it all works (and why it's reliable and secure) can overwhelm a non-expert audience.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_297_271" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_297_271)">
            <path d="M12.2022 18.4045H20.4719V17.836C20.4719 17.0779 20.0929 16.4663 19.3348 16.0011C18.5768 15.536 17.5775 15.3034 16.3371 15.3034C15.0966 15.3034 14.0974 15.536 13.3393 16.0011C12.5813 16.4663 12.2022 17.0779 12.2022 17.836V18.4045ZM16.3371 14.2697C16.9056 14.2697 17.3923 14.0672 17.7972 13.6624C18.2021 13.2575 18.4045 12.7708 18.4045 12.2022C18.4045 11.6337 18.2021 11.147 17.7972 10.7421C17.3923 10.3373 16.9056 10.1348 16.3371 10.1348C15.7685 10.1348 15.2818 10.3373 14.877 10.7421C14.4721 11.147 14.2697 11.6337 14.2697 12.2022C14.2697 12.7708 14.4721 13.2575 14.877 13.6624C15.2818 14.0672 15.7685 14.2697 16.3371 14.2697ZM6 26.6742V8.06742C6 7.49888 6.20243 7.01217 6.6073 6.6073C7.01217 6.20243 7.49888 6 8.06742 6H24.6067C25.1753 6 25.662 6.20243 26.0669 6.6073C26.4717 7.01217 26.6742 7.49888 26.6742 8.06742V20.4719C26.6742 21.0404 26.4717 21.5272 26.0669 21.932C25.662 22.3369 25.1753 22.5393 24.6067 22.5393H10.1348L6 26.6742ZM9.25618 20.4719H24.6067V8.06742H8.06742V21.6348L9.25618 20.4719Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "Real Time Feedback Loops",
      description:
        "Many AI agents learn and adapt on the fly. It's a powerful feature, but conveying its value requires storytelling and education. Users need to understand what the agent is doing and trust it to make the right decisions in real time.",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_297_277" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_297_277)">
            <path d="M15.1843 20.0067L21.0247 14.1663L19.5517 12.6933L15.1843 17.0607L13.0135 14.8899L11.5404 16.3629L15.1843 20.0067ZM16.2697 26.6742C13.8749 26.0712 11.8979 24.6972 10.3388 22.5522C8.77959 20.4073 8 18.0255 8 15.4067V9.10112L16.2697 6L24.5393 9.10112V15.4067C24.5393 18.0255 23.7597 20.4073 22.2006 22.5522C20.6414 24.6972 18.6644 26.0712 16.2697 26.6742ZM16.2697 24.5034C18.0614 23.9348 19.5431 22.7978 20.7146 21.0921C21.8861 19.3865 22.4719 17.4914 22.4719 15.4067V10.5225L16.2697 8.19663L10.0674 10.5225V15.4067C10.0674 17.4914 10.6532 19.3865 11.8247 21.0921C12.9963 22.7978 14.4779 23.9348 16.2697 24.5034Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
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
          <h2 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Why AI Agent Startups Need a New Content Playbook
          </h2>
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
                  {challenge.icon}
                </div>
              </div>

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