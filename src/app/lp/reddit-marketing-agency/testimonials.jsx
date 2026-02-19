"use client";

import { useEffect, useState } from "react";

const testimonials = [
    {
        id: 1,
        name: 'Cindy Blake',
        imageUrl: '/Testimon/cindyFirefly.jpg',
        title: 'VP Marketing',
        company: 'Firefly.ai',
        quote:
            "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
        highlight: ['quick to onboard', 'responsive', 'collaborative'],
        animate: true,
        caseStudyUrl: '/case-studies/case-study-series-a-cloud-developer-marketing',
    },
    {
        id: 2,
        name: 'Josh',
        imageUrl: '/Testimon/joshTerraTeam.jpg',
        title: 'Co-Founder',
        company: 'Terrateam',
        quote:
            "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
        highlight: ['significantly enhanced the visibility and appeal of our product'],
        animate: true,
        caseStudyUrl: '/case-studies/terrateam-case-study',
    },
    {
        id: 3,
        name: 'Melanie Lim Laju Kitingon',
        imageUrl: '/Testimon/Melanie.png',
        title: 'Project Manager',
        company: 'Respond.io',
        quote:
            "Infrasity is constantly looking for ways to work more productively and be more optimized. Infrasity has created original posts and content that have ranked in the top 10 search results for priority keywords.They strive to be more productive and optimized.",
        highlight: ['top 10 search results', 'responds fast', 'adapts quickly', 'more productive and optimized'],
        animate: true,
        caseStudyUrl: '/case-studies/respond-io-community-led-growth-case-study',
    },
    {
        id: 4,
        name: 'Debosmit Ray',
        imageUrl: '/Testimon/Debosmit-devzero.png',
        title: 'Founder',
        company:'Devzero',
        quote:
            "Infrasity has helped us create technical content, product documentation, and recipe libraries for integrating DevZero with different tech stacks. Their product videos showcase our key features, making it easier to engage users. A great content partner in our journey!",
        highlight: ['technical content', 'tech stacks' , 'easier to engage users','great content partner'],
        animate: true,
        caseStudyUrl: '/case-studies/case-study-product-documentation',
    },
    {
        id: 5,
        name: 'Ben Hewison',
        imageUrl: '/playbook/cycloid.png',
        title: 'Content Marketing Manager',
        company: 'Cycloid',
        quote:
            "Infrasity's ability to translate Cycloid's technical messaging into stories that sales and engineering teams could rally around was game changing.",
        highlight: ['technical messaging', 'game changing'],
        animate: true,
        caseStudyUrl: '/case-studies',
        videoUrl: 'https://youtu.be/19Nz5OxaTtc',
    },
    {
        id: 6,
        name: 'Ido Neeman',
        imageUrl: '/playbook/firefly.png',
        title: 'Co-Founder and CEO',
        company: 'Firefly.ai',
        quote:
            "Infrasity's unique ability to create deep, technical content that resonates with engineers has been valuable in helping us identify and address our customers pain points.",
        highlight: ['create deep', 'customers pain points'],
        animate: true,
        caseStudyUrl: '/case-studies/case-study-series-a-cloud-developer-marketing',
        videoUrl: 'https://youtube.com/shorts/AgCQ176pfRU',
    },
];

