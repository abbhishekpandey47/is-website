import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LogoMoving() {
  const logosList = [
    "aviator.png",
    "firstock-logo.webp",
    "cedana.png",
    "cerbos.png",
    "codegiant-infra-1.png",
    "cycloid.png",
    "daytona-removebg-preview-e1721477918328.png",
    "DevZero.png",
    "env0-infra-1.png",
    "firefly.png",
    "Group-14967.png",
    "images-removebg-preview.png",
    "images__2_-removebg-preview.png",
    "kapstan.png",
    "kubiya.png",
    "logo-landscape-removebg-preview.png",
    "lovable-logo.png",
    "Mask-group.png",
    "middleware-logo.svg",
    "scalr.png",
    "stackOne.svg",
    "TravisCI-Full-Color.png",
    "terrateam.png",
    "vapi.png",
    "qodo-logo.svg",
  ];

  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Clone the logo container to create the illusion of infinite scrolling
    const logoContainer = scrollContainer.querySelector(".logo-container");
    const clone = logoContainer.cloneNode(true);
    scrollContainer.appendChild(clone);

    // Set the initial position - starting from above the viewport (negative position)
    let scrollPos = -logoContainer.offsetHeight;
    const scrollSpeed = 0.5; // Adjust for faster/slower scrolling

    // Animation function
    const animate = () => {
      scrollPos += scrollSpeed;
      
      // If we've scrolled past the first set of logos, reset to create infinite loop
      if (scrollPos >= 0) {
        scrollPos = -logoContainer.offsetHeight;
      }
      
      // Apply the scroll position with transform for better performance
      scrollContainer.style.transform = `translateY(${scrollPos}px)`;
      
      // Continue the animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup on component unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Function to render logos with proper spacing
  const renderLogos = () => {
    return logosList.map((logo, index) => (
      <div 
        key={`logo-${index}`}
        className="mb-6"
      >
        <div className="bg-black bg-opacity-80 px-4 py-2 rounded-full flex items-center">
          <Image
            loading="lazy"
            width={100}
            height={40}
            className="max-h-10 w-auto text-gray-400 filter brightness-0 invert"
            src={`/trustedby/${logo}`}
            alt={`Trusted partner ${logo}`}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 p-4">
      <div 
        className="rounded-2xl p-4 sm:p-6 h-96 w-full max-w-4xl relative overflow-hidden flex"
        style={{
          backgroundColor: "#141318",
          backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
          border: "2px solid rgba(60, 63, 84, 0.3)",
        }}
      >
        {/* Top overlay for entire container */}
        <div 
          className="absolute top-0 left-0 right-0 z-20"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0) 100%)",
            pointerEvents: "none" // Allow clicking through the overlay
          }}
        />
        
        {/* Bottom overlay for entire container */}
        <div
  className="absolute bottom-0 left-0 right-0 z-20"
  style={{
    height: "80px",
    background: "linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0) 100%)",
    pointerEvents: "none" // Allow clicking through the overlay
  }}
/>
        
        {/* Left side content */}
        <div className="flex-1 flex flex-col justify-center z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Your unified<br />developer platform</h1>
          <p className="text-gray-400 text-lg mb-6">
            Supercharge your team with<br />
            reviewer assignment, merge<br />
            queues, automations, and insights.
          </p>
          <div className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer transition-colors">
            <span>Read about merge queues</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Right side with scrolling logos */}
        <div className="flex-1 relative z-10">
          <div className="absolute right-6 h-full overflow-hidden" style={{ width: "150px" }}>
            <div ref={scrollContainerRef} className="will-change-transform">
              <div className="logo-container">
                {renderLogos()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}