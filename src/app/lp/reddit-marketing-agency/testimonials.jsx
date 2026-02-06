const testimonials = [
    {
        id: 1,
        name: 'Cindy Blake',
        imageUrl: '/Testimon/cindyFirefly.jpg',
        title: 'VP Marketing, Firefly.ai',
        quote:
            "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
        highlight: ['quick to onboard', 'responsive', 'collaborative'],
        animate: false,
        caseStudyUrl: '/case-studies',
    },
    {
        id: 2,
        name: 'Josh',
        imageUrl: '/Testimon/joshTerraTeam.jpg',
        title: 'Co-Founder, Terrateam',
        quote:
            "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
        highlight: ['significantly enhanced the visibility and appeal of our product'],
        animate: false,
        caseStudyUrl: '/case-studies/terrateam-case-study',
    },
    {
        id: 3,
        name: 'Shaked Askayo',
        imageUrl: '/Testimon/Shaked.png',
        title: 'CTO, Kubiya.ai',
        quote:
            "Infrasity's experience in platform engineering and DevOps gave us confidence that they could translate our technical value into engaging content and videos.",
        highlight: ['platform engineering', 'engaging content'],
        animate: false,
        caseStudyUrl: '/case-studies',
    },
    {
        id: 4,
        name: 'Frank Weissmann',
        imageUrl: '/Testimon/Frank.jpg',
        title: 'Customer Success Lead, Firefly.ai',
        quote:
            "Infrasity's work has improved the client's SEO, earning a score of over 75%. They've also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time.",
        highlight: ['over 75%', 'quick turnaround time'],
        animate: false,
        caseStudyUrl: '/case-studies',
    },
    {
        id: 5,
        name: 'Ben Hewison',
        imageUrl: '/playbook/cycloid.png',
        title: 'Content Marketing Manager, Cycloid',
        quote:
            "Infrasity's ability to translate Cycloid's technical messaging into stories that sales and engineering teams could rally around was game changing.",
        highlight: ['technical messaging', 'game changing'],
        animate: false,
        caseStudyUrl: '/case-studies',
    },
    {
        id: 6,
        name: 'Idoo Neeman',
        imageUrl: '/playbook/firefly.png',
        title: 'Co-Founder and CEO, Firefly.ai',
        quote:
            "Infrasity's unique ability to create deep, technical content that resonates with engineers has been valuable in helping us identify and address our customers pain points.",
        highlight: ['create deep', 'customers pain points'],
        animate: false,
        caseStudyUrl: '/case-studies/case-study-series-a-cloud-developer-marketing',
    },
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightedQuote = (quote, highlights) => {
    return highlights.reduce((current, phrase) => {
        const regex = new RegExp(`(${escapeRegExp(phrase)})`, 'gi');
        return current.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
    }, quote);
};

const TestimonialCard = ({ testimonial, variant = 'front', ctaClassName = '' }) => {
    const variantStyles = variant === 'back' ? 'opacity-80 border-gray-700/50' : 'opacity-100 border-gray-700/50';

    return (
        <div
            className={`w-full h-full relative ${variantStyles} rounded-[32px] overflow-hidden border border-gray-700/50 ring-1 ring-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)]`}
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                width="566"
                height="575"
                viewBox="0 0 566 575"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_309_743)">
                    <rect width="566" height="575" rx="43.3318" fill="#0E0B1B" />
                    <g opacity="0.5" filter="url(#filter0_f_309_743)">
                        <rect
                            width="868.256"
                            height="726.435"
                            transform="matrix(0.79866 0.601782 0.601782 -0.79866 -379.584 219.654)"
                            fill="url(#paint0_linear_309_743)"
                        />
                    </g>
                </g>
                <rect
                    x="0.866635"
                    y="0.866635"
                    width="564.267"
                    height="573.267"
                    rx="42.4651"
                    stroke="#777777"
                    strokeOpacity="0.5"
                    strokeWidth="1.73327"
                />
                <defs>
                    <filter
                        id="filter0_f_309_743"
                        x="-555.283"
                        y="-536.22"
                        width="1482"
                        height="1454.08"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="87.8498" result="effect1_foregroundBlur_309_743" />
                    </filter>
                    <linearGradient
                        id="paint0_linear_309_743"
                        x1="868.256"
                        y1="0.0000320202"
                        x2="-133.999"
                        y2="371.55"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0D0A1A" />
                        <stop offset="0.716097" stopColor="#473B79" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#9B91C6" stopOpacity="0.8" />
                    </linearGradient>
                    <clipPath id="clip0_309_743">
                        <rect width="566" height="575" rx="43.3318" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            {variant === 'front' ? (
                <div className="relative z-10 w-full h-full px-8 py-10 flex flex-col justify-between">
                    <p
                        className="text-sm leading-relaxed text-[#DAD1F1]"
                        dangerouslySetInnerHTML={{ __html: highlightedQuote(testimonial.quote, testimonial.highlight) }}
                    />
                    <div className="flex items-center gap-4">
                        <img
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/40"
                        />
                        <div className="flex flex-col items-start">
                            <p className="text-white font-bold text-sm leading-tight">{testimonial.name}</p>
                            <p className="text-xs text-gray-400 leading-snug">{testimonial.title}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 w-full h-full flex items-end justify-center pb-2">
                    <a
                        href={testimonial.caseStudyUrl}
                        className={`text-sm uppercase tracking-[0.4em] text-white/60 ${ctaClassName}`}
                        aria-label={`View full case study`}
                    >
                        View Full Case Study
                    </a>
                </div>
            )}
        </div>
    );
};
const TestimonialTile = ({ testimonial }) => {
    const frontTransform = testimonial.animate
        ? 'origin-left group-hover:-translate-y-6 group-hover:rotate-[-2deg]'
        : 'origin-left';

    return (
        <div className="group flex flex-col items-center text-center">
            <div className="relative w-[350px] h-[350px]">
                <div className="absolute inset-0">
                    <TestimonialCard testimonial={testimonial} variant="back" ctaClassName="group-hover:text-white" />
                </div>
                <div className={`absolute inset-0 transition duration-700 transform-gpu ${frontTransform}`}>
                    <TestimonialCard testimonial={testimonial} variant="front" />
                </div>
            </div>
        </div>
    );
};

export default function Testimonials({ heading, subHeading }) {
    return (
        <section className="mx-auto px-6 py-12">
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[32px] max-sm:text-[20px] tracking-tight leading-[1.1] text-white flex justify-center mb-2">
                    <h2 className="text-center max-lg:mx-auto tracking-wide">
                        Why{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">
                            Y Combinator Companies - Boldstart, and Eclipse
                        </span>{' '}
                        trust Infrasity
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div
                        className="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: 'linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)',
                        }}
                    />
                </div>
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide">
                        Here’s how we help them ship content fast — and with depth.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 max-w-6xl mx-auto place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <TestimonialTile key={testimonial.id} testimonial={testimonial} />
                ))}
            </div>
        </section>
    );
}
