"use client";
 
import { useState, useRef } from "react";
 
const SIGNALS_INPUT = [
  "AI-quotable definitions","Answer-first structure","FAQ block presence",
  "Schema markup signals","Heading hierarchy","Citation authority",
];
 
const SIGNAL_MAX = { citations:20, structure:20, freshness:15, authority:20, entities:15, directness:10 };
 
const SIGNAL_DISPLAY = {
  entities:"AI-quotable defs", directness:"Answer-first",
  structure:"FAQ block", authority:"Schema signals",
  freshness:"Headings", citations:"Citation auth",
};
 
const STEPS = [
  "Crawling sitemap and pages…","Fetching and parsing pages…",
  "Scoring 6 GEO signals per page…","Ranking by opportunity score…",
  "Generating rewrite suggestions…",
];
 
const STEP_DETAILS = [
  { msg:"Crawling sitemap and pages…",    sub:"Following links across the domain" },
  { msg:"Fetching and parsing pages…",    sub:"Extracting headings, body and schema" },
  { msg:"Detecting FAQ blocks…",          sub:"Scanning Q&A patterns across pages" },
  { msg:"Ranking by opportunity score…",  sub:"Identifying highest-upside pages" },
  { msg:"Generating rewrite suggestions…",sub:"Writing specific fixes with GPT-4o" },
];
 
