"use client";
import { auth } from '@/lib/firebaseClient';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import PostAnalyticsTable from './components/postAnalytics';
import CommentsAnalyticsTable from './components/commentAnalytics';
import { UserProfile } from '@/Components/UserProfile';
import { SidebarTrigger } from '@/Components/ui/sidebar';
import { BarChart3 } from 'lucide-react';
import session from "@/app/tools/utils/session";

function getAgeString(hours) {
  if (hours == null || Number.isNaN(hours)) return "";
  if (hours <= 0) return "0h";
  if (hours < 24) return `${Math.round(hours)}h`;
  if (hours < 24 * 7) return `${Math.round(hours / 24)}d`;
  return `${Math.round(hours / (24 * 7))}w`;
}

const AnalyticsPage = () => {
  const initialCache = session.get("analyticsData") ?? null;
  const [analyticsData, setAnalyticsData] = useState(initialCache);
  const [loading, setLoading] = useState(!Boolean(initialCache));
  const [error, setError] = useState(null);

  // Persist to session whenever analyticsData changes
  useEffect(() => {
    if (analyticsData) {
      session.set("analyticsData", analyticsData);
    }
  }, [analyticsData]);

  useEffect(() => {
    let aborted = false;

    const fetchData = async () => {
      if (analyticsData) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let user = auth.currentUser;
        if (!user) {
          // brief wait for Firebase to hydrate currentUser
          await new Promise(r => setTimeout(r, 100));
          user = auth.currentUser;
        }
        if (!user) throw new Error('Not authenticated');

        const token = await user.getIdToken();

        const controller = new AbortController();
        const resp = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        });

        if (!resp.ok) throw new Error('Failed to fetch analytics data');

        const json = await resp.json();
        if (!aborted) {
          setAnalyticsData(json && json.data ? json.data : null);
        }
      } catch (e) {
        if (!aborted) setError(e && e.message ? e.message : 'Something went wrong');
      } finally {
        if (!aborted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      aborted = true;
    };
  }, []); // run once

  if (loading) return <div className="text-center py-12">Loading analytics...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!analyticsData) return <div className="text-center py-12">No data yet.</div>;

  const posts = analyticsData.posts || [];
  const comments = analyticsData.comments || [];

  const totalPosts = posts.length;
  const totalPostUpvotes = posts.reduce((acc, t) => acc + (t && t.upvotes ? t.upvotes : 0), 0);
  const totalComments = comments.length;
  const totalCommentUpvotes = comments.reduce(
    (acc, c) => acc + (c && c.top_comment && c.top_comment.score ? c.top_comment.score : 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Reddit Analytics</h1>
                <p className="text-sm text-muted-foreground">
                  Track how your Reddit posts and comments perform over time
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-bold">{totalPosts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Post Upvotes</p>
              <p className="text-2xl font-bold">{totalPostUpvotes}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Comments</p>
              <p className="text-2xl font-bold">{totalComments}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Comment Upvotes</p>
              <p className="text-2xl font-bold">{totalCommentUpvotes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PostAnalyticsTable
            threads={posts.map((t, i) => ({
              id: i,
              title: (t && (t.post_title || t.title)) || "-",
              subreddit: (t && (t.targeted_subreddit || t.subreddit)) || "-",
              upvotes: (t && t.upvotes) || 0,
              comments: (t && t.total_comments) || 0,
              age: getAgeString(t && t.post_age_hours),
              sentiment:
                t && t.upvotes > 0
                  ? "positive"
                  : t && t.upvotes < 0
                  ? "negative"
                  : "neutral",
              post_url: (t && t.post_url) || "#"
            }))}
          />

          <CommentsAnalyticsTable
            threads={comments.map((c, i) => ({
              id: i,
              title: (c && c.top_comment && c.top_comment.body) || "-",
              subreddit: (c && c.subreddit) || "-",
              upvotes: (c && c.top_comment && c.top_comment.score) || 0,
              comments: 0,
              age: "",
              sentiment:
                c && c.top_comment && c.top_comment.score > 0
                  ? "positive"
                  : c && c.top_comment && c.top_comment.score < 0
                  ? "negative"
                  : "neutral",
              post_url: (c && c.comment_url) || "#"
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
