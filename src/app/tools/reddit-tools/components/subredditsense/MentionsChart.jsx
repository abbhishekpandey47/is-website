import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import session from "../../../utils/session";

const data = [
  { date: 'Jan 1', mentions: 45, comments: 23, posts: 22 },
  { date: 'Jan 2', mentions: 52, comments: 31, posts: 21 },
  { date: 'Jan 3', mentions: 38, comments: 18, posts: 20 },
  { date: 'Jan 4', mentions: 67, comments: 42, posts: 25 },
  { date: 'Jan 5', mentions: 89, comments: 56, posts: 33 },
  { date: 'Jan 6', mentions: 76, comments: 48, posts: 28 },
  { date: 'Jan 7', mentions: 94, comments: 61, posts: 33 },
  { date: 'Jan 8', mentions: 82, comments: 52, posts: 30 },
  { date: 'Jan 9', mentions: 103, comments: 68, posts: 35 },
  { date: 'Jan 10', mentions: 118, comments: 79, posts: 39 },
  { date: 'Jan 11', mentions: 95, comments: 61, posts: 34 },
  { date: 'Jan 12', mentions: 87, comments: 55, posts: 32 },
  { date: 'Jan 13', mentions: 112, comments: 73, posts: 39 },
  { date: 'Jan 14', mentions: 134, comments: 89, posts: 45 },
];

const MentionsChart = (props) => {
  // Example: cache mentions data in session
  session.set('mentionsData', props.data);

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
          <AreaChart data={data}>
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