const DUMMY_RESULTS = {
  summary: {
    totalPages: 12, avgScore: 58,
    pagesBelow30: 2, pagesBelow50: 5,
    weakestSignal: "citations",
  },
  topPages: [
    {
      url: "https://infrasity.com/blog/ai-agent-content-strategy",
      title: "AI Agent Content Strategy for B2B SaaS: 5 Frameworks That Drive Pipeline in 2026",
      type: "blog", rawScore: 58,
      topGaps: ["entities","directness","citations"],
      signals: { entities:5, directness:4, structure:17, authority:10, freshness:13, citations:0 },
    },
    {
      url: "https://infrasity.com/blog/geo-vs-seo",
      title: "GEO vs SEO: Why AI Engines Change Everything for B2B Content",
      type: "blog", rawScore: 51,
      topGaps: ["citations","entities","directness"],
      signals: { entities:4, directness:3, structure:15, authority:8, freshness:13, citations:0 },
    },
    {
      url: "https://infrasity.com/services/geo-optimization",
      title: "GEO Optimization Services for B2B SaaS Companies",
      type: "product", rawScore: 44,
      topGaps: ["citations","authority","directness"],
      signals: { entities:8, directness:3, structure:11, authority:5, freshness:13, citations:0 },
    },
    {
      url: "https://infrasity.com/blog/perplexity-citations",
      title: "How to Get Cited by Perplexity, ChatGPT and Claude: A Practical Guide",
      type: "blog", rawScore: 47,
      topGaps: ["citations","authority","entities"],
      signals: { entities:5, directness:6, structure:13, authority:5, freshness:13, citations:0 },
    },
    {
      url: "https://infrasity.com/case-studies/saas-geo-results",
      title: "How We Grew AI Engine Citations 3x for a B2B SaaS Client in 90 Days",
      type: "blog", rawScore: 62,
      topGaps: ["citations","directness"],
      signals: { entities:12, directness:5, structure:16, authority:10, freshness:15, citations:0 },
    },
  ],
  rewrites: [
    {
      url: "https://infrasity.com/blog/ai-agent-content-strategy",
      rewrites: [
        { signal:"entities", priority:"high",
          original:"AI agents are software that can take actions autonomously.",
          rewrite:"Add boxed definitions for AI agents GPTBot ClaudeBot PerplexityBot DeepSeek R1 above fold",
          rationale:"Add boxed definition: AI agents are autonomous software that discovers and evaluates products" },
        { signal:"directness", priority:"high",
          original:"In this article we explore how B2B SaaS companies can think about their content strategy.",
          rewrite:"Convert all H2 headings to answer-first question format with immediate direct answers",
          rationale:"Rewrite H2s as questions: What Are AI Agents becomes How Do AI Agents Change Discovery" },
        { signal:"citations", priority:"medium",
          original:"Research shows that AI-cited content gets significantly more referral traffic.",
          rewrite:"Insert schema-ready FAQ block with structured Q&A pairs using FAQ schema markup",
          rationale:"Add original research: percentage of citations by bot or conversion rate metrics" },
        { signal:"citations", priority:"medium",
          original:"Not present",
          rewrite:"Publish original data on citation rates bot traffic or conversion by AI source",
          rationale:"Original proprietary data is cited 4x more than rephrased third-party claims" },
      ],
    },
    {
      url: "https://infrasity.com/blog/geo-vs-seo",
      rewrites: [
        { signal:"citations", priority:"high",
          original:"Traditional SEO focuses on ranking in Google, while GEO focuses on AI engines.",
          rewrite:"Add Forrester or Gartner citation: 62% of enterprise buyers used AI for first research touchpoint",
          rationale:"Cited statistics are quoted by AI engines 5x more than uncited claims" },
        { signal:"entities", priority:"high",
          original:"Not present",
          rewrite:"Add definition block: GEO is the practice of structuring content to be cited by AI engines like ChatGPT, Perplexity and Claude",
          rationale:"A clear entity definition in paragraph 1 makes this the canonical source for the term" },
        { signal:"directness", priority:"medium",
          original:"There are several differences between GEO and SEO that marketers should understand.",
          rewrite:"Rewrite opening as direct answer: The core difference — SEO wins rankings, GEO wins AI citations",
          rationale:"Answer-first writing in the first sentence makes the page quotable for comparison queries" },
      ],
    },
    {
      url: "https://infrasity.com/services/geo-optimization",
      rewrites: [
        { signal:"authority", priority:"high",
          original:"Not present",
          rewrite:"Add Organization schema and author bylines to all service pages",
          rationale:"Organization schema makes Infrasity machine-readable for AI engines answering vendor queries" },
        { signal:"citations", priority:"high",
          original:"GEO is becoming the most important channel for B2B SaaS marketing.",
          rewrite:"Add Forrester citation: 62% of enterprise software buyers used AI as first research touchpoint in 2025",
          rationale:"Service pages with cited statistics are 4x more likely to be quoted in vendor comparisons" },
        { signal:"directness", priority:"medium",
          original:"We help B2B SaaS companies with their content optimization needs.",
          rewrite:"Rewrite as direct answer: Infrasity increases AI engine citations 3x in 90 days through GEO audits and schema",
          rationale:"Answer-first service description matches what AI answers when asked who does GEO optimization" },
      ],
    },
    {
      url: "https://infrasity.com/blog/perplexity-citations",
      rewrites: [
        { signal:"citations", priority:"high",
          original:"Getting cited by Perplexity requires a different approach than traditional SEO.",
          rewrite:"Add link to Perplexity publisher guidelines and Search Engine Land analysis showing 5x citation lift",
          rationale:"Links to official platform docs create the authoritative citation chain AI engines trust" },
        { signal:"entities", priority:"high",
          original:"Not present",
          rewrite:"Add definition: Perplexity AI is an answer engine processing 100M+ monthly queries that cites sources inline",
          rationale:"Defining the subject entity in the first 100 words is the highest-impact GEO move for topical pages" },
        { signal:"authority", priority:"medium",
          original:"Not present",
          rewrite:"Add author byline with Person schema: GEO Specialist at Infrasity, Updated March 2026",
          rationale:"Author attribution increases E-E-A-T signals that AI engines use to assess content credibility" },
      ],
    },
    {
      url: "https://infrasity.com/case-studies/saas-geo-results",
      rewrites: [
        { signal:"citations", priority:"high",
          original:"Our client saw significant improvements in AI engine visibility.",
          rewrite:"Add specific numbers: 0 to 47 AI citations per month tracked via Perplexity API and BrightEdge over 90 days",
          rationale:"Specific tracked numbers make case study claims verifiable and therefore quotable by AI" },
        { signal:"directness", priority:"medium",
          original:"In this case study we walk through the process we used to improve AI visibility.",
          rewrite:"Open with direct result: We increased AI citations 3x in 90 days by fixing citations, H2 structure and FAQ schema",
          rationale:"Answer-first case study intro is quoted in AI responses to how to increase AI citations queries" },
      ],
    },
  ],
};
 
