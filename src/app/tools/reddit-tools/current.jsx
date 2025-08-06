import { useState } from 'react';

const API_BASE = "https://reddit-comment-gen.onrender.com";

export default function Current() {
  const [redditUrl, setRedditUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/fetch_post_details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reddit_url: redditUrl })
      });
      if (!res.ok) throw new Error("Failed to fetch post details");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Error fetching post details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Check Current Mentions</h1>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Brand Name or Website
              </label>
              <input
                type="text"
                placeholder="YourBrand or yourbrand.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>All time</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Search Mentions
            </button>
          </div>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={redditUrl} onChange={e => setRedditUrl(e.target.value)} placeholder="Paste Reddit post URL" className="border p-2 w-full" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Checking..." : "Check Post"}</button>
          </form>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold">Post Details:</h3>
              <div className="mb-2 text-lg font-semibold">{result.post_title}</div>
              <div className="mb-2 text-gray-700">{result.post_content}</div>
              <div className="text-sm text-gray-600">Upvotes: {result.upvotes} | Comments: {result.total_comments} | Age: {result.post_age_hours}h | Subreddit: {result.subreddit}</div>
              {result.top_comment && (
                <div className="mt-2 p-2 bg-white rounded border">
                  <div className="font-bold">Top Comment:</div>
                  <div className="text-gray-800">{result.top_comment.body}</div>
                  <div className="text-xs text-gray-500">By {result.top_comment.author} | Score: {result.top_comment.score}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
