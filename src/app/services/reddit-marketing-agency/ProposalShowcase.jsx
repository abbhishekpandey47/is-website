
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
  { metric: 'Threads engaged',       m1: '35',       m2: '40–60',      m3: '45–50', highlight: 'green' },
  { metric: 'Google ranking threads', m1: 'Baseline', m2: '2–3 threads', m3: '5+ threads', highlight: 'green' },
  { metric: 'LLM prompt mentions',   m1: 'Minimal',  m2: '2 of 5',     m3: 'All 5', highlight: 'green' },
  { metric: 'Sentiment (positive)',  m1: '40%',      m2: '~50%',       m3: '55%+', highlight: 'green' },
];

const detailItems = [
  'Competitor visibility ratio analysis (Razorpay 55% / Cashfree 30% / PayU 15%)',
  'Sentiment baseline: 40% positive / 60% negative with root cause mapping',
  'Month 1–3 KPI forecast with specific metric targets',
  'Named subreddits, named thread types, named prompts',
];

/* ─── shared token shortcuts ─────────────────────────────────────── */
const P = '#8B7CE8';          // primary purple accent (lighter for better visibility)
const P_DIM = 'rgba(139,124,232,0.45)';
const P_BG  = 'rgba(139,124,232,0.08)';
const P_BDR = 'rgba(139,124,232,0.25)';
const MUTED  = 'rgba(255,255,255,0.55)';
const MUTED2 = 'rgba(255,255,255,0.35)';
const TEXT   = '#f0f1f5';
const GREEN  = '#22c55e';
const BORDER = 'rgba(255,255,255,0.08)';

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
        background: 'linear-gradient(180deg, #0a0914 0%, #0f0d1c 100%)',
        border: `1px solid ${P_BDR}`,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: `0 20px 80px rgba(139,124,232,0.15), 0 0 0 1px rgba(139,124,232,0.1)`,
        position: 'relative',
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: `radial-gradient(ellipse at top center, ${P_BG} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          background: 'rgba(15,13,28,0.6)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${BORDER}`,
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          position: 'relative',
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
            padding: '4px 12px',
            background: `linear-gradient(135deg, ${P_BG}, rgba(139,124,232,0.12))`,
            color: P,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            borderRadius: 4,
            border: `1px solid ${P_BDR}`,
            whiteSpace: 'nowrap',
            boxShadow: `0 2px 8px rgba(139,124,232,0.2)`,
          }}
        >
          Confidential
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '26px 26px 22px', position: 'relative' }}>

        {/* ICP Targeting */}
        <div style={{ marginBottom: 24 }}>
          <SecTitle>ICP Targeting</SecTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {icpTags.map(({ label, primary }) => (
              <span
                key={label}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  padding: '5px 12px',
                  border: primary ? `1px solid ${P_BDR}` : `1px solid ${MUTED2}`,
                  background: primary ? `linear-gradient(135deg, ${P_BG}, rgba(139,124,232,0.05))` : 'rgba(255,255,255,0.03)',
                  color: primary ? P : MUTED,
                  borderRadius: 4,
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div style={{ marginBottom: 24 }}>
          <SecTitle>Prompts to Target</SecTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {prompts.map((p) => (
              <div
                key={p}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))',
                  border: `1px solid ${BORDER}`,
                  borderRadius: 6,
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ color: P, fontSize: 11, flexShrink: 0 }}>▸</span>
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 11,
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
        <div style={{ marginBottom: 24 }}>
          <SecTitle>Primary Subreddits</SecTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {subreddits.map(({ label, primary }) => (
              <span
                key={label}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  padding: '5px 12px',
                  background: primary ? `linear-gradient(135deg, ${P_BG}, rgba(139,124,232,0.05))` : 'rgba(255,255,255,0.03)',
                  border: primary ? `1px solid ${P_BDR}` : `1px solid ${MUTED2}`,
                  color: primary ? P : MUTED2,
                  borderRadius: 4,
                  transition: 'all 0.2s ease',
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
          <div style={{
            background: 'rgba(255,255,255,0.015)',
            borderRadius: 6,
            overflow: 'hidden',
            border: `1px solid ${BORDER}`
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(139,124,232,0.05)' }}>
                  {['Metric', 'M1', 'M2', 'M3'].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: 9,
                        letterSpacing: '.12em',
                        textTransform: 'uppercase',
                        color: h === 'Metric' ? P : MUTED2,
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderBottom: `1px solid ${BORDER}`,
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kpiRows.map(({ metric, m1, m2, m3, highlight }, idx) => (
                  <tr key={metric} style={{
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                  }}>
                    <td style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 11,
                      color: TEXT,
                      padding: '10px 12px',
                      borderBottom: idx < kpiRows.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none'
                    }}>{metric}</td>
                    <td style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 11,
                      color: MUTED2,
                      padding: '10px 12px',
                      borderBottom: idx < kpiRows.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none'
                    }}>{m1}</td>
                    <td style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 11,
                      color: P_DIM,
                      padding: '10px 12px',
                      borderBottom: idx < kpiRows.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none'
                    }}>{m2}</td>
                    <td style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 11,
                      color: highlight === 'green' ? GREEN : P,
                      padding: '10px 12px',
                      borderBottom: idx < kpiRows.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none',
                      fontWeight: 500,
                    }}>{m3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── main export ────────────────────────────────────────────────── */
export default function ProposalShowcase() {
  return (
    <section
      className="py-24 md:py-32 relative"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(139,124,232,0.03) 50%, transparent 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${P_BG} 0%, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[52px]">
        <div
          style={{
            display: 'grid',
            alignItems: 'start',
          }}
          className="grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16 lg:gap-[64px]"
        >

          {/* LEFT COLUMN — copy */}
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
                fontSize: 'clamp(32px, 3.8vw, 56px)',
                lineHeight: 1.15,
                color: '#fff',
                margin: 0,
                fontWeight: 700,
              }}
            >
              Proposals That Read Like{' '}
              <span style={{
                background: `linear-gradient(135deg, ${P}, #a591ff)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
              }}>
                Research Reports
              </span>
            </h2>

            {/* Body copy */}
            <p style={{
              fontSize: 16,
              color: MUTED,
              lineHeight: 1.8,
              marginTop: 24,
              marginBottom: 0
            }}>
              Every client engagement starts with a deep Reddit audit — competitor share of voice,
              sentiment distribution, thread analysis, and a month-by-month KPI forecast.{' '}
              <span style={{ color: TEXT, fontWeight: 500 }}>
                This isn&apos;t a pitch deck. It&apos;s an intelligence report.
              </span>
            </p>

            <p style={{
              fontSize: 16,
              color: MUTED,
              lineHeight: 1.8,
              marginTop: 18,
              marginBottom: 0
            }}>
              We studied Reddit&apos;s entire payment gateway conversation before a single comment
              was written for Razorpay. We know Cashfree has 30% share of voice. We know PayU skews
              enterprise. We know exactly which threads are making decisions.
            </p>

            {/* Detail list */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginTop: 28,
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(139,124,232,0.05), rgba(139,124,232,0.02))',
              border: `1px solid ${P_BDR}`,
              borderRadius: 8,
            }}>
              {detailItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    fontSize: 14,
                    color: MUTED,
                    lineHeight: 1.7,
                  }}
                >
                  <span
                    style={{
                      color: P,
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 12,
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

          {/* RIGHT COLUMN — document mockup */}
          <ProposalDoc />
        </div>
      </div>
    </section>
  );
}
