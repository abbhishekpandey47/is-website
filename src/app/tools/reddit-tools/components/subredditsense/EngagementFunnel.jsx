import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import session from "../../../utils/session";


function calculateFunnel(posts = [], comments = []) {
  const allMentions = posts.length + comments.length;
  const upvotes5 = posts.filter(p => (p.upvotes || 0) >= 5).length;
  const comments3 = posts.filter(p => (p.total_comments || 0) >= 3).length;
  // Brand replied and positive outcome: leave empty for now
  return [
    {
      stage: 'All Verified\nMentions',
      count: allMentions,
      percentage: allMentions ? 100 : 0,
      color: 'hsl(var(--chart-primary))'
    },
    {
      stage: 'Upvotes ≥5',
      count: upvotes5,
      percentage: allMentions ? Math.round((upvotes5 / allMentions) * 100) : 0,
      color: 'hsl(var(--chart-secondary))'
    },
    {
      stage: 'Comments ≥3',
      count: comments3,
      percentage: allMentions ? Math.round((comments3 / allMentions) * 100) : 0,
      color: 'hsl(var(--chart-tertiary))'
    },
    {
      stage: 'Brand\nReplied',
      count: '',
      percentage: '',
      color: 'hsl(var(--chart-quaternary))'
    },
    {
      stage: 'Positive\nOutcome',
      count: '',
      percentage: '',
      color: 'hsl(var(--success))'
    }
  ];
}

const EngagementFunnel = (props) => {
  // Use real data if provided, else fallback to mock
  let funnelData = [];
  if (props.data && props.data.posts && props.data.comments) {
    funnelData = calculateFunnel(props.data.posts, props.data.comments);
  } else {
    funnelData = [
      {
        stage: 'All Verified\nMentions',
        count: 1250,
        percentage: 100,
        color: 'hsl(var(--chart-primary))'
      },
      {
        stage: 'Upvotes ≥5',
        count: 875,
        percentage: 70,
        color: 'hsl(var(--chart-secondary))'
      },
      {
        stage: 'Comments ≥3',
        count: 520,
        percentage: 42,
        color: 'hsl(var(--chart-tertiary))'
      },
      {
        stage: 'Brand\nReplied',
        count: 185,
        percentage: 15,
        color: 'hsl(var(--chart-quaternary))'
      },
      {
        stage: 'Positive\nOutcome',
        count: 95,
        percentage: 8,
        color: 'hsl(var(--success))'
      }
    ];
  }

  session.set('engagementData', funnelData);

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
        <div className="text-right">
          <div className="text-2xl font-bold text-success">{funnelData[4]?.percentage || '8%'}%</div>
          <div className="text-sm text-foreground-muted">Conversion Rate</div>
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
