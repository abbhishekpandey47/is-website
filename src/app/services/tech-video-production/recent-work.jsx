import React, { useState } from 'react';
import { X, Volume2, Maximize2 } from 'lucide-react';
import Image from 'next/image';

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "VIDEODECK",
      subtitle: "B2B VIDEO PRODUCTION AGENCY",
      category: "Presentation Videos",
      videoId: "pQoP_Rndpqw",
      image: "/video-page/t1.JPG",
      description: "We shoot and edit educational video content for leading tech companies",
      services: [
        "Script writing",
        "Graphics and animations", 
        "Storyboard",
        "Sound design",
        "Project management",
        "Studio production (Spokesperson)"
      ],
      estimatedCost: "Starting at $1800",
      deliveryTime: "5 days"
    },
    {
      id: 2,
      title: "VIDEODECK & FOXIT",
      subtitle: "Product Videos",
      category: "Tutorials",
      videoId: "pQoP_Rndpqw",
      image: "/video-page/t2.JPG",
      description: "We shoot and edit educational video content for leading tech companies",
      services: [
        "Script writing",
        "Graphics and animations",
        "Storyboard", 
        "Sound design",
        "Project management",
        "Studio production (Spokesperson)"
      ],
      estimatedCost: "Starting at $1800",
      deliveryTime: "5 days"
    },
    {
      id: 3,
      title: "AI MARKETING GAME-CHANGERS",
      subtitle: "Educational Videos",
      category: "Educational Videos",
      videoId: "pQoP_Rndpqw", 
      image: "/video-page/t3.JPG",
      description: "We shoot and edit educational video content for leading tech companies",
      services: [
        "Script writing",
        "Graphics and animations",
        "Storyboard",
        "Sound design", 
        "Project management",
        "Studio production (Spokesperson)"
      ],
      estimatedCost: "Starting at $1800",
      deliveryTime: "5 days"
    },
    {
      id: 4,
      title: "VIDEODECK & HARNESS",
      subtitle: "Educational Videos", 
      category: "Educational Videos",
      videoId: "pQoP_Rndpqw",
      image: "/video-page/t4.png",
      description: "We shoot and edit educational video content for leading tech companies",
      services: [
        "Script writing",
        "Graphics and animations",
        "Storyboard",
        "Sound design",
        "Project management", 
        "Studio production (Spokesperson)"
      ],
      estimatedCost: "Starting at $1800",
      deliveryTime: "5 days"
    }
  ];

  const openPopup = (project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  return (
    <div className="text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
           <h2 className="font-termina text-2xl md:text-[35px] font-medium mb-4">Recent Work</h2>
      <div className="flex items-center justify-center mb-6">
        <p className="max-w-3xl text-center text-[#ffffff80] font-semibold tracking-wide text-lg">
                     Success leaves clues, and we've left a bunch. We've joined hands with companies big and small, turning their YouTube channels into their biggest distribution channels.

        </p>
        </div>
        </div>

        {/* Project Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 px-4 md:px-0">
  {projects.map((project) => (
    <div
      key={project.id}
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      onClick={() => openPopup(project)}
    >
      {/* Project Card */}
      <div className="relative p-1 rounded-2xl">
        <div className="relative rounded-2xl p-4 md:p-8 h-60 md:h-80 flex flex-col justify-between overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 rounded-2xl">
            <Image
              src={project.image}
              alt="image"
              height={800}
              width={900}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Category Badge */}
          <div className="relative z-10 self-end">
            <span className="bg-black/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-xl text-xs md:text-sm">
              {project.category}
            </span>
          </div>

          {/* Content */}
          <div className=" shadow-black shadow-xl relative z-10 flex-1 flex flex-col justify-end">
            <div className="text-xs md:text-sm text-[#ffffff80] mb-2">{project.subtitle}</div>
            <h3 className="text-xl md:text-3xl font-bold mb-4">{project.title}</h3>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  ))}
</div>
        {/* Load More Button */}
        <div className="text-center px-4 md:px-0">
          <button className="border border-orange-500 text-orange-500 px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-orange-500 hover:text-black transition-all duration-300 text-sm md:text-base">
            Load More
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-8">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-6xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto relative">
            {/* Close Button - Fixed Position */}
            <button
              onClick={closePopup}
              className="absolute top-0 right-0 z-10 text-[#ffffff80] hover:text-white transition-colors bg-gray-800/50 rounded-full p-2"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Content */}
              <div className="flex-1 p-4 md:p-8">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                  <div className="mb-4">
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-[#ffffff80] text-sm">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h2 className="font-termina text-[32px] md:text-4xl font-medium mb-4">{selectedProject.title}</h2>
                  <p className="text-[#ffffff80] text-base md:text-lg mb-6 md:mb-8">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Services List */}
                <div className="space-y-3 mb-6 md:mb-8">
                  {selectedProject.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[#ffffff80] text-sm md:text-base">{service}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="border border-orange-500 text-orange-500 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-orange-500 hover:text-black transition-all duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <span>Schedule a Call</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Right Side - Video & Info */}
              <div className="flex-1 p-4 md:p-8">
                {/* Video Player */}
                <div className="relative bg-black rounded-2xl overflow-hidden mb-4 md:mb-6">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.videoId}`}
                      title="Video"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Video Controls Overlay */}
                  {/* <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-center">
                    <div className="text-xs md:text-sm font-medium">
                      <div className="text-orange-400 text-xs mb-1">{selectedProject.subtitle}</div>
                      <div className="text-sm md:text-base">{selectedProject.title}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Volume2 size={16} className="md:w-5 md:h-5 text-white cursor-pointer hover:text-orange-400" />
                      <Maximize2 size={16} className="md:w-5 md:h-5 text-white cursor-pointer hover:text-orange-400" />
                    </div>
                  </div> */}
                </div>

                {/* Project Info Cards */}
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 flex justify-between items-center">
                    <span className="text-[#ffffff80] text-sm md:text-base">Estimated current cost</span>
                    <span className="font-bold text-sm md:text-base">{selectedProject.estimatedCost}</span>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 flex justify-between items-center">
                    <span className="text-[#ffffff80] text-sm md:text-base">Delivery Time</span>
                    <span className="font-bold text-sm md:text-base">{selectedProject.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioShowcase;