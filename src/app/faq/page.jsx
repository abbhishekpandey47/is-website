'use client'
import React, { useMemo, useState, useContext, useEffect } from 'react'
import Link from 'next/link';
import AppContext from '@/context/Infracontext'


const collapseContent = [
    {
        head: "does Infrasity offer?",
        content: "Infrasity specializes in content marketing for tech businesses which includes technical articles, case studies, whitepapers, SEO-driven blogs, product documentation, and video content creation. We specialize in creating high-quality, organic content that resonates with the desired audience, helping startups stand out and drive growth.",
        opened: false
    },
    {
        head: "Who creates the content at Infrasity, and how do you ensure its technical accuracy?",
        content: "Our content is crafted by in-house engineers who actively work with the technologies they write about. This means the content comes from real-world experience, ensuring that everything we produce is technically sound and up to date. Our team makes sure every piece of content is not only accurate but also insightful.",
        opened: true
    },
    {
        head: "How does Infrasity help companies grow through content marketing?",
        content: "We focus on merging technical depth with strategic SEO, making sure that your content is not just informative but also ranks well and attracts the right audience. Through organic, well-researched content, we help you build authority in your industry, engage your target audience, and ultimately drive leads and conversions.",
        opened: false
    },
    {
        head: "How do you ensure SEO optimization in the content?",
        content: "We conduct thorough keyword research, optimize meta tags, structure content for readability, and include relevant internal and external links. Our goal is to ensure that the content performs well in search engines while delivering value to your audience.",
        opened: false
    },
    {
        head: "Can I see some examples of Infrasity's work?",
        content: (<div>Yes, definitely! We proudly showcase our work on various platforms. You can find our technical write-ups and articles on the Infrasity website, as well as on popular platforms like dev.to and Medium. For video content, visit our YouTube channel to view a range of tutorials and presentations. Additionally, our IAC repositories and product templates are available on our GitHub page, demonstrating our expertise in practical applications.<br></br>
            {/* <span style={{ tabSize: 4 }}>
                <Link href="/blog" style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Blog</Link>
            </span><br />
            <span style={{ tabSize: 4 }}>
                <a href="https://dev.to/infrasity-learning" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Dev.to</a>
            </span> */}
        </div>),
        opened: false
    },
    {
        head: "What is the process for collaborating with your team on a content project?",
        content: "We like to keep things simple and transparent. Once you reach out, we’ll have an initial discussion to understand your needs, goals, and audience. From there, we’ll provide a tailored content plan, collaborate on outlines, and keep you updated through every stage of the content creation process, ensuring we align with your vision.",
        opened: false
    },
    {
        head: "What industries and verticals do you specialize in?",
        content: "Our expertise spans across several verticals in the tech space, including DevOps, MLOps, Kubernetes management, Web3, and Blockchain, among others. We work with growth stage and Y Combinator startups in SaaS B2B space to help them grow their user base through tailored content strategies.",
        opened: false
    },
    {
        head: "What is your typical turnaround time for content creation?",
        content: "Depending on the complexity of the project, we typically deliver content within 5-10 business days.",
        opened: false
    },
    {
        head: "Can I see samples of previous work?",
        content: "We’re happy to share samples of our past projects. Just let us know the type of content you're interested in, and we’ll provide examples that best showcase our work.",
        opened: false
    },
    {
        head: "What is the process for collaborating with your team on a content project?",
        content: "We like to keep things simple and transparent. Once you reach out, we’ll have an initial discussion to understand your needs, goals, and audience. From there, we’ll provide a tailored content plan, collaborate on outlines, and keep you updated through every stage of the content creation process, ensuring we align with your vision.",
        opened: false
    },
    {
        head: "What industries and verticals do you specialize in?",
        content: "Our expertise spans across several verticals in the tech space, including DevOps, MLOps, Kubernetes management, Web3, and Blockchain, among others. We work with growth stage and Y Combinator startups in SaaS B2B space to help them grow their user base through tailored content strategies.",
        opened: false
    },
    {
        head: "How are the success metrics of the content measured?",
        content: "We assess the success of the content by tracking several key metrics. This includes monitoring growth in user signups, which shows how well the content is driving engagement and converting visitors into customers. We also track an increase in web traffic, signaling that the blog is effectively attracting a larger audience. Moreover, our team continuously works to ensure that your blog ranks on the first page of the search engine results, further solidifying its online presence.",
        opened: false
    },
    {
        head: "Do you create technical explainer videos?",
        content: "Yes, we specialize in creating technical explainer videos. These videos break down complex concepts into easily digestible formats, crafted by engineers who ensure technical accuracy. This guarantees that the content is not only easy to follow but also provides real value to your audience, helping them better understand your product or service.",
        opened: false
    },
    {
        head: "What happens after the content is published?",
        content: "Once the content goes live, we shift our focus to engaging with the developer community. Platforms like Reddit, Dev.to, and Hackernews are key spaces where we share your content, ensuring it resonates with the right audience. This not only enhances your brand’s visibility but also helps build authority within your niche, creating a lasting impact and expanding the reach of your blog posts.",
        opened: false
    },
    {
        head: "How does Infrasity help companies grow through content marketing?",
        content: "Infrasity acts as a Fractional CMO for your company, merging technical expertise with strategic content marketing to fuel growth. We position ourselves as an extended part of your team, taking ownership of creating high-quality, SEO-driven content that not only informs but also ranks well and attracts the right audience. Our engineer-led approach ensures that each piece resonates with your target market, building authority and trust within your industry. By leveraging well-researched, organic content, we help drive traffic, generate leads, and increase conversions, all while scaling your content needs as you grow.",
        opened: false
    },
]

function page() {
    const [collapseArr, setCollapseArr] = useState(collapseContent)
    const memoCollapseArr = useMemo(() => collapseArr, [collapseArr]);

    const context = useContext(AppContext)

    const { setProgress, progress } = context


    useEffect(() => {

        setProgress(100)

        return () => {

        }
    }, [])

    return (
        <div className='relative pt-20 mt-0'>
            <div className=' max-w-[1566px] mx-auto'>
                <div className="relative addGrid2">
                    <div>
                        <div className='pt-10'>
                            <div className="whyinfra"></div>
                            <div className=" relative text-white text-center max-xs:text-3xl max-lg:text-5xl text-[3em] quicksand-bold mx-16">
                                <h1 className="lg:pt-10"> Frequently Asked <span className="specialtext">Questions</span> </h1>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-center text-[wheat] pt-5 w-2/3 quicksand-semibold max-lg:w-3/4">
                                Send any questions to <a href="mailto:contact@infrasity.com" style={{ color: "white" }} className='italic href-blue hover:underline relative z-[1]'>contact@infrasity.com</a> or jump on a quick call with us.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-12 mx-72 max-2xl:mx-48 max-lg:mx-40 max-md:mx-28 max-sm:mx-5 relative z-[2]">
                    {memoCollapseArr.map((item, index) => {
                        return (
                            <div key={index} className="collapse cursor-pointer collapse-arrow bg-[#888]/20 backdrop-blur-sm ring-1 ring-black/5 relative z-[5]">
                                <input type="checkbox" id={`FAQ${index}`} />
                                <div className="collapse-title text-xl quicksand-semibold">{item.head}</div>
                                <div className="collapse-content">
                                    <div className="quicksand-light">{item.content}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="whyinfra z-[0] "></div>
                </div>
                <div className='flex flex-col justify-center gap-5 items-center pt-12'>
                    <Link href="/" onClick={(() => { checkVisitPage("/") })} className="btn bg-btnprimary text-white hover:bg-btnprimaryhov quicksand-semibold">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default page
