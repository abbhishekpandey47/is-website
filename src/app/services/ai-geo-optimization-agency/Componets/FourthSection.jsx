"use client";

const geoSteps = [
  {
    number: '01',
    title: 'Website Audit',
    description:
      'We evaluate your website’s content for AI compatibility, check technical SEO elements like speed and indexing, and audit schema markup to meet AI search standards',
  },
  {
    number: '02',
    title: 'Conversational Query Research',
    description:
      "We figure out how users ask questions in AI tools. Think trending prompts, natural language queries, and intent-rich phrasing your audience actually uses",
  },
  {
    number: '03',
    title: 'Optimize Content & Website Revamp',
    description:
      'Outdated content is updated to match conversational queries, while new, concise, AI-friendly content is created with structures optimized for AI crawlers',
  },
  {
    number: '04',
    title: 'Implement Structured Data',
    description:
      'Schema markup is added to highlight services and improve visibility. Metadata is optimized, and actionable schema elements are used to signal relevance',
  },
  {
    number: '05',
    title: 'Technical SEO Updates',
    description:
      'We enhance site speed, mobile responsiveness, and server health while fixing crawl errors and ensuring your site meets AI indexing standards',
  },
  {
    number: '06',
    title: 'Monitor and Adapt',
    description:
      'Once you’re live, we track performance across GenAI tools and adjust strategy based on algorithm shifts, SERP behavior, and emerging AI search optimization trends',
  },
];

export default function FourthSection() {
  return (
    <section className="relative overflow-hidden w-full text-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-[460px] w-[460px] rounded-full blur-[220px]" />
      <div className="pointer-events-none absolute -left-20 top-[-60px] h-[360px] w-[360px] rounded-full blur-[200px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4">
            Infrasity End-to-End GEO Framework
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl  text-white/60">
            From audit to adaptation, here is how we keep your brand AI-visible, trusted, and recommended.
          </p>
        </div>

        <div className="mt-12 relative">
          {geoSteps.map((step, index) => {
            const overlapStyle = {
              marginTop: index === 0 ? 0 : -190,
            };
            const zIndexClass = `z-[${20 + index}]`;
            

            return (
              <article
                key={step.number}
                className={`group bg-[#0D0A1A] border border-l-0 border-r-0 ${index === 0 ? 'border-t-0' : 'border-t-[#777777]'} hover:border-b-[#777777] relative overflow-hidden p-6 transition duration-500 hover:bg-gradient-to-r hover:from-[#090617]/80 hover:via-[#111028] hover:to-black/80 min-h-[260px] md:min-h-[320px] md:py-8 hover:z-50 ${zIndexClass}`}
                style={overlapStyle}
              >
                <div className="relative flex items-center gap-8">
                  <div
                    style={{ fontSize: '25rem' }}
                    className="text-[clamp(3rem,8vw,8rem)] font-light leading-none text-white/20 transition duration-500 group-hover:text-white"
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-4xl font-semibold uppercase text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-h-0 overflow-hidden text-lg md:text-xl leading-relaxed text-white transition-[max-height,margin,opacity] duration-500 group-hover:max-h-[260px] group-hover:opacity-100 group-hover:mt-6">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}