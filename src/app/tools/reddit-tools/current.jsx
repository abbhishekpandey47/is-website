"use client";
import { useEffect, useRef, useState } from "react";
import CurrentHeader from "./components/competitor/CurrentHeader";
import Pagination from "./components/competitor/Pagination";
import { CommentsList, PostsList } from "./components/competitor/PostsList";
import ResultsTabs from "./components/competitor/ResultsTabs";
import SearchPanel from "./components/competitor/SearchPanel";
import StatsCards from "./components/competitor/StatsCards";
import { loadLastBrandEntry } from "./utils/cache";

const API_BASE = "https://reddit-comment-gen.onrender.com"; // adjust if env variable available

export default function Current() {
  // Add missing handleSearch function
  function handleSearch() {
    // TODO: Implement search logic here
    // For now, just set loading to true and then false
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  // Time range filtering (frontend only)
  const [timeRange, setTimeRange] = useState('all'); // default to All
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  // time range filtering helper placed before usage
  function filterByTime(arr) {
    if (!timeRange || timeRange === 'all') return arr;
    const now = Date.now();
    if (timeRange !== 'custom') {
      const limits = { '24h': 24, '7d': 24*7, '30d': 24*30, '90d': 24*90, '1y': 24*365 };
      const maxH = limits[timeRange];
      if (!maxH) return arr;
      return arr.filter(i => (i.post_age_hours || 0) <= maxH);
    }
    if (!customFrom && !customTo) return arr;
    const startTs = customFrom ? new Date(customFrom + 'T00:00:00Z').getTime() : 0;
    const endTs = customTo ? new Date(customTo + 'T23:59:59Z').getTime() : now;
    return arr.filter(i => {
      const ageH = i.post_age_hours || 0;
      const createdTs = now - ageH * 3600 * 1000;
      return createdTs >= startTs && createdTs <= endTs;
    });
  }
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
    // You can use entry to set initial state if needed
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
  <div className="glass-card px-8 py-6 rounded-xl shadow-md mb-8 animate-fade-in text-white">
            <CurrentHeader />
        </div>
  <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6 bg-background text-white">
          <SearchPanel brand={brand} setBrand={setBrand} onSearch={handleSearch} loading={loading} />
        </div>
  <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6 bg-background text-white">
          <StatsCards posts={posts} comments={comments} loading={loading} />
        </div>
  <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6 bg-background text-white">
          <ResultsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
  <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6 bg-background text-white">
          <div className="mt-6">
            {activeTab === "posts" ? (
              <PostsList posts={posts} loading={loading} error={error} textClass="text-white" />
            ) : (
              <CommentsList comments={comments} loading={loading} error={error} textClass="text-white" />
            )}
          </div>
        </div>
  <div className="glass-card rounded-xl shadow-md border border-border-muted mb-12 animate-fade-in p-6 bg-background text-white">
          <Pagination
            postsPage={postsPage}
            setPostsPage={setPostsPage}
            commentsPage={commentsPage}
            setCommentsPage={setCommentsPage}
            posts={posts}
            comments={comments}
            PAGE_SIZE={PAGE_SIZE}
            textClass="text-white"
          />
        </div>
      </div>
    </div>
  );
}
