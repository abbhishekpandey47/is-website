"use client";
import { auth } from '@/lib/firebaseClient';
import { useEffect, useState } from "react";
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

  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hydrate from session cache on client only (avoids SSR mismatch)
  useEffect(() => {
    const cached = session.get("analyticsDataV2");
    if (cached) {
      setAnalyticsData(cached);
      setLoading(false);
    }
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-geist flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[rgba(255,255,255,0.06)] border-t-[#ededed] animate-spin" />
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-geist flex items-center justify-center">
        <p className="text-[13px] text-[#f87171]">Error: {error}</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-geist flex items-center justify-center">
        <p className="text-[13px] text-[rgba(255,255,255,0.4)]">No data yet.</p>
      </div>
    );
  }

  const postsBlock = analyticsData.posts ?? { items: [], total: 0, page: 1, totalPages: 1 };
  const commentsBlock = analyticsData.comments ?? { items: [], total: 0, page: 1, totalPages: 1 };

  const posts = postsBlock.items || [];
  const comments = commentsBlock.items || [];

  const totalPostsPage = posts.length;
  const totalPostUpvotesPage = posts.reduce((acc, t) => acc + (t?.upvotes ?? 0), 0);
  const totalCommentsPage = comments.length;
  const totalCommentUpvotesPage = comments.reduce((acc, c) => acc + (c?.top_comment?.score ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                <BarChart3 className="h-5 w-5 text-[#ededed]" />
              </div>
              <div>
                <h1 className="text-[16px] font-semibold text-[#ededed]">Reddit Analytics</h1>
                <p className="text-[13px] text-[rgba(255,255,255,0.4)]">
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

      <div className="p-6 animate-fade-up">
        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-1">Posts (this page)</p>
            <p className="text-[28px] font-semibold tracking-[-0.02em] tabular-nums text-[#ededed]">{totalPostsPage}</p>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-1">Post Upvotes (this page)</p>
            <p className="text-[28px] font-semibold tracking-[-0.02em] tabular-nums text-[#ededed]">{totalPostUpvotesPage}</p>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-1">Comments (this page)</p>
            <p className="text-[28px] font-semibold tracking-[-0.02em] tabular-nums text-[#ededed]">{totalCommentsPage}</p>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-1">Comment Upvotes (this page)</p>
            <p className="text-[28px] font-semibold tracking-[-0.02em] tabular-nums text-[#ededed]">{totalCommentUpvotesPage}</p>
          </div>
        </div>

        {/* Tables + pagination */}
        <div className="grid grid-cols-1 gap-6 mb-8">
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
            <p className="text-[13px] text-[rgba(255,255,255,0.4)]">
              Page {postsBlock.page} of {postsBlock.totalPages} &bull; {postsBlock.total} total
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-md text-[13px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-30 transition-colors"
                onClick={() => setPostsPage(p => Math.max(1, p - 1))}
                disabled={postsBlock.page <= 1}
              >
                Prev
              </button>
              <button
                className="px-3 py-1.5 rounded-md text-[13px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-30 transition-colors"
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
            <p className="text-[13px] text-[rgba(255,255,255,0.4)]">
              Page {commentsBlock.page} of {commentsBlock.totalPages} &bull; {commentsBlock.total} total
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-md text-[13px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-30 transition-colors"
                onClick={() => setCommentsPage(p => Math.max(1, p - 1))}
                disabled={commentsBlock.page <= 1}
              >
                Prev
              </button>
              <button
                className="px-3 py-1.5 rounded-md text-[13px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-30 transition-colors"
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
