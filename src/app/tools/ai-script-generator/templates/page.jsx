"use client"
import React, { useState, useMemo } from "react";
import ScriptData from "./script.js";
import { Sparkles, X, Copy, Download, Clock, FileText, PlayCircle, Search, Filter, User, ChevronRight, } from 'lucide-react';


const ScriptDisplay = ({ generatedScript, onClose, comparisonTitle = null, videoType }) => {
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

            if (line.startsWith('### ') || (line.startsWith('**') && line.endsWith(':**'))) {
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
                <div className="lg:flex items-center justify-center lg:justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
                    <div className="lg:flex my-4 md:my-0 items-center justify-center space-x-3">
                        <div className="flex items-center justify-center bg-[#6c5ce8]/20 rounded-full px-4 py-2 border border-[#6c5ce8]/40">
                            <Sparkles className="h-5 w-5 mr-2" />
                            <span className="font-[quicksand] text-sm text-white font-bold">
                                {displayTitle}
                            </span>
                        </div>
                        <div className="flex my-4 md:my-0 items-center justify-center space-x-4 text-sm text-gray-400">
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
                    <div className="flex items-center justify-center space-x-2">
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
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 absolute lg:static top-8 right-4"
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
                            <span>AI-Powered Analysis</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default function Page() {
  const [selectedScript, setSelectedScript] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    return [...new Set(ScriptData.map(script => script.category))];
  }, []);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

  const filteredScripts = useMemo(() => {
    return ScriptData.filter(script => {
      const matchesSearch = searchQuery === '' || 
        script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.intro.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(script.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Business': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Strategy': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Analytics': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Design': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Management': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const FilterSidebar = ({ className = "" }) => (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Filter Templates</h2>
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Use Case</h3>
          <span className="text-sm text-gray-400">{categories.length}</span>
        </div>
        
        <div className="space-y-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            const scriptsInCategory = ScriptData.filter(script => script.category === category).length;
            
            return (
              <label
                key={category}
                className="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-700/30 border-gray-600/30"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(category)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected 
                        ? "bg-[#6b5be7] border-[#6b5be7]"
                        : 'border-gray-500 bg-transparent'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-200">{category}</span>
                </div>
                <span className="text-xs text-gray-400">{scriptsInCategory}</span>
              </label>
            );
          })}
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${getCategoryColor(category)}`}
              >
                {category}
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="hover:bg-white/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-20 sm:pt-36 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
        {selectedScript ? (
          <ScriptDisplay
            generatedScript={selectedScript.content}
            onClose={() => setSelectedScript(null)}
            comparisonTitle={`Script #${selectedScript.id}: ${selectedScript.title}`}
            videoType="Tool Comparison"
          />
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="font-[quicksand] text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-4">
                Ready-Made Video Script Library
              </h1>
              <p className="font-[quicksand] text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                Scripts tailored for startups building in infra, AI, or SaaS. Pick a template, plug in your context, and get a record-ready script in minutes.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6 sm:mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 stroke-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search scripts by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-600/50 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 outline-none focus:ring-0 focus:border-blue-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filter Toggle & Results Info */}
            <div className="flex items-center justify-between gap-4 px-1">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters</span>
                {selectedCategories.length > 0 && (
                  <span className="bg-[#6b5be7] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                )}
              </button>

              {/* Results Info */}
              <p className="text-gray-400 text-xs sm:text-sm flex-1 text-right">
                {filteredScripts.length === ScriptData.length 
                  ? `${filteredScripts.length} scripts`
                  : `${filteredScripts.length} of ${ScriptData.length}`
                }
                {selectedCategories.length > 0 && (
                  <span className="hidden sm:inline">
                    {' in '}
                    {selectedCategories.length === 1 
                      ? selectedCategories[0]
                      : `${selectedCategories.length} categories`
                    }
                  </span>
                )}
              </p>
            </div>

            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                <div className="absolute inset-x-0 top-0 bg-gray-900 border-b border-gray-700/50 max-h-[80vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">Filter Scripts</h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                    <FilterSidebar />
                    <div className="mt-6 pt-4 border-t border-gray-700/30">
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-full bg-[#6b5be7] hover:bg-[#6b5be7]/80 text-white py-3 rounded-lg transition-colors font-medium"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-8">
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-40">
                  <FilterSidebar />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                {filteredScripts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredScripts.map((script) => (
                      <div
                        key={script.id}
                        onClick={() => setSelectedScript(script)}
                        className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:bg-gray-800/70 relative"
                      >
                        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(script.category)}`}>
                              {script.category}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <ChevronRight size={20} className="text-gray-400 group-hover:text-white" />
                            </div>
                          </div>
                          
                          <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#6b5be7] transition-colors line-clamp-2">
                            {script.title}
                          </h2>
                          
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-3 sm:mb-4 group-hover:text-gray-300 transition-colors">
                            {script.intro}
                          </p>
                        </div>

                        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/30 border-t border-gray-700/30">
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span className="text-xs sm:text-sm">{script.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                              <PlayCircle size={16} />
                              <span className="font-medium text-xs sm:text-sm">View Script</span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto border border-gray-700/30">
                      <Search className="h-12 sm:h-16 w-12 sm:w-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No scripts found</h3>
                      <p className="text-gray-400 mb-4 text-sm sm:text-base">
                        {searchQuery && selectedCategories.length > 0
                          ? `No scripts match "${searchQuery}" in the selected categories`
                          : searchQuery 
                            ? `No scripts match "${searchQuery}"`
                            : selectedCategories.length > 0
                              ? `No scripts found in the selected categories`
                              : "No scripts available"
                        }
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-colors text-sm sm:text-base"
                      >
                        Clear filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
