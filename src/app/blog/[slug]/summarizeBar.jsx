"use client";
import { useState } from 'react';
import { AI_MODELS } from '../../../config/aiModels';

// SVG Logo Components - Using real AI logos
const ChatGPTLogo = () => (
  <img 
    src="/ai-logos/chatgpt.svg" 
    alt="ChatGPT" 
    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
    loading="eager"
  />
);

const GoogleAILogo = () => (
  <img 
    src="/ai-logos/googleai.svg" 
    alt="Google AI" 
    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
    loading="eager"
  />
);

const GrokLogo = () => (
  <img 
    src="/ai-logos/grok.svg" 
    alt="Grok" 
    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
    loading="eager"
  />
);

const ClaudeLogo = () => (
  <img 
    src="/ai-logos/claude.svg" 
    alt="Claude" 
    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
    loading="eager"
  />
);

const PerplexityLogo = () => (
  <img 
    src="/ai-logos/perplexity.svg" 
    alt="Perplexity" 
    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
    loading="eager"
  />
);

// Map model IDs to their logo components
const modelLogos = {
  chatgpt: ChatGPTLogo,
  googleai: GoogleAILogo,
  grok: GrokLogo,
  claude: ClaudeLogo,
  perplexity: PerplexityLogo,
};

export default function SummarizeBar({ blogData }) {
  const [loadingModel, setLoadingModel] = useState(null);
  const [error, setError] = useState(null);

  // Generate prompt on client side for instant loading
  const generatePrompt = () => {
    const { title, slug, category } = blogData;
    const isCaseStudy = category === "Case Studies";
    const url = slug 
      ? (isCaseStudy ? `https://www.infrasity.com/case-studies/${slug}` : `https://www.infrasity.com/blog/${slug}`)
      : 'https://www.infrasity.com/blog';

    return `I'm reading the blog post by Infrasity about "${title}".

${url}

Summarize the key insights from this blog post. What stands out in their approach or ideas?

Reflect on how Infrasity's perspective adds value for teams working with developer marketing, technical content, and API documentation.`;
  };

  const handleSummarize = (modelId) => {
    // Prevent multiple clicks
    if (loadingModel) return;
    
    setLoadingModel(modelId);
    setError(null);

    try {
      // Find the model
      const model = AI_MODELS.find(m => m.id === modelId);
      if (!model) {
        throw new Error('Model not found');
      }

      // Generate prompt instantly
      const prompt = generatePrompt();
      const encodedPrompt = encodeURIComponent(prompt);
      const finalUrl = `${model.urlPattern}${encodedPrompt}`;

      // Open window directly with the URL - FASTEST METHOD
      const newWindow = window.open(finalUrl, '_blank', 'noopener,noreferrer');
      
      // Check if popup was blocked
      if (!newWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Success feedback
      setError('Opening AI model...');
      setTimeout(() => setError(null), 2000);
    } catch (err) {
      console.error('Error handling summarization:', err);
      setError(err.message || 'An error occurred');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoadingModel(null);
    }
  };

  const enabledModels = AI_MODELS.filter(model => model.enabled);

  return (
    <div className="w-full flex justify-center my-8 px-4">
      <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 sm:px-6 py-3 bg-[#1a1d2e]/90 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl max-w-full">
        {/* Sparkle Icon */}
        <div className="flex items-center gap-2.5 text-gray-200">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6L12 2z"/>
          </svg>
          <span className="text-sm sm:text-base font-medium whitespace-nowrap">Summarize with</span>
        </div>

        {/* Model Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {enabledModels.map((model) => {
            const LogoComponent = modelLogos[model.id];
            return (
              <button
                key={model.id}
                onClick={() => handleSummarize(model.id)}
                disabled={loadingModel !== null}
                className="group relative p-2.5 sm:p-3 rounded-full bg-[#2a2d3e]/80 hover:bg-[#3a3d4e]/90 border border-white/5 hover:border-white/20 transition-all duration-200 active:scale-95 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation shadow-lg hover:shadow-xl"
                aria-label={model.displayName}
              >
                {loadingModel === model.id ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
                ) : (
                  LogoComponent && <LogoComponent />
                )}
                
                {/* Hover Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900/95 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 border border-white/10">
                  {model.displayName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error/Success Message */}
      {error && (
        <div className={`fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 px-4 py-3 rounded-lg shadow-2xl backdrop-blur-md ${
          error.includes('Opening')
            ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
            : 'bg-red-500/20 border border-red-500/30 text-red-200'
        } text-sm sm:text-base max-w-md mx-auto sm:mx-0`}>
          {error}
        </div>
      )}
    </div>
  );
}
