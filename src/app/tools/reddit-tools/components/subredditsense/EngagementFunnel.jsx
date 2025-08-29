import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import session from "../../../utils/session";


function calculateFunnel(posts = [], comments = []) {
  const allMentions = posts.length + comments.length;
  if (!allMentions) return [];
  const upvotes5 = posts.filter(p => (p.upvotes || 0) >= 5).length;
  const comments3 = posts.filter(p => (p.total_comments || 0) >= 3).length;
  return [
    {
      stage: 'All Verified\nMentions',
      count: allMentions,
      percentage: 100,
      color: 'hsl(var(--chart-primary))'
    },
    {
      stage: 'Upvotes ≥5',
      count: upvotes5,
      percentage: Math.round((upvotes5 / allMentions) * 100),
      color: 'hsl(var(--chart-secondary))'
    },
    {
      stage: 'Comments ≥3',
      count: comments3,
      percentage: Math.round((comments3 / allMentions) * 100),
      color: 'hsl(var(--chart-tertiary))'
    }
  ];
}

const EngagementFunnel = (props) => {
  // Use real data if provided, else fallback to mock
  let funnelData = [];
  if (props.data && props.data.posts && props.data.comments) {
    funnelData = calculateFunnel(props.data.posts, props.data.comments);
  }

  session.set('engagementData', funnelData);

  if (!funnelData.length) {
    return <div className="chart-container animate-slide-up"><div className="text-center text-foreground-muted py-16">No engagement data available.</div></div>;
  }

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Engagement Funnel
          </h2>
          <p className="text-foreground-muted text-sm">
            Conversion from mentions to positive outcomes
          </p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnelData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              stroke="hsl(var(--foreground-muted))"
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="stage"
              stroke="hsl(var(--foreground-muted))"
              fontSize={11}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--surface-elevated))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--border-radius)',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value, name) => [
                `${value} mentions (${funnelData.find(d => d.count === value)?.percentage}%)`,
                'Count'
              ]}
            />
            <Bar
              dataKey="count"
              fill="hsl(var(--chart-primary))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {funnelData.map((stage, index) => (
          <div key={stage.stage} className="text-center">
            <div className="h-2 bg-surface rounded-full overflow-hidden mb-2">
              <div
                className="h-full transition-all duration-1000 delay-300"
                style={{
                  width: `${stage.percentage}%`,
                  backgroundColor: stage.color
                }}
              />
            </div>
            <div className="text-sm font-medium text-foreground">{stage.count}</div>
            <div className="text-xs text-foreground-muted">{stage.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementFunnel;
