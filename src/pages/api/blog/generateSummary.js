// API Endpoint: Generate Summary Prompt
// Handles blog summarization requests and returns AI model URLs

import { AI_MODELS } from '../../../config/aiModels';
import { generateSummaryPrompt, generateModelUrl, validateBlogData } from '../../../utils/promptGenerator';

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip);
  
  // Remove old requests outside the time window
  const validRequests = requests.filter(timestamp => now - timestamp < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return true;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again in a minute.',
      });
    }

    // Extract blog data from request body
    const { title, description, content, authorName, category, slug } = req.body;

    // Validate blog data
    const blogData = { title, description, content, authorName, category };
    const validation = validateBlogData(blogData);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blog data',
        details: validation.errors,
      });
    }

    // Generate the summary prompt
    const prompt = generateSummaryPrompt(blogData);

    // Generate URLs for each enabled AI model
    const models = AI_MODELS.filter(model => model.enabled).map(model => ({
      id: model.id,
      name: model.displayName,
      url: generateModelUrl(model.id, prompt, model.urlPattern),
      color: model.color,
      icon: model.icon,
    }));

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        prompt,
        models,
        blogTitle: title,
        slug,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
