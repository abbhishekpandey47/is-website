"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function EngagementFunnelAPI({ data }) {
  const funnelData = Array.isArray(data) ? data : [];
  if (!funnelData.length) return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
      <p className="text-[13px] text-[rgba(255,255,255,0.4)]">No engagement funnel data yet.</p>
    </div>
  );

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed]">Engagement Funnel</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Mentions &rarr; upvotes &rarr; discussion</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnelData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              type="number"
              stroke="rgba(255,255,255,0.25)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              fontSize={11}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="stage"
              stroke="rgba(255,255,255,0.25)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              fontSize={11}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '7px',
                color: '#ededed',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" fill="#60a5fa" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {funnelData.map(stage => (
          <div key={stage.stage} className="text-center">
            <div className="h-1.5 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full"
                style={{ width: `${stage.percentage}%`, backgroundColor: '#9382ff' }}
              />
            </div>
            <div className="text-[13px] font-semibold text-[#ededed] tabular-nums">{stage.count}</div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)]">{stage.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
