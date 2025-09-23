"use client";
import React, { useMemo } from "react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

const testimonials = [
  {
    quote: "Infrasity shipped more technical content in their first month than our previous DevRel hire did in six. The quality is exceptional and the distribution reach is incredible.",
    author: "Sarah Chen",
    role: "CTO",
    company: "DevFlow",
    avatar: "SC"
  },
  {
    quote: "We were stuck between hiring an expensive DevRel or going without. Infrasity gave us a full GTM team for a fraction of the cost. Our developer engagement is up 300%.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "CloudNative Labs",
    avatar: "MR"
  },
  {
    quote: "The engineering depth they bring to content creation is unmatched. They understand our product better than most of our own team members within weeks.",
    author: "Alex Kim",
    role: "VP Engineering",
    company: "DataStream",
    avatar: "AK"
  }
];

const companies = [
  "DevFlow", "CloudNative Labs", "DataStream", "TechVenture", "BuildPlatform", "CodeBase"
];

const NewMarquee = () => {
  const fileMemo = useMemo(() => companies, []);
  const duration = "80s"; 

  return (
    <div className="pb-2">
      <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div
          className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden px-5 lg:px-12"
          aria-hidden={false}
        >
          <Marquee
            className="custom-marquee-mask"
            innerClassName="custom-marquee-track"
            pauseOnHover={true}
            fade={false}
            direction="left"
          >
            <div className="flex gap-10 items-center mx-4">
              {companies.map((company, index) => (
                <div key={index} className={`mix-blend-color-burn`}>
                 <div key={company} className="text-lg font-semibold text-neutral-foreground">
                {company}
              </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      <style jsx global>{`
        /* Smooth fade at left/right edges: mask-image works well (with -webkit prefix fallback) */
        .custom-marquee-mask {
          /* adjust percentages to change width of fade */
          -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          /* ensure overlays/gaps are not clipped by mask */
        }

        /* Force the library's animated track to run slower.
           innerClassName attaches this class to the moving track, so overriding animation-duration
           here slows the scroll. */
        .custom-marquee-track {
          -webkit-animation-duration: ${duration} !important;
          animation-duration: ${duration} !important;
          /* keep linear timing for smooth constant speed */
          -webkit-animation-timing-function: linear !important;
          animation-timing-function: linear !important;
        }

        /* Some environments set animation on a child; add a safer override for any descendant animation */
        .custom-marquee-track * {
          -webkit-animation-duration: ${duration} !important;
          animation-duration: ${duration} !important;
        }

        /* Optional: nice image smoothing */
        .custom-marquee-mask img {
          transition: transform 300ms ease, opacity 300ms ease;
          will-change: transform, opacity;
        }

        /* responsive tweak: smaller height on small screens */
        @media (max-width: 640px) {
          .custom-marquee-mask img { height: 36px; width: auto; }
        }
      `}</style>
    </div>
  );
}


const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Social Proof - Company Logos */}
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by engineering teams at high-growth startups
          </p>
          {NewMarquee()}
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-foreground mb-6">
            What founders are saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of engineering leaders who chose scalable GTM over expensive DevRel hires.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className="bg-[#2a2d5a]/30 border border-purple-500/30 backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">
                <svg className="w-8 h-8 text-brand/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-neutral-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-neutral-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;