import Image from "next/image";
import Link from "next/link";
import ScrollToFaqButton from "./ScrollToFaqButton";
// blob GIF removed; using Framer HTML background instead

const rotatingBrands = [
  { name: "ChatGPT", key: "chatgpt", logo: "/CommLogo/chatgpt.png" },
  { name: "Claude", key: "claude", logo: "/CommLogo/claude.png" },
  { name: "Perplexity", key: "perplexity", logo: "/CommLogo/perplexity.png" },
  { name: "Google AI", key: "google", logo: "/CommLogo/gemini.png" },
  { name: "ChatGPT", key: "chatgpt", logo: "/CommLogo/chatgpt.png" },
];

function BrandBadge({ brand }) {
  return (
    <span className="brand-badge" data-brand={brand.key} aria-hidden>
      <span
        className="brand-badge-inner"
        style={{ transform: "scale(0.9) rotate(6.5deg)" }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={108}
          height={108}
          sizes="(min-width: 640px) 54px, 40px"
          priority={false}
          className="brand-logo"
        />
      </span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section w-full mt-24 flex justify-center items-center overflow-hidden">
      <div className="z-10 flex flex-row items-center justify-between w-full max-w-6xl px-6 py-24">
        {/* Left Content */}
        <div className="flex flex-col gap-6 items-start">
          <div className="hero-heading w-full text-center mb-6">
            {/* softened blue-purple halo background */}
            <div
              className="heading-bg absolute left-1/2 -translate-x-1/2"
              aria-hidden
            />
            <div className="relative z-10">
              <h1
                className="hero-line"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: "0.75rem",
                  whiteSpace: "nowrap",
                  fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                Show up in{" "}
                <span
                  className="hero-line brand-rotator"
                  style={{
                    height: "clamp(3rem, 5vw, 4rem)",
                  }}
                >
                  {rotatingBrands.map((brand, index) => (
                    <span
                      key={`${brand.key}-${index}`}
                      className="rot-word"
                      data-brand={brand.key}
                    >
                      <BrandBadge brand={brand} />
                      <span className="rot-word-text">{brand.name}</span>
                    </span>
                  ))}
                </span>{" "}
                answers
               
              </h1>
              <h1
                className="hero-line mt-2"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                where technical buyers actually decide.
              </h1>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <p
              className="text-lg md:text-xl text-white/90 mb-6 text-center max-w-3xl"
              style={{ lineHeight: 1.6 }}
            >
              AI Search is reshaping how customers search and find solutions for
              their needs. Our LLM Visibility Audit enables SaaS companies to
              track, optimize, and boost their presence in LLM-powered Searches,
              keeping you visible, relevant, and ahead of the competition
            </p>
          </div>
          <div className="flex w-full justify-center gap-4 mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-sm"
            >
              {/* Play SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-5 h-5 fill-black"
              >
                <g>
                  <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                </g>
              </svg>
              Book a Call
            </Link>
            <ScrollToFaqButton className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-b from-black/10 to-black/20 border border-white/10 backdrop-blur-sm shadow-inner shadow-white/10 text-sm">
              Learn More
            </ScrollToFaqButton>
          </div>
        </div>
        {/* Right Content (Video + Canvas + Dot Grid) */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          {/* Styled media card */}
          <div className="w-full relative">
            {/* Framer background (replaces blob GIF) */}
            <div
              className="framer-v5tokv absolute inset-0 pointer-events-none"
              data-framer-name="BG"
            >
              <div
                className="framer-q5ecxp"
                data-framer-name="Big Circle"
                style={{
                  willChange: "transform",
                  opacity: 1,
                  transform: "rotate(-44.28deg)",
                }}
              />
              <div
                className="framer-1mwerlq"
                data-framer-name="Small circle"
                style={{
                  willChange: "transform",
                  opacity: 1,
                  transform: "translate(-50%, -50%) rotate(217.92deg)",
                }}
              />
            </div>
            <style>{`
						.framer-v5tokv { position: absolute; inset: 0; overflow: visible; }
						.framer-v5tokv, .framer-v5tokv * { pointer-events: none; }
						.framer-q5ecxp {
							position: absolute;
							top: 10%;
							left: 60%;
							width: 520px;
							height: 520px;
							border-radius: 50%;
							background: radial-gradient(closest-side at 30% 30%, rgba(59,130,246,0.35), rgba(99,102,241,0.2) 40%, rgba(59,130,246,0.06) 70%, transparent 100%);
							filter: blur(60px) saturate(120%);
							transform-origin: 50% 50%;
							mix-blend-mode: screen;
							animation: framer-rotate-slow 30s linear infinite;
						}
						.framer-1mwerlq {
							position: absolute;
							top: 50%;
							left: 30%;
							width: 240px;
							height: 240px;
							border-radius: 50%;
							background: radial-gradient(closest-side at 40% 40%, rgba(59,130,246,0.22), rgba(79,70,229,0.15) 50%, transparent 100%);
							filter: blur(40px) saturate(120%);
							transform-origin: 50% 50%;
							mix-blend-mode: screen;
							animation: framer-rotate-fast 14s linear infinite reverse;
							transform: translate(-50%, -50%) rotate(217.92deg);
						}
						@keyframes framer-rotate-slow {
							0% { transform: rotate(-44.28deg) translateZ(0); }
							50% { transform: rotate(15deg) translateZ(0); }
							100% { transform: rotate(-44.28deg) translateZ(0); }
						}
						@keyframes framer-rotate-fast {
							0% { transform: translate(-50%, -50%) rotate(217.92deg) scale(1); }
							50% { transform: translate(-50%, -50%) rotate(300deg) scale(1.05); }
							100% { transform: translate(-50%, -50%) rotate(217.92deg) scale(1); }
						}

						/* Animated hero heading (gradient shift + subtle float) */
						.animated-heading {
							display: inline-block;
							background: linear-gradient(0deg, rgba(255,255,255,0.8) 0%, #fff 100%);
							-webkit-background-clip: text;
							background-clip: text;
							color: transparent;
							background-size: 200% 200%;
							animation: gradientShift 6s linear infinite, floatUp 3s ease-in-out infinite alternate;
						}

						@keyframes gradientShift {
							0% { background-position: 0% 50%; }
							50% { background-position: 100% 50%; }
							100% { background-position: 0% 50%; }
						}

						@keyframes floatUp {
							0% { transform: translateY(0); }
							100% { transform: translateY(-6px); }
						}

						/* Hero heading styles */
						.hero-heading { position: relative; padding-top: 8px; padding-bottom: 8px; }
						.heading-bg { width: 820px; height: 420px; background: radial-gradient(circle at 50% 45%, rgba(59,130,246,0.55) 0%, rgba(79,70,229,0.35) 45%, transparent 70%); filter: blur(88px) saturate(120%); z-index: 0; border-radius: 50%; top: -36px; }
						.hero-line { font-weight: 700; color: white; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
              .brand-rotator { display: inline-flex; position: relative; height: clamp(3rem, 5vw, 4rem); vertical-align: middle; }
							.rot-word { position:absolute; transform: translate(-50%, 18px) scale(0.95); opacity: 0; font-size: clamp(2.2rem, 5vw, 5rem); line-height: 1; font-weight: 800; text-align: center; display: inline-flex ; align-items: center; gap: 0.4rem; justify-content: center; }
							.rot-word { will-change: transform, opacity; }
							.rot-word:nth-child(1) { animation: rotCycle 16s ease-in-out infinite; animation-delay: 0s; }
							.rot-word:nth-child(2) { animation: rotCycle 16s ease-in-out infinite; animation-delay: 4s; }
							.rot-word:nth-child(3) { animation: rotCycle 16s ease-in-out infinite; animation-delay: 8s; }
							.rot-word:nth-child(4) { animation: rotCycle 16s ease-in-out infinite; animation-delay: 12s; }

							@keyframes rotCycle {
								0% {
									opacity: 0;
									transform: translate(-50%, 30px) scale(0.85);
								}
								8% {
									opacity: 1;
									transform: translate(-50%, 0) scale(1);
								}
								32% {
									opacity: 1;
									transform: translate(-50%, 0) scale(1);
								}
								40% {
									opacity: 0;
									transform: translate(-50%, -18px) scale(0.9);
								}
								100% {
									opacity: 0;
									transform: translate(-50%, -18px) scale(0.9);
								}
							}
							.rot-word-text { font-size: clamp(1.5rem, 4vw, 4.25rem); letter-spacing: 0.08em; font-family: inherit; }
							.brand-badge {
								position: relative;
								display: inline-flex;
								align-items: center;
								justify-content: center;
								width: 2.25rem;
								height: 2.25rem;
								margin: 0 0.25rem 0 0;
								border-radius: 0.85rem;
								background: rgba(255, 255, 255, 0.92);
								box-shadow: 0 18px 48px rgba(15, 23, 42, 0.35);
								border: 1px solid rgba(0, 0, 0, 0.08);
								transform: rotate(6.5deg);
							}
							@media (min-width: 640px) {
								.brand-badge {
									width: 3.25rem;
									height: 3.25rem;
									margin: 0 0.65rem 0 0;
									border-radius: 1.25rem;
								}
							}
							.brand-badge-inner {
								display: flex;
								width: 100%;
								height: 100%;
								align-items: center;
								justify-content: center;
								animation: badgeFloat 8s ease-in-out infinite;
							}
							.brand-logo {
								width: 60%;
								height: 60%;
								object-fit: contain;
								filter: drop-shadow(0 6px 6px rgba(15, 23, 42, 0.25));
							}
							@keyframes badgeFloat {
								0% { transform: translateY(0); }
								50% { transform: translateY(-2px); }
								100% { transform: translateY(0); }
							}
											@media (prefers-reduced-motion: reduce) {
												.brand-badge-inner { animation: none; }
											}
											.hero-section {
												background:
													radial-gradient(circle at 50% 42%, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.15) 28%, rgba(15, 23, 42, 0) 54%),
											}
										`}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
