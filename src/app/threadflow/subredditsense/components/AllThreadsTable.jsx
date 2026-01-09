import { ArrowUp, Clock, ExternalLink, MessageSquare } from "lucide-react";
import session from "@/app/tools/utils/session";
import { Badge } from "@/Components/ui/badge";

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
  // Approximation: any positive score = positive, zero = neutral, negative (not expected) = negative
  if (typeof upvotes !== "number") return "neutral";
  if (upvotes > 0) return "positive";
  if (upvotes < 0) return "negative";
  return "neutral";
}

const AllThreadsTable = (props) => {
  let threads = [];
  // Prefer props.data, fallback to props.threads if provided
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
        return "status-success";
      case "negative":
        return "status-error";
      default:
        return "text-foreground-muted";
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-error";
      case "medium":
        return "text-warning";
      default:
        return "text-foreground-muted";
    }
  };
  if (!normalizedThreads.length) {
    return (
      <div className="chart-container animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              All Threads
            </h2>
            {/* <p className="text-foreground-muted text-sm">
                            High-priority threads requiring attention
                        </p> */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Category
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Thread
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Community
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Author
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Engagement
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Sentiment
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-foreground-muted"
                >
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
    <div className="chart-container animate-slide-up">
      <div className="flex items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            All Threads
          </h2>
          {/* <p className="text-foreground-muted text-sm">
                        High-priority threads requiring attention
                    </p> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Category
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Thread
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Community
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Author
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Engagement
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Sentiment
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {normalizedThreads.map((thread) => (
              <tr
                key={thread.id}
                className="border-b border-border-muted hover:bg-interactive-hover transition-colors"
              >
                <td className="py-4 px-2">
                  <div className="max-w-sm">
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm font-medium rounded-full capitalize tracking-wide shadow-sm"
                    >
                      {thread.type}
                    </Badge>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="max-w-sm">
                    <h3 className="font-medium text-foreground mb-1 truncate">
                      {thread.title}
                    </h3>
                    <p className="text-xs text-foreground-muted">
                      {thread.matchReason}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-reddit-orange font-medium text-sm">
                    {thread.subreddit}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {thread.author}
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {thread.karma
                        ? thread.karma.toLocaleString() + " karma"
                        : ""}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center">
                      <ArrowUp className="w-3 h-3 mr-1 text-chart-primary" />
                      <span>{thread.upvotes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1 text-chart-secondary" />
                      <span>{thread.comments}</span>
                    </div>
                    <div className="flex items-center text-foreground-muted">
                      <Clock className="w-3 h-3 mr-1" />
                      <div className="flex flex-col text-[11px] leading-tight">
                        <span className="text-xs text-foreground">{thread.age || '—'}</span>
                        <span className="text-[11px] text-foreground-muted">
                          {thread.createdAtLabel ? thread.createdAtLabel : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium border ${getSentimentColor(
                      thread.sentiment
                    )}`}
                  >
                    {thread.sentiment}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <a
                      href={thread.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-7 h-7 rounded border border-border-muted hover:bg-reddit-orange/10 transition-colors"
                      title="Open thread"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-reddit-orange" />
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
