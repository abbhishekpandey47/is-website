import Image from 'next/image';
import React, { useState } from 'react';

const Video = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedSpokesperson, setSelectedSpokesperson] = useState(null);

  const videoId = "0AsyeSd1_kQ";

  const sets = [
   
    { id: 2, name: "Purple Ambiance", image:"/video-page/i2.JPG",},
    { id: 3, name: "Green Workspace", image:"/video-page/i3.JPG",},
    { id: 1, name: "Gradient Studio" , image:"/video-page/i1.JPG",},
    { id: 4, name: "Green Workspace", image:"/video-page/i6.JPG",},
    { id: 5, name: "Warm Office", image:"/video-page/i4.JPG",},
    { id: 6, name: "Green Workspace", image:"/video-page/i5.JPG",}
  ];

  const spokespersons = [
    { id: 4, name: "Casual Male", image:"/video-page/t3.jpg"},
    { id: 1, name: "Professional Male", image:"/video-page/t1.jpg", },
    { id: 3, name: "Corporate Female", image:"/video-page/t4.png" },
    { id: 2, name: "Friendly Female", image:"/video-page/t2.jpg"}
  ];
  
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="none" className="w-12 h-12">
      <path d="M46 25.2551L29.6471 20.1775L43.2262 9.97392L27.3385 16.2941L30.988 0L23 14.7602L15.012 0L18.6615 16.2941L2.77381 9.97392L16.3529 20.1775L0 25.2551L17.1548 24.5938L7.98755 38.6927L20.6914 27.4767L23 44L25.3086 27.4767L38.0125 38.6927L28.8452 24.5938L46 25.2551Z" fill="#FFBA08" />
    </svg>
  );
  
  return (
    <div className="flex justify-center items-center text-white p-8 ">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <div className="flex items-center justify-center text-center max-w-5xl mx-auto relative z-10 mb-20">
          <div>
            <h1 className="font-termina text-2xl md:text-[35px] font-medium leading-tight mb-6">
              Those product explainer videos you {' '}
              <br />
              <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent text-glow-yellow">always wanted to publish.</span>
            </h1>

            <p className="max-w-2xl text-center text-lg md:text-[17px] font-medium text-[#ffffff80] leading-relaxed tracking-wide">
               We have the developer advocates, sets, cinematographers, editors and designers that will
create your product explainer videos.{' '}
              <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent"><br /> Get your first video recorded, edited, published in less than 7 days.</span>
            </p>
          </div>
        </div>

        {/* Step 1 - Customize the set */}
       <div className="mb-10">
  <div className="md:flex md:gap-20">
    <div className="flex-shrink-0">
      <div className="mb-6 w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
        1
      </div>
    </div>
    
    <div className="flex-1">
      <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4"> Sets & backgrounds of your choice.</h2>
      <div className="mb-6">
        <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
          Choose from 50+ customized sets or get something completely custom.
        </p>
        <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
          Theme completely alligned with your brand tone.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex flex-nowrap gap-6">
          {sets.map((set) => (
            <div
              key={set.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 min-w-[200px] flex-shrink-0"
            >
              <div className="aspect-video">
                <Image
                  src={set.image}
                  className="w-full h-full object-cover"
                  height={200}
                  width={200}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
        <div className='bg-[#27252a] w-full h-[1px] my-10'></div>

        {/* Step 2 - Choose your spokesperson */}
        <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                2
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Developer advocates with years of experience in video creation.</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  10+ developer advocates you can collaborate with.
                </p>
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  Not in the list? reach out to us and we might connect with the right persona.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {spokespersons.map((spokesperson) => (
                  <div
                    key={spokesperson.id}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105`}
                  >
                    <div className="aspect-video">
                       <Image
                  src={spokesperson.image}
                  className="w-full h-full object-cover"
                  height={200}
                  width={200}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#27252a] w-full h-[1px] my-10'></div>

        {/* Step 2 - Choose your spokesperson */}
        <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                3
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Get the script created.</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                 Our team of developers, copy writers, SEO & editors takes care of the script, screen recordings, stock footage, graphics, sound, and animations.
                </p>
              </div>
            </div>
          </div>
        </div>

                <div className='bg-[#27252a] w-full h-[1px] my-10'></div>


         <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                4
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Post-Production and Revisions</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                 Once the initial draft is ready, will share you within 4 business days and would be open for as many edits as per your choice.
                </p>
              </div>
            </div>
          </div>
        </div>

         <div className='bg-[#27252a] w-full h-[1px] my-10'></div>


         <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                5
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Your first draft is ready in{" "}<span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">less than 7 days!</span>
</h2>
<div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                 Growth teams at some of the fastest growing AI & B2B SaaS companies like Kubiya.ai, Qodo(earlier Codium), Devzero, Firefly.ai, Aviator trust us with their product explainer videos.
                </p>
              </div>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default Video;