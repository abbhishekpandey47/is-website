'use client'
import ReadyToStart from '@/Components/HomePage/ReadyToStart'
import React, { useEffect, useContext, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
import AppContext from '@/context/Infracontext'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);
import Image from 'next/image'
import Link from 'next/link'


const PageCard = ({ ind = 1, data = { data } }) => {
    return (
        <div className={`p-10 max-lg:p-4 gap-10 ${ind % 2 == 0 ? 'flex' : 'flex flex-row-reverse'} max-md:flex-col`}>
            <div className='w-1/2 max-md:w-full flex flex-col justify-center'><Image loading='lazy' width={703} height={400} className='rounded-lg' src="/blog_as_service/1620x921.png" alt="Ratio is 1.7589" /></div>
            <div className={`w-[40%] max-md:w-full max-lg:w-1/2 flex flex-col items-center justify-center serviceasblogcard card-${ind}`}>
                <div className='h-[80%] max-lg:h-full flex flex-col gap-5 max-lg:gap-2 items-center'>
                    <div><h1 className='quicksand-bold text-[3em] max-lg:text-[2em] leading-[45px] max-md:text-center'>{data.hTag}</h1></div>
                    <div><p className='quicksand-light max-lg:text-[0.8em] max-md:text-[1.2em] max-md:text-center'>{data.pTag}</p></div>
                </div>
            </div>
        </div>
    )
}

const dataService = [
    {
        imgLink: "https://via.placeholder.com/1620x921",
        hTag: "Accelerate Development by Eliminating Setup Friction",
        pTag: "Setting up development environments manually can be time-consuming and prone to errors. With our pre-built recipes and step-by-step integration guides, your developers can hit the ground running without having to figure out the intricacies of configurations. This lets your team focus on what matters—developing and delivering new features—while we handle the complexity of environment setups."
    },
    {
        imgLink: "https://via.placeholder.com/1620x921",
        hTag: "Seamless Integration for Faster Feature Deploymen",
        pTag: "We tailor our solutions to fit your specific tools and workflows, whether it’s integrating with Daytona's CLI, DevZero, or other platforms. Our guides help your team quickly deploy features and updates, ensuring smooth development cycles without unnecessary delays. By having everything set up from the start, your team can focus on innovation, not troubleshooting."
    },
    {
        imgLink: "https://via.placeholder.com/1620x921",
        hTag: "Reduce Time to Market with Ready-to-Use Configurations",
        pTag: "Instead of spending days or weeks configuring environments for new projects, we provide ready-to-use setups that ensure your team can start coding immediately. This not only reduces downtime but also accelerates your go-to-market timeline, giving you a competitive edge in getting your product to users faster."
    },
    {
        imgLink: "https://via.placeholder.com/1620x921",
        hTag: "Simplify Collaboration and Onboarding",
        pTag: "Our consistent, easy-to-follow recipes make it simple for new developers to onboard quickly and get up to speed. This standardization reduces onboarding time and ensures that all team members work in the same environment, reducing bugs and inconsistencies that slow down development."
    }
]

const page = () => {

    const context = useContext(AppContext)

    const { setProgress, progress } = context
    const dataMemoArr = useMemo(() => dataService, [dataService])

    useEffect(() => {
        gsap.utils.toArray('.serviceasblogcard').forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 100 },
                {
                    opacity: 1, y: 0, duration: 1, ease: Power3.easeOut,
                    scrollTrigger: {
                        trigger: card,
                        toggleActions: "restart reverse restart none",
                    }
                }
            );
        });

        return () => {

        }
    }, [])

    useEffect(() => {

        setProgress(100)

        return () => {

        }
    }, [])


    return (
        <div className=' max-w-[1560px] mx-auto'>
            <div className="pt-40 space-y-9 relative blogDiv">
                <div className="whyinfra"></div>
                <div className="quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center"><h1 className="w-3/4 leading-[80px] max-sm:w-[95%] max-sm:leading-[69px]"><span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">Tutorials</span></h1></div>

                <div className="text-center text-white quicksand-semibold flex justify-center"><p className="w-1/2 max-sm:w-[90%]">Your extended Developer Relations team to initiate conversations, increase user sign ups, and accelerate pipeline faster than ever before</p></div>
                <div className="flex justify-center"><Link href="/contact" className="btn bg-btnprimary hover:bg-btnprimaryhov text-white text-center relative z-[12px]">Get Started</Link></div>

            </div>
            <div className='flex flex-col gap-10 pt-20'>
                {dataMemoArr.map((data, index) => {
                    return <PageCard ind={index} data={data} />
                })}
            </div>
            <ReadyToStart />
        </div>
    )
}

export default page