const isYouTubeUrl = (url = "") => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
const getYouTubeId = (url = "") => {
    try {
        const parsed = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost");
        if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
        if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
        const parts = parsed.pathname.split("/").filter(Boolean);
        const idx = parts.findIndex((part) => part === "embed" || part === "shorts");
        if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    } catch {}
    return "";
};
const toYouTubeEmbed = (url = "") => {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0` : "";
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightedQuote = (quote, highlights) => {
    return highlights.reduce((current, phrase) => {
        const regex = new RegExp(`(${escapeRegExp(phrase)})`, 'gi');
        return current.replace(regex, (match) => `<span class="text-white font-semibold">${match}</span>`);
    }, quote);
};

const CaseStudyCta = ({ testimonial, ctaClassName = '', onOpenVideo, variant }) => {
    const hasVideo = Boolean(testimonial.videoUrl);
    if (hasVideo) {
        return (
            <button
                type="button"
                onClick={() => onOpenVideo?.(testimonial)}
                className={`inline-flex items-center gap-2 text-sm uppercase tracking-[0.4em] text-white/80 hover:text-white transition ${ctaClassName}`}
                aria-label={`Play ${testimonial.name} video testimonial`}
            >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M9 6v12l9-6-9-6z" />
                    </svg>
                </span>
                View Testimonial
            </button>
        );
    }
    return (
        <a
            href={testimonial.caseStudyUrl}
            className={`text-sm uppercase tracking-[0.4em] text-white/70 hover:text-white transition ${ctaClassName}`}
            aria-label={`View full case study`}
        >
            View Full Case Study
        </a>
    );
};

const TestimonialCard = ({ testimonial, variant = 'front', ctaClassName = '', onOpenVideo }) => {
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
                        className="text-sm leading-relaxed text-[#DAD1F1] text-left"
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
                            <p className="text-xs text-gray-400 leading-snug">{testimonial.company}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 w-full h-full flex items-end justify-center pb-2">
                    <CaseStudyCta testimonial={testimonial} onOpenVideo={onOpenVideo} ctaClassName={ctaClassName} />
                </div>
            )}
        </div>
    );
};
const TestimonialTile = ({ testimonial, onOpenVideo }) => {
    const frontTransform = testimonial.animate
        ? 'origin-left group-hover:-translate-y-6 group-hover:rotate-[-2deg]'
        : 'origin-left';

    return (
        <div className="group flex flex-col items-center text-center">
            <div className="relative w-[350px] h-[350px]">
                <div className="absolute inset-0">
                    <TestimonialCard
                        testimonial={testimonial}
                        variant="back"
                        ctaClassName="group-hover:text-white"
                        onOpenVideo={onOpenVideo}
                    />
                </div>
                <div className={`absolute inset-0 transition duration-700 transform-gpu ${frontTransform}`}>
                    <TestimonialCard testimonial={testimonial} variant="front" />
                </div>
            </div>
        </div>
    );
};

const VideoModal = ({ openItem, onClose }) => {
    const url = openItem?.videoUrl || "";
    const isYouTube = isYouTubeUrl(url);
    const embedUrl = isYouTube ? toYouTubeEmbed(url) : "";

    useEffect(() => {
        if (!openItem) return;
        const onKey = (event) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [openItem, onClose]);

    if (!openItem) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close video"
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
            <div className="flex h-full w-full items-center justify-center p-4" onClick={(event) => event.stopPropagation()}>
                <div className="relative w-full max-w-[90vw] md:max-w-3xl lg:max-w-4xl">
                    <div
                        className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
                        style={{ paddingTop: "56.25%" }}
                    >
                        {isYouTube ? (
                            <iframe
                                src={embedUrl}
                                title={openItem.name || "Testimonial video"}
                                className="absolute left-0 top-0 h-full w-full"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video
                                autoPlay
                                controls
                                playsInline
                                className="absolute left-0 top-0 h-full w-full"
                                src={url}
                            />
                        )}
                    </div>
                    <div className="mt-4 text-center text-sm text-white/70">
                        {openItem.name} - {openItem.company}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Testimonials({
    heading = 'Why',
    highlight = 'Trusted by VC-Backed B2B SaaS and Infrastructure Startups',
    trailing = '',
    subHeading = 'What founders and marketing teams say after scaling Reddit visibility with Infrasity.',
    showDivider = true,
    wrapperClassName,
    headingClassName,
    highlightClassName,
    subHeadingClassName,
    headingStyle
}) {
    const [openVideo, setOpenVideo] = useState(null);
    const resolvedWrapperClassName =
        wrapperClassName ||
        'quicksand-bold text-[32px] max-sm:text-[20px] tracking-tight leading-[1.1] text-white flex justify-center mb-2';
    const resolvedHeadingClassName = headingClassName || 'text-center max-lg:mx-auto tracking-wide';
    const resolvedHighlightClassName =
        highlightClassName || 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600';
    const resolvedSubHeadingClassName =
        subHeadingClassName || 'text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide';
    return (
        <section className="mx-auto px-6 py-12">
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className={resolvedWrapperClassName}>
                    <h2 className={resolvedHeadingClassName} style={headingStyle}>
                        {heading}{' '}
                        <span className={resolvedHighlightClassName}>{highlight}</span>{' '}
                        {trailing}
                    </h2>
                </div>
                {showDivider ? (
                    <div className="flex justify-center my-6 mb-8">
                        <div
                            className="w-[148px] h-1 rounded-full"
                            style={{
                                backgroundImage: 'linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)',
                            }}
                        />
                    </div>
                ) : null}
                <div className="max-w-[70%] mx-auto">
                    <p className={resolvedSubHeadingClassName}>{subHeading}</p>
                </div>
            </div>

            <div className="grid gap-8 max-w-6xl mx-auto place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <TestimonialTile
                        key={testimonial.id}
                        testimonial={testimonial}
                        onOpenVideo={setOpenVideo}
                    />
                ))}
            </div>
            <VideoModal openItem={openVideo} onClose={() => setOpenVideo(null)} />
        </section>
    );
}
