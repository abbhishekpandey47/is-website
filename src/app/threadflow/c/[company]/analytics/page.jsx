"use client";
import { auth } from '@/lib/firebaseClient';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
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

const PAGE_SIZE = 10;

export default function AnalyticsPage() {
  const [postsPage, setPostsPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);

  const cached = session.get("analyticsDataV2");
  const [analyticsData, setAnalyticsData] = useState(cached ?? null);
  const [loading, setLoading] = useState(!Boolean(cached));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (analyticsData) session.set("analyticsDataV2", analyticsData);
  }, [analyticsData]);

  useEffect(() => {
    let aborted = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        let user = auth.currentUser;
        if (!user) {
          await new Promise(r => setTimeout(r, 120));
          user = auth.currentUser;
        }
        if (!user) throw new Error('Not authenticated');
        const token = await user.getIdToken();

        const qs = new URLSearchParams({
          pagePosts: String(postsPage),
          pageSizePosts: String(PAGE_SIZE),
          pageComments: String(commentsPage),
          pageSizeComments: String(PAGE_SIZE),
        });

        const resp = await fetch(`/api/analytics?${qs.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error('Failed to fetch analytics data');

        const json = await resp.json();
        if (!aborted) setAnalyticsData(json?.data ?? null);
      } catch (e) {
        if (!aborted) setError(e?.message ?? 'Something went wrong');
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => { aborted = true; };
  }, [postsPage, commentsPage]);

  if (loading) return <div className="text-center py-12">Loading analytics...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!analyticsData) return <div className="text-center py-12">No data yet.</div>;

  const postsBlock = analyticsData.posts ?? { items: [], total: 0, page: 1, totalPages: 1 };
  const commentsBlock = analyticsData.comments ?? { items: [], total: 0, page: 1, totalPages: 1 };

  const posts = postsBlock.items || [];
  const comments = commentsBlock.items || [];

  const totalPostsPage = posts.length;
  const totalPostUpvotesPage = posts.reduce((acc, t) => acc + (t?.upvotes ?? 0), 0);
  const totalCommentsPage = comments.length;
  const totalCommentUpvotesPage = comments.reduce((acc, c) => acc + (c?.top_comment?.score ?? 0), 0);

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
                  Track how your posts and comments perform (10 per page)
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
        {/* Page metrics (current page only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Posts (this page)</p>
            <p className="text-2xl font-bold">{totalPostsPage}</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Post Upvotes (this page)</p>
            <p className="text-2xl font-bold">{totalPostUpvotesPage}</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Comments (this page)</p>
            <p className="text-2xl font-bold">{totalCommentsPage}</p>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Comment Upvotes (this page)</p>
            <p className="text-2xl font-bold">{totalCommentUpvotesPage}</p>
          </CardContent></Card>
        </div>

        {/* Tables + pagination */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <PostAnalyticsTable
            threads={posts.map((t, i) => ({
              id: i,
              title: t?.post_title || t?.title || "-",
              subreddit: t?.targeted_subreddit || t?.subreddit || "-",
              upvotes: t?.upvotes || 0,
              comments: t?.total_comments || 0,
              age: getAgeString(t?.post_age_hours),
              sentiment: (t?.upvotes ?? 0) > 0 ? "positive" : (t?.upvotes ?? 0) < 0 ? "negative" : "neutral",
              post_url: t?.post_url || "#",
            }))}
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {postsBlock.page} of {postsBlock.totalPages} • {postsBlock.total} total
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 border rounded disabled:opacity-50"
                onClick={() => setPostsPage(p => Math.max(1, p - 1))}
                disabled={postsBlock.page <= 1}
              >
                Prev
              </button>
              <button
                className="px-3 py-1.5 border rounded disabled:opacity-50"
                onClick={() => setPostsPage(p => Math.min(postsBlock.totalPages, p + 1))}
                disabled={postsBlock.page >= postsBlock.totalPages}
              >
                Next
              </button>
            </div>
          </div>

          <CommentsAnalyticsTable
            threads={comments.map((c, i) => ({
              id: i,
              title: c?.top_comment?.body || "-",
              subreddit: c?.subreddit || "-",
              upvotes: c?.top_comment?.score || 0,
              comments: 0,
              age: "",
              sentiment:
                (c?.top_comment?.score ?? 0) > 0 ? "positive" :
                (c?.top_comment?.score ?? 0) < 0 ? "negative" : "neutral",
              post_url: c?.comment_url || "#",
            }))}
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {commentsBlock.page} of {commentsBlock.totalPages} • {commentsBlock.total} total
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 border rounded disabled:opacity-50"
                onClick={() => setCommentsPage(p => Math.max(1, p - 1))}
                disabled={commentsBlock.page <= 1}
              >
                Prev
              </button>
              <button
                className="px-3 py-1.5 border rounded disabled:opacity-50"
                onClick={() => setCommentsPage(p => Math.min(commentsBlock.totalPages, p + 1))}
                disabled={commentsBlock.page >= commentsBlock.totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
