import { Calendar, Download, Filter, Settings } from "lucide-react";
import session from "../../../utils/session";

const DashboardHeader = () => {
  // Example: get dashboard state from session
  const dashboardState = session.get("dashboardState");

  return (
    <div className="glass-card px-8 py-6 rounded-xl shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-1">
              SubredditSense Dashboard
            </h1>
            <p className="text-foreground-muted mt-1">
              Real-time Reddit intelligence and brand monitoring
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button className="btn-ghost px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </button>
          <button className="btn-ghost px-4 py-2">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-ghost px-4 py-2">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary px-4 py-2">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
