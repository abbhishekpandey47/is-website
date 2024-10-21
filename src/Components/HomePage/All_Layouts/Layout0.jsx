'use client'
import React, { useEffect } from 'react'
import { BorderBeam } from '../../ui/border-beam'
import { gsap } from 'gsap'
import Image from 'next/image'


const Layout0JS = () => {

    useEffect(() => {

        gsap.fromTo(".Layout0-class", { opacity: 0 }, { opacity: 1, duration: 0.5 })

        return () => {

        }
    }, [])

    return (
        <div className="flex pt-12 justify-center flex-row pb-12 Layout0-class w-fit">
            <div className="flex w-[90%] items-center max-lg:flex-col justify-between">
                <div className="w-[30%] max-lg:w-full max-lg:pl-0 lg:pr-5 text-left max-lg:text-center max-lg:pb-10">
                    <h1 className="text-3xl mb-4 text-white quicksand-bold"><span className="specialtext">Research.</span></h1>
                    <p className="text-white max-lg:text-center quicksand-medium">
                        We identify the technical challenges and keywords that matter most to your audience,
                        <br className="max-lg:hidden max-lg" />
                        ensuring your content aligns with real-world engineering problems
                    </p>
                </div>
                <div className="w-[70%] flex justify-items-end max-lg:w-full relative overflow-hidden max-w-[662px] max-h-[372px]">
                    <Image
                        loading='lazy'
                        src="/timelinegifs/fg2_comp.gif"
                        alt="Example Image"
                        width={662}
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

export default Layout0JS