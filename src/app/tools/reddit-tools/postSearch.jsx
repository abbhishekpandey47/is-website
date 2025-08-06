import { ArrowUp, Clock, MessageCircle, Search } from 'lucide-react';
import { useState } from 'react';

export default function PostSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = "https://reddit-comment-gen.onrender.com/find_reddit_post";

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPosts([]);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: searchQuery.split(",").map(k => k.trim()).filter(Boolean) })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setError(errData?.detail || "Failed to fetch posts.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      // Flatten results to a single posts array
      const fetchedPosts = data.results
        ? data.results.flatMap(group =>
            Object.values(group).flatMap(postsArr => postsArr.map((post, idx) => ({
              id: post.post_url + idx,
              subreddit: `r/${post.subreddit}`,
              timeAgo: post.post_age_hours ? `${post.post_age_hours} hours ago` : '',
              title: post.post_title,
              description: post.post_summary || post.post_content || '',
              tags: [post.subreddit, ...(post.post_title ? post.post_title.split(' ').slice(0,2) : [])],
              upvotes: post.upvotes,
              comments: post.total_comments,
              post_url: post.post_url
            }))
          )
        ) : [];
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reddit Post Search</h1>
            <p className="text-gray-600">Search and discover high-quality Reddit content</p>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <div className="md:flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter keywords to search for posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 stroke-gray-700" />
              </div>
              <div className='flex items-center justify-center mt-4 md:mt-0'>
                <button
                  className="ml-4 px-6 py-3 bg-[#3c4199] hover:bg-[#3c4199]/90 text-white font-medium rounded-lg transition-colors min-w-[120px] flex items-center justify-center"
                  onClick={handleSearch}
                  disabled={loading || !searchQuery.trim()}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="loader inline-block w-5 h-5 rounded-full border-4 animate-spin border-white border-t-[#3c4199]" />
                      <span>Searching...</span>
                    </span>
                  ) : "Search Posts"}
                </button>
              </div>
            </div>
            {error && <div className="text-red-400 mt-2">{error}</div>}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Post Header */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="font-medium text-gray-700">{post.subreddit}</span>
                  <span className="mx-2 text-black">•</span>
                  <Clock className="w-4 h-4 mr-1 stroke-gray-600" />
                  <span className='text-black'>{post.timeAgo}</span>
                </div>
                {/* Post Title */}
                <a href={post.post_url} target="_blank" rel="noopener noreferrer">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h2>
                </a>
                {/* Post Details (summary/content) - always show section */}
                <div className="mb-4">
                  <div className="font-semibold text-gray-800 mb-1">Post Details:</div>
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                    {post.description?.trim()
                      ? post.description
                      : (post.post_summary?.trim() || post.post_content?.trim() || "No details available for this post.")}
                  </div>
                </div>
                {/* Post Stats */}
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 stroke-gray-600" />
                    <span className="text-sm font-medium text-black">{post.upvotes} upvotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 stroke-gray-600" />
                    <span className="text-sm font-medium text-black">{post.comments} comments</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No results yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
