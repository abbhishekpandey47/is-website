import Image from 'next/image';
import React, { useState } from 'react';

const Video = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedSpokesperson, setSelectedSpokesperson] = useState(null);

  const videoId = "0AsyeSd1_kQ";

  const sets = [
    { id: 1, name: "Gradient Studio" , image:"/video-page/i1.JPG",},
    { id: 2, name: "Purple Ambiance", image:"/video-page/i2.JPG",},
    { id: 3, name: "Green Workspace", image:"/video-page/i3.JPG",},
    { id: 4, name: "Green Workspace", image:"/video-page/i6.JPG",},
    { id: 5, name: "Warm Office", image:"/video-page/i4.JPG",},
    { id: 6, name: "Green Workspace", image:"/video-page/i5.JPG",}
  ];

  const spokespersons = [
    { id: 1, name: "Professional Male", image:"/video-page/t1.JPG", },
    { id: 2, name: "Friendly Female", image:"/video-page/t2.JPG"},
    { id: 3, name: "Casual Male", image:"/video-page/t3.JPG"},
    { id: 4, name: "Corporate Female", image:"/video-page/t4.png" }
  ];
  
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="none" className="w-12 h-12">
      <path d="M46 25.2551L29.6471 20.1775L43.2262 9.97392L27.3385 16.2941L30.988 0L23 14.7602L15.012 0L18.6615 16.2941L2.77381 9.97392L16.3529 20.1775L0 25.2551L17.1548 24.5938L7.98755 38.6927L20.6914 27.4767L23 44L25.3086 27.4767L38.0125 38.6927L28.8452 24.5938L46 25.2551Z" fill="#FFBA08" />
    </svg>
  );
  
  return (
    <div className="bg-black flex justify-center items-center text-white p-8 pt-20">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <div className="flex items-center justify-center text-center max-w-5xl mx-auto relative z-10 mb-20">
          <div>
            <div className="absolute -top-10 -right-10 md:-top-16 md:-right-36 lg:-top-10 lg:right-40">
              <StarIcon />
            </div>

            <h1 className="font-termina text-2xl md:text-[35px] font-medium leading-tight mb-6">
              The video marketing team{' '}
              <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent text-glow-yellow">you</span>
              <br />
              <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent text-glow-yellow">didn't have to hire.</span>
            </h1>

            <p className="max-w-2xl text-center text-lg md:text-[17px] font-medium text-[#ffffff80] leading-relaxed tracking-wide">
              We have the actors, sets, cinematographers, editors and designers that will
              bring your videos to life.{' '}
              <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">Need it yesterday? We're here.</span>
            </p>
          </div>
        </div>

        {/* Step 1 - Customize the set */}
       <div className="mb-10">
  <div className="flex gap-20">
    <div className="flex-shrink-0">
      <div className="w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
        1
      </div>
    </div>
    
    <div className="flex-1">
      <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Customize the set.</h2>
      <div className="mb-6">
        <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
          Choose one of our predefined sets or get something completely custom.
        </p>
        <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
          You name it, we'll design it.
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
          <div className="flex gap-20 mb-8">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                2
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Choose your spokesperson.</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  7+ actors you can choose from.
                </p>
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  We are constantly adding new options for you.
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
          <div className="flex gap-20 mb-8">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                3
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Choose your spokesperson.</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                 We take care of the script, screen recordings, stock footage, graphics, sound, and animations.
                </p>
              </div>
            </div>
          </div>
        </div>

                <div className='bg-[#27252a] w-full h-[1px] my-10'></div>


         <div className="mb-10">
          <div className="flex gap-20 mb-8">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                4
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Post-Production and Revisions</h2>
            </div>
          </div>
        </div>

         <div className='bg-[#27252a] w-full h-[1px] my-10'></div>


         <div className="mb-10">
          <div className="flex gap-20 mb-8">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                5
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Your first draft is ready in      {" "}        <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">under 10 days!</span>
</h2>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default Video;