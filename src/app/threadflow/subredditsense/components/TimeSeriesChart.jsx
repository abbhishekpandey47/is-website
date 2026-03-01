"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function TimeSeriesChart({ data }) {
  if (!Array.isArray(data) || !data.length) return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
      <p className="text-[13px] text-[rgba(255,255,255,0.4)]">No time series data yet.</p>
    </div>
  );

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed]">Mentions Over Time</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Daily counts (posts vs comments)</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tsGradMentions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="tsGradPosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9382ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9382ff" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="tsGradComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.25)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.25)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} fontSize={11} allowDecimals={false} />
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
            <Area type="monotone" dataKey="mentions" stroke="#60a5fa" fill="url(#tsGradMentions)" strokeWidth={2} />
            <Area type="monotone" dataKey="posts" stroke="#9382ff" fill="url(#tsGradPosts)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="comments" stroke="#34d399" fill="url(#tsGradComments)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
