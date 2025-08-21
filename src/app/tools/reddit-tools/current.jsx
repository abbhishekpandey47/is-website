"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import CurrentHeader from "./components/competitor/CurrentHeader";
import { CommentsList, PostsList } from "./components/competitor/PostsList";
import ResultsTabs from "./components/competitor/ResultsTabs";
import SearchPanel from "./components/competitor/SearchPanel";
import StatsCards from "./components/competitor/StatsCards";
import { loadLastBrandEntry, saveCurrentMentions } from "./utils/cache";

const API_BASE = "https://reddit-comment-gen.onrender.com"; // adjust if env variable available

export default function Current() {
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [showResults, setShowResults] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  // pagination + progressive loading state
  const [postsAfter, setPostsAfter] = useState(null); // pagination cursor (if backend supports)
  const [commentsAfter, setCommentsAfter] = useState(null);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [done, setDone] = useState(false);
  // virtualization counts
  const [visiblePosts, setVisiblePosts] = useState(25);
  const [visibleComments, setVisibleComments] = useState(25);
  const sentinelRef = useRef(null);

  const resetState = () => {
    setPosts([]);
    setComments([]);
    setPostsAfter(null);
    setCommentsAfter(null);
    setVisiblePosts(25);
    setVisibleComments(25);
    setDone(false);
  };

  // restore last brand (if within TTL) on mount
  useEffect(() => {
    const entry = loadLastBrandEntry();
    if (entry) {
      setBrand(entry.brand || '');
      setPosts(entry.posts || []);
      setComments(entry.comments || []);
      setPostsAfter(entry.postsAfter || null);
      setCommentsAfter(entry.commentsAfter || null);
      setDone(!!entry.done);
      setShowResults(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (value) => {
    setBrand(value);
    setActiveTab("posts");
    setError("");
    setLoading(true);
    setShowResults(false);
    resetState();
    // abort previous
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      // Backend now provides pagination on /search_company_mentions directly
      const endpoint = `${API_BASE}/search_company_mentions`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_name: value, limit_posts: 50, limit_comments: 50 }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Request failed (${res.status}) ${txt}`);
      }
      const data = await res.json();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setComments(Array.isArray(data.comments) ? data.comments : []);
      setPostsAfter(data.posts_after || null);
      setCommentsAfter(data.comments_after || null);
      if (!data.posts_after && !data.comments_after) setDone(true);
  setShowResults(true);
  saveCurrentMentions(value, { posts: data.posts, comments: data.comments, postsAfter: data.posts_after, commentsAfter: data.comments_after, done: !data.posts_after && !data.comments_after });
    } catch (e) {
      if (e.name === "AbortError") return; // silent
      setError(e.message || "Failed fetching mentions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subsequent batches in background (poll-style) if pagination cursors exist
  const fetchNextBatch = async () => {
    if (backgroundLoading || done) return;
    if (!postsAfter && !commentsAfter) return;
    setBackgroundLoading(true);
    try {
      const res = await fetch(`${API_BASE}/search_company_mentions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: brand,
          posts_after: postsAfter,
          comments_after: commentsAfter,
          limit_posts: 50,
          limit_comments: 50,
        }),
      });
      if (!res.ok) {
        setError((prev) => prev || `Background fetch failed (${res.status})`);
        setDone(true);
        return;
      }
      const data = await res.json();
  let newPosts = posts;
  let newComments = comments;
  if (Array.isArray(data.posts) && data.posts.length) newPosts = [...posts, ...data.posts];
  if (Array.isArray(data.comments) && data.comments.length) newComments = [...comments, ...data.comments];
  if (newPosts !== posts) setPosts(newPosts);
  if (newComments !== comments) setComments(newComments);
  setPostsAfter(data.posts_after || null);
  setCommentsAfter(data.comments_after || null);
  if (!data.posts_after && !data.comments_after) setDone(true);
  saveCurrentMentions(brand, { posts: newPosts, comments: newComments, postsAfter: data.posts_after, commentsAfter: data.comments_after, done: !data.posts_after && !data.comments_after });
    } catch (e) {
      setError((prev) => prev || e.message || "Background fetch error");
      setDone(true);
    } finally {
      setBackgroundLoading(false);
    }
  };

  // Poll every 2s while cursors remain
  useEffect(() => {
    if (!brand || done || loading) return;
    if (!postsAfter && !commentsAfter) return;
    const id = setTimeout(fetchNextBatch, 2000);
    return () => clearTimeout(id);
  }, [postsAfter, commentsAfter, done, brand, loading]);

  // Infinite scroll: reveal more of already-fetched items
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (activeTab === "posts") {
              setVisiblePosts((v) => Math.min(v + 25, posts.length));
            } else {
              setVisibleComments((v) => Math.min(v + 25, comments.length));
            }
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab, posts.length, comments.length]);

  const stats = useMemo(() => {
    if (!showResults) return { totalPosts: 0, totalComments: 0, uniqueSubs: 0, totalUpvotes: 0 };
    const subs = new Set();
    posts.forEach((p) => subs.add(p.subreddit));
    comments.forEach((c) => subs.add(c.subreddit));
    return {
      totalPosts: posts.length,
      totalComments: comments.length,
      uniqueSubs: subs.size,
      totalUpvotes: [...posts, ...comments].reduce((a, b) => a + (b.upvotes || 0), 0),
    };
  }, [showResults, posts, comments]);

  return (
    <div className="flex-1 min-h-screen bg-gray-50 pb-16">
  <CurrentHeader />
  <SearchPanel onSearch={handleSearch} loading={loading} buttonLabel="Search Mentions" />
      {error && (
        <div className="px-6 mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">{error}</div>
      )}
      <StatsCards stats={stats} visible={showResults} />
      {showResults && (
        <div className="px-6 mt-2 text-[11px] text-gray-900 flex flex-wrap gap-4 items-center">
          <span className="text-black font-medium">Loaded {posts.length} posts / {comments.length} comments</span>
          {!done && (postsAfter || commentsAfter) && (
            <span className="inline-flex items-center gap-1 text-blue-600">Fetching more<span className="h-3 w-3 inline-block animate-spin rounded-full border-2 border-blue-300 border-t-transparent" /></span>
          )}
          {done && <span className="text-emerald-600">All results loaded</span>}
          {backgroundLoading && <span className="text-gray-400">(background)</span>}
        </div>
      )}
      <ResultsTabs
        active={activeTab}
        setActive={setActiveTab}
        counts={{ posts: posts.length, comments: comments.length }}
        visible={showResults}
      />
      <PostsList posts={posts.slice(0, visiblePosts)} visible={showResults && activeTab === "posts"} />
      <CommentsList comments={comments.slice(0, visibleComments)} visible={showResults && activeTab === "comments"} />
      {showResults && (
        <div ref={sentinelRef} className="h-8" />
      )}
      {showResults && !done && !(postsAfter || commentsAfter) && posts.length + comments.length > 0 && (
        <div className="px-6 mt-6 text-center">
          <button
            onClick={fetchNextBatch}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Load more
          </button>
        </div>
      )}
      {!showResults && !loading && (
        <div className="px-6 mt-14 text-center text-sm text-gray-500">
          Enter a brand above to view current Reddit mentions.
        </div>
      )}
      {loading && (
        <div className="px-6 mt-14 text-center text-sm text-gray-500 animate-pulse">
          Fetching mentions for {brand || "brand"}...
        </div>
      )}
    </div>
  );
}
