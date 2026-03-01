"use client";

import { ArrowUp, Clock, ExternalLink, MessageSquare } from "lucide-react";

function getAgeString(postAgeHours) {
  if (!postAgeHours && postAgeHours !== 0) return '';
  if (postAgeHours < 24) return `${Math.round(postAgeHours)}h`;
  if (postAgeHours < 24 * 7) return `${Math.round(postAgeHours / 24)}d`;
  return `${Math.round(postAgeHours / (24 * 7))}w`;
}

function getSentiment(upvotes) {
  if (typeof upvotes !== 'number') return 'neutral';
  if (upvotes > 0) return 'positive';
  if (upvotes < 0) return 'negative';
  return 'neutral';
}

const TopThreadsTable = (props) => {
  let threads = [];
  if (props.data && props.data.posts) {
    threads = props.data.posts
      .map((p, idx) => ({
        id: idx,
        title: p.post_title,
        subreddit: p.subreddit,
        author: p.author || '',
        karma: p.karma || '',
        upvotes: p.upvotes || 0,
        comments: p.total_comments || 0,
        age: getAgeString(p.post_age_hours),
        matchReason: '',
        sentiment: getSentiment(p.upvotes || 0),
        priority: (p.upvotes || 0) > 10 ? 'high' : 'medium',
        post_url: p.post_url || '',
      }))
      .sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments))
      .slice(0, 10);
  } else if (props.threads && Array.isArray(props.threads)) {
    threads = props.threads;
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.08)] text-[#34d399]";
      case "negative":
        return "border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.08)] text-[#f87171]";
      default:
        return "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.4)]";
    }
  };

  const thClass = "text-left py-3 px-3 text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium";

  if (!threads.length) {
    return (
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] overflow-hidden animate-fade-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <div>
            <h2 className="text-[16px] font-semibold text-[#ededed]">Top Threads Leaderboard</h2>
            <p className="text-[13px] text-[rgba(255,255,255,0.4)]">High-priority threads requiring attention</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <th className={thClass}>Thread</th>
                <th className={thClass}>Community</th>
                <th className={thClass}>Author</th>
                <th className={thClass}>Engagement</th>
                <th className={thClass}>Sentiment</th>
                <th className={thClass}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="py-10 text-center text-[13px] text-[rgba(255,255,255,0.25)]">No threads available.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] overflow-hidden animate-fade-up">
      <div className="flex items-center px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed]">Top Threads Leaderboard</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">High-priority threads requiring attention</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <th className={thClass}>Thread</th>
              <th className={thClass}>Community</th>
              <th className={thClass}>Author</th>
              <th className={thClass}>Engagement</th>
              <th className={thClass}>Sentiment</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread) => (
              <tr key={thread.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="py-3.5 px-3">
                  <div className="max-w-sm">
                    <h3 className="font-medium text-[13px] text-[#ededed] mb-0.5 truncate">{thread.title}</h3>
                    {thread.matchReason && (
                      <p className="text-[11px] text-[rgba(255,255,255,0.4)]">{thread.matchReason}</p>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="text-[#60a5fa] font-medium text-[13px]">{thread.subreddit}</span>
                </td>
                <td className="py-3.5 px-3">
                  <div>
                    <div className="text-[13px] font-medium text-[#ededed]">{thread.author}</div>
                    <div className="text-[11px] text-[rgba(255,255,255,0.4)]">{thread.karma ? thread.karma.toLocaleString() + ' karma' : ''}</div>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3 text-[13px]">
                    <div className="flex items-center gap-1 text-[rgba(255,255,255,0.6)]">
                      <ArrowUp className="w-3 h-3 text-[#34d399]" />
                      <span>{thread.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[rgba(255,255,255,0.6)]">
                      <MessageSquare className="w-3 h-3 text-[#9382ff]" />
                      <span>{thread.comments}</span>
                    </div>
                    {thread.age && (
                      <div className="flex items-center gap-1 text-[rgba(255,255,255,0.4)]">
                        <Clock className="w-3 h-3" />
                        <span className="text-[11px]">{thread.age}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[5px] text-[11px] font-medium border ${getSentimentColor(thread.sentiment)}`}>{thread.sentiment}</span>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center">
                    <a href={thread.post_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-7 h-7 rounded-[5px] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(96,165,250,0.08)] transition-colors" title="Open thread">
                      <ExternalLink className="w-3.5 h-3.5 text-[#60a5fa]" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopThreadsTable;
