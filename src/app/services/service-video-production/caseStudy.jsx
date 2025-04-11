import { useState } from 'react';

export default function DarkGlass() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
  <div className="max-w-[1450px] w-full mx-auto flex flex-col items-center gap-5 text-center">

        <div
          className="rounded-2xl p-4 md:p-6 h-full flex flex-col items-center text-left relative overflow-hidden"
          style={{
            backgroundColor: "#0d0a16",
            backgroundImage: "radial-gradient(circle at top right, #272b40 0%, transparent 80%)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            border: "2px solid rgba(60, 63, 84, 0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex flex-col-reverse md:flex-row w-full">
            <div className="w-full md:w-1/2 md:pr-4 mt-6 md:mt-0">
              <div className="my-4 md:my-8 mx-3 md:mx-6">
                <div className="flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 16L18 8" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-2 text-gray-300 font-medium">hotjar</span>
                </div>
              </div>

              <div className="mb-4 md:mb-8 mx-3 md:mx-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">Decreased CPA on YouTube by 94%</h2>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6 mb-4 mx-3 md:mx-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-opacity-20 bg-green-400 mr-3">
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.8 37.1999C49.1 28.1999 48.2001 15.7999 40.2001 7.79992C32.2001 -0.200083 19.8 -1.10008 10.8 5.19992" stroke="#AEC9EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                      <path d="M5.20004 10.7998C-1.09996 19.7998 -0.199961 32.1998 7.80004 40.1998C15.8 48.1998 28.3 49.0998 37.2 42.7998" stroke="#1F5BFD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M30 14L33 17L25 25L21 21L10 32L12 34L21 25L25 29L35 19L38 22V14H30Z" fill="#2FE98F" stroke="#2FE98F" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">1257%</p>
                    <p className="text-xs md:text-sm text-gray-400">increase in CTR</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-opacity-20 bg-red-400 mr-3">
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.8 37.1999C49.1 28.1999 48.2001 15.7999 40.2001 7.79992C32.2001 -0.200083 19.8 -1.10008 10.8 5.19992" stroke="#AEC9EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                      <path d="M5.20004 10.7998C-1.09996 19.7998 -0.199961 32.1998 7.80004 40.1998C15.8 48.1998 28.3 49.0998 37.2 42.7998" stroke="#1F5BFD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M35.2123 27.2072L33.0909 30.8814L23.293 25.2246L26.1214 20.3256L12.6492 12.5474L11.235 14.9969L22.2577 21.3609L19.4293 26.2598L31.6767 33.3309L29.5554 37.0051L37.2828 34.9346L35.2123 27.2072Z" fill="#2FE98F" stroke="#2FE98F" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">69%</p>
                    <p className="text-xs md:text-sm text-gray-400">decrease in CPC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:pl-4 md:mt-12 md:mb-0">
              <div className="p-2 md:p-4 rounded-lg w-full lg:mb-12">
                <div className="w-full h-48 sm:h-56 md:h-64 rounded-md overflow-hidden">
                  <div className="relative w-full h-full">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src="https://www.youtube.com/embed/ICUGIdqzmYg" 
                      title="YouTube video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}