"use client";
import { auth } from '@/lib/firebaseClient';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../Components/ui/card";

const getCompanyId = () => {
  // TODO: Replace with actual logic to get companyId from session/user/context
  if (typeof window !== "undefined") {
    return localStorage.getItem("companyId") || "test-company-id";
  }
  return "test-company-id";
};

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const fetchCompanyAndDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get current user and token
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');
        const token = await user.getIdToken();
        // Fetch companies
        const resCompanies = await fetch('/api/threadflow/reddit/my-companies', { headers: { Authorization: `Bearer ${token}` } });
        if (!resCompanies.ok) throw new Error('Failed to fetch companies');
        const companiesJson = await resCompanies.json();
        const firstCompany = companiesJson.companies?.[0];
        if (!firstCompany?.id) throw new Error('No companies found');
        setCompanyId(firstCompany.id);
        // Fetch dashboard
        const resDash = await fetch(`/api/threadflow/reddit/dashboard?companyId=${firstCompany.id}`, { headers: { Authorization: `Bearer ${token}` } });
        if (!resDash.ok) throw new Error('Failed to fetch analytics');
        const dashJson = await resDash.json();
        setData(dashJson);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyAndDashboard();
  }, []);

  // Map API data to UI variables with defensive checks
  // Find top-performing category by highest total mentions in heatmap
  let topCategory = "-";
  if (Array.isArray(data?.heatmap) && data.heatmap.length > 0) {
    const sorted = [...data.heatmap].sort((a, b) => {
      const aMentions = Array.isArray(a.data) ? a.data.reduce((acc, d) => acc + (d.value || 0), 0) : 0;
      const bMentions = Array.isArray(b.data) ? b.data.reduce((acc, d) => acc + (d.value || 0), 0) : 0;
      return bMentions - aMentions;
    });
    topCategory = sorted[0]?.subreddit || "-";
  }

  const analyticsData = data?.metrics ? {
    totalPosts: Array.isArray(data?.timeSeries) ? data.timeSeries.reduce((acc, d) => acc + (d.posts || 0), 0) : 0,
    totalEngagement: typeof data?.metrics?.estUpVotes === "number" ? data.metrics.estUpVotes : 0,
    totalUpvotes: typeof data?.metrics?.estUpVotes === "number" ? data.metrics.estUpVotes : 0,
    totalComments: Array.isArray(data?.timeSeries) ? data.timeSeries.reduce((acc, d) => acc + (d.comments || 0), 0) : 0,
    avgEngagementRate: typeof data?.metrics?.avgEngagement === "string" || typeof data?.metrics?.avgEngagement === "number" ? `${data.metrics.avgEngagement}%` : "0%",
    topPerformingCategory: topCategory,
    monthlyGrowth: "+0%" // Placeholder, can be calculated if needed
  } : {};

  // Recent metrics: last 4 periods from timeSeries
  const recentMetrics = Array.isArray(data?.timeSeries) ? data.timeSeries.slice(-4).reverse().map((metric, idx) => ({
    period: metric.date,
    posts: metric.posts,
    upvotes: metric.posts, // Not exact, but can be improved if needed
    comments: metric.comments,
    engagement: `${typeof data?.metrics?.avgEngagement === "number" ? data.metrics.avgEngagement : 0}%`
  })) : [];

  // Category performance: from heatmap data
  const categoryPerformance = Array.isArray(data?.heatmap)
    ? data.heatmap.map(cat => {
        return {
          category: cat.subreddit,
          posts: Array.isArray(cat.data) ? cat.data.reduce((acc, d) => acc + d.value, 0) : 0,
          avgUpvotes: Array.isArray(cat.data) && cat.data.length > 0 ? Math.round(cat.data.reduce((acc, d) => acc + d.engagement, 0) / cat.data.length) : 0,
          avgComments: 0, // Not available in heatmap, can be improved if needed
          performance: Array.isArray(cat.data) ? (cat.data.reduce((acc, d) => acc + d.value, 0) > 10 ? "High" : "Medium") : "Medium"
        };
      })
    : [];
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">Loading analytics...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Error: {error}</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Posts</p>
                      <p className="text-2xl font-bold">{analyticsData.totalPosts}</p>
                    </div>
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
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
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
                  <CardTitle>Category Performance</CardTitle>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
