
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
    className="py-2 pb-24 md:py-4 md:pb-32"
  >
     <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                        See Exactly Where Your Brand{' '}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>Lives</span> on Reddit
                    </h2>

                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
Every mention, every thread, and every competitor continuously tracked, measured, and turned into actionable Reddit intelligence.
                    </p>
                </div>
            </div>
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[52px]">
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
        }}
        className="grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16 lg:gap-[64px]"
      >
     

        {/* LEFT COLUMN — copy */}
        <div>

          {/* Body */}
          <p
            style={{
              fontSize: 15,
              color: 'white',
              lineHeight: 1.85,
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            SubredditSense is our proprietary brand intelligence tool. It tracks every mention of
            your brand across Reddit, maps which communities are most active, identifies topic
            clusters, and measures sentiment updated continuously.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {detailItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 14,
                  color: 'white',
                  lineHeight: 1.6,
                  padding: '12px 16px',
                  background: 'rgba(15,14,30,0.75)',
                  border: '1px solid rgba(139,124,232,0.2)',
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    color: '#8B7CE8',
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
       
        </div>

        {/* RIGHT COLUMN — dashboard mock */}
        <div>
          <div
            className="rounded-xl overflow-hidden"
           
          >
            {/* Screenshot */}
            <Image
              src="/reddit/subredditSense.svg"
              alt="SubredditSense dashboard mockup"
              width={640}
              height={580}
              style={{ display: 'block', width: '100%', height: 'auto'}}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SubredditSense;
