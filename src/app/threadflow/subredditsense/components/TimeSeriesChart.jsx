"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function TimeSeriesChart({ data }) {
  if (!Array.isArray(data) || !data.length) return (
    <div className="p-4 rounded-md border border-border bg-card">
      <p className="text-sm text-muted-foreground">No time series data yet.</p>
    </div>
  );
  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Mentions Over Time</h2>
          <p className="text-xs text-muted-foreground">Daily counts (posts vs comments)</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--foreground-muted))" fontSize={12} />
            <YAxis stroke="hsl(var(--foreground-muted))" fontSize={12} allowDecimals={false} />
            <Tooltip   contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
            <Area type="monotone" dataKey="mentions" stroke="hsl(var(--chart-primary))" fill="hsl(var(--chart-primary) / 0.25)" strokeWidth={2} />
            <Area type="monotone" dataKey="posts" stroke="hsl(var(--chart-secondary))" fill="hsl(var(--chart-secondary) / 0.2)" strokeWidth={2} />
            <Area type="monotone" dataKey="comments" stroke="hsl(var(--chart-tertiary))" fill="hsl(var(--chart-tertiary) / 0.2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