function grade(s){ return s>=70?"Strong":s>=50?"Fair":s>=30?"Weak":"Poor"; }
function gradeColor(s){ return s>=70?"#16a34a":s>=50?"#d4980a":s>=30?"#e67e22":"#dc2626"; }
function barColor(p){ return p>=70?"#16a34a":p>=45?"#d4980a":"#dc2626"; }
function toDisp(sig,pts){ const m=SIGNAL_MAX[sig]; return m?Math.round((pts/m)*100):0; }
 
const labelStyle={fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6760",marginBottom:12};
 
function ScoreHeroCard({summary}){
  const score=summary?.avgScore??0;
  const total=summary?.totalPages??0;
  const failing=summary?.pagesBelow30??0;
  const warning=Math.max(0,(summary?.pagesBelow50??0)-failing);
  const passing=Math.max(0,total-failing-warning);
  const color=gradeColor(score);
  return(
    <div style={{border:"1px solid #272727",borderRadius:10,padding:"24px 28px",background:"#141414",marginBottom:24}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:28,flexWrap:"wrap"}}>
        <div style={{flexShrink:0}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:500,color,marginBottom:4}}>{grade(score)}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:4}}>
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:80,lineHeight:1,color,letterSpacing:"-0.02em"}}>{score}</span>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:18,color:"#6b6760"}}>/100</span>
          </div>
        </div>
        <div style={{flex:1,minWidth:180,paddingTop:8}}>
          <p style={{fontSize:13,color:"#6b6760",lineHeight:1.65,fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>
            {score>=70?"Good GEO readiness with strong structure and citation presence. Focus on freshness and authority signals for further gains.":score>=50?"Strong structure and FAQ presence, but lacks concise quotable definitions and original citation data. Heading hierarchy is good but needs answer-first formatting.":"Significant GEO gaps across citations, structure, and authority. Prioritise the top 10 pages below for the fastest improvement."}
          </p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[{n:passing,c:"#16a34a",l:"passing"},{n:warning,c:"#d4980a",l:"warning"},{n:failing,c:"#dc2626",l:"failing"}].map(p=>(
              <span key={p.l} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,padding:"3px 10px",borderRadius:20,background:`${p.c}22`,border:`1px solid ${p.c}66`,color:p.c,letterSpacing:"0.03em"}}>{p.n} {p.l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
function SignalBars({signals}){
  if(!signals)return null;
  const order=["entities","directness","structure","authority","freshness","citations"];
  return(
    <div style={{marginBottom:22}}>
      {order.map(sig=>{
        const disp=toDisp(sig,signals[sig]??0);
        const color=barColor(disp);
        return(
          <div key={sig} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6b6760",width:110,flexShrink:0}}>{SIGNAL_DISPLAY[sig]||sig}</span>
            <div style={{flex:1,height:4,background:"#272727",borderRadius:2,overflow:"hidden"}}>
              <div style={{width:`${disp}%`,height:"100%",background:color,borderRadius:2}}/>
            </div>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:500,color,width:28,textAlign:"right",flexShrink:0}}>{disp}</span>
          </div>
        );
      })}
    </div>
  );
}
 
function PriorityFixes({rewrites=[]}){
  if(!rewrites.length)return null;
  return(
    <div style={{marginBottom:22}}>
      <div style={labelStyle}>Priority fixes</div>
      {rewrites.slice(0,4).map((rw,i)=>{
        const isHigh=rw.priority==="high";
        return(
          <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start",background:"#1a1a1a",borderRadius:7,padding:"12px 14px"}}>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,padding:"2px 8px",borderRadius:4,flexShrink:0,marginTop:1,background:isHigh?"rgba(220,38,38,0.2)":"rgba(100,80,40,0.3)",border:isHigh?"1px solid rgba(220,38,38,0.5)":"1px solid rgba(180,140,60,0.4)",color:isHigh?"#fca5a5":"#d4980a",textTransform:"lowercase",letterSpacing:"0.04em"}}>{rw.priority}</span>
            <div>
              <div style={{fontSize:13,color:"#ede9e1",marginBottom:3,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>
                {rw.signal?`${rw.signal.charAt(0).toUpperCase()}${rw.signal.slice(1)}`:"Fix"}{rw.original&&rw.original!=="Not present"?` — ${rw.original.slice(0,55)}${rw.original.length>55?"…":""}` :""}
              </div>
              {rw.rationale&&<div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3d3b38",lineHeight:1.5}}>{rw.rationale.slice(0,95)}{rw.rationale.length>95?"…":""}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
 
function ActionPlan({topGaps=[],rewrites=[]}){
  const actions=[];
  rewrites.forEach(rw=>{ if(rw.rewrite&&actions.length<5)actions.push(rw.rewrite.slice(0,110)+(rw.rewrite.length>110?"…":"")); });
  if(!actions.length){
    const map={citations:"Add 3–5 outbound links to authoritative sources (.gov, .edu, major publishers)",structure:"Convert all H2 headings to question format with immediate direct answers",authority:"Add author byline, bio link, and Person schema to this page",freshness:"Add dateModified schema and refresh content to reflect current year",entities:"Add boxed definitions for key terms above the fold",directness:"Rewrite opening paragraph to answer the main question in the first sentence"};
    topGaps.forEach(g=>{ if(map[g]&&actions.length<5)actions.push(map[g]); });
  }
  if(!actions.length)return null;
  return(
    <div style={{marginBottom:24}}>
      <div style={labelStyle}>Action plan</div>
      {actions.map((a,i)=>(
        <div key={i} style={{display:"flex",gap:14,marginBottom:8,alignItems:"flex-start"}}>
          <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3d3b38",flexShrink:0,width:20,paddingTop:2}}>{String(i+1).padStart(2,"0")}</span>
          <span style={{fontSize:13,color:"#ede9e1",lineHeight:1.6,fontFamily:"'DM Sans',sans-serif"}}>{a}</span>
        </div>
      ))}
    </div>
  );
}
 
function CTAStrip(){
  return(
    <div style={{borderTop:"1px solid #272727",paddingTop:18,marginTop:4,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
      <div>
        <div style={{fontSize:15,color:"#ede9e1",fontFamily:"'DM Sans',sans-serif",fontWeight:500,marginBottom:4}}>Want us to fix this?</div>
        <div style={{fontSize:11,color:"#3d3b38",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.5}}>Infrasity implements GEO for B2B SaaS and drives traffic or conversion by AI source</div>
      </div>
      <a href="/contact" style={{display:"inline-flex",alignItems:"center",gap:6,background:"#d4980a",color:"#0d0d0d",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:500,padding:"10px 20px",borderRadius:6,border:"none",cursor:"pointer",textDecoration:"none",whiteSpace:"nowrap"}}>Talk to Infrasity →</a>
    </div>
  );
}
 
function PageCard({page,rewriteResult,rank}){
  const [open,setOpen]=useState(rank===1);
  const score=page.rawScore??0;
  const color=gradeColor(score);
  const rws=rewriteResult?.rewrites??[];
  const category=page.type==="blog"?"Blog":page.type==="guide"?"Guide":page.type==="product"?"Product":"Page";
  return(
    <div style={{border:"1px solid #272727",borderRadius:8,marginBottom:10,overflow:"hidden",background:open?"#0f0f0f":"#141414"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"14px 18px",cursor:"pointer",borderBottom:open?"1px solid #272727":"none"}}>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#6b6760",marginBottom:5}}>{category}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14}}>
          <div style={{fontSize:13,fontWeight:500,color:"#ede9e1",fontFamily:"'DM Sans',sans-serif",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{page.title||page.url}</div>
          <div style={{width:34,height:34,borderRadius:"50%",border:`1.5px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:`${color}18`}}>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:500,color}}>{score}</span>
          </div>
        </div>
      </div>
      {open&&(
        <div style={{padding:"20px 18px 16px"}}>
          <SignalBars signals={page.signals}/>
          {rws.length>0&&<PriorityFixes rewrites={rws}/>}
          <ActionPlan topGaps={page.topGaps} rewrites={rws}/>
          <CTAStrip/>
        </div>
      )}
    </div>
  );
}
 
function ResultsView({results,domain,onReset,onDownload}){
  return(
    <div>
      <div style={{marginBottom:20}}>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.08em",color:"#6b6760",marginBottom:6}}>GEO Audit Report</div>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:32,fontWeight:400,color:"#ede9e1",margin:"0 0 4px",letterSpacing:"-0.01em"}}>{(domain||"infrasity.com").replace(/https?:\/\//,"")}</h2>
            <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6b6760",margin:0}}>
              {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}{" · "}{results.summary?.totalPages??1} page{results.summary?.totalPages!==1?"s":""} audited
            </p>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onDownload} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6b6760",border:"1px solid #272727",borderRadius:6,padding:"7px 14px",background:"none",cursor:"pointer"}}>↓ report.md</button>
            <button onClick={onReset} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6b6760",border:"1px solid #272727",borderRadius:6,padding:"7px 14px",background:"none",cursor:"pointer"}}>+ New audit</button>
          </div>
        </div>
      </div>
      <ScoreHeroCard summary={results.summary}/>
      {results.topPages?.length>0&&(
        <>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6760",marginBottom:10}}>Page breakdown</div>
          {(()=>{ const rmap=new Map((results.rewrites||[]).map(r=>[r.url,r])); return results.topPages.map((page,i)=><PageCard key={i} page={page} rewriteResult={rmap.get(page.url)} rank={i+1}/>); })()}
        </>
      )}
    </div>
  );
}
 
export default function GeoAuditPage(){
  const [domain,setDomain]=useState("");
  const [pages,setPages]=useState([{url:"",content:""}]);
  const [loading,setLoading]=useState(false);
  const [stepIndex,setStepIndex]=useState(-1);
  const [stepMsg,setStepMsg]=useState("");
  const [error,setError]=useState("");
  const [results,setResults]=useState(null);
  const [markdown,setMarkdown]=useState("");
  const resultsRef=useRef(null);
 
  function addPage(){ if(pages.length<5)setPages([...pages,{url:"",content:""}]); }
  function removePage(i){ setPages(pages.filter((_,idx)=>idx!==i)); }
  function updatePage(i,f,v){ const n=[...pages];n[i]={...n[i],[f]:v};setPages(n); }
  function resetAudit(){ setResults(null);setMarkdown("");setError("");setStepIndex(-1);setStepMsg(""); }
 
  function loadPreview(){
    setDomain("infrasity.com");
    setResults(DUMMY_RESULTS);
    setMarkdown("# GEO Audit Report — infrasity.com\n\n*Preview mode*");
    setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth"}),5000);
  }
 
  async function runAudit(){
    setError("");
    if(!domain.trim()){setError("Please enter a domain.");return;}
    setLoading(true);setResults(null);setMarkdown("");setStepIndex(0);setStepMsg("");
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
          if(data.event==="progress"){setStepIndex(data.step-1);setStepMsg(data.message);}
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
    <div style={{maxWidth:780,margin:"0 auto",padding:"100px 32px 100px",fontFamily:"'DM Sans',sans-serif"}}>
      {!loading&&(
        <>
          <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#d4980a",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
            <span style={{display:"inline-block",width:28,height:1,background:"#d4980a"}}/>Generative Engine Optimization
          </p>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(32px,5vw,50px)",fontWeight:400,lineHeight:1.1,marginBottom:16,letterSpacing:"-0.01em",color:"#ede9e1"}}>
            Is your content <em style={{color:"#e8ac18",fontStyle:"italic"}}>visible</em><br/>to AI engines?
          </h1>
          <p style={{fontSize:15,color:"#6b6760",maxWidth:520,lineHeight:1.65,marginBottom:36}}>
            Paste your page content below. We score each page across 6 GEO signals, identify exactly what&apos;s missing, and give you a prioritized fix list.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:40}}>
            {SIGNALS_INPUT.map(s=>(
              <div key={s} style={{border:"1px solid #272727",borderRadius:6,padding:"10px 14px",fontFamily:"'IBM Plex Mono',monospace",fontSize:11.5,color:"#6b6760",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"#a87a08",fontSize:14,flexShrink:0}}>•</span>{s}
              </div>
            ))}
          </div>
          <div style={{border:"1px solid #272727",borderRadius:10,padding:28,background:"#141414",marginBottom:14}}>
            <div style={{marginBottom:24}}>
              <label htmlFor="geo-domain" style={{display:"block",fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6760",marginBottom:8}}>Domain / Company name</label>
              <input id="geo-domain" type="text" placeholder="e.g. futuresearch.ai or InventDB" value={domain} onChange={e=>setDomain(e.target.value)}
                style={{width:"100%",background:"#1a1a1a",border:"1px solid #272727",borderRadius:6,padding:"12px 16px",fontFamily:"'IBM Plex Mono',monospace",fontSize:13,color:"#ede9e1",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <label style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6760"}}>Pages to audit</label>
                <button onClick={addPage} disabled={pages.length>=5} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6b6760",border:"1px solid #272727",borderRadius:5,padding:"5px 12px",background:"none",cursor:"pointer"}}>+ Add another page</button>
              </div>
              {pages.map((page,i)=>(
                <div key={i} style={{border:"1px solid #272727",borderRadius:8,padding:14,marginBottom:8,background:"#1a1a1a"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#3d3b38"}}>Page {i+1}</span>
                    {pages.length>1&&<button onClick={()=>removePage(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#3d3b38",fontSize:18,lineHeight:1}}>×</button>}
                  </div>
                  <input type="text" placeholder="Page URL or path (optional)" value={page.url} onChange={e=>updatePage(i,"url",e.target.value)}
                    style={{width:"100%",background:"#141414",border:"1px solid #272727",borderRadius:5,padding:"10px 13px",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#ede9e1",marginBottom:8,boxSizing:"border-box",outline:"none"}}/>
                  <textarea placeholder="Paste full page content — title, headings, body text, any FAQs..." value={page.content} onChange={e=>updatePage(i,"content",e.target.value)} rows={5}
                    style={{width:"100%",background:"#141414",border:"1px solid #272727",borderRadius:5,padding:"10px 13px",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#ede9e1",resize:"vertical",boxSizing:"border-box",outline:"none"}}/>
                </div>
              ))}
            </div>
          </div>
          <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3d3b38",marginBottom:24}}>Paste full page text — title, headings, body. Up to 5 pages for a site-wide audit.</p>
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <button onClick={runAudit} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#d4980a",color:"#0d0d0d",fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:500,padding:"13px 24px",borderRadius:7,border:"none",cursor:"pointer"}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#0d0d0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Run GEO Audit
            </button>
            <button onClick={loadPreview} style={{display:"inline-flex",alignItems:"center",gap:8,background:"none",color:"#6b6760",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,padding:"13px 20px",borderRadius:7,border:"1px solid #272727",cursor:"pointer"}}>
              Preview demo
            </button>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3d3b38"}}>Powered by OpenAI · ~20 sec</span>
          </div>
          {error&&<div style={{marginTop:14,padding:"12px 16px",border:"1px solid rgba(220,38,38,0.4)",borderRadius:6,background:"rgba(220,38,38,0.1)",color:"#fca5a5",fontFamily:"'IBM Plex Mono',monospace",fontSize:12}}>{error}</div>}
        </>
      )}
 
      {loading&&(
        <div style={{border:"1px solid #272727",borderRadius:8,padding:28,background:"#141414"}}>
          <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"#d4980a",margin:"0 0 20px"}}>Running audit</p>
          <ul style={{listStyle:"none",padding:0,margin:"0 0 24px"}}>
            {STEPS.map((step,i)=>{
              const st=i<stepIndex?"done":i===stepIndex?"active":"wait";
              return(<li key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0"}}>
                <span style={{width:6,height:6,borderRadius:"50%",flexShrink:0,display:"inline-block",background:st==="done"?"#a87a08":st==="active"?"#d4980a":"#272727"}}/>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:st==="active"?500:400,color:st==="done"?"#6b6760":st==="active"?"#ede9e1":"#3d3b38"}}>{step}</span>
              </li>);
            })}
          </ul>
          <div style={{height:1,background:"#272727",marginBottom:20}}/>
          {stepIndex>=0&&<>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:"#ede9e1",marginBottom:6,letterSpacing:"-0.01em"}}>{STEP_DETAILS[stepIndex]?.msg}</div>
            <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6b6760",letterSpacing:"0.04em"}}>{stepMsg||STEP_DETAILS[stepIndex]?.sub}</div>
          </>}
        </div>
      )}
 
      {results&&!loading&&(
        <div ref={resultsRef}>
          <ResultsView results={results} domain={domain} onReset={resetAudit} onDownload={downloadReport}/>
        </div>
      )}
 
      <style>{`input::placeholder,textarea::placeholder{color:#3d3b38;}input:focus,textarea:focus{border-color:#333!important;}`}</style>
    </div>
  );
}