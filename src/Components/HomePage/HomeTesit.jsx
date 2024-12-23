'use client'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import React, { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
import Image from 'next/image'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);


export const testiArr = [
    {
        name: "Cindy Blake",
        src: "/Testimon/cindyFirefly.jpg",
        alt: "Cindy Blake, VP Marketing, Firefly",
        pos: "VP Marketting, Firefly",
        comment: "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
        highlight: ["quick to onboard", "responsive", "collaborative"]

    },
    {
        name: "Josh",
        src: "/Testimon/joshTerraTeam.jpg",
        alt: "Josh, Co-Founder, Terrateam",
        pos: "Co-Founder, Terrateam",
        comment: "The Infrasity team has been fantastic to work with. Their attention to detail and level of accuracy is top notch. I'd fully recommend their services to anyone.",
        highlight: ["attention to detail", "level of accuracy", "top notch"]
    },
    {
        name: "Shaked Askayo",
        src: "/Testimon/Shaked.png",
        alt: "Shaked Askayo, CTO, Kubiya.ai",
        pos: "CTO, Kubiya.ai",
        comment: "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
        highlight: ["significantly enhanced the visibility and appeal of our product"]
    },
    {
        name: "Frank Weissmann",
        src: "/Testimon/Frank.jpg",
        alt: "Frank Weissmann, Customer Success Lead, firefly.ai",
        pos: "Customer Success Lead, firefly.ai",
        comment: "Infrasity's work has improved the client's SEO, earning a score of over 75%. They'vs also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time.",
        highlight: ["over 75%", "quick turnaround time"]
    },
    {
        name: "Igal Zeifman",
        src: "/Testimon/igalEnv0.jpg",
        alt: "Igal Zeifman, VP Marketing, Env0",
        pos: "VP Marketing, Env0",
        comment: "Infrasity provided exceptional tech content on infrastructure engineering, with deep expertise in Terraform and the tech stack. Their collaborative approach and hands-on, developer-focused writing make their work impactful. Highly recommend them for technical content creation.",
        highlight: ["exceptional tech content", "deep expertise", "collaborative approach", "impactful"]
    },
    {
        name: "Sri Krishna",
        src: "/Testimon/sriMiddleware.jpeg",
        alt: "Sri Krishna, Content Head, Middleware",
        pos: "Content Head, Middleware",
        comment: "Infrasity is incredibly responsive and understands client needs exceptionally well, always delivering promptly and as expected. Their attention to detail and outstanding customer support truly set them apart. Communication through email and messaging was seamless, and while the quality of work is top-notch, we look forward to even faster delivery in the future.",
        highlight: ["responsive", "attention to detail", "outstanding customer support", "quality of work is top-notch"]
    }
]

const TestiCard = ({ name, alt, sorc, pos, comment, index, carPtr, highlight }) => {
    const renderHighlightedText = (text = "", highlights = []) => {
        if (!text) return ""; // Return an empty string if text is undefined or null
        const regex = new RegExp(`(${highlights.join("|")})`, "gi");
        return text.split(regex).map((part, i) =>
            highlights.includes(part) ? (
                <span key={i} className="text-highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="max-md:w-[350px] h-[55vh] max-lg:h-[40vh] transition card bg-zinc-950 w-[30%] shadow-xl border-[#edeaea] border-2 flex flex-col overflow-x-hidden">
            <div className="h-[15%] flex justify-center">
                <div className="pt-8 items-center card-title text-[4em] max-lg:text-[2em]">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-magenta-40 | mb-4 mx-auto">
                        <path fill="#fff" fillOpacity="0.01" d="M0 0h24v24H0z"></path>
                        <path d="M6.816 6.176c1.232-1.21 2.9-2.193 4.713-2.722V3c-2.973.227-5.8 1.437-7.904 3.328C1.305 8.445 0 11.168 0 14.193c0 1.815.508 3.48 1.378 4.69C2.32 20.318 3.77 21 5.51 21c1.377 0 2.682-.53 3.625-1.437.943-.907 1.45-2.193 1.45-3.706 0-1.21-.362-2.269-1.16-3.176-.653-.832-1.668-1.362-2.828-1.589H4.35c.218-1.815 1.016-3.479 2.466-4.916zm12.471 0c1.233-1.21 2.9-2.193 4.713-2.722V3c-2.973.227-5.8 1.437-7.903 3.328-2.32 2.117-3.626 4.84-3.626 7.865 0 1.815.508 3.48 1.378 4.69C14.79 20.318 16.242 21 17.982 21c1.378 0 2.683-.53 3.625-1.437.943-.907 1.45-2.193 1.45-3.706 0-1.21-.362-2.269-1.16-3.176-.652-.832-1.667-1.362-2.827-1.589h-2.248c.217-1.815 1.015-3.479 2.465-4.916z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <div className="card-body max-lg:px-3 max-lg:pb-3 pt-10 overflow-y-auto scrollertesti h-[55%]">
                <p className="text-md max-lg:text-[0.7rem] cursor-pointer text-center">
                    {renderHighlightedText(comment, highlight)}
                </p>
            </div>
            <div className="card-body pt-0 h-[30%]">
                <div className="flex justify-start gap-5 mt-5 items-center">
                    <div>
                        <Image
                            loading="lazy"
                            width={100}
                            height={100}
                            className="max-w-[60px] rounded-[100%]"
                            src={sorc}
                            alt={alt}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <h2 className="max-lg:text-[0.7rem]">{name}</h2>
                        <p className="max-lg:text-[0.7rem]">{pos}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

let newArr = []


const HomeTesit = () => {
    const [carPtr, setCarPtr] = useState(1)
    const testiMemo = useMemo(() => testiArr, [testiArr])
    useEffect(() => {
        gsap.fromTo(".testiMonialsHead", {
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
                    trigger: ".testiMonialsHead",
                    toggleActions: "restart none none none"
                }
            }
        )

        gsap.fromTo(".testiMonCardHome", {
            opacity: 0,
            y: 55,
            scale:1.3
        },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
                scale:1,
                scrollTrigger: {
                    trigger: ".testiMonCardHome",
                    toggleActions: "restart none none none",
                }
            }
        )



        return () => {

        }
    }, [])


    const [renderArr, setRenderArr] = useState([1])
    const handleOnIndIncr = () => {
        newArr = []
        if (window.innerWidth >= 1024) newArr.push(testiMemo[(carPtr - 2 + testiMemo.length) % testiMemo.length]);
        newArr.push(testiMemo[(carPtr - 1 + testiMemo.length) % testiMemo.length]);
        if (window.innerWidth >= 1024) newArr.push(testiMemo[(carPtr + testiMemo.length) % testiMemo.length]);
        setRenderArr(newArr)
        setCarPtr((carPtr - 1 + testiMemo.length) % testiMemo.length)

    }
    const handleOnIndDecr = () => {

        newArr = []
        if (window.innerWidth >= 1024) newArr.push(testiMemo[(carPtr + testiMemo.length) % testiMemo.length]);
        newArr.push(testiMemo[(carPtr + 1) % testiMemo.length]);
        if (window.innerWidth >= 1024) newArr.push(testiMemo[(carPtr + 2 + testiMemo.length) % testiMemo.length]);
        setRenderArr(newArr)
        setCarPtr((carPtr + 1 + testiMemo.length) % testiMemo.length)

    }
    useEffect(() => {
        newArr = [testiMemo[carPtr]]
        if (window.innerWidth >= 1024) newArr = [testiMemo[carPtr - 1], testiMemo[carPtr], testiMemo[carPtr + 1]]
            setRenderArr(newArr)
        return () => {

        }
    }, [])


    return (
        <div>
            <div className="relative addGrid2">
            <div className="whyinfra"></div>
                <div className='flex justify-center text-white pt-20 testiMonialsHead overflow-y-hidden'><h2 className='text-center max-sm:text-[1.6em] text-[2em] w-[80%] max-sm:w-[95%] quicksand-semibold text-[wheat]'>Hear what our customers say about us</h2></div>
                <div className='flex justify-center text-white testiMonialsHead'><h1 className='text-center text-[1.7em] w-[70%] quicksand-bold max-lg:text-[1.2em] max-sm:text-[.9em] max-sm:w-[95%] pt-3'>We help <span className="specialtext">DevTools and engineering companies</span> drive growth through strategic technical content and developer relations services.</h1></div>
            </div>
            <div className='flex justify-center gap-6 py-16 quicksand-light flex-wrap w-7/6 m-auto text-white testiMonCardHome'>

                {
                    renderArr.map((testi, index) => {
                        return <TestiCard index={index} name={testi.name} alt={testi.alt} sorc={testi.src} pos={testi.pos} carPtr={carPtr} comment={testi.comment} highlight={testi.highlight || []} key={index} />
                    })
                }
            </div>
            <div className='flex justify-center gap-10'>
                <div><button onClick={handleOnIndIncr} className='transition scale-125 btn hover:bg-transparent rounded-[100%] bg-transparent text-white border-[#999] hover:border-[white]'><ArrowLeftOutlined className="text-white" /></button></div>
                <div><button onClick={handleOnIndDecr} className='transition scale-125 btn hover:bg-transparent rounded-[100%] bg-transparent text-white border-[#999] hover:border-[white]'><ArrowRightOutlined className="text-white" /></button></div>
            </div>
        </div>
    )
}

export default HomeTesit
