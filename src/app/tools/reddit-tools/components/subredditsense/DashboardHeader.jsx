
import { Calendar, Filter, Download, Settings } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="glass-card p-card mb-section">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              SubredditSense Dashboard
            </h1>
            <p className="text-foreground-muted mt-1">
              Real-time Reddit intelligence and brand monitoring
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-ghost">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </button>
          <button className="btn-ghost">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-ghost">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
