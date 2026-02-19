
import React from 'react';

const icpTags = [
  { label: 'E-commerce Founders', primary: true },
  { label: 'D2C Operators', primary: true },
  { label: 'SaaS Founders', primary: true },
  { label: 'Backend Developers', primary: false },
  { label: 'Indie Builders', primary: false },
];

const prompts = [
  'Best payment gateway in India',
  'Fastest settlement gateway ranking',
  'Best payment gateway for SaaS India',
  'Most reliable gateway fewer account freezes',
];

const subreddits = [
  { label: 'r/IndianStartups', primary: true },
  { label: 'r/developersIndia', primary: true },
  { label: 'r/microsaas', primary: true },
  { label: 'r/EntrepreneurIndia', primary: false },
  { label: 'r/ecommerce', primary: false },
];

const kpiRows = [
  { metric: 'Threads engaged',       m1: '35',       m2: '40–60',      m3: '45–50'  },
  { metric: 'Google ranking threads', m1: 'Baseline', m2: '2–3 threads', m3: '5+ threads' },
  { metric: 'LLM prompt mentions',   m1: 'Minimal',  m2: '2 of 5',     m3: 'All 5'  },
  { metric: 'Sentiment (positive)',  m1: '40%',      m2: '~50%',       m3: '55%+'   },
];

const detailItems = [
  'Competitor visibility ratio analysis (Razorpay 55% / Cashfree 30% / PayU 15%)',
  'Sentiment baseline: 40% positive / 60% negative with root cause mapping',
  'Month 1–3 KPI forecast with specific metric targets',
  'Named subreddits, named thread types, named prompts',
];

/* ─── shared token shortcuts ─────────────────────────────────────── */
const P = '#877aeb';          // primary purple accent
const P_DIM = 'rgba(135,122,235,0.45)';
const P_BG  = 'rgba(135,122,235,0.07)';
const P_BDR = 'rgba(135,122,235,0.22)';
const MUTED  = 'rgba(255,255,255,0.45)';
const MUTED2 = 'rgba(255,255,255,0.22)';
const TEXT   = '#e8e9ed';
const GREEN  = '#22c55e';
const BORDER = 'rgba(255,255,255,0.07)';

/* ─── sub-components ─────────────────────────────────────────────── */
function SecTitle({ children }) {
  return (
    <div
      style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: 9,
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        color: P,
        marginBottom: 10,
        paddingBottom: 8,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      // {children}
    </div>
  );
}

function ProposalDoc() {
  return (
    <div
      style={{
        background: '#09080f',
        border: `1px solid ${P_BDR}`,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: `0 8px 64px rgba(129,89,220,0.12), 0 0 0 1px rgba(135,122,235,0.08)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#0f0d1c',
          borderBottom: `1px solid ${BORDER}`,
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            letterSpacing: '.06em',
            color: MUTED,
          }}
        >
          Reddit Strategy Proposal — Razorpay
        </span>
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 9,
            padding: '3px 10px',
            background: P_BG,
            color: P,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            borderRadius: 3,
            border: `1px solid ${P_BDR}`,
            whiteSpace: 'nowrap',
          }}
        >
          Confidential
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 22px 18px' }}>

        {/* ICP Targeting */}
        <div style={{ marginBottom: 20 }}>
          <SecTitle>ICP Targeting</SecTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {icpTags.map(({ label, primary }) => (
              <span
                key={label}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  padding: '4px 10px',
                  border: primary ? `1px solid ${P_BDR}` : `1px solid ${MUTED2}`,
                  background: primary ? P_BG : 'rgba(255,255,255,0.04)',
                  color: primary ? 'rgba(135,122,235,0.85)' : MUTED,
                  borderRadius: 3,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div style={{ marginBottom: 20 }}>
          <SecTitle>Prompts to Target</SecTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {prompts.map((p) => (
              <div
                key={p}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '7px 10px',
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${BORDER}`,
                  borderRadius: 4,
                }}
              >
                <span style={{ color: P, fontSize: 10, flexShrink: 0 }}>▸</span>
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10.5,
                    color: MUTED,
                  }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subreddits */}
        <div style={{ marginBottom: 20 }}>
          <SecTitle>Primary Subreddits</SecTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {subreddits.map(({ label, primary }) => (
              <span
                key={label}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  padding: '4px 10px',
                  background: primary ? P_BG : 'rgba(255,255,255,0.04)',
                  border: primary ? `1px solid ${P_BDR}` : `1px solid ${MUTED2}`,
                  color: primary ? 'rgba(135,122,235,0.8)' : MUTED2,
                  borderRadius: 3,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* KPI Table */}
        <div>
          <SecTitle>KPI Forecast</SecTitle>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Metric', 'M1', 'M2', 'M3'].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 9,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: MUTED2,
                      textAlign: 'left',
                      padding: '5px 8px',
                      borderBottom: `1px solid ${BORDER}`,
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kpiRows.map(({ metric, m1, m2, m3 }) => (
                <tr key={metric}>
                  <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 10.5, color: MUTED,  padding: '7px 8px', borderBottom: `1px solid rgba(255,255,255,0.035)` }}>{metric}</td>
                  <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 10.5, color: MUTED2, padding: '7px 8px', borderBottom: `1px solid rgba(255,255,255,0.035)` }}>{m1}</td>
                  <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 10.5, color: P_DIM,  padding: '7px 8px', borderBottom: `1px solid rgba(255,255,255,0.035)` }}>{m2}</td>
                  <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 10.5, color: GREEN,  padding: '7px 8px', borderBottom: `1px solid rgba(255,255,255,0.035)` }}>{m3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── main export ────────────────────────────────────────────────── */
export default function ProposalShowcase() {
  return (
    <section
      className="py-20 md:py-28"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-[52px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">

          {/* LEFT — copy */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 10,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                color: P,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
              }}
            >
              <span style={{ color: P_DIM }}>//</span>
              The Deliverable
            </div>

            {/* Heading */}
            <h2
              className="quicksand-bold"
              style={{
                fontSize: 'clamp(30px, 3.5vw, 54px)',
                lineHeight: 1.1,
                color: '#fff',
                margin: 0,
              }}
            >
              Proposals That Read Like{' '}
              <em style={{ fontStyle: 'italic', color: P }}>Research Reports.</em>
            </h2>

            {/* Body copy */}
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, marginTop: 22, marginBottom: 0 }}>
              Every client engagement starts with a deep Reddit audit — competitor share of voice,
              sentiment distribution, thread analysis, and a month-by-month KPI forecast.{' '}
              <span style={{ color: 'rgba(232,233,237,0.62)' }}>
                This isn&apos;t a pitch deck. It&apos;s an intelligence report.
              </span>
            </p>

            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, marginTop: 16, marginBottom: 0 }}>
              We studied Reddit&apos;s entire payment gateway conversation before a single comment
              was written for Razorpay. We know Cashfree has 30% share of voice. We know PayU skews
              enterprise. We know exactly which threads are making decisions.
            </p>

            {/* Detail list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 24 }}>
              {detailItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontSize: 13,
                    color: MUTED,
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    style={{
                      color: P,
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 11,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    →
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — document mockup */}
          <ProposalDoc />
        </div>
      </div>
    </section>
  );
}
