import { ArrowUp, Clock, ExternalLink, MessageSquare } from "lucide-react";
import session from "@/app/tools/utils/session";

function getAgeString(postAgeHours) {
  if (!postAgeHours && postAgeHours !== 0) return "";
  if (postAgeHours < 24) return `${Math.round(postAgeHours)}h`;
  if (postAgeHours < 24 * 7) return `${Math.round(postAgeHours / 24)}d`;
  return `${Math.round(postAgeHours / (24 * 7))}w`;
}

function safelyParseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function deriveAgeHours(createdAt, fallbackHours) {
  const parsed = safelyParseDate(createdAt);
  if (parsed) return (Date.now() - parsed.getTime()) / 3600000;
  if (typeof fallbackHours === "number") return fallbackHours;
  if (fallbackHours !== undefined && fallbackHours !== null) {
    const parsedFallback = Number(fallbackHours);
    if (!Number.isNaN(parsedFallback)) return parsedFallback;
  }
  return null;
}

function formatCreatedAtLabel(createdAt) {
  const parsed = safelyParseDate(createdAt);
  return parsed ? parsed.toLocaleString() : "";
}

function getSentiment(upvotes) {
  if (typeof upvotes !== "number") return "neutral";
  if (upvotes > 0) return "positive";
  if (upvotes < 0) return "negative";
  return "neutral";
}

const AllThreadsTable = (props) => {
  let threads = [];
  if (props.data && props.data.posts) {
    threads = props.data.posts.map((p, idx) => ({
      id: idx,
      type: p.type || "post",
      title: p.post_title,
      subreddit: p.subreddit,
      author: p.author || "",
      karma: p.karma || "",
      upvotes: p.upvotes || 0,
      comments: p.total_comments || 0,
      age: getAgeString(p.post_age_hours),
      matchReason: "",
      sentiment: getSentiment(p.upvotes || 0),
      priority: (p.upvotes || 0) > 10 ? "high" : "medium",
      post_url: p.post_url || "",
    }));
  } else if (props.threads && Array.isArray(props.threads)) {
    threads = props.threads;
  }
  const normalizedThreads = threads.map((thread) => {
    const createdAtValue = thread.createdAt || thread.created_utc || thread.created_at || thread.fetched_at || thread.fetchedAt || null;
    const ageHours = deriveAgeHours(createdAtValue, thread.post_age_hours ?? thread.postAgeHours);
    const derivedAge = thread.age || (ageHours != null ? getAgeString(ageHours) : "");
    const createdAtLabel = formatCreatedAtLabel(createdAtValue);
    return { ...thread, age: derivedAge, createdAtLabel };
  });
  session.set("allThreads", normalizedThreads);

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

  if (!normalizedThreads.length) {
    return (
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] overflow-hidden animate-fade-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <div>
            <h2 className="text-[16px] font-semibold text-[#ededed]">All Threads</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <th className={thClass}>Category</th>
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
                <td colSpan={7} className="py-10 text-center text-[13px] text-[rgba(255,255,255,0.25)]">
                  No threads available.
                </td>
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
          <h2 className="text-[16px] font-semibold text-[#ededed]">All Threads</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <th className={thClass}>Category</th>
              <th className={thClass}>Thread</th>
              <th className={thClass}>Community</th>
              <th className={thClass}>Author</th>
              <th className={thClass}>Engagement</th>
              <th className={thClass}>Sentiment</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {normalizedThreads.map((thread) => (
              <tr
                key={thread.id}
                className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <td className="py-3.5 px-3">
                  <div className="max-w-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium rounded-full capitalize tracking-wide border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.6)]">
                      {thread.type}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="max-w-sm">
                    <h3 className="font-medium text-[13px] text-[#ededed] mb-0.5 truncate">
                      {thread.title}
                    </h3>
                    {thread.matchReason && (
                      <p className="text-[11px] text-[rgba(255,255,255,0.4)]">
                        {thread.matchReason}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="text-[#60a5fa] font-medium text-[13px]">
                    {thread.subreddit}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <div>
                    <div className="text-[13px] font-medium text-[#ededed]">
                      {thread.author}
                    </div>
                    <div className="text-[11px] text-[rgba(255,255,255,0.4)]">
                      {thread.karma
                        ? thread.karma.toLocaleString() + " karma"
                        : ""}
                    </div>
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
                    <div className="flex items-center gap-1 text-[rgba(255,255,255,0.4)]">
                      <Clock className="w-3 h-3" />
                      <div className="flex flex-col text-[11px] leading-tight">
                        <span className="text-[rgba(255,255,255,0.6)]">{thread.age || '\u2014'}</span>
                        <span className="text-[rgba(255,255,255,0.4)]">
                          {thread.createdAtLabel ? thread.createdAtLabel : '\u2014'}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={`px-2 py-0.5 rounded-[5px] text-[11px] font-medium border ${getSentimentColor(
                      thread.sentiment
                    )}`}
                  >
                    {thread.sentiment}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center">
                    <a
                      href={thread.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-7 h-7 rounded-[5px] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(96,165,250,0.08)] transition-colors"
                      title="Open thread"
                    >
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

export default AllThreadsTable;
