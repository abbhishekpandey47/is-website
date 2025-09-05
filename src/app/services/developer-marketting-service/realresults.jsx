// app/components/CaseStudiesSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { FileText, Layout, Video } from 'lucide-react/dist/cjs/lucide-react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
});

// Case study data
const caseStudies = [
  {
    id: 'back-market',
    href: '/services/tech-video-production',
    logo: 'https://framerusercontent.com/images/fL7fpMcAbk9CemZ1CkadfWS84L8.png',
    logoAlt: 'Back Market Logo',
    title: 'Engaging product explainers and demos that simplify complex SaaS features.',
    personName: 'One of Back Market\'s',
    personRole: 'DevOps Engineers',
    icon: <Video className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 'contra',
    href: '/services/technical-writing-services',
    logo: 'https://framerusercontent.com/images/HDo6WR9KUHx595FKclTY6WMWM.png',
    logoAlt: 'Contra Logo',
    title: 'Clear, developer-focused docs and guides that speed up adoption.',
    personName: 'Doug Schlenker',
    personRole: 'VP of Engineering',
     icon: <FileText className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'luminar',
    href: '/services/webflow-agency',
    logo: 'https://framerusercontent.com/images/AmIZfk7Uwc2ATo35ixS9KzfgpM.png',
    logoAlt: 'Luminar Logo',
    title: 'Custom Webflow sites designed for SaaS conversion and scalability.',
    personName: 'Florian Berchtold',
    personRole: 'Software Engineer',
    icon: <Layout className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 'prophesee',
    href: '/services/reddit-marketing-agency',
    logo: '/landingfolio/reddita.svg',
    logoAlt: 'Prophesee Logo',
    title: 'Authentic engagement in dev communities to build credibility and trust.',
    personName: 'Julien Thierry',
    personRole: 'Software Engineer',
  },
];


function CaseStudyCard({ study }) {
  return (
    <Link
      href={study.href}
      className="group block border border-gray-700/50 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 relative"
    >
      <div className="p-6 flex flex-col ">
        {/* Logo */}
      <div className="h-4 mb-4 flex items-center">
  {study.icon ? (
    <div className="w-6 h-6 text-white">{study.icon}</div>
  ) : (
    <Image
      src={study.logo}
      alt={study.logoAlt || "Logo"}
      width={30}
      height={100}
      className="object-contain"
    />
  )}
</div>


        {/* Title */}
        <p className="text-xl h-36 font-medium text-white mb-4 group-hover:text-purple-800 transition-colors duration-300">
          {study.title}
        </p>
                <div className="opacity-0 group-hover:opacity-100 h-px bg-white/20 mb-4 group-hover:bg-blue-400/30 transition-colors duration-300"></div>

        <span className="opacity-0 group-hover:opacity-100 mb-6 text-gray-400 text-sm font-medium flex items-center">
          Read story
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-4 h-4 ml-2"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>

        {/* Separator */}

        {/* Person Info */}
              </div>

      {/* Read Story Text and Arrow - Shows on Hover */}
      <div className="absolute top-4 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">        
        <div className="bg-gray-700 rounded-full p-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 256 256" 
            className="w-4 h-4 fill-white"
          >
            <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
          </svg>
        </div>
      </div>


      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </Link>
  );
}

// Main Component
export default function RealResult() {
  return (
    <section
      className={`${inter.className} border border-gray-700/30 py-16 px-4 md:px-8 lg:px-16`}
      id="case-study-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight text-left bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Real teams, real results
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl font-medium leading-relaxed tracking-tight text-gray-400 text-left">
          Engineering teams we helped merge faster, safer, and cheaper
        </p>
      </div>

      <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}