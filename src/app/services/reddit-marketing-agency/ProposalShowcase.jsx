
import React from 'react';
import Image from 'next/image';
import ContactPopupButton from '@/app/lp/reddit-marketing-agency/ContactPopupButton';

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
const MUTED  = 'white';
const TEXT   = 'white';

export default function ProposalShowcase() {
  return (
    <section
      className="py-8 md:py-12 relative"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(139,124,232,0.03) 50%, transparent 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-4">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                       Proposals That Read Like{' '}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Research Reports</span>
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[80%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        From competitor share of voice to KPI forecasts, every proposal is built like an intelligence brief, not a marketing pitch.
                    </p>
                </div>
            </div>
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

      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-[52px]">
        <div
          style={{
            display: 'grid',
            alignItems: 'center',
          }}
          className="grid-cols-1 gap-5 md:grid-cols-[1fr_1.2fr] md:gap-8 lg:gap-[32px]"
        >

          {/* LEFT COLUMN — copy */}
          <div style={{height: '100%'}}>
          
            {/* Body copy */}
            <p style={{
              fontSize: 16,
              color: MUTED,
              lineHeight: 1.8,
              marginTop: 24,
              marginBottom: 0
            }}>
              Every client engagement starts with a deep Reddit audit competitor share of voice,
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
              gap: 8,
              marginTop: 28,
            }}>
              {detailItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 14,
                    color: MUTED,
                    lineHeight: 1.6,
                    padding: '12px 16px',
                    background: 'rgba(15,14,30,0.75)',
                    border: `1px solid rgba(139,124,232,0.2)`,
                    borderRadius: 10,
                  }}
                >
                  <span
                    style={{
                      color: P,
                      fontSize: 14,
                      flexShrink: 0,
                      fontWeight: 600,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8">
               <ContactPopupButton
                buttonText="Get your free Proposal"
                width="w-52"
                height="h-11"
                textSize="text-sm"
                textWeight="quicksand-semibold"
                thankYouPath="/lp/reddit-marketing-agency/thankyou"
              />
              </div>
          </div>

            {/* RIGHT COLUMN — dashboard mock */}
                  <div>
                    <div
                      className="rounded-xl overflow-hidden"
                    >
                      {/* Screenshot */}
                      <Image
                        src="/reddit/report.svg"
                        alt="SubredditSense dashboard mockup"
                        width={640}
                        height={580}
                        style={{ display: 'block', width: '100%', height: 'auto' }}
                        priority
                      />
                    </div>
                  </div>
        </div>
      </div>
    </section>
  );
}
