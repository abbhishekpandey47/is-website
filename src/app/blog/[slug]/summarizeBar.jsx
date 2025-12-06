"use client";
import { useState } from 'react';
import { AI_MODELS } from '../../../config/aiModels';

// SVG Logo Components
const ChatGPTLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const ClaudeLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.5 2h-13A3.5 3.5 0 0 0 2 5.5v13A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-13A3.5 3.5 0 0 0 18.5 2zm-1.6 15.2c-.3.2-.7.2-1 0l-3.9-2.8-3.9 2.8c-.3.2-.7.2-1 0-.3-.2-.5-.6-.5-1V7.8c0-.4.2-.8.5-1 .3-.2.7-.2 1 0L12 9.6l3.9-2.8c.3-.2.7-.2 1 0 .3.2.5.6.5 1v8.4c0 .4-.2.8-.5 1z"/>
  </svg>
);

const PerplexityLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.48l7 3.5v7.84l-7-3.5V9.48zm16 7.84l-7 3.5V12.98l7-3.5v7.84z"/>
  </svg>
);

const GeminiLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CopilotLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// Map model IDs to their logo components
const modelLogos = {
  chatgpt: ChatGPTLogo,
  claude: ClaudeLogo,
  perplexity: PerplexityLogo,
  gemini: GeminiLogo,
  copilot: CopilotLogo,
};

export default function SummarizeBar({ blogData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async (modelId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/blog/generateSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      // Find the specific model data
      const modelData = data.data.models.find(m => m.id === modelId);

      if (!modelData) {
        throw new Error('Model not found');
      }

      // Special handling for Gemini and Copilot (clipboard copy)
      if (modelId === 'gemini' || modelId === 'copilot') {
        try {
          await navigator.clipboard.writeText(data.data.prompt);
          setError(`Prompt copied to clipboard! Paste it in ${modelData.name}.`);
          
          // Open the base URL without prompt (they don't support URL params well)
          const baseUrl = modelId === 'gemini' 
            ? 'https://gemini.google.com/app' 
            : 'https://copilot.microsoft.com/';
          window.open(baseUrl, '_blank', 'noopener,noreferrer');
          
          // Clear success message after 5 seconds
          setTimeout(() => setError(null), 5000);
        } catch (clipboardError) {
          throw new Error('Failed to copy to clipboard');
        }
      } else {
        // For other models, directly open with URL parameters
        window.open(modelData.url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Error handling summarization:', err);
      setError(err.message || 'An error occurred');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const enabledModels = AI_MODELS.filter(model => model.enabled);

  return (
    <div className="w-full flex justify-center my-8">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
        {/* Sparkle Icon */}
        <div className="flex items-center gap-2 text-gray-300">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6L12 2z"/>
          </svg>
          <span className="text-sm font-medium">Summarize with</span>
        </div>

        {/* Model Buttons */}
        <div className="flex items-center gap-2">
          {enabledModels.map((model) => {
            const LogoComponent = modelLogos[model.id];
            return (
              <button
                key={model.id}
                onClick={() => handleSummarize(model.id)}
                disabled={loading}
                className="group relative p-2 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: model.color }}
                title={model.displayName}
              >
                {LogoComponent && <LogoComponent />}
                
                {/* Hover Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {model.displayName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        )}
      </div>

      {/* Error/Success Message */}
      {error && (
        <div className={`fixed bottom-8 right-8 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md ${
          error.includes('copied') 
            ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
            : 'bg-red-500/20 border border-red-500/30 text-red-200'
        }`}>
          {error}
        </div>
      )}
    </div>
  );
}
