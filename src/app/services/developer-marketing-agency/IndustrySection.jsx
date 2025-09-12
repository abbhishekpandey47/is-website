import React, { useRef, useState, useEffect} from 'react';
import Link from 'next/link';

const IndustryCard = ({ icon, title, description, href }) => {
  const cardRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        setIsNear(dist <= 200);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Link href={href} className="flex">
      <div
        ref={cardRef}
        className="group flex relative w-full rounded-[20px] md:w-[338px] h-[243px] px-[32px] py-[10px] flex-col justify-center cursor-pointer border border-gray-800"
      >
        <div className="absolute inset-[1px] z-10 rounded-[19px] bg-[#01041A]"></div>

        <div className="relative z-30">
          {icon}
          <h3 className="font-poppins text-white text-[22px] mt-[8px]">{title}</h3>
          <p className="font-inter text-gray-400 mb-[16px]">{description}</p>
        </div>

        <div
          className={`pointer-events-none absolute inset-[1px] z-20 rounded-[20px] transition-opacity duration-300 ease-in-out ${
            isNear ? "opacity-80" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(200px at var(--mouse-x) var(--mouse-y), rgb(38, 38, 38), transparent 100%)",
          }}
        ></div>

        <div
          className={`pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300 ease-in-out ${
            isNear ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(200px at var(--mouse-x) var(--mouse-y), rgb(24, 106, 255), rgb(0, 88, 254), rgb(41, 48, 75) 100%)",
          }}
        ></div>

        <div
          className={`pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300 ease-in-out ${
            isNear ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(50px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2), transparent 100%)",
          }}
        ></div>
      </div>
    </Link>
  );
};


const IndustrySection = () => {
 const [showAll, setShowAll] = React.useState(false);

 return (
 <>
 <div className="max-w-[1400px] min-h-[249px] w-full relative mx-auto overflow-hidden pt-[60px]">
 <div className="w-[300px] absolute left-1/2 top-0 -translate-x-1/2">
 </div>
 <div className="z-[1] relative">
 <div className="mx-[12px] md:mx-auto text-center relative z-[1] max-w-[692px] pt-[110px]">
 <h2 className="font-poppins text-[32px] lg:text-[38px] text-white font-medium mb-[16px]">The SaaS categories we help win</h2>
 <p className="font-inter text-[18px] text-gray-400">See how Infrasity accelerates adoption across different types of developer-first companies.</p>
 </div>
 </div>
 <svg
 width="1394px"
 height="249px"
 viewBox="0 0 1394 249"
 version="1.1"
 xmlns="http://www.w3.org/2000/svg"
 xmlnsXlink="http://www.w3.org/1999/xlink"
 className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1394px] h-[249px] pointer-events-none"
 >
 <defs>
 <radialGradient cx="50%" cy="1.93825922%" fx="50%" fy="1.93825922%" r="127.702729%" gradientTransform="translate(0.5, 0.0194), scale(0.178, 1), rotate(90), scale(1, 1.6357), translate(-0.5, -0.0194)" id="radialGradient-1">
 <stop stopColor="#0058FF" stopOpacity="0.300125656" offset="0%"></stop>
 <stop stopColor="#01041A" stopOpacity="0" offset="100%"></stop>
 </radialGradient>
 <linearGradient x1="100%" y1="4.06824274e-15%" x2="-3.15849007e-15%" y2="4.06824274e-15%" id="linearGradient-2">
 <stop stopColor="#162F6B" stopOpacity="0" offset="0%"></stop>
 <stop stopColor="#0058FF" offset="44.6812478%"></stop>
 <stop stopColor="#FFFFFF" stopOpacity="0.872449162" offset="50.1863504%"></stop>
 <stop stopColor="#0058FF" offset="55.3933599%"></stop>
 <stop stopColor="#162F6B" stopOpacity="0" offset="100%"></stop>
 </linearGradient>
 </defs>
 <g id="homepage" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
 <g transform="translate(-253, -3990)" id="half-circle">
 <g transform="translate(254.2701, 3990.6879)">
 <path d="M1391.45747,247.568307 C1201.64183,92.8035966 959.308602,0 695.299935,0 C431.689818,0 189.689749,92.5236137 0,246.867828 C-1.59417089,246.686561 1391.4757,248.034723 1391.45747,247.568307 Z" id="fill" fill="url(#radialGradient-1)"></path>
 <path d="M1391.45713,247.568307 C1201.64183,92.8035966 959.308602,0 695.299935,0 C431.689818,0 189.689749,92.5236137 0.00274142114,246.867828" id="line" stroke="url(#linearGradient-2)"></path>
 </g>
 </g>
 </g>
 </svg>
 </div>

 <div className="mx-[12px] lg:mx-0 relative">
 <div className="flex flex-col items-center gap-[16px]">
 <div className="flex flex-wrap justify-center gap-[16px] mt-[24px] lg:mt-[40px] max-w-[1400px] mx-auto">
 <IndustryCard 
 icon={<svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <path d="M2.445 2.318a.9.9 0 0 1 .9.9v18.208l18.21.002a.9.9 0 0 1 .888.754l.012.146a.9.9 0 0 1-.9.9H2.445a.9.9 0 0 1-.9-.9V3.218a.9.9 0 0 1 .9-.9zm19.746 5.749a.9.9 0 0 1 0 1.273l-6.415 6.414a.9.9 0 0 1-1.272 0l-4.496-4.495-3.212 3.212a.9.9 0 0 1-1.148.105l-.125-.105a.9.9 0 0 1 0-1.272l3.849-3.85a.9.9 0 0 1 1.273 0l4.495 4.496 5.778-5.778a.9.9 0 0 1 1.273 0z" fill="currentColor" fillRule="nonzero"></path>
 </svg>}
 title="MLOps Platforms"
 description="Helping you win developer trust in a crowded space with hands-on guides, model ops playbooks, and repo-driven adoption."
 href="/industries/financial-services"
 />
 <IndustryCard 
 icon={<svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <g fill="none" fillRule="evenodd">
 <path d="M0 .773h24v24H0z"></path>
 <path d="M22 12.773a10.06 10. 06 0 0 0-20 0h20zM12 12.773v8a2 2 0 1 0 4 0M12 2.773v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
 </g>
 </svg>}
 title="Infrastructure SaaS"
 description="Positioning infra tools where they belong — inside GitHub, docs, and communities — to build credibility with platform teams."
 href="/industries/insurance"
 />
 <IndustryCard 
 icon={<svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <g stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
 <path d="M18 12.773c1.49-1.46 3-3.21 3-5.5a5.5 5.5 0 0 0-5.5-5.5c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2a5.5 5.5 0 0 0-5.5 5.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"></path>
 <path d="M2.22 10.773H8.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>
 </g>
 </svg>}
 title="Observability & DevOps"
 description="Driving adoption with tutorials, benchmarks, and integrations that prove value in real production setups."
 href="/industries/healthcare"
 />
 <IndustryCard 
 icon={<svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <path d="M12 2.29a10.485 10.485 0 0 1 9.635 6.344c.546 1.27.848 2.669.848 4.139 0 5.79-4.693 10.483-10.483 10.483-5.79 0-10.483-4.693-10.483-10.483C1.517 6.983 6.21 2.29 12 2.29zM6.311 6.212l-.008.007a8.678 8.678 0 0 0-2.787 4.695h1.776a2.817 2.817 0 0 1 2.816 2.817v.958c0 .562.456 1.017 1.017 1.017a2.817 2.817 0 0 1 2.817 2.817l-.001 2.933H12c.68 0 1.34-.078 1.975-.226v-3.666a2.817 2.817 0 0 1 2.817-2.816h3.666a8.71 8.71 0 0 0 .225-1.975c0-1.03-.179-2.017-.508-2.934H17.75c-.557 0-1.017.46-1.017 1.017a2.817 2.817 0 0 1-5.633 0c0-.561-.455-1.016-1.017-1.016a3.775 3.775 0 0 1-3.772-3.628zm-2.994 6.56a8.686 8.686 0 0 0 6.824 8.485v-2.734c0-.562-.454-1.017-1.016-1.017a2.817 2.817 0 0 1-2.817-2.817v-.958c0-.561-.455-1.017-1.016-1.017H3.317v.059zm13.475 3.776c-.562 0-1.017.455-1.017 1.016v3.03a8.719 8.719 0 0 0 4.046-4.045l-3.03-.001zM12 4.09c-1.4 0-2.72.33-3.891.918v1.057c0 1.09.884 1.975 1.974 1.975a2.817 2.817 0 0 1 2.817 2.816 1.017 1.017 0 1 0 2.033 0A2.822 2.822 0 0 1 17.75 8.04l1.53-.001A8.676 8.676 0 0 0 12 4.089z" fill="currentColor" fillRule="nonzero"></path>
 </svg>}
 title="AI Infra & Agentic Tools"
 description="Building technical narratives that explain complex agent workflows in a way developers can run and trust."
 href="/industries/travel"
 />
 <div className={`${showAll ? '' : ''}`}>
 <IndustryCard 
 icon={<svg width="22" height="15" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <g transform="translate(1 1.773)" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
 <path d="M17 10h2c.6 0 1-.4 1-1V6c0-.9-.7-1.7-1.5-1.9C16.7 3.6 14 3 14 3S12.7 1.6 11.8.7C11.3.3 10.7 0 10 0H3c-.6 0-1.1.4-1.4.9L.2 3.8A3.7 3.7 0 0 0 0 5v4c0 .6.4 1 1 1h2"></path>
 <circle cx="5" cy="10" r="2"></circle>
 <path d="M7 10h6"></path>
 <circle cx="15" cy="10" r="2"></circle>
 </g>
 </svg>}
 title="API-first SaaS"
 description="From SDKs to migration guides, we craft the artifacts that get your API adopted across ecosystems."
 href="/industries/automotive"
 />
 </div>
 <div className={`${showAll ? '' : ''}`}>
 <IndustryCard 
 icon={<svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
 <g transform="translate(-636, -4508)">
 <g transform="translate(250, 3882.1249)">
 <g transform="translate(0, 315.6479)">
 <g transform="translate(354, 266)">
 <g transform="translate(32, 45)">
 <rect x="0" y="0" width="24" height="24"></rect>
 <rect stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x="4" y="4" width="16" height="16" rx="2"></rect>
 <rect stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x="9" y="9" width="6" height="6" rx="1"></rect>
 <line x1="15" y1="2" x2="15" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="15" y1="20" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="2" y1="15" x2="4" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="2" y1="9" x2="4" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="20" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="20" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="9" y1="2" x2="9" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 <line x1="9" y1="20" x2="9" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
 </g>
 </g>
 </g>
 </g>
 </g>
 </g>
 </svg>}
 title="YC & Early-Stage Startups"
 description="We act as your extended devrel team — shipping community presence, GTM content, and adoption signals from day one."
 href="/industries/iot"
 />
 </div>
 <div className={`${showAll ? '' : 'hidden'}`}>
 <IndustryCard 
 icon={<svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <g transform="translate(0 .773)" fill="none" fillRule="evenodd">
 <path d="M0 0h24v24H0z"></path>
 <circle stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cx="18.5" cy="17" r="3.5"></circle>
 <circle stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cx="5.5" cy="17" r="3.5"></circle>
 <circle stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cx="15" cy="4.5" r="1"></circle>
 <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17v-3.5l-3-3 4-3 2 3h2"></path>
 </g>
 </svg>}
 title="Sports-Tech"
 description="Lead the field with transformative sports-tech solutions that keep users engaged and experiences elevated."
 href="/industries/sports-tech"
 />
 </div>
 <div className={`${showAll ? '' : 'hidden'}`}>
 <IndustryCard 
 icon={<svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
 <g transform="translate(0 .773)" fill="none" fillRule="evenodd">
 <path d="M0 0h24v24H0z"></path>
 <rect stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x="1.993" y="6" width="7" height="12" rx="1"></rect>
 <path d="M12.993 8.32a7.43 7.43 0 0 1 0 7.36M16.453 6.21a11.76 11.76 0 0 1 0 11.58M19.903 4.1a15.91 15.91 0 0 1 .01 15.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
 </g>
 </svg>}
 title="Telecommunications"
 description="Elevate global connections with secure, scalable platforms that make staying in touch simpler than ever."
 href="/industries/telecommunications"
 />
 </div>
 </div>
 </div>
 </div>
 </>
 );
};

export default IndustrySection;