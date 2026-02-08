"use client";

const backgroundPatterns = {
  card: "url(\"data:image/svg+xml,%3Csvg%20width%3D%27410%27%20height%3D%27449%27%20viewBox%3D%270%200%20410%20449%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20clip-path%3D%27url(%23clip0_195_6855)%27%3E%3Crect%20width%3D%27410%27%20height%3D%27449%27%20rx%3D%2722.948%27%20fill%3D%27%230E0B1B%27%2F%3E%3Cg%20opacity%3D%270.5%27%20filter%3D%27url(%23filter0_f_195_6855)%27%3E%3Crect%20width%3D%27459.819%27%20height%3D%27384.712%27%20transform%3D%27matrix(-0.79866%20-0.601782%20-0.601782%200.79866%20634.551%20289.562)%27%20fill%3D%27url(%23paint0_linear_195_6855)%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%27filter0_f_195_6855%27%20x%3D%27-57.2498%27%20y%3D%27-80.1976%27%20width%3D%27784.849%27%20height%3D%27770.063%27%20filterUnits%3D%27userSpaceOnUse%27%20color-interpolation-filters%3D%27sRGB%27%3E%3CfeFlood%20flood-opacity%3D%270%27%20result%3D%27BackgroundImageFix%27%2F%3E%3CfeBlend%20mode%3D%27normal%27%20in%3D%27SourceGraphic%27%20in2%3D%27BackgroundImageFix%27%20result%3D%27shape%27%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%2746.5243%27%20result%3D%27effect1_foregroundBlur_195_6855%27%2F%3E%3C%2Ffilter%3E%3ClinearGradient%20id%3D%27paint0_linear_195_6855%27%20x1%3D%27459.819%27%20y1%3D%271.69576e-05%27%20x2%3D%27-70.9646%27%20y2%3D%27196.769%27%20gradientUnits%3D%27userSpaceOnUse%27%3E%3Cstop%20stop-color%3D%27%230D0A1A%27%2F%3E%3Cstop%20offset%3D%270.716097%27%20stop-color%3D%27%23473B79%27%20stop-opacity%3D%270.8%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%239B91C6%27%20stop-opacity%3D%270.8%27%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%27clip0_195_6855%27%3E%3Crect%20width%3D%27410%27%20height%3D%27449%27%20rx%3D%2722.948%27%20fill%3D%27white%27%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\")",
  cardWide: "url(\"data:image/svg+xml,%3Csvg%20width%3D%27729%27%20height%3D%27450%27%20viewBox%3D%270%200%20729%20450%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20clip-path%3D%27url(%23clip0_195_6843)%27%3E%3Crect%20width%3D%27729%27%20height%3D%27450%27%20rx%3D%2722.948%27%20fill%3D%27%230E0B1B%27%2F%3E%3Cg%20opacity%3D%270.5%27%20filter%3D%27url(%23filter0_f_195_6843)%27%3E%3Crect%20x%3D%27573.052%27%20y%3D%27230.149%27%20width%3D%27459.819%27%20height%3D%27384.712%27%20transform%3D%27rotate(143.002%20573.052%20230.149)%27%20fill%3D%27url(%23paint0_linear_195_6843)%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%27filter0_f_195_6843%27%20x%3D%27-118.749%27%20y%3D%27-170.154%27%20width%3D%27784.849%27%20height%3D%27770.063%27%20filterUnits%3D%27userSpaceOnUse%27%20color-interpolation-filters%3D%27sRGB%27%3E%3CfeFlood%20flood-opacity%3D%270%27%20result%3D%27BackgroundImageFix%27%2F%3E%3CfeBlend%20mode%3D%27normal%27%20in%3D%27SourceGraphic%27%20in2%3D%27BackgroundImageFix%27%20result%3D%27shape%27%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%2746.5243%27%20result%3D%27effect1_foregroundBlur_195_6843%27%2F%3E%3C%2Ffilter%3E%3ClinearGradient%20id%3D%27paint0_linear_195_6843%27%20x1%3D%271032.87%27%20y1%3D%27230.149%27%20x2%3D%27502.087%27%20y2%3D%27426.918%27%20gradientUnits%3D%27userSpaceOnUse%27%3E%3Cstop%20stop-color%3D%27%230D0A1A%27%2F%3E%3Cstop%20offset%3D%270.716097%27%20stop-color%3D%27%23473B79%27%20stop-opacity%3D%270.8%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%239B91C6%27%20stop-opacity%3D%270.8%27%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%27clip0_195_6843%27%3E%3Crect%20width%3D%27729%27%20height%3D%27450%27%20rx%3D%2722.948%27%20fill%3D%27white%27%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\")",
};

const defaultCards = [
  {
    title: 'LLM Search Engine Optimization',
    description:
      'We built a proprietary LLM-Readiness Checklist that audits every page for clarity, structure, and factual accuracy—so AI engines understand, trust, and recommend your content.',
    img: '/aeo/1.svg',
    gridSpan: 'md:col-span-5',
    background: 'card',
    backgroundPosition: 'center',
    imageClassName: 'object-top',
    overlayImage: '/aeo/3.1.svg',
  },
  {
    title: 'AI Overview Visibility',
    description: 'We optimize your content for Google AI Overviews, expanding visibility across search and AI.',
    img: '/aeo/2.svg',
    gridSpan: 'md:col-span-3',
    background: 'card',
    backgroundPosition: 'center',
    imageClassName: 'object-bottom',
    overlayImage: '/aeo/3.2.svg',
  },
  {
    title: 'High Intent Content Creation',
    description:
      'We answer real buying questions so AI recommends your brand when customers are ready to decide.',
    img: '/aeo/3.svg',
    gridSpan: 'md:col-span-4',
    background: 'cardWide',
    backgroundPosition: 'top',
    imageClassName: 'object-center',
    overlayImage: '/aeo/3.3.svg',
  },
  {
    title: 'Backlink Building',
    description: 'Trusted backlinks that make Google and LLMs recognize and cite your brand.',
    img: '/aeo/4.svg',
    gridSpan: 'md:col-span-3',
    background: 'cardWide',
    backgroundPosition: 'top',
    imageClassName: 'object-top',
    overlayImage: '/aeo/3.4.svg',
  },
  {
    title: 'SEO Reporting & Analytics',
    description:
      'Transparent reporting across rankings, AI Overviews, and LLM visibility—showing exactly what’s working and what’s next.',
    img: '/aeo/5.svg',
    gridSpan: 'md:col-span-4',
    background: 'card',
    backgroundPosition: 'center',
    imageClassName: 'object-top',
    overlayImage: '/aeo/3.5.svg',
  },
  {
    title: 'Conversion Rate Optimization',
    description:
      'We design buyer journeys that turn clicks and AI mentions into conversions—handling UX, technical audits, and landing pages so traffic becomes revenue.',
    img: '/aeo/6.svg',
    gridSpan: 'md:col-span-5',
    background: 'card',
    backgroundPosition: 'center',
    imageClassName: 'object-bottom',
    overlayImage: '/aeo/3.6.svg',
  },
];

export default function ThirdSection({ cards = defaultCards }) {
  return (
    <section className="relative w-full py-20 px-4 overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_rgba(2,6,23,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(14,165,233,0.2),_rgba(2,6,23,0)_50%)]" />
      </div>

      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Win visibility everywhere with GEO
        </h2>
        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
          We help you rank on Google, appear in AI Overviews, and get recommended by LLMs—so your brand stays visible wherever answers are generated.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {cards.map((card, index) => {
            const cardStyle = {
              backgroundColor: 'rgba(8, 6, 18, 0.95)',
              backgroundBlendMode: 'screen',
            };

            const backgroundImages = [];
            if (card.overlayImage) {
              backgroundImages.push(`url(${card.overlayImage})`);
            }
            if (card.background) {
              backgroundImages.push(backgroundPatterns[card.background]);
            }

            if (backgroundImages.length) {
              cardStyle.backgroundImage = backgroundImages.join(', ');
            }

            const baseBackgroundSize = 'cover';

            if (card.overlayImage) {
              cardStyle.backgroundSize = `${baseBackgroundSize}`;
            } else {
              cardStyle.backgroundSize = baseBackgroundSize;
            }

            return (
              <div
                key={`${card.title}-${index}`}
                className={`relative rounded-3xl bg-slate-950/95 border border-white/15 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${card.gridSpan ?? ''} ${card.className ?? ''}`}
                style={cardStyle}
              >
                <div className="relative z-10 p-6 md:p-7">
                  <h3 className="text-white text-xl md:text-2xl font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {card.title}
                  </h3>
                  <p className="text-neutral-400 text-base mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}