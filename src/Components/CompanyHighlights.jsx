"use client";

import { useEffect, useRef, useState } from "react";

const withProtocol = (url) => {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.toString();
  } catch {
    return `https://${url.replace(/^https?:\/\//, "")}`;
  }
};

const Field = ({ label, value, isLink = false }) => {
  if (!value) return null;
  return (
    <div className="mb-4 md:mb-5 last:mb-0">
      <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1.5 md:mb-2" style={{ letterSpacing: '0.05em' }}>
        {label}
      </div>
      {isLink ? (
        <a
          href={withProtocol(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base text-[#E5E7EB] hover:text-white hover:underline leading-normal transition-colors block truncate"
          title={value.replace(/^https?:\/\//, "")}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value.replace(/^https?:\/\//, "")}
        </a>
      ) : (
        <div className="text-base text-[#E5E7EB] break-words leading-normal">{value}</div>
      )}
    </div>
  );
};

export default function CompanyHighlights({ highlights, fallbackTitle = null }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { rootMargin: "-40px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // If no highlights data, still render card structure with fallback title
  if (!highlights || typeof highlights !== "object") {
    if (!fallbackTitle) return null;
    
    return (
      <aside
        ref={ref}
        className={`bg-[#0E0E17] rounded-xl md:rounded-2xl border border-white/8 shadow-sm w-full transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(14,14,23,1) 2%)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)',
          paddingTop: 'clamp(1.25rem, 1.5vw + 0.75rem, 1.75rem)',
          paddingBottom: 'clamp(1.25rem, 1.5vw + 0.75rem, 1.75rem)',
          paddingLeft: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',
          paddingRight: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white leading-tight" style={{ fontSize: 'clamp(1.125rem, 1.2vw + 0.875rem, 1.375rem)' }}>
            {fallbackTitle}
          </h3>
        </div>
      </aside>
    );
  }

  const {
    company,
    headquarters,
    funding,
    industry,
    employees,
    cloud,
    website,
  } = highlights;

  const anyField =
    company ||
    headquarters ||
    funding ||
    industry ||
    employees ||
    cloud ||
    website;

  // If no fields but we have a company name, still show the card
  if (!anyField && !company) return null;

  return (
    <aside
      ref={ref}
      className={`bg-[#0E0E17] rounded-xl md:rounded-2xl border border-white/8 shadow-sm w-full transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(14,14,23,1) 2%)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)',
        paddingTop: 'clamp(1.25rem, 1.5vw + 0.75rem, 1.75rem)',
        paddingBottom: 'clamp(1.25rem, 1.5vw + 0.75rem, 1.75rem)',
        paddingLeft: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',
        paddingRight: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Company Name */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white leading-tight" style={{ fontSize: 'clamp(1.125rem, 1.2vw + 0.875rem, 1.375rem)' }}>
          {company}
        </h3>
      </div>
      
      {/* Fields */}
      <div>
        {website && <Field label="Website" value={website} isLink />}
        {headquarters && <Field label="Headquarters" value={headquarters} />}
        {funding && <Field label="Funding" value={funding} />}
        {industry && <Field label="Industry" value={industry} />}
        {employees && <Field label="Employees" value={employees} />}
        {cloud && <Field label="Scope" value={cloud} />}
      </div>
    </aside>
  );
}


