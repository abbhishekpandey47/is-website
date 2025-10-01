"use client";
import { auth } from '@/lib/firebaseClient';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import PostAnalyticsTable from './components/postAnalytics';
import CommentsAnalyticsTable from './components/commentAnalytics';

function getAgeString(hours) {
  if (hours === 0) return "0h";
  if (!hours) return "";
  if (hours < 24) return `${Math.round(hours)}h`;
  if (hours < 24 * 7) return `${Math.round(hours / 24)}d`;
  return `${Math.round(hours / (24 * 7))}w`;
}

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [range, setRange] = useState("30");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');
        const token = await user.getIdToken();

        const resCompanies = await fetch('/api/threadflow/reddit/my-companies', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!resCompanies.ok) throw new Error('Failed to fetch companies');
        const companiesJson = await resCompanies.json();
        const firstCompany = companiesJson.companies?.[0];
        if (!firstCompany?.id) throw new Error('No companies found');
        setCompanyId(firstCompany.id);

        const resDash = await fetch(
          `/api/threadflow/reddit/dashboard?companyId=${firstCompany.id}&legacy=true&range=${range}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!resDash.ok) throw new Error('Failed to fetch analytics');
        const dashJson = await resDash.json();
        setData(dashJson);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [range]);

  // --- Analytics Data ---
  let topCategory = "-";
  if (Array.isArray(data?.heatmap) && data.heatmap.length) {
    const sorted = [...data.heatmap].sort((a, b) => {
      const aSum = Array.isArray(a.data) ? a.data.reduce((acc, d) => acc + (d.value || 0), 0) : 0;
      const bSum = Array.isArray(b.data) ? b.data.reduce((acc, d) => acc + (d.value || 0), 0) : 0;
      return bSum - aSum;
    });
    topCategory = sorted[0]?.subreddit || "-";
  }

  const analyticsData = {
    totalPosts: Array.isArray(data?.timeSeries) ? data.timeSeries.reduce((acc, d) => acc + (d.posts || 0), 0) : 0,
    totalPostUpvotes: Array.isArray(data?.posts) ? data.posts.reduce((acc, p) => acc + (p.upvotes || 0), 0) : 0,
    totalCommentUpvotes: Array.isArray(data?.comments) ? data.comments.reduce((acc, c) => acc + (c.upvotes || 0), 0) : 0,
    totalComments: Array.isArray(data?.timeSeries) ? data.timeSeries.reduce((acc, d) => acc + (d.comments || 0), 0) : 0,
    avgEngagementRate: data?.metrics?.avgEngagement ? `${data.metrics.avgEngagement}%` : "0%",
    topPerformingCategory: topCategory,
    monthlyGrowth: "+0%"
  };

  // --- Recent Performance ---
  const recentMetrics = Array.isArray(data?.timeSeries)
    ? data.timeSeries.slice(-4).reverse().map((metric) => ({
        period: metric.date,
        posts: metric.posts || 0,
        postUpvotes: metric.post_upvotes || 0,
        commentUpvotes: metric.comment_upvotes || 0,
        comments: metric.comments || 0,
        engagement: data?.metrics?.avgEngagement ? `${data.metrics.avgEngagement}%` : "0%"
      }))
    : [];

  // --- Category Performance ---
  const categoryPerformance = Array.isArray(data?.heatmap)
    ? data.heatmap.map(cat => {
        const totalPosts = Array.isArray(cat.data) ? cat.data.reduce((acc, d) => acc + (d.value || 0), 0) : 0;
        const avgUpvotes = Array.isArray(cat.data) && cat.data.length
          ? Math.round(cat.data.reduce((acc, d) => acc + (d.upvotes || 0), 0) / cat.data.length)
          : 0;
        const avgComments = Array.isArray(cat.data) && cat.data.length
          ? Math.round(cat.data.reduce((acc, d) => acc + (d.comments || 0), 0) / cat.data.length)
          : 0;
        return {
          category: cat.subreddit,
          posts: totalPosts,
          avgUpvotes,
          avgComments,
          performance: totalPosts > 10 ? "High" : "Medium"
        };
      })
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        {/* Range Switcher */}
        <div className="flex gap-4 mb-6">
          {["30", "365", "all"].map(r => (
            <button
              key={r}
              className={`px-4 py-2 rounded-lg border ${range === r ? "bg-primary text-white" : "bg-background"}`}
              onClick={() => setRange(r)}
            >
              {r === "30" ? "Last 30 Days" : r === "365" ? "Last 365 Days" : "All"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">Loading analytics...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Error: {error}</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Posts</p><p className="text-2xl font-bold">{analyticsData.totalPosts}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Post Upvotes</p><p className="text-2xl font-bold">{analyticsData.totalPostUpvotes}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Comments</p><p className="text-2xl font-bold">{analyticsData.totalComments}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Comment Upvotes</p><p className="text-2xl font-bold">{analyticsData.totalCommentUpvotes}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Avg Engagement</p><p className="text-2xl font-bold">{analyticsData.avgEngagementRate}</p></CardContent></Card>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <PostAnalyticsTable threads={(data?.posts || []).map((t, i) => ({
                id: i,
                title: t.post_title,
                subreddit: t.subreddit,
                upvotes: t.upvotes || 0,
                comments: t.total_comments || 0,
                age: getAgeString(t.post_age_hours),
                sentiment: t.upvotes > 0 ? 'positive' : (t.upvotes < 0 ? 'negative' : 'neutral'),
                priority: (t.upvotes + t.total_comments) > 10 ? 'high' : 'medium',
                post_url: t.post_url
              }))} />

              <CommentsAnalyticsTable threads={(data?.comments || []).map((t, i) => ({
                id: i,
                title: t.comment_body,
                subreddit: t.subreddit,
                upvotes: t.upvotes || 0,
                comments: t.comments || 0,
                age: getAgeString(t.post_age_hours),
                sentiment: t.upvotes > 0 ? 'positive' : (t.upvotes < 0 ? 'negative' : 'neutral'),
                priority: t.upvotes > 10 ? 'high' : 'medium',
                post_url: t.comment_url
              }))} />
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader><CardTitle>Recent Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMetrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{metric.period}</p>
                          <p className="text-sm text-muted-foreground">{metric.posts} posts</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            <span className="text-approved">{metric.postUpvotes} post upvotes</span> •
                            <span className="text-live ml-1">{metric.commentUpvotes} comment upvotes</span> •
                            <span className="ml-1">{metric.comments} comments</span>
                          </p>
                          <p className="text-sm font-medium">{metric.engagement} engagement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Category Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryPerformance.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{cat.category}</p>
                          <p className="text-sm text-muted-foreground">{cat.posts} posts</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            <span className="text-approved">~{cat.avgUpvotes} upvotes</span> •
                            <span className="text-live ml-1">~{cat.avgComments} comments</span>
                          </p>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            cat.performance === 'High' ? 'bg-approved text-approved-foreground' :
                            cat.performance === 'Medium' ? 'bg-pending text-pending-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>{cat.performance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <Card>
              <CardHeader><CardTitle>Performance Summary</CardTitle></CardHeader>
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
                    <p className="text-2xl font-bold text-live">{analyticsData.totalPostUpvotes + analyticsData.totalCommentUpvotes}</p>
                    <p className="text-sm text-muted-foreground">Total Engagement (Upvotes)</p>
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