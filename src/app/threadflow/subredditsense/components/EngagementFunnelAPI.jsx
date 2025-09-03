"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function EngagementFunnelAPI({ data }) {
  const funnelData = Array.isArray(data)? data : [];
  if (!funnelData.length) return (
    <div className="p-4 rounded-md border border-border bg-card">
      <p className="text-sm text-muted-foreground">No engagement funnel data yet.</p>
    </div>
  );
  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Engagement Funnel</h2>
          <p className="text-xs text-muted-foreground">Mentions → upvotes → discussion</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnelData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--foreground-muted))" fontSize={12} allowDecimals={false} />
            <YAxis type="category" dataKey="stage" stroke="hsl(var(--foreground-muted))" fontSize={11} width={90} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
            <Bar dataKey="count" fill="hsl(var(--chart-primary))" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {funnelData.map(stage => (
          <div key={stage.stage} className="text-center">
            <div className="h-2 bg-surface rounded-full overflow-hidden mb-2"><div className="h-full" style={{width:`${stage.percentage}%`, backgroundColor:'hsl(var(--chart-secondary))'}} /></div>
            <div className="text-sm font-medium">{stage.count}</div>
            <div className="text-xs text-muted-foreground">{stage.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
