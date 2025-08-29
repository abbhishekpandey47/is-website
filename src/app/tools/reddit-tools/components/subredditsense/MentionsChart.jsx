import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import session from "../../../utils/session";


// Helper to aggregate posts/comments by day
function aggregateMentions(posts = [], comments = []) {
  // Group by date (YYYY-MM-DD)
  const map = {};
  posts.forEach(p => {
    const d = new Date(Date.now() - (p.post_age_hours || 0) * 3600 * 1000);
    const date = d.toISOString().slice(0, 10);
    if (!map[date]) map[date] = { date, mentions: 0, comments: 0, posts: 0 };
    map[date].posts += 1;
    map[date].mentions += 1;
  });
  comments.forEach(c => {
    const d = new Date(Date.now() - (c.post_age_hours || 0) * 3600 * 1000);
    const date = d.toISOString().slice(0, 10);
    if (!map[date]) map[date] = { date, mentions: 0, comments: 0, posts: 0 };
    map[date].comments += 1;
    map[date].mentions += 1;
  });
  // Sort by date
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

const MentionsChart = (props) => {
  // Use real data if provided, else fallback to mock
  let chartData = [];
  if (props.data && props.data.posts && props.data.comments) {
    chartData = aggregateMentions(props.data.posts, props.data.comments);
  } else {
    chartData = [
      { date: '2025-08-01', mentions: 45, comments: 23, posts: 22 },
      { date: '2025-08-02', mentions: 52, comments: 31, posts: 21 },
      { date: '2025-08-03', mentions: 38, comments: 18, posts: 20 },
      { date: '2025-08-04', mentions: 67, comments: 42, posts: 25 },
      { date: '2025-08-05', mentions: 89, comments: 56, posts: 33 },
      { date: '2025-08-06', mentions: 76, comments: 48, posts: 28 },
      { date: '2025-08-07', mentions: 94, comments: 61, posts: 33 },
      { date: '2025-08-08', mentions: 82, comments: 52, posts: 30 },
      { date: '2025-08-09', mentions: 103, comments: 68, posts: 35 },
      { date: '2025-08-10', mentions: 118, comments: 79, posts: 39 },
      { date: '2025-08-11', mentions: 95, comments: 61, posts: 34 },
      { date: '2025-08-12', mentions: 87, comments: 55, posts: 32 },
      { date: '2025-08-13', mentions: 112, comments: 73, posts: 39 },
      { date: '2025-08-14', mentions: 134, comments: 89, posts: 45 },
    ];
  }

  session.set('mentionsData', chartData);

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Mentions Over Time
          </h2>
          <p className="text-foreground-muted text-sm">
            Daily mentions with 7-day moving average
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-chart-primary rounded-full mr-2"></div>
            <span className="text-foreground-muted">Total Mentions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-chart-secondary rounded-full mr-2"></div>
            <span className="text-foreground-muted">Posts</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-chart-tertiary rounded-full mr-2"></div>
            <span className="text-foreground-muted">Comments</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground-muted))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--foreground-muted))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--surface-elevated))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--border-radius)',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Area
              type="monotone"
              dataKey="mentions"
              stackId="1"
              stroke="hsl(var(--chart-primary))"
              fill="hsl(var(--chart-primary) / 0.2)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="posts"
              stackId="2"
              stroke="hsl(var(--chart-secondary))"
              fill="hsl(var(--chart-secondary) / 0.3)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="comments"
              stackId="2"
              stroke="hsl(var(--chart-tertiary))"
              fill="hsl(var(--chart-tertiary) / 0.3)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MentionsChart;
