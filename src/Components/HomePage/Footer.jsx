import { GithubOutlined, InstagramOutlined, LinkedinOutlined, SlackOutlined, XOutlined, YoutubeFilled } from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-zing-800 backdrop-blur-lg py-4 px-4 mt-8 text-white flex justify-center flex-col w-full opacity-1 footerClassHome">
            <div className='flex flex-col gap-[8vh]'>
                <div className="max-w-7xl justify-between lg:pl-5 mx-auto flex flex-wrap items-start w-full border-t border-[#999] pt-12 max-lg:flex-col max-lg:gap-10 max-sm:gap-16">
                    <div className='flex max-sm:flex-col max-sm:w-full w-[65%]  max-sm:gap-16 max-lg:w-full max-lg:text-center '>
                        <div className="flex w-[65%] flex-col max-sm:w-full max-lg:w-1/2 items-start space-y-4 max-lg:items-center">
                            <Image height={640} width={131} loading='lazy' src="/logodata/infrasity_logo.png" alt="Infra Logo" className="w-[30%]" />
                            <p className="w-2/3">Amplifying product visibility through technical content and SEO that drives awareness and boosts search rankings.
                            </p>
                            <div className="flex gap-x-4 max-lg:w-full max-lg:justify-center">
                                <Image loading='lazy' width={100} height={100} src="/awards/color-badge.svg" alt="AICPA SOC" className="h-20 max-sm:h-16" />
                                <Image loading='lazy' width={100} height={100} src="/awards/clutch.svg" alt="GDPR" className="h-20 max-sm:h-16" />
                            </div>
                            <a href="https://www.producthunt.com/posts/infrasity-outline-generator-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-infrasity&#0045;outline&#0045;generator&#0045;2" target="_blank" class="inline-block">
                                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=544443&theme=light" alt="Infrasity Outline Generator - Assisting Engineering Startups with tech Content | Product Hunt" class="w-[250px] h-[54px]" />
                            </a>
                        </div>
                        <div className="flex max-sm:w-full flex-col w-[35%] max-lg:w-1/2 lg:pl-5">
                            <h1 className="font-semibold  mb-2">Services</h1>
                            <ul className="space-y-4 flex flex-col ">
                                <li><a href="/service-blog-as-code" className="hover:underline">Blogs-as-code at scale</a></li>
                                {/* <li><a href="/tutorials" className="hover:underline">Tutorials</a></li> */}
                                <li><a href="/service-video-production" className="hover:underline">Video Production</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex w-[25%] max-sm:w-full max-lg:text-center justify-end max-lg:w-full max-lg:justify-around'>
                        <div className='flex lg:gap-20 max-sm:gap-16 max-sm:flex-col max-lg:w-full'>
                            <div className="flex flex-col w-1/2 max-sm:w-full">
                                <h1 className="font-bold  mb-2">Resources</h1>
                                <ul className="space-y-4 ">
                                    <li><a href="/" className="hover:underline">Home</a></li>
                                    <li><a href="/blog" className="hover:underline">Blog</a></li>
                                    <li><a href="/faq" className="hover:underline">FAQ</a></li>
                                    <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="flex flex-col w-1/2 max-lg:text-center max-sm:w-full">
                                <h1 className="font-bold  mb-2">Follow us</h1>
                                <ul className="space-y-4 ">
                                    <li><a href="https://www.youtube.com/@Infrasity" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span><YoutubeFilled /> </span>Youtube</a></li>
                                    <li><a href="https://x.com/InfrasityHub" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span><XOutlined /> </span> X</a></li>
                                    <li><a href="https://www.linkedin.com/company/infrasity/" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span><LinkedinOutlined /> </span> LinkedIn</a></li>
                                    <li><a href="https://www.instagram.com/infrasity/" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span><InstagramOutlined /> </span> Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t w-full border-[#999] mt-8 pt-4 text-sm flex items-center max-w-7xl mx-auto">
                    <div className="flex max-xs:text-xs max-xs:flex-col gap-1 w-1/2"><div>© 2024 Infrasity.</div> <div>All rights reserved.</div></div>
                    <div className="flex max-xs:text-xs max-sm:flex-col w-1/2 justify-end items-end max-sm:gap-1 gap-3">
                        {/* <a href="#" className="hover:underline">Privacy Policy</a> */}
                        <Link href="/privacy-policy" className="hover:underline" >Privacy Policy</Link>
                        <Link href="/terms-of-services" className="hover:underline" >Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
