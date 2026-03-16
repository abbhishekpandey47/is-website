"use client";

import dynamic from "next/dynamic";

const ContactPopupButton = dynamic(
  () => import("../../lp/reddit-marketing-agency/ContactPopupButton"),
  { ssr: false }
);

const ASSET_PATH = "/PostImages/developer-marketing-agency/services-fold";

// Shared card illustration wrapper with grid bg + corner glows
function IllustrationBox({ children, className = "" }) {
  return (
    <div
      className={`relative border border-[#454545] rounded-[15px] h-[216px] overflow-hidden ${className}`}
    >
      {/* Grid background */}
      <img
        src={`${ASSET_PATH}/grid-bg.png`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
      />
      {/* Corner glows */}
      <div className="absolute top-[-62px] right-[-64px] w-[1px] h-[1px] bg-transparent shadow-[0px_1px_215px_129px_#8258f2]" />
      <div className="absolute bottom-[-62px] left-[-64px] w-[1px] h-[1px] bg-transparent shadow-[0px_1px_215px_92px_#8157f2]" />
      {children}
    </div>
  );
}

// Shared blur blob for cards
function BlurBlob({ position = "top-right" }) {
  const posClass =
    position === "top-right"
      ? "left-[35px] top-[12px]"
      : "-left-[27px] -top-[78px]";
  const rotateClass =
    position === "top-right"
      ? "-rotate-[143deg] -scale-y-100"
      : "rotate-[143deg]";

  return (
    <div
      className={`absolute flex items-center justify-center w-[599px] h-[584px] ${posClass} pointer-events-none`}
    >
      <div className={`flex-none ${rotateClass}`}>
        <div
          className="w-[460px] h-[385px] blur-[47px] opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(250deg, rgb(13, 10, 26) 0%, rgba(71, 59, 121, 0.8) 72%, rgba(155, 145, 198, 0.8) 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Card 1: AEO/GEO Services ───
function AEOGEOCard() {
  return (
    <div className="bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] rounded-[23px] h-[449px] overflow-hidden relative">
      <BlurBlob position="top-right" />
      <div className="mx-auto mt-[23px] w-[376px]">
        <IllustrationBox>
          <div className="absolute left-1/2 -translate-x-1/2 top-[62px] w-[283px] h-[90px] overflow-hidden">
            {/* Progress bar bg */}
            <div className="absolute left-[13px] top-[70px] w-[257px] h-[6px] bg-[#d9d9d9] rounded-full" />
            {/* Progress bar fill */}
            <div className="absolute left-[13px] top-[70px] w-[199px] h-[6px] bg-[#5850b9] rounded-full" />
            {/* Search icon box */}
            <div className="absolute left-[14px] top-[14px] w-[36px] h-[37px] border-[1.17px] border-white rounded-[5px] overflow-hidden">
              <img
                src={`${ASSET_PATH}/search-area.svg`}
                alt=""
                className="absolute left-[2px] top-[4px] w-[28px] h-[28px]"
              />
            </div>
            {/* X button */}
            <img
              src={`${ASSET_PATH}/cross-outline.svg`}
              alt=""
              className="absolute left-[247px] top-[8px] w-[28px] h-[28px]"
            />
            {/* Text lines */}
            <div className="absolute left-[63px] top-[14px] w-[81px] h-[11px] bg-[#5850b9] rounded-full" />
            <div className="absolute left-[63px] top-[34px] w-[54px] h-[7px] bg-[#928ec5] rounded-full" />
            <div className="absolute left-[63px] top-[50px] w-[68px] h-[7px] bg-[#928ec5] rounded-full" />
          </div>
        </IllustrationBox>
      </div>
      <h3 className="absolute left-[26px] top-[266px] font-['Manrope'] font-semibold text-[22px] text-white capitalize">
        AEO/GEO Services
      </h3>
      <p className="absolute left-[26px] top-[300px] w-[366px] font-['Inter'] text-[16.5px] text-[#727272] tracking-[0.9px] leading-normal">
        Get your product cited when developers ask ChatGPT, Claude, or
        Perplexity. We audit your AI search visibility, optimize content
        structure with FAQ schema, and build prompt-aligned pages that LLMs
        actually reference.
      </p>
    </div>
  );
}

// ─── Card 2: Reddit Marketing Services ───
function RedditCard() {
  return (
    <div className="bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] rounded-[23px] h-[449px] overflow-hidden relative">
      <BlurBlob position="top-right" />
      <div className="mx-auto mt-[22px] w-[376px]">
        <IllustrationBox>
          {/* Upvote arrow rotated */}
          <div className="absolute left-[243px] top-[-14px] w-[185px] h-[185px] flex items-center justify-center">
            <div className="rotate-[19.2deg]">
              <img
                src={`${ASSET_PATH}/upvote-arrow.svg`}
                alt=""
                className="w-[145px] h-[145px]"
              />
            </div>
          </div>
          {/* Total Upvotes stat card */}
          <div className="absolute left-[26px] top-[78px] w-[145px] h-[80px] bg-[#1a2040] rounded-[8px] overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-[2px] w-[141px] h-[54px] rounded-[5px] bg-gradient-to-b from-[#5850b9] to-[#272453]" />
            <p className="absolute left-[10px] top-[12px] font-['Inter'] font-medium text-[9.4px] text-[#f7f7f7]">
              Total Upvotes
            </p>
            <p className="absolute left-[10px] top-[29px] font-['Inter'] font-semibold text-[14px] text-[#f7f7f7]">
              487
            </p>
            <div className="absolute left-[7px] top-[61px] w-[12px] h-[12px] overflow-hidden">
              <img src={`${ASSET_PATH}/arrow-up-1.svg`} alt="" className="w-full h-full" />
            </div>
            <p className="absolute left-[23px] top-[62px] font-['Inter'] font-medium text-[8.3px] text-[#0f6309]">
              +4.6%
            </p>
            <p className="absolute left-[55px] top-[62px] font-['Inter'] font-medium text-[8px] text-[#949494]">
              Than last month
            </p>
          </div>
          {/* Total Impressions stat card */}
          <div className="absolute left-[189px] top-[78px] w-[146px] h-[80px] bg-[#1a2040] rounded-[8px] overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-[2px] w-[142px] h-[54px] rounded-[5px] bg-gradient-to-b from-[#5850b9] to-[#272453]" />
            <p className="absolute left-[10px] top-[12px] font-['Inter'] font-medium text-[9.4px] text-[#f7f7f7]">
              Total Impressions
            </p>
            <p className="absolute left-[10px] top-[30px] font-['Inter'] font-semibold text-[14px] text-[#f7f7f7]">
              261,567
            </p>
            <div className="absolute left-[7px] top-[62px] w-[13px] h-[13px] overflow-hidden">
              <img src={`${ASSET_PATH}/arrow-up-2.svg`} alt="" className="w-full h-full" />
            </div>
            <p className="absolute left-[23px] top-[63px] font-['Inter'] font-medium text-[8.3px] text-[#0f6309]">
              +12.3%
            </p>
            <p className="absolute left-[61px] top-[63px] font-['Inter'] font-medium text-[8px] text-[#949494]">
              Than last month
            </p>
          </div>
        </IllustrationBox>
      </div>
      <h3 className="absolute left-[23px] top-[261px] font-['Manrope'] font-semibold text-[20px] text-white capitalize">
        Reddit Marketing Services
      </h3>
      <p className="absolute left-[23px] top-[294px] w-[369px] font-['Inter'] text-[16.5px] text-[#727272] tracking-[0.9px] leading-normal">
        We seed 40+ genuine technical contributions monthly across the
        subreddits where your buyers evaluate tools. Thread research,
        context-matched responses, aged accounts, and monthly visibility
        tracking no spam, just credibility that compounds.
      </p>
    </div>
  );
}

// ─── Card 3: Video Production (wide) ───
function VideoProductionCard() {
  return (
    <div className="bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] rounded-[23px] h-[450px] overflow-hidden relative">
      <BlurBlob position="bottom-left" />
      <div className="absolute left-1/2 -translate-x-1/2 mt-[32px] top-0 w-[665px]">
        <IllustrationBox>
          {/* Video bg overlay */}
          <img
            src={`${ASSET_PATH}/video-bg.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply pointer-events-none"
          />
          {/* Purple bar */}
          <div className="absolute left-[248px] top-[78px] w-[99px] h-[12px] bg-[#5850b9] rounded-full" />
          {/* Placeholder bars */}
          <div className="absolute left-[248px] top-[107px] w-[81px] h-[30px] bg-[#928ec5] rounded-[4px]" />
          <div className="absolute left-[335px] top-[107px] w-[81px] h-[30px] bg-[#928ec5] rounded-[4px]" />
          <div className="absolute left-[248px] top-[148px] w-[168px] h-[30px] bg-[#343154] rounded-[4px]" />
          <div className="absolute left-[248px] top-[189px] w-[168px] h-[30px] bg-[#343154] rounded-[4px]" />
          {/* Video icon card */}
          <div className="absolute left-[264px] top-[9px] w-[46px] h-[46px] rounded-[4px] bg-gradient-to-b from-[#5850b9] to-[#272453] overflow-hidden">
            <img
              src={`${ASSET_PATH}/ri-video-line.svg`}
              alt=""
              className="absolute left-[7px] top-[7px] w-[32px] h-[32px]"
            />
          </div>
          {/* Camera icon card */}
          <div className="absolute left-[167px] top-[102px] w-[65px] h-[65px] rounded-[6px] bg-gradient-to-b from-[#5850b9] to-[#272453] overflow-hidden">
            <img
              src={`${ASSET_PATH}/cil-camera.svg`}
              alt=""
              className="absolute left-[9px] top-[8px] w-[47px] h-[47px]"
            />
          </div>
          {/* Arrow/share icon card */}
          <div className="absolute left-[433px] top-[25px] w-[76px] h-[76px] rounded-[7px] bg-gradient-to-b from-[#5850b9] to-[#272453] overflow-hidden flex items-center justify-center">
            <div className="rotate-180 -scale-y-100">
              <img
                src={`${ASSET_PATH}/arrow-icon.svg`}
                alt=""
                className="w-[48px] h-[48px]"
              />
            </div>
          </div>
        </IllustrationBox>
      </div>
      <h3 className="absolute left-[26px] top-[276px] font-['Manrope'] font-semibold text-[22px] text-white capitalize">
        Video Production
      </h3>
      <p className="absolute left-[26px] top-[317px] w-[665px] font-['Inter'] text-[16.5px] text-[#727272] tracking-[0.9px] leading-normal">
        We turn a single product walkthrough into YouTube explainers, doc
        embeds, shorts, and landing page assets giving your product visibility
        across every channel where engineers learn and evaluate.
      </p>
    </div>
  );
}

// ─── Card 4: Product Documentation (wide) ───
function ProductDocCard() {
  return (
    <div className="bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] rounded-[23px] h-[450px] overflow-hidden relative">
      <BlurBlob position="bottom-left" />
      <div className="absolute left-1/2 -translate-x-1/2 mt-[32px] top-0 w-[665px]" style={{ marginLeft: "-5px" }}>
        <IllustrationBox>
          {/* Left sidebar panel */}
          <div className="absolute left-[23px] top-[30px] w-[157px] h-[186px] bg-[#18122a] border-[1.29px] border-[#393368] rounded-[13px] overflow-hidden">
            <img
              src={`${ASSET_PATH}/rect-gradient-2.png`}
              alt=""
              className="absolute left-[19px] top-[19px] w-[104px] h-[12px] rounded-full object-cover"
            />
            <div className="absolute left-[19px] top-[48px] w-[76px] h-[6px] bg-[#4d4a69] rounded-full" />
            <div className="absolute left-[19px] top-[63px] w-[67px] h-[6px] bg-[#4d4a69] rounded-full" />
            <div className="absolute left-[19px] top-[77px] w-[72px] h-[6px] bg-[#4d4a69] rounded-full" />
            <div className="absolute left-[19px] top-[100px] w-[76px] h-[6px] bg-[#383279] rounded-full" />
            <div className="absolute left-[19px] top-[116px] w-[67px] h-[6px] bg-[#383279] rounded-full" />
            <div className="absolute left-[19px] top-[138px] w-[104px] h-[7px] bg-[#39384f] rounded-full" />
            <div className="absolute left-[19px] top-[153px] w-[92px] h-[7px] bg-[#39384f] rounded-full" />
            <div className="absolute left-[19px] top-[168px] w-[99px] h-[7px] bg-[#39384f] rounded-full" />
            <div className="absolute left-[19px] top-[183px] w-[89px] h-[7px] bg-[#39384f] rounded-full" />
          </div>
          {/* Right main panel */}
          <div className="absolute left-[197px] top-[30px] w-[329px] h-[186px] bg-[#18122a] rounded-[8px] overflow-hidden">
            <img
              src={`${ASSET_PATH}/rect-gradient-1.png`}
              alt=""
              className="absolute left-[20px] top-[23px] w-[179px] h-[18px] rounded-full object-cover"
            />
            {/* Quickstart badge */}
            <div className="absolute left-[211px] top-[23px] h-[26px] px-[17px] py-[12px] bg-[#0d2a10] border-[0.4px] border-[#70d090] rounded-full flex items-center justify-center">
              <span className="font-['Manrope'] font-semibold text-[13px] text-[#70d090] whitespace-nowrap">
                Quickstart
              </span>
            </div>
            {/* 1. Install */}
            <p className="absolute left-[20px] top-[49px] font-['Manrope'] font-medium text-[16px] text-white">
              1. Install
            </p>
            {/* npm install command */}
            <div className="absolute left-[20px] top-[79px] h-[43px] px-[22px] py-[15px] border-[1.36px] border-[#393368] rounded-[8px] flex items-center">
              <span className="font-['Manrope'] font-semibold text-[16px] text-[#70d090] whitespace-nowrap">
                npm install @infrasity/sdk
              </span>
            </div>
            {/* 2. Initialize */}
            <p className="absolute left-[20px] top-[130px] font-['Manrope'] font-medium text-[16px] text-white">
              2. Initialize
            </p>
            {/* Import command */}
            <div className="absolute left-[20px] top-[160px] h-[44px] px-[22px] py-[15px] border-[1.36px] border-[#393368] rounded-[8px] flex items-center">
              <span className="font-['Manrope'] font-semibold text-[16px] whitespace-nowrap">
                <span className="text-[#408fd3]">Import SDK from &apos;@infrasity/sdk&apos;</span>
              </span>
            </div>
            {/* LLM-crawler ready badge */}
            <div className="absolute left-[20px] top-[212px] w-[294px] h-[48px] bg-[#130e35] border-[1.36px] border-[#393368] rounded-[8px] overflow-hidden">
              <div className="absolute left-[12px] top-[14px] w-[160px] h-[7px] bg-[#4d4a69] rounded-full" />
              <div className="absolute left-[12px] top-[30px] w-[141px] h-[7px] bg-[#4d4a69] rounded-full" />
              <div className="absolute left-[188px] top-[11px] h-[18px] px-[12px] py-[8px] bg-[#0d2a10] border-[0.27px] border-[#70d090] rounded-full flex items-center justify-center">
                <span className="font-['Manrope'] font-semibold text-[9px] text-[#70d090] whitespace-nowrap">
                  LLM-crawler ready
                </span>
              </div>
            </div>
          </div>
        </IllustrationBox>
      </div>
      <h3 className="absolute left-[26px] top-[282px] font-['Manrope'] font-semibold text-[22px] text-white capitalize">
        Product Documentation
      </h3>
      <p className="absolute left-[26px] top-[324px] w-[665px] font-['Inter'] text-[16.5px] text-[#727272] tracking-[0.9px] leading-normal">
        API references, SDK guides, integration walkthroughs, quickstart
        tutorials, and architecture explainers structured code-first so
        developers go from discovery to first API call in minutes. Built for
        humans and LLM crawlers alike.
      </p>
    </div>
  );
}

// ─── Card 5: UI/UX & Landing Pages ───
function UIUXCard() {
  return (
    <div className="bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] rounded-[23px] h-[449px] overflow-hidden relative">
      <BlurBlob position="top-right" />
      <div className="mx-auto mt-[28px] w-[376px]">
        <IllustrationBox>
          {/* Title bars */}
          <div className="absolute left-[19px] top-[33px] w-[158px] h-[12px] bg-gradient-to-b from-[#5850b9] to-[#272453] rounded-full" />
          <div className="absolute left-[19px] top-[51px] w-[108px] h-[13px] bg-[#928ec5] rounded-full" />
          <div className="absolute left-[19px] top-[71px] w-[170px] h-[6px] bg-[#5c597d] rounded-full" />
          <div className="absolute left-[19px] top-[81px] w-[136px] h-[6px] bg-[#5c597d] rounded-full" />
          {/* Circle elements */}
          <img
            src={`${ASSET_PATH}/circle-elements.svg`}
            alt=""
            className="absolute left-[259px] top-[12px] w-[90px] h-[90px]"
          />
          {/* Three blurred mini cards */}
          <div className="absolute left-[10px] top-[131px] w-[107px] h-[48px] bg-[#1a2040] border-[0.9px] border-[#5c597d] rounded-[4px] blur-[2px] overflow-hidden">
            <div className="absolute left-[7px] top-[8px] w-[46px] h-[5px] bg-[#928ec5] rounded-full" />
            <div className="absolute left-[7px] top-[17px] w-[72px] h-[3px] bg-[#5c597d] rounded-full" />
            <div className="absolute left-[7px] top-[22px] w-[58px] h-[3px] bg-[#5c597d] rounded-full" />
          </div>
          <div className="absolute left-[135px] top-[131px] w-[107px] h-[48px] bg-[#1a2040] border-[0.9px] border-[#5c597d] rounded-[4px] blur-[2px] overflow-hidden">
            <div className="absolute left-[7px] top-[8px] w-[46px] h-[5px] bg-[#928ec5] rounded-full" />
            <div className="absolute left-[7px] top-[17px] w-[72px] h-[3px] bg-[#5c597d] rounded-full" />
            <div className="absolute left-[7px] top-[22px] w-[58px] h-[3px] bg-[#5c597d] rounded-full" />
          </div>
          <div className="absolute left-[259px] top-[131px] w-[107px] h-[48px] bg-[#1a2040] border-[0.9px] border-[#5c597d] rounded-[4px] blur-[2px] overflow-hidden">
            <div className="absolute left-[7px] top-[8px] w-[46px] h-[5px] bg-[#928ec5] rounded-full" />
            <div className="absolute left-[7px] top-[17px] w-[72px] h-[3px] bg-[#5c597d] rounded-full" />
            <div className="absolute left-[7px] top-[22px] w-[58px] h-[3px] bg-[#5c597d] rounded-full" />
          </div>
          {/* Cursor icon */}
          <img
            src={`${ASSET_PATH}/cursor-icon.svg`}
            alt=""
            className="absolute left-[307px] top-[177px] w-[27px] h-[27px]"
          />
        </IllustrationBox>
      </div>
      <h3 className="absolute left-[22px] top-[263px] font-['Manrope'] font-semibold text-[22px] text-white capitalize">
        UI/UX &amp; Landing Pages
      </h3>
      <p className="absolute left-[22px] top-[297px] w-[351px] font-['Inter'] text-[16.5px] text-[#727272] tracking-[0.9px] leading-normal">
        Conversion-ready landing pages, feature announcement pages, and
        comparison layouts designed for developer-first products. Built to turn
        organic traffic and campaign clicks into signups and first API calls.
      </p>
    </div>
  );
}

// ─── Card 6: Technical Writing Services ───
function TechWritingCard() {
  return (
    <div className="bg-[#0e0b1b] border-[0.918px] border-solid border-[rgba(119,119,119,0.5)] rounded-[23px] h-[449px] overflow-hidden relative">
      <BlurBlob position="top-right" />
      <div className="mx-auto mt-[25px] w-[376px]">
        <IllustrationBox>
          {/* Left code editor panel */}
          <div className="absolute left-[23px] top-[22px] w-[243px] h-[186px] bg-[#18122a] rounded-[6px] overflow-hidden">
            <img
              src={`${ASSET_PATH}/rect-gradient-3.png`}
              alt=""
              className="absolute left-[15px] top-[19px] w-[132px] h-[9px] rounded-full object-cover"
            />
            <div className="absolute left-[15px] top-[36px] w-[188px] h-[5px] bg-[#4d4a69] rounded-full" />
            <div className="absolute left-[15px] top-[48px] w-[166px] h-[5px] bg-[#4d4a69] rounded-full" />
            <div className="absolute left-[15px] top-[59px] w-[180px] h-[5px] bg-[#4d4a69] rounded-full" />
            {/* Code block */}
            <div className="absolute left-[11px] top-[75px] w-[217px] h-[70px] border border-[#393368] rounded-[6px] overflow-hidden">
              <p className="absolute left-[15px] top-[10px] font-['Manrope'] font-semibold text-[12px] leading-[18px]">
                <span className="text-[#408fd3]">{"const client = new SDK({"}</span>
                <br />
                <span className="text-[#70d090]">apiKey: process.env.Key</span>
                <br />
                <span className="text-[#408fd3]">{"})"}</span>
              </p>
            </div>
            {/* FAQ block */}
            <div className="absolute left-[11px] top-[156px] w-[217px] h-[30px] bg-[#130e35] border border-[#393368] rounded-[6px] overflow-hidden">
              <p className="absolute left-[11px] top-[8px] font-['Manrope'] font-medium text-[12px] text-white">
                FAQ
              </p>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="absolute left-[282px] top-[22px] w-[116px] h-[186px] bg-[#18122a] border-[0.95px] border-[#393368] rounded-[10px] overflow-hidden">
            {/* G Rank circle */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[51px] h-[51px] bg-[#18122a] border-[0.95px] border-[#393368] rounded-full flex items-center justify-center">
              <div className="font-['Manrope'] font-medium text-[11px] text-white text-center leading-tight">
                <p>G</p>
                <p>Rank</p>
              </div>
            </div>
            {/* Line connector */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[62px] w-0 h-[75px] flex items-center justify-center">
              <div className="rotate-90">
                <img
                  src={`${ASSET_PATH}/line-connector.svg`}
                  alt=""
                  className="w-[75px] h-[2px]"
                />
              </div>
            </div>
            {/* Cited pill */}
            <div className="absolute left-[24px] top-[87px] w-[66px] h-[30px] bg-[#18122a] border-[0.95px] border-[#393368] rounded-full flex items-center justify-center">
              <span className="font-['Manrope'] font-medium text-[11px] text-white">
                cited
              </span>
            </div>
            {/* Info box */}
            <div className="absolute left-[20px] top-[137px] w-[73px] h-[48px] bg-[#18122a] border-[0.95px] border-[#393368] rounded-[6px]">
              <div className="absolute left-[7px] top-[11px] w-[56px] h-[5px] bg-[#4d4a69] rounded-full" />
              <div className="absolute left-[7px] top-[22px] w-[50px] h-[5px] bg-[#4d4a69] rounded-full" />
              <div className="absolute left-[7px] top-[33px] w-[53px] h-[5px] bg-[#4d4a69] rounded-full" />
            </div>
            {/* SDK eg pill */}
            <div className="absolute left-[20px] top-[168px] w-[73px] h-[18px] bg-[#18122a] border-[0.95px] border-[#393368] rounded-full flex items-center justify-center">
              <span className="font-['Manrope'] font-medium text-[11px] text-white">
                SDK eg.
              </span>
            </div>
          </div>
        </IllustrationBox>
      </div>
      <h3 className="absolute left-[26px] top-[258px] font-['Manrope'] font-semibold text-[22px] text-white capitalize">
        Technical Writing Services
      </h3>
      <p className="absolute left-[26px] top-[292px] w-[345px] font-['Inter'] text-[16.5px] text-[#727272] tracking-[0.9px] leading-normal">
        From hands-on tutorials to comparison pages and SDK examples we create
        the technical content that ranks on Google, gets cited by AI models, and
        answers the questions developers actually search for. Each piece ships
        with code snippets, diagrams, and FAQ blocks.
      </p>
    </div>
  );
}

// ─── Main Section ───
export default function ServicesFold() {
  return (
    <section className="relative bg-[#0d0a1a] w-full overflow-hidden py-20">
      {/* Background image */}
      <img
        src={`${ASSET_PATH}/section-bg.png`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="relative z-10 max-w-[1614px] mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-['Manrope'] font-semibold text-[48px] leading-[60px] text-white capitalize">
            The Developer Marketing Services Behind{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#5f64ff] -inset-x-1" />
              <span className="relative">30+ SaaS Startups</span>
            </span>
          </h2>
          <p className="mt-4 font-['Inter'] text-[24px] text-white">
            How top infra, AI, and SaaS startups scaled credibility without
            hiring full DevRel teams.
          </p>
        </div>

        {/* Bento grid */}
        <div className="flex flex-col gap-4 items-center">
          {/* Row 1: narrow, narrow, wide */}
          <div className="grid grid-cols-1 md:grid-cols-[410px_410px_729px] gap-4 w-full justify-center">
            <AEOGEOCard />
            <RedditCard />
            <VideoProductionCard />
          </div>
          {/* Row 2: wide, narrow, narrow */}
          <div className="grid grid-cols-1 md:grid-cols-[729px_410px_410px] gap-4 w-full justify-center">
            <ProductDocCard />
            <UIUXCard />
            <TechWritingCard />
          </div>
        </div>

        {/* CTA button */}
        <div className="flex justify-center mt-12">
          <ContactPopupButton
            buttonText="Book a Demo"
            width="w-[190px]"
            height="h-[60px]"
            bgGradient="bg-[#5f64ff]"
            textSize="text-[19px]"
            textWeight="font-semibold font-['Manrope']"
            borderColor="#3b82f6"
          />
        </div>
      </div>
    </section>
  );
}
