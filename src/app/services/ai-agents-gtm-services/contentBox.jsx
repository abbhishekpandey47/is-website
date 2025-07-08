import { useState } from "react";

const HoverCards = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_1195_186" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1195_186)">
            <path d="M7 17H14V15H7V17ZM7 13H17V11H7V13ZM7 9H17V7H7V9ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "Technical Blogs & SEO Articles",
      description:
        "Long-form and micro blogs on capabilities, use cases, and best practices. SEO-optimized to capture search traffic and establish authority (e.g., 'How [YourAgent] Automates Cloud Ops').",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_1195_34" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1195_34)">
            <path d="M6.75 22C6 22 5.35417 21.7459 4.8125 21.2375C4.27083 20.7292 4 20.1 4 19.35V5.40005C4 4.76672 4.19583 4.20005 4.5875 3.70005C4.97917 3.20005 5.49167 2.88338 6.125 2.75005L16 0.800049V16.8L6.525 18.7C6.375 18.7334 6.25 18.8125 6.15 18.9375C6.05 19.0625 6 19.2001 6 19.35C6 19.5334 6.075 19.6875 6.225 19.8125C6.375 19.9375 6.55 20 6.75 20H18V4.00005H20V22H6.75ZM9 16.175L14 15.2V3.25005L9 4.22505V16.175ZM7 16.575V4.62505L6.625 4.70005C6.44167 4.73338 6.29167 4.81255 6.175 4.93755C6.05833 5.06255 6 5.21672 6 5.40005V16.825C6.08333 16.7917 6.17083 16.7625 6.2625 16.7375C6.35417 16.7125 6.44167 16.6917 6.525 16.675L7 16.575Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "Use Case Libraries & Implementation Guides",
      description:
        "How-to guides, tutorials, and sample projects. Pragmatic guides with code snippets and diagrams to shorten the learning curve for new users.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_1195_107" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1195_107)">
            <path d="M11.9999 13.5L17.9999 9.5L11.9999 5.5V13.5ZM12.6999 19H18.2999C18.1833 19.4333 17.9833 19.7833 17.6999 20.05C17.4166 20.3167 17.0499 20.4833 16.5999 20.55L5.69994 21.875C5.14994 21.9583 4.65411 21.8292 4.21244 21.4875C3.77078 21.1458 3.51661 20.7 3.44994 20.15L2.12494 9.225C2.05828 8.675 2.19161 8.18333 2.52494 7.75C2.85828 7.31667 3.29994 7.06667 3.84994 7L4.99994 6.85V8.85L4.09994 8.975L5.44994 19.9L12.6999 19ZM8.99994 17C8.44994 17 7.97911 16.8042 7.58744 16.4125C7.19578 16.0208 6.99994 15.55 6.99994 15V4C6.99994 3.45 7.19578 2.97917 7.58744 2.5875C7.97911 2.19583 8.44994 2 8.99994 2H19.9999C20.5499 2 21.0208 2.19583 21.4124 2.5875C21.8041 2.97917 21.9999 3.45 21.9999 4V15C21.9999 15.55 21.8041 16.0208 21.4124 16.4125C21.0208 16.8042 20.5499 17 19.9999 17H8.99994ZM8.99994 15H19.9999V4H8.99994V15Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "Onboarding Videos & Feature Walkthroughs",
      description:
        "Interactive video content and guided tours to help users understand and utilize platform features effectively.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_1195_20" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1195_20)">
            <path d="M11 21V19H19V11.9C19 9.95 18.3208 8.29583 16.9625 6.9375C15.6042 5.57917 13.95 4.9 12 4.9C10.05 4.9 8.39583 5.57917 7.0375 6.9375C5.67917 8.29583 5 9.95 5 11.9V18H4C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V14C2 13.65 2.0875 13.3208 2.2625 13.0125C2.4375 12.7042 2.68333 12.4583 3 12.275L3.075 10.95C3.20833 9.81667 3.5375 8.76667 4.0625 7.8C4.5875 6.83333 5.24583 5.99167 6.0375 5.275C6.82917 4.55833 7.7375 4 8.7625 3.6C9.7875 3.2 10.8667 3 12 3C13.1333 3 14.2083 3.2 15.225 3.6C16.2417 4 17.15 4.55417 17.95 5.2625C18.75 5.97083 19.4083 6.80833 19.925 7.775C20.4417 8.74167 20.775 9.79167 20.925 10.925L21 12.225C21.3167 12.375 21.5625 12.6 21.7375 12.9C21.9125 13.2 22 13.5167 22 13.85V16.15C22 16.4833 21.9125 16.8 21.7375 17.1C21.5625 17.4 21.3167 17.625 21 17.775V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H11ZM9 14C8.71667 14 8.47917 13.9042 8.2875 13.7125C8.09583 13.5208 8 13.2833 8 13C8 12.7167 8.09583 12.4792 8.2875 12.2875C8.47917 12.0958 8.71667 12 9 12C9.28333 12 9.52083 12.0958 9.7125 12.2875C9.90417 12.4792 10 12.7167 10 13C10 13.2833 9.90417 13.5208 9.7125 13.7125C9.52083 13.9042 9.28333 14 9 14ZM15 14C14.7167 14 14.4792 13.9042 14.2875 13.7125C14.0958 13.5208 14 13.2833 14 13C14 12.7167 14.0958 12.4792 14.2875 12.2875C14.4792 12.0958 14.7167 12 15 12C15.2833 12 15.5208 12.0958 15.7125 12.2875C15.9042 12.4792 16 12.7167 16 13C16 13.2833 15.9042 13.5208 15.7125 13.7125C15.5208 13.9042 15.2833 14 15 14ZM6.025 12.45C5.90833 10.6833 6.44167 9.16667 7.625 7.9C8.80833 6.63333 10.2833 6 12.05 6C13.5333 6 14.8375 6.47083 15.9625 7.4125C17.0875 8.35417 17.7667 9.55833 18 11.025C16.4833 11.0083 15.0875 10.6 13.8125 9.8C12.5375 9 11.5583 7.91667 10.875 6.55C10.6083 7.88333 10.0458 9.07083 9.1875 10.1125C8.32917 11.1542 7.275 11.9333 6.025 12.45Z" fill="#6B5BE7" />
          </g>
        </svg>

      ),
      title: "GTM Support & Agentic Workflow Positioning",
      description:
        "Go-to-market strategies and positioning frameworks for agentic workflows and automated solutions.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-900/40 via-[#0a0f1c] to-slate-900 py-20">
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Content that Turns Al Skeptics into Power Users
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Infrasity provides a tailored suite of content and GTM services for
            Al agent startups. Our developer-focused approach creates assets
            that educate, excite, and convert your audience.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="md:flex gap-4 max-w-7xl w-full justify-center items-start">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`my-4 md:my-0 relative bg-gradient-to-br from-[#0a0f1b] to-blue-900/40 backdrop-blur-sm rounded-2xl border-2 cursor-pointer flex-shrink-0 h-40 md:h-64 transition-all duration-700 ease-out transform hover:scale-[1.02] border-[#323640] ${activeCard === index
                ? "w-full md:w-[450px] h-64 border-pink-500/80 shadow-2xl shadow-pink"
                : "w-full md:w-56 border-slate-700/60 hover:border-slate-600/80"
                }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(0)}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Icon Row */}
                <div className="flex-shrink-0 mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 transition-all duration-500 ease-out">
                    {card.icon}
                  </div>
                </div>

                {/* Title Row */}
                <div
                  className={`flex-shrink-0 mb-4 ${activeCard === index ? "mr-0" : "mr-12"
                    }`}
                >
                  <h3 className="text-white text-[20px] font-semibold leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Description Row - Smooth fade in with delay */}
                <div className="flex-1 overflow-hidden">
                  <div
                    className={`transition-all duration-500 ease-out ${activeCard === index
                      ? "opacity-100 translate-y-0 delay-200"
                      : "opacity-0 translate-y-2 delay-0"
                      }`}
                  >
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent rounded-2xl pointer-events-none" />

              {/* Subtle glow effect on hover with smooth transition */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-600 ease-out ${activeCard === index
                  ? "bg-gradient-to-r from-pink-500/5 to-blue-500/5 opacity-100"
                  : "bg-gradient-to-r from-pink-500/5 to-blue-500/5 opacity-0"
                  }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoverCards;
