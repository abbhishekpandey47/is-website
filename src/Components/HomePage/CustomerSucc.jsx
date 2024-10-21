import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all';
import { useEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const CustomerSucc = () => {
    const router = useRouter();

    const statistics = useMemo(() => (
        <div className='flex gap-3 text-[#9eb3ff]'>
            <div className='max-sm:w-1/2'>
                <h2 className='text-[3.5em] max-sm:text-5xl max-lg:text-3xl font-bold'>93%</h2>
                <p className='quicksand-semibold max-md:text-sm'>are using content marketing as part of their strategy.</p>
            </div>
            <div className='max-sm:w-1/2'>
                <h2 className='text-[3.5em] font-bold max-sm:text-5xl max-lg:text-3xl'>47%</h2>
                <p className='quicksand-semibold max-md:text-sm'>of buyers view three to five pieces of content before engaging</p>
            </div>
        </div>
    ), []);

    const customerQuote = useMemo(() => (
        <div className='flex flex-col gap-4 border-[#444] border-2 p-5 rounded-xl quicksand-light italic'>
            <div><p className='max-md:text-sm max-sm:text-white'>“Businesses publishing four blogs per week get 3.5 times more traffic than those publishing less frequently”</p></div>
            <div><p className='max-md:text-sm max-sm:text-white'>- Semrush</p></div>
        </div>
    ), []);

    useEffect(() => {
        gsap.fromTo(".customerHeadHome", {
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
                    trigger: ".customerHeadHome",
                    toggleActions: "restart none none none"
                }
            });

        gsap.fromTo(".customerSuccDivCard", {
            opacity: 0,
            y: 55,
            scale: 1.3
        },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
                scale: 1,
                scrollTrigger: {
                    trigger: ".customerSuccDivCard",
                    toggleActions: "restart none none none",
                    scrub: true
                }
            });

        return () => { };
    }, []);

    return (
        <div className='lg:mt-20 relative'>
            <div className='w-[95vw] mx-auto'>
                <div className="divider-line divider-top max-lg:hidden " style={{ top: '40px', width: '95vw', overflow: 'hidden' }} />
            </div>
            <div className="divider-line divider-left max-lg:hidden"></div>
        <div className='flex flex-col gap-8 justify-center items-center '>
            <div className='flex flex-col gap-1'>
                <div className='text-center maax-lg:pt-16 pt-20 overflow-hidden text-3xl quicksand-bold text-[wheat] customerHeadHome relative'>
                    Success stories
                </div>
                <div className='flex justify-center items-center'>
                    <hr className='bg-purple-600 border-none h-[10px] min-w-[100px] max-w-[150px] w-[16%] items-center' size="2" />
                </div>
            </div>
            <div className='flex justify-center'></div>
            <div className="card flex glass w-[70%] max-md:w-[80%] customerSuccDivCard max-w-[1300px] mx-auto">
                <div className='card-body flex sm:flex-row max-sm:flex-col-reverse justify-center max-sm:gap-5 gap-20'>
                    <div className="w-[40%] max-sm:w-[100%] flex flex-col gap-20 max-sm:gap-5">
                        <h2 className="tracking-tight max-sm:tracking-normal max-sm:text-center leading-[70px] max-lg:text-[3em] max-sm:text-[2.5em] max-lg:leading-[30px] text-white text-[5em] quicksand-bold">Customer success</h2>
                        <p className='text-3xl quicksand-semibold max-sm:text-center max-sm:text:sm max-lg:text-xl'>Combining technical content with SEO to drive real growth for your startup!</p>
                        <div className="card-actions justify-start max-sm:justify-center">
                            <button className="btn btn-primary rounded-[20px] bg-[#282A3F] text-white font-bold border-none p-7 flex flex-col justify-center tracking-wider hover:bg-[#282A3F] quicksand-semibold" onClick={() => router.push("/customers")}>Browse Customers</button>
                        </div>
                    </div>
                    <div className="w-[60%] max-sm:w-[100%] max-sm:text-center flex flex-col pl-5 max-sm:p-0 flex-1 gap-5">
                        {statistics}
                        <div>
                            {customerQuote}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};

export default CustomerSucc;
