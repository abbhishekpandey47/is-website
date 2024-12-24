'use client'
import React, {  useEffect } from 'react'
import { BorderBeam } from '../../ui/border-beam'
import { gsap } from 'gsap'
import Image from 'next/image'


const Layout1JS = () => {
    
    useEffect(() => {
      
        gsap.fromTo(".Layout1-class", { opacity: 0 }, { opacity: 1, duration: 0.5 })
    
      return () => {
        
      }
    }, [])
    
    return (
        <div className="flex pt-12 justify-center flex-row pb-12 Layout1-class">
            <div className="flex w-[90%] items-center max-lg:flex-col justify-between">
                {/* Left Section with Text */}
                <div className="w-[30%] max-lg:w-full max-lg:pl-0 lg:pr-5 text-left max-lg:text-center max-lg:pb-10">
                    <h3 className="text-3xl mb-4 quicksand-bold text-white"><span className="specialtext">Outline.</span></h3>
                    <p className="text-white max-lg:text-center quicksand-medium">
                    We create a clear, structured outline that highlights your product’s features and includes
                    <br className="max-lg:hidden max-lg" />
                    focus keywords, search volumes, and technical insights to ensure the content meets the needs of your target audience.
                    </p>
                </div>

                {/* Right Section with Image */}
                <div className="w-[70%] flex justify-items-end max-lg:w-full relative overflow-hidden max-w-[662px] max-h-[372px]">
                    <Image
                    loading='lazy'
                        src="/timelinegifs/fg1_comp.gif"
                        alt="Example Image"
                        width= {662}
                        height={372}
                        className="rounded-md shadow w-[900px] h-auto"
                        unoptimized
                    />
                    <BorderBeam size={250} duration={12} delay={9} />
                    <BorderBeam size={250} duration={12} delay={40} />
                </div>
            </div>
        </div>
    )
}

export default Layout1JS
