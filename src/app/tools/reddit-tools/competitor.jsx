import { useState } from 'react';
import { loadKeywordResults, saveKeywordResults } from './utils/cache';
import { formatHoursToRedditAge } from './utils/timeAgo'; // path is correct relative to this file

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
            const kwArr = keywords.split(",").map(k => k.trim()).filter(Boolean);
            const cached = loadKeywordResults(kwArr);
            if (cached) {
                setResults(cached);
                setLoading(false);
                return;
            }
            const res = await fetch(`${API_BASE}/find_reddit_post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keywords: kwArr })
            });
            if (!res.ok) throw new Error("Failed to fetch posts");
            const data = await res.json();
            setResults(data.results || []);
            saveKeywordResults(kwArr, data.results || []);
        } catch (err) {
            setError(err.message || "Error fetching posts");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="glass-card px-8 py-6 rounded-xl shadow-md mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold mb-1"><span className="gradient-text">Competitor Analysis</span></h1>
                    <p className="text-lg text-foreground-muted mb-2">Analyze where, how, and with what content competitors get traction on Reddit.</p>
                </div>
                <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground-muted mb-2">Competitor Website or Brand Name</label>
                            <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="competitor.com or Brand Name" className="w-full px-4 py-3 border border-border-muted rounded-lg focus:ring-2 focus:ring-reddit-orange focus:border-transparent text-sm" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground-muted mb-2">Analysis Type</label>
                            <select className="w-full px-4 py-3 border border-border-muted rounded-lg focus:ring-2 focus:ring-reddit-orange focus:border-transparent text-sm">
                                <option>Brand Visibility</option>
                                <option>Subreddit Activity</option>
                                <option>Engagement Metrics</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="btn-primary px-6 py-3 rounded-lg font-medium">{loading ? "Searching..." : "Analyze Competitor"}</button>
                        </div>
                    </form>
                    {error && <div className="text-error mt-2">{error}</div>}
                </div>
                {results.length > 0 && (
                    <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6">
                        {results.map((group, idx) => (
                            <div key={idx} className="mb-8">
                                {Object.entries(group).map(([keyword, posts]) => (
                                    <div key={keyword} className="mb-6">
                                        <h3 className="font-bold text-lg mb-2 gradient-text">Keyword: {keyword}</h3>
                                        <ul className="space-y-2">
                                            {posts.map((post, i) => (
                                                <li key={i} className="p-4 bg-surface rounded-lg animate-fade-in">
                                                    <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-reddit-orange font-semibold hover:underline">{post.post_title}</a>
                                                    <div className="text-sm text-foreground-muted mt-1">Subreddit: {post.subreddit} | Upvotes: {post.upvotes} | Comments: {post.total_comments} | Age: {formatHoursToRedditAge(post.post_age_hours)}</div>
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
