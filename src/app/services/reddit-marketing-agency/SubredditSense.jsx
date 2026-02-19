
import React from 'react';
import Image from 'next/image';

const detailItems = [
  'Total mention count with historical trend (7-day moving average)',
  'Subreddit activity heatmap — see where volume is concentrated by time period',
  'Topic cluster detection: what conversations are driving your mentions',
  'Positive sentiment tracking with estimated reach',
  'Competitor brand tracking in the same interface',
];

const SubredditSense = () => (
  <section
    className="py-20 md:py-28"
  >
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
              color: '#877aeb',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 24,
            }}
          >
            <span style={{ color: 'rgba(135,122,235,0.45)' }}>//</span>
            The Product — SubredditSense
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
            See Exactly Where Your Brand{' '}
            <em style={{ fontStyle: 'italic', color: '#877aeb' }}>Lives</em> on Reddit.
          </h2>

          {/* Body */}
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.85,
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            SubredditSense is our proprietary brand intelligence tool. It tracks every mention of
            your brand across Reddit, maps which communities are most active, identifies topic
            clusters, and measures sentiment — updated continuously.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {detailItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.48)',
                  lineHeight: 1.65,
                }}
              >
                <span
                  style={{
                    color: '#877aeb',
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

          {/* Client-access callout */}
          <div
            style={{
              marginTop: 32,
              padding: '18px 22px',
              border: '1px solid rgba(135,122,235,0.2)',
              background: 'rgba(135,122,235,0.04)',
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 9,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: '#877aeb',
                marginBottom: 8,
              }}
            >
              Client access included
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>
              Every client gets access to their own SubredditSense dashboard. You see every mention,
              every heatmap, every topic cluster — not a monthly PDF summary, but live data.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — dashboard mock */}
        <div>
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: '#090c14',
              border: '1px solid rgba(135,122,235,0.22)',
              boxShadow:
                '0 8px 64px rgba(129,89,220,0.12), 0 0 0 1px rgba(135,122,235,0.08), 0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            {/* Screenshot */}
            <Image
              src="/reddit/subredditSense.webp"
              alt="SubredditSense dashboard mockup"
              width={640}
              height={580}
              style={{ display: 'block', width: '100%', height: 'auto', background: '#090c14' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SubredditSense;
