"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import postMetaData from '../../../../posts/_postMetadata';


const Featured = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [randomPosts, setRandomPosts] = useState([]);
    const featuredRef = useRef(null);
    const initialOffsetTop = useRef(null);


     // Handle sticky behavior
    useEffect(() => {
        const featured = featuredRef.current;

        if (featured) {
            // Handle sticky behavior
            initialOffsetTop.current = featured.getBoundingClientRect().top + window.scrollY;
            const handleScroll = () => {
                const headerOffset = 50;
                const outlineComponent = document.getElementById("outlineComponent");
                const headBanner = document.getElementById("headBanner");
                const rectr = headBanner.getBoundingClientRect();
                const rect = outlineComponent.getBoundingClientRect();
                if (rect.top <= headerOffset) {
                    setIsSticky(true);
                }

                if (rectr.bottom >= headerOffset) {
                    setIsSticky(false);
                } else {
                    setIsSticky(true);
                }
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll();

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

   
   // Getting latest blogs
  const latestPosts = [...postMetaData]
  .sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())
  .slice(0, 4);

  latestPosts.map((item,index)=>(
    console.log(item.publishedOn)
  ))

    return (
        <nav
            id="outlineComponent"
            ref={featuredRef}
            aria-label="Outline Navigation"
            className={`w-[18rem] max-xl:w-[13rem] min-[2173px]:w-[22rem] min-[2173px]:text-lg min-[2500px]:w-[30rem] min-[2500px]:text-xl max-lg:w-[20rem]  flex flex-col quicksand-light text-sm mt-24 ${isSticky && "sticky"} left-0 top-[160px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] rounded-xl`}
        >
            {/* Featured Section */}
            <div className="flex flex-col max-h-[480px] p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full">
                <h3 className="text-lg text-center quicksand-bold mb-4 text-[#3c61e2]">Latest Blogs</h3>
                <div className="space-y-3">
                    {latestPosts.map((item, index) => (
                      
                        <Link href={`/blog/${item.slug}`} className='flex items-center bg-[#2A3A5E] p-2 rounded-md cursor-pointer hover:bg-[#3A4A7E] transition-all duration-300'>
                         <div key={index} className="flex items-center ">
                            <img
                                src={item.ogImage}
                                alt={item.title}
                                className="w-14 h-12 rounded-md mr-3 object-cover"
                            />
                            <span className="text-sm line-clamp-2 quicksand-light">{item.title}</span>
                        </div>
                        </Link>
                       
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Featured;