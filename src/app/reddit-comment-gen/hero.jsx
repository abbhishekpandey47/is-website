"use client"

import { useState } from 'react';

const API_URL = "https://reddit-comment-gen.onrender.com/generate_comment";
const API_DETAILS_URL = "https://reddit-comment-gen.onrender.com/fetch_post_details";

const RedditPostTemplate = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    subreddit: '',
    text: '',
    upvotes: '',
    comments: '',
    type: 'Story',
    badge: 'No badge'
  });

  const [advancedOptions, setAdvancedOptions] = useState({
    darkMode: false,
    wideLayout: false,
    approximateCounts: false,
    hideTrophies: false,
    hideUpvotes: false,
    hideComments: false,
    hideShare: false
  });

  const [generatedComment, setGeneratedComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postDetails, setPostDetails] = useState({
    post_title: '',
    post_content: '',
    comments_count: 0,
    upvotes: 0,
    total_comments: 0,
    post_age_hours: 0,
    post_summary: '',
    subreddit: ''
  });
  const [copySuccess, setCopySuccess] = useState("");
  const [threadSummary, setThreadSummary] = useState("");
  const [topComment, setTopComment] = useState(null);
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [wordCount, setWordCount] = useState(200);
  const [extraContext, setExtraContext] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [contextError, setContextError] = useState("");
  const [urlError, setUrlError] = useState("");
  const CONTEXT_CHAR_LIMIT = 250;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedToggle = (option) => {
    setAdvancedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleFetchDetails = async () => {
    setLoading(true);
    setError("");
    setGeneratedComment("");
    setDetailsFetched(false);
    setPostDetails({
      post_title: '',
      post_content: '',
      comments_count: 0,
      upvotes: 0,
      total_comments: 0,
      post_age_hours: 0,
      post_summary: '',
      subreddit: ''
    });
    setThreadSummary("");
    setTopComment(null);
    setCopySuccess("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);
    try {
      const res = await fetch(API_DETAILS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reddit_url: formData.subreddit }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setError(errData?.detail || "Error: " + res.statusText);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPostDetails({
        post_title: data.post_title || '',
        post_content: data.post_content || '',
        upvotes: data.upvotes || 0,
        total_comments: data.total_comments || 0,
        post_age_hours: data.post_age_hours || 0,
        post_summary: data.post_summary || '',
        subreddit: data.subreddit || ''
      });
      setThreadSummary(""); // No summary in details fetch
      setTopComment(data.top_comment || null);
      setDetailsFetched(true);
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again later.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleGenerateComment = async () => {
    setLoading(true);
    setError("");
    setGeneratedComment("");
    setCopySuccess("");
    setContextError("");
    setUrlError("");
    // Validate extra context
    if (extraContext.length > CONTEXT_CHAR_LIMIT) {
      setContextError(`Max ${CONTEXT_CHAR_LIMIT} characters allowed.`);
      setLoading(false);
      return;
    }
    // Validate embed URL if present
    if (embedUrl && !/^https?:\/\/.+\..+/.test(embedUrl)) {
      setUrlError("Please enter a valid link (must start with http/https)");
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reddit_url: formData.subreddit,
          word_count: wordCount,
          extra_context: extraContext || undefined,
          embed_url: embedUrl || undefined
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setError(errData?.detail || "Error: " + res.statusText);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setGeneratedComment(data.generated_comment || "No comment generated.");
      setPostDetails({
        post_title: data.post_title || '',
        post_content: data.post_content || '',
        comments_count: data.comments_count || 0,
        upvotes: data.upvotes || 0,
        total_comments: data.total_comments || 0,
        post_age_hours: data.post_age_hours || 0,
        post_summary: data.post_summary || '',
        subreddit: data.subreddit || ''
      });
      setThreadSummary(data.thread_summary || "No summary available.");
      setTopComment(data.top_comments && data.top_comments.length > 0 ? data.top_comments[0] : null);
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again later.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleCopyComment = () => {
    if (generatedComment) {
      navigator.clipboard.writeText(generatedComment);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 1500);
    }
  };

  // Helper to truncate long titles
  const truncate = (str, n) => str.length > n ? str.slice(0, n - 1) + '...' : str;

  return (
    <div className="bg-black p-6">
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Reddit Post Template</h1>
          <p className="text-gray-400">Create custom Reddit posts for your Reddit story videos. Free to use, no email required.</p>
        </div>

        {/* Beta Notice */}
        <div className="bg-white/10 border border-white/20 hover:border-[#3c4199ee] rounded-lg p-4 mb-6 backdrop-blur-sm">
          <div className="md:flex items-center justify-between">
            <div className='w-full md:w-[80%]'>
              <h3 className="text-white font-medium flex items-center gap-2">
                Reddit Story Template V2 (Beta) is here 🎉
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                We've listened to your feedback and built the most advanced Reddit Story Template with text styles, drop shadow, font weight and many more customization options.
              </p>
            </div>
            <button className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-4 py-2  mt-4 md:mt-0 rounded-lg text-sm font-medium transition-colors">
              Try it now
            </button>
          </div>
        </div>

        <div className="bg-black border border-white/20 hover:border-[#3c4199ee] rounded-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Left Side - Form */}
            <div className='p-6 md:pr-0 md:pb-0 pt-6 pl-6'>

              {/* Word Count Slider */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Comment Word Count</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    step={50}
                    value={wordCount}
                    onChange={e => setWordCount(Number(e.target.value))}
                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-white font-semibold w-12 text-center">{wordCount}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Choose between 100 and 1000 words</p>
              </div>

              {/* Additional Context */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Additional Context <span className="text-gray-400 text-xs">(max {CONTEXT_CHAR_LIMIT} chars)</span></label>
                <textarea
                  value={extraContext}
                  onChange={e => setExtraContext(e.target.value)}
                  maxLength={CONTEXT_CHAR_LIMIT}
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white focus:border-[#3c4199ee] focus:outline-none resize-none"
                  rows={2}
                  placeholder="Add any extra context for the comment (optional)"
                />
                {contextError && <div className="text-red-400 mt-1 text-xs">{contextError}</div>}
              </div>

              {/* Link Embed */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Embed a Link <span className="text-gray-400 text-xs">(optional)</span></label>
                <input
                  type="text"
                  value={embedUrl}
                  onChange={e => setEmbedUrl(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                  placeholder="Paste a link to embed in the comment"
                />
                {urlError && <div className="text-red-400 mt-1 text-xs">{urlError}</div>}
              </div>

              {/* Subreddit */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Paste a Subreddit thread link</label>
                <div className='flex gap-2'>
                  <input
                    type="text"
                    value={formData.subreddit}
                    onChange={(e) => handleInputChange('subreddit', e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                    placeholder="https://www.reddit.com/r/dataengineering/comments/xxxxxx/title"
                  />
                  <button
                    className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-3 py-1 rounded-xl text-sm"
                    onClick={handleFetchDetails}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Fetch Details"}
                  </button>
                </div>
                {error && <div className="text-red-400 mt-2">{error}</div>}
              </div>

              {/* Text */}
              <div className="bg-black/40 p-4 border border-white/20 rounded-t-xl mb-0">
                <div>
                  <h2 className='font-semibold'>Post Details</h2>
                  <p className='font-light tracking-wider'>{postDetails.post_title || "No post title found."}</p>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <span>
                      <svg className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.8C11.9136 22.8 11.826 22.8 11.7384 22.7928C10.4844 22.6956 9.3153 22.1218 8.47124 21.1894C7.62719 20.2569 7.17227 19.0367 7.19997 17.7792V13.2H3.43437C3.01826 13.2 2.61154 13.0764 2.26576 12.8449C1.91999 12.6134 1.65073 12.2845 1.49213 11.8998C1.33352 11.5151 1.2927 11.0919 1.37485 10.684C1.457 10.2761 1.65842 9.90176 1.95357 9.60844L11.292 0.336043C11.48 0.148743 11.7346 0.0435791 12 0.0435791C12.2654 0.0435791 12.5199 0.148743 12.708 0.336043L22.0464 9.60844C22.3414 9.90168 22.5428 10.2759 22.625 10.6837C22.7072 11.0915 22.6665 11.5146 22.508 11.8992C22.3496 12.2838 22.0805 12.6128 21.7349 12.8444C21.3893 13.076 20.9828 13.1997 20.5668 13.2H16.8V17.8584C16.8203 18.9814 16.459 20.0779 15.7752 20.9688C15.3262 21.5407 14.7529 22.0027 14.0988 22.32C13.4447 22.6373 12.727 22.8014 12 22.8ZM12 2.16844L3.22197 10.8852C3.17966 10.9273 3.1508 10.981 3.13904 11.0394C3.12728 11.0979 3.13314 11.1586 3.15589 11.2137C3.17864 11.2689 3.21725 11.316 3.26683 11.3492C3.31641 11.3823 3.37472 11.4001 3.43437 11.4H8.99997V17.7792C8.97957 18.5749 9.26054 19.3488 9.78659 19.9461C10.3126 20.5434 11.0449 20.9198 11.8368 21C12.2446 21.0265 12.6534 20.9674 13.0369 20.8265C13.4205 20.6855 13.7704 20.4659 14.064 20.1816C14.3614 19.9018 14.5981 19.5636 14.7591 19.1883C14.9201 18.813 15.0021 18.4085 15 18V11.4H20.5668C20.6266 11.4004 20.6851 11.3829 20.7349 11.3497C20.7847 11.3165 20.8234 11.2692 20.8461 11.2139C20.8688 11.1586 20.8744 11.0977 20.8623 11.0392C20.8502 10.9806 20.8208 10.927 20.778 10.8852L12 2.16844Z" fill="#ffff"></path></svg>
                    </span> <span>{postDetails.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className='h-4 w-4' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z" fill="#ffff"></path></svg>
                    <span>{postDetails.total_comments}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6 bg-black/40 p-4 border-l border-r border-b border-white/20 rounded-b-xl">
                <div className="flex items-center gap-1">
                  <svg className='h-4 w-4' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z" fill="#ffff"></path></svg>
                  <span className='font-semibold'>Top Comment</span>
                </div>
                {topComment ? (
                  <div className='mt-2'>
                    <div className='text-white font-medium'>{topComment.author}</div>
                    <div className='text-gray-300 font-light tracking-wider'>{topComment.body}</div>
                    <div className='text-gray-400 text-xs mt-1'>Score: {topComment.score}</div>
                  </div>
                ) : (
                  <p className='font-light tracking-wider'>No top comment found.</p>
                )}
              </div>
              {threadSummary && (
                <div className="bg-black/40 p-4 border border-white/20 rounded-xl mt-6 mb-4">
                  <h2 className='font-semibold'>Thread Summary</h2>
                  <p className='font-light tracking-wider'>{threadSummary}</p>
                </div>
              )}

              {/* Badge */}


              {/* Upvotes and Comments */}
             </div>

            {/* Right Side - Preview */}
            <div className='bg-white/10 m-4 pt-2 rounded-xl border border-white/10'>
              {detailsFetched && (
                <div className="flex items-end justify-end mx-4 mt-2">
                  <button
                    className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-3 py-1 rounded-full text-sm"
                    onClick={handleGenerateComment}
                    disabled={loading}
                  >
                    Generate Comment
                  </button>
                  {copySuccess && <span className="ml-2 text-green-400 text-xs">{copySuccess}</span>}
                </div>
              )}
              <div className="md:flex items-start justify-center">
                <div className="flex items-start justify-center">
                  <div className={generatedComment ? "" : "flex items-center justify-center min-h-[350px]"}>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-4 w-full max-w-[400px] mx-auto mt-4">
                      {/* Reddit Post Preview */}
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://postfully.app/_astro/reddit-default-avatar.BEQTJRzt.png"
                            alt="Avatar"
                            className="w-9 h-9 rounded-full"
                          />
                          <div className="flex-1 mb-1">
                            <div className="flex items-start mb-1">
                              <span className="text-white text-[14px] font-semibold">{postDetails.subreddit || "infrasity.com"}</span>
                            </div>
                            <div className="flex gap-0">
                              <img
                                src="https://postfully.app/_astro/reddit-awards.BPz5fCNF.png"
                                alt="Awards"
                                className="w-36 h-3"
                              />
                            </div>
                          </div>
                        </div>
                        {generatedComment && (
                          <button
                            className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-2 py-1 rounded text-xs"
                            onClick={handleCopyComment}
                          >
                            Copy
                          </button>
                        )}
                        {copySuccess && generatedComment && (
                          <span className="ml-2 text-green-400 text-xs">{copySuccess}</span>
                        )}
                      </div>
                      <h3 className="text-white text-[calc(16px*var(--scale))] leading-[calc(20px*var(--scale))] font-bold break-words whitespace-pre-wrap mt-1 mb-2">
                        {generatedComment ? (
                          <div
                            className="whitespace-pre-line text-sm overflow-y-auto w-full break-words pr-2 scrollbar-hide min-h-[40px] bg-black/30 rounded-lg p-3 transition-all"
                            style={{ wordBreak: 'break-word', width: '100%', maxHeight: '70vh' }}
                          >
                            {generatedComment}
                          </div>
                        ) : "Create your custom Reddit story"}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <span>
                            {/* Upvotes icon */}
                            <svg className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.8C11.9136 22.8 11.826 22.8 11.7384 22.7928C10.4844 22.6956 9.3153 22.1218 8.47124 21.1894C7.62719 20.2569 7.17227 19.0367 7.19997 17.7792V13.2H3.43437C3.01826 13.2 2.61154 13.0764 2.26576 12.8449C1.91999 12.6134 1.65073 12.2845 1.49213 11.8998C1.33352 11.5151 1.2927 11.0919 1.37485 10.684C1.457 10.2761 1.65842 9.90176 1.95357 9.60844L11.292 0.336043C11.48 0.148743 11.7346 0.0435791 12 0.0435791C12.2654 0.0435791 12.5199 0.148743 12.708 0.336043L22.0464 9.60844C22.3414 9.90168 22.5428 10.2759 22.625 10.6837C22.7072 11.0915 22.6665 11.5146 22.508 11.8992C22.3496 12.2838 22.0805 12.6128 21.7349 12.8444C21.3893 13.076 20.9828 13.1997 20.5668 13.2H16.8V17.8584C16.8203 18.9814 16.459 20.0779 15.7752 20.9688C15.3262 21.5407 14.7529 22.0027 14.0988 22.32C13.4447 22.6373 12.727 22.8014 12 22.8ZM12 2.16844L3.22197 10.8852C3.17966 10.9273 3.1508 10.981 3.13904 11.0394C3.12728 11.0979 3.13314 11.1586 3.15589 11.2137C3.17864 11.2689 3.21725 11.316 3.26683 11.3492C3.31641 11.3823 3.37472 11.4001 3.43437 11.4H8.99997V17.7792C8.97957 18.5749 9.26054 19.3488 9.78659 19.9461C10.3126 20.5434 11.0449 20.9198 11.8368 21C12.2446 21.0265 12.6534 20.9674 13.0369 20.8265C13.4205 20.6855 13.7704 20.4659 14.064 20.1816C14.3614 19.9018 14.5981 19.5636 14.7591 19.1883C14.9201 18.813 15.0021 18.4085 15 18V11.4H20.5668C20.6266 11.4004 20.6851 11.3829 20.7349 11.3497C20.7847 11.3165 20.8234 11.2692 20.8461 11.2139C20.8688 11.1586 20.8744 11.0977 20.8623 11.0392C20.8502 10.9806 20.8208 10.927 20.778 10.8852L12 2.16844Z" fill="#ffff"></path></svg>
                          </span> <span>{postDetails.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className='h-4 w-4' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z" fill="#ffff"></path></svg>
                          <span>{postDetails.total_comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3c4199]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedditPostTemplate;

// Example usage for API call:
// async function generateComment(redditUrl) {
//   const res = await fetch("/api/generate-comment", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ reddit_url: redditUrl })
//   });
//   if (res.status === 403) throw new Error("Forbidden");
//   if (!res.ok) throw new Error(res.statusText);
//   return await res.json();
// }
