const Card = ({ tag, tag2, tag3, title, desc, content, accent = false, animate = false }) => (
  <div className="framer-1m69wd8 rounded-xl border border-[#222] p-0 flex flex-col min-h-[320px]" data-border="true" data-framer-name="AI development card">
    <div className="framer-rkp5az flex flex-col gap-0 p-6" data-framer-name="Name and description">
      <div className="framer-w2t2pq" data-framer-name="Top">
        <div className="framer-11r3gq6 mb-2" data-border="true" data-framer-name="Step 2">
          <p className="framer-text font-manrope text-xs font-medium text-white mb-1 tracking-tight" style={{letterSpacing: '-0.04em', lineHeight: '1em'}}>{tag}{tag2 && ` / ${tag2}`}{tag3 && ` / ${tag3}`}</p>
        </div>
        <div className="framer-tfbmo3" data-framer-component-type="RichTextContainer">
          <h3 className="framer-text font-manrope text-[1.45rem] font-medium text-white tracking-tight mb-1" style={{letterSpacing: '-0.02em'}}>{title}</h3>
        </div>
      </div>
      <div className="framer-cbc622 mt-2" data-framer-component-type="RichTextContainer">
        <p className="framer-text font-manrope text-[1rem] font-medium text-white/75 tracking-tight" style={{letterSpacing: '-0.02em', lineHeight: '1.4em'}}>{desc}</p>
      </div>
    </div>
    <div className="framer-1f0d4jv-container px-6 pb-6 mt-auto">
      <div className="framer-q5c7k framer-ahg0zj framer-v-ahg0zj w-full" data-framer-name="Code">
        <div className="framer-wslrjy border border-[#222] rounded-md bg-[#181818] p-3" data-border="true" data-framer-name="Interface" style={{borderStyle: 'solid', borderWidth: '1px'}}>
          {content}
        </div>
      </div>
    </div>
  </div>
);


const integrationCards = [
  {
    tag: "Technical Audit",
    title: "Site Integration",
    desc:
      "Our complete auditing tool integrates directly with your website. Identify and fix istructured data and rendering issues that prevent AI crawlers from properly understanding and referencing your site.",
    content: (
      <pre className="text-xs font-mono text-white/80 leading-tight" style={{background: 'none', margin: 0}}>
<span style={{color:'#9c6bff'}}>class </span>SchemaChecker<span style={{color:'rgba(255,255,255,0.7)'}}>:<br /></span>
    def <span style={{color:'#9c6bff'}}>__init__</span>(self, required_fields):<br />
        self.required_fields = required_fields<br />
        self.status = "pending"<br />
<br />
    def <span style={{color:'#9c6bff'}}>check_schema</span>(self, data):<br />
        missing_fields = []<br />
        for field in self.required_fields:<br />
            if field not in data or data[field] is None:<br />
                missing_fields.append(field)<br />
        if missing_fields:<br />
            self.status = "invalid"<br />
            return "Schema validation failed! Missing:<br />
        else:<br />
            self.status = "valid"<br />
            return "Schema validation passed!"<br />
<br />
    def <span style={{color:'#9c6bff'}}>get_status</span>(self):<br />
        return "Status: " + self.status<br />
      </pre>
    ),
    accent: true,
    animate: true,
  },
  {
    tag: "GSC",
    tag2: "GA4",
    title: "Analytics Integration",
    desc:
      "Connect Google Analytics 4 and Google Search Console to correlate AI search performance with actual traffic and conversion metrics, providing complete visibility into AI optimization ROI.",
    content: (
      <div className="flex flex-row gap-4 items-end mt-2">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-[#222] opacity-30 blur-[6px] animate-pulse" />
          <div className="relative z-10 w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center">
            <span className="text-xs text-white/90 font-semibold">Workspace</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-white/90">Azoma</span>
        </div>
      </div>
    ),
    accent: true,
    animate: true,
  },
  {
    tag: "Slack",
    tag2: "Teams",
    title: "Workspace Integration",
    desc:
      "Receive AI search insights, performance alerts, and competitive intelligence directly in your team's Slack or Microsoft Teams channels, keeping everyone aligned on your AI visibility strategy.",
    content: (
      <div className="flex flex-row gap-4 items-end mt-2">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full opacity-30 blur-[6px] animate-pulse bg-[#222]" />
          <div className="relative z-10 w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center">
            <span className="text-xs text-white/90 font-semibold">Azoma</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-white/90">Workspace</span>
        </div>
      </div>
    ),
    accent: true,
    animate: true,
  },
  {
    tag: "Amazon",
    tag2: "Shopify",
    tag3: "Walmart",
    title: "Ecommerce Platform Integration",
    desc:
      "Connect directly to your ecommerce stack and PIM systems with secure API access, enabling seamless product data synchronization and automated GEO optimization workflows.",
    content: (
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-white/90 font-semibold">Shopify</span>
            <span className="text-[10px] text-white/80">Syncing 212 sku's</span>
          </div>
          <div className="w-8 h-8 rounded bg-[#222] flex items-center justify-center rotate-[275deg]">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.9A12,12,0,1,1,93,50.91C63.24,64.57,44,94.83,44,128a84,84,0,0,0,168,0c0-33.17-19.24-63.43-49-77.09A12,12,0,1,1,173,29.1C211.27,46.66,236,85.48,236,128Z" fill="#222"/></svg>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-white/90 font-semibold">Amazon Rufus</span>
            <span className="text-[10px] text-white/80">212 sku's - 27 recommendations</span>
            <span className="text-[13px] font-bold text-white">75%</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-white/90 font-semibold">Walmart Sparky</span>
            <span className="text-[10px] text-white/80">57 sku's - optimized</span>
            <span className="text-[13px] font-bold text-white">92%</span>
          </div>
        </div>
      </div>
    ),
    accent: true,
    animate: true,
  },
];

const IntegrationSection = () => {
  return (
    <section className="w-full py-24 px-4 md:px-0 flex flex-col items-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <span className="px-4 py-1 rounded-full border border-[#222] text-xs font-medium text-white/80 mb-6">Integrations</span>
        <h2 className="text-center text-white font-manrope text-[2.5rem] md:text-[3rem] font-medium leading-[1.1] tracking-tight mb-4">Seamless Integration,<br className="hidden md:block" /> Maximum Impact</h2>
        <p className="text-center text-white/75 font-manrope text-lg font-medium max-w-2xl mb-12">Connect Azoma to your existing technology stack through key integration points. Our platform enhances your current workflows while delivering enterprise-scale AI search optimization.</p>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-4">
        {integrationCards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
};

export default IntegrationSection;