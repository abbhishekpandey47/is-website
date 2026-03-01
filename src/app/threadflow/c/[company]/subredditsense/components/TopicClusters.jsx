"use client";

export default function TopicClusters({ data }) {
  const clusters = Array.isArray(data) ? data : [];
  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed]">Topic Clusters</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">High-frequency themes</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {clusters.length === 0 && (
          <p className="text-[13px] text-[rgba(255,255,255,0.25)] col-span-full">No clusters computed yet.</p>
        )}
        {clusters.map(c => (
          <div
            key={c.cluster_key}
            className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-1.5 hover:border-[rgba(255,255,255,0.12)] transition-colors"
          >
            <div className="text-[13px] font-medium text-[#ededed]">{c.representative_phrase}</div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)] flex gap-3">
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#60a5fa]" />
                {c.mentions_count} mentions
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                {c.avg_engagement} avg eng
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
