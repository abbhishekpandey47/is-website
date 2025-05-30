import React, { useState } from "react";
import { TrendingUp, Users, User } from "lucide-react";

const MarketingHeadsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const menuItems = [
    {
      id: 0,
      title: "Founders & CEOs",
      icon: <User className="w-5 h-5" />,
      description:
        "Strategic leadership and vision alignment for sustainable business growth and market expansion.",
    },
    {
      id: 1,
      title: "Content & DevRel Leaders",
      icon: <Users className="w-5 h-5" />,
      description:
        "Developer advocacy and community building through authentic technical content and engagement.",
    },
    {
      id: 2,
      title: "Marketing & Growth Heads",
      icon: <TrendingUp className="w-5 h-5" />,
      description:
        "Align content with GTM goals: product launches, SEO, sales enablement. Think of us as your on-demand technical content squad that executes quickly on campaign needs.",
    },
  ];

  const rightPanelCards = [
    {
      title: "Leadership Vision",
      description:
        "Strategic direction and executive decision-making for long-term business success and market positioning.",
      icon: <User className="w-6 h-6 text-white" />,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Developer Relations",
      description:
        "Community engagement and technical advocacy to build strong developer ecosystems and partnerships.",
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Growth Marketing",
      description:
        "Align content with GTM goals: product launches, SEO, sales enablement. Think of us as your on-demand technical content squad that executes quickly on campaign needs.",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      gradient: "from-pink-500 to-orange-600",
    },
  ];

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[80vh]">
          {/* Left Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleMenuClick(index)}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeIndex === index
                        ? "bg-white bg-opacity-20 text-white"
                        : "bg-white bg-opacity-10 text-gray-300"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className={`text-xl font-semibold ${
                      activeIndex === index ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                {activeIndex === index && (
                  <div className="ml-14 animate-fadeIn">
                    <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4"></div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {menuItems[activeIndex].title}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">
                    On-demand technical content squad
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">
                {menuItems[activeIndex].description}
              </p>

              {/* Three Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rightPanelCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 border border-white border-opacity-20"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-lg mb-4 flex items-center justify-center`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MarketingHeadsCarousel;
