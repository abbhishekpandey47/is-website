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
  const { title, description, content, authorName, category } = blogData;

  // Extract first 2000 characters of clean content (remove markdown syntax)
  const cleanContent = content
    ? content
        .replace(/^#+ .+$/gm, '') // Remove headings
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`.*?`/g, '') // Remove inline code
        .replace(/\*\*.*?\*\*/g, '') // Remove bold
        .replace(/\*.*?\*/g, '') // Remove italic
        .trim()
        .substring(0, 2000)
    : '';

  const prompt = `Please summarize this technical blog post in 5-7 concise bullet points:

**Title:** ${title || 'Blog Post'}
**Author:** ${authorName || 'Unknown'}
**Category:** ${category || 'Technical'}
**Description:** ${description || 'No description available'}

**Content Preview:**
${cleanContent}

**Instructions:**
- Focus on the main insights, comparisons, and key takeaways
- Highlight tool recommendations or best practices mentioned
- Keep each bullet point clear and actionable
- Maintain technical accuracy
- Format for easy reading

Please provide a clear, developer-friendly summary.`;

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
