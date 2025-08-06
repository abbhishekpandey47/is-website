import { useState } from 'react';

const API_BASE = "https://reddit-comment-gen.onrender.com";

export default function Competitor() {
    const [keywords, setKeywords] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResults([]);
        try {
            const res = await fetch(`${API_BASE}/find_reddit_post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keywords: keywords.split(",").map(k => k.trim()).filter(Boolean) })
            });
            if (!res.ok) throw new Error("Failed to fetch posts");
            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            setError(err.message || "Error fetching posts");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Competitor Analysis</h1>
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Competitor Website or Brand Name
                            </label>
                            <input
                                type="text"
                                placeholder="competitor.com or Brand Name"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Analysis Type
                            </label>
                            <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                                <option>Brand Visibility</option>
                                <option>Subreddit Activity</option>
                                <option>Engagement Metrics</option>
                            </select>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base">
                            Analyze Competitor
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="Enter keywords (comma separated)" className="border p-2 w-full" required />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Searching..." : "Find Posts"}</button>
                </form>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                {results.length > 0 && (
                    <div className="mt-4">
                        {results.map((group, idx) => (
                            <div key={idx} className="mb-6">
                                {Object.entries(group).map(([keyword, posts]) => (
                                    <div key={keyword}>
                                        <h3 className="font-bold text-lg mb-2">Keyword: {keyword}</h3>
                                        <ul className="space-y-2">
                                            {posts.map((post, i) => (
                                                <li key={i} className="p-3 bg-gray-100 rounded">
                                                    <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">{post.post_title}</a>
                                                    <div className="text-sm text-gray-600">Subreddit: {post.subreddit} | Upvotes: {post.upvotes} | Comments: {post.total_comments} | Age: {post.post_age_hours}h</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
