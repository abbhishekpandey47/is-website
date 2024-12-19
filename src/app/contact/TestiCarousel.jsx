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
        comment: "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative, a joy to work with."

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
        comment: "Infrasity's work has improved the client's SEO, earning a score of over 75%. They'vs also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time."
    },
    {
        name: "Igal Zeifman",
        src: "./Testimon/igalEnv0.jpg",
        pos: "VP Marketing, Env0",
        comment: "Infrasity helped us with tech content, focusing on infrastructure engineering - guides, code examples, and more. Their deep domain expertise with Terraform and the underlying tech stack is invaluable, and their project management approach facilitates a smooth and collaborative work process. I highly recommend them when it comes to writing hands-on technical developer-focused content. Their work is immediately impactful and working together is a pleasure."
    },
    {
        name: "Sri Krishna",    
        src: "./Testimon/sriMiddleware.jpeg",
        pos: "Content Head, Middleware",
        comment: "Infrasity is incredibly responsive and understands client needs exceptionally well, always delivering promptly and as expected. Their attention to detail and outstanding customer support truly set them apart. Communication through email and messaging was seamless, and while the quality of work is top-notch, we look forward to even faster delivery in the future."
    }
]

const TestiCard = ({ name, src, pos, comment }) => {
    return (
        <div className="flex flex-col justify-center items-center text-white pb-12 max-w-[90%] mx-auto">
            <svg width="24" height="24" className="mb-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.816 6.176c1.232-1.21..." fill="#D600D9" />
            </svg>
            <p className="text-sm text-center italic mb-4">{comment}</p>
            <div className="flex items-center gap-3">
                <img className="w-[50px] h-[50px] rounded-full object-cover" src={src} alt={`${name}`} />
                <div>
                    <h3 className="text-base font-semibold">{name}</h3>
                    <p className="text-xs text-gray-300">{pos}</p>
                </div>
            </div>
        </div>
    );
};

const TestiCarousel = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <div className="w-full max-h-[80vh] overflow-hidden">
            <Carousel autoplay afterChange={onChange} className="max-w-[100%]">
                {testiArr.map((testi, index) => (
                    <TestiCard key={index} name={testi.name} src={testi.src} pos={testi.pos} comment={testi.comment} />
                ))}
            </Carousel>
        </div>
    );
};

export default TestiCarousel;