import React from 'react';
import { Zap } from 'lucide-react';


const BookDemo = () => {
  return (
    <div className='w-[87%]  magic-button transition-all duration-300 mt-10 bg-[linear-gradient(to_right,#1966ff,#d129ff,#8c1eff)] p-[2px] rounded-lg flex justify-center items-center'>
         <section className=" w-full bg-[#0D0A1A] relative  rounded-lg shadow-lg min-h-[60vh] md:min-h-[60vh] lg:min-h-[50vh] overflow-hidden ">
      {/* 3D Grid overlay */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        {/* Horizontal grid lines with perspective */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={`grid-horizontal-${i}`} 
              className="absolute h-px w-full"
              style={{ 
                top: `${(i + 1) * 12.5}%`, 
                transform: `translateZ(${i * 5}px) rotateX(85deg)`,
                background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.01), rgba(139, 92, 246, 0.1) 50%, rgba(139, 92, 246, 0.01))'
              }}
            />
          ))}
          
          {/* Vertical grid lines with perspective */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={`grid-vertical-${i}`} 
              className="absolute w-px h-full"
              style={{ 
                left: `${(i + 1) * 8.33}%`, 
                transform: `translateZ(${i * 3}px) rotateY(5deg)`,
                background: 'linear-gradient(0deg, rgba(139, 92, 246, 0.01), rgba(139, 92, 246, 0.1) 50%, rgba(139, 92, 246, 0.01))'
              }}
            />
          ))}
        </div>
      </div>

      {/* Stars */}
      <Stars />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <h1 className="text-4xl text-purple sm:text-4xl md:text-4xl quicksand-bold text-center mb-4">
        Trusted by fastest growing B2B SaaS Startups.
        </h1>
        <p className="text-lg md:text-xl quicksand-medium text-gray text-center max-w-2xl mb-8">
        Trusted by YC startups. Built for developer-first companies.
        </p>
        <a href="https://calendly.com/meet-shan" target='_blank'>
        <button className="magic-button group rounded-md px-6 py-3 text-white font-medium text-lg transition-all duration-300 hover:scale-105 ">
      <div className="flex items-center space-x-2">
        <Zap className="h-5 w-5 transition-transform group-hover:rotate-12" />
        <span className='quicksand-medium'>Book Demo</span>
      </div>
    </button>
        </a>
       
      </div>
    </section>
    </div>
   
  );
};

const Stars = () => {
  // Generate random positions for the stars
  const smallStars = Array.from({ length: 100 }).map((_, i) => ({
    id: `small-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation: i % 3 === 0 ? 'animate-float' : i % 3 === 1 ? 'animate-float-delay-1' : 'animate-float-delay-2'
  }));

  const mediumStars = Array.from({ length: 30 }).map((_, i) => ({
    id: `medium-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation: i % 3 === 0 ? 'animate-float' : i % 3 === 1 ? 'animate-float-delay-1' : 'animate-float-delay-2'
  }));

  const largeStars = Array.from({ length: 15 }).map((_, i) => ({
    id: `large-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation: i % 3 === 0 ? 'animate-pulse-slow' : i % 3 === 1 ? 'animate-float-delay-1' : 'animate-scale-slow'
  }));

  return (
    <div className="absolute inset-0 z-0">
      {smallStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-small ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
      {mediumStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-medium ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
      {largeStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-large ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
    </div>
  );
};

export default BookDemo;