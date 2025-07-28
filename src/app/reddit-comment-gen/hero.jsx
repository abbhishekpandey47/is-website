import React, { useState } from 'react';
import { ChevronDown, Upload, Settings, Lightbulb } from 'lucide-react';

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedToggle = (option) => {
    setAdvancedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
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
        <div className="bg-black/20 border border-white/20 hover:border-[#3c4199ee] rounded-lg p-4 mb-6 backdrop-blur-sm">
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

        <div className="bg-black border border-white/20 hover:border-[#3c4199ee] rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Left Side - Form */}
            <div className='pt-6 pl-6'>
              {/* Avatar Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Avatar</h3>
                  
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-gray-600 p-1 rounded-lg flex items-center justify-center bg-black/20">
                    {/* <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 w-4 h-4">
                      <path d="M15 5C15 7.20914 16.7909 9 19 9M4 20L4.61997 16.9002C4.76122 16.1939 4.83185 15.8407 4.96101 15.5114C5.07566 15.2192 5.22432 14.9414 5.40392 14.6839C5.60627 14.3937 5.86092 14.1391 6.37023 13.6298L16.0001 3.99998C16.5454 3.45476 16.818 3.18215 17.1121 3.03641C17.6716 2.75911 18.3286 2.75912 18.8882 3.03643C19.1823 3.18217 19.4549 3.45479 20.0001 4.00003V4.00003C20.5453 4.54525 20.8179 4.81786 20.9636 5.11194C21.2409 5.67151 21.2409 6.32848 20.9636 6.88804C20.8179 7.18212 20.5453 7.45472 20.0001 7.99994L10.3702 17.6298C9.86091 18.1391 9.60626 18.3937 9.31613 18.5961C9.05861 18.7757 8.78084 18.9243 8.48856 19.039C8.15927 19.1681 7.80613 19.2388 7.09987 19.38L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg> */}
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-5" aria-hidden="true"><path d="M3 18L6.77044 14.2296C7.55197 13.448 7.94273 13.0573 8.39428 12.9083C8.79155 12.7773 9.21991 12.7741 9.61907 12.8993C10.0728 13.0415 10.4693 13.4265 11.2623 14.1964L14.4861 17.3264M21.5 17.6875L20.0752 16.2627C19.2832 15.4707 18.8872 15.0747 18.4305 14.9263C18.0289 14.7958 17.5962 14.7958 17.1945 14.9263C16.7378 15.0747 16.3416 15.4709 15.5493 16.2633C14.9448 16.8677 14.4861 17.3264 14.4861 17.3264M18.5 21.3403L14.4861 17.3264M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8ZM11.6 22H12.4C15.7603 22 17.4405 22 18.7239 21.346C19.8529 20.7708 20.7708 19.8529 21.346 18.7239C22 17.4405 22 15.7603 22 12.4V11.6C22 8.23969 22 6.55953 21.346 5.27606C20.7708 4.14708 19.8529 3.2292 18.7239 2.65396C17.4405 2 15.7603 2 12.4 2H11.6C8.23969 2 6.55953 2 5.27606 2.65396C4.14708 3.2292 3.2292 4.14708 2.65396 5.27606C2 6.55953 2 8.23969 2 11.6V12.4C2 15.7603 2 17.4405 2.65396 18.7239C3.2292 19.8529 4.14708 20.7708 5.27606 21.346C6.55953 22 8.23969 22 11.6 22Z" stroke="#bbbaba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">Upload</button>
                </div>
              </div>

              {/* Type */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Type</label>
                <div className="relative">
                  <select 
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full bg-black/30 border border-white/20  justify-center items-center rounded-lg p-1 px-2 text-white appearance-none focus:border-[#3c4199ee] focus:outline-none"
                  >
                    <option value="Story">Story</option>
                    <option value="Image">Image</option>
                    <option value="Link">Link</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Subreddit */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Subreddit / Username</label>
                <input
                  type="text"
                  value={formData.subreddit}
                  onChange={(e) => handleInputChange('subreddit', e.target.value)}
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                  placeholder="postfully.app"
                />
                <div className="text-gray-400 text-sm mt-1">0 / 25 characters</div>
              </div>

              {/* Text */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Text</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => handleInputChange('text', e.target.value)}
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none h-24 resize-none scrollbar-hide"
                  style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                  placeholder='TIL that my cat has been secretly hoarding bottle caps under my bed for the past year. Found over 100 of them while cleaning!'
                />
              </div>

              {/* Badge */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Badge</label>
                <div className="relative">
                  <select 
                    value={formData.badge}
                    onChange={(e) => handleInputChange('badge', e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white appearance-none focus:border-[#3c4199ee] focus:outline-none"
                  >
                    <option value="No badge">No badge</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upvotes and Comments */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white font-medium mb-2">Upvotes</label>
                  <input
                    type="text"
                    value={formData.upvotes}
                    onChange={(e) => handleInputChange('upvotes', e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                    placeholder='249'
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Comments</label>
                  <input
                    type="text"
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-1 px-2 text-white focus:border-[#3c4199ee] focus:outline-none"
                    placeholder='57'
                  />
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div className="mb-6">
                <div className='flex items-center justify-center'>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </button>
                </div>

                {showAdvanced && (
                  <div className="mt-4 space-y-4 bg-black/40 border border-white/10 rounded-lg p-4">
                    {Object.entries({
                      darkMode: 'Display the story in dark mode',
                      wideLayout: 'Display the story in a wider layout',
                      approximateCounts: "Show upvotes/comments with '+' symbol (e.g. 99+)",
                      hideTrophies: "Don't show the trophies row",
                      hideUpvotes: "Don't show the upvote count",
                      hideComments: "Don't show the comment count",
                      hideShare: "Don't show the share button"
                    }).map(([key, description]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-gray-400 text-sm">{description}</div>
                        </div>
                        <button
                          onClick={() => handleAdvancedToggle(key)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            advancedOptions[key] ? 'bg-[#3c4199]' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            advancedOptions[key] ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Preview */}
            <div className='bg-white/10 m-4 pt-2 rounded-xl border border-white/10'>
                  <div className="flex items-end justify-end mx-4 mt-2">
                  {/* <h3 className="text-white font-medium">Avatar</h3> */}
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-white text-sm">Reset</button>
                    <button className="bg-[#3c4199] hover:bg-[#3c4199ee] text-white px-3 py-1 rounded-full text-sm">
                      Download
                    </button>
                  </div>
                </div>
            <div className="md:flex items-start justify-center">
              <div className="md:flex items-start justify-center">
              <div className="md:absolute bottom-1/2 bg-black/40 border border-white/20 rounded-lg p-4 max-w-sm">
                {/* Reddit Post Preview */}
                <div className="flex justify-center items-center gap-3">
                  <img 
                    src="https://postfully.app/_astro/reddit-default-avatar.BEQTJRzt.png" 
                    alt="Avatar" 
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1 mb-1">
                    <div className="flex items-start mb-1">
                      <span className="text-orange-500 font-medium">postfully.app</span>
                    </div>
                     <div className="flex gap-1">
                        <img 
                          src="https://postfully.app/_astro/reddit-awards.BPz5fCNF.png" 
                          alt="Awards" 
                          className="w-44 h-4"
                        />
                      </div>
                          </div>
                            </div>
                    <h3 className="text-white font-medium mb-2">Create your custom Reddit story</h3>
                    <p className="text-gray-300 text-sm mb-3">{formData.text}</p>
                    
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <span>
<svg className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.8C11.9136 22.8 11.826 22.8 11.7384 22.7928C10.4844 22.6956 9.3153 22.1218 8.47124 21.1894C7.62719 20.2569 7.17227 19.0367 7.19997 17.7792V13.2H3.43437C3.01826 13.2 2.61154 13.0764 2.26576 12.8449C1.91999 12.6134 1.65073 12.2845 1.49213 11.8998C1.33352 11.5151 1.2927 11.0919 1.37485 10.684C1.457 10.2761 1.65842 9.90176 1.95357 9.60844L11.292 0.336043C11.48 0.148743 11.7346 0.0435791 12 0.0435791C12.2654 0.0435791 12.5199 0.148743 12.708 0.336043L22.0464 9.60844C22.3414 9.90168 22.5428 10.2759 22.625 10.6837C22.7072 11.0915 22.6665 11.5146 22.508 11.8992C22.3496 12.2838 22.0805 12.6128 21.7349 12.8444C21.3893 13.076 20.9828 13.1997 20.5668 13.2H16.8V17.8584C16.8203 18.9814 16.459 20.0779 15.7752 20.9688C15.3262 21.5407 14.7529 22.0027 14.0988 22.32C13.4447 22.6373 12.727 22.8014 12 22.8ZM12 2.16844L3.22197 10.8852C3.17966 10.9273 3.1508 10.981 3.13904 11.0394C3.12728 11.0979 3.13314 11.1586 3.15589 11.2137C3.17864 11.2689 3.21725 11.316 3.26683 11.3492C3.31641 11.3823 3.37472 11.4001 3.43437 11.4H8.99997V17.7792C8.97957 18.5749 9.26054 19.3488 9.78659 19.9461C10.3126 20.5434 11.0449 20.9198 11.8368 21C12.2446 21.0265 12.6534 20.9674 13.0369 20.8265C13.4205 20.6855 13.7704 20.4659 14.064 20.1816C14.3614 19.9018 14.5981 19.5636 14.7591 19.1883C14.9201 18.813 15.0021 18.4085 15 18V11.4H20.5668C20.6266 11.4004 20.6851 11.3829 20.7349 11.3497C20.7847 11.3165 20.8234 11.2692 20.8461 11.2139C20.8688 11.1586 20.8744 11.0977 20.8623 11.0392C20.8502 10.9806 20.8208 10.927 20.778 10.8852L12 2.16844Z" fill="#ffff"></path></svg>                        
</span> <span>{formData.upvotes || "249"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className='h-4 w-4' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z" fill="#ffff"></path></svg>
                        <span>{formData.comments || "57"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className='h-4 w-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.68675 22.4675C2.49173 22.4682 2.2985 22.4303 2.11814 22.3561C1.93778 22.2819 1.77384 22.1729 1.63571 22.0352C1.49759 21.8975 1.388 21.7339 1.31322 21.5538C1.23844 21.3737 1.19995 21.1806 1.19995 20.9855C1.19995 13.7999 5.78515 8.29194 12 7.80594V4.33914C12.0004 3.94836 12.1167 3.56649 12.3342 3.24185C12.5517 2.9172 12.8607 2.66437 13.2219 2.51535C13.5832 2.36633 13.9805 2.32781 14.3636 2.40467C14.7468 2.48153 15.0985 2.67032 15.3744 2.94714L23.6544 11.2895C23.8424 11.4786 23.9479 11.7345 23.9479 12.0011C23.9479 12.2678 23.8424 12.5236 23.6544 12.7127L15.3744 20.9351C15.0986 21.2127 14.7466 21.4021 14.363 21.4792C13.9795 21.5563 13.5817 21.5177 13.2201 21.3683C12.8585 21.2189 12.5494 20.9654 12.3322 20.64C12.115 20.3146 11.9993 19.932 12 19.5407V16.2287C8.91235 16.5203 7.24675 18.3143 5.34355 20.3627C4.81915 20.9267 4.28635 21.5015 3.71635 22.0511C3.44035 22.3187 3.07075 22.4687 2.68675 22.4675ZM12.9 9.57114C7.48915 9.57114 3.35515 14.0855 3.02635 20.1971C3.36835 19.8467 3.69715 19.4891 4.02475 19.1375C6.19195 16.7999 8.43355 14.3879 12.9 14.3879H13.8V19.5407C13.7976 19.5757 13.807 19.6105 13.8265 19.6396C13.8461 19.6687 13.8747 19.6905 13.908 19.7015C13.9395 19.7162 13.9749 19.7204 14.0091 19.7135C14.0432 19.7066 14.0742 19.6889 14.0976 19.6631L21.8232 11.9999L14.0976 4.21674C14.0743 4.1908 14.0433 4.17305 14.0091 4.16613C13.975 4.15922 13.9395 4.1635 13.908 4.17834C13.8749 4.18976 13.8465 4.21164 13.827 4.24065C13.8075 4.26967 13.798 4.30424 13.8 4.33914V9.57114H12.9Z" fill="#ffff"></path></svg>
                        <span>Share</span>
                      </div>
                    </div>
                
            
              </div>
            </div>
            <div className='flex items-center justify-center'>
             <div className="md:absolute items-center justify-center text-center bottom-0 mb-6">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mx-auto">
                  <Lightbulb className="w-4 h-4" />
                  Feedback
                </button>
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