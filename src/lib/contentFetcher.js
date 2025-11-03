import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import NodeCache from 'node-cache';
import crypto from 'crypto';

// Cache for 24 hours (86400 seconds)
const cache = new NodeCache({ stdTTL: 86400 });

/**
 * Generate a hash for URL-based caching
 */
function generateUrlHash(url) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

/**
 * Extract key facts from content using simple text analysis
 */
function extractFacts(content, maxFacts = 8) {
  if (!content || content.length < 100) {
    return [];
  }

  const facts = [];
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200);

  // Look for sentences with numbers, statistics, or specific claims
  const factPatterns = [
    /(\d+%|\d+\.\d+%|\d+ percent)/i,
    /(\d+ million|\d+ billion|\d+ thousand)/i,
    /(increased by|decreased by|grew by|fell by)/i,
    /(according to|research shows|studies indicate|data reveals)/i,
    /(first|second|third|primary|main|key|important)/i,
    /(since \d{4}|in \d{4}|during \d{4})/i,
    /(over \d+ years|for \d+ years)/i
  ];

  for (const sentence of sentences) {
    if (facts.length >= maxFacts) break;
    
    const hasFactPattern = factPatterns.some(pattern => pattern.test(sentence));
    const isNotDuplicate = !facts.some(fact => 
      fact.toLowerCase().includes(sentence.toLowerCase().substring(0, 20)) ||
      sentence.toLowerCase().includes(fact.toLowerCase().substring(0, 20))
    );

    if (hasFactPattern && isNotDuplicate) {
      facts.push(sentence);
    }
  }

  // If we don't have enough facts, add some general sentences
  if (facts.length < 3) {
    for (const sentence of sentences) {
      if (facts.length >= maxFacts) break;
      
      const isNotDuplicate = !facts.some(fact => 
        fact.toLowerCase().includes(sentence.toLowerCase().substring(0, 20)) ||
        sentence.toLowerCase().includes(fact.toLowerCase().substring(0, 20))
      );

      if (isNotDuplicate && sentence.length > 30) {
        facts.push(sentence);
      }
    }
  }

  return facts.slice(0, maxFacts);
}

/**
 * Fetch and process a URL to extract content and facts
 */
export async function fetchAndProcessUrl(url) {
  try {
    // Check cache first
    const urlHash = generateUrlHash(url);
    const cached = cache.get(urlHash);
    if (cached) {
      console.log(`Cache hit for URL: ${url}`);
      return cached;
    }

    console.log(`Fetching content from: ${url}`);

    // Fetch the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; InfrasityBot/1.0; +https://infrasity.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Parse with JSDOM
    const dom = new JSDOM(html, {
      url: url,
      contentType: 'text/html',
    });

    // Extract content using Readability
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error('Could not extract readable content from URL');
    }

    // Extract title and content
    const title = article.title || 'Untitled';
    const content = article.textContent || article.content || '';

    // Extract facts from the content
    const facts = extractFacts(content);

    const result = {
      url,
      title,
      content: content.substring(0, 2000), // Limit content length
      facts,
      success: true,
      timestamp: new Date().toISOString()
    };

    // Cache the result
    cache.set(urlHash, result);
    console.log(`Cached content for URL: ${url}`);

    return result;

  } catch (error) {
    console.error(`Error fetching URL ${url}:`, error.message);
    
    return {
      url,
      title: 'Error fetching content',
      content: '',
      facts: [],
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Process multiple URLs and return combined results
 */
export async function processReferenceLinks(links) {
  if (!links || links.length === 0) {
    return {
      contextFacts: [],
      references: []
    };
  }

  const results = await Promise.allSettled(
    links.map(link => fetchAndProcessUrl(link))
  );

  const contextFacts = [];
  const references = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      const { title, url, facts } = result.value;
      
      // Add facts to context
      contextFacts.push(...facts);
      
      // Add to references
      references.push({ title, url });
    }
  });

  // Remove duplicate facts
  const uniqueFacts = [...new Set(contextFacts)].slice(0, 8);

  return {
    contextFacts: uniqueFacts,
    references
  };
}
