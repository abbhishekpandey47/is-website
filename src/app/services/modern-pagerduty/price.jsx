"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Price = () => {
    return (
        <section className="bg-[#222838] text-black">
            <div className="font-[quicksand] py-20 container mx-auto flex flex-col lg:flex-row items-center max-w-[1040px]">
                <div
                    className="lg:mr-16 flex flex-col items-center lg:items-start text-center lg:text-left"
                >

                    <h3 className="text-3xl md:text-4xl font-bold text-white w-full max-w-[777px] leading-snug">
                        Save big with
                        <br />
                        Better Stack
                    </h3>

                    <p className="text-[#939db8] mt-5 text-xl max-w-[387px] lg:max-w-[337px]">
                        Better Stack replaces a bunch of existing tools. See how our fixed
                        price for a team of 6 compares with PagerDuty, Pingdom, and
                        Statuspage.io.
                    </p>

                    <Link
                        href="/pricing"
                        className="block mt-11 text-[#939db8] font-medium text-deprecated-secondary-royal-purple"
                    >
                        See pricing{" "}
                        <svg
                            className="w-4 h-4 inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#939db8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="mt-16 lg:mt-0 flex flex-col sm:flex-row items-center">
                    <div className="p-2 bg-[#293040] rounded-xl flex flex-col items-center flex-1 w-full max-w-[315px] sm:w-[340px]">
                        <div className="self-stretch bg-[#222838] rounded-lg flex items-center px-[14px] py-[10px]">
                            <Image
                                className="mr-[10px]"
                                width={40}
                                height={40}
                                src="https://betterstackcdn.com/assets/uptime/homepage/pagerduty-004763430ee12f5e557fe651c648f975272e2a57ccd517f1ddc415dce176ca85.png"
                                alt="PagerDuty"
                            />
                            <div>
                                <div className="font-bold text-white">PagerDuty</div>
                                <p className="text-[14px] text-[#939db8]">Incident management</p>
                            </div>
                        </div>

                        <div className="relative z-10 bg-[#293040] rounded-full font-bold text-white -mt-2 flex justify-center items-center pb-[2px] w-[22px] h-[22px]">
                            +
                        </div>

                        <div className="-mt-2 self-stretch bg-[#222838] rounded-lg flex items-center px-[14px] py-[10px]">
                            <Image
                                className="mr-[10px]"
                                width={40}
                                height={40}
                                src="https://betterstackcdn.com/assets/uptime/homepage/pingdom-03e9b0d738e6f34da6ccc19dd84b446adb71a68e94d48896564df2f87f1b4268.png"
                                alt="Pingdom"
                            />
                            <div>
                                <div className="font-bold text-white">Pingdom</div>
                                <p className="text-[14px] text-[#939db8]">Uptime monitoring</p>
                            </div>
                        </div>

                        <div className="relative z-10 bg-[#293040] rounded-full font-bold text-white -mt-2 flex justify-center items-center pb-[2px] w-[22px] h-[22px]">
                            +
                        </div>

                        <div className="-mt-2 self-stretch bg-[#222838] rounded-lg flex items-center px-[14px] py-[10px]">
                            <Image
                                className="mr-[10px]"
                                width={40}
                                height={40}
                                src="https://betterstackcdn.com/assets/uptime/homepage/statuspage-io-23fae4daca1a688b6733b96918850705be8142933c895a187d437ab1cfbf8dfe.png"
                                alt="Statuspage.io"
                            />
                            <div>
                                <div className="font-bold text-white">Statuspage.io</div>
                                <p className="text-[14px] text-[#939db8]">Branded status page</p>
                            </div>
                        </div>

                        <div className="relative z-10 bg-[#293040] rounded-full font-bold text-white -mt-2 flex justify-center items-center pb-[2px] w-[22px] h-[22px]">
                            =
                        </div>

                        <figure className="mt-6 text-white flex items-baseline space-x-1">
                            <span className="text-base font-bold relative lg:bottom-4">$</span>
                            <span className="text-3xl font-bold">673</span>
                            <span className="font-bold">/mo</span>
                        </figure>

                        <p className="mb-8 text-[14px] text-center max-w-[210px] text-[#939db8]">
                            6 team members, 60 monitors,
                            and 2,000 subscribers
                        </p>
                    </div>

                    <div className="sm:-ml-10 sm:mt-0 p-1 sm:pt-3 bg-white rounded-xl text-neutral-300 flex-1 max-w-[340px] w-[340px] sm:w-auto">
                        <div className="mt-8 flex justify-center text-[#1F2433] font-bold text-xl">
                            Better Stack
                        </div>

                        <div className="mt-10 px-5 flex items-start text-base">
                            <Image
                                alt=""
                                width={22}
                                height={22}
                                className="mt-[2px]"
                                src="https://betterstackcdn.com/assets/uptime/homepage/check-7617462b9dff590330c94528daf76fe6abd6ef0e7256009f73c31dbb69dea836.svg"
                            />
                            <div className="ml-2 text-[#646e87] text-[14px]">Incident management with on-call</div>
                        </div>

                        <div className="mt-5 px-5 flex items-start text-base">
                            <Image
                                alt=""
                                width={22}
                                height={22}
                                className="mt-[2px]"
                                src="https://betterstackcdn.com/assets/uptime/homepage/check-7617462b9dff590330c94528daf76fe6abd6ef0e7256009f73c31dbb69dea836.svg"
                            />
                            <div className="ml-2 text-[#646e87] text-[14px]">Uptime monitoring built-in</div>
                        </div>

                        <div className="mt-5 px-5 flex items-start text-base">
                            <Image
                                alt=""
                                width={22}
                                height={22}
                                className="mt-[2px]"
                                src="https://betterstackcdn.com/assets/uptime/homepage/check-7617462b9dff590330c94528daf76fe6abd6ef0e7256009f73c31dbb69dea836.svg"
                            />
                            <div className="ml-2 text-[#646e87] text-[14px] mb-6">
                                Branded status page on your own sub-domain status.domain.com
                            </div>
                        </div>


                        <div className="bg-[#f4f5f8] py-3 bg-neutral-40 rounded-xl flex flex-col items-center">
                            <figure className="mt-6 text-black flex items-baseline space-x-1">
                                <span className="text-base text-black font-bold relative lg:bottom-4">$</span>
                                <span className="text-3xl text-black font-bold">673</span>
                                <span className="font-bold text-black">/mo</span>
                            </figure>

                            <p className="text-[14px] text-[#646e87] text-center max-w-[210px]">
                                6 team members, 60 monitors, and 2,000 subscribers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Price;
