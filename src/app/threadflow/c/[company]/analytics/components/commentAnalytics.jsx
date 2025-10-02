import { ArrowUp, Clock, ExternalLink, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import session from "@/app/tools/utils/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return "text-green-600 border-green-600 bg-green-50";
    case "negative":
      return "text-red-600 border-red-600 bg-red-50";
    default:
      return "text-gray-500 border-gray-300 bg-gray-50";
  }
};

const CommentsAnalyticsTable = ({ threads = [] }) => {
  // Store threads in session when they change
  useEffect(() => {
    session.set("comments", threads);
  }, [threads]);

  return (
    <Card className="animate-slide-up shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Comments Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Comments
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">
                  Community
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
              {threads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-foreground-muted">
                    No Comments available.
                  </td>
                </tr>
              ) : (
                threads.map((thread) => (
                  <tr
                    key={thread.id}
                    className="border-b border-border-muted hover:bg-interactive-hover transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="max-w-sm">
                        <h3 className="font-medium text-foreground mb-1 truncate">
                          {thread.title}
                        </h3>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-reddit-orange font-medium text-sm">
                        {thread.subreddit}
                      </span>
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
                          <span>{thread.age}</span>
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
                          title="Open comment"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-reddit-orange" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsAnalyticsTable;