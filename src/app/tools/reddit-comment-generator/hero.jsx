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
  const [fetchLoading, setFetchLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [tone, setTone] = useState("default");
  const CONTEXT_CHAR_LIMIT = 500;
  const EMBED_URL_CHAR_LIMIT = 200;

  const isValidRedditUrl = url => {
    return /^https?:\/\/(www\.)?reddit\.com\/r\/.+\/comments\/.+/.test(url.trim());
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedToggle = (option) => {
    setAdvancedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleFetchDetails = async () => {
    setFetchLoading(true);
    setError("");
    setGeneratedComment(""); // Reset comment so button label resets
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
    if (!isValidRedditUrl(formData.subreddit)) {
      setError("Invalid Reddit URL. Please enter a valid Reddit thread link.");
      setFetchLoading(false);
      return;
    }
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
        let errMsg = "";
        const errData = await res.json().catch(() => null);
        if (res.status === 404) {
          errMsg = "Post not found. Please check the link.";
        } else if (res.status === 400) {
          if (errData?.detail?.includes("extract post ID") || errData?.detail?.toLowerCase().includes("invalid reddit url")) {
            errMsg = "Invalid Reddit URL. Please enter a valid Reddit thread link.";
          } else {
            errMsg = errData?.detail || "Bad request.";
          }
        } else {
          errMsg = errData?.detail || "Unexpected error. Please try again.";
        }
        setError(errMsg);
        setFetchLoading(false);
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
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setFetchLoading(false);
    }
  };

  const handleGenerateComment = async () => {
    setGenerateLoading(true);
    setError("");
    setGeneratedComment("");
    setCopySuccess("");
    setContextError("");
    setUrlError("");
    // Validate extra context
    if (extraContext.length > CONTEXT_CHAR_LIMIT) {
      setContextError(`Max ${CONTEXT_CHAR_LIMIT} characters allowed.`);
      setGenerateLoading(false);
      return;
    }
    // Validate embed URL if present
    if (embedUrl && embedUrl.length > EMBED_URL_CHAR_LIMIT) {
      setUrlError("Link is too long.");
      setGenerateLoading(false);
      return;
    }
    if (embedUrl && !/^https?:\/\/.+\..+/.test(embedUrl)) {
      setUrlError("Please enter a valid link (must start with http/https)");
      setGenerateLoading(false);
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
          embed_url: embedUrl || undefined,
          tone: tone
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        let errMsg = "";
        const errData = await res.json().catch(() => null);
        if (res.status === 404) {
          errMsg = "Post not found. Please check the link.";
        } else if (res.status === 400) {
          errMsg = errData?.detail?.includes("extract post ID") ? "Invalid Reddit URL. Please check the link." : (errData?.detail || "Bad request.");
        } else {
          errMsg = errData?.detail || "Unexpected error. Please try again.";
        }
        setError(errMsg);
        setGenerateLoading(false);
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
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setGenerateLoading(false);
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
        input[type="range"] {
          height: 32px;
          background: transparent;
          accent-color: #3c4199;
          /* Remove default background for better alignment */
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          background: #3c4199;
          border-radius: 3px;
        }
        input[type="range"]::-webkit-slider-thumb {
          width: 18px;
          height: 18px;
          background: #fff;
          border: 2px solid #3c4199;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 2px #3c4199;
          transition: background 0.2s;
          margin-top: -6px; /* Center thumb on track */
        }
        input[type="range"]:focus::-webkit-slider-thumb {
          outline: 2px solid #3c4199;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #fff;
          border: 2px solid #3c4199;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 2px #3c4199;
          transition: background 0.2s;
        }
        input[type="range"]::-moz-range-track {
          height: 6px;
          background: #3c4199;
          border-radius: 3px;
        }
        input[type="range"]::-ms-thumb {
          width: 18px;
          height: 18px;
          background: #fff;
          border: 2px solid #3c4199;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 2px #3c4199;
          transition: background 0.2s;
        }
        input[type="range"]::-ms-fill-lower {
          background: #3c4199;
          border-radius: 3px;
        }
        input[type="range"]::-ms-fill-upper {
          background: #3c4199;
          border-radius: 3px;
        }
        input[type="range"] {
          /* Remove outline and background for all browsers */
          outline: none;
          background: transparent;
        }
        select, option, optgroup {
          background: #181a20;
          color: #fff;
        }
        select:focus {
          border-color: #3c4199;
          background: #181a20;
          color: #fff;
        }
        select option:hover, select optgroup:hover {
          background: #3c4199;
          color: #fff;
        }
        .loader {
          border-style: solid;
          border-radius: 50%;
          box-shadow: 0 2px 8px 0 #3c419980;
          animation: loader-spin 1.2s cubic-bezier(0.4, 0.2, 0.2, 1) infinite;
        }
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Free <span className="text-[#ff4500]">Reddit</span> Comment Generator</h1>
          <p className="text-gray-400">No more getting downvoted or reported. Generate human-like, natural Reddit comments and posts that blend in with real conversations keeping you off the downvote and report radar.</p>
        </div>

        <div className="bg-black border border-white/20 hover:border-[#3c4199ee] rounded-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Left Side - Form */}
            <div className='p-6 md:pr-0 md:pb-0 pt-6 pl-6'>
              {/* Subreddit Link Input - moved to top */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Paste a Reddit thread link</label>
                <div className='flex gap-2 items-center'>
                  <input
                    type="text"
                    value={formData.subreddit}
                    onChange={e => {
                      const val = e.target.value;
                      if (val.length <= EMBED_URL_CHAR_LIMIT) {
                        handleInputChange('subreddit', val);
                      } else {
                        handleInputChange('subreddit', val.slice(0, EMBED_URL_CHAR_LIMIT));
                      }
                    }}
                    maxLength={EMBED_URL_CHAR_LIMIT}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                    placeholder="https://www.reddit.com/r/dataengineering/comments/xxxxxx/title"
                  />
                  <button
                    className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-3 py-1 rounded-xl text-sm flex items-center"
                    onClick={handleFetchDetails}
                    disabled={fetchLoading || !formData.subreddit.trim()}
                  >
                    {fetchLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="loader inline-block w-5 h-5 rounded-full border-4 border-white border-t-[#3c4199] animate-spin"></span>
                        <span>Loading...</span>
                      </span>
                    ) : "Fetch Details"}
                  </button>
                </div>
                {error && <div className="text-red-400 mt-2">{error}</div>}
              </div>

              {/* Post Details and Top Comment moved up */}
              <div className="bg-black/40 p-4 border border-white/20 rounded-xl mb-2">
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
              <div className="mb-6 bg-black/40 p-4 border border-white/20 rounded-xl">
                <div className="flex items-center gap-1">
                  <svg className='h-4 w-4' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z" fill="#ffff"></path></svg>
                  <span className='font-semibold'>Top Comment</span>
                </div>
                {topComment ? (
                  <div className='mt-2'>
                    <div className='text-white font-medium'>{Array.isArray(topComment) ? topComment[0]?.author : topComment.author}</div>
                    <div className='text-gray-300 font-light tracking-wider'>{Array.isArray(topComment) ? topComment[0]?.body : topComment.body}</div>
                    <div className='text-gray-400 text-xs mt-1'>Score: {Array.isArray(topComment) ? topComment[0]?.score : topComment.score}</div>
                  </div>
                ) : (
                  <p className='font-light tracking-wider'>No top comment found.</p>
                )}
              </div>

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

              {/* Tonality Dropdown */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Comment Tone</label>
                <select
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="witty">Witty</option>
                  <option value="formal">Formal</option>
                  <option value="technical">Technical</option>
                  <option value="casual">Casual</option>
                  <option value="supportive">Supportive</option>
                  <option value="respectfully_disagree">Respectfully Disagree</option>
                  <option value="soft_promotional">Soft Promotional</option>
                </select>
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
              <div className="mb-6 flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-white font-medium mb-2">Promote a Link <span className="text-gray-400 text-xs">(optional)</span></label>
                  <input
                    type="text"
                    value={embedUrl}
                    onChange={e => {
                      const val = e.target.value;
                      if (val.length <= EMBED_URL_CHAR_LIMIT) {
                        setEmbedUrl(val);
                      } else {
                        setEmbedUrl(val.slice(0, EMBED_URL_CHAR_LIMIT));
                      }
                    }}
                    maxLength={EMBED_URL_CHAR_LIMIT}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                    placeholder="Paste a URL you want to include in the comment"
                  />
                  {urlError && <div className="text-red-400 mt-1 text-xs">{urlError}</div>}
                </div>
                {/* Generate and Reset Buttons */}
                <div className="">
                  <button
                    className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    onClick={handleGenerateComment}
                    disabled={generateLoading || !formData.subreddit.trim()}
                    style={{ minWidth: 140 }}
                  >
                    {generateLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="loader inline-block w-5 h-5 rounded-full border-4 border-white border-t-[#3c4199] animate-spin"></span>
                        <span>Loading...</span>
                      </span>
                    ) : (generatedComment ? "Regenerate Comment" : "Generate Comment")}
                  </button>
                </div>
              </div>

<div className='flex justify-center items-center mb-3'>
   <button
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => {
                      setFormData({ subreddit: '', text: '', upvotes: '', comments: '', type: 'Story', badge: 'No badge' });
                      setAdvancedOptions({ darkMode: false, wideLayout: false, approximateCounts: false, hideTrophies: false, hideUpvotes: false, hideComments: false, hideShare: false });
                      setGeneratedComment("");
                      setLoading(false);
                      setError("");
                      setPostDetails({ post_title: '', post_content: '', comments_count: 0, upvotes: 0, total_comments: 0, post_age_hours: 0, post_summary: '', subreddit: '' });
                      setCopySuccess("");
                      setThreadSummary("");
                      setTopComment(null);
                      setDetailsFetched(false);
                      setWordCount(200);
                      setExtraContext("");
                      setEmbedUrl("");
                      setContextError("");
                      setUrlError("");
                      setFetchLoading(false);
                      setGenerateLoading(false);
                      setTone("default");
                    }}
                    type="button"
                    style={{ minWidth: 80 }}
                  >
                    Reset
                  </button>
</div>
              {/* Text */}


              {/* Badge */}


              {/* Upvotes and Comments */}
             </div>

            {/* Right Side - Preview */}
            <div className='bg-white/10 m-4 pt-2 rounded-xl border border-white/10 flex items-center justify-center min-h-[500px] relative'>
              <div className="w-full flex flex-col items-center justify-center">
                <div className={generatedComment ? "" : "flex items-center justify-center min-h-[350px] w-full"}>
                  <div className="bg-black/40 border border-white/10 rounded-lg p-4 w-full max-w-[500px] mx-auto">
                    {/* Reddit Post Preview */}
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://postfully.app/_astro/reddit-default-avatar.BEQTJRzt.png"
                          alt="Avatar"
                          className="w-9 h-9 rounded-full"
                        />
                        <div className="flex-1 mb-1">
                          <div className="flex flex-col items-start mb-1">
                            <span className="text-white text-[14px] font-semibold">{"u/InfrasityAgent"}</span>
                            <span className="text-gray-400 text-xs block mt-[-2px]">Just Now</span>
                          </div>
                        </div>
                      </div>
                      {generatedComment && (
                        <button
                          className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-2 py-1 rounded text-xs min-w-[60px] transition-all duration-200"
                          onClick={handleCopyComment}
                          disabled={!!copySuccess}
                        >
                          {copySuccess ? "Copied!" : "Copy"}
                        </button>
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
                    {generatedComment && (
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-400 px-1">
                        <span>Tone: {tone.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        <span>Word Count: {generatedComment.split(/\s+/).filter(Boolean).length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedditPostTemplate;
