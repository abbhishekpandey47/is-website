
import { ExternalLink, MessageSquare, ArrowUp, Clock } from "lucide-react";

const threadData = [
  {
    id: 1,
    title: "Best practices for Docker deployment in production?",
    subreddit: "r/docker",
    author: "devops_guru",
    karma: 15420,
    upvotes: 245,
    comments: 89,
    age: "3h",
    matchReason: "Docker + production keywords",
    sentiment: "neutral",
    priority: "high"
  },
  {
    id: 2,
    title: "Looking for alternatives to current monitoring solution",
    subreddit: "r/devops",
    author: "sysadmin_pro",
    karma: 8960,
    upvotes: 182,
    comments: 64,
    age: "5h",
    matchReason: "Monitoring + alternatives",
    sentiment: "negative",
    priority: "high"
  },
  {
    id: 3,
    title: "Great experience with new deployment tools",
    subreddit: "r/programming",
    author: "code_enthusiast",
    karma: 12350,
    upvotes: 156,
    comments: 45,
    age: "7h",
    matchReason: "Positive brand mention",
    sentiment: "positive",
    priority: "medium"
  },
  {
    id: 4,
    title: "Comparison between different CI/CD platforms",
    subreddit: "r/webdev",
    author: "fullstack_dev",
    karma: 6890,
    upvotes: 134,
    comments: 78,
    age: "12h",
    matchReason: "CI/CD comparison",
    sentiment: "neutral",
    priority: "medium"
  },
  {
    id: 5,
    title: "Issues with current infrastructure setup",
    subreddit: "r/sysadmin",
    author: "ops_manager",
    karma: 19850,
    upvotes: 98,
    comments: 52,
    age: "18h",
    matchReason: "Infrastructure issues",
    sentiment: "negative",
    priority: "high"
  }
];

const TopThreadsTable = () => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'status-success';
      case 'negative': return 'status-error';
      default: return 'text-foreground-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-foreground-muted';
    }
  };

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Top Threads Leaderboard
          </h2>
          <p className="text-foreground-muted text-sm">
            High-priority threads requiring attention
          </p>
        </div>
        <button className="btn-reddit">
          View All Threads
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Thread</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Community</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Author</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Engagement</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Sentiment</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {threadData.map((thread) => (
              <tr key={thread.id} className="border-b border-border-muted hover:bg-interactive-hover transition-colors">
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
                    <div className="text-sm font-medium text-foreground">{thread.author}</div>
                    <div className="text-xs text-foreground-muted">{thread.karma.toLocaleString()} karma</div>
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
                      <span>{thread.age}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSentimentColor(thread.sentiment)}`}>
                    {thread.sentiment}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <button className="btn-primary text-xs px-3 py-1">
                      Respond
                    </button>
                    <button className="btn-ghost text-xs px-3 py-1">
                      <ExternalLink className="w-3 h-3" />
                    </button>
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
