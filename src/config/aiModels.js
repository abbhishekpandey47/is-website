// AI Models Configuration
// This file contains all AI model details for the blog summarization feature

export const AI_MODELS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    displayName: 'ChatGPT',
    baseUrl: 'https://chatgpt.com/',
    urlPattern: 'https://chatgpt.com/?q=',
    icon: '🤖', // We'll use emojis for now, can replace with actual icons later
    color: '#10a37f', // ChatGPT brand color
    enabled: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    displayName: 'Claude',
    baseUrl: 'https://claude.ai/',
    urlPattern: 'https://claude.ai/new?q=',
    icon: '🧠',
    color: '#D97757', // Claude brand color
    enabled: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    displayName: 'Perplexity',
    baseUrl: 'https://www.perplexity.ai/',
    urlPattern: 'https://www.perplexity.ai/?q=',
    icon: '🔍',
    color: '#00B8D4',
    enabled: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    displayName: 'Gemini',
    baseUrl: 'https://gemini.google.com/',
    urlPattern: 'https://gemini.google.com/app?hl=en&q=',
    icon: '✨',
    color: '#8E75F0',
    enabled: true,
  },
  {
    id: 'copilot',
    name: 'Copilot',
    displayName: 'Copilot',
    baseUrl: 'https://copilot.microsoft.com/',
    urlPattern: 'https://copilot.microsoft.com/?q=',
    icon: '🤖',
    color: '#0078D4',
    enabled: true,
  },
];

// Rate limiting configuration
export const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60000, // 1 minute
};

// Feature flags
export const FEATURE_FLAGS = {
  enableAnalytics: true,
  enableCaching: true,
  cacheTTL: 300000, // 5 minutes in milliseconds
};
