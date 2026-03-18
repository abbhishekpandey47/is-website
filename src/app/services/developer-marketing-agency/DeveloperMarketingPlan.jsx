'use client';

import { useEffect, useRef, useState } from 'react';

// Image assets from Figma
const imgBackground = "https://www.figma.com/api/mcp/asset/461a7d0e-4bc9-4163-93d7-33ada83da67b";
const imgGrid       = "https://www.figma.com/api/mcp/asset/af990093-bd75-4801-8967-6048ef181a5f";
const imgGlow       = "https://www.figma.com/api/mcp/asset/78c90c06-35f7-4697-a965-3ce520a8eb6d";
const imgHexFilled  = "https://www.figma.com/api/mcp/asset/9ba0320a-3974-45e6-ab7c-589e384ba8f7";
const imgHexDim     = "https://www.figma.com/api/mcp/asset/03235053-2180-4682-9d28-e2ca93d41f7e";
const imgHexTopLeft = "https://www.figma.com/api/mcp/asset/50e7c223-aec6-4042-a1d9-1f8aee9fc006";

const imgDevContent = "https://www.figma.com/api/mcp/asset/56396b3e-08f6-49e1-bc19-39f82af73641";
const imgCommunity  = "https://www.figma.com/api/mcp/asset/e3dfcccc-1e29-4f67-9030-afa1cb1d942b";
const imgWebConv    = "https://www.figma.com/api/mcp/asset/2b48f7a8-eab8-4c64-8e91-c6b525289290";
const imgGithub     = "https://www.figma.com/api/mcp/asset/4d28f54a-673b-4aab-a2b8-029c6c3f04e5";
const imgAiSearch   = "https://www.figma.com/api/mcp/asset/da89f272-1b72-4264-b580-476b74400f61";

// ─── Canvas dimensions ──────────────────────────────────────────────────────
// Coordinate system is 1400×600 (scaled from the original 1920×820 Figma canvas
// by a ratio of 1400/1920 ≈ 0.729). This means scale = containerWidth/1400,
// which gives ~0.82 at a 1200px screen instead of ~0.6, appearing larger.
const CANVAS_W = 1400;
const CANVAS_H = 600;

// Hex tile dimensions in canvas-space (172×198 × 0.729)
const HEX_W = 125;
const HEX_H = 144;

const STAGES = [
  {
    title: "Developer Content",
    tags: ["Technical Blogs", "Use cases guides", "Multi-platform distribution (Dev.to, Medium)"],
    image: imgDevContent,
    hex:      { x: 198, y: 125 },
    label:    { x: 185, y: 312 },
    tags_pos: { x: 185, y: 352, w: 185 },
  },
  {
    title: "Developer Community Presence",
    tags: ["Reddit", "Slack/Discord"],
    image: imgCommunity,
    hex:      { x: 413, y: 248 },
    label:    { x: 399, y: 448 },
    tags_pos: { x: 399, y: 498, w: 140 },
  },
  {
    title: "Web Conversion Layer",
    tags: ["Product docs", "Release notes"],
    image: imgWebConv,
    hex:      { x: 629, y: 123 },
    label:    { x: 635, y: 312 },
    tags_pos: { x: 635, y: 373, w: 140 },
  },
  {
    title: "Github Presence",
    tags: ["Example repos", "Templates", "Starter kits"],
    image: imgGithub,
    hex:      { x: 845, y: 248 },
    label:    { x: 854, y: 448 },
    tags_pos: { x: 854, y: 487, w: 140 },
  },
  {
    title: "AI and Search-Visibility",
    tags: ["LLM visibility", "FAQ & structured answers", "Citation tracking & gap analysis"],
    image: imgAiSearch,
    hex:      { x: 1058, y: 123 },
    label:    { x: 1046, y: 312 },
    tags_pos: { x: 1046, y: 362, w: 200 },
  },
];

const DIM_HEXES = [
  { frame: imgHexTopLeft, x: 125, y: 0   },
  { frame: imgHexDim,     x: 342, y: 123 },
  { frame: imgHexDim,     x: 485, y: 123 },
  { frame: imgHexDim,     x: 915, y: 123 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function HexTile({ frame, image, x, y, dimmed }) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, width: HEX_W, height: HEX_H, opacity: dimmed ? 0.7 : 1 }}
      aria-hidden="true"
    >
      <img alt="" src={frame} className="absolute inset-0 w-full h-full" loading="lazy" />
      {image && (
        <img
          alt=""
          src={image}
          loading="lazy"
          className="absolute object-cover [clip-path:polygon(25%_6.5%,75%_6.5%,100%_50%,75%_93.5%,25%_93.5%,0_50%)]"
          style={{ left: '5%', top: '6%', width: '90%', height: '88%' }}
        />
      )}
    </div>
  );
}

function Tag({ text }) {
  return (
    <div className="flex items-stretch border border-[#8157f2] bg-[#20103d]/65 rounded-[4px] overflow-hidden">
      <span className="w-[14px] shrink-0 bg-[#8157f2]" />
      <span className="px-2.5 py-1.5 text-[13px] leading-tight text-[#dadada]">{text}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DeveloperMarketingPlan() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      // Account for section horizontal padding (px-10 = 80px at xl, px-6 = 48px below)
      const padding = window.innerWidth >= 1280 ? 80 : 48;
      const w = window.innerWidth - padding;
      // Scale canvas to exactly fill container width — no overflow possible
      setScale(w / CANVAS_W);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0a1a]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img alt="" src={imgBackground} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-[#0d0a1a]/50 pointer-events-none" />

      {/* Grid dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          alt=""
          src={imgGrid}
          className="absolute top-0 opacity-55"
          style={{ width: '1920px', left: '50%', transform: 'translateX(-50%)' }}
          loading="lazy"
        />
      </div>

      {/* Left purple glow */}
      <div className="absolute pointer-events-none overflow-hidden"
           style={{ top: 0, left: '-88px', width: '600px', height: '70%' }}>
        <img alt="" src={imgGlow} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 xl:px-10 pt-10 pb-12 lg:pt-12 lg:pb-16">

        {/* ── Header ────────────────────────────────────────────────────────── */}
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

        {/* ── Scaled hex canvas — shown at lg (1024px+) ─────────────────────── */}
        <div
          ref={containerRef}
          className="hidden lg:block relative overflow-hidden"
          style={{ height: CANVAS_H * scale }}
        >
          {/* Inner canvas: 1400×600, scaled to fill container exactly */}
          <div
            className="absolute top-0 left-0"
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
            }}
          >
            {/* Decorative dim hexes */}
            {DIM_HEXES.map((h, i) => (
              <HexTile key={`dim-${i}`} frame={h.frame} x={h.x} y={h.y} dimmed />
            ))}

            {/* Main hexes with icons */}
            {STAGES.map((stage) => (
              <HexTile
                key={`hex-${stage.title}`}
                frame={imgHexFilled}
                image={stage.image}
                x={stage.hex.x}
                y={stage.hex.y}
              />
            ))}

            {/* Labels + tags */}
            {STAGES.map((stage) => (
              <div key={`label-${stage.title}`}>
                <h3
                  className="absolute text-[#f2f2f2] text-[15px] leading-snug quicksand-semibold"
                  style={{ left: stage.label.x, top: stage.label.y, maxWidth: 190 }}
                >
                  {stage.title}
                </h3>
                <div
                  className="absolute flex flex-col gap-[8px]"
                  style={{ left: stage.tags_pos.x, top: stage.tags_pos.y, width: stage.tags_pos.w }}
                >
                  {stage.tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Card grid — mobile / tablet (below lg / 1024px) ────────────────────────── */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
          {STAGES.map((stage, idx) => (
            <article
              key={stage.title}
              className={`border border-[#8157f2]/50 bg-[#100a24]/90 rounded-xl p-5 ${idx === 4 ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-[92px] shrink-0">
                  <img alt="" src={imgHexFilled} className="absolute inset-0 w-full h-full" loading="lazy" />
                  <img
                    alt=""
                    src={stage.image}
                    loading="lazy"
                    className="absolute object-cover [clip-path:polygon(25%_6.5%,75%_6.5%,100%_50%,75%_93.5%,25%_93.5%,0_50%)]"
                    style={{ left: '5%', top: '6%', width: '90%', height: '88%' }}
                  />
                </div>
                <div>
                  <h3 className="text-white quicksand-semibold text-xl leading-tight">{stage.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
