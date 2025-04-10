import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        <div className="bg-green-100 p-6 rounded-lg relative">
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
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 left-2 mr-40 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-blue-500"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-blue-500"
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

      {/* Call to action button */}
      <button className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded">
        Schedule a call
      </button>
    </div>
  );
}