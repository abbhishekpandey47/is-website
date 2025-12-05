"use client";
import { useState } from 'react';
import { AI_MODELS } from '../../../config/aiModels';

// Professional SVG Logo Components
const ChatGPTLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const ClaudeLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-1.75c0-2.33 4.67-3.5 7-3.5s7 1.17 7 3.5V19z"/>
  </svg>
);

const PerplexityLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const GeminiLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const CopilotLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
  </svg>
);

const modelLogos = {
  chatgpt: <ChatGPTLogo />,
  claude: <ClaudeLogo />,
  perplexity: <PerplexityLogo />,
  gemini: <GeminiLogo />,
  copilot: <CopilotLogo />
};

/**
 * SummarizeBar Component
 * Displays AI model buttons for blog summarization
 * Only shown on specific blog posts
 */
const SummarizeBar = ({ blogData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async (modelId) => {
    setLoading(true);
    setError(null);

    try {
      // Call API to generate summary prompt and URLs
      const response = await fetch('/api/blog/generateSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogData.title,
          description: blogData.description,
          content: blogData.content,
          authorName: blogData.authorName,
          category: blogData.category,
          slug: blogData.slug,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      // Find the selected model's URL
      const selectedModel = data.data.models.find(m => m.id === modelId);
      
      if (selectedModel) {
        // Special handling for Gemini and Copilot - copy to clipboard and open
        if (modelId === 'gemini' || modelId === 'copilot') {
          // Copy prompt to clipboard
          await navigator.clipboard.writeText(data.data.prompt);
          
          // Open the app without query parameter
          const url = modelId === 'gemini' 
            ? 'https://gemini.google.com/app' 
            : 'https://copilot.microsoft.com/';
          window.open(url, '_blank', 'noopener,noreferrer');
          
          // Show success message
          const modelName = modelId === 'gemini' ? 'Gemini' : 'Copilot';
          setError(`Prompt copied to clipboard! Paste it in ${modelName}.`);
          setTimeout(() => setError(null), 3000);
        } else {
          // For other models (ChatGPT, Claude, Perplexity), open with URL
          window.open(selectedModel.url, '_blank', 'noopener,noreferrer');
        }
      }

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center my-6">
      <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-lg border border-white/10 shadow-lg">
        {/* "Summarize with" text with icon */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span className="text-white font-medium text-sm whitespace-nowrap">
            Summarize with
          </span>
        </div>

        {/* AI Model Buttons */}
        <div className="flex items-center gap-3">
          {AI_MODELS.filter(model => model.enabled).map((model) => (
            <button
              key={model.id}
              onClick={() => handleSummarize(model.id)}
              disabled={loading}
              className="group relative flex items-center justify-center p-2.5 rounded-lg 
                       bg-white/5 hover:bg-white/10 
                       border border-white/10 hover:border-white/20
                       transition-all duration-200 ease-in-out
                       hover:scale-110 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: model.color }}
              aria-label={`Summarize with ${model.displayName}`}
            >
              {/* Logo */}
              {modelLogos[model.id]}
              
              {/* Tooltip on hover */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 
                             bg-gray-900/95 text-white text-sm font-medium rounded-md 
                             opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200 whitespace-nowrap 
                             pointer-events-none z-50
                             shadow-lg border border-white/10">
                {model.displayName}
                {/* Tooltip arrow */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 
                               bg-gray-900/95 border-r border-b border-white/10 
                               rotate-45"></span>
              </span>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-200 blur-sm -z-10"
                style={{ 
                  background: `radial-gradient(circle, ${model.color}, transparent 70%)` 
                }}
              />
            </button>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="ml-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>

      {/* Message (error or success) */}
      {error && (
        <div
          className={`absolute mt-16 px-4 py-2 rounded-lg ${
            error.includes('copied') 
              ? 'bg-green-500/10 border border-green-500/20' 
              : 'bg-red-500/10 border border-red-500/20'
          }`}
          role="alert"
          aria-live="assertive"
        >
          <p className={`text-xs ${
            error.includes('copied') ? 'text-green-400' : 'text-red-400'
          }`}>
            <span className="font-semibold">
              {error.includes('copied') ? 'Success: ' : 'Error: '}
            </span>
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default SummarizeBar;
