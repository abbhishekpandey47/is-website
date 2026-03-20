"use client";

import { useState, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Brain, ChevronDown, Sparkles, Timer, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   MOTION HELPERS
───────────────────────────────────────────────────────────── */
const SPRING = { type:"spring", stiffness:280, damping:60 };
const EASE_OUT_EXPO = [0.16,1,0.3,1];
const HOVER_SPRING = { type:"spring", stiffness:400, damping:25 };

function useMotionSafe(){ const r=useReducedMotion(); return !r; }

function FadeSlide({ y=16, delay=0, children, className="" }){
  const motionSafe=useMotionSafe();
  return(
    <motion.div
      initial={motionSafe?{opacity:0,y}:{opacity:1,y:0}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6,ease:EASE_OUT_EXPO,delay}}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const SIGNAL_MAX={citations:20,structure:20,freshness:15,authority:20,entities:15,directness:10};
const SIGNAL_DISPLAY={entities:"AI-quotable defs",directness:"Answer-first",structure:"FAQ block",authority:"Schema signals",freshness:"Headings",citations:"Citation auth"};
const AUDIT_STEPS=["Crawling sitemap and pages…","Fetching and parsing pages…","Scoring 6 GEO signals per page…","Ranking by opportunity score…","Generating rewrite suggestions…"];
const STEP_DETAILS=[{sub:"Following links across the domain"},{sub:"Extracting headings, body and schema"},{sub:"Scanning Q&A patterns across pages"},{sub:"Identifying highest-upside pages"},{sub:"Writing specific fixes with GPT-4o"}];
const SIGNAL_PILLS=[
  {label:"AI-quotable definitions", bg:"rgba(83,74,183,0.15)",  border:"#534AB7",dot:"#7F77DD"},
  {label:"Answer-first structure",  bg:"rgba(29,158,117,0.15)", border:"#1D9E75",dot:"#5DCAA5"},
  {label:"FAQ block presence",      bg:"rgba(186,117,23,0.15)", border:"#BA7517",dot:"#EF9F27"},
  {label:"Schema markup signals",   bg:"rgba(216,90,48,0.15)",  border:"#D85A30",dot:"#F0997B"},
  {label:"Heading hierarchy",       bg:"rgba(24,95,165,0.15)",  border:"#185FA5",dot:"#378ADD"},
  {label:"Citation authority",      bg:"rgba(99,153,34,0.15)",  border:"#639922",dot:"#97C459"},
];
const HOW_STEPS=[
  {id:1,label:"STEP 1",icon:"Search",    title:"Enter Your Domain",     options:["Any public website or URL","Supports subdomains and paths","Works with single pages or full sites"]},
  {id:2,label:"STEP 2",icon:"BarChart2", title:"We Crawl & Score",      options:["Citations & authority links","FAQ structure & schema markup","Answer-first formatting","Heading hierarchy","Entity definitions"]},
  {id:3,label:"STEP 3",icon:"FileText",  title:"Paste Page Content",    options:["Full page text for deeper scoring","Title, headings, body copy","Any FAQ blocks on the page"]},
  {id:4,label:"STEP 4",icon:"Zap",       title:"Get Your GEO Report",   options:["Score per page with signal breakdown","Priority fixes ranked by opportunity","Specific rewrite suggestions per gap"]},
  {id:5,label:"STEP 5",icon:"CheckCircle",title:"Implement & Get Cited",options:["Follow the action plan","Add citations, schema, answer-first copy","Get discovered by ChatGPT, Perplexity, Claude"]},
];
const WHY_CARDS=[
  {id:"1",title:"Audit Any Website in Seconds",        description:"Paste a domain and get a full GEO score in under 60 seconds. No setup, no SDK. DevTools and SaaS teams can audit every page as fast as they ship.",icon:<Timer stroke="#6b5be7"/>},
  {id:"2",title:"Built for AI-Cited Content Strategy", description:"Our GEO audit is context-aware for B2B SaaS, DevTools, and AI infrastructure. Scores reflect what ChatGPT, Perplexity, and Claude actually look for when choosing sources.",icon:<Brain stroke="#6b5be7"/>},
  {id:"3",title:"Prioritized Fixes, Not Just Scores",  description:"Every audit returns a ranked action plan — not just numbers. We tell you exactly which pages to fix first and what to change, so you spend time implementing, not analysing.",icon:<Zap stroke="#6b5be7"/>},
];
const FAQ_DATA=[
  {q:"What is GEO (Generative Engine Optimization)?",a:"GEO is the practice of structuring web content so it gets discovered, cited, and quoted by AI engines like ChatGPT, Perplexity, Claude, and Gemini. Unlike SEO which targets Google rankings, GEO targets AI-generated answers and citations."},
  {q:"How is the GEO score calculated?",a:"Each page is scored across 6 signals: Citations (20pts), Structure (20pts), Authority (20pts), Freshness (15pts), Entities (15pts), and Directness (10pts). The opportunity score weights each gap by page type — blog pages get 1.5x multiplier, home pages 1.3x."},
  {q:"What does the audit actually crawl?",a:"The audit crawls your sitemap.xml or robots.txt to discover up to 50 pages, fetches and parses each page's HTML, extracts headings, body text, schema markup, outbound links, and author signals, then scores each signal independently."},
  {q:"How do I improve my Citations score?",a:"Add 3-5 outbound links to authoritative sources (.gov, .edu, major publishers) per page. Cite specific studies or reports by name. Pages that cite original sources are quoted by AI engines significantly more than pages that make uncited claims."},
];
const DUMMY_RESULTS={
  summary:{totalPages:12,avgScore:58,pagesBelow30:2,pagesBelow50:5},
  topPages:[
    {url:"https://infrasity.com/blog/ai-agent-content-strategy",title:"AI Agent Content Strategy for B2B SaaS: 5 Frameworks That Drive Pipeline in 2026",type:"blog",rawScore:58,topGaps:["entities","directness","citations"],signals:{entities:5,directness:4,structure:17,authority:10,freshness:13,citations:0}},
    {url:"https://infrasity.com/blog/geo-vs-seo",title:"GEO vs SEO: Why AI Engines Change Everything for B2B Content",type:"blog",rawScore:51,topGaps:["citations","entities","directness"],signals:{entities:4,directness:3,structure:15,authority:8,freshness:13,citations:0}},
    {url:"https://infrasity.com/services/geo-optimization",title:"GEO Optimization Services for B2B SaaS Companies",type:"product",rawScore:44,topGaps:["citations","authority","directness"],signals:{entities:8,directness:3,structure:11,authority:5,freshness:13,citations:0}},
    {url:"https://infrasity.com/blog/perplexity-citations",title:"How to Get Cited by Perplexity, ChatGPT and Claude: A Practical Guide",type:"blog",rawScore:47,topGaps:["citations","authority","entities"],signals:{entities:5,directness:6,structure:13,authority:5,freshness:13,citations:0}},
    {url:"https://infrasity.com/case-studies/saas-geo-results",title:"How We Grew AI Engine Citations 3x for a B2B SaaS Client in 90 Days",type:"blog",rawScore:62,topGaps:["citations","directness"],signals:{entities:12,directness:5,structure:16,authority:10,freshness:15,citations:0}},
  ],
  rewrites:[
    {url:"https://infrasity.com/blog/ai-agent-content-strategy",rewrites:[
      {signal:"entities",priority:"high",original:"AI agents are software that can take actions autonomously.",rewrite:"Add boxed definitions for AI agents GPTBot ClaudeBot PerplexityBot DeepSeek R1 above fold",rationale:"Add boxed definition: AI agents are autonomous software that discovers and evaluates products"},
      {signal:"directness",priority:"high",original:"In this article we explore how B2B SaaS companies can think about content strategy.",rewrite:"Convert all H2 headings to answer-first question format with immediate direct answers",rationale:"Rewrite H2s as questions: What Are AI Agents becomes How Do AI Agents Change Discovery"},
      {signal:"citations",priority:"medium",original:"Research shows that AI-cited content gets significantly more referral traffic.",rewrite:"Insert schema-ready FAQ block with structured Q&A pairs using FAQ schema markup",rationale:"Add original research: percentage of citations by bot or conversion rate metrics"},
    ]},
    {url:"https://infrasity.com/blog/geo-vs-seo",rewrites:[
      {signal:"citations",priority:"high",original:"Traditional SEO focuses on ranking in Google.",rewrite:"Add Forrester citation: 62% of enterprise buyers used AI for first research touchpoint",rationale:"Cited statistics are quoted by AI engines 5x more than uncited claims"},
      {signal:"entities",priority:"high",original:"Not present",rewrite:"Add definition block: GEO is the practice of structuring content to be cited by AI engines",rationale:"A clear entity definition in paragraph 1 makes this the canonical source for the term"},
    ]},
    {url:"https://infrasity.com/services/geo-optimization",rewrites:[
      {signal:"authority",priority:"high",original:"Not present",rewrite:"Add Organization schema and author bylines to all service pages",rationale:"Organization schema makes Infrasity machine-readable for AI engines answering vendor queries"},
    ]},
    {url:"https://infrasity.com/blog/perplexity-citations",rewrites:[
      {signal:"citations",priority:"high",original:"Getting cited by Perplexity requires a different approach.",rewrite:"Add link to Perplexity publisher guidelines and Search Engine Land 5x citation lift analysis",rationale:"Links to official platform docs create the authoritative citation chain AI engines trust"},
    ]},
    {url:"https://infrasity.com/case-studies/saas-geo-results",rewrites:[
      {signal:"citations",priority:"high",original:"Our client saw significant improvements in AI engine visibility.",rewrite:"Add specific numbers: 0 to 47 AI citations per month tracked via Perplexity API and BrightEdge over 90 days",rationale:"Specific tracked numbers make case study claims verifiable and therefore quotable by AI"},
    ]},
  ],
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function grade(s){return s>=70?"Strong":s>=50?"Fair":s>=30?"Weak":"Poor";}
function gradeColor(s){return s>=70?"#16a34a":s>=50?"#d4980a":s>=30?"#e67e22":"#dc2626";}
function barColor(p){return p>=70?"#16a34a":p>=45?"#d4980a":"#dc2626";}
function toDisp(sig,pts){const m=SIGNAL_MAX[sig];return m?Math.round((pts/m)*100):0;}
function shortUrl(url){try{const u=new URL(url);return u.hostname+u.pathname;}catch{return url;}}
const labelStyle={fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#c8c4bc",marginBottom:12};

/* ─────────────────────────────────────────────────────────────
   CTA BUTTONS — matches reddit-opportunity-finder exactly
───────────────────────────────────────────────────────────── */
function PrimaryBtn({onClick,children}){
  const motionSafe=useMotionSafe();
  return(
    <motion.button
      onClick={onClick}
      whileHover={motionSafe?{scale:1.03}:{}}
      whileTap={motionSafe?{scale:0.97}:{}}
      transition={HOVER_SPRING}
      className="group inline-flex items-center rounded-[5px] bg-[#5f64ff] px-6 py-2.5 text-[14px] font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(95,100,255,0.3)]">
      {children}
      <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
    </motion.button>
  );
}

function GhostBtn({href,children}){
  const motionSafe=useMotionSafe();
  return(
    <motion.div whileHover={motionSafe?{scale:1.03}:{}} whileTap={motionSafe?{scale:0.97}:{}} transition={HOVER_SPRING} className="inline-flex">
      <a href={href} className="inline-flex items-center rounded-[5px] border border-white/15 px-6 py-2.5 text-[14px] font-medium text-gray-300 transition-colors hover:border-white/30 hover:text-white">
        {children}
      </a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — matches reddit-opportunity-finder exactly
───────────────────────────────────────────────────────────── */
function Hero({onRunAudit}){
  const motionSafe=useMotionSafe();
  return(
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1a1040]/40 via-transparent to-transparent"/>

      {/* Orb 1 — indigo top-left */}
      {motionSafe&&(
        <motion.div className="absolute -z-10 pointer-events-none rounded-full"
          style={{width:600,height:600,background:"radial-gradient(circle, rgba(95,100,255,0.25) 0%, transparent 70%)",filter:"blur(100px)",top:"-10%",left:"-5%"}}
          animate={{x:[0,80,20,100,0],y:[0,60,120,40,0]}}
          transition={{duration:12,ease:"easeInOut",repeat:Infinity}}/>
      )}
      {/* Orb 2 — purple bottom-right */}
      {motionSafe&&(
        <motion.div className="absolute -z-10 pointer-events-none rounded-full"
          style={{width:500,height:500,background:"radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",filter:"blur(100px)",bottom:"5%",right:"-5%"}}
          animate={{x:[0,-70,-30,-90,0],y:[0,-50,-100,-30,0]}}
          transition={{duration:12,ease:"easeInOut",repeat:Infinity}}/>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-10 md:pt-44 md:pb-14 grid grid-cols-1 md:grid-cols-[1fr_300px] items-center gap-12">
        <div>
          <FadeSlide y={16} delay={0}>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-gray-400">
                AI citation scoring for B2B SaaS
              </span>
            </div>
          </FadeSlide>

          <FadeSlide y={24} delay={0.1}>
          <h2 className="font-[quicksand] specialtext mb-4" style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:700,letterSpacing:"-0.04em",lineHeight:1.1}}>
          Your content is{" "}
          <span className="invisible-blink" style={{
  background:"linear-gradient(135deg, #6366f1, #a855f7)",
  WebkitBackgroundClip:"text",
  WebkitTextFillColor:"transparent",
  backgroundClip:"text",
  display:"inline-block",
}}>invisible</span>
  <br/>to AI engines.<br/>
  <span style={{color:"#16a34a"}}>Fix that in 60 seconds!</span>
</h2>
          </FadeSlide>

          <FadeSlide y={16} delay={0.26}>
            <p className="mb-8 max-w-[500px]" style={{fontSize:17,fontWeight:300,lineHeight:1.7,color:"rgba(255,255,255,0.55)"}}>
              Paste your domain. Get every page scored across 6 GEO signals — plus exactly where you&apos;re missing citations, schema, and answer-first formatting that AI engines require.
            </p>
          </FadeSlide>

          <FadeSlide y={12} delay={0.34}>
            <div className="flex items-center gap-4 mb-4">
              <PrimaryBtn onClick={onRunAudit}>Run Free GEO Audit</PrimaryBtn>
              <GhostBtn href="#how-it-works">See how it works</GhostBtn>
            </div>
          </FadeSlide>

          <FadeSlide y={0} delay={0.42}>
            <p className="text-[13px]" style={{color:"rgba(255,255,255,0.3)"}}>
              Free to start · No credit card required · Powered by OpenAI GPT-4o
            </p>
          </FadeSlide>
        </div>

        {/* Right — signal pills preview card */}
        <FadeSlide y={16} delay={0.5} className="hidden md:flex items-center justify-center self-center">
          <div className="w-full rounded-[20px] overflow-hidden border border-white/10 bg-[#0e0b1b] p-6"
            style={{boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">6 GEO signals scored</div>
            {SIGNAL_PILLS.map(s=>(
              <div key={s.label} className="flex items-center gap-3 mb-2 rounded-lg px-3 py-2" style={{border:`1px solid ${s.border}`,background:s.bg}}>
                <span style={{color:s.dot}} className="text-sm flex-shrink-0">•</span>
                <span className="font-mono text-xs text-stone-100">{s.label}</span>
              </div>
            ))}
          </div>
        </FadeSlide>
      </div>

      {/* Hero product preview */}
      <motion.div className="relative mx-auto max-w-5xl px-6 lg:px-8 pb-20"
        initial={motionSafe?{opacity:0,y:40}:{opacity:1,y:0}}
        animate={motionSafe?{opacity:1,y:0}:{}}
        transition={{duration:0.8,ease:EASE_OUT_EXPO,delay:0.5}}>
        <motion.div animate={motionSafe?{y:[0,-8,0]}:{}} transition={motionSafe?{duration:4,ease:"easeInOut",repeat:Infinity}:{}} style={{willChange:"transform"}}>
          <div className="overflow-hidden rounded-[20px] bg-[#0e0b1b] border border-white/10"
            style={{boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
              <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]"/>
              <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]"/>
              <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]"/>
              <div className="ml-3 flex h-[24px] flex-1 items-center rounded-md bg-white/[0.04] px-3">
                <span className="text-[11px] text-gray-500">infrasity.com/tools/geo-audit</span>
              </div>
            </div>
            <div className="p-8 grid grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-xs text-[#6c5ce8] uppercase tracking-widest mb-3">GEO Audit Report</div>
                <div className="font-[quicksand] text-2xl font-bold text-white mb-1">infrasity.com</div>
                <div className="font-mono text-xs text-gray-500 mb-6">20 March 2026 · 50 pages audited</div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-6xl font-bold" style={{color:"#d4980a"}}>68</span>
                  <span className="font-mono text-lg text-gray-500">/100</span>
                  <span className="font-mono text-sm text-[#d4980a] ml-2">Fair</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-xs px-3 py-1 rounded-full" style={{background:"#16a34a22",border:"1px solid #16a34a66",color:"#16a34a"}}>35 passing</span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full" style={{background:"#d4980a22",border:"1px solid #d4980a66",color:"#d4980a"}}>15 warning</span>
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Signal breakdown</div>
                {[{l:"Citation auth",v:0,c:"#dc2626"},{l:"FAQ block",v:65,c:"#d4980a"},{l:"Headings",v:87,c:"#16a34a"},{l:"Schema signals",v:40,c:"#d4980a"},{l:"Answer-first",v:40,c:"#d4980a"},{l:"AI-quotable defs",v:33,c:"#e67e22"}].map(s=>(
                  <div key={s.l} className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-gray-500 w-24 flex-shrink-0">{s.l}</span>
                    <div className="flex-1 h-1 rounded-full bg-gray-700 overflow-hidden">
                      <div style={{width:`${s.v}%`,height:"100%",background:s.c,borderRadius:2}}/>
                    </div>
                    <span className="font-mono text-xs w-7 text-right flex-shrink-0" style={{color:s.c}}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────────────────────── */
function FeaturesSection(){
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-15% 0px"});
  const motionSafe=useMotionSafe();
  const features=[
    {num:"01",title:<>Paste your domain.<br/>That&apos;s it.</>,sub:"Enter any public URL and we crawl your sitemap, fetch all pages, and score each one across 6 GEO signals automatically.",color:"#5f64ff"},
    {num:"02",title:<>6 signals.<br/>One score.</>,sub:"Citations, structure, freshness, authority, entities, directness — every gap ranked by opportunity score so you know exactly where to start.",color:"#8B5CF6"},
    {num:"03",title:<>Priority fixes,<br/>not just numbers.</>,sub:"Each page gets a specific rewrite plan — not generic advice. We tell you the exact paragraph to change and why AI engines will cite it.",color:"#5f64ff"},
    {num:"04",title:<>Download your<br/>full report.</>,sub:"Export a structured markdown report with exec summary, full page inventory, signal breakdown table, and rewrite suggestions for every page.",color:"#8B5CF6"},
  ];
  return(
    <section id="features" className="py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div className="mb-10 max-w-xl"
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.5,ease:EASE_OUT_EXPO}}>
          <p className="mb-2 text-[13px] text-[#5f64ff] tracking-[0.01em]">Everything in one audit</p>
          <h2 className="font-[quicksand] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            One domain.<br/><span className="text-white/60">Full GEO picture.</span>
          </h2>
          <p className="max-w-[480px] text-[16px] font-light leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>
            One click scores up to 50 pages, identifies signal gaps, and generates a prioritized fix list — all powered by GPT-4o.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f,i)=>(
            <motion.div key={i}
              initial={motionSafe?{opacity:0,y:40}:{opacity:1,y:0}}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{...SPRING,delay:i*0.1}}
              className="relative rounded-[24px] overflow-hidden bg-[#0e0b1b] border border-white/[0.06] p-8"
              style={{boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{background:`radial-gradient(circle, ${f.color}20 0%, transparent 70%)`,filter:"blur(40px)"}}/>
              <span className="block mb-4 font-mono text-[11px] text-white/30">{f.num}</span>
              <h3 className="font-[quicksand] text-white mb-3" style={{fontSize:"clamp(22px,2.5vw,28px)",fontWeight:700,letterSpacing:"-0.03em",lineHeight:1.1}}>{f.title}</h3>
              <p className="text-[14px] font-light text-white/45 leading-snug">{f.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS — scroll-driven like reddit-opportunity-finder
───────────────────────────────────────────────────────────── */
const HOW_SCROLL_STEPS=[
  {num:"01",title:"Paste your domain",desc:"One URL triggers a full site crawl — sitemap discovery, page fetching, HTML parsing, signal extraction, all automatic."},
  {num:"02",title:"We score every page",desc:"6 GEO signals scored per page. Citations, schema, FAQ structure, answer-first formatting, entities, and authority — each gap sized by opportunity."},
  {num:"03",title:"Review your report",desc:"Top 10 highest-opportunity pages surfaced with specific priority fixes and rewrite suggestions generated by GPT-4o."},
  {num:"04",title:"Implement & get cited",desc:"Follow the action plan, add the missing signals, and watch your content start appearing in ChatGPT, Perplexity, and Claude answers."},
];

function StepItem({step,index,isActive}){
  return(
    <div className="flex gap-5 py-5 relative">
      <motion.span className="shrink-0 text-[13px] font-semibold pt-0.5"
        animate={{color:isActive?"rgba(95,100,255,1)":"rgba(95,100,255,0.6)"}}
        transition={{duration:0.3}}>
        {step.num}
      </motion.span>
      <div className="flex-1">
        <motion.h3 className="mb-1.5 text-[16px] font-semibold tracking-[-0.01em]"
          animate={{color:isActive?"rgba(255,255,255,1)":"rgba(255,255,255,0.75)"}}
          transition={{duration:0.3}}>{step.title}</motion.h3>
        <motion.p className="text-[14px] font-light" style={{lineHeight:1.6}}
          animate={{color:isActive?"rgba(255,255,255,0.45)":"rgba(255,255,255,0.35)"}}
          transition={{duration:0.3}}>{step.desc}</motion.p>
      </div>
      {index<HOW_SCROLL_STEPS.length-1&&(
        <>
          <motion.div className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{background:isActive?"#5f64ff":"rgba(255,255,255,0.06)"}}
            initial={{scaleX:0,transformOrigin:"left"}}
            animate={{scaleX:isActive?1:0}}
            transition={{duration:0.4,ease:EASE_OUT_EXPO}}/>
          {!isActive&&<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]"/>}
        </>
      )}
    </div>
  );
}

function HowItWorks(){
  const sectionRef=useRef(null);
  const inView=useInView(sectionRef,{once:true,margin:"-15% 0px"});
  const [activeStep,setActiveStep]=useState(0);
  const stepsRef=useRef(null);
  useEffect(()=>{
    function handleScroll(){
      if(!stepsRef.current||!sectionRef.current)return;
      const rect=sectionRef.current.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,-rect.top/(rect.height-window.innerHeight)));
      setActiveStep(Math.min(HOW_SCROLL_STEPS.length-1,Math.floor(progress*HOW_SCROLL_STEPS.length)));
    }
    window.addEventListener("scroll",handleScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[]);
  return(
    <section id="how-it-works" className="py-20 border-y border-white/[0.06]" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,ease:EASE_OUT_EXPO}}>
            <p className="mb-2 text-[13px] text-[#5f64ff] tracking-[0.01em]">How it works</p>
            <h2 className="font-[quicksand] font-bold text-white mb-4" style={{fontSize:"clamp(36px,5vw,56px)",letterSpacing:"-0.04em",lineHeight:1.05}}>
              Domain in.<br/><span className="text-white">GEO map out.</span>
            </h2>
            <p className="max-w-[400px] text-[15px] font-light leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.45)"}}>
              60 seconds from domain to full GEO coverage. No manual research. No guesswork.
            </p>
            <div ref={stepsRef}>
              {HOW_SCROLL_STEPS.map((s,i)=><StepItem key={s.num} step={s} index={i} isActive={i===activeStep}/>)}
            </div>
          </motion.div>
          <motion.div className="sticky top-32"
            initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
            transition={{duration:0.6,ease:EASE_OUT_EXPO,delay:0.2}}>
            <div className="overflow-hidden rounded-[20px] bg-[#0e0b1b] border border-white/10 p-6"
              style={{boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
              <div className="font-mono text-xs text-[#6c5ce8] uppercase tracking-widest mb-4">Live audit in progress</div>
              <div className="space-y-2 mb-6">
                {AUDIT_STEPS.map((step,i)=>(
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:i<activeStep?"#6c5ce8":i===activeStep?"#8B5CF6":"#374151"}}/>
                    <span className="font-mono text-xs" style={{color:i<activeStep?"#6b7280":i===activeStep?"#fff":"#4b5563",fontWeight:i===activeStep?600:400}}>{step}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-gray-700 mb-4"/>
              <div className="font-mono text-xs" style={{color:"#6c5ce8"}}>→ infrasity.com/blog/geo-vs-seo</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   AUDIT TOOL COMPONENTS
───────────────────────────────────────────────────────────── */
function ScoreHeroCard({summary}){
  const score=summary?.avgScore??0;const total=summary?.totalPages??0;
  const failing=summary?.pagesBelow30??0;const warning=Math.max(0,(summary?.pagesBelow50??0)-failing);
  const passing=Math.max(0,total-failing-warning);const color=gradeColor(score);
  return(
    <div className="rounded-2xl p-6 mb-6 bg-gray-800/60 border border-gray-700">
      <div className="flex items-start gap-7 flex-wrap">
        <div className="flex-shrink-0">
          <div className="font-mono text-sm font-medium mb-1" style={{color}}>{grade(score)}</div>
          <div className="flex items-baseline gap-1">
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:72,lineHeight:1,color,letterSpacing:"-0.02em"}}>{score}</span>
            <span className="text-gray-400 text-lg font-mono">/100</span>
          </div>
        </div>
        <div className="flex-1 min-w-44 pt-2">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            {score>=70?"Good GEO readiness. Focus on freshness and authority for further gains.":score>=50?"Strong structure but lacks quotable definitions and citation data. Needs answer-first formatting.":"Significant GEO gaps. Prioritise the pages below."}
          </p>
          <div className="flex gap-2 flex-wrap">
            {[{n:passing,c:"#16a34a",l:"passing"},{n:warning,c:"#d4980a",l:"warning"},{n:failing,c:"#dc2626",l:"failing"}].map(p=>(
              <span key={p.l} className="font-mono text-xs px-3 py-1 rounded-full" style={{background:`${p.c}22`,border:`1px solid ${p.c}66`,color:p.c}}>{p.n} {p.l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalBars({signals}){
  if(!signals)return null;
  return(
    <div className="mb-5">
      {["entities","directness","structure","authority","freshness","citations"].map(sig=>{
        const disp=toDisp(sig,signals[sig]??0);const color=barColor(disp);
        return(
          <div key={sig} className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs flex-shrink-0 w-28 text-gray-400">{SIGNAL_DISPLAY[sig]||sig}</span>
            <div className="flex-1 h-1 rounded-full overflow-hidden bg-gray-700">
              <div style={{width:`${disp}%`,height:"100%",background:color,borderRadius:2}}/>
            </div>
            <span className="font-mono text-xs font-medium w-7 text-right flex-shrink-0" style={{color}}>{disp}</span>
          </div>
        );
      })}
    </div>
  );
}

function PriorityFixes({rewrites=[]}){
  if(!rewrites.length)return null;
  return(
    <div className="mb-5">
      <div style={labelStyle}>Priority fixes</div>
      {rewrites.slice(0,4).map((rw,i)=>{
        const isHigh=rw.priority==="high";
        return(
          <div key={i} className="flex gap-2 mb-2 items-start rounded-xl p-3 bg-gray-900/60 border border-gray-700">
            <span className="font-mono text-xs px-2 py-0.5 rounded flex-shrink-0 mt-0.5" style={{background:isHigh?"rgba(220,38,38,0.2)":"rgba(100,80,40,0.3)",border:isHigh?"1px solid rgba(220,38,38,0.5)":"1px solid rgba(180,140,60,0.4)",color:isHigh?"#fca5a5":"#d4980a"}}>{rw.priority}</span>
            <div>
              <div className="text-sm font-medium mb-1 text-white font-[quicksand]">
                {rw.signal?`${rw.signal.charAt(0).toUpperCase()}${rw.signal.slice(1)}`:"Fix"}{rw.original&&rw.original!=="Not present"?` — ${rw.original.slice(0,55)}${rw.original.length>55?"...":""}` :""}
              </div>
              {rw.rationale&&<div className="font-mono text-xs leading-relaxed text-gray-400">{rw.rationale.slice(0,95)}{rw.rationale.length>95?"...":""}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActionPlan({topGaps=[],rewrites=[]}){
  const actions=[];
  rewrites.forEach(rw=>{if(rw.rewrite&&actions.length<5)actions.push(rw.rewrite.slice(0,110)+(rw.rewrite.length>110?"...":""));});
  if(!actions.length){
    const map={citations:"Add 3-5 outbound links to authoritative sources (.gov, .edu, major publishers)",structure:"Convert all H2 headings to question format with immediate direct answers",authority:"Add author byline, bio link, and Person schema to this page",freshness:"Add dateModified schema and refresh content to reflect current year",entities:"Add boxed definitions for key terms above the fold",directness:"Rewrite opening paragraph to answer the main question in the first sentence"};
    topGaps.forEach(g=>{if(map[g]&&actions.length<5)actions.push(map[g]);});
  }
  if(!actions.length)return null;
  return(
    <div className="mb-6">
      <div style={labelStyle}>Action plan</div>
      {actions.map((a,i)=>(
        <div key={i} className="flex gap-3 mb-2 items-start">
          <span className="font-mono text-xs flex-shrink-0 w-5 pt-0.5 text-gray-500">{String(i+1).padStart(2,"0")}</span>
          <span className="text-sm leading-relaxed text-gray-200">{a}</span>
        </div>
      ))}
    </div>
  );
}

function CTAStrip(){
  return(
    <div className="flex items-center justify-between flex-wrap gap-3 pt-4 mt-1 border-t border-gray-700">
      <div>
        <div className="font-[quicksand] text-base font-bold mb-1 text-white">Want us to fix this?</div>
        <div className="font-mono text-xs text-gray-400">Infrasity implements GEO for B2B SaaS and drives traffic or conversion by AI source</div>
      </div>
      <a href="/contact" className="inline-flex items-center gap-2 font-[quicksand] text-sm font-bold px-5 py-2.5 rounded-xl no-underline whitespace-nowrap"
        style={{background:"linear-gradient(135deg,#5F64FF,#8B5CF6)",color:"#fff"}}>
        Talk to Infrasity <ArrowRight className="w-4 h-4"/>
      </a>
    </div>
  );
}

function PageCard({page,rewriteResult,rank}){
  const [open,setOpen]=useState(rank===1);
  const score=page.rawScore??0;const color=gradeColor(score);
  const rws=rewriteResult?.rewrites??[];
  const category=page.type==="blog"?"Blog":page.type==="guide"?"Guide":page.type==="product"?"Product":"Page";
  return(
    <div className="rounded-2xl mb-3 overflow-hidden border border-gray-700" style={{background:open?"#0d0f1a":"rgba(31,32,51,0.6)"}}>
      <div onClick={()=>setOpen(!open)} className="p-4 cursor-pointer" style={{borderBottom:open?"1px solid rgba(255,255,255,0.08)":"none"}}>
        <div className="inline-flex items-center bg-[#1e2252] rounded-full px-2 py-0.5 mb-2">
          <span className="font-mono text-xs text-indigo-300">{category}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-[quicksand] text-sm font-semibold mb-0.5 truncate text-white">{page.title||shortUrl(page.url)}</div>
            <div className="font-mono text-xs truncate text-gray-500">{page.url}</div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{border:`1.5px solid ${color}`,background:`${color}18`}}>
            <span className="font-mono text-xs font-bold" style={{color}}>{score}</span>
          </div>
        </div>
      </div>
      {open&&(
        <div className="p-5">
          <SignalBars signals={page.signals}/>
          {rws.length>0&&<PriorityFixes rewrites={rws}/>}
          <ActionPlan topGaps={page.topGaps} rewrites={rws}/>
          <CTAStrip/>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE AUDIT TOOL
───────────────────────────────────────────────────────────── */
function AuditTool({toolRef}){
  const [domain,setDomain]=useState("");
  const [pages,setPages]=useState([{url:"",content:""}]);
  const [loading,setLoading]=useState(false);
  const [stepIndex,setStepIndex]=useState(-1);
  const [stepMsg,setStepMsg]=useState("");
  const [stepUrls,setStepUrls]=useState([]);
  const [error,setError]=useState("");
  const [results,setResults]=useState(null);
  const [markdown,setMarkdown]=useState("");
  const resultsRef=useRef(null);

  function addPage(){if(pages.length<5)setPages([...pages,{url:"",content:""}]);}
  function removePage(i){setPages(pages.filter((_,idx)=>idx!==i));}
  function updatePage(i,f,v){const n=[...pages];n[i]={...n[i],[f]:v};setPages(n);}
  function resetAudit(){setResults(null);setMarkdown("");setError("");setStepIndex(-1);setStepMsg("");setStepUrls([]);}

  async function runAudit(){
    setError("");
    if(!domain.trim()){setError("Please enter a domain.");return;}
    setLoading(true);setResults(null);setMarkdown("");setStepIndex(0);setStepMsg("");setStepUrls([]);
    try{
      const res=await fetch("/api/geo-audit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:domain.trim(),pages:pages.filter(p=>p.url||p.content),maxPages:50,topN:10})});
      if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error||"Request failed.");}
      const reader=res.body.getReader();const decoder=new TextDecoder();let buffer="";
      while(true){
        const{done,value}=await reader.read();if(done)break;
        buffer+=decoder.decode(value,{stream:true});
        const chunks=buffer.split("\n\n");buffer=chunks.pop();
        for(const chunk of chunks){
          if(!chunk.startsWith("data: "))continue;
          const data=JSON.parse(chunk.slice(6));
          if(data.event==="progress"){setStepIndex(data.step-1);setStepMsg(data.message);if(data.urls?.length)setStepUrls(data.urls);}
          if(data.event==="error")throw new Error(data.message);
          if(data.event==="complete"){setMarkdown(data.markdown||"");setResults(data);setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth"}),150);}
        }
      }
    }catch(err){setError(err.message||"Audit failed.");}
    finally{setLoading(false);}
  }

  function downloadReport(){
    if(!markdown)return;
    const blob=new Blob([markdown],{type:"text/markdown"});const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download=`geo-audit-${domain.replace(/https?:\/\//,"").replace(/\//g,"-")}.md`;a.click();URL.revokeObjectURL(url);
  }

  return(
    <section id="audit-tool" ref={toolRef} className="py-20 border-t border-white/[0.06]">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-[#6c5ce8]/40">
              <Sparkles className="h-4 w-4 stroke-slate-100 mr-2"/>
              <span className="font-[quicksand] text-sm text-gray-300 font-bold">GEO Audit Tool</span>
            </div>
          </div>
          <h2 className="font-[quicksand] text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Run your free audit now
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">Paste your domain and optionally your key page content for a deeper score.</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl p-7 mb-5 bg-gray-800/60 border border-gray-700">
          <div className="mb-5">
            <label className="font-[quicksand] font-semibold text-white block mb-2">Domain / Company name</label>
            <input type="text" placeholder="e.g. futuresearch.ai or infrasity.com"
              value={domain} onChange={e=>setDomain(e.target.value)}
              className="appearance-none bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl w-full px-4 py-3 text-white text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c5ce8] focus:border-transparent"/>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-[quicksand] font-semibold text-white">Pages to audit</label>
              <button onClick={addPage} disabled={pages.length>=5}
                className="font-[quicksand] text-sm text-indigo-300 font-semibold px-3 py-1 rounded-lg hover:bg-indigo-900/30"
                style={{border:"1px solid rgba(95,100,255,0.4)",background:"none",cursor:"pointer"}}>
                + Add page
              </button>
            </div>
            {pages.map((page,i)=>(
              <div key={i} className="rounded-xl p-3 mb-2 border border-gray-700 bg-gray-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-gray-500">Page {i+1}</span>
                  {pages.length>1&&<button onClick={()=>removePage(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:18,lineHeight:1}}>×</button>}
                </div>
                <input type="text" placeholder="Page URL or path (optional)"
                  value={page.url} onChange={e=>updatePage(i,"url",e.target.value)}
                  className="appearance-none bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl w-full px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#6c5ce8] mb-2"/>
                <textarea placeholder="Paste full page content — title, headings, body text, any FAQs..."
                  value={page.content} onChange={e=>updatePage(i,"content",e.target.value)} rows={4}
                  className="appearance-none bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl w-full px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#6c5ce8] resize-y"/>
              </div>
            ))}
          </div>
        </div>

        {/* Submit — ai-border style like script generator */}
        <div className="relative mb-4">
          <div className="relative rounded-2xl shadow-2xl overflow-hidden ai-border">
            <textarea placeholder="Describe what to look for, e.g. 'Check our blog pages for AI citation gaps'"
              className="w-full h-20 px-6 py-5 pr-16 bg-transparent text-white placeholder-gray-500 resize-none outline-none text-base rounded-2xl"
              style={{scrollbarWidth:"none",msOverflowStyle:"none"}} rows={2}/>
            <button onClick={runAudit}
              className="absolute bottom-4 right-4 w-10 h-10 hover:opacity-80 rounded-xl flex items-center justify-center shadow-lg"
              style={{background:"#6c5ce8"}}>
              <Sparkles className="w-5 h-5 stroke-white/90"/>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
  <motion.button onClick={runAudit}
    whileHover={{scale:1.03}} whileTap={{scale:0.97}}
    className="group inline-flex items-center rounded-[5px] bg-[#5f64ff] px-6 py-2.5 text-[14px] font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(95,100,255,0.3)]">
    Run GEO Audit
    <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
  </motion.button>
  {/* <button onClick={()=>{setDomain("infrasity.com");setResults(DUMMY_RESULTS);setMarkdown("# Preview mode");setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth"}),100);}}
    className="inline-flex items-center rounded-[5px] border border-white/15 px-6 py-2.5 text-[14px] font-medium text-gray-300 hover:border-white/30 hover:text-white">
    Preview demo
  </button> */}
</div>
<p className="text-center font-mono text-xs text-gray-500 mb-8">Powered by OpenAI GPT-4o · ~20 sec · Up to 50 pages</p>
        {/* Loading */}
        {loading&&(
  <div className="rounded-2xl p-7 bg-gray-800/60 border border-gray-700 mb-8">
    <p className="font-[quicksand] text-sm font-bold uppercase tracking-widest mb-5" style={{color:"#6c5ce8"}}>Running audit</p>
    <div className="flex items-start gap-6">
      {/* Steps list */}
      <ul className="list-none p-0 mb-0 space-y-2 flex-1">
        {AUDIT_STEPS.map((step,i)=>{
          const st=i<stepIndex?"done":i===stepIndex?"active":"wait";
          return(
            <li key={i} className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:st==="done"?"#6c5ce8":st==="active"?"#8B5CF6":"#374151"}}/>
              <span className="font-mono text-xs" style={{fontWeight:st==="active"?600:400,color:st==="done"?"#6b7280":st==="active"?"#fff":"#4b5563"}}>{step}</span>
            </li>
          );
        })}
      </ul>
      {/* Circular progress */}
      <div className="flex-shrink-0 flex items-center justify-center" style={{width:72,height:72}}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          {/* Track */}
          <circle cx="36" cy="36" r="28" fill="none" stroke="#374151" strokeWidth="5"/>
          {/* Progress */}
          <circle cx="36" cy="36" r="28" fill="none" stroke="#6c5ce8" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${2*Math.PI*28}`}
            strokeDashoffset={`${2*Math.PI*28*(1-(stepIndex+1)/AUDIT_STEPS.length)}`}
            transform="rotate(-90 36 36)"
            style={{transition:"stroke-dashoffset 0.6s ease"}}/>
          {/* Percentage text */}
          <text x="36" y="36" textAnchor="middle" dominantBaseline="central"
            className="font-mono" fill="#fff"
            style={{fontSize:13,fontWeight:600,fontFamily:"'IBM Plex Mono',monospace"}}>
            {Math.round((stepIndex+1)/AUDIT_STEPS.length*100)}%
          </text>
        </svg>
      </div>
    </div>
    <div className="h-px mt-5 mb-4 bg-gray-700"/>
    {stepIndex>=0&&(
      <>
        <div className="font-mono text-xs text-gray-400">{stepMsg||STEP_DETAILS[stepIndex]?.sub}</div>
        {stepUrls.length>0&&(stepIndex===0||stepIndex===1||stepIndex===4)&&(
          <div className="mt-3 font-mono text-xs truncate" style={{color:"#6c5ce8"}}>→ {shortUrl(stepUrls[stepUrls.length-1])}</div>
        )}
      </>
    )}
  </div>
)}

        {error&&<div className="mb-8 bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-center font-mono text-xs">{error}</div>}

        {/* Results */}
        {results&&!loading&&(
          <div ref={resultsRef}>
            <div className="h-px my-8 bg-gray-700"/>
            <div className="mb-5">
              <div className="font-mono text-xs tracking-widest mb-2 text-gray-400 uppercase">GEO Audit Report</div>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-[quicksand] text-3xl font-bold mb-1 text-white">{(domain||"infrasity.com").replace(/https?:\/\//,"")}</h2>
                  <p className="font-mono text-xs text-gray-400">
                    {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})} · {results.summary?.totalPages??1} page{results.summary?.totalPages!==1?"s":""} audited
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={downloadReport} className="group inline-flex items-center rounded-[5px] bg-[#5f64ff] px-5 py-2.5 text-[14px] font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(95,100,255,0.3)]" style={{border:"none",cursor:"pointer"}}>
                    <span style={{color:"#4ade80"}} className="mr-1">↓</span> report.md
                  </button>
                  <button onClick={resetAudit} className="group inline-flex items-center rounded-[5px] bg-[#5f64ff] px-5 py-2.5 text-[14px] font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(95,100,255,0.3)]" style={{border:"none",cursor:"pointer"}}>
                    <span style={{color:"#4ade80"}} className="mr-1">+</span> New audit
                  </button>
                </div>
              </div>
            </div>
            <ScoreHeroCard summary={results.summary}/>
            {results.topPages?.length>0&&(
              <>
                <div className="font-mono text-xs uppercase tracking-widest mb-3 text-gray-400">Page breakdown</div>
                {(()=>{const rmap=new Map((results.rewrites||[]).map(r=>[r.url,r]));return results.topPages.map((page,i)=><PageCard key={i} page={page} rewriteResult={rmap.get(page.url)} rank={i+1}/>);})()}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FINAL CTA — matches reddit-opportunity-finder
───────────────────────────────────────────────────────────── */
function FinalCTA({onRunAudit}){
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-15% 0px"});
  const motionSafe=useMotionSafe();
  const words1="Your content is invisible".split(" ");
  const words2="to AI engines.".split(" ");
  const words3="Fix that now.".split(" ");
  return(
    <section className="py-20 border-t border-white/[0.06] relative overflow-hidden" ref={ref}>
      {motionSafe&&(
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{background:"radial-gradient(circle, rgba(95,100,255,0.12) 0%, transparent 70%)",filter:"blur(80px)"}}
          initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:1.2,ease:"easeOut"}}/>
      )}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p className="mb-4 text-[12px] tracking-[0.1em] uppercase" style={{color:"rgba(255,255,255,0.3)"}}
          initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5,delay:0.1}}>
          Get started free
        </motion.p>
        <h2 className="specialtext mb-4 font-[quicksand]" style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:700,letterSpacing:"-0.04em",lineHeight:1.1}}>
        Your content is{" "}
        <span className="invisible-blink" style={{
  background:"linear-gradient(135deg, #6366f1, #a855f7)",
  WebkitBackgroundClip:"text",
  WebkitTextFillColor:"transparent",
  backgroundClip:"text",
  display:"inline-block",
}}>invisible</span>   <br/>to AI engines.<br/>Fix that Now!
      </h2>
        <motion.p className="mx-auto max-w-lg text-[16px] font-light leading-relaxed mb-8" style={{color:"rgba(255,255,255,0.45)"}}
          initial={motionSafe?{opacity:0,y:16}:{opacity:1}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.5,ease:EASE_OUT_EXPO,delay:0.45}}>
          Your competitors are getting cited by ChatGPT, Perplexity, and Claude. The GEO Audit shows you exactly why — and how to fix it in a single sprint.
        </motion.p>
        <motion.div className="flex items-center justify-center gap-3 mb-4"
          initial={motionSafe?{opacity:0,scale:0.95}:{opacity:1}}
          animate={inView?{opacity:1,scale:1}:{}}
          transition={{...SPRING,delay:0.55}}>
          <PrimaryBtn onClick={onRunAudit}>Run Free GEO Audit</PrimaryBtn>
          <GhostBtn href="/contact">Talk to the team</GhostBtn>
        </motion.div>
        <motion.p className="mt-4 text-[12px]" style={{color:"rgba(255,255,255,0.25)"}}
          initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5,delay:0.65}}>
          Free to try · B2B SaaS &amp; DevTools · Built by Infrasity
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHY USE + FAQ + STEPS
───────────────────────────────────────────────────────────── */
function WhyUse(){
  const [hoveredCard,setHoveredCard]=useState(null);
  return(
    <div className="pb-16 pt-4">
      <div className="max-w-6xl mx-auto text-center pb-8 px-4">
        <h2 className="quicksand-bold text-[37px] max-sm:text-[28px] tracking-tighter leading-[80px] max-sm:leading-[50px] text-white">Why Use Our GEO Audit Tool?</h2>
      </div>
      <div className="flex items-center justify-center px-4">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-10 max-sm:grid-cols-1 max-sm:gap-6 max-w-6xl w-full mx-auto">
            {WHY_CARDS.map(card=>(
              <div key={card.id} className="relative group w-full" onMouseEnter={()=>setHoveredCard(card.id)} onMouseLeave={()=>setHoveredCard(null)}>
                <div className="w-full relative rounded-3xl overflow-hidden transition-all duration-500"
                  style={{background:"linear-gradient(to top right, #020207 50%, #5F64FF80 100%)",border:"1px solid #D8D8D833",height:"355px"}}>
                  <div className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard===card.id?"scale-[3] opacity-60":"scale-100 opacity-30"}`}/>
                  <div className="p-8">
                    <div className="flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-[#1e2252] mb-6">{card.icon}</div>
                    <h3 className="font-[quicksand] text-xl font-bold text-white tracking-tighter mb-3">{card.title}</h3>
                    <p className="text-sm text-[#afafaf] tracking-wider leading-relaxed font-light">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIcon({name}){const Icon=LucideIcons[name]||LucideIcons.HelpCircle;return <Icon className="w-16 h-16 text-indigo-400" strokeWidth={1.5}/>;}

function Steps(){
  return(
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mx-auto max-w-3xl font-[quicksand] text-lg md:text-2xl font-extrabold text-white leading-snug tracking-tight">
            How to Use the GEO Audit Tool
            <span className="block mt-2 text-indigo-300 font-semibold">Built for B2B SaaS companies who want to get cited by AI engines.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_STEPS.slice(0,3).map(step=>(
            <article key={step.id} className="bg-gray-800/60 rounded-2xl p-6 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-center mb-4"><div className="w-36 h-36 flex items-center justify-center rounded-xl bg-gray-900/20"><StepIcon name={step.icon}/></div></div>
              <div className="mb-2 text-center"><span className="text-[18px] text-gray-300 font-semibold tracking-wider">{step.label}</span></div>
              <h3 className="text-white font-[quicksand] text-xl font-bold mb-3">{step.title}</h3>
              <ul className="space-y-2">{step.options.map((o,i)=><li key={i} className="flex items-start gap-3"><span className="text-sm text-indigo-300 font-semibold">•</span><div className="text-sm text-white">{o}</div></li>)}</ul>
            </article>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {HOW_STEPS.slice(3).map(step=>(
            <article key={step.id} className="bg-gray-800/60 rounded-2xl p-6 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-900/20"><StepIcon name={step.icon}/></div>
                <div className="flex-1"><div className="mb-1"><span className="text-[18px] text-gray-300 font-semibold tracking-wider">{step.label}</span></div><h3 className="text-white text-lg font-[quicksand] font-bold mb-2">{step.title}</h3></div>
              </div>
              <ul className="mt-6 space-y-2">{step.options.map((o,i)=><li key={i} className="flex items-start gap-3"><span className="text-sm text-indigo-300 font-semibold">•</span><div className="text-sm text-white">{o}</div></li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  const [openItem,setOpenItem]=useState(null);
  return(
    <section className="w-full py-10 px-6 md:px-10">
      <div className="w-full mx-auto md:w-full">
        <div className="flex max-md:flex-col sm:flex-col lg:flex-row justify-center gap-10 lg:gap-40">
          <div className="lg:w-5/12 mb-10 lg:mb-0">
            <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-1.5 mb-6"><span className="text-purple-800">FAQ</span></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-400 text-[#5F64FF] mb-6 leading-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-white mb-8">Have a question that needs a human to answer? No problem.</p>
            <a href="/contact" className="inline-flex items-center text-[#5F64FF] text-lg">Speak to Us <ArrowRight className="ml-2 h-4 w-4"/></a>
          </div>
          <div className="flex justify-center">
            <div className="w-[80%] flex flex-col gap-4">
              {FAQ_DATA.map((faq,i)=>(
                <div key={i} className="border-[1px] lg:w-[30vw] w-full border-[#5F64FF] rounded-[10px]">
                  <button onClick={()=>setOpenItem(openItem===i?null:i)} className="p-6 text-left text-lg font-normal text-white w-full flex items-center justify-between">
                    {faq.q}<ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${openItem===i?"rotate-180":""}`}/>
                  </button>
                  <div className={`overflow-hidden bg-gray-100 rounded-[10px] transition-all duration-300 ${openItem===i?"max-h-[450px] opacity-100 p-6":"max-h-0 opacity-0"}`}>
                    <div className="text-black">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────── */
export default function Page(){
  const toolRef=useRef(null);

  function scrollToTool(){
    toolRef.current?.scrollIntoView({behavior:"smooth",block:"start"});
  }

  return(
    <div className="relative">
      <Hero onRunAudit={scrollToTool}/>
      <FeaturesSection/>
      <HowItWorks/>
      <AuditTool toolRef={toolRef}/>
      <WhyUse/>
      <Steps/>
      <FAQSection/>
      <FinalCTA onRunAudit={scrollToTool}/>
      <style>{`
  input::placeholder,textarea::placeholder{color:#4b5563;}
  @keyframes blink-word {
    0%,45%   { opacity: 1; }
    55%,100% { opacity: 0; }
  }
  .invisible-blink {
    animation: blink-word 2s ease-in-out infinite;
  }
`}</style>    </div>
  );
}