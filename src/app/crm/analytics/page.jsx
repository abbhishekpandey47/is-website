'use client';
import { Card, CardContent, CardHeader, CardTitle } from "../../../Components/ui/card";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
import { TrendingUp, MessageSquare, Users, Calendar, BarChart3, Eye } from "lucide-react";

const AnalyticsPage = () => {
  const analyticsData = {
    totalPosts: 12,
    totalEngagement: 1247,
    totalUpvotes: 892,
    totalComments: 355,
    avgEngagementRate: "7.2%",
    topPerformingCategory: "Drift Detection",
    monthlyGrowth: "+23%"
  };

  const recentMetrics = [
    { period: "This Week", posts: 3, upvotes: 156, comments: 43, engagement: "8.1%" },
    { period: "Last Week", posts: 2, upvotes: 98, comments: 32, engagement: "6.8%" },
    { period: "2 Weeks Ago", posts: 4, upvotes: 201, comments: 67, engagement: "7.9%" },
    { period: "3 Weeks Ago", posts: 3, upvotes: 143, comments: 38, engagement: "6.2%" }
  ];

  const categoryPerformance = [
    { category: "Drift Detection", posts: 6, avgUpvotes: 78, avgComments: 29, performance: "High" },
    { category: "IaC", posts: 4, avgUpvotes: 52, avgComments: 21, performance: "Medium" },
    { category: "DevOps", posts: 2, avgUpvotes: 34, avgComments: 15, performance: "Medium" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Analytics</h1>
              <p className="text-sm text-muted-foreground">Track your Reddit engagement performance</p>
            </div>
          </div>
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{analyticsData.totalPosts}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Upvotes</p>
                  <p className="text-2xl font-bold">{analyticsData.totalUpvotes}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-approved" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Comments</p>
                  <p className="text-2xl font-bold">{analyticsData.totalComments}</p>
                </div>
                <Users className="h-8 w-8 text-live" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold">{analyticsData.avgEngagementRate}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-pending" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{metric.period}</p>
                      <p className="text-sm text-muted-foreground">{metric.posts} posts</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        <span className="text-approved">{metric.upvotes} upvotes</span> • 
                        <span className="text-live ml-1">{metric.comments} comments</span>
                      </p>
                      <p className="text-sm font-medium">{metric.engagement} engagement</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Category Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{category.category}</p>
                      <p className="text-sm text-muted-foreground">{category.posts} posts</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        <span className="text-approved">~{category.avgUpvotes} upvotes</span> • 
                        <span className="text-live ml-1">~{category.avgComments} comments</span>
                      </p>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        category.performance === 'High' ? 'bg-approved text-approved-foreground' :
                        category.performance === 'Medium' ? 'bg-pending text-pending-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {category.performance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-bold text-approved">{analyticsData.monthlyGrowth}</p>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-bold text-primary">{analyticsData.topPerformingCategory}</p>
                <p className="text-sm text-muted-foreground">Top Category</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-bold text-live">{analyticsData.totalEngagement}</p>
                <p className="text-sm text-muted-foreground">Total Engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;