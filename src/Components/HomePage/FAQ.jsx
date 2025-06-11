
import React, { useMemo, useState } from 'react'
import Link from 'next/link';


const collapseContent = [
    {
        head: "What services does Infrasity offer?",
        content: "Infrasity offers a comprehensive range of technical content writing services designed for engineering startups. This includes technical articles, case studies, whitepapers, SEO-driven blogs, product documentation, and video content creation. We specialize in creating high-quality, organic content that resonates with the desired audience, helping startups stand out and drive growth.",
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
                <a href="https://infrasity.com/blog" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Blog</a>
            </span><br />
            <span style={{ tabSize: 4 }}>
                <a href="https://dev.to/infrasity-learning" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Dev.to</a>
            </span> */}
        </div>),
        opened: false
    },
]

function FAQ() {
    const [collapseArr, setCollapseArr] = useState(collapseContent)
    const memoCollapseArr = useMemo(() => collapseArr, [collapseArr]);

    return (
        <div className='relative lg:mt-20'>
            <div className='w-[95vw] mx-auto'>
                <div className="divider-line divider-top max-lg:hidden " style={{ top: '40px', width: '95vw', overflow: 'hidden' }} />
            </div>
            <div className="divider-line divider-left max-lg:hidden"></div>
            <div className=' max-w-[1566px] mx-auto'>
                <div className="relative addGrid2">
                    <div>
                        <div className='pt-10'>
                            <div className="whyinfra"></div>
                            <div className=" relative text-white text-center max-xs:text-3xl max-lg:text-5xl text-[3em] quicksand-bold mx-16">
                                <div className='lg:pt-10'>Frequently Asked <span className="specialtext">Questions</span></div>

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
                                <label htmlFor={`FAQ${index}`} className="sr-only">{item.head}</label>
                                <input type="checkbox" id={`FAQ${index}`} />
                                <div className="collapse-title text-xl quicksand-semibold">{item.head}</div>
                                <div className="collapse-content">
                                    <div className="quicksand-light">{item.content}</div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="whyinfra z-[0] "></div>
                </div>
                <div className='flex flex-col justify-center gap-5 items-center pt-12'>
                    <Link href="/faq" onClick={(() => { checkVisitPage("/faq") })} className="btn bg-btnprimary text-white hover:bg-btnprimaryhov quicksand-semibold" >SEE MORE FAQ</Link>
                </div>
            </div>
        </div>
    )
}

export default FAQ
