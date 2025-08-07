"use client"
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

const CustomDropdown = ({ label, options, value, onChange, minWidth, getOptionIcon, getSelectedIcon }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`appearance-none bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-3xl px-6 py-3 pr-10 text-white text-sm font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c5ce8] focus:border-transparent ${minWidth}`}
            >
                <span className="flex items-center">
                    <span className="mr-2">{getSelectedIcon ? getSelectedIcon(value) : getOptionIcon(value)}</span>
                    {value}
                </span>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 py-2">
                        {options.map((option, index) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150 flex items-center ${value === option ? 'bg-gray-700 text-blue-400' : ''
                                    } ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
                            >
                                <span className="mr-2">{getOptionIcon(option)}</span>
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function AIVideoScriptGenerator() {
    const [prompt, setPrompt] = useState('');
    const [toolsInvolved, setToolsInvolved] = useState('Choose the type...');
    const [selectedAudience, setSelectedAudience] = useState('Tools Involved');
    const [targetAudience, setTargetAudience] = useState('Target Audience');
    
    const [generatedComment, setGeneratedComment] = useState("");
    const [error, setError] = useState("");

    const toneOptions = ['Tool Comparison', 'Feature Demo', 'Coding Walkthrough', 'Bug Fixing Session', 'Prompt Testing', 'Productivity Tips', 'Behind the Scenes', 'Real-world Scenario Demo', 'Code Optimization Breakdown'];
    const audienceOptions = ['GitHub Copilot', 'CodeRabbit', 'Gemini', 'Cody', 'Amazon CodeWhisperer', 'Tabnine', 'Qodo', 'Replit Ghostwriter', 'Codeium'];
    const platformOptions = ['Beginner Developers', 'Intermediate Developers', 'Senior Engineers', 'AI/ML Enthusiasts', 'Frontend Developers', 'Backend Developers', 'DevOps Professionals', 'Content Creators', 'CTOs / Tech Decision Makers'];

    const getToneIcon = (tone) => {
        const icons = {
            'Tool Comparison': '🔍',
            'Feature Demo': '✨ ',
            'Coding Walkthrough': '🧑‍💻',
            'Bug Fixing Session': '🐛',
            'Prompt Testing': '🧪',
            'Productivity Tips': '⚡',
            'Behind the Scenes': '🎬',
            'Real-world Scenario Demo': '🌍',
            'Code Optimization Breakdown': '🧠',
        };
        return icons[tone] || '';
    };

    const getAudienceIcon = (audience) => {
        const icons = {
            'General Audience': '',
            'Beginner': '',
            'Expert': '',
            'Business': '',
            'Students': ''
        };
        return icons[audience] || '';
    };

    const getPlatformIcon = (platform) => {
        const icons = {
            'Youtube': '',
            'TikTok': <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 448 512" class="h-4 w-4 text-[#fff]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>,
            'Instagram': '',
            'Facebook': '',
            'LinkedIn': ''
        };
        return icons[platform] || '';
    };

    const handleSubmit = ({
      
    })


    const handleGenerateComment = async () => {
    setGenerateLoading(true);
    setError("");
    setContextError("");
    // Validate extra context
    if (extraContext.length > CONTEXT_CHAR_LIMIT) {
      setContextError(`Max ${CONTEXT_CHAR_LIMIT} characters allowed.`);
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
            prompt: prompt,
            targetAudience: targetAudience,
            selectedAudience: selectedAudience,
            toolsInvolved: toolsInvolved
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

    return (
        <div className="min-h-screen bg-black text-white mt-36 mb-80">
            <div className="flex items-center justify-center pt-8 pb-4">
                <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-[#6c5ce8]/40">
                    <div className="w-4 h-4 rounded mr-2 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 stroke-slate-100" />
                    </div>
                    <span className="font-[quicksand] text-sm text-gray-300 font-bold">Script Generator</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="font-[quicksand] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                        AI VIDEO SCRIPT GENERATOR
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 font-medium max-w-2xl mx-auto">
                        Generate free scripts for social media videos, explainers, marketing campaigns, and more
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-8">
                    <div className="flex flex-wrap sm:flex-nowrap justify-center md:justify-start items-center gap-4 sm:gap-6">
                        <CustomDropdown
                            label="Tone"
                            options={toneOptions}
                            value={toolsInvolved}
                            onChange={setToolsInvolved}
                            minWidth="min-w-[120px]"
                            getOptionIcon={getToneIcon}
                        />

                        <CustomDropdown
                            label="Audience"
                            options={audienceOptions}
                            value={selectedAudience}
                            onChange={setSelectedAudience}
                            minWidth="min-w-[140px]"
                            getOptionIcon={getAudienceIcon}
                        />

                        <CustomDropdown
                            label="Platform"
                            options={platformOptions}
                            value={targetAudience}
                            onChange={setTargetAudience}
                            minWidth="min-w-[110px]"
                            getOptionIcon={getPlatformIcon}
                        />
                    </div>
                </div>
                
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. The best beach for beginner surfers in Europe."
                            className="w-full h-32 sm:h-24 px-6 py-6 pr-16 bg-transparent text-white placeholder-gray-500 resize-none outline-none text-base sm:text-lg rounded-2xl scrollbar-hide ring-[#6c5ce8]/40 focus:ring-1"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            rows={3}
                        />
                        <button 
                      //  onClick={handleSubmit}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-[#6c5ce8] hover:opacity-80 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-lg">
                            <Sparkles className="w-5 h-5 stroke-white/90" />
                        </button>
                    </div>
                </div>

                <div className="pb-16"></div>
            </div>
        </div>
    );
}