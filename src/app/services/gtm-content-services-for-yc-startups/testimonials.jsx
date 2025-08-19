
export default function Testimonials({ heading, subHeading }) {

    const testimonials = [
        {
            id: 1,
            name: "Cindy Blake",
            imageUrl: "/Testimon/cindyFirefly.jpg",
            alt: "Cindy Blake, VP Marketing, Firefly",
            title: "VP Marketing, Firefly",
            quote:
                "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
            highlight: ["quick to onboard", "responsive", "collaborative"],
        },
        {
            id: 2,
            name: "Josh",
            imageUrl: "/Testimon/joshTerraTeam.jpg",
            alt: "Josh, Co-Founder, Terrateam",
            title: "Co-Founder, Terrateam",
            quote:
                "The Infrasity team has been fantastic to work with. Their attention to detail and level of accuracy is top notch. I'd fully recommend their services to anyone.",
            highlight: ["attention to detail", "level of accuracy", "top notch"],
        },
        {
            id: 3,
            name: "Shaked Askayo",
            imageUrl: "/Testimon/Shaked.png",
            alt: "Shaked Askayo, CTO, Kubiya.ai",
            title: "CTO, Kubiya.ai",
            quote:
                "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
            highlight: [
                "significantly enhanced the visibility and appeal of our product",
            ],
        },
        {
            id: 4,
            name: "Frank Weissmann",
            imageUrl: "/Testimon/Frank.jpg",
            alt: "Frank Weissmann, Customer Success Lead, firefly.ai",
            title: "Customer Success Lead, firefly.ai",
            quote:
                "Infrasity's work has improved the client's SEO, earning a score of over 75%. They'vs also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time.",
            highlight: ["over 75%", "quick turnaround time"],
        }
    ];
    return (
        <section className="mx-auto px-6 py-10">
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[32px] max-sm:text-[20px] tracking-tight leading-[1.1] text-white text-center flex justify-center mb-2">
                    <h2 className="text-center max-lg:mx-auto tracking-wide">
                        Why {" "}
 <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">Y Combinator Companies - Boldstart, and Eclipse </span> trust Infrasity
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
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide">
                        Here’s how we help them ship content fast — and with depth.                                </p>
                </div>
            </div>

            {/* Desktop Layout: Left-Middle-Right with vertical centering */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-0 max-w-5xl mx-auto relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <div className="w-[1000px] h-[1000px] rounded-full blur-[50px] opacity-40"
                        style={{ background: 'radial-gradient(circle, #3e2189 0%, #3e2189 25%, #3e2189 50%, rgba(91, 33, 182, 0.3) 75%, transparent 100%)' }}></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[60px] opacity-25"
                        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(124, 58, 237, 0.4) 30%, rgba(124, 58, 237, 0.2) 60%, transparent 100%)' }}></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full blur-[40px] opacity-30"
                        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)' }}></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full blur-[20px] opacity-20"
                        style={{ background: 'radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 100%)' }}></div>
                </div>
                {/* Left Column - 1 testimonial (vertically centered) */}
                <div className="flex items-center z-50">
                    <div className="w-[95%]">
                        <div className="bg-[#2a2d5a]/30 border border-purple-500/30  backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonials[0].imageUrl}
                                    alt={testimonials[0].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                />
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">{testimonials[0].name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {testimonials[0].title}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-[#DAD1F1] leading-relaxed text-left"
                                dangerouslySetInnerHTML={{
                                    __html: testimonials[0].highlight.reduce((acc, phrase) => {
                                        const regex = new RegExp(`(${phrase})`, 'gi');
                                        return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                    }, testimonials[0].quote)
                                }}
                            />

                        </div>
                    </div>
                </div>

                {/* Middle Column - 2 testimonials */}
                <div className="space-y-4 z-50">
                    {testimonials[1] && (
                        <div className="w-[95%] bg-[#2a2d5a]/30 border rounded-2xl p-8 border-purple-500/30 transition-colors duration-300">
                            <div className="flex items-center justify-left mb-4 z-50">
                                <img
                                    src={testimonials[1].imageUrl}
                                    alt={testimonials[1].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                />
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">{testimonials[1].name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {testimonials[1].title}, {testimonials[1].company}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-[#DAD1F1] leading-relaxed text-left"
                                dangerouslySetInnerHTML={{
                                    __html: testimonials[1].highlight.reduce((acc, phrase) => {
                                        const regex = new RegExp(`(${phrase})`, 'gi'); // Case-insensitive matching for each phrase
                                        return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                    }, testimonials[1].quote)
                                }}
                            />

                        </div>
                    )}

                    {testimonials[2] && (
                        <div className="w-[95%] bg-[#2a2d5a]/30 border border-purple-500/30  backdrop-blur-sm rounded-2xl p-8 transition-colors duration-300">
                            <div className="flex items-center justify-left mb-4 z-50">
                                <img
                                    src={testimonials[2].imageUrl}
                                    alt={testimonials[2].name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                />
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">{testimonials[2].name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {testimonials[2].title}, {testimonials[2].company}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-[#DAD1F1] leading-relaxed text-left"
                                dangerouslySetInnerHTML={{
                                    __html: testimonials[2].highlight.reduce((acc, phrase) => {
                                        const regex = new RegExp(`(${phrase})`, 'gi');
                                        return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                    }, testimonials[2].quote)
                                }}
                            />

                        </div>
                    )}
                </div>

                {/* Right Column - 1 testimonial (vertically centered) */}
                <div className="flex items-center z-50">
                    <div className="w-[95%]">
                        {testimonials[3] && (
                            <div className="bg-[#2a2d5a]/30 border border-purple-500/30 backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonials[3].imageUrl}
                                        alt={testimonials[3].name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-white">{testimonials[3].name}</h4>
                                        <p className="text-sm text-gray-400">
                                            {testimonials[3].title}, {testimonials[3].company}
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className="text-[#DAD1F1] leading-relaxed text-left"
                                    dangerouslySetInnerHTML={{
                                        __html: testimonials[3].highlight.reduce((acc, phrase) => {
                                            const regex = new RegExp(`(${phrase})`, 'gi');
                                            return acc.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
                                        }, testimonials[3].quote)
                                    }}
                                />

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Single Column */}
            <div className="lg:hidden space-y-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-purple-500/50 transition-colors duration-300">
                        <div className="flex items-left justify-left mb-6">
                            <img
                                src={testimonial.imageUrl}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 mr-4"
                            />
                            <div className="text-left">
                                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                <p className="text-sm text-gray-400">
                                    {testimonial.title}, {testimonial.company}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed text-left">
                            "{testimonial.quote}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}