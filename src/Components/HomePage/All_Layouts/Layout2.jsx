'use client'
import React, { useEffect } from 'react'
import { BorderBeam } from '../../ui/border-beam'
import { gsap } from 'gsap'
import Image from 'next/image'

const LayoutJS2 = () => {
    useEffect(() => {

        gsap.fromTo(".Layout2-class", { opacity: 0 }, { opacity: 1, duration: 0.5 })

        return () => {

        }
    }, [])
    return (
        <div className="flex pt-12 justify-center flex-row pb-12 Layout2-class">
            <div className="flex w-[90%] items-center max-lg:flex-col justify-between">
                {/* Left Section with Text */}
                <div className="w-[30%] max-lg:w-full max-lg:pl-0 lg:pr-5 text-left max-lg:text-center max-lg:pb-10">
                    <h3 className="text-3xl mb-4 quicksand-bold text-white"><span className="specialtext">Create.</span></h3>
                    <p className="text-white max-lg:text-center quicksand-medium">
                        We turn technical jargon into content developers will love.
                    </p>
                </div>

                {/* Right Section with Image */}
                <div className="w-[70%] flex justify-items-end max-lg:w-full relative overflow-hidden max-w-[662px] max-h-[372px]">
                    <Image
                        loading='lazy'
                        width={662}
                        height={372}
                        src="/timelinegifs/fg3.gif"
                        alt="Example Image"
                        className="rounded-md shadow w-[900px] h-auto"
                    />
                    <BorderBeam size={250} duration={12} delay={9} />
                    <BorderBeam size={250} duration={12} delay={40} />
                </div>
            </div>
        </div>
    )
}

export default LayoutJS2
