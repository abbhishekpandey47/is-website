// AI Models Configuration
// This file contains all AI model details for the blog summarization feature

export const AI_MODELS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    displayName: 'ChatGPT',
    baseUrl: 'https://chatgpt.com/',
    urlPattern: 'https://chatgpt.com/?q=',
    color: '#10a37f',
    enabled: true,
  },
  {
    id: 'googleai',
    name: 'Google AI',
    displayName: 'Google AI',
    baseUrl: 'https://www.google.com/search',
    urlPattern: 'https://www.google.com/search?udm=50&q=',
    color: '#4285F4',
    enabled: true,
  },
  {
    id: 'grok',
    name: 'Grok',
    displayName: 'Grok',
    baseUrl: 'https://x.com/i/grok',
    urlPattern: 'https://x.com/i/grok?text=',
    color: '#1DA1F2',
    enabled: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    displayName: 'Claude',
    baseUrl: 'https://claude.ai/',
    urlPattern: 'https://claude.ai/new?q=',
    color: '#D97757',
    enabled: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    displayName: 'Perplexity',
    baseUrl: 'https://www.perplexity.ai/',
    urlPattern: 'https://www.perplexity.ai/?q=',
    color: '#20B8CD',
    enabled: true,
  },
];

// Rate limiting configuration
export const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60000, // 1 minute
};

// Feature flags
export const FEATURES = {
  summarization: true,
  analytics: false, // For future use
};

// Cache configuration
export const CACHE_CONFIG = {
  ttl: 300000, // 5 minutes
  maxSize: 100,
};
