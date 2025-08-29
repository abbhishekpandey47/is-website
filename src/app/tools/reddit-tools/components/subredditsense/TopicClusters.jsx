
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const clusterData = [
  { name: 'Documentation', x: 20, y: 80, size: 120, engagement: 85, mentions: 45 },
  { name: 'Pricing', x: 70, y: 30, size: 80, engagement: 65, mentions: 32 },
  { name: 'Kubernetes', x: 90, y: 70, size: 100, engagement: 78, mentions: 38 },
  { name: 'API Issues', x: 40, y: 20, size: 60, engagement: 45, mentions: 24 },
  { name: 'Integrations', x: 60, y: 90, size: 90, engagement: 72, mentions: 35 },
  { name: 'Performance', x: 30, y: 60, size: 70, engagement: 55, mentions: 28 },
  { name: 'Competitors', x: 80, y: 40, size: 85, engagement: 68, mentions: 33 },
  { name: 'Feature Requests', x: 50, y: 50, size: 95, engagement: 75, mentions: 37 },
];

const TopicClusters = () => {
  const getEngagementColor = (engagement) => {
    if (engagement >= 80) return 'hsl(var(--success))';
    if (engagement >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--chart-primary))';
  };

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
            <Scatter dataKey="size" data={clusterData}>
              {clusterData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getEngagementColor(entry.engagement)}
                  opacity={0.7}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {clusterData.slice(0, 8).map((cluster) => (
          <div key={cluster.name} className="flex items-center space-x-2 p-2 bg-surface rounded border border-border-muted">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getEngagementColor(cluster.engagement) }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{cluster.name}</p>
              <p className="text-xs text-foreground-muted">{cluster.mentions} mentions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicClusters;
