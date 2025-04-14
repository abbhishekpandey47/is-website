import { useState, useEffect } from 'react';

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const timelineData = [
    {
      date: "Q1, 2024",
      title: "Launched with 2 infra startups with focus on technical blogs."
    },
    {
      date: "Q2, 2024",
      title: "Won YC-backed clients like DevZero & Kubiya.ai, expanded into DevRel and use case guides"
    },
    {
      date: "Q3, 2024",
      title: "Scaled to 10+ customers, added videos, SDK demos, and SEO playbooks."
    },
    {
      date: "Q4, 2023",
      title: "Partnered with top Terraform automation startups like Env0, Terrateam, and Firefly for docs, videos, and GTM."
    },
    {
      date: "TODAY",
      title: "Serving 25+ AI, Infra & Security startups globally with content, DevRel, and GTM support."
    }
  ];

  return (
    <div className="bg-[#0d0a1a] text-gray-200 p-6 rounded-lg px-14">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-6 h-6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M200,164a36.07,36.07,0,0,0-33.94,24H72a28,28,0,0,1,0-56h96a44,44,0,0,0,0-88H72a12,12,0,0,0,0,24h96a20,20,0,0,1,0,40H72a52,52,0,0,0,0,104h94.06A36,36,0,1,0,200,164Zm0,48a12,12,0,1,1,12-12A12,12,0,0,1,200,212Z"></path></svg>
        </div>
        <span className="text-lg font-medium">Timeline</span>
      </div>
      <div className="flex items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">Our journey so far</h2>
      </div>

      <p className="text-lg text-gray-400 mb-8 flex items-center justify-center">From developer blogs to GTM engines for DevTools startups.</p>

      {isMobile ? (
        <div className="relative pl-6">
          <div className="absolute top-0 left-6 w-1 h-full bg-gray-700 transform -translate-x-1/2"></div>
          
          {timelineData.map((item, index) => (
            <div key={index} className="mb-10 relative">
              <div className="absolute top-0 left-0 w-6 h-6 bg-gray-800 rounded-full border-2 border-[#1966ff] transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#1966ff] rounded-full"></div>
              </div>
              
              <div className="ml-4">
                <p className="text-gray-400 text-sm mb-1">{item.date}</p>
                <p className="font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-3 left-0 right-0 h-1 bg-gray-700 ml-4"></div>

          <div className="flex justify-between relative mb-12">
            {timelineData.map((item, index) => (
              <div key={index} className="flex flex-col w-1/5">
                <div className="w-6 h-6 bg-gray-800 rounded-full border-[2px] border-[#1966ff] mb-6 z-10 flex items-center justify-center self-start">
                  <div className="w-2.5 h-2.5 bg-[#1966ff] rounded-full"></div>
                </div>
                
                <div className="text-left mr-4">
                  <p className="text-gray-400 mb-2">{item.date}</p>
                  <p className="font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}