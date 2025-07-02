export default function RealResult() {
    return (

        <div className="p-6 sm:m-4 pb-10 md:p-6" >
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        Real {" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                            }}
                        >Results</span>{" "}from Real Startups{" "}
                    </h2>
                </div>

                <div class="flex justify-center my-6 mb-8">
                    <div class="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    ></div>
                </div>
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[18px] md:text-[17px] text-white leading-relaxed tracking-wide font-light">
                        Most technical startups struggle with content that actually converts developers <br /> and drives meaningful growth.                    </p>
                </div>
            </div>

            <div className=" bg-black flex items-center justify-center">
                <div className="w-full max-w-8xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* IaC Startup Box */}
                    <div className=" rounded-3xl relative overflow-hidden"
                        style={{
                            padding: "1px", // simulate 1.5px border
                            background: "linear-gradient(99.6deg, #6B5BE7 2.92%, #AA0BAD 55.03%, #5959D7 98.94%)",
                            boxSizing: "border-box",
                            display: "inline-block", // prevents inner stretch
                        }}
                    >
                        <div
                            className="rounded-3xl py-6 pl-8 pr-4"
                            style={{
                                background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                                transition: "all 0.3s ease",
                                height: "100%",
                                boxSizing: "border-box",
                            }}
                        >
                            <div className="relative z-10 space-y-1">
                                <div>
                                    <h2 className="font-[quicksand] text-lg font-bold text-white mb-2">IaC Startup</h2>
                                    <p className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide">Series A Infrastructure Company</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-[40px] quicksand-bold" style={{ color: '#6B5BE7' }}>
                                        6000+
                                    </div>
                                    <p className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide">
                                        organic clicks in 90 days from technical blog content.
                                    </p>
                                </div>

                                <div>
                                    <blockquote className="font-[quicksand] text-base leading-relaxed mt-6" style={{ color: '#6B5BE7' }}>
                                        "Infrasity understood our infrastructure product better than our previous agency. The content drives qualified leads consistently."
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Infra Startup Box */}
                    <div
                        className="rounded-3xl"
                        style={{
                            padding: "1px", // simulate 1.5px border
                            background: "linear-gradient(99.6deg, #6B5BE7 2.92%, #AA0BAD 55.03%, #5959D7 98.94%)",
                            boxSizing: "border-box",
                            display: "inline-block", // prevents inner stretch
                        }}
                    >
                        <div
                            className="rounded-3xl py-6 pl-8 pr-4"
                            style={{
                                background: "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
                                transition: "all 0.3s ease",
                                height: "100%",
                                boxSizing: "border-box",
                            }}
                        >
                            <div className="relative z-10 space-y-0">
                                <div>
                                    <h2 className="font-[quicksand] text-lg font-bold text-white mb-2">AI Infra Startup</h2>
                                    <p className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide">Seed Stage AI Platform</p>
                                </div>

                                <div className="flex gap-1">
                                    <div className="space-y-2">
                                        <div className="text-[40px] quicksand-bold" style={{ color: '#6B5BE7' }}>
                                            43%
                                        </div>
                                        <p className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide">
                                            fewer support tickets
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-[40px] quicksand-bold" style={{ color: '#6B5BE7' }}>
                                            2x
                                        </div>
                                        <p className="font-[quicksand] text-[#AFAFAF] font-light text-sm tracking-wide">
                                            Activation Rate
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <blockquote className="font-[quicksand] text-base leading-relaxed mt-6" style={{ color: '#6B5BE7' }}>                                    "Their developer documentation and onboarding guides transformed our user experience. Developers actually understand our product now."
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}