"use client";
import Image from "next/image";

const cards = [
  {
    id: "seo",
    title: "Search Engine Optimization",
    description:
      "We optimize B2B websites to rank on traditional search engines, covering the whole process from technical SEO to content-led growth.",
    image:
      "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/68b834c2431350620e42cc16_Search%20Engine%20Optimization.webp",
    secondaryImage:
      "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/68703c8b4f0f9c44061fda37_Search%20Engine%20Optimization%20HOVER%20(2)%20(1).png",
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
    theme: "light",
  },
  {
    id: "geo",
    title: "Generative Engine Optimization",
    description:
      "We optimize SaaS & Fintech websites for visibility inside AI generated answers and citations from LLM search engines.",
    image:
      "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/686ff9c5e7f2e96ecddec57a_Frame%201000003577%20(1).png",
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
    theme: "dark",
  },
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
    border: "border border-white/10",
    text:"text-white",
    chipClass: "rounded-full text-[13px] font-inter font-semibold border border-white/10 border-dashed uppercase tracking-[0.2em] bg-white/10 text-white px-[12px] py-[5px]"
  },
};

const ServiceHighlights = () => {
  return (
    <section className="section top-border mt-10">
      <div className="container mx-auto px-6">
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
      </div>
    </section>
  );
};

export default ServiceHighlights;