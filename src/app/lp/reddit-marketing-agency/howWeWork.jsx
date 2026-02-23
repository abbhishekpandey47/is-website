import ContactPopupButton from "./ContactPopupButton";

export default function AIChallengesSection() {
        const challenges = [
            {
                title: "Narrative Tracking & Competitor Listening",
                description:
                    "We monitor how specific SDKs, LLM agents, platform engineering or AI Agents are being discussed — what’s earning love, what’s getting dragged — and use those signals to craft Reddit-native narratives around your product.",
            },
            {
                title: "Karma-Rich Handle Rotation & Comment Seeding",
                description:
                    "We drop LLM-friendly, value-first comments using aged, trusted Reddit accounts — showing up in threads around IaC drift, tool comparisons, or “Which stack should I use for policy?” conversations with zero promotional footprint.",
            },
            {
                title: "Thread Seeding for Use Case Discovery",
                description:
                    "We launch and sustain conversations around real-world use cases — like automating CI/CD with Terraform, handling multi-cloud AI workloads, or shipping faster with internal dev platforms — and naturally introduce your tool as the solution.",
            },
            {
                title: "Subreddit Mapping & ICP-First Targeting",
                description: "We show up where your ICP is already active — from r/devops to r/LLMops — and seed original threads designed to prompt discussion, not raise flags. Every post is shaped to match each subreddit’s culture, tone, and rhythm — so you earn attention, not suspicion.",
            },
        ];
    return (
        <div className="pb-10 p-8 md:p-[2rem]" >
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        Earning Trust on Reddit: The System We Perfected Across 30+{" "}<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">Devtool Startups </span>
                    </h2>
                </div>

                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Designed inside fast-growing AI, Security, and PLG teams — this isn’t a theory or a trend. It’s what works when Reddit becomes a real growth lever.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {challenges.map((challenge, index) => (
                            <div
                                key={index}
                                className="relative h-[15rem] w-[20rem] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#0d0a1a]/90 via-[#110828]/90 to-[#0b0d1f]/90 p-8 text-white shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition duration-300 hover:border-[#8b7ef9]/60"
                            >
                                <div className="absolute inset-0" aria-hidden>
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d0a1a]/80 via-[#1e0f36]/70 to-[#0a0b1f]/80" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
                                    <div
                                        className="absolute"
                                        style={{
                                            width: "459.82px",
                                            height: "384.71px",
                                            left: "-188.17px",
                                            top: "-156.96px",
                                            transform: "rotate(-37deg)",
                                            background:
                                                "linear-gradient(252.77deg, #0D0A1A 0%, rgba(71, 59, 121, 0.8) 71.76%, rgba(155, 145, 198, 0.8) 100.21%)",
                                            filter: "blur(46.5243px)",
                                        }}
                                    />
                                </div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <h3 className="text-xl font-semibold leading-tight tracking-normal text-white md:text-[18px]">
                                        {challenge.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed text-neutral-300">
                                        {challenge.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                   <div className="flex flex-col items-center mt-4">
                        {/* Center - Book a Demo button */}
                        <div className="flex flex-col items-center mt-4">
                            <ContactPopupButton buttonText="Book a Strategy Call" width="w-52" height="h-11" textSize="text-sm" textWeight="quicksand-semibold" thankYouPath="/lp/reddit-marketing-agency/thankyou" />
                            <p className="text-[0.75rem] px-[1rem] py-[0.75rem]">Free Reddit audit included</p>
                        </div>
                    </div>
  
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
}
