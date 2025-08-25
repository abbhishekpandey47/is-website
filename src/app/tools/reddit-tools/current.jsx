"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import CurrentHeader from "./components/competitor/CurrentHeader";
import Pagination from "./components/competitor/Pagination";
import { CommentsList, PostsList } from "./components/competitor/PostsList";
import ResultsTabs from "./components/competitor/ResultsTabs";
import SearchPanel from "./components/competitor/SearchPanel";
import StatsCards from "./components/competitor/StatsCards";
import { loadLastBrandEntry, saveCurrentMentions } from "./utils/cache";
import { fetchWithRetry } from "./utils/fetchWithRetry";

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
  // pagination pages (1-based) & page size
  const PAGE_SIZE = 15; // updated page size
  const [postsPage, setPostsPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);
  const [fromCache, setFromCache] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [pollDelay, setPollDelay] = useState(2000);
  const consecutiveNoNewRef = useRef(0);
  const postsSetRef = useRef(new Set());
  const commentsSetRef = useRef(new Set());
  // removed infinite scroll sentinel

  const resetState = () => {
    setPosts([]);
    setComments([]);
    setPostsAfter(null);
    setCommentsAfter(null);
  setPostsPage(1);
  setCommentsPage(1);
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
      setFromCache(true);
      // seed sets
      (entry.posts||[]).forEach(p=> postsSetRef.current.add(p.post_url));
      (entry.comments||[]).forEach(c=> commentsSetRef.current.add(c.comment_url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (value, { forceRefresh = false } = {}) => {
    if (!forceRefresh && value === brand && showResults && done) return; // avoid redundant fetch
    setBrand(value);
  setActiveTab("posts");
  setPostsPage(1);
  setCommentsPage(1);
    setError("");
    setLoading(true);
    setShowResults(false);
    resetState();
    postsSetRef.current.clear();
    commentsSetRef.current.clear();
    consecutiveNoNewRef.current = 0;
    setPollDelay(2000);
    setStopped(false);
    setFromCache(false);
    // abort previous
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const endpoint = `${API_BASE}/search_company_mentions`;
      const data = await fetchWithRetry(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_name: value, limit_posts: 50, limit_comments: 50 }),
        signal: controller.signal,
        retries: 2
      });
      const newPosts = Array.isArray(data.posts) ? data.posts : [];
      const newComments = Array.isArray(data.comments) ? data.comments : [];
      newPosts.forEach(p=> postsSetRef.current.add(p.post_url));
      newComments.forEach(c=> commentsSetRef.current.add(c.comment_url));
      setPosts(newPosts);
      setComments(newComments);
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
    if (backgroundLoading || done || stopped) return;
    if (!postsAfter && !commentsAfter) return;
    setBackgroundLoading(true);
    try {
      const data = await fetchWithRetry(`${API_BASE}/search_company_mentions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: brand,
          posts_after: postsAfter,
          comments_after: commentsAfter,
          limit_posts: 50,
          limit_comments: 50,
        }),
        retries: 2
      });
  let newPosts = posts;
  let newComments = comments;
  let added = 0;
  if (Array.isArray(data.posts) && data.posts.length) {
    const fresh = data.posts.filter(p=> !postsSetRef.current.has(p.post_url));
    if (fresh.length) {
      fresh.forEach(p=> postsSetRef.current.add(p.post_url));
      newPosts = [...posts, ...fresh];
      added += fresh.length;
    }
  }
  if (Array.isArray(data.comments) && data.comments.length) {
    const fresh = data.comments.filter(c=> !commentsSetRef.current.has(c.comment_url));
    if (fresh.length) {
      fresh.forEach(c=> commentsSetRef.current.add(c.comment_url));
      newComments = [...comments, ...fresh];
      added += fresh.length;
    }
  }
  if (newPosts !== posts) setPosts(newPosts);
  if (newComments !== comments) setComments(newComments);
  setPostsAfter(data.posts_after || null);
  setCommentsAfter(data.comments_after || null);
  if (!data.posts_after && !data.comments_after) setDone(true);
  saveCurrentMentions(brand, { posts: newPosts, comments: newComments, postsAfter: data.posts_after, commentsAfter: data.comments_after, done: !data.posts_after && !data.comments_after });
      // adjust polling/backoff
      if (added === 0) {
        consecutiveNoNewRef.current += 1;
        setPollDelay(d => Math.min(d * 1.5, 15000));
        if (consecutiveNoNewRef.current >= 3) {
          setStopped(true);
          setDone(true);
        }
      } else {
        consecutiveNoNewRef.current = 0;
        setPollDelay(2000);
      }
    } catch (e) {
      setError((prev) => prev || e.message || "Background fetch error");
      setDone(true);
    } finally {
      setBackgroundLoading(false);
    }
  };

  // Poll every 2s while cursors remain
  useEffect(() => {
    if (!brand || done || loading || stopped) return;
    if (!postsAfter && !commentsAfter) return;
    const id = setTimeout(fetchNextBatch, pollDelay);
    return () => clearTimeout(id);
  }, [postsAfter, commentsAfter, done, brand, loading, pollDelay, stopped]);


  // Adjust current page when data shrinks (unlikely) or grows so page index stays valid
  useEffect(() => {
    const totalPostPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    if (postsPage > totalPostPages) setPostsPage(totalPostPages);
  }, [posts.length, postsPage]);
  useEffect(() => {
    const totalCommentPages = Math.max(1, Math.ceil(comments.length / PAGE_SIZE));
    if (commentsPage > totalCommentPages) setCommentsPage(totalCommentPages);
  }, [comments.length, commentsPage]);

  // When switching tab, ensure we don't show empty page beyond data length
  useEffect(() => {
    if (activeTab === 'posts') {
      const tp = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
      if (postsPage > tp) setPostsPage(tp);
    } else {
      const tp = Math.max(1, Math.ceil(comments.length / PAGE_SIZE));
      if (commentsPage > tp) setCommentsPage(tp);
    }
  }, [activeTab, posts.length, comments.length, postsPage, commentsPage]);

  const pagedPosts = useMemo(() => {
    const start = (postsPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, postsPage]);
  const pagedComments = useMemo(() => {
    const start = (commentsPage - 1) * PAGE_SIZE;
    return comments.slice(start, start + PAGE_SIZE);
  }, [comments, commentsPage]);

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
        <div className="px-6 mt-2 text-[11px] text-gray-900 flex flex-wrap gap-4 items-center" aria-live="polite">
          <span className="text-black font-medium">Loaded {posts.length} posts / {comments.length} comments</span>
          {fromCache && <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700">cached</span>}
          {!done && !stopped && (postsAfter || commentsAfter) && (
            <span className="inline-flex items-center gap-1 text-blue-600">Fetching more<span className="h-3 w-3 inline-block animate-spin rounded-full border-2 border-blue-300 border-t-transparent" /></span>
          )}
          {stopped && !done && <span className="text-orange-600">paused</span>}
          {done && <span className="text-emerald-600">All results loaded</span>}
          {backgroundLoading && <span className="text-gray-400">(background)</span>}
          <button onClick={() => handleSearch(brand, { forceRefresh: true })} className="ml-2 inline-flex items-center px-2 py-1 bg-gray-800 text-white rounded hover:bg-black">Refresh</button>
          {!stopped && !done && (postsAfter || commentsAfter) && (
            <button onClick={() => setStopped(true)} className="inline-flex items-center px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Stop</button>
          )}
          {stopped && !done && (
            <button onClick={() => { setStopped(false); setPollDelay(2000); }} className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Resume</button>
          )}
        </div>
      )}
      <ResultsTabs
        active={activeTab}
        setActive={setActiveTab}
        counts={{ posts: posts.length, comments: comments.length }}
        visible={showResults}
      />
      <PostsList posts={pagedPosts} visible={showResults && activeTab === "posts"} />
      {showResults && activeTab === 'posts' && (
        <Pagination
          page={postsPage}
          totalItems={posts.length}
            pageSize={PAGE_SIZE}
            loading={backgroundLoading}
            onPageChange={(p) => setPostsPage(p)}
        />
      )}
      <CommentsList comments={pagedComments} visible={showResults && activeTab === "comments"} />
      {showResults && activeTab === 'comments' && (
        <Pagination
          page={commentsPage}
          totalItems={comments.length}
          pageSize={PAGE_SIZE}
          loading={backgroundLoading}
          onPageChange={(p) => setCommentsPage(p)}
        />
      )}
      {showResults && !done && !(postsAfter || commentsAfter) && posts.length + comments.length > 0 && (
        <div className="px-6 mt-6 text-center text-xs text-gray-500">All currently fetched results shown. (Pagination updates as new results arrive.)</div>
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
