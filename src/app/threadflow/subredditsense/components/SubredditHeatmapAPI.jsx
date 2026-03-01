"use client";

const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8'];

export default function SubredditHeatmapAPI({ data }) {
  const heatmapData = Array.isArray(data) ? data : [];
  if (!heatmapData.length) return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
      <p className="text-[13px] text-[rgba(255,255,255,0.4)]">No heatmap data yet.</p>
    </div>
  );

  const getIntensityColor = (value) => {
    const intensity = Math.min(value / 50, 1);
    return `rgba(96, 165, 250, ${0.1 + intensity * 0.8})`;
  };

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed]">Subreddit Activity Heatmap</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Mention volume across communities</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.4)]">
          <span>Low</span>
          <div className="flex gap-0.5">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map(o => (
              <div
                key={o}
                className="w-3 h-3 rounded-sm border border-[rgba(255,255,255,0.04)]"
                style={{ backgroundColor: `rgba(96, 165, 250, ${o * 0.8 + 0.1})` }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex mb-2">
            <div className="w-32" />
            {weeks.map(w => (
              <div key={w} className="flex-1 text-center text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">{w}</div>
            ))}
          </div>
          {heatmapData.map(row => (
            <div key={row.subreddit} className="flex items-center mb-1">
              <div className="w-32 text-[13px] text-[rgba(255,255,255,0.6)] font-medium truncate pr-3">{row.subreddit}</div>
              <div className="flex flex-1 gap-1">
                {row.data.map(cell => (
                  <div
                    key={cell.week}
                    className="flex-1 h-7 rounded-[5px] border border-[rgba(255,255,255,0.04)] cursor-pointer flex items-center justify-center text-[10px] font-semibold hover:scale-105 transition-all duration-150"
                    style={{ backgroundColor: getIntensityColor(cell.value), color: cell.value > 30 ? '#ededed' : 'transparent' }}
                    title={`${row.subreddit} - ${cell.week}: ${cell.value} mentions, engagement ${cell.engagement}`}
                  >
                    {cell.value > 30 ? cell.value : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
