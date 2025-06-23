import React from 'react';

export default function FireflyClone() {
    return (
        <div className="min-h-screen bg-black overflow-hidden relative">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
                        Case Study
                    </h2>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        See how we've helped dev tools reach millions of developers organically.
                    </p>
                </div>
            </div>

            <div className="relative z-10 pt-4 px-8">
                {/* Top Stats */}
                <div className="flex justify-center items-center mb-16">
                    <div className="flex items-center space-x-14">
                        <div className="text-left">
                            <div className="quicksand-semibold text-[22px] font-bold text-[#6b5be7] mb-1 tracking-tight">3</div>
                            <div className="text-gray-300 text-base leading-tight">Threads</div>
                            <div className="text-gray-300 text-base leading-tight">Top Ranked</div>
                        </div>

                        <div className="w-[1.5px] h-16 bg-gray-500"></div>

                        <div className="text-left">
                            <div className="quicksand-semibold text-[22px] font-bold text-[#6b5be7] mb-1 tracking-tight">600+</div>
                            <div className="text-gray-300 text-base leading-tight">Reddit visits in</div>
                            <div className="text-gray-300 text-base leading-tight">3weeks</div>
                        </div>

                        <div className="w-[1.5px] h-16 bg-gray-500"></div>

                        <div className="text-left">
                            <div className="quicksand-semibold text-[22px] font-bold text-[#6b5be7] mb-1 tracking-tight">√⌐</div>
                            <div className="text-gray-300 text-base leading-tight">Active in drift detection</div>
                            <div className="text-gray-300 text-base leading-tight">conversations</div>
                        </div>
                    </div>
                </div>

                {/* Main Card Container */}
                <div className="flex justify-center mb-12">
                    <div className="relative max-w-3xl w-full">
                        {/* Card with rounded corners and gradient */}
                        <div
                            className="relative rounded-3xl overflow-hidden"

                        >
                            {/* Inner gradient overlay */}
                            <div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                                    border: "1.5px solid #393a52",
                                    transition: "all 0.3s ease",
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 px-10 py-6">
                                {/* Logo */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg width="50%" height="50%" fill="none" viewBox="0 0 48 36"
                                        >
                                            <path d="M42.665 10.146a1.022 1.022 0 0 0-1.019-.996H26.88a5.64 5.64 0 0 0-5.546-4.586 5.64 5.64 0 0 0-5.547 4.586H1.02c-.557 0-1.007.439-1.019.996 0 .142-.047 3.46 2.809 6.376.972.995 2.157 1.813 3.543 2.453-.853 2.24-1.09 4.681-.734 7.3.059.416.367.747.77.842.107.024 2.536.605 5.7 0 1.103-.213 2.37-.58 3.686-1.232.984 2.607 2.714 4.657 5.05 5.985.153.094.33.13.509.13.178 0 .343-.047.51-.13 2.334-1.328 4.064-3.378 5.048-5.985a14.458 14.458 0 0 0 3.686 1.232c1.078.202 2.074.273 2.915.273 1.636 0 2.714-.261 2.785-.273.403-.095.712-.438.77-.841.368-2.62.12-5.06-.734-7.3 1.387-.64 2.56-1.47 3.544-2.454 2.856-2.915 2.808-6.246 2.808-6.376ZM21.333 6.59a3.586 3.586 0 0 1 3.496 2.774 6.15 6.15 0 0 0-3.496 2.512 6.188 6.188 0 0 0-3.496-2.512 3.586 3.586 0 0 1 3.496-2.774Zm-17.03 8.545c-1.423-1.434-1.956-2.974-2.146-3.946H12.93c-2.003 1.35-3.615 2.868-4.812 4.527-.332.462-.64.936-.912 1.422-1.138-.545-2.11-1.22-2.904-2.003Zm7.49 9.967c-1.826.356-3.378.261-4.232.154-.177-1.979.06-3.84.7-5.546 1.896.604 4.1.936 6.577 1.02a16.6 16.6 0 0 0 .356 3.187 12.722 12.722 0 0 1-3.402 1.185Zm9.54 4.694c-1.766-1.15-3.034-2.821-3.757-4.966a15.624 15.624 0 0 0 3.757-3.674 15.624 15.624 0 0 0 3.757 3.674c-.723 2.145-1.991 3.816-3.757 4.966Zm5.44-11.081c-.285 0-.558.118-.759.331a1.05 1.05 0 0 0-.26.782c0 .012.118 1.245-.143 2.88-1.292-1.019-2.441-2.31-3.413-3.899a1.03 1.03 0 0 0-.865-.486.99.99 0 0 0-.865.486c-.972 1.576-2.122 2.88-3.414 3.9-.26-1.648-.142-2.869-.142-2.88a1.004 1.004 0 0 0-.26-.783 1.023 1.023 0 0 0-.76-.331c-2.57 0-4.835-.285-6.743-.854.19-.332.403-.652.629-.96 1.564-2.157 3.946-4.065 7.087-5.665 1.955.308 3.449 1.991 3.449 4.006 0 .557.462 1.02 1.019 1.02.569 0 1.019-.451 1.019-1.02a4.057 4.057 0 0 1 3.449-4.006c3.14 1.6 5.523 3.496 7.087 5.665.225.32.438.64.628.96-1.908.557-4.172.854-6.743.854Zm8.331 6.541a13.66 13.66 0 0 1-4.23-.154 12.286 12.286 0 0 1-3.414-1.197c.273-1.268.355-2.405.355-3.188 2.49-.07 4.682-.414 6.578-1.019.652 1.719.889 3.58.711 5.558Zm.344-8.13a13.1 13.1 0 0 0-.913-1.422c-1.197-1.659-2.808-3.176-4.811-4.527h10.773a7.85 7.85 0 0 1-2.145 3.947c-.783.793-1.755 1.469-2.904 2.002ZM16.52 1.494c-.284-.474-.119-1.078.38-1.363A1.046 1.046 0 0 1 18.298.5l.924 1.564c.285.474.119 1.079-.38 1.363a.99.99 0 0 1-.509.13c-.355 0-.699-.177-.889-.497l-.924-1.565Zm6.933.57.924-1.565c.285-.474.901-.64 1.399-.368a.997.997 0 0 1 .38 1.363l-.925 1.565c-.19.32-.534.497-.889.497-.178 0-.344-.047-.51-.13a.977.977 0 0 1-.379-1.363Z" fill="url(#logo-gradient)"></path>
                                            <defs>
                                                <radialGradient id="logo-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -39.5919 27.5541 0 20.564 34.073)"><stop stop-color="#33FDD8"></stop><stop offset=".615" stop-color="#7A4AFF"></stop><stop offset="1" stop-color="#45108A"></stop></radialGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                {/* Title and Arrow */}
                                <div className="flex items-center justify-center mb-12">
                                    <h2 className="quicksand-bold text-3xl font-semibold text-white mr-6 tracking-wide">Firefly</h2>
                                    <div className="w-10 h-10 border-2 border-gray-400 rounded-xl flex items-center justify-center bg-gray-800/30">
                                        <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom Message Box */}
                                <div className="flex justify-center">
                                    <div className="rounded-2xl px-12 py-4 max-w-2xl border-[1.5px] bg-[#6b5be725] border-[#6b5be7]">
                                        <p className="text-[#6b5be7] text-xl text-center leading-relaxed font-medium">
                                            Before we couldn't even be found—now we're part of the drift detection conversation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}