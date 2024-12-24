import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
import { useEffect } from 'react';
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);

const HomeVidSection = () => {
  useEffect(() => {
    gsap.fromTo(".howWorksHead", {
      opacity: 0,
      y: 55,

    },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".howWorksHead",
          toggleActions: "restart none none none"
        }
      }
    )

    gsap.fromTo(".howWorksVidSection", {
      opacity: 0,
      y: 55,
      scale: 1.3
    },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scale: 1,
        scrollTrigger: {
          trigger: ".howWorksVidSection",
          scrub: 1,
          toggleActions: "restart none none none"
        }
      }
    )
    return () => {

    }
  }, [])
  return (
    <div className="mt-10">
      <div className="relative addGrid2">
        <div className='w-full howWorksHead sm:mb-28 mb-10'>
          {/* <h1 className='quicksand-bold text-center text-[3em] max-sm:py-6 max-sm:text-[1em] text-white'>On-demand <span className="specialtext">technical videos</span> recorded by engineers</h1> */}
          <div className="whyinfra"></div>
          <div className='xs:px-5 sm:px-10 lg:px-20'>
            <h2 className="text-white text-center max-xs:text-3xl max-sm:text-4xl text-[3em] quicksand-bold pt-10 whyInfraUpperHead">On-demand <span className="specialtext">technical videos</span> recorded by engineers</h2>
          </div>
          <div className="flex justify-center whyInfraUpperHead">
            <p className="text-center text-[wheat] pt-5 w-2/3 quicksand-semibold max-lg:w-3/4">
            Get on-demand technical videos and content created by engineers, tailored to showcase your products key features.
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative howWorksVidSection'>
          <iframe
            className='rounded-[20px] max-md:w-[630px] max-md:h-[359px] max-sm:w-[350px] max-sm:h-[181px] max-lg:w-[760px] max-lg:h-[439px] shadow-3xl relative p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200'
            width="950"
            height="550"
            src={`https://www.youtube.com/embed/ICUGIdqzmYg`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <div className='left-[30px] top-[-60px] bg-[#101010] text-white quicksand-semibold rounded-[35px] border-2 border-[#242424] absolute max-sm:text-[0.6em] w-[300px] p-6 max-sm:p-4 max-sm:hidden'>
            <div>
              <TypeAnimation
                sequence={[
                  "Scale your video marketing with developer-focused content that highlights your SaaS product's key features.",
                  1000,
                  "-By Shan",
                  100
                ]}
                style={{ fontSize: '1em' }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default HomeVidSection
