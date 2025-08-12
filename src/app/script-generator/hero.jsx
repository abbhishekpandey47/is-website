"use client"
import { Sparkles, X, Copy, Download, Play, Clock, Users, Video } from 'lucide-react';
import { useState } from 'react';

const ScriptDisplay = ({ generatedScript, onClose }) => {
    const [copied, setCopied] = useState(false);

    // Parse the script content into structured sections
    const parseScript = (script) => {
        const sections = [];
        const lines = script.split('\n').filter(line => line.trim());
        
        let currentSection = { type: 'content', content: [] };
        
        lines.forEach(line => {
            line = line.trim();
            
            if (line.startsWith('**[') && line.endsWith(']**')) {
                // Save previous section if it has content
                if (currentSection.content.length > 0) {
                    sections.push(currentSection);
                }
                
                // Start new section
                const title = line.replace(/\*\*\[|\]\*\*/g, '');
                currentSection = {
                    type: getSectionType(title),
                    title: title,
                    content: []
                };
            } else if (line.startsWith('*Visual:')) {
                currentSection.content.push({
                    type: 'visual',
                    text: line.replace('*Visual:', '').replace(/\*/g, '').trim()
                });
            } else if (line.startsWith('**Host:**') || line.startsWith('**Voiceover:**')) {
                const speaker = line.includes('Host') ? 'Host' : 'Voiceover';
                const text = line.replace(/\*\*(Host|Voiceover):\*\*/, '').trim();
                currentSection.content.push({
                    type: 'dialogue',
                    speaker,
                    text
                });
            } else if (line.includes('Section') && line.includes(':')) {
                currentSection.content.push({
                    type: 'section-header',
                    text: line.replace(/\*\*/g, '')
                });
            } else if (line && line !== '---') {
                currentSection.content.push({
                    type: 'text',
                    text: line.replace(/\*\*/g, '')
                });
            }
        });
        
        // Add the last section
        if (currentSection.content.length > 0) {
            sections.push(currentSection);
        }
        
        return sections;
    };

    const getSectionType = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('hook')) return 'hook';
        if (lowerTitle.includes('introduction')) return 'intro';
        if (lowerTitle.includes('main content')) return 'main';
        if (lowerTitle.includes('call to action')) return 'cta';
        if (lowerTitle.includes('closing')) return 'closing';
        return 'content';
    };

    const getSectionIcon = (type) => {
        switch (type) {
            case 'hook': return '🎣';
            case 'intro': return '👋';
            case 'main': return '📋';
            case 'cta': return '📢';
            case 'closing': return '🎬';
            default: return '📝';
        }
    };

    const getSectionColor = (type) => {
        switch (type) {
            case 'hook': return 'from-red-500/20 to-pink-500/20 border-red-500/30';
            case 'intro': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
            case 'main': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
            case 'cta': return 'from-orange-500/20 to-amber-500/20 border-orange-500/30';
            case 'closing': return 'from-purple-500/20 to-violet-500/20 border-purple-500/30';
            default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedScript);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const downloadScript = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedScript], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'ai-video-script.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const parsedSections = parseScript(generatedScript);
    const estimatedDuration = Math.ceil(generatedScript.length / 150); // Rough estimate: 150 chars per minute

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-[#6c5ce8]/20 rounded-full px-3 py-1.5 border border-[#6c5ce8]/40">
                            <Sparkles className="h-4 w-4 stroke-[#6c5ce8] mr-2" />
                            <span className="font-[quicksand] text-sm text-[#6c5ce8] font-bold">Generated Script</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>~{estimatedDuration} min</span>
                            </div>
                            {/* <div className="flex items-center">
                                <Video className="h-4 w-4 mr-1" />
                                <span>{parsedSections.length} sections</span>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={downloadScript}
                            className="flex items-center bg-[#6c5ce8] hover:bg-[#6c5ce8]/80 text-white px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </button>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors duration-200"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
                    <div className="space-y-6">
                        {parsedSections.map((section, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-r ${getSectionColor(section.type)} rounded-xl border p-6 transition-all duration-200 hover:shadow-lg`}
                            >
                                {section.title && (
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl mr-3">{getSectionIcon(section.type)}</span>
                                        <h3 className="font-[quicksand] text-xl font-bold text-white">
                                            {section.title}
                                        </h3>
                                    </div>
                                )}
                                
                                <div className="space-y-3">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            {item.type === 'visual' && (
                                                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-500">
                                                    <div className="flex items-start">
                                                        <div className="flex items-center bg-blue-500/20 rounded-full px-2 py-1 mr-3">
                                                            <Video className="h-3 w-3 text-blue-400 mr-1" />
                                                            <span className="text-xs text-blue-400 font-medium">Visual</span>
                                                        </div>
                                                        <p className="text-gray-300 text-sm italic leading-relaxed">
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {item.type === 'dialogue' && (
                                                <div className="bg-gray-800/30 rounded-lg p-4">
                                                    <div className="flex items-start">
                                                        <div className="flex items-center bg-green-500/20 rounded-full px-3 py-1 mr-3 shrink-0">
                                                            <Users className="h-3 w-3 text-green-400 mr-1" />
                                                            <span className="text-xs text-green-400 font-medium">
                                                                {item.speaker}
                                                            </span>
                                                        </div>
                                                        <p className="text-white leading-relaxed">
                                                            {item.text.replace(/"/g, '')}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {item.type === 'section-header' && (
                                                <div className="bg-[#6c5ce8]/10 rounded-lg p-3 border border-[#6c5ce8]/30">
                                                    <h4 className="font-[quicksand] text-lg font-semibold text-[#6c5ce8]">
                                                        {item.text}
                                                    </h4>
                                                </div>
                                            )}
                                            
                                            {item.type === 'text' && (
                                                <p className="text-gray-300 leading-relaxed">
                                                    {item.text}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-700 p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                            <Sparkles className="h-4 w-4 mr-2 text-[#6c5ce8]" />
                            <span>Generated with AI Script Generator</span>
                        </div>
                        <div className="text-xs">
                            Ready to use • Customizable • Professional Quality
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AIVideoScriptGenerator() {
    const [prompt, setPrompt] = useState('');
    const [toolsInvolved, setToolsInvolved] = useState('Select video type...');
    const [selectedAudience, setSelectedAudience] = useState([]);
    const [targetAudience, setTargetAudience] = useState([]);
    const [generatedComment, setGeneratedComment] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showScript, setShowScript] = useState(false);

const CustomDropdown = ({ label, options, value, onChange, minWidth, getOptionIcon, getSelectedIcon, multiSelect = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        if (multiSelect) {
            const currentValues = Array.isArray(value) ? value : [];
            if (currentValues.includes(option)) {
                // Remove option if already selected
                const newValues = currentValues.filter(v => v !== option);
                onChange(newValues);
            } else {
                // Add option if not selected
                onChange([...currentValues, option]);
            }
        } else {
            onChange(option);
            setIsOpen(false);
        }
    };

    const removeOption = (optionToRemove, e) => {
        e.stopPropagation();
        if (multiSelect && Array.isArray(value)) {
            const newValues = value.filter(v => v !== optionToRemove);
            onChange(newValues);
        }
    };

    const getDisplayValue = () => {
        if (multiSelect) {
            if (!Array.isArray(value) || value.length === 0) {
                return label.includes('Target Audience') ? 'Select target audience...' :
                    label.includes('Tools') ? 'Select tools...' : 'Select options...';
            }
            return `${value.length} selected`;
        }
        return value;
    };

    const isOptionSelected = (option) => {
        if (multiSelect) {
            return Array.isArray(value) && value.includes(option);
        }
        return value === option;
    };

    return (
        <div className="my-4 relative">
            <label className="font-[quicksand] font-semibold">
                {label}
            </label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`appearance-none bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl w-full px-4 py-3 mt-1 pr-10 text-white text-sm font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c5ce8] focus:border-transparent ${minWidth} relative`}
            >
                <span className="flex items-center justify-between">
                    <span className="flex items-center">
                        {!multiSelect && (
                            <span className="">{getSelectedIcon ? getSelectedIcon(value) : getOptionIcon(value)}</span>
                        )}
                        {getDisplayValue()}
                    </span>
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

            {/* Selected options chips for multi-select */}
            {multiSelect && Array.isArray(value) && value.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {value.map((selectedOption) => (
                        <div
                            key={selectedOption}
                            className="flex items-center bg-[#6c5ce8]/40 text-white px-3 py-1 rounded-full text-sm"
                        >
                            <span className="mr-1">{getOptionIcon(selectedOption)}</span>
                            <span>{selectedOption}</span>
                            <button
                                onClick={(e) => removeOption(selectedOption, e)}
                                className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-full min-w-[400px] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 py-2">
                        {options.map((option, index) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150 flex items-center justify-between ${isOptionSelected(option) ? 'bg-gray-700 text-blue-400' : ''
                                    } ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
                            >
                                <div className="flex items-center">
                                    <span className="mr-2">{getOptionIcon(option)}</span>
                                    {option}
                                </div>
                                {multiSelect && isOptionSelected(option) && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


    const videoTypeDrop = ['Tool Comparison', 'Feature Demo', 'Coding Walkthrough', 'Bug Fixing Session', 'Prompt Testing', 'Productivity Tips', 'Behind the Scenes', 'Real-world Scenario Demo', 'Code Optimization Breakdown'];
    const toolsIn = ['GitHub Copilot', 'CodeRabbit', 'Gemini', 'Cody', 'Amazon CodeWhisperer', 'Tabnine', 'Qodo', 'Replit Ghostwriter', 'Codeium'];
    const audienceType = ['Beginner Developers', 'Intermediate Developers', 'Senior Engineers', 'AI/ML Enthusiasts', 'Frontend Developers', 'Backend Developers', 'DevOps Professionals', 'Content Creators', 'CTOs / Tech Decision Makers'];

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
            'GitHub Copilot': '',
            'CodeRabbit': '',
            'Gemini': '',
            'Cody': '',
            'Amazon CodeWhisperer': '',
            'Tabnine': '',
            'Qodo': '',
            'Replit Ghostwriter': '',
            'Codeium': ''
        };
        return icons[audience] || '';
    };

    const getPlatformIcon = (platform) => {
        const icons = {
            'Beginner Developers': '',
            'Intermediate Developers': '',
            'Senior Engineers': '',
            'AI/ML Enthusiasts': '',
            'Frontend Developers': '',
            'Backend Developers': '',
            'DevOps Professionals': '',
            'Content Creators': '',
            'CTOs / Tech Decision Makers': ''
        };
        return icons[platform] || '';
    };

    const handleSubmit = async () => {
        try {
            setError("");
            setGeneratedComment(""); 
            setLoading(true);

            const res = await fetch("https://infrasity-frontend.vercel.app/api/generate-script", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    toolsInvolved,
                    selectedAudience,
                    targetAudience
                }),
            });

            if (!res.ok) throw new Error("Failed to generate script");

            const data = await res.json();
            setGeneratedComment(data.script);
            setShowScript(true); // Show the script modal when data is received
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-36 mb-8">
            {loading && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6c5ce8] mx-auto mb-4"></div>
                        <p className="text-white font-[quicksand] font-semibold">Generating your script...</p>
                    </div>
                </div>
            )}

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
                    <div className="my-4 justify-center md:justify-start items-center gap-4 sm:gap-6">
                        <CustomDropdown
                            label="Video Type"
                            options={videoTypeDrop}
                            value={toolsInvolved}
                            onChange={setToolsInvolved}
                            minWidth="min-w-[120px]"
                            getOptionIcon={getToneIcon}
                            multiSelect={false}
                        />

                        <CustomDropdown
                            label="Tools Involved"
                            options={toolsIn}
                            value={selectedAudience}
                            onChange={setSelectedAudience}
                            minWidth="min-w-[140px]"
                            getOptionIcon={getAudienceIcon}
                            multiSelect={true}
                        />

                        <CustomDropdown
                            label="Target Audience"
                            options={audienceType}
                            value={targetAudience}
                            onChange={setTargetAudience}
                            minWidth="min-w-[110px]"
                            getOptionIcon={getPlatformIcon}
                            multiSelect={true}
                        />
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. The best beach for beginner surfers in Europe."
                            className="w-full h-32 sm:h-24 px-6 py-6 pr-16 bg-transparent text-white placeholder-gray-500 resize-none outline-none text-base sm:text-lg rounded-2xl scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            rows={3}
                        />
                        <button
                            onClick={handleSubmit}
                            className="absolute bottom-4 right-4 w-10 h-10 bg-[#6c5ce8] hover:opacity-80 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-lg"
                        >
                            <Sparkles className="w-5 h-5 stroke-white/90" />
                        </button>
                    </div>
                </div>

                <div className="pb-16"></div>

                {/* Show script modal only when generatedComment has content */}
                {showScript && generatedComment && (
                    <ScriptDisplay 
                        generatedScript={generatedComment} 
                        onClose={() => setShowScript(false)} 
                    />
                )}

                {/* Show error message if there's an error */}
                {error && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-center">
                            {error}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}