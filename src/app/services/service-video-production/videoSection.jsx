import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookDemo from './bookDemo';
import CalendlyButton from './calendlyButton';

export default function YouTubeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Create an array of video IDs
  // First video: ICUGIdqzmYg
  // Second video: D7_ipDqhtwk
  const videoIds = [
    "ICUGIdqzmYg",
    "D7_ipDqhtwk",
    "ICUGIdqzmYg",
    "D7_ipDqhtwk",
    "ICUGIdqzmYg"
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === videoIds.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videoIds.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // For the second video, add start time parameter (55 seconds)
  const getEmbedUrl = (videoId, index) => {
    if (videoId === "D7_ipDqhtwk") {
      return `https://www.youtube.com/embed/${videoId}?rel=0&start=55`;
    }
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Check out our Youtube Ads</h1>

      <div className="relative w-full">
        {/* Main carousel container with mint green background */}
          <div className="relative aspect-video w-full">
            <iframe 
              className="w-full h-full"
              src={getEmbedUrl(videoIds[currentSlide], currentSlide)}
              title={`YouTube video player ${currentSlide + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            {/* Attest caption at bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              With Attest's consumer research platform
            </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 md:left-2 sm:left-2 lg:-left-16 -translate-y-1/2 bg-black hover:bg-gray-800 rounded-full p-2 shadow-lg text-white"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-2 md:right-2 lg:-right-16 -translate-y-1/2 bg-black hover:bg-gray-800 rounded-full p-2 shadow-lg text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex space-x-2 mt-4">
        {videoIds.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index ? 'bg-blue-500' : 'bg-blue-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className='mt-5'>
      < CalendlyButton />
      </div>
    </div>
  );
}