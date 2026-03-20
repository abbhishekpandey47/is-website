"use client";

import { useState, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const HOVER_SPRING = { type:"spring", stiffness:400, damping:25 };
const SIGNAL_MAX={citations:20,structure:20,freshness:15,authority:20,entities:15,directness:10};
const SIGNAL_DISPLAY={entities:"AI-quotable defs",directness:"Answer-first",structure:"FAQ block",authority:"Schema signals",freshness:"Headings",citations:"Citation auth"};
const AUDIT_STEPS=["Crawling sitemap and pages…","Fetching and parsing pages…","Scoring 6 GEO signals per page…","Ranking by opportunity score…","Generating rewrite suggestions…"];
const STEP_DETAILS=[{sub:"Following links across the domain"},{sub:"Extracting headings, body and schema"},{sub:"Scanning Q&A patterns across pages"},{sub:"Identifying highest-upside pages"},{sub:"Writing specific fixes with GPT-4o"}];
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

function grade(s){return s>=70?"Strong":s>=50?"Fair":s>=30?"Weak":"Poor";}
function gradeColor(s){return s>=70?"#16a34a":s>=50?"#d4980a":s>=30?"#e67e22":"#dc2626";}
function barColor(p){return p>=70?"#16a34a":p>=45?"#d4980a":"#dc2626";}
function toDisp(sig,pts){const m=SIGNAL_MAX[sig];return m?Math.round((pts/m)*100):0;}
function shortUrl(url){try{const u=new URL(url);return u.hostname+u.pathname;}catch{return url;}}
const labelStyle={fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#c8c4bc",marginBottom:12};

function ScoreHeroCard({summary}){
  const score=summary?.avgScore??0;const total=summary?.totalPages??0;
  const failing=summary?.pagesBelow30??0;const warning=Math.max(0,(summary?.pagesBelow50??0)-failing);
  const passing=Math.max(0,total-failing-warning);const color=gradeColor(score);
  return(
    <div className="rounded-2xl p-6 mb-6 bg-gray-800/60 border border-gray-700">
      <div className="flex items-start gap-7 flex-wrap">
        <div className="flex-shrink-0">
          <div className="font-[quicksand] text-sm font-medium mb-1" style={{color}}>{grade(score)}</div>
          <div className="flex items-baseline gap-1">
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:72,lineHeight:1,color,letterSpacing:"-0.02em"}}>{score}</span>
            <span className="text-gray-400 text-lg font-[quicksand]">/100</span>
          </div>
        </div>
        <div className="flex-1 min-w-44 pt-2">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            {score>=70?"Good GEO readiness. Focus on freshness and authority for further gains.":score>=50?"Strong structure but lacks quotable definitions and citation data. Needs answer-first formatting.":"Significant GEO gaps. Prioritise the pages below."}
          </p>
          <div className="flex gap-2 flex-wrap">
            {[{n:passing,c:"#16a34a",l:"passing"},{n:warning,c:"#d4980a",l:"warning"},{n:failing,c:"#dc2626",l:"failing"}].map(p=>(
              <span key={p.l} className="font-[quicksand] text-xs px-3 py-1 rounded-full" style={{background:`${p.c}22`,border:`1px solid ${p.c}66`,color:p.c}}>{p.n} {p.l}</span>
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
            <span className="font-[quicksand] text-xs flex-shrink-0 w-28 text-gray-400">{SIGNAL_DISPLAY[sig]||sig}</span>
            <div className="flex-1 h-1 rounded-full overflow-hidden bg-gray-700">
              <div style={{width:`${disp}%`,height:"100%",background:color,borderRadius:2}}/>
            </div>
            <span className="font-[quicksand] text-xs font-medium w-7 text-right flex-shrink-0" style={{color}}>{disp}</span>
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
            <span className="font-[quicksand] text-xs px-2 py-0.5 rounded flex-shrink-0 mt-0.5" style={{background:isHigh?"rgba(220,38,38,0.2)":"rgba(100,80,40,0.3)",border:isHigh?"1px solid rgba(220,38,38,0.5)":"1px solid rgba(180,140,60,0.4)",color:isHigh?"#fca5a5":"#d4980a"}}>{rw.priority}</span>
            <div>
              <div className="text-sm font-medium mb-1 text-white font-[quicksand]">
                {rw.signal?`${rw.signal.charAt(0).toUpperCase()}${rw.signal.slice(1)}`:"Fix"}{rw.original&&rw.original!=="Not present"?` — ${rw.original.slice(0,55)}${rw.original.length>55?"...":""}` :""}
              </div>
              {rw.rationale&&<div className="font-[quicksand] text-xs leading-relaxed text-gray-400">{rw.rationale.slice(0,95)}{rw.rationale.length>95?"...":""}</div>}
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
          <span className="font-[quicksand] text-xs flex-shrink-0 w-5 pt-0.5 text-gray-500">{String(i+1).padStart(2,"0")}</span>
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
        <div className="font-[quicksand] text-xs text-gray-400">Infrasity implements GEO for B2B SaaS and drives traffic or conversion by AI source</div>
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
          <span className="font-[quicksand] text-xs text-indigo-300">{category}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-[quicksand] text-sm font-semibold mb-0.5 truncate text-white">{page.title||shortUrl(page.url)}</div>
            <div className="font-[quicksand] text-xs truncate text-gray-500">{page.url}</div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{border:`1.5px solid ${color}`,background:`${color}18`}}>
            <span className="font-[quicksand] text-xs font-bold" style={{color}}>{score}</span>
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

export default function GeoAuditToolPage(){
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

  function loadPreview(){
    setDomain("infrasity.com");setResults(DUMMY_RESULTS);setMarkdown("# Preview mode");
    setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth"}),100);
  }

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
    <div className="min-h-screen" style={{background:"#0a0a0f"}}>
      {/* Top nav bar — matches reddit tool */}
      {/* <div className="border-b border-white/[0.06] px-6 py-3 flex items-center gap-3">
        <Link href="/tools/geo-audit" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{background:"#5f64ff"}}>
            <Sparkles className="w-3.5 h-3.5 stroke-white"/>
          </div>
          <span className="font-[quicksand] font-bold text-sm">GEO Audit</span>
        </Link>
        <span className="text-gray-600 text-sm">·</span>
        <span className="font-[quicksand] font-bold text-sm">Discover what AI engines can&apos;t cite on your site and get a prioritized fix list.</span>
      </div> */}

      <div className="max-w-3xl mx-auto px-6 py-12">


      {/* Hero section */}{/* ── Infrasity header bar — Image 1 ── */}
<div className="flex items-center justify-between pb-5 mb-8 border-b border-white/[0.06]">
  <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden" style={{border:"1px solid #2a2a3a",background:"#1a1a2e"}}>
  <img src="/favicon.ico" alt="Infrasity" style={{width:28,height:28,objectFit:"contain"}}/>
</div>
    <div>
      <div className="text-sm font-semibold text-white" style={{letterSpacing:"-0.01em"}}>Infrasity</div>
      <div className="font-[quicksand]   text-xs" style={{color:"#a8a29e"}}>GEO Audit Report</div>
    </div>
  </div>
  <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{border:"1px solid #333"}}>
    <span className="font-[quicksand]  text-xs" style={{color:"#a8a29e"}}>Beta</span>
    <span className="font-[quicksand]  text-xs" style={{color:"#555"}}>·</span>
    <span className="font-[quicksand]  text-xs" style={{color:"#a8a29e"}}>v1.0</span>
  </div>
</div>

{/* ── GEO label ── */}
<div className="flex items-center gap-3 mb-5">
  <div style={{width:28,height:1,background:"#ffffff"}}/>
  <span className="font-[quicksand] text-sm text-gray-300 font-bold">GENERATIVE ENGINE OPTIMIZATION</span>
</div>

{/* ── Hero heading card ── */}
<div style={{border:"1px solid #2a2a3a",borderRadius:12,padding:"24px",background:"#111118",marginBottom:20}}>
  <h1 className="mb-4" style={{fontFamily:"font-[quicksand]",fontSize:"clamp(28px,5vw,44px)",fontWeight:400,lineHeight:1.1,letterSpacing:"-0.01em",color:"#ede9e1"}}>
    Is your content{" "}
    <em style={{color:"#5F64FF",fontStyle:"italic"}}>visible</em>
    <br/>to AI engines?
  </h1>
  <p className="font-[quicksand]  text-sm mb-0" style={{color:"#c8c4bc",maxWidth:520,lineHeight:1.65}}>
    Paste your page content below. We score each page across 6 GEO signals, identify exactly what&apos;s missing, and give you a prioritized fix list.
  </p>
</div>

{/* ── Signal pills 2-col grid ── */}
{/* ── Signal pills card — Image 2 style ── */}
<div style={{border:"1px solid #2a2a3a",borderRadius:12,padding:"20px",background:"#111118",marginBottom:36}}>
  <div className="font-[quicksand] text-xs tracking-widest mb-4" style={{color:"#a8a29e"}}>6 GEO SIGNALS SCORED</div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
  {[
      {label:"AI-quotable definitions", dot:"#7F77DD",border:"#534AB7",bg:"rgba(83,74,183,0.15)"},
      {label:"Answer-first structure",  dot:"#5DCAA5",border:"#1D9E75",bg:"rgba(29,158,117,0.15)"},
      {label:"FAQ block presence",      dot:"#EF9F27",border:"#BA7517",bg:"rgba(186,117,23,0.15)"},
      {label:"Schema markup signals",   dot:"#F0997B",border:"#D85A30",bg:"rgba(216,90,48,0.15)"},
      {label:"Heading hierarchy",       dot:"#378ADD",border:"#185FA5",bg:"rgba(24,95,165,0.15)"},
      {label:"Citation authority",      dot:"#97C459",border:"#639922",bg:"rgba(99,153,34,0.15)"},
    ].map(s=>(
      <div key={s.label} style={{border:`1px solid ${s.border}`,borderRadius:6,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,background:s.bg}}>
        <span style={{color:s.dot,fontSize:14,flexShrink:0}}>•</span>
        <span className="font-[quicksand] text-xs" style={{color:"#ede9e1"}}>{s.label}</span>
      </div>
    ))}
  </div>
</div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-[#6c5ce8]/40">
              <Sparkles className="h-4 w-4 stroke-slate-100 mr-2"/>
              <span className="font-[quicksand] text-sm text-gray-300 font-bold">GEO Audit Tool</span>
            </div>
          </div>
          <h1 className="font-[quicksand] text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Analyze your domain
          </h1>
          {/* <p className="text-gray-400 max-w-lg mx-auto">
            Paste your domain URL and we&apos;ll score every page across 6 GEO signals, find citation gaps, and generate a prioritized fix list.
          </p> */}
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
                  <span className="font-[quicksand] text-xs text-gray-500">Page {i+1}</span>
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

        {/* Submit */}
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
            whileHover={{scale:1.03}} whileTap={{scale:0.97}} transition={HOVER_SPRING}
            className="group inline-flex items-center rounded-[5px] bg-[#5f64ff] px-6 py-2.5 text-[14px] font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(95,100,255,0.3)]">
            Run GEO Audit
            <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </motion.button>
          {/* <button onClick={loadPreview}
            className="inline-flex items-center rounded-[5px] border border-white/15 px-6 py-2.5 text-[14px] font-medium text-gray-300 hover:border-white/30 hover:text-white">
            Preview demo
          </button> */}
        </div>
        <p className="text-center font-[quicksand] text-xs text-gray-500 mb-8">Powered by OpenAI GPT-4o · ~20 sec · Up to 50 pages</p>

        {/* Loading */}
        {loading&&(
          <div className="rounded-2xl p-7 bg-gray-800/60 border border-gray-700 mb-8">
            <p className="font-[quicksand] text-sm font-bold uppercase tracking-widest mb-5" style={{color:"#6c5ce8"}}>Running audit</p>
            <div className="flex items-start gap-6">
              <ul className="list-none p-0 mb-0 space-y-2 flex-1">
                {AUDIT_STEPS.map((step,i)=>{
                  const st=i<stepIndex?"done":i===stepIndex?"active":"wait";
                  return(
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:st==="done"?"#6c5ce8":st==="active"?"#8B5CF6":"#374151"}}/>
                      <span className="font-[quicksand] text-xs" style={{fontWeight:st==="active"?600:400,color:st==="done"?"#6b7280":st==="active"?"#fff":"#4b5563"}}>{step}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex-shrink-0" style={{width:72,height:72}}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="#374151" strokeWidth="5"/>
                  <circle cx="36" cy="36" r="28" fill="none" stroke="#6c5ce8" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*28}`}
                    strokeDashoffset={`${2*Math.PI*28*(1-(stepIndex+1)/AUDIT_STEPS.length)}`}
                    transform="rotate(-90 36 36)"
                    style={{transition:"stroke-dashoffset 0.6s ease"}}/>
                  <text x="36" y="36" textAnchor="middle" dominantBaseline="central" fill="#fff"
                    style={{fontSize:13,fontWeight:600,fontFamily:"'IBM Plex Mono',monospace"}}>
                    {Math.round((stepIndex+1)/AUDIT_STEPS.length*100)}%
                  </text>
                </svg>
              </div>
            </div>
            <div className="h-px mt-5 mb-4 bg-gray-700"/>
            {stepIndex>=0&&(
              <>
                <div className="font-[quicksand] text-xs text-gray-400">{stepMsg||STEP_DETAILS[stepIndex]?.sub}</div>
                {stepUrls.length>0&&(stepIndex===0||stepIndex===1||stepIndex===4)&&(
                  <div className="mt-3 font-[quicksand] text-xs truncate" style={{color:"#6c5ce8"}}>→ {shortUrl(stepUrls[stepUrls.length-1])}</div>
                )}
              </>
            )}
          </div>
        )}

        {error&&<div className="mb-8 bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-center font-[quicksand] text-xs">{error}</div>}

        {/* Results */}
        {results&&!loading&&(
          <div ref={resultsRef}>
            <div className="h-px my-8 bg-gray-700"/>
            <div className="mb-5">
              <div className="font-[quicksand] text-xs tracking-widest mb-2 text-gray-400 uppercase">GEO Audit Report</div>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-[quicksand] text-3xl font-bold mb-1 text-white">{(domain||"infrasity.com").replace(/https?:\/\//,"")}</h2>
                  <p className="font-[quicksand] text-xs text-gray-400">
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
                <div className="font-[quicksand] text-xs uppercase tracking-widest mb-3 text-gray-400">Page breakdown</div>
                {(()=>{const rmap=new Map((results.rewrites||[]).map(r=>[r.url,r]));return results.topPages.map((page,i)=><PageCard key={i} page={page} rewriteResult={rmap.get(page.url)} rank={i+1}/>);})()}
              </>
            )}
          </div>
        )}
      </div>
      <style>{`input::placeholder,textarea::placeholder{color:#4b5563;}`}</style>
    </div>
  );
}