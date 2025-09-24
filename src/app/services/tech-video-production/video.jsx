"use client";

import CalendarBooking from "../../calendarButton.jsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react"

const Video = () => {
  const [isHovered, setIsHovered] = useState(false); 
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const sets = [
    { id: 7, name: "Warm Workspace", image: "/video-page/i7.JPG", },
    { id: 2, name: "Purple Ambiance", image: "/video-page/i2.JPG", },
    { id: 3, name: "Green Workspace", image: "/video-page/i3.JPG", },
    { id: 1, name: "Gradient Studio", image: "/video-page/i1.JPG", },
    { id: 4, name: "Green Workspace", image: "/video-page/i6.JPG", },
    { id: 5, name: "Warm Office", image: "/video-page/i4.JPG", },
    { id: 6, name: "Green Workspace", image: "/video-page/i5.JPG", },
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % sets.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [sets.length, isHovered]); 


  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedImage]);

  const spokespersons = [
    { id: 4, name: "Casual Male", image: "/video-page/t3.jpg", link: "https://www.youtube.com/watch?v=oqe_jFQFHFo" },
    { id: 1, name: "Professional Male", image: "/video-page/t1.jpg" },
    { id: 3, name: "Corporate Female", image: "/video-page/t4.png" },
    { id: 2, name: "Friendly Female", image: "/video-page/t2.jpg", link: "https://www.youtube.com/watch?v=0AsyeSd1_kQ" }
  ];

  return (
    <div className="flex justify-center items-center text-white p-8 ">
      <div className="max-w-7xl w-full">
        {/* Header  */}
        <div className="flex items-center justify-center text-center max-w-5xl mx-auto relative z-10 mb-20">
          <div>
            <h1 className="font-[quicksand] font-bold text-2xl md:text-[35px] leading-tight mb-6">
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

        <div className="mb-10">
          <div className="md:flex md:gap-20">
            <div className="flex-shrink-0">
              <div className="mb-6 w-14 h-14 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                1
              </div>
            </div>

            <div className="flex-1">
              <h2 className="font-[quicksand] font-bold text-2xl md:text-[35px] mb-4"> Sets & backgrounds of your choice.</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  Choose from 50+ customized sets or get something completely custom.
                </p>
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  Theme completely alligned with your brand tone.
                </p>
              </div>

              <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-4"
          animate={{
            x: `-${index * (200 + 16)}px`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            mass: 0.7,
          }}
          style={{
            width: `${sets.length * (200 + 16)}px`,
          }}
        >
          {sets.map((set, i) => {
            const isActive = i === index;
            return (
              <motion.div
                key={set.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer min-w-[100px] flex-shrink-0"
                animate={{
                  scale: isActive ? 1.1 : 0.9,
                  opacity: isActive ? 1 : 0.7,
                  filter: isActive ? "brightness(1)" : "brightness(0.8)",
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onClick={() => setSelectedImage(set)} 
                whileHover={{
                  scale: isActive ? 1.15 : 0.95,
                  transition: { duration: 0.15 },
                }}
              >
                <div className="aspect-video relative">
                  <Image
                    src={set.image}
                    alt={set.name}
                    className="w-full h-full object-cover"
                    height={112}
                    width={200}
                    priority={i <= 2}
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-200" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 🔹 Fullscreen  */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
          >
            <Image
              src={selectedImage.image}
              alt={selectedImage.name}
              className="w-full h-auto object-contain"
              width={1200}
              height={800}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black hover:bg-gray-800/90 rounded-full p-2"
            >
              <X className="h-4 w-4 font-extrabold" />
            </button>
          </motion.div>
        </div>
      )}
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
              <h2 className="font-[quicksand] font-bold text-2xl md:text-[35px] mb-4">Developer advocates with years of experience in video creation.</h2>
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
  <div className="aspect-video">
  {spokesperson.link ? (
    <a href={spokesperson.link} target="_blank" rel="noopener noreferrer">
      <Image
        src={spokesperson.image}
        alt={spokesperson.name}
        className="w-full h-full object-cover"
        height={200}
        width={200}
      />
    </a>
  ) : (
    <Image
      src={spokesperson.image}
      alt={spokesperson.name}
      className="w-full h-full object-cover"
      height={200}
      width={200}
    />
  )}
</div>
</div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#27252a] w-full h-[1px] my-10'></div>

        {/* Step 3 - Script Creation */}
        <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                3
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-[quicksand] text-2xl md:text-[35px] font-bold mb-4">Get the Script Created for Your Tech Video Production.</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  Our team of developers, copywriters, SEO & editors takes care of the script, screen recordings, stock footage, graphics, sound, and animations. Timebound? Try our Script Generator to get your desired script in minutes!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#27252a] w-full h-[1px] my-10'></div>

        {/* Step 4 - Post-Production */}
        <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                4
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-[quicksand] text-2xl md:text-[35px] font-bold mb-4">Post-Production and Revisions</h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  Once the initial draft is ready, will share you within 4 business days and would be open for as many edits as per your choice.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#27252a] w-full h-[1px] my-10'></div>

        {/* Step 5 - Final Delivery */}
        <div className="mb-10">
          <div className="md:flex md:gap-20">
            {/* Left Column - Number */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 mb-6 bg-[#1f1c25] rounded-lg flex items-center justify-center text-xl font-bold">
                5
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-[quicksand] text-2xl md:text-[35px] font-bold mb-4">Your first draft is ready in{" "}<span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">less than 7 days!</span>
              </h2>
              <div className="mb-6">
                <p className="text-[#ffffff80] font-semibold tracking-wide text-lg">
                  Growth teams at some of the fastest-growing AI & B2B SaaS companies like Kubiya.ai, Qodo (earlier Codium), Devzero, Firefly.ai, Aviator trust us with their tech product videos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <CalendarBooking buttonText="Get Started" />
        </div>
      </div>
    </div>
  );
};

export default Video;