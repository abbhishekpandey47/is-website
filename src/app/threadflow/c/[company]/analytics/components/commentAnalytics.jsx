import { ArrowUp, Clock, ExternalLink, MessageSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import session from "@/app/tools/utils/session";

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case "positive": return "text-[#34d399] border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.08)]";
    case "negative": return "text-[#f87171] border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.08)]";
    default: return "text-[rgba(255,255,255,0.4)] border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]";
  }
};

export default function CommentsAnalyticsTable({ threads = [], initialCount = 10 }) {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    session.set("comments", threads);
  }, [threads]);

  const visibleThreads = useMemo(
    () => (showAll ? threads : threads.slice(0, initialCount)),
    [showAll, threads, initialCount]
  );

  const canExpand = threads.length > initialCount;

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] animate-fade-up">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <h2 className="text-[16px] font-semibold text-[#ededed]">Comments Analytics</h2>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left py-3 px-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Comments</th>
                <th className="text-left py-3 px-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Community</th>
                <th className="text-left py-3 px-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Engagement</th>
                <th className="text-left py-3 px-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Sentiment</th>
                <th className="text-left py-3 px-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleThreads.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-[13px] text-[rgba(255,255,255,0.4)]">No Comments available.</td></tr>
              ) : (
                visibleThreads.map((thread, idx) => (
                  <tr key={thread.id ?? idx} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-2">
                      <div className="max-w-sm">
                        <h3 className="font-medium text-[13px] text-[#ededed] mb-1 truncate">{thread.title}</h3>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-[#60a5fa] font-medium text-[13px]">{thread.subreddit}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3 text-[13px] text-[rgba(255,255,255,0.6)]">
                        <div className="flex items-center"><ArrowUp className="w-3 h-3 mr-1" /><span>{thread.upvotes}</span></div>
                        <div className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /><span>{thread.comments}</span></div>
                        <div className="flex items-center text-[rgba(255,255,255,0.4)]"><Clock className="w-3 h-3 mr-1" /><span>{thread.age}</span></div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-md text-[11px] font-medium border ${getSentimentColor(thread.sentiment)}`}>{thread.sentiment}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <a href={thread.post_url} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center justify-center w-7 h-7 rounded-[7px] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(96,165,250,0.1)] transition-colors"
                           title="Open comment">
                          <ExternalLink className="w-3.5 h-3.5 text-[#60a5fa]" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {canExpand && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Showing {visibleThreads.length} of {threads.length}</p>
            <button
              type="button"
              onClick={() => setShowAll(v => !v)}
              className="px-3 py-1.5 rounded-[7px] text-[13px] font-medium border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              aria-expanded={showAll}
              aria-label={showAll ? "Show less comments" : "Show all comments"}
            >
              {showAll ? "Show less" : `Show all (${threads.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
