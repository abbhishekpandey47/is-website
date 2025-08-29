
const MetricCard = ({ title, value, change, changeType = 'neutral', icon: Icon, subtitle }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-foreground-muted';
    }
  };

  return (
    <div className="metric-card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-chart-primary/10 rounded-lg border border-chart-primary/20">
          <Icon className="w-5 h-5 text-chart-primary" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-foreground-muted text-sm font-medium mb-1">
          {title}
        </h3>
        <p className="text-2xl font-bold text-foreground mb-0.5">
          {value.toLocaleString()}
        </p>
        {subtitle && (
          <p className="text-foreground-subtle text-xs">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
