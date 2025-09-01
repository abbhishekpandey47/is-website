"use client";

export default function TopicClusters({ data }) {
  const clusters = Array.isArray(data)? data : [];
  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Topic Clusters</h2>
          <p className="text-xs text-muted-foreground">High-frequency themes</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {clusters.length === 0 && <p className="text-sm text-muted-foreground col-span-full">No clusters computed yet.</p>}
        {clusters.map(c => (
          <div key={c.cluster_key} className="p-3 rounded-md border border-border bg-card flex flex-col gap-1">
            <div className="text-sm font-medium">{c.representative_phrase}</div>
            <div className="text-[11px] text-muted-foreground flex gap-3"> <span>{c.mentions_count} mentions</span> <span>{c.avg_engagement} avg eng</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
