"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ComingSoon({ title="Coming Soon", description="We're crafting something amazing here. Stay tuned!", backHref="/threadflow" }) {
  const [dots, setDots] = useState('');
  useEffect(()=>{
    const id = setInterval(()=> setDots(d=> d.length>=3 ? '' : d + '.'), 600);
    return ()=> clearInterval(id);
  },[]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <div className="relative flex items-center justify-center mb-10">
        <div className="animate-bounce text-blue-600 dark:text-blue-400 text-[110px] font-bold mr-4 select-none">✨</div>
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-blue-600/40 dark:border-blue-400/30 animate-ping" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l3 3" />
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            </svg>
          </div>
        </div>
        <div className="animate-bounce text-blue-600 dark:text-blue-400 text-[110px] font-bold ml-4 select-none">🚀</div>
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mb-8">
        {description} <span className="inline-block w-10 text-left">{dots}</span>
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href={backHref} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors text-sm font-medium">
          Back to Dashboard
        </Link>
        <Link href="/" className="bg-gray-800/60 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors text-sm font-medium">
          Home
        </Link>
      </div>
  {/* Footer placeholder removed per request */}
    </div>
  );
}
