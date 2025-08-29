import session from "../../../utils/session";


// Helper to group posts/comments by subreddit and week
function aggregateHeatmap(posts = [], comments = []) {
  // Get week number from post_age_hours
  const now = Date.now();
  const weekOfYear = (date) => {
    const d = new Date(date);
    const start = new Date(d.getFullYear(), 0, 1);
    const diff = (d - start + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60000));
    return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
  };
  const map = {};
  [...posts, ...comments].forEach(item => {
    const d = new Date(now - (item.post_age_hours || 0) * 3600 * 1000);
    const week = 'W' + weekOfYear(d);
    const subreddit = item.subreddit || 'unknown';
    if (!map[subreddit]) map[subreddit] = {};
    if (!map[subreddit][week]) map[subreddit][week] = { value: 0, engagement: 0 };
    map[subreddit][week].value += 1;
    map[subreddit][week].engagement += (item.upvotes || 0) + (item.total_comments || 0);
  });
  // Format for heatmap
  return Object.entries(map).map(([subreddit, weekData]) => ({
    subreddit,
    data: Object.entries(weekData).map(([week, v]) => ({ week, ...v }))
  }));
}


const SubredditHeatmap = (props) => {
  // Use real data if provided, else fallback to mock
  let heatmapData = [];
  if (props.data && props.data.posts && props.data.comments) {
    heatmapData = aggregateHeatmap(props.data.posts, props.data.comments);
  } else {
    // fallback to mock
    const subreddits = [
      'r/programming', 'r/webdev', 'r/javascript', 'r/reactjs', 'r/node',
      'r/docker', 'r/kubernetes', 'r/devops', 'r/startups', 'r/entrepreneur',
      'r/SaaS', 'r/marketing', 'r/analytics', 'r/datascience', 'r/MachineLearning'
    ];
    const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
    heatmapData = subreddits.map(subreddit => ({
      subreddit,
      data: weeks.map(week => ({
        week,
        value: Math.floor(Math.random() * 50) + 1,
        engagement: Math.floor(Math.random() * 100) + 10
      }))
    }));
  }

  session.set('heatmapData', heatmapData);

  const getIntensityColor = (value) => {
    const intensity = Math.min(value / 50, 1);
    return `hsl(var(--reddit-orange) / ${0.1 + intensity * 0.8})`;
  };

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Subreddit Activity Heatmap
          </h2>
          <p className="text-foreground-muted text-sm">
            Mention volume across top communities over time
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-foreground-muted">
          <span>Low</span>
          <div className="flex space-x-1">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map(opacity => (
              <div
                key={opacity}
                className="w-3 h-3 rounded-sm border border-border-muted"
                style={{ backgroundColor: `hsl(var(--reddit-orange) / ${opacity * 0.8 + 0.1})` }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex mb-2">
            <div className="w-32"></div>
            {/* Dynamically extract weeks from heatmapData */}
            {(() => {
              // Get all unique weeks from heatmapData
              const weekSet = new Set();
              heatmapData.forEach(row => {
                row.data.forEach(cell => {
                  weekSet.add(cell.week);
                });
              });
              const weekArr = Array.from(weekSet).sort();
              return weekArr.map(week => (
                <div key={week} className="flex-1 text-center text-sm text-foreground-muted font-medium">
                  {week}
                </div>
              ));
            })()}
          </div>

          {heatmapData.map(({ subreddit, data }) => (
            <div key={subreddit} className="flex items-center mb-1">
              <div className="w-32 text-sm text-foreground-muted font-medium truncate pr-3">
                {subreddit}
              </div>
              <div className="flex flex-1 space-x-1">
                {data.map(({ week, value, engagement }) => (
                  <div
                    key={week}
                    className="flex-1 h-8 rounded border border-border-muted cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-glow flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: getIntensityColor(value) }}
                    title={`${subreddit} - ${week}: ${value} mentions, ${engagement}% engagement`}
                  >
                    {value > 30 ? value : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubredditHeatmap;
