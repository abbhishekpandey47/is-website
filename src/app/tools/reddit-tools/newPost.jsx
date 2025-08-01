import { useState } from 'react';

export default function NewPost() {
  const [subreddit, setSubreddit] = useState('');
  const [postLength, setPostLength] = useState(50);
  const [postIdea, setPostIdea] = useState('');
  const [includeLink, setIncludeLink] = useState(false);
  const [tone, setTone] = useState('Informative');
  const [objective, setObjective] = useState('Getting Feedback');

  const RedditLogo = () => (
    <svg width="32" height="32" viewBox="0 0 216 216" xmlns="http://www.w3.org/2000/svg">
      <circle cx="169.22" cy="106.98" r="25.22" fill="white" />
      <circle cx="46.78" cy="106.98" r="25.22" fill="white" />
      <ellipse cx="108.06" cy="128.64" rx="72" ry="54" fill="white" />
      <path d="M86.78,123.48c-.42,9.08-6.49,12.38-13.56,12.38s-12.46-4.93-12.04-14.01c.42-9.08,6.49-15.02,13.56-15.02s12.46,7.58,12.04,16.66Z" fill="#" />
      <path d="M129.35,123.48c.42,9.08,6.49,12.38,13.56,12.38s12.46-4.93,12.04-14.01c-.42-9.08-6.49-15.02-13.56-15.02s-12.46,7.58-12.04,16.66Z" fill="#" />
      <ellipse cx="79.63" cy="116.37" rx="2.8" ry="3.05" fill="#ffc49c" />
      <ellipse cx="146.21" cy="116.37" rx="2.8" ry="3.05" fill="#ffc49c" />
      <path d="M108.06,142.92c-8.76,0-17.16.43-24.92,1.22-1.33.13-2.17,1.51-1.65,2.74,4.35,10.39,14.61,17.69,26.57,17.69s22.23-7.3,26.57-17.69c.52-1.23-.33-2.61-1.65-2.74-7.77-.79-16.16-1.22-24.92-1.22Z" fill="black" />
    </svg>
  );


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Post and Comments</h1>
          <p className="text-gray-600">Create high-quality Reddit content, then post it on Reddit with your account.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Create Post
          </button>
        </div>

        {/* Description */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-gray-700 text-sm leading-relaxed">
            Generate a post or comment using our content generator. Then you can publish using your own account. Be sure to give
            it upvotes after you publish. The more you give it the more karma you'll gain for your own Reddit user account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Subreddit */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              1. What subreddit? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-11 h-11 bg-gray-800/20 rounded-xl flex items-center justify-center">
                  <RedditLogo />
                </div>
              </div>
              <input
                type="text"
                placeholder="Subreddit"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                className="w-full pl-[70px] pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
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
                min="10"
                max="500"
                value={postLength}
                onChange={(e) => setPostLength(e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 min-w-[100px] text-center">
                <span className="text-gray-900 font-medium">{postLength} Words</span>
              </div>
            </div>
          </div>

          {/* Post Idea */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              3. Explain your post idea <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="What is your post all about?"
              value={postIdea}
              onChange={(e) => setPostIdea(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 resize-none"
            />
          </div>

          {/* Include Link */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              4. Include a link in the post?
            </label>
            <label className="flex items-center gap-3 p-3 hover:border-gray-800/40 border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-black rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-white">
              <span className="relative w-5 h-5">
                <input
                  type="checkbox"
                  checked={includeLink}
                  onChange={(e) => setIncludeLink(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-gray-600/80 checked:border-transparent focus:outline-none"
                />
                <svg
                  className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Yes, include link</span>
            </label>

          </div>

          {/* Tone and Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                5. Set the tone of the post
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-black"
              >
                <option className="bg-white text-black">Informative</option>
                <option className="bg-white text-black">Casual</option>
                <option className="bg-white text-black">Professional</option>
                <option className="bg-white text-black">Humorous</option>
                <option className="bg-white text-black">Controversial</option>
              </select>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                6. What is the objective of this post?
              </label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-black"
              >
                <option className="bg-white text-black">Getting Feedback</option>
                <option className="bg-white text-black">Sharing Information</option>
                <option className="bg-white text-black">Starting Discussion</option>
                <option className="bg-white text-black">Promoting Content</option>
                <option className="bg-white text-black">Asking Questions</option>
              </select>

            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            Generate a draft (1 Credit)
          </button>
        </form>
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