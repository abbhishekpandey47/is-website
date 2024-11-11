'use client'
import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const testiArr = [
    {
        name: "Cindy Blake",
        src: "./Testimon/cindyFirefly.jpg",
        pos: "VP Marketting, Firefly",
        comment: "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative, a joy to work with..."

    },
    {
        name: "Josh",
        src: "./Testimon/joshTerraTeam.jpg",
        pos: "Co-Founder, Terrateam",
        comment: "The Infrasity team has been fantastic to work with. Their attention to detail and level of accuracy is top notch. I'd fully recommend their services to anyone."
    },
    {
        name: "Shaked Askayo",
        src: "./Testimon/Shaked.png",
        pos: "CTO, Kubiya.ai",
        comment: "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai."
    },
    {
        name: "Frank Weissmann",
        src: "./Testimon/Frank.jpg",
        pos: "Customer Success Lead, firefly.ai",
        comment: "Infrasity's work has improved the client's SEO, earning a score of over 75%. They'vs also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time..."
    },
    {
        name: "Igal Zeifman",
        src: "./Testimon/igalEnv0.jpg",
        pos: "VP Marketing, Env0",
        comment: "Infrasity helped us with tech content, focusing on infrastructure engineering - guides, code examples, and more. Their deep domain expertise with Terraform and the underlying tech stack is invaluable, and their project management approach facilitates a smooth and collaborative work process. I highly recommend them when it comes to writing hands-on technical developer-focused content. Their work is immediately impactful and working together is a pleasure..."
    },
    {
        name: "Sri Krishna",
        src: "./Testimon/sriMiddleware.jpg",
        pos: "Content Head, Middleware",
        comment: "Infrasity is incredibly responsive and understands client needs exceptionally well, always delivering promptly and as expected. Their attention to detail and outstanding customer support truly set them apart. Communication through email and messaging was seamless, and while the quality of work is top-notch, we look forward to even faster delivery in the future..."
    }
]

const TestiCard = ({ name, sorc, pos, comment, index }) => {
    return (
        <div className={` text-white max-lg:h-[40vh] transition card  w-[100%] flex flex-col`}>
            <div className="card-body max-lg:p-3 max-lg:pt-4">
                <h2 className="card-title text-[4em] max-lg:text-[2em]"><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-magenta-40 | mb-4 mx-auto"><path fill="#fff" fill-opacity="0.01" d="M0 0h24v24H0z"></path><path d="M6.816 6.176c1.232-1.21 2.9-2.193 4.713-2.722V3c-2.973.227-5.8 1.437-7.904 3.328C1.305 8.445 0 11.168 0 14.193c0 1.815.508 3.48 1.378 4.69C2.32 20.318 3.77 21 5.51 21c1.377 0 2.682-.53 3.625-1.437.943-.907 1.45-2.193 1.45-3.706 0-1.21-.362-2.269-1.16-3.176-.653-.832-1.668-1.362-2.828-1.589H4.35c.218-1.815 1.016-3.479 2.466-4.916zm12.471 0c1.233-1.21 2.9-2.193 4.713-2.722V3c-2.973.227-5.8 1.437-7.903 3.328-2.32 2.117-3.626 4.84-3.626 7.865 0 1.815.508 3.48 1.378 4.69C14.79 20.318 16.242 21 17.982 21c1.378 0 2.683-.53 3.625-1.437.943-.907 1.45-2.193 1.45-3.706 0-1.21-.362-2.269-1.16-3.176-.652-.832-1.667-1.362-2.827-1.589h-2.248c.217-1.815 1.015-3.479 2.465-4.916z" fill="#D600D9"></path></svg></h2>
                <p className='text-sm max-lg:text-[0.6em] hover:underline cursor-pointer quicksand-light text-center'>{comment}</p>
                {/* <div className='flex justify-end mt-2'><h2 className="card-title max-lg:text-[2em] text-[4em]"></h2></div> */}
            </div>
            <div className='card-body pt-0'>
                <div className='flex justify-start gap-3'>
                    <div><img className='w-[70px] rounded-[100%]' src={sorc} alt="" /></div>
                    <div className='flex flex-col justify-center gap-1'>
                        <h2 className='max-lg:text-[0.7em] quicksand-semibold'>{name}</h2>
                        <p className='max-lg:text-[0.7em] quicksand-semibold'>{pos}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
const TestiCarousel = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <div className='w-full'>
            <Carousel className='max-lg:w-full' autoplay afterChange={onChange}>
                {testiArr.map((testi, index) => {
                    return (<TestiCard index={index} name={testi.name} sorc={testi.src} pos={testi.pos} comment={testi.comment} key={index} />)
                })}
            </Carousel>
        </div>
    )
}

export default TestiCarousel