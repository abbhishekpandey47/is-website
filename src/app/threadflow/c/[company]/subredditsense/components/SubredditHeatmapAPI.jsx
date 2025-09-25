"use client";

const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8'];

export default function SubredditHeatmapAPI({ data }) {
  const heatmapData = Array.isArray(data)? data : [];
  if (!heatmapData.length) return (
    <div className="p-4 rounded-md border border-border bg-card">
      <p className="text-sm text-muted-foreground">No heatmap data yet.</p>
    </div>
  );
  const getIntensityColor = (value) => {
    const intensity = Math.min(value / 50, 1);
    return `hsl(var(--reddit-orange) / ${0.1 + intensity * 0.8})`;
  };
  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Subreddit Activity Heatmap</h2>
          <p className="text-xs text-muted-foreground">Mention volume across communities</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-foreground-muted">
          <span>Low</span>
          <div className="flex space-x-1">{[0.2,0.4,0.6,0.8,1.0].map(o => <div key={o} className="w-3 h-3 rounded-sm border border-border-muted" style={{backgroundColor:`hsl(var(--reddit-orange) / ${o*0.8+0.1})`}} />)}</div>
          <span>High</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex mb-2">
            <div className="w-32"></div>
            {weeks.map(w => <div key={w} className="flex-1 text-center text-xs text-muted-foreground font-medium">{w}</div>)}
          </div>
          {heatmapData.map(row => (
            <div key={row.subreddit} className="flex items-center mb-1">
              <div className="w-32 text-xs text-muted-foreground font-medium truncate pr-3">{row.subreddit}</div>
              <div className="flex flex-1 space-x-1">
                {row.data.map(cell => (
                  <div key={cell.week} className="flex-1 h-8 rounded border border-border-muted cursor-pointer flex items-center justify-center text-[10px] font-medium" style={{backgroundColor:getIntensityColor(cell.value)}} title={`${row.subreddit} - ${cell.week}: ${cell.value} mentions, engagement ${cell.engagement}`}>{cell.value>30?cell.value:''}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
