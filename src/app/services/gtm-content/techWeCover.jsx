import Image from "next/image";

export default function TechWeCover() {
    const techCategories = [
        { name: "IaC & Infra", position: "top-left" },
        { name: "SDKs & APIs", position: "top-right" },
        { name: "AI & Agent Platforms", position: "middle-left" },
        { name: "Auth & Identity", position: "middle-right" },
        { name: "Dev Environments", position: "bottom-left" },
        { name: "Observability", position: "bottom-right" }
    ];

    const TechCard = ({ name, position }) => (
        <div
            className={`
                absolute w-[180px] sm:w-[200px] lg:w-[235px] 
                h-[60px] sm:h-[70px] lg:h-[80px] 
                rounded-[10px] sm:rounded-[12px] lg:rounded-[15px] 
                flex items-center justify-start px-4 sm:px-5 lg:px-[30px]
                text-md sm:text-sm lg:text-[17px]
                ${position === 'top-left' ? 'top-2 sm:top-4 lg:top-8 left-2 sm:left-4 lg:left-0' : ''}
                ${position === 'top-right' ? 'top-2 sm:top-4 lg:top-8 right-2 sm:right-4 lg:right-0' : ''}
                ${position === 'middle-left' ? 'top-1/2 -translate-y-1/2 left-2 sm:left-4 lg:left-0' : ''}
                ${position === 'middle-right' ? 'top-1/2 -translate-y-1/2 right-2 sm:right-4 lg:right-0' : ''}
                ${position === 'bottom-left' ? 'bottom-2 sm:bottom-4 lg:bottom-6 left-2 sm:left-4 lg:left-0' : ''}
                ${position === 'bottom-right' ? 'bottom-2 sm:bottom-4 lg:bottom-6 right-2 sm:right-4 lg:right-0' : ''}
                z-20
            `}
            style={{
                background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                border: "2px solid #393a52",
                transition: "all 0.3s ease",
            }}
        >
            <p className="quicksand-semibold text-center leading-tight">{name}</p>
        </div>
    );

    return (
        <div className="px-4 sm:px-6 lg:px-8 mb-14">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center z-10 mb-8 sm:mb-12 lg:mb-16">
                <div className="quicksand-bold text-2xl sm:text-3xl lg:text-[30px] text-white mb-4 sm:mb-6">
                    <h2 className="leading-tight">
                        Tech we{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                            }}
                        >
                            Cover
                        </span>
                    </h2>
                </div>

                {/* Gradient Line */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div
                        className="w-[100px] sm:w-[124px] lg:w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    />
                </div>

                {/* Description */}
                <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] mx-auto">
                    <p className="text-sm sm:text-base lg:text-[17px] text-white leading-relaxed tracking-wide font-light">
                        We specialize in the technologies that power modern startups, from infrastructure to AI and developer tools.
                    </p>
                </div>
            </div>

            {/* Main Container */}
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-screen max-h-[475px] overflow-hidden">
                <div className="absolute inset-0">
                    {/* Line 1 */}
                    <div className="absolute top-1/3 mt-5 left-0 w-[300px] h-[0.5px]">
                        <div className="h-full bg-gradient-to-r from-transparent via-white to-white animate-[slideRight_3s_ease-out_infinite]"
                            style={{ width: '30%' }}></div>
                    </div>

                    {/* Line 2 */}
                    <div className="absolute top-1/3 mt-24 ml-14 left-0 w-[300px] h-[0.5px]">
                        <div className="h-full bg-gradient-to-r from-transparent via-white to-white animate-[slideRight_3s_ease-out_infinite]"
                            style={{ width: '25%' }}></div>
                    </div>
                </div>
                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute left-0 top-0 w-20 sm:w-40 lg:w-80 h-full bg-gradient-to-r from-black to-transparent" />
                    <div className="absolute right-0 top-0 w-20 sm:w-40 lg:w-80 h-full bg-gradient-to-l from-black to-transparent" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[300px] lg:w-[944px] h-[150px] lg:h-[515px] opacity-80">                        <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 944 515"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
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
                </div>

                {/*  Lines */}
                <div className="absolute inset-0">
                    {/* Top Line */}
                    <div className="absolute top-0 w-full h-[100px] sm:h-[150px] lg:h-[191px]">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 1440 191"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path d="M1 1.97771C134.878 131.987 282.966 189.658 474.434 189.658C665.902 189.658 730.223 189.658 967.311 189.658C1204.4 189.658 1347.63 95.651 1440 0.644287" stroke="url(#paint0_linear_913_2285)" strokeWidth="1" />
                            <defs>
                                <linearGradient id="paint0_linear_913_2285" x1="1440.32" y1="235.826" x2="1.30177" y2="235.827" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#992BDC" />
                                    <stop offset="1" stopColor="#4056C0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Middle Line */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full">
                        <svg width="100%" height="2" viewBox="0 0 1439 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.07397H1439" stroke="url(#paint0_linear_913_2310)" strokeWidth="1" />
                            <defs>
                                <linearGradient id="paint0_linear_913_2310" x1="1439.32" y1="1.33633" x2="0.301746" y2="1.33649" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#992BDC" />
                                    <stop offset="1" stopColor="#4056C0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Bottom Line */}
                    <div className="absolute bottom-0 w-full h-[100px] sm:h-[150px] lg:h-[191px]">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 1440 191"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
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

                {/* Tech Cards */}
                {techCategories.map((tech, index) => (
                    <TechCard key={index} name={tech.name} position={tech.position} />
                ))}

                {/* Logo */}
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-full">
                        <Image
                            width={180}
                            height={180}
                            src="/logodata/infrasity_logo.png"
                            alt="Infrasity Logo"
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-200%);
            opacity: 1;
          }
          100% {
            transform: translateX(100vw);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}