"use client";
import Image from "next/image";

const cards = [
    {
    id: "geo",
    title: "Generative Engine Optimization",
    description:
      "We optimize SaaS & Fintech websites for visibility inside AI generated answers and citations from LLM search engines.",
    image:
      "/CommLogo/geo.png",
    secondaryImage:
      "/CommLogo/geo-black.png",
    chips: [
      "AI crawler optimization",
      "LLM content scoring & rewriting",
      "Source citation monitoring",
      "Zero-click query targeting",
      "Schema & LLMs.txt",
      "JavaScript optimization",
      "URL architecture optimization",
      "Content clustering",
      "AI search data tracking & analysis",
    ],
    theme: "light",
  },
  {
    
    id: "seo",
    title: "Search Engine Optimization",
    description:
      "We optimize B2B websites to rank on traditional search engines, covering the whole process from technical SEO to content-led growth.",
    image:
      "/CommLogo/seo-black.png",
    secondaryImage:
      "/CommLogo/seo.png",
    chips: [
      "SEO Strategy",
      "On & off-page SEO",
      "Technical SEO",
      "Content production",
      "Link building",
      "Site architecture",
      "Programmatic SEO",
      "Search intent analysis & mapping",
      "Market research",
      "Website development & CRO",
      "Analytics & reporting",
      "Management & consulting",
    ],
    theme: "dark",
  }
];

const cardStyles = {
  light: {
    base: "bg-white text-gray-900",
    chip: "bg-gray-100 text-gray-800",
    header: "text-gray-900",
    border: "border border-gray-200",
    text:"text-black",
    chipClass: "rounded-full text-[13px] font-inter font-semibold border-black uppercase tracking-[0.2em] border border-dashed text-black bg-transparent px-[12px] py-[5px]"
  },
  dark: {
    base: "bg-[#04070f] text-white",
    chip: "bg-white/10 text-white",
    header: "text-white",
    border: "border border-[#fff]/30 ",
    text:"text-white",
    chipClass: "rounded-full text-[13px] font-inter font-semibold border border-white/10 border-dashed uppercase tracking-[0.2em] bg-white/10 text-white px-[12px] py-[5px]"
  },
};

const statSections = [
  {
    id: "industries",
    value: "2",
    body: (
      <>
        Industries we specialize in: <span className="font-semibold text-[#695ae1]">SaaS & Fintech</span>. We believe that narrow focus, wider contextual understanding of the market & deep expertise yield asymmetrical returns.
      </>
    ),
  },
  {
    id: "registered-users",
    value: "84M+",
    body: (
      <>
        The number of <span className="font-semibold text-[#695ae1]">registered users attributed</span> directly to the work of our team, from our foundation to the end of 2024. We can’t wait to update this number on January 1, 2026.
      </>
    ),
    link: {
      label: "All case studies",
      href: "/case-studies",
    },
  },
];

const ServiceHighlights = () => {
  return (
    <section className="section top-border pb-12">
       <div className="mt-16 relative min-h-[320px]">
          <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-90">
            <div className="w-full max-w-3xl rounded-xl shadow-2xl">
              <Image
                src="https://framerusercontent.com/images/aootIzwv3wiOmpUg9vnbUWVqA1U.png"
                alt="AI Search Growth"
                width={420}
                height={260}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
            <div className="inline-block px-6 py-2 mb-6 rounded-full border border-[#7c3aed] bg-[#1a0033] shadow-[0_0_0_2px_rgba(124,58,237,0.2)]">
              <p className="text-sm font-medium text-white">AI geo optimization + LLM search is the new search frontier for SaaS & fintech</p>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
              style={{ background: "linear-gradient(0deg, rgba(255,255,255,0.8) 0%, #fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Build discoverability where AI search surfaces your product
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-2">
              We combine enterprise SEO rigor with LLM-first schema, intent mapping, and citation hygiene so your platform leads the sources AI answers cite.
            </p>
          </div>
        </div>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => {
            const styles = cardStyles[card.theme];
            return (
              <div
                key={card.id}
                className={`group relative flex flex-col gap-6 rounded-xl p-8 transition-transform duration-300 hover:-translate-y-1 ${styles.base} ${styles.border} shadow-2xl border-opacity-60`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="relative h-36 w-full overflow-hidden border border-white/20 bg-white/5">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 200px"
                        className={`object-cover transition-opacity duration-500 ${card.secondaryImage ? "opacity-100 group-hover:opacity-0" : ""}`}
                      />
                      {card.secondaryImage && (
                        <Image
                          src={card.secondaryImage}
                          alt={`${card.title} hover`}
                          fill
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-2xl font-semibold transition-colors duration-300 ${styles.header} group-hover:text-[#695ae1]`}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <p className={`opacity-90 ${styles.text}`}>{card.description}</p>
                </div>
                  <div className="h-px w-full bg-gray-800" />
                
                <div className="flex flex-wrap gap-3">
                  {card.chips.map((chip) => (
                    <span key={chip} className={styles.chipClass}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {statSections.map((section) => (
            <div key={section.id} className="space-y-4 border border-[#fff]/30  bg-[#04070f] text-white p-6 md:p-8 rounded-2xl">
              <p className="text-5xl font-semibold tracking-tight text-white">{section.value}</p>
              <p className="text-base text-white">{section.body}</p>
              {section.link && (
                <a href={section.link.href} className="text-sm font-semibold text-[#695ae1] transition hover:text-white">
                  {section.link.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;