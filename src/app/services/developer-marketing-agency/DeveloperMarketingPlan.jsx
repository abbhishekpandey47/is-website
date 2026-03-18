'use client';

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

// ─── Positioning math ─────────────────────────────────────────────────────────
//
// Figma: section is 1920px wide × 1095px tall.
// Hex grid content starts at y=228px (below title area).
// Canvas height = 820px maps to Figma y range 228–1048.
//
// horizontal %  = figmaX / 1920
// vertical   %  = (figmaY - 228) / 820
//
// Main hexes (figma y):  top row ≈ 397px  → (397-228)/820 = 20.6%
//                        bottom row ≈ 568px → (568-228)/820 = 41.5%
//
// Labels (figma y): top-row labels ≈ 656px → (656-228)/820 = 52.2%
//                   bot-row labels ≈ 842px → (842-228)/820 = 74.9%
//
// Tags start ~54px below label top:
//   top-row  710px → (710-228)/820 = 58.8%
//   bot-row  911px → (911-228)/820 = 83.3%

const STAGES = [
  {
    title: "Developer Content",
    tags: ["Technical Blogs", "Use cases guides", "Multi-platform distribution (Dev.to, Medium)"],
    image: imgDevContent,
    hexLeft: "14.1%", hexTop: "20.6%",           // figma x=271, y=399
    labelLeft: "13.2%", labelTop: "52.2%",        // figma x=254, y=656
    tagsLeft: "13.2%",  tagsTop: "58.8%",         // figma x=254, y=710
    tagsWidth: "220px",
  },
  {
    title: "Developer Community Presence",
    tags: ["Reddit", "Slack/Discord"],
    image: imgCommunity,
    hexLeft: "29.5%", hexTop: "41.5%",            // figma x=566, y=568
    labelLeft: "28.5%", labelTop: "74.9%",        // figma x=547, y=842
    tagsLeft: "28.5%",  tagsTop: "83.3%",         // figma x=547, y=911
    tagsWidth: "145px",
  },
  {
    title: "Web Conversion Layer",
    tags: ["Product docs", "Release notes"],
    image: imgWebConv,
    hexLeft: "44.9%", hexTop: "20.6%",            // figma x=862, y=397
    labelLeft: "45.3%", labelTop: "52.2%",        // figma x=870, y=656
    tagsLeft: "45.3%",  tagsTop: "62.4%",         // figma x=870, y=740
    tagsWidth: "145px",
  },
  {
    title: "Github Presence",
    tags: ["Example repos", "Templates", "Starter kits"],
    image: imgGithub,
    hexLeft: "60.3%", hexTop: "41.5%",            // figma x=1158, y=568
    labelLeft: "60.9%", labelTop: "74.9%",        // figma x=1171, y=842
    tagsLeft: "60.9%",  tagsTop: "81.5%",         // figma x=1171, y=896
    tagsWidth: "150px",
  },
  {
    title: "AI and Search-Visibility",
    tags: ["LLM visibility", "FAQ & structured answers", "Citation tracking & gap analysis"],
    image: imgAiSearch,
    hexLeft: "75.6%", hexTop: "20.6%",            // figma x=1451, y=397
    labelLeft: "74.6%", labelTop: "52.2%",        // figma x=1434, y=656
    tagsLeft: "74.6%",  tagsTop: "60.6%",         // figma x=1434, y=725
    tagsWidth: "245px",
  },
];

// Decorative empty hexes — same positioning math
const DIM_HEXES = [
  { frame: imgHexTopLeft, left: "9%",    top: "0%"    }, // figma x=172, y=228
  { frame: imgHexDim,     left: "24.4%", top: "20.6%" }, // figma x=469, y=397
  { frame: imgHexDim,     left: "34.6%", top: "20.6%" }, // figma x=665, y=397
  { frame: imgHexDim,     left: "65.4%", top: "20.6%" }, // figma x=1255, y=397
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function HexTile({ frame, image, left, top, imageClass = "object-cover", dimmed }) {
  return (
    <div
      className="absolute w-[172px] h-[198px]"
      style={{ left, top, opacity: dimmed ? 0.7 : 1 }}
      aria-hidden="true"
    >
      <img alt="" src={frame} className="absolute inset-0 w-full h-full" loading="lazy" />
      {image && (
        <img
          alt=""
          src={image}
          loading="lazy"
          className={`absolute left-[8%] top-[10%] w-[84%] h-[80%] [clip-path:polygon(25%_6.5%,75%_6.5%,100%_50%,75%_93.5%,25%_93.5%,0_50%)] ${imageClass}`}
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
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0a1a]">
      {/* Background image */}
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
          style={{ width: "1920px", left: "50%", transform: "translateX(-50%)" }}
          loading="lazy"
        />
      </div>

      {/* Left purple glow */}
      <div
        className="absolute pointer-events-none overflow-hidden"
        style={{ top: 0, left: "-88px", width: "600px", height: "70%" }}
      >
        <img alt="" src={imgGlow} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto px-6 xl:px-10 pt-10 pb-12 lg:pt-12 lg:pb-16">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="inline-flex items-baseline flex-wrap justify-center gap-x-3 text-white quicksand-bold text-3xl md:text-4xl lg:text-[48px] lg:leading-[60px] tracking-[-0.02em]">
            <span>Developer Marketing</span>
            <span className="relative inline-block px-1">
              <span
                className="absolute inset-0 rounded-sm"
                style={{ backgroundColor: "#5f64ff" }}
                aria-hidden="true"
              />
              <span className="relative">Plan</span>
            </span>
          </h2>
          <p className="mt-3 text-white/75 text-sm md:text-base lg:text-[17px] max-w-3xl mx-auto leading-relaxed">
            Driving growth through developer content, community engagement,
            stronger web conversions, GitHub momentum, and AI search visibility.
          </p>
        </div>

        {/* ── Desktop hex canvas ─────────────────────────────────────────────── */}
        <div className="hidden xl:block relative h-[820px]">

          {/* Decorative dim hexes */}
          {DIM_HEXES.map((h, i) => (
            <HexTile key={`dim-${i}`} frame={h.frame} left={h.left} top={h.top} dimmed />
          ))}

          {/* Main hexes with icons */}
          {STAGES.map((stage) => (
            <HexTile
              key={`hex-${stage.title}`}
              frame={imgHexFilled}
              image={stage.image}
              left={stage.hexLeft}
              top={stage.hexTop}
            />
          ))}

          {/* Labels + tags — absolutely positioned below each hex */}
          {STAGES.map((stage) => (
            <div key={`label-${stage.title}`}>
              <h3
                className="absolute text-[#f2f2f2] text-[20px] leading-snug quicksand-semibold max-w-[240px]"
                style={{ left: stage.labelLeft, top: stage.labelTop }}
              >
                {stage.title}
              </h3>
              <div
                className="absolute flex flex-col gap-[6px]"
                style={{ left: stage.tagsLeft, top: stage.tagsTop, width: stage.tagsWidth }}
              >
                {stage.tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile / tablet card grid ──────────────────────────────────────── */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    className="absolute left-[8%] top-[10%] w-[84%] h-[80%] object-cover [clip-path:polygon(25%_6.5%,75%_6.5%,100%_50%,75%_93.5%,25%_93.5%,0_50%)]"
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
