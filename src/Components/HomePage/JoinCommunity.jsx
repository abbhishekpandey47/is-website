import React from 'react';

const JoinCommunity = () => {
    return (
        <div>
            <div className="flex flex-col gap-5 w-[700px] max-lg:w-[80%] mx-auto py-24 relative items-center">
                <div className="max-xs:text-4xl text-5xl font-bold quicksand-bold text-center max-lg:w-[300px]">

                    Join our <span className="specialtext quicksand-bold">community</span>
                </div>
                <div className="max-xs:text-base text-lg quicksand-semibold text-center text-[wheat]">
                    Engaging discussions, knowledge, and ideas to build your next product.
                </div>
                <div className="flex justify-center space-x-8 mt-5 z-10">
                    <div className="flex items-center space-x-2 text-[wheat] hover:text-white hover:underline quicksand-semibold">
                        <img src="\communityIcons\youtube.svg" loading="lazy" alt="Infrasity Youtube" className="w-6 h-6" />
                        <a href="https://www.youtube.com/@Infrasity" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span>Youtube</span></a>
                    </div>
                    <div className="flex items-center space-x-2 text-[wheat] hover:text-white hover:underline quicksand-semibold">
                        <img src="\communityIcons\devto.svg" alt="Infrasity Dev2" className="w-6 h-6" />
                        <a href="https://dev.to/infrasity-learning" loading="lazy" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span>Dev.to</span></a>
                    </div>
                    <div className="flex items-center space-x-2 text-[wheat] hover:text-white hover:underline quicksand-semibold">
                        <img src="\communityIcons\medium.svg" alt="Infrasity Mediun" className="w-6 h-6" />
                        <a href="https://medium.com/@infrasity.com" loading="lazy" target='_blank' className="hover:underline flex items-center max-lg:justify-center space-x-10 gap-2" ><span>Medium</span></a>
                    </div>
                </div>

                {/* max-lg */}
                <div className="absolute top-[145px] max-xs:top-[125px] lg:hidden">
                    <img src="/svgPatterns/join-line-6.svg" alt="line 6" loading="lazy" className="max-xs:scale-75 w-full h-full object-cover" />
                </div>
                <div className="absolute max-xs:bottom-[40px] bottom-[20px] lg:hidden">
                    <img src="/svgPatterns/join-line-5.svg" alt="line 5" loading="lazy" className="max-xs:scale-75 w-full h-full object-cover" />
                </div>
                <div className="absolute max-xs:scale-75 max-xs:top-[115px] max-xs:left-[calc(50%-150px)] top-[120px] left-[calc(50%-200px)] w-12 h-12 bg-blue-500 rounded-full overflow-hidden lg:hidden">
                    <img src="./Testimon/Ayush.png" alt="User 1" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute max-xs:scale-75 max-xs:bottom-[25px] max-xs:right-[calc(50%-130px)] bottom-[0px] right-[calc(50%-180px)] w-12 h-12 bg-blue-500 rounded-full overflow-hidden lg:hidden">
                    <img src="./Testimon/Paras.png" alt="User 2" loading="lazy" className="w-full h-full object-cover" />
                </div>

                {/* normal */}
                <div className="absolute top-[60px] left-[-90px] w-12 h-12 bg-blue-500 rounded-full items-center justify-center overflow-hidden max-lg:hidden">
                    <img src="./Testimon/Ayush.png" alt="User 1" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[30px] left-[-120px] w-12 h-12 bg-blue-500 rounded-full items-center justify-center overflow-hidden max-lg:hidden">
                    <img src="./Testimon/infraperson1.png" alt="User 2" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute  top-[40px] right-[-10px] w-12 h-12 bg-blue-500 rounded-full items-center justify-center overflow-hidden max-lg:hidden">
                    <img src="./Testimon/Paras.png" alt="User 3" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[25px] right-[-120px] w-12 h-12 bg-blue-500 rounded-full items-center justify-center overflow-hidden max-lg:hidden">
                    <img src="./Testimon/Anurag.png" alt="User 4" loading="lazy" className="w-full h-full object-cover" />
                </div>

                <div className="absolute top-[80px] left-[-90px] max-lg:hidden">
                    <img src="/svgPatterns/join-line-1.svg" alt="line 1" loading="lazy"  className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[50px] left-[-120px] max-lg:hidden scale-x-75">
                    <img src="/svgPatterns/join-line-2.svg" alt="line 2" loading="lazy"  className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-[60px] right-[-10px] max-lg:hidden">
                    <img src="/svgPatterns/join-line-3.svg" alt="line 3" loading="lazy"  className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[45px] right-[-120px] max-md:right-[30%] max-md:bottom-[13%] max-lg:hidden">
                    <img src="/svgPatterns/join-line-4.svg" alt="line 4" loading="lazy"  className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default JoinCommunity;
