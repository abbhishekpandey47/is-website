"use client"

import { FilePdfFilled, FilePdfOutlined } from "@ant-design/icons";
import { Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ToolsSection({darkMode}) {
  const tools = [
    {
      id: 1,
      title: "Infrasity ROI Calculator",
      description: "Calculate how much you can save by outsourcing technical content for your DevTool, Infra, or AI Startup, in just 10 seconds.",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
      link: "/tools/roi-cal"
    },
    {
      id: 2,
      title: "Outline Generator by Infrasity",
      description: "Generate clear and tailored content outlines instantly for blogs, landing pages, and UGC scripts — built to simplify and speed up your creative flow.",
      iconColor: "text-pink-500",
      iconBg: "bg-pink-500/10",
      link: "/outline-gen",
    }
  ];

  return (
<div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} p-6`}>
      <div className="max-w-4xl mx-auto">
<h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Discover more Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link href={tool.link}>
            <div
              key={tool.id}
className={`rounded-xl p-6 transition-all duration-300 cursor-pointer group
    ${darkMode 
      ? 'bg-white/10 border border-gray-700 hover:border-gray-600 hover:bg-gray-750' 
      : 'bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-100'}
  `}            >
              <div className={`w-12 h-12 ${tool.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                {tool.id == 1 ?
                <Calculator className={`w-6 ${darkMode ? 'stroke-white' : 'stroke-black'} h-6 ${tool.iconColor}`} /> :
                <svg viewBox="64 64 896 896" focusable="false" data-icon="file-pdf" width="20px" height="20px" fill={darkMode ? '#ffffff' : '#000000'} aria-hidden="true"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"></path></svg>
                }
              </div>
              
<h2
  className={`text-xl font-semibold mb-3 transition-colors group-hover:text-white ${
    darkMode ? 'text-gray-100' : 'text-gray-800 group-hover:text-black'
  }`}
>                {tool.title}
              </h2>
              
<p
  className={`leading-relaxed transition-colors group-hover:text-gray-300 ${
    darkMode ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-800'
  }`}
>                {tool.description}
              </p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}