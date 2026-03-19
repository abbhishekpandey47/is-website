export default function DeveloperMarketingPlan() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0a1a] mb-20">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/developerMarketing/Hero.svg"
          alt=""
          className="w-full h-full object-cover opacity-55"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-[#0d0a1a]/45 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 xl:px-10 py-8 lg:py-12">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="inline-flex items-baseline flex-wrap justify-center gap-x-3 text-white quicksand-bold text-3xl md:text-4xl lg:text-[48px] lg:leading-[60px] tracking-[-0.02em]">
            <span>Developer Marketing</span>
            <span className="relative inline-block px-1">
              <span className="absolute inset-0 rounded-sm" style={{ backgroundColor: '#5f64ff' }} aria-hidden="true" />
              <span className="relative">Plan</span>
            </span>
          </h2>
          <p className="mt-3 text-white/75 text-sm md:text-base lg:text-[17px] max-w-3xl mx-auto leading-relaxed">
            Driving growth through developer content, community engagement,
            stronger web conversions, GitHub momentum, and AI search visibility.
          </p>
        </div>

        <img
          src="/developerMarketing/developerMarketingPlan.svg"
          alt="Developer Marketing Plan"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}
