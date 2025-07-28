"use client"

import { MessageCircle } from "lucide-react";

export default function ToolsSection() {
  const tools = [
    {
      id: 1,
      title: "TikTok Comment Generator",
      description: "Create custom TikTok comment reply stickers for your UGC content and video ads.",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10"
    },
    {
      id: 2,
      title: "Instagram Comment Generator",
      description: "Create custom Instagram comment reply stickers for your UGC content and video ads.",
      iconColor: "text-pink-500",
      iconBg: "bg-pink-500/10"
    }
  ];

  return (
    <div className="bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-100">
          Discover more Tools
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white/10 border border-gray-700 rounded-xl p-6 hover:border-gray-600 hover:bg-gray-750 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 ${tool.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                <MessageCircle className={`w-6 h-6 ${tool.iconColor}`} />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-white transition-colors">
                {tool.title}
              </h2>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}