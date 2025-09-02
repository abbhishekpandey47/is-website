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
          <div className="flex items-center" key="Total Mentions">
            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor:'#FF5700'}}></div>
            <span className="text-foreground-muted">Total Mentions</span>
          </div>
          <div className="flex items-center" key="Posts">
            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor:'#3B82F6'}}></div>
            <span className="text-foreground-muted">Posts</span>
          </div>
            <div className="flex items-center" key="Comments">
            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor:'#10B981'}}></div>
            <span className="text-foreground-muted">Comments</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gradMentions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5700" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#FF5700" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="gradPosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.55}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="gradComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.55}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF', fontSize: 12 }}
              fontSize={12}
            />
            <YAxis
              stroke="#FFFFFF"
              tick={{ fill: '#FFFFFF', fontSize: 12 }}
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
            <Area type="monotone" dataKey="mentions" stroke="#FF5700" fill="url(#gradMentions)" strokeWidth={2} />
            <Area type="monotone" dataKey="posts" stroke="#3B82F6" fill="url(#gradPosts)" strokeWidth={1.8} />
            <Area type="monotone" dataKey="comments" stroke="#10B981" fill="url(#gradComments)" strokeWidth={1.8} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MentionsChart;
