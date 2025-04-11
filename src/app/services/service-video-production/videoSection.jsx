import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookDemo from './bookDemo';
import CalendlyButton from './calendlyButton';

export default function TabbedYouTubeCarousel() {
  const [activeTab, setActiveTab] = useState("allCategories");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define video collections for each tab
  const videoCollections = {
    allCategories: [
      "XmUB8JXa4hI",
      "Uf6cfVWt0-0",
      "erczPxh8iGc",
      "xPyKqcdt3TY",
      "GTMEKQIM84I",
      "HC3ijBbNOow",
      "Yfv2iTyWGd0",
      "R7pkdg6wcAY",
    ],
    Editorials: [
      "XmUB8JXa4hI",
      "Uf6cfVWt0-0",
      "erczPxh8iGc",
    ],
    Podcasts: [
      "xPyKqcdt3TY",
      "GTMEKQIM84I",
      "HC3ijBbNOow",
      "Yfv2iTyWGd0",
      "R7pkdg6wcAY",
    ]
  };

  // Get the current videos based on active tab
  const currentVideos = videoCollections[activeTab];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === currentVideos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? currentVideos.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    setCurrentSlide(0); // Reset to first slide when changing tabs
  };

  // For the second video, add start time parameter (55 seconds)
  const getEmbedUrl = (videoId) => {
    if (videoId === "D7_ipDqhtwk") {
      return `https://www.youtube.com/embed/${videoId}?rel=0&start=55`;
    }
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  };

  // Tab definitions
  const tabs = [
    { id: "allCategories", label: "All Categories" },
    { id: "Editorials", label: "Editorials" },
    { id: "Podcasts", label: "Podcasts" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Check out our YouTube Content</h1>
      
      {/* Tab Navigation */}
      <div className="w-full max-w-lg mb-6 rounded-full bg-gray-900 p-2 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
              activeTab === tab.id 
                ? 'bg-yellow-50 text-gray-900 font-medium' 
                : 'text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full">
        {/* Main carousel container */}
        <div className="relative aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(currentVideos[currentSlide])}
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
        {currentVideos.map((_, index) => (
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

      <div className="mt-5">
        <CalendlyButton />
      </div>
    </div>
  );
}