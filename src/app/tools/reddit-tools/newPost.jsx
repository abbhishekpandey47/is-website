import { useState } from 'react';

const API_BASE = "https://reddit-comment-gen.onrender.com";
const DEFAULT_ICON = "/reddit/reddit-default-avatar.png";

export default function NewPost() {
  const [subredditUrl, setSubredditUrl] = useState("");
  const [subredditIcon, setSubredditIcon] = useState(DEFAULT_ICON);
  const [wordCount, setWordCount] = useState(200);
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("default");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (result?.generated_post) {
      navigator.clipboard.writeText(result.generated_post);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card px-8 py-6 rounded-xl shadow-md mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-1"><span className="gradient-text">New Post Generator</span></h1>
          <p className="text-lg text-foreground-muted mb-2">AI generates Reddit post titles based on any company website.</p>
        </div>
        <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground-muted mb-2">Company Website</label>
              <input type="text" placeholder="company.com" className="w-full px-4 py-3 border border-border-muted rounded-lg focus:ring-2 focus:ring-reddit-orange focus:border-transparent text-sm" required />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary px-6 py-3 rounded-lg font-medium">Generate Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const handleSubredditUrlChange = async (e) => {
    const url = e.target.value;
    setSubredditUrl(url);
    const match = url.match(/reddit\.com\/r\/([^/]+)/);
    if (match && match[1]) {
      try {
        const res = await fetch(`https://www.reddit.com/r/${match[1]}/about.json`);
        const data = await res.json();
        if (data?.data?.icon_img && data.data.icon_img !== "") {
          setSubredditIcon(data.data.icon_img);
        } else if (data?.data?.community_icon && data.data.community_icon !== "") {
          setSubredditIcon(data.data.community_icon.split('?')[0]);
        } else {
          setSubredditIcon(DEFAULT_ICON);
        }
      } catch {
        setSubredditIcon(DEFAULT_ICON);
      }
    } else {
      setSubredditIcon(DEFAULT_ICON);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Post</h1>
          <p className="text-gray-600">Create high-quality Reddit content, then post it on Reddit with your account.</p>
        </div>

        {/* Description */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-gray-700 text-sm leading-relaxed">
            Generate a post or comment using our content generator. Then you can publish using your own account. Be sure to give
            it upvotes after you publish. The more you give it the more karma you'll gain for your own Reddit user account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subreddit */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              1. What subreddit? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-11 h-11 bg-gray-800/20 rounded-xl flex items-center justify-center">
                  <img
                    src={subredditIcon || "/reddit/reddit-default-avatar.png"}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Paste full subreddit URL (e.g. https://www.reddit.com/r/technology/)"
                value={subredditUrl}
                onChange={handleSubredditUrlChange}
                className="w-full pl-[70px] pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Post Length */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              2. Post length (words) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 min-w-[100px] text-center">
                <span className="text-gray-900 font-medium">{wordCount} Words</span>
              </div>
            </div>
          </div>

          {/* Post Idea */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              3. Explain your post idea (optional)
            </label>
            <textarea
              placeholder="What is your post all about? (optional)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 resize-none"
            />
          </div>

          {/* Tone and Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                4. Set the tone of the post
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-black"
              >
                <option value="default" className="bg-white text-black">Default</option>
                <option value="witty" className="bg-white text-black">Witty</option>
                <option value="formal" className="bg-white text-black">Formal</option>
                <option value="technical" className="bg-white text-black">Technical</option>
                <option value="casual" className="bg-white text-black">Casual</option>
                <option value="supportive" className="bg-white text-black">Supportive</option>
                <option value="respectfully_disagree" className="bg-white text-black">Respectfully Disagree</option>
                <option value="soft_promotional" className="bg-white text-black">Soft Promotional</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate a draft (1 Credit)"}
          </button>
        </form>

        {/* Result Display */}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-6">
          <div className="font-bold mb-2">Generated Post:</div>
          <div className="relative">
            <textarea
              className="w-full p-3 border rounded bg-gray-100 text-gray-800 min-h-[120px] resize-none"
              value={result?.generated_post || ""}
              readOnly
              placeholder={loading ? "Generating post..." : "Your generated post will appear here."}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              disabled={!result?.generated_post}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {result && (
            <div className="mt-2 text-sm text-gray-600">Subreddit: {result.subreddit} | Topic: {result.topic} | Word Count: {result.word_count} | Tone: {result.tone}</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
