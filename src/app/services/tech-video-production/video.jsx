import React, { useState } from 'react';

const Video = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedSpokesperson, setSelectedSpokesperson] = useState(null);

  const videoId = "0AsyeSd1_kQ";

  const sets = [
    { id: 1, name: "Gradient Studio" },
    { id: 2, name: "Purple Ambiance" },
    { id: 3, name: "Green Workspace" },
    { id: 4, name: "Warm Office" }
  ];

  const spokespersons = [
    { id: 1, name: "Professional Male" },
    { id: 2, name: "Friendly Female" },
    { id: 3, name: "Casual Male" },
    { id: 4, name: "Corporate Female" }
  ];

  return (
    <div className="bg-gray-900 text-white p-8">
      <div className="">

        <div className="mb-16">
          <div className="items-center gap-4 mb-6">
            <div className='flex'>
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h2 className="text-4xl font-bold mb-2 ml-10">Customize the set.</h2>
            </div>
          </div>


          <div className='max-w-5xl mx-auto'>


            <div>
              <p className="text-gray-400 text-lg">
                Choose one of our predefined sets or get something completely custom.
              </p>
              <p className="text-gray-400 text-lg">
                You name it, we'll design it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sets.map((set) => (
                <div
                  key={set.id}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105`}
                >
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}`}
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="mb-16">
          <div className="items-center gap-4 mb-6">
            <div className='flex'>
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h2 className="text-4xl font-bold mb-2 ml-10">Choose your spokesperson.</h2>
            </div>
          </div>


          <div className='max-w-5xl mx-auto'>


            <div>
              <p className="text-gray-400 text-lg">
                7+ actors you can choose from.
              </p>
              <p className="text-gray-400 text-lg">
                We are constantly adding new options for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sets.map((set) => (
                <div
                  key={set.id}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105`}
                >
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}`}
                      className="w-full h-full object-cover"
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
  );
};

export default Video;