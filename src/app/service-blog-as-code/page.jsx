'use client'
import ReadyToStart from '@/Components/HomePage/ReadyToStart'
import React, { useEffect, useContext, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
import { Carousel } from 'antd';
import AppContext from '@/context/Infracontext'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);
import Image from 'next/image'
import HowWorks from '@/Components/HomePage/HowWorks'
import Link from 'next/link'
import { OrbitingCirclesDemo } from '@/Components/HomePage/OrbitTime'
import { BorderBeam } from '@/Components/ui/border-beam'
import { Badge, Card, Space } from 'antd';

import postMetaData from '../../../posts/_postMetadata'
import authorData from '../../../posts/_authorData';


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


const PageCard = ({ ind = 1, data = { data } }) => {
    return (
        <div className={`p-10 max-lg:p-4 gap-10 ${ind % 2 == 0 ? 'flex' : 'flex flex-row-reverse'} max-md:flex-col`}>
            <div className='w-1/2 max-md:w-full flex flex-col justify-center'><Image loading='lazy' width={703} height={400} className='rounded-lg p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200' src={data.imgLink} alt="Ratio is 1.7589" /></div>
            <div className={`w-[40%] max-md:w-full max-lg:w-1/2 flex flex-col justify-center serviceasblogcard card-${ind}`}>
                <div className='h-[80%] max-lg:h-full flex flex-col justify-center gap-5 max-lg:gap-2'>
                    <div><h2 className='quicksand-bold text-[3em] max-lg:text-[2em] leading-[45px] max-md:text-center' dangerouslySetInnerHTML={{ __html: data.hTag }}></h2></div>
                    <div><p className='quicksand-medium max-lg:text-[0.8em] max-md:text-[1.2em] max-md:text-center'>{data.pTag}</p></div>
                </div>
            </div>
        </div>
    )
}

const dataService = [
    {
        imgLink: "/blog_as_service/1.png",
        hTag: "<p>Understanding Challenges & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Keyword Discovery</span></p>",
        pTag: "After working with over 30 customers, we found that the real challenge is not just creating content, but identifying the right topics and keywords that resonate with your developer audience. To solve this, we align with your startup's goals and conduct targeted keyword research, focusing on terms with the right monthly search volumes (MSVs) to help your blog rank on the first page. Our engineer-authored blogs ensure technical accuracy and real-world insights, delivering value to both experts and those seeking deeper knowledge."
    },
    {
        imgLink: "/blog_as_service/2.png",
        hTag: "<p>Outline Generation & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Content Creation</span></p>",
        pTag: "A solid outline is key to producing effective technical content, guiding logical flow and clarity. After identifying the right keywords, we craft a detailed outline with optimal headings, long-tail and short-tail keywords, and relevant Google-asked questions. We also plan the ideal number of images to boost engagement. With this outline, our engineers create content tailored for both on-page SEO and community engagement, whether for your website or platforms like Dev.to, Medium, or Reddit, delivering valuable insights that resonate with your audience."
    },
    {
        imgLink: "/blog_as_service/3.jpg",
        hTag: "<p>Content Delivery & <span class='bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent'>Metrics Analysis</span></p>",
        pTag: "Once the content is ready, we deliver it along with a comprehensive analysis of key metrics. This includes not only tracking the content's performance in terms of SEO and engagement but also evaluating specific aspects like website traffic and SERP rankings. Our content features focused on hands-on examples, such as integrating your product with a Java SDK or utilizing your observability product alongside open-source monitoring tools. Our goal is to continuously refine our strategy based on these real-time results, driving ongoing improvements in visibility and reach."
    },
]

const serviceArr = [
    {
        head: "Worked",
        para: "Worked with 15+ early-stage startups, helping them fuel website traffic with our proven technical content in the form of blogs as code",
        percent: 15,
        percentPara: "early-stage startups"
    },
    {
        head: "SEO",
        para: "Consistently assisted customers get ranked on the first page of the SERP and fuel their website traffic, delivering a 15% increase in traffic to their site with a significant portion coming directly from our SEO efforts.",
        percent: 15,
        percentPara: "Increase in website traffic"
    },
    {
        head: "Case Studies",
        para: "According to a study by Hubspot, Companies that blog consistently see 55% more website visitors than those who do not leverage this approach.",
        percent: 55,
        percentPara: "more website visitors"
    }
]

const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const page = () => {

    const context = useContext(AppContext)

    const { setProgress, progress } = context
    const serviceMemoArr = useMemo(() => serviceArr, [serviceArr])
    const dataMemoArr = useMemo(() => dataService, [dataService])

    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        const sorted = [...postMetaData].sort((a, b) => {
            const dateA = new Date(a.publishedOn).getTime();
            const dateB = new Date(b.publishedOn).getTime();
            return dateB - dateA; // Sorts in descending order (newest first)
        });
        setSortedPosts(sorted);
    }, []);

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
        <div className=' max-w-[1560px] mx-auto overflow-hidden'>
            <div className="pt-40 space-y-9 relative blogDiv">
                <div className="whyinfra"></div>
                <div className="quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center"><h1 className="w-3/4 leading-[80px] max-sm:w-[95%] max-sm:leading-[69px]">Blog-As<span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">-Code</span></h1></div>

                <div className="text-center text-white quicksand-semibold flex justify-center"><p className="w-1/2 max-sm:w-[90%]">Your extended Developer Relations team to initiate conversations, increase user sign ups, and accelerate pipeline faster than ever before</p></div>
                <div className="flex justify-center"><Link href="/contact" className="btn bg-btnprimary hover:bg-btnprimaryhov text-white text-center relative z-[12px]">Get Started</Link></div>

            </div>
            <div>
                <HowWorks serviceArr={serviceMemoArr} isService={true} />
            </div>
            <div className='flex flex-col gap-10 pt-20'>
                {dataMemoArr.map((data, index) => {
                    return <PageCard ind={index} data={data} />
                })}
            </div>
            <div>
                <div className="pt-20 space-y-9 relative blogDiv">
                    <div className="whyinfra"></div>
                    <div className="quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center"><h2 className="w-3/4 leading-[80px] max-sm:w-[95%] max-sm:leading-[69px]"><span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">Distribute</span></h2></div>

                    <div className="text-center text-white quicksand-semibold flex justify-center"><p className="w-1/2 max-sm:w-[90%]">We distribute your content across key platforms like Reddit, Dev.to, and other developer communities, ensuring it reaches the right technical audience and drives engagement where it matters most.</p></div>

                    <div className='flex justify-center'>
                        <OrbitingCirclesDemo />
                    </div>

                </div>
            </div>
            <ReadyToStart />
            <div className='quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter text-center flex justify-center mb-5'><h2>Latest <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">Blog</span></h2></div>
            {/* <div className='flex justify-center flex-col items-center gap-5 mb-5'> */}
            <div className='w-[80%] mx-auto'>

                <Carousel autoplay className='hover:scale-105 transition-all pb-10'>
                    <Link target='_blank' href={`/blog/${postMetaData[postMetaData.length - 1].slug}`} className='flex max-lg:flex-col cursor-pointer gap-8 rounded-lg border-[#999] border-2 p-4'>
                        <Badge.Ribbon text="Latest" className='p-4'>
                            <div className='flex  max-lg:flex-col cursor-pointer gap-8 rounded-lg text-white '>


                                <div className='relative' ><Image
                                    loading="lazy"
                                    width={600}
                                    height={342}
                                    className='transition duration-150 cursor-pointer'
                                    src={postMetaData[postMetaData.length - 1].ogImage || "/blog_home/blog_home.png"}
                                    alt="infrasity"
                                    style={{ borderRadius: "7px" }}
                                />
                                    <BorderBeam size={250} duration={12} delay={9} />

                                </div>
                                <div className='flex flex-col justify-around max-lg:gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <div><h2 className='quicksand-bold'>{postMetaData[postMetaData.length - 1].title}</h2></div>
                                        <div><p className='quicksand-medium'>{postMetaData[postMetaData.length - 1].description}</p></div>
                                        <div className='text-[var(--blue)] bg-[#f5f4f7] rounded-full flex justify-center max-w-[100px] h-6 px-3 text-[12px] quicksand-semibold items-center'>
                                            <p className='text-black max-sm:text-xs quicksand-medium'>{postMetaData[postMetaData.length - 1].category}</p>
                                        </div>

                                    </div>
                                    <div className='flex items-center gap-5'>
                                        <img className='rounded-full' src={(() => {
                                            const author = authorData.find((element) => {
                                                return element.authorId === postMetaData[postMetaData.length - 1].authorId;
                                            });
                                            return `${author ? author.profilePic : '/svgPatterns/profile.svg'}`;
                                        })()}
                                            alt="" width={40} height={40} />

                                        {(() => {
                                            const author = authorData.find((element) => {
                                                return element.authorId === postMetaData[postMetaData.length - 1].authorId;
                                            });
                                            return <p className='quicksand-semibold'>{author ? author.name : 'Unknown Author'}</p>;
                                        })()}
                                        <p className='quicksand-light text-xs tracking-normal'>
                                            {monthArr[Number(postMetaData[postMetaData.length - 1].publishedOn.split("-")[1]) - 1]} {postMetaData[postMetaData.length - 1].publishedOn.split("-")[2]}, {postMetaData[postMetaData.length - 1].publishedOn.split("-")[0]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Badge.Ribbon>
                    </Link>
                    <Link target='_blank' href={`/blog/${postMetaData[postMetaData.length - 2].slug}`} className='flex max-lg:flex-col cursor-pointer gap-8 rounded-lg border-[#999] border-2 p-4 relative '>
                        <div className='flex  max-lg:flex-col cursor-pointer gap-8 rounded-lg text-white '>

                            <div className='relative' ><Image
                                loading="lazy"
                                width={600}
                                height={342}
                                className='transition duration-150 cursor-pointer'
                                src={postMetaData[postMetaData.length - 2].ogImage || "/blog_home/blog_home.png"}
                                alt="infrasity"
                                style={{ borderRadius: "7px" }}
                            />
                                <BorderBeam size={250} duration={12} delay={9} />

                            </div>
                            <div className='flex flex-col justify-around max-lg:gap-4'>
                                <div className='flex flex-col gap-3'>
                                    <div><h2 className='quicksand-bold'>{postMetaData[postMetaData.length - 2].title}</h2></div>
                                    <div><p className='quicksand-medium'>{postMetaData[postMetaData.length - 2].description}</p></div>
                                    <div className='text-[var(--blue)] bg-[#f5f4f7] rounded-full flex justify-center max-w-[100px] h-6 px-3 text-[12px] quicksand-semibold items-center'>
                                        <p className='text-black max-sm:text-xs quicksand-medium'>{postMetaData[postMetaData.length - 2].category}</p>
                                    </div>

                                </div>
                                <div className='flex items-center gap-5'>
                                    <img className='rounded-full' src={(() => {
                                        const author = authorData.find((element) => {
                                            return element.authorId === postMetaData[postMetaData.length - 2].authorId;
                                        });
                                        return `${author ? author.profilePic : '/svgPatterns/profile.svg'}`;
                                    })()}
                                        alt="" width={40} height={40} />

                                    {(() => {
                                        const author = authorData.find((element) => {
                                            return element.authorId === postMetaData[postMetaData.length - 2].authorId;
                                        });
                                        return <p className='quicksand-semibold'>{author ? author.name : 'Unknown Author'}</p>;
                                    })()}
                                    <p className='quicksand-light text-xs tracking-normal'>
                                        {monthArr[Number(postMetaData[postMetaData.length - 2].publishedOn.split("-")[1]) - 1]} {postMetaData[postMetaData.length - 2].publishedOn.split("-")[2]}, {postMetaData[postMetaData.length - 2].publishedOn.split("-")[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link target='_blank' href={`/blog/${postMetaData[postMetaData.length - 3].slug}`} className='flex max-lg:flex-col cursor-pointer gap-8 rounded-lg border-[#999] border-2 p-4 relative '>
                        <div className='flex  max-lg:flex-col cursor-pointer gap-8 rounded-lg text-white '>
                            <div className='relative' ><Image
                                loading="lazy"
                                width={600}
                                height={342}
                                className='transition duration-150 cursor-pointer'
                                src={postMetaData[postMetaData.length - 3].ogImage || "/blog_home/blog_home.png"}
                                alt="infrasity"
                                style={{ borderRadius: "7px" }}
                            />
                                <BorderBeam size={250} duration={12} delay={9} />

                            </div>
                            <div className='flex flex-col justify-around max-lg:gap-4'>
                                <div className='flex flex-col gap-3'>
                                    <div><h2 className='quicksand-bold'>{postMetaData[postMetaData.length - 3].title}</h2></div>
                                    <div><p className='quicksand-medium'>{postMetaData[postMetaData.length - 3].description}</p></div>
                                    <div className='text-[var(--blue)] bg-[#f5f4f7] rounded-full flex justify-center max-w-[100px] h-6 px-3 text-[12px] quicksand-semibold items-center'>
                                        <p className='text-black max-sm:text-xs quicksand-medium'>{postMetaData[postMetaData.length - 3].category}</p>
                                    </div>

                                </div>
                                <div className='flex items-center gap-5'>
                                    <img className='rounded-full' src={(() => {
                                        const author = authorData.find((element) => {
                                            return element.authorId === postMetaData[postMetaData.length - 3].authorId;
                                        });
                                        return `${author ? author.profilePic : '/svgPatterns/profile.svg'}`;
                                    })()}
                                        alt="" width={40} height={40} />

                                    {(() => {
                                        const author = authorData.find((element) => {
                                            return element.authorId === postMetaData[postMetaData.length - 3].authorId;
                                        });
                                        return <p className='quicksand-semibold'>{author ? author.name : 'Unknown Author'}</p>;
                                    })()}
                                    <p className='quicksand-light text-xs tracking-normal'>
                                        {monthArr[Number(postMetaData[postMetaData.length - 3].publishedOn.split("-")[1]) - 1]} {postMetaData[postMetaData.length - 3].publishedOn.split("-")[2]}, {postMetaData[postMetaData.length - 3].publishedOn.split("-")[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Carousel>
            </div>
            {/* </div> */}
        </div>
    )
}

export default page
