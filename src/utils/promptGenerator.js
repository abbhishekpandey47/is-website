// Prompt Generator Utility
// Generates optimized summarization prompts for different AI models

/**
 * Generates a blog summary prompt
 * @param {Object} blogData - Blog post data
 * @param {string} blogData.title - Blog title
 * @param {string} blogData.description - Blog description
 * @param {string} blogData.content - Blog markdown content
 * @param {string} blogData.authorName - Author name
 * @param {string} blogData.category - Blog category
 * @returns {string} - Formatted prompt for AI models
 */
export function generateSummaryPrompt(blogData) {
  const { title, description, slug, authorName } = blogData;
  
  // Construct the full blog URL
  const blogUrl = `https://www.infrasity.com/blog/${slug}`;

  const prompt = `I'm reading the blog post by Infrasity about "${title}".

${blogUrl}

Summarize the key insights from this blog post. What stands out in their approach or ideas?

Reflect on how Infrasity's perspective adds value for teams working with developer marketing, technical content, and API documentation.`;

  return prompt;
}

/**
 * Generates a URL with encoded prompt for specific AI model
 * @param {string} modelId - AI model identifier
 * @param {string} prompt - The prompt text
 * @param {string} baseUrl - Base URL pattern for the model
 * @returns {string} - Complete URL with encoded prompt
 */
export function generateModelUrl(modelId, prompt, baseUrl) {
  const encodedPrompt = encodeURIComponent(prompt);
  return `${baseUrl}${encodedPrompt}`;
}

/**
 * Truncates content to specified length while preserving word boundaries
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateContent(text, maxLength = 2000) {
  if (!text || text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Validates blog data before generating prompt
 * @param {Object} blogData - Blog data to validate
  * @returns {Object} - Validation result {valid: boolean, errors: string[]}
 */
export function validateBlogData(blogData) {
  const errors = [];

  if (!blogData) {
    errors.push('Blog data is required');
    return { valid: false, errors };
  }

  if (!blogData.title || blogData.title.trim() === '') {
    errors.push('Blog title is required');
  }

  if (!blogData.content || blogData.content.trim() === '') {
    errors.push('Blog content is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
