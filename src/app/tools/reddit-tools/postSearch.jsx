import React, { useState } from 'react';
import { Search, MessageCircle, ArrowUp, Clock } from 'lucide-react';

export default function PostSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    {
      id: 1,
      subreddit: 'r/marketing',
      timeAgo: '2 hours ago',
      title: 'How to create engaging content for social media',
      description: 'Creating engaging content for social media requires understanding your audience, using compelling visuals, and crafting messages that resonate. Here are some proven strategies that have worked for many content creators...',
      tags: ['marketing', 'social-media', 'content-creation'],
      upvotes: 342,
      comments: 67
    },
    {
      id: 2,
      subreddit: 'r/remotework',
      timeAgo: '4 hours ago',
      title: 'Best practices for remote team collaboration',
      description: 'Working with remote teams can be challenging, but with the right tools and processes, it can be incredibly effective. Communication is key, and establishing clear workflows helps everyone stay on track...',
      tags: ['remote-work', 'collaboration', 'productivity'],
      upvotes: 156,
      comments: 23
    },
    {
      id: 3,
      subreddit: 'r/learnprogramming',
      timeAgo: '6 hours ago',
      title: 'Learning JavaScript in 2024: A comprehensive guide',
      description: 'JavaScript continues to evolve, and 2024 brings new features and best practices. Whether you\'re a beginner or looking to update your skills, this guide covers everything from fundamentals to advanced concepts...',
      tags: ['javascript', 'programming', 'web-development'],
      upvotes: 891,
      comments: 134
    }
  ];

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
              <button className="ml-4 px-6 py-3 bg-[#3c4199] hover:bg-[#3c4199]/90 text-white font-medium rounded-lg transition-colors">
                Search Posts
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Post Header */}
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="font-medium text-gray-700">{post.subreddit}</span>
                <span className="mx-2 text-black">•</span>
                <Clock className="w-4 h-4 mr-1 stroke-gray-600" />
                <span className='text-black'>{post.timeAgo}</span>
              </div>

              {/* Post Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h2>

              {/* Post Description */}
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Post Stats */}
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                   <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 22.8C11.9136 22.8 11.826 22.8 11.7384 22.7928C10.4844 22.6956 9.3153 22.1218 8.47124 21.1894C7.62719 20.2569 7.17227 19.0367 7.19997 17.7792V13.2H3.43437C3.01826 13.2 2.61154 13.0764 2.26576 12.8449C1.91999 12.6134 1.65073 12.2845 1.49213 11.8998C1.33352 11.5151 1.2927 11.0919 1.37485 10.684C1.457 10.2761 1.65842 9.90176 1.95357 9.60844L11.292 0.336043C11.48 0.148743 11.7346 0.0435791 12 0.0435791C12.2654 0.0435791 12.5199 0.148743 12.708 0.336043L22.0464 9.60844C22.3414 9.90168 22.5428 10.2759 22.625 10.6837C22.7072 11.0915 22.6665 11.5146 22.508 11.8992C22.3496 12.2838 22.0805 12.6128 21.7349 12.8444C21.3893 13.076 20.9828 13.1997 20.5668 13.2H16.8V17.8584C16.8203 18.9814 16.459 20.0779 15.7752 20.9688C15.3262 21.5407 14.7529 22.0027 14.0988 22.32C13.4447 22.6373 12.727 22.8014 12 22.8ZM12 2.16844L3.22197 10.8852C3.17966 10.9273 3.1508 10.981 3.13904 11.0394C3.12728 11.0979 3.13314 11.1586 3.15589 11.2137C3.17864 11.2689 3.21725 11.316 3.26683 11.3492C3.31641 11.3823 3.37472 11.4001 3.43437 11.4H8.99997V17.7792C8.97957 18.5749 9.26054 19.3488 9.78659 19.9461C10.3126 20.5434 11.0449 20.9198 11.8368 21C12.2446 21.0265 12.6534 20.9674 13.0369 20.8265C13.4205 20.6855 13.7704 20.4659 14.064 20.1816C14.3614 19.9018 14.5981 19.5636 14.7591 19.1883C14.9201 18.813 15.0021 18.4085 15 18V11.4H20.5668C20.6266 11.4004 20.6851 11.3829 20.7349 11.3497C20.7847 11.3165 20.8234 11.2692 20.8461 11.2139C20.8688 11.1586 20.8744 11.0977 20.8623 11.0392C20.8502 10.9806 20.8208 10.927 20.778 10.8852L12 2.16844Z"
                          fill={'#000000'}
                        />
                      </svg>
                  <span className="text-sm font-medium text-black">{post.upvotes} upvotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 stroke-gray-600" />
                  <span className="text-sm font-medium text-black">{post.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}