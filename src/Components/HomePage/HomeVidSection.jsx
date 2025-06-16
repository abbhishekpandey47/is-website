import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Play } from 'lucide-react';
import YouTubeLogo from '../../../public/svgPatterns/youTube';

gsap.registerPlugin(ScrollTrigger);

const HomeVidSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoId = 'ICUGIdqzmYg'; 
  
  useEffect(() => {
    gsap.fromTo(".howWorksHead", {
      opacity: 0,
      y: 55,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".howWorksHead",
        toggleActions: "restart none none none"
      }
    });

    gsap.fromTo(".howWorksVidSection", {
      opacity: 0,
      y: 55,
      scale: 1.3
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scale: 1,
      scrollTrigger: {
        trigger: ".howWorksVidSection",
        scrub: 1,
        toggleActions: "restart none none none"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="mt-10">
      <div className="relative">
        <div className='w-full howWorksHead sm:mb-28 mb-10'>
          <div className="whyinfra"></div>
          <div className='xs:px-5 sm:px-10 lg:px-20'>
            <h2 className="text-white text-center max-xs:text-3xl max-sm:text-4xl text-[3em] font-bold pt-10 whyInfraUpperHead">
              On-demand <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">technical videos</span> recorded by engineers
            </h2>
          </div>
          <div className="flex justify-center whyInfraUpperHead">
            <p className="text-center text-yellow-100 pt-5 w-2/3 font-semibold max-lg:w-3/4">
              Get on-demand technical videos and content created by engineers, tailored to showcase your products key features.
            </p>
          </div>
        </div>
      </div>
      
      <div className='flex justify-center'>
        <div className='relative howWorksVidSection'>
          {!isVideoLoaded ? (
            <div 
              className='relative cursor-pointer group rounded-[20px] overflow-hidden shadow-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200 p-[2px]'
              onClick={handlePlayClick}
            >
              <div className='relative rounded-[18px] overflow-hidden'>
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className='w-[950px] h-[525px] max-md:w-[630px] max-md:h-[359px] max-sm:w-[350px] max-sm:h-[181px] max-lg:w-[760px] max-lg:h-[439px] object-cover transition-transform duration-300 group-hover:scale-105'
                />
                
                <div className='absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300'></div>
                
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='bg-red-600 hover:bg-red-700 rounded-xl p-3 max-sm:p-2 transition-all duration-300 group-hover:scale-110 shadow-2xl'>
                    <Play 
                      className='w-8 h-4 max-sm:w-8 max-sm:h-8 text-white ml-1' 
                      fill="white"
                    />
                  </div>
                </div>
                
                <div className='absolute top-4 right-4 px-3 py-1 rounded text-white text-sm font-bold'>
                  <YouTubeLogo />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              className='rounded-[20px] max-md:w-[630px] max-md:h-[359px] max-sm:w-[350px] max-sm:h-[181px] max-lg:w-[760px] max-lg:h-[439px] shadow-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200 p-[2px]'
              width="950"
              height="550"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )}
          
          <div className='left-[30px] top-[-60px] bg-[#101010] text-white font-semibold rounded-[35px] border-2 border-[#242424] absolute max-sm:text-[0.6em] w-[300px] p-6 max-sm:p-4 max-sm:hidden'>
            <div>
              <TypeAnimation
                sequence={[
                  "Scale your video marketing with developer-focused content that highlights your SaaS product's key features.",
                  1000,
                  "-By Shan",
                  100
                ]}
                style={{ fontSize: '1em' }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeVidSection;