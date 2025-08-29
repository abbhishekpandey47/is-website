import { CartesianGrid, Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import session from "../../../utils/session";


// Keywords for clustering
const TOPIC_KEYWORDS = [
  { name: 'Documentation', keywords: ['doc', 'documentation', 'docs'] },
  { name: 'Pricing', keywords: ['price', 'pricing', 'cost', 'expensive', 'cheap'] },
  { name: 'Kubernetes', keywords: ['kubernetes', 'k8s'] },
  { name: 'API Issues', keywords: ['api', 'endpoint', 'request', 'response'] },
  { name: 'Integrations', keywords: ['integration', 'integrate', 'plugin', 'connect'] },
  { name: 'Performance', keywords: ['performance', 'speed', 'slow', 'fast', 'lag'] },
  { name: 'Competitors', keywords: ['competitor', 'alternative', 'vs', 'compare'] },
  { name: 'Feature Requests', keywords: ['feature', 'request', 'add', 'new'] },
];

function extractClusters(posts = [], comments = []) {
  if (!posts.length && !comments.length) return [];
  const allItems = [...posts, ...comments];
  const clusters = TOPIC_KEYWORDS.map((topic, idx) => {
    // Find items matching any keyword
    const matches = allItems.filter(item => {
      const text = (item.post_title || '') + ' ' + (item.post_content || '') + ' ' + (item.comment_body || '');
      return topic.keywords.some(kw => text.toLowerCase().includes(kw));
    });
    if (!matches.length) return null;
    // Engagement: avg upvotes + comments
    const engagement = Math.round(
      matches.reduce((acc, i) => acc + (i.upvotes || 0) + (i.total_comments || 0), 0) / matches.length
    );
    // Mentions: count
    const mentions = matches.length;
    // For scatter plot: random x/y for now, size by mentions
    return {
      name: topic.name,
      x: (idx * 13 + mentions * 2) % 100,
      y: (idx * 17 + engagement) % 100,
      size: 60 + mentions * 2,
      engagement,
      mentions
    };
  }).filter(Boolean);
  return clusters;
}

const TopicClusters = (props) => {
  session.set('topicClusters', props.clusters);

  const getEngagementColor = (engagement) => {
    if (engagement >= 80) return 'hsl(var(--success))';
    if (engagement >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--chart-primary))';
  };


  const TopicClusters = (props) => {
    // Use actual data if provided, else blank
    let clusters = [];
    if (props.data && props.data.posts && props.data.comments) {
      clusters = extractClusters(props.data.posts, props.data.comments);
    }
    session.set('topicClusters', clusters);

    const getEngagementColor = (engagement) => {
      if (engagement >= 80) return 'hsl(var(--success))';
      if (engagement >= 60) return 'hsl(var(--warning))';
      return 'hsl(var(--chart-primary))';
    };

    if (!clusters.length) {
      return <div className="chart-container animate-slide-up"><div className="text-center text-foreground-muted py-16">No topic cluster data available.</div></div>;
    }

    return (
      <div className="chart-container animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Topic Clusters
            </h2>
            <p className="text-foreground-muted text-sm">
              Semantic analysis of conversation themes
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
              <span className="text-foreground-muted">High Engagement (80%+)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
              <span className="text-foreground-muted">Medium Engagement (60-79%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-chart-primary rounded-full mr-2"></div>
              <span className="text-foreground-muted">Low Engagement (&lt;60%)</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="x"
                domain={[0, 100]}
                stroke="hsl(var(--foreground-muted))"
                fontSize={12}
                hide
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[0, 100]}
                stroke="hsl(var(--foreground-muted))"
                fontSize={12}
                hide
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="glass-card p-3 text-sm">
                        <p className="font-semibold text-foreground">{data.name}</p>
                        <p className="text-foreground-muted">{data.mentions} mentions</p>
                        <p className="text-foreground-muted">{data.engagement}% engagement</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter
                data={clusters}
                shape="circle"
              >
                {clusters.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={getEngagementColor(entry.engagement)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
};

export default TopicClusters;
