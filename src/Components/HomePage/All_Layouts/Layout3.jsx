'use client'
import React, { useEffect } from 'react'
import { OrbitingCirclesDemo } from './../OrbitTime'
import { gsap } from 'gsap'

const LayoutJS3 = () => {

    useEffect(() => {

        gsap.fromTo(".Layout3-class", { opacity: 0 }, { opacity: 1, duration: 0.5 })

        return () => {

        }
    }, [])

    return (
        <div className="flex pt-12 justify-center flex-row pb-12 Layout3-class">
            <div className="flex w-[90%] items-center max-lg:flex-col">
                {/* Left Section with Text */}
                <div className="w-[50%] max-lg:w-full max-lg:pl-0 pl-36 lg:pr-5 text-left max-lg:text-center">
                    <h3 className="text-3xl mb-4 quicksand-bold text-white"><span className="specialtext">Distribute.</span></h3>
                    <p className="text-white max-lg:text-center quicksand-medium">
                    We distribute your content across key platforms like Reddit, Dev.to,
                    and other developer communities, ensuring it reaches the right technical audience and drives engagement where it matters most.
                    </p>
                </div>

                {/* Right Section with Image */}
                <div className="w-[50%] flex justify-items-end max-lg:w-full">
                    <OrbitingCirclesDemo />
                </div>
            </div>
        </div>
    )
}

export default LayoutJS3
