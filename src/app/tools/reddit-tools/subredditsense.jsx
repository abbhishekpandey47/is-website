// SubredditSense Dashboard Page
import { Eye, MessageSquare, TrendingUp, Users } from "lucide-react";
import DashboardHeader from "./components/subredditsense/DashboardHeader";
import EngagementFunnel from "./components/subredditsense/EngagementFunnel";
import './components/subredditsense/index.css';
import MentionsChart from "./components/subredditsense/MentionsChart";
import MetricCard from "./components/subredditsense/MetricCard";
import SubredditHeatmap from "./components/subredditsense/SubredditHeatmap";
import TopicClusters from "./components/subredditsense/TopicClusters";
import TopThreadsTable from "./components/subredditsense/TopThreadsTable";


import session from "../utils/session";

const SubredditSenseDashboard = () => {
  // Try to get posts/comments from session
  let posts = [];
  let comments = [];
  try {
    posts = session.get('posts') || [];
    comments = session.get('comments') || [];
  } catch (e) {}

  // If no data, use mock
  const hasData = posts.length > 0 || comments.length > 0;

  // Metrics calculations
  const totalMentions = hasData ? posts.length + comments.length : 1247;
  const activeSubreddits = hasData
    ? Array.from(new Set([
        ...posts.map(p => p.subreddit),
        ...comments.map(c => c.subreddit)
      ])).length
    : 28;
  const avgEngagement = hasData && posts.length > 0
    ? Math.round(
        (posts.reduce((acc, p) => acc + (p.upvotes || 0) + (p.total_comments || 0), 0) / posts.length) * 100
      ) / 100 + '%'
    : '72%';
  // Approximate Positive Sentiment: ratio of posts/comments with upvotes > 0
  let positiveSentiment = '';
  let sentimentSubtitle = '';
  if (hasData) {
    const all = [...posts, ...comments];
    const positives = all.filter(i => (i.upvotes || 0) > 0).length;
    const neutrals = all.filter(i => (i.upvotes || 0) === 0).length;
    const total = all.length || 1;
    const score = Math.round(((positives + 0.5 * neutrals) / total) * 100);
    positiveSentiment = score + '%';
    sentimentSubtitle = `Positive: ${positives} | Neutral: ${neutrals} | Total: ${all.length}`;
  } else {
    positiveSentiment = '68%';
    sentimentSubtitle = 'baseline model';
  }

  // Prepare chart/heatmap data
  // For demo, pass posts/comments to charts if available, else undefined
  const mentionsChartData = hasData ? { posts, comments } : undefined;
  const heatmapData = hasData ? { posts, comments } : undefined;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <DashboardHeader />
        </div>
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Total Mentions"
            value={totalMentions}
            change={hasData ? undefined : "+12.5%"}
            changeType={hasData ? undefined : "positive"}
            icon={MessageSquare}
            subtitle="Last 30 days"
          />
          <MetricCard
            title="Active Subreddits"
            value={activeSubreddits}
            change={hasData ? undefined : "+3"}
            changeType={hasData ? undefined : "positive"}
            icon={Users}
            subtitle="Communities"
          />
          <MetricCard
            title="Avg Engagement"
            value={avgEngagement}
            change={hasData ? undefined : "+5.2%"}
            changeType={hasData ? undefined : "positive"}
            icon={TrendingUp}
            subtitle="Upvotes + Comments"
          />
          <MetricCard
            title="Positive Sentiment"
            value={positiveSentiment}
            change={hasData ? undefined : "+2.1%"}
            changeType={hasData ? undefined : "positive"}
            icon={Eye}
            subtitle={sentimentSubtitle}
          />
        </div>
        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <MentionsChart data={mentionsChartData} />
          <SubredditHeatmap data={heatmapData} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <TopicClusters />
          <EngagementFunnel />
        </div>
        {/* Full Width Table */}
        <div className="mb-12">
          <TopThreadsTable data={{ posts, comments }} />
        </div>
      </div>
    </div>
  );
};

export default SubredditSenseDashboard;
