'use client'
import React from 'react';
import { ScrollTrigger, CustomEase } from 'gsap/all'
import { gsap } from 'gsap'
import StepperShow from './StepperShow';
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);
CustomEase.create("custom", "M0,0 C0.01,1.01 0,1 1,1.05");

const HomeTimeLine = () => {

  return (
    <div className='relative lg:mt-20'>
      <div className='w-[95vw] mx-auto'>
        <div className="divider-line divider-top max-lg:hidden " style={{ top: '40px', width: '95vw', overflow: 'hidden' }} />
      </div>
      <div className="divider-line divider-left max-lg:hidden" />
      <div className='sm:w-[70%] mx-auto flex flex-col items-center'>
        <div className="relative">
          <div className='flex justify-center relative flex-col items-center'>
            <div className='w-[95%]'>
              <div className="whyinfra"></div>
              <div className='pt-20 lg:pt-32 text-center text-3xl quicksand-semibold text-[wheat]'><h2>How we drive results</h2></div>
              <div className='text-center max-xs:text-xl text-[3em] max-lg:text-[2em] py-4 flex justify-center quicksand-bold text-white relative'><h2>Your Product needs a <span className="specialtext">developer mindset</span> to amplify presence</h2></div>
              <div className='text-center text-sm pb-5 quicksand-light text-white'><p>DevTools and engineering companies often struggle to communicate complex product features to developers. Creating content marketing for tech companies and videos that resonate with technical audience requires deep expertise, which can drain time and resources from your engineering team.</p></div>
            </div>
          </div>
        </div>
        <div className='flex justify-center w-full'>
          <StepperShow />
        </div>
      </div>
    </div>
  )
}

export default HomeTimeLine
