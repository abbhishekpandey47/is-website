import Image from "next/image";

export default function TechWeCover() {
    return (
        <div className="p-8 pb-10 md:p-[2rem]" >
            <div className="max-w-7xl mx-auto text-center  z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        Tech we{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                            }}
                        >Cover</span>{" "}
                    </h2>
                </div>

                <div class="flex justify-center my-6 mb-8">
                    <div class="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    ></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[18px] md:text-[17px] text-white leading-relaxed tracking-wide font-light">
                        We specialize in the technologies that power modern startups, from <br /> infrastructure to AI and developer tools.
                    </p>
                </div>
            </div>

            <div className="relative w-full h-screen overflow-hidden -mt-40">
                <div className="absolute inset-0">

                    <div className="absolute inset-0 pointer-events-none z-10">
                        {/* Left fade */}
                        <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-black to-transparent"></div>
                        {/* Right fade */}
                        <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-black to-transparent"></div>
                    </div>

                    <div className="absolute inset-0 mb-32 flex items-center justify-center">
                        <svg width="944" height="515" viewBox="0 0 944 515" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_913_2290)">
                                <path d="M472 320.199C625.117 320.199 749.243 292.243 749.243 257.756C749.243 223.27 625.117 195.313 472 195.313C318.883 195.313 194.757 223.27 194.757 257.756C194.757 292.243 318.883 320.199 472 320.199Z" fill="#232DE3" />
                            </g>
                            <defs>
                                <filter id="filter0_f_913_2290" x="-0.00267029" y="0.553482" width="944.005" height="514.406" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="97.38" result="effect1_foregroundBlur_913_2290" />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    <div className="absolute top-0 w-full">
                        <svg width="1440" height="191" viewBox="0 0 1440 191" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path d="M1 1.97771C134.878 131.987 282.966 189.658 474.434 189.658C665.902 189.658 730.223 189.658 967.311 189.658C1204.4 189.658 1347.63 95.651 1440 0.644287" stroke="url(#paint0_linear_913_2285)" strokeWidth="1" />
                            <defs>
                                <linearGradient id="paint0_linear_913_2285" x1="1440.32" y1="235.826" x2="1.30177" y2="235.827" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#992BDC" />
                                    <stop offset="1" stopColor="#4056C0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Middle Horizontal Line */}
                    <div className="absolute top-1/2 -mt-20 transform -translate-y-1/2 w-full">
                        <svg width="1439" height="2" viewBox="0 0 1439 2" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                            <path d="M0 1.07397H1439" stroke="url(#paint0_linear_913_2310)" strokeWidth="1" />
                            <defs>
                                <linearGradient id="paint0_linear_913_2310" x1="1439.32" y1="1.33633" x2="0.301746" y2="1.33649" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#992BDC" />
                                    <stop offset="1" stopColor="#4056C0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Bottom Curved Line */}
                    <div className="absolute bottom-0 mb-40 w-full">
                        <svg width="1440" height="191" viewBox="0 0 1440 191" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path d="M1 189.17C134.878 59.1609 282.966 1.48975 474.434 1.48975C665.902 1.48975 730.223 1.48975 967.311 1.48975C1204.4 1.48975 1347.63 95.4968 1440 190.504" stroke="url(#paint0_linear_913_2311)" strokeWidth="1" />
                            <defs>
                                <linearGradient id="paint0_linear_913_2311" x1="1440.32" y1="-44.1862" x2="1.30174" y2="-44.1861" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#992BDC" />
                                    <stop offset="1" stopColor="#4056C0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                </div>
                <div className="absolute bottom-0 flex justify-center items-center w-full mb-28">
                    <div className="w-[180px] h-[180px] flex items-center justify-center bg-white rounded-full">
                        <Image
                            width={160}
                            height={160}
                            src="/logodata/infrasity_logo.png"
                            alt="Infrasity Logo"
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}