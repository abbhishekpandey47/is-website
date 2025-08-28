// SubredditSense Dashboard Page
import { Eye, MessageSquare, Target, TrendingUp, Users, Zap } from "lucide-react";
import DashboardHeader from "./components/subredditsense/DashboardHeader";
import EngagementFunnel from "./components/subredditsense/EngagementFunnel";
import './components/subredditsense/index.css';
import MentionsChart from "./components/subredditsense/MentionsChart";
import MetricCard from "./components/subredditsense/MetricCard";
import SubredditHeatmap from "./components/subredditsense/SubredditHeatmap";
import TopicClusters from "./components/subredditsense/TopicClusters";
import TopThreadsTable from "./components/subredditsense/TopThreadsTable";

const SubredditSenseDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-section">
          <MetricCard
            title="Total Mentions"
            value={1247}
            change="+12.5%"
            changeType="positive"
            icon={MessageSquare}
            subtitle="Last 30 days"
          />
          <MetricCard
            title="Active Subreddits"
            value={28}
            change="+3"
            changeType="positive"
            icon={Users}
            subtitle="Communities"
          />
          <MetricCard
            title="Avg Engagement"
            value="72%"
            change="+5.2%"
            changeType="positive"
            icon={TrendingUp}
            subtitle="Upvotes + Comments"
          />
          <MetricCard
            title="Brand Replies"
            value={89}
            change="+18%"
            changeType="positive"
            icon={Target}
            subtitle="Response rate: 15%"
          />
          <MetricCard
            title="Positive Sentiment"
            value="68%"
            change="+2.1%"
            changeType="positive"
            icon={Eye}
            subtitle="vs 32% negative"
          />
          <MetricCard
            title="Conversion Rate"
            value="8.2%"
            change="+1.3%"
            changeType="positive"
            icon={Zap}
            subtitle="Mentions to leads"
          />
        </div>
        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-section">
          <MentionsChart />
          <SubredditHeatmap />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-section">
          <TopicClusters />
          <EngagementFunnel />
        </div>
        {/* Full Width Table */}
        <TopThreadsTable />
      </div>
    </div>
  );
};

export default SubredditSenseDashboard;
