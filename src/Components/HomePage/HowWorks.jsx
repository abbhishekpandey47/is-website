import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);
import NumberTicker from '../ui/number-ticker';

const ServiceCard = ({ service, isService, ind }) => {
    useEffect(() => {

        gsap.fromTo(".howWorksCard", {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.easeOut",
            stagger: 0.3,
            scrollTrigger: {
                trigger: ".howWorksCard",
                toggleActions: "restart none none none"
            }
        })

        return () => {

        }
    }, [])

    return (
        <div className='border-[1.5px] max-lg:p-4 p-8 rounded-md w-[350px] hover:shadow-purpleshadow duration-300 hover:bg-purpleImage cursor-pointer howWorksCard'>
            <div className={`text-center flex flex-col gap-3 `}>
                <div className='max-lg:text-[3em] text-[4em] font-bold text-white'><p>{service.id}</p></div>
                {/* <div className='flex flex-col gap-3'> */}
                    <div className='text-[1.2em] max-lg:text-[1em] quicksand-semibold text-white'><h2>{service.head}</h2></div>
                    <div><p className='max-lg:text-[0.9em] text-[#CFCAC7]'>{service.para}</p></div>

                {/* </div> */}
            </div>
            {isService && <div>
                <div className='pt-5'><hr className='border-[#CFCAC7]' /></div>
                <div><h2 className='text-center quicksand-bold text-[4em] text-[#CFCAC7]'><NumberTicker value={service.percent} />{ind == 0 ? "+":"%"}</h2></div>
                <div><p className='text-center text-white'>{service.percentPara}</p></div>

            </div>}
        </div>
    )
}



const HowWorks = ({ mainHeading, subHeading, serviceArr = [], isService = false }) => {
    return (
        <div>
            <div className="relative addGrid2">
                <div className=' w-4/5 m-auto flex flex-col gap-7 max-sm:gap-2'>
                    <div className='w-full text-center pt-20 text-3xl quicksand-bold text-[wheat]'><h2>{subHeading}</h2></div>
                    <div className='w-full max-lg:text-[2em] text-center text-[3em] flex justify-center quicksand-semibold'><h2 className='text-white max-md:w-3/4 max-sm:text-[0.7em] max-sm:w-[93%]' dangerouslySetInnerHTML={{ __html: mainHeading }}></h2></div>
                </div>
            </div>
            <div>
                <div className='flex justify-center gap-10 pt-10 quicksand-light flex-wrap'>
                    {serviceArr.map((service, index) => {
                        return <ServiceCard key={index} service={service} isService={isService} ind = {index} />
                    })}


                </div>
            </div>
        </div>
    )
}

export default HowWorks
