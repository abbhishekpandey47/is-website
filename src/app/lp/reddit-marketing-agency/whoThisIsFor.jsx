import Image from 'next/image';

const badges = [
    { text: 'AI/LLM agentic platforms.', top: 'top-[273px]', left: 'left-[335px]' },
    { text: 'Internal developer platforms (IDPs).', top: 'top-[438px]', left: 'left-[111px]' },
    { text: 'Observability / APM / Testing tools.', top: 'top-[626px]', left: 'left-[220px]' },
    { text: 'Auth, CI/CD, and DevX tooling.', top: 'top-[762px]', left: 'left-[492px]' },
    { text: 'Backend infra, feature flags, config tools.', top: 'top-[556px]', left: 'left-[1396px]' },
    { text: 'Deployment & workflow automation.', top: 'top-[347px]', left: 'left-[1274px]' },
    { text: 'Experimental tools solving new-edge problems (think: Codium, DevZero, Kubiya, Tracetest).', top: 'top-[821px]', left: 'left-[1274px]' },
];

const StartupHeroSection = () => {
    return (
        <section className="relative overflow-hidden pb-24">
            <div className="absolute inset-0" />
            <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center px-6 pt-16 md:pt-24">

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        Who this is for :
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        We work with early and growth-stage startups building tools for technical users. If you&apos;re building for developers and want to win credibility on Reddit — we&apos;re your team.


                    </p>
                </div>
            </div>

            <div className="flex justify-center mx-auto mt-10 w-full max-w-[1440px]">
                <div className="w-full max-w-[1240px]">
                    <div className="relative aspect-[1140/480] w-full">
                        <Image
                            src="/reddit/whoisthisfor.svg"
                            alt="Who this is for"
                            width={1140}
                            height={540}
                            priority
                            fetchPriority="high"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
            </div>
              
            </div>

        </section>
    );
};

export default StartupHeroSection;
