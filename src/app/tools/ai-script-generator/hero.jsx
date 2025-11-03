"use client"
import { Clock, Copy, Download, FileText, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputIssuesCard from './InputIssuesCard';

const ScriptDisplay = ({ generatedScript, onClose, comparisonTitle = null, regenerateText, videoType }) => {
    const [copied, setCopied] = useState(false);
    const [copiedSections, setCopiedSections] = useState({});

    const parseScript = (script) => {
        const sections = [];
        const lines = script.split('\n');
        let metadata = null;
        let remainingScript = script;

        const fencedJsonMatch = script.match(/^\s*```json\s*([\s\S]*?)```/i);
        if (fencedJsonMatch) {
            try {
                metadata = JSON.parse(fencedJsonMatch[1]);
                remainingScript = script.replace(fencedJsonMatch[0], '').trim();
            } catch (err) {
                metadata = null;
            }
        } else {
            // 2) Try raw JSON object at very start: { ... }
            const rawJsonMatch = script.match(/^\s*({[\s\S]*?})/);
            if (rawJsonMatch) {
                try {
                    metadata = JSON.parse(rawJsonMatch[1]);
                    remainingScript = script.replace(rawJsonMatch[1], '').trim();
                } catch (err) {
                    metadata = null;
                }
            }
        }

        // Now proceed to parse the remaining script (without the JSON block)
        const contentLines = remainingScript.split('\n').filter(line => line.trim());
        let currentSection = { type: 'content', content: [], rawContent: '' };
        let mainTitle = null;
        let sectionRawContent = '';

        contentLines.forEach(rawLine => {
            let line = rawLine.trim();
            sectionRawContent += rawLine + '\n';

            // Headers
            if (line.startsWith('# ')) {
                mainTitle = line.replace('# ', '');
                if (currentSection.content.length > 0) {
                    currentSection.rawContent = sectionRawContent.slice(0, -rawLine.length - 1);
                    sections.push(currentSection);
                    sectionRawContent = rawLine + '\n';
                }
                currentSection = { type: 'main-title', title: mainTitle, content: [], rawContent: '' };
                return;
            }

            if (line.startsWith('## ')) {
                if (currentSection.content.length > 0) {
                    currentSection.rawContent = sectionRawContent.slice(0, -rawLine.length - 1);
                    sections.push(currentSection);
                    sectionRawContent = rawLine + '\n';
                }
                const title = line.replace('## ', '');
                currentSection = { type: getSectionType(title), title, content: [], rawContent: '' };
                return;
            }

            if (line.startsWith('### ') || (line.startsWith('**' ) && line.endsWith(':**'))) {
                const title = line.replace(/###\s|^\*\*|\*\*:$/g, '');
                currentSection.content.push({ type: 'subsection', title, items: [] });
                return;
            }

            // Lists and icons
            if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('✅') || line.startsWith('❌')) {
                let icon, text, isStrong = false;
                if (line.startsWith('✅')) {
                    icon = '✅';
                    text = line.replace(/^✅\s*/, '');
                } else if (line.startsWith('❌')) {
                    icon = '❌';
                    text = line.replace(/^❌\s*/, '');
                } else if (line.startsWith('* ')) {
                    text = line.replace(/^\*\s*/, '');
                    if (text.match(/^\*\*[^*]+\*\*:/)) {
                        isStrong = true;
                        icon = 'bold';
                        text = text.replace(/^\*\*([^*]+)\*\*:\s*/, '**$1:** ');
                    } else {
                        icon = '•';
                    }
                } else {
                    icon = '•';
                    text = line.replace(/^\-\s*/, '');
                }

                const listItem = { type: 'list-item', icon, text, isStrong };

                const last = currentSection.content[currentSection.content.length - 1];
                if (last && last.type === 'subsection') {
                    last.items.push(listItem);
                } else {
                    currentSection.content.push(listItem);
                }
                return;
            }

            // Nested bullet detection (indented)
            if (/^\s{4,}[\*\-]\s/.test(rawLine)) {
                const text = rawLine.replace(/^\s+[\*\-]\s*/, '');
                const nestedItem = { type: 'list-item', icon: '◦', text, isNested: true };
                const last = currentSection.content[currentSection.content.length - 1];
                if (last && last.type === 'subsection') {
                    last.items.push(nestedItem);
                } else {
                    currentSection.content.push(nestedItem);
                }
                return;
            }

            // Numbered items
            if (/^\d+\.\s/.test(line)) {
                const number = line.match(/^(\d+)\.\s/)[1];
                const text = line.replace(/^\d+\.\s/, '');
                currentSection.content.push({ type: 'numbered-item', number, text });
                return;
            }

            // Fallback paragraph
            if (line && line !== '---') {
                currentSection.content.push({ type: 'paragraph', text: line.replace(/\*\*/g, '') });
            }
        });

        if (currentSection.content.length > 0) {
            currentSection.rawContent = sectionRawContent;
            sections.push(currentSection);
        }

        return { sections, mainTitle, metadata };
    };

    const getSectionType = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('why') || lowerTitle.includes('matter')) return 'intro';
        if (lowerTitle.includes('overview')) return 'overview';
        if (lowerTitle.includes('feature') || lowerTitle.includes('comparison')) return 'features';
        if (lowerTitle.includes('pricing') || lowerTitle.includes('cost')) return 'pricing';
        if (lowerTitle.includes('usage') || lowerTitle.includes('real-world')) return 'usage';
        if (lowerTitle.includes('pros') || lowerTitle.includes('cons')) return 'pros-cons';
        if (lowerTitle.includes('recommendation') || lowerTitle.includes('final')) return 'recommendation';
        if (lowerTitle.includes('next') || lowerTitle.includes('steps')) return 'action';
        return 'content';
    };

    const getSectionIcon = (type) => {
        // Remove all icons - return empty string for all types
        return '';
    };

    const getSectionColor = (type) => {
        switch (type) {
            case 'main-title': return 'from-purple-600/30 to-indigo-600/30 border-purple-500/40';
            case 'intro': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
            case 'overview': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
            case 'features': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
            case 'pricing': return 'from-red-500/20 to-pink-500/20 border-red-500/30';
            case 'usage': return 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30';
            case 'pros-cons': return 'from-teal-500/20 to-green-500/20 border-teal-500/30';
            case 'recommendation': return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
            case 'action': return 'from-violet-500/20 to-purple-500/20 border-violet-500/30';
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

    const copySectionToClipboard = async (sectionIndex, sectionContent) => {
        try {
            // Clean the content by removing all formatting and unwanted elements
            let cleanContent = sectionContent || '';

            // Remove code blocks and their language identifiers
            cleanContent = cleanContent.replace(/```[\w]*\n?/g, '');
            cleanContent = cleanContent.replace(/```/g, '');

            // Remove all markdown formatting
            cleanContent = cleanContent
                .replace(/\*\*/g, '') // Remove bold markdown
                .replace(/^\*\s+/gm, '') // Remove bullet points
                .replace(/^-\s+/gm, '') // Remove dash bullets
                .replace(/^•\s+/gm, '') // Remove bullet symbols
                .replace(/^✅\s*/gm, '') // Remove checkmarks
                .replace(/^❌\s*/gm, '') // Remove X marks
                .replace(/^#+\s+/gm, '') // Remove headers
                .replace(/^\d+\.\s+/gm, '') // Remove numbered lists
                .replace(/\[[\d:–-]+\]/g, '') // Remove time codes
                .replace(/^\s*\*\*([^*]+)\*\*:\s*/gm, '$1: ') // Convert **Label:** to Label:
                .replace(/^\s*\*\*([^*]+)\*\*\s*–\s*/gm, '$1 - ') // Convert **Tool** – to Tool -
                .replace(/\*\*Strengths:\*\*/g, 'Strengths:') // Clean section headers
                .replace(/\*\*Limitations:\*\*/g, 'Limitations:') // Clean section headers
                .replace(/\*\*/g, '') // Remove any remaining bold formatting
                .replace(/^>\s+/gm, '') // Remove blockquotes
                .replace(/^\s*[\*\-•]\s*/gm, '') // Remove any remaining bullets
                .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
                .replace(/^\s+/gm, '') // Remove leading spaces
                .trim();

            // Remove common prefixes that might appear
            cleanContent = cleanContent
                .replace(/^text\s*/i, '') // Remove 'text' prefix
                .replace(/^bash\s*/i, '') // Remove 'bash' prefix
                .replace(/^javascript\s*/i, '') // Remove 'javascript' prefix
                .replace(/^html\s*/i, '') // Remove 'html' prefix
                .replace(/^css\s*/i, '') // Remove 'css' prefix;

            await navigator.clipboard.writeText(cleanContent);
            setCopiedSections(prev => ({ ...prev, [sectionIndex]: true }));
            setTimeout(() => {
                setCopiedSections(prev => ({ ...prev, [sectionIndex]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy section text: ', err);
        }
    };

    const downloadScript = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedScript], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'tool-comparison-analysis.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const { sections: parsedSections, mainTitle, metadata } = parseScript(generatedScript);
    const estimatedReadTime = Math.ceil(generatedScript.length / 1000);
    const displayTitle = comparisonTitle || mainTitle || 'Tool Comparison Analysis';

    function linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            try {
                let domain = new URL(url).hostname.replace(/^www\./, ""); // remove www.
                return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#3b82f6">${domain}</a>`;
            } catch (e) {
                return url;
            }
        });
    }



    return (
        <div className="fixed inset-0 /80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="lg:flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
                    <div className="flex-1 lg:flex my-4 md:my-0 items-center justify-center lg:justify-start space-y-3 lg:space-y-0 lg:space-x-3 min-w-0">
                        <div className="flex items-center justify-center bg-[#6c5ce8]/20 rounded-2xl px-4 py-3 border border-[#6c5ce8]/40 min-w-0 max-w-full lg:max-w-md">
                            <Sparkles className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="font-[quicksand] text-sm text-white font-bold break-words leading-tight">
                                {displayTitle}
                            </span>
                        </div>

                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 flex-shrink-0">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>~{estimatedReadTime} min read</span>
                            </div>
                            <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-1" />
                                <span>{parsedSections.length} sections</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end space-x-2 mt-4 lg:mt-0 flex-shrink-0 relative">
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            {copied ? 'Copied!' : 'Copy All'}
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
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 lg:static absolute top-[-2rem] right-0 lg:top-auto lg:right-auto hover:bg-gray-800"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                    <div className="space-y-6">
                        {/* Title Section (Always show) */}
                        {mainTitle && (
                            <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-purple-500/40 rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <h1 className="font-[quicksand] font-bold text-white text-3xl">
                                            {mainTitle}
                                        </h1>
                                    </div>
                                    <button
                                        onClick={() => copySectionToClipboard('title', mainTitle)}
                                        className="flex items-center bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-3 py-1.5 rounded-lg transition-colors duration-200 text-xs font-medium border border-purple-500/30"
                                    >
                                        <Copy className="h-3 w-3 mr-1" />
                                        {copiedSections['title'] ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Metadata preview (only if metadata exists) */}
                        {metadata && (
                            <div className="ml-4 text-sm text-gray-300">
                                {metadata.title || metadata.Title ? (
                                    <div className="mb-1">
                                        <strong className="text-white">{metadata.title || metadata.Title}</strong>
                                    </div>
                                ) : null}

                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                    {metadata.videoLength && (
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            <span>{metadata.videoLength}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {parsedSections.filter(section => section.type !== 'main-title').map((section, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-r ${getSectionColor(section.type)} rounded-xl border p-6 transition-all duration-200 hover:shadow-lg`}
                            >
                                {section.title && (
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <h3 className="font-[quicksand] font-bold text-white text-xl">
                                                {section.title}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => copySectionToClipboard(index, section.rawContent || section.title)}
                                            className="flex items-center bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-3 py-1.5 rounded-lg transition-colors duration-200 text-xs font-medium border border-gray-600/30"
                                        >
                                            <Copy className="h-3 w-3 mr-1" />
                                            {copiedSections[index] ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            {item.type === 'subsection' && (
                                                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                                                    <h4 className="font-[quicksand] text-lg font-semibold text-[#6c5ce8] mb-3">
                                                        {item.title.replace(/\*/g, '')}
                                                    </h4>

                                                    {item.items && (
                                                        <div className="space-y-2">
                                                            {item.items.map((listItem, listIndex) => (
                                                                <div key={listIndex} className={`flex items-start ${listItem.isNested ? 'ml-4' : ''}`}>
                                                                    {listItem.icon === 'bold' ? (
                                                                        <div className="w-full">
                                                                            <p className="text-white font-semibold leading-relaxed"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: listItem.text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <span className="mr-3 mt-0.5 text-sm">
                                                                                {listItem.icon}
                                                                            </span>
                                                                            <p className="text-gray-300 leading-relaxed"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: listItem.text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {item.type === 'list-item' && (
                                                <div className={`flex items-start mb-2 ${item.isNested ? 'ml-4' : ''}`}>
                                                    {item.icon === 'bold' ? (
                                                        <div className="w-full">
                                                            <p className="text-white font-semibold leading-relaxed"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="mr-3 mt-0.5 text-sm flex-shrink-0">
                                                                {item.icon}
                                                            </span>
                                                            <p className="text-gray-300 leading-relaxed"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            {item.type === 'numbered-item' && (
                                                <div className="flex items-start mb-2">
                                                    <div className="bg-[#6c5ce8]/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                                        <span className="text-[#6c5ce8] text-xs font-bold">
                                                            {item.number}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {item.text.replace(/\*/g, '')}
                                                    </p>
                                                </div>
                                            )}

                                            {item.type === 'paragraph' && (
                                                <p className="text-gray-300 leading-relaxed mb-3"
                                                    dangerouslySetInnerHTML={{
                                                        __html: linkify(item.text)
                                                    }} />

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
                            <span>{`Generated ${videoType} • AI-Powered Analysis`}</span>
                        </div>
                        <div className="text-xs">
                            <button
                                onClick={() => {
                                    onClose();
                                    regenerateText();
                                }}
                                className="flex items-center bg-[#6c5ce8] hover:bg-[#6c5ce8]/80 text-white px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Regenerate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AIVideoScriptGenerator() {
    const [prompt, setPrompt] = useState('');
    const [videoType, setVideoType] = useState('Select video type...');
    const [toolsIn, setToolsIn] = useState([]);
    const [videoLength, setVideoLength] = useState('Select video Length...');
    const [linkForRef, setLinkForRef] = useState("");
    const [toolsInvolved, setToolsInvolved] = useState([]);
    const [targetAudience, setTargetAudience] = useState([]);
    const [generatedComment, setGeneratedComment] = useState("");
    const [error, setError] = useState("");
    const [inputIssues, setInputIssues] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showScript, setShowScript] = useState(false);
    const [regenerate, setRgenerate] = useState(false)

    const CustomDropdown = ({ label, options, value, onChange, minWidth, getOptionIcon, getSelectedIcon, multiSelect = false, allowCustom = false }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [showCustomInput, setShowCustomInput] = useState(false);
        const [customValue, setCustomValue] = useState('');

        const displayOptions = allowCustom ? [...options, 'Other'] : options;

        const handleSelect = (option) => {
            if (option === 'Other' && allowCustom) {
                setShowCustomInput(true);
                setIsOpen(false);
                return;
            }

            if (multiSelect) {
                const currentValues = Array.isArray(value) ? value : [];
                if (currentValues.includes(option)) {
                    const newValues = currentValues.filter(v => v !== option);
                    onChange(newValues);
                } else {
                    onChange([...currentValues, option]);
                }
            } else {
                onChange(option);
                setIsOpen(false);
            }
        };

        const handleCustomAdd = () => {
            if (customValue.trim() && multiSelect) {
                const currentValues = Array.isArray(value) ? value : [];
                if (!currentValues.includes(customValue.trim())) {
                    onChange([...currentValues, customValue.trim()]);
                }
                setCustomValue('');
                setShowCustomInput(false);
            }
        };

        const handleCustomKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleCustomAdd();
            } else if (e.key === 'Escape') {
                setCustomValue('');
                setShowCustomInput(false);
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

                {showCustomInput && (
                    <>
                        <div
                            className="fixed inset-0 z-30 /50"
                            onClick={() => {
                                setShowCustomInput(false);
                                setCustomValue('');
                            }}
                        />
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 w-96">
                            <h3 className="text-white font-semibold mb-4">Add Custom Option</h3>
                            <input
                                type="text"
                                value={customValue}
                                onChange={(e) => setCustomValue(e.target.value)}
                                onKeyDown={handleCustomKeyPress}
                                placeholder="Enter custom option..."
                                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6c5ce8] focus:border-transparent"
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => {
                                        setShowCustomInput(false);
                                        setCustomValue('');
                                    }}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCustomAdd}
                                    disabled={!customValue.trim()}
                                    className="px-4 py-2 bg-[#6c5ce8] text-white rounded-lg hover:bg-[#5a4fd8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute top-full left-0 mt-2 w-full min-w-[400px] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 py-2">
                            {displayOptions.map((option, index) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150 flex items-center justify-between ${isOptionSelected(option) ? 'bg-gray-700 text-blue-400' : ''
                                        } ${index === 0 ? 'rounded-t-lg' : ''} ${index === displayOptions.length - 1 ? 'rounded-b-lg' : ''}`}
                                >
                                    <div className="flex items-center">
                                        <span className="mr-2">{getOptionIcon(option)}</span>
                                        <span>{option}</span>
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
    const audienceType = ['Beginner Developers', 'Intermediate Developers', 'Senior Engineers', 'AI/ML Enthusiasts', 'Frontend Developers', 'Backend Developers', 'DevOps Professionals', 'Content Creators', 'CTOs / Tech Decision Makers'];
    const videoLengthDrop = ['0 to 2 Minutes', '2 to 8 Minutes', '8 to 12 Minutes', '12 to 20 Minutes'];
    const toolsMap = {
        'Tool Comparison': [
            'GitHub Copilot',
            'Codeium',
            'Gemini (Google)',
            'OpenAI GPT',
            'Claude(Anthropic)',
            'Tabnine',
            'Replit Ghostwriter',
            'v0.dev',
            'Cursor',
            'Cursor AI',
            'Qodo',
            'Cline'
        ],

        'Feature Demo': [
            'Next.js',
            'Vercel',
            'Supabase',
            'Firebase',
            'Descript',
            'GitHub Copilot',
            'Neon',
            'PlanetScale',
            'Neon'

        ],

        'Coding Walkthrough': [
            'VS Code',
            'GitHub Copilot',
            'Next.js',
            'Node.js',
            'TypeScript',
            'Docker',
            'Postman',
            'Python'
        ],

        'Bug Fixing Session': [
            'Chrome DevTools',
            'VS Code',
            'Sentry',
            'Postman',
            'Jest',
            'GitHub Copilot',
            'Codeium',
            'Jest',
            'Pytest'

        ],

        'Prompt Testing': [
            'Gemini',
            'OpenAI GPT',
            'Claude',
            'LlamaIndex',
            'LangChain',
            'Pinecone',
            'Anthropic Claude'
        ],

        'Productivity Tips': [
            'Notion',
            'Trello',
            'Slack',
            'Jira',
            'Zapier',
            'Google Calendar',
            'GitHub Copilot',
            'Linear',
            'Asana'

        ],

        'Behind the Scenes': [
            'Figma',
            'Notion',
            'OBS Studio',
            'Descript',
            'Canva',
            'GitHub',
            'Vercel',
            'Whimsical'
        ],

        'Real-world Scenario Demo': [
            'Next.js',
            'AWS Lambda',
            'Docker',
            'Postman',
            'Firebase',
            'GitHub Copilot',
            'Codeium'
        ],

        'Code Optimization Breakdown': [
            'Chrome DevTools',
            'cProfile (Python)',
            'py-spy',
            'Node.js Profiler',
            'Flamegraph (perf tools)',
            'Redis',
            'AWS X-Ray'
        ]
    };

    useEffect(() => {
        if (videoType && videoType !== 'Select video type...') {
            setToolsIn(toolsMap[videoType] || []);
        } else {
            setToolsIn([]);
        }
    }, [videoType]);

    const getToneIcon = (tone) => {
        const icons = {
            'Tool Comparison': '',
            'Feature Demo': '',
            'Coding Walkthrough': '',
            'Bug Fixing Session': '',
            'Prompt Testing': '',
            'Productivity Tips': '',
            'Behind the Scenes': '',
            'Real-world Scenario Demo': '',
            'Code Optimization Breakdown': '',
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
            setInputIssues(null);
            setGeneratedComment("");
            setLoading(true);

            const res = await fetch("/api/generate-script", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    videoType,
                    toolsInvolved,
                    targetAudience,
                    videoLength,
                    linkForRef
                }),
            });

            if (res.status === 400) {
                const contentType = res.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    try {
                        const errorData = await res.json();
                        setInputIssues({
                            problems: errorData.problems || [],
                            suggestedFixes: errorData.suggestedFixes || []
                        });
                    } catch (parseError) {
                        setError("Failed to parse validation error response");
                    }
                } else {
                    const text = await res.text();
                    setError(`Validation error: ${text.substring(0, 100)}`);
                }
                return;
            }

            if (!res.ok) {
                const contentType = res.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    try {
                        const errorData = await res.json();
                        setError(errorData.message || errorData.error || "Failed to generate script");
                    } catch (parseError) {
                        setError(`Failed to parse error response (${res.status})`);
                    }
                } else {
                    // If response is not JSON, try to get text
                    const text = await res.text();
                    setError(text ? `Server error: ${text.substring(0, 200)}` : `Failed to generate script (${res.status})`);
                }
                return;
            }

            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                const text = await res.text();
                setError(`Unexpected response format: ${text.substring(0, 200)}`);
                return;
            }

            try {
                const data = await res.json();
                if (!data.script) {
                    setError("Invalid response format: script not found");
                    return;
                }
                setGeneratedComment(data.script);
                setShowScript(true);
            } catch (parseError) {
                setError(`Failed to parse response: ${parseError.message}`);
            }
        } catch (err) {
            console.error("Error in handleSubmit:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const [loadingText, setLoadingText] = useState("Generating your script...");

    // Auto-fix functionality
    const handleAutoFix = (fix) => {
        switch (fix.action) {
            case 'add_tool':
                // Add a suggested tool based on video type
                const suggestedTools = {
                    'Coding Walkthrough': ['VS Code', 'GitHub Copilot', 'Codeium'],
                    'Tool Comparison': ['GitHub Copilot', 'Codeium', 'Tabnine'],
                    'Bug Fixing Session': ['Chrome DevTools', 'VS Code Debugger', 'Postman'],
                    'Prompt Testing': ['ChatGPT', 'Claude', 'Gemini']
                };
                const tools = suggestedTools[videoType] || ['VS Code', 'GitHub Copilot'];
                const newTool = tools.find(tool => !toolsInvolved.includes(tool)) || tools[0];
                if (newTool && !toolsInvolved.includes(newTool)) {
                    setToolsInvolved([...toolsInvolved, newTool]);
                }
                break;
            case 'change_type':
                // Change to a single-tool friendly type
                const singleToolTypes = {
                    'Coding Walkthrough': 'Feature Demo',
                    'Tool Comparison': 'Feature Demo',
                    'Bug Fixing Session': 'Feature Demo',
                    'Prompt Testing': 'Feature Demo'
                };
                const newType = singleToolTypes[videoType] || 'Feature Demo';
                setVideoType(newType);
                break;
        }
        // Clear the input issues after applying fix
        setInputIssues(null);
    };

    useEffect(() => {
        if (loading) {
            const messages = [
                "Analyzing video type...",
                "Analyzing tools...",
                "Analyzing audience...",
                "Finalizing your script..."
            ];
            let index = 0;

            const interval = setInterval(() => {
                setLoadingText(messages[index]);
                index++;
                if (index >= messages.length) {
                    index = messages.length - 1;
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [loading]);



    return (
        <div className=" text-white pt-36 -mb-16">
            {loading && (
                <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6c5ce8] mx-auto mb-4"></div>
                        <p className="text-white font-[quicksand] font-semibold">{loadingText}</p>
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
                        <span className="specialtext">Video Scripts Built for Developer Audiences</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 font-medium max-w-2xl mx-auto">
                        From AI agents to testing platforms, devboxes to code review tools—generate scripts that speak your audience’s language
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-8">
                    <div className="my-4 justify-center md:justify-start items-center gap-4 sm:gap-6">
                        <CustomDropdown
                            label="Select video type (how-to, comparison, explainer, use case, etc.)"
                            options={videoTypeDrop}
                            value={videoType}
                            onChange={setVideoType}
                            minWidth="min-w-[120px]"
                            getOptionIcon={getToneIcon}
                            multiSelect={false}
                        />

                        <CustomDropdown
                            label="Select tools, frameworks, or platforms"
                            options={toolsIn}
                            value={toolsInvolved}
                            onChange={setToolsInvolved}
                            minWidth="min-w-[140px]"
                            getOptionIcon={getAudienceIcon}
                            multiSelect={true}
                            allowCustom={true}  // This enables the "Other" option
                        />
                        <CustomDropdown
                            label="Select target audience (developers, testers, platform engineers, etc.)"
                            options={audienceType}
                            value={targetAudience}
                            onChange={setTargetAudience}
                            minWidth="min-w-[110px]"
                            getOptionIcon={getPlatformIcon}
                            multiSelect={true}
                        />
                        <div className='md:flex items-center justify-center gap-8'>
                            <CustomDropdown
                                label="Video Length"
                                options={videoLengthDrop}
                                value={videoLength}
                                onChange={setVideoLength}
                                minWidth="min-w-[250px]"
                                getOptionIcon={getPlatformIcon}
                                multiSelect={false}
                            />
                            <div className="flex flex-col min-w-[300px]">
                                <label className="font-[quicksand] font-semibold">Tool / Reference Link</label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        let value = e.target.value.trim();

                                        // Allow only valid domain formats (with or without protocol)
                                        const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

                                        if (domainRegex.test(value)) {
                                            // Add protocol if missing
                                            if (!/^https?:\/\//i.test(value)) {
                                                value = `https://${value}`;
                                            }
                                            setLinkForRef(value);
                                        } else {
                                            setLinkForRef("");
                                        }
                                    }}
                                    placeholder="Enter Your Links"
                                    className="appearance-none bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-xl w-full px-4 py-3 mt-1 pr-10 text-white text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c5ce8] focus:border-transparent relative"
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="relative max-w-2xl mx-auto mb-8">
                    <div
                        className="relative rounded-2xl shadow-2xl overflow-hidden ai-border"
                        style={{
                            '--glow-angle': '90deg',
                        }}
                    >                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. AI Video Scripts for Technical Startups."
                            className="w-full h-32 sm:h-24 px-6 py-6 pr-16 bg-transparent text-white placeholder-gray-500 resize-none outline-none text-base sm:text-lg rounded-2xl scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            rows={3}
                        />
                        {regenerate ? (
                            <button
                                onClick={() => {
                                    handleSubmit();
                                    setRgenerate(false);
                                }}
                                className="absolute bottom-4 right-4 w-32 flex items-center justify-center h-10 bg-[#6c5ce8] hover:bg-[#6c5ce8]/80 text-white rounded-xl transition-colors duration-200 text-sm font-medium"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Regenerate
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="absolute bottom-4 right-4 w-10 h-10 bg-[#6c5ce8] hover:opacity-80 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-lg"
                            >
                                <Sparkles className="w-5 h-5 stroke-white/90" />
                            </button>
                        )}

                    </div>
                </div>

                <div className="pb-16"></div>

                {/* Show script modal only when generatedComment has content */}
                {showScript && generatedComment && (
                    <ScriptDisplay
                        generatedScript={generatedComment}
                        onClose={() => setShowScript(false)}
                        regenerateText={() => setRgenerate(true)}
                        videoType={videoType}

                    />
                )}

                {/* Show input issues card for validation errors */}
                {inputIssues && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <InputIssuesCard
                            problems={inputIssues.problems}
                            suggestedFixes={inputIssues.suggestedFixes}
                            onFix={handleAutoFix}
                            onClose={() => setInputIssues(null)}
                        />
                    </div>
                )}

                {/* Show generic error message for other errors */}
                {error && !inputIssues && (
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
