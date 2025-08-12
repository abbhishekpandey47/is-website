export const videoTypePrompts = {
"Tool Comparison": ({ toolsInvolved, targetAudience, title = null }) => `
Create a comprehensive tool comparison analysis with the following specifications:

TITLE: Use this exact format: "# ${title || `Tool Comparison: ${toolsInvolved.join(" vs ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why Tool Selection Matters
Write 2-3 sentences explaining why choosing the right tool from these options is crucial for ${targetAudience.join(", ")}. Focus on impact on productivity, learning curve, and outcomes.

## Overview
Provide exactly 2-3 bullet points per tool using this format:
* **[Tool Name]:** Brief description in 1-2 sentences highlighting core purpose and key differentiator.

## Feature Comparison

**Tool Performance:**
* **Speed:** Rate and compare each tool's performance speed
* **Accuracy:** Evaluate the reliability and correctness of each tool
* **Ease of Use:** Assess user-friendliness and learning curve

**Key Capabilities:**
* **[Primary Feature]:** Compare how each tool handles this feature
* **[Secondary Feature]:** Compare capabilities across tools
* **[Additional Feature]:** Highlight unique strengths per tool

## Pricing Analysis
For each tool, provide:
* **[Tool Name]:** Pricing structure, free tier details, and value assessment

## Real-World Usage
Provide 2-3 specific, practical examples for each tool:
* **[Tool Name]:** List concrete use cases and scenarios

## Pros and Cons
For each tool, use exactly this format:
**[Tool Name]:**
✅ Strengths: List 3-4 key advantages
❌ Limitations: List 2-3 main drawbacks

## Final Recommendation
Provide specific recommendations based on different user scenarios:
* **For [User Type/Scenario]:** Recommend specific tool with reasoning
* **For [Different Scenario]:** Alternative recommendation

## Next Steps
Provide 4-6 numbered actionable steps:
1. [First concrete action]
2. [Second step]
3. [Continue with specific steps]

FORMATTING REQUIREMENTS:
- Use bullet points (*) for lists under each section
- Use ✅ and ❌ for pros/cons only
- Keep tool names consistent throughout
- Write in professional, analytical tone
- Avoid filler words and promotional language
- Make each section substantial but scannable
- Ensure factual accuracy and practical insights
`,

  "Coding Walkthrough": ({ toolsInvolved, targetAudience }) => `
    You are a senior software engineer.
    Walkthrough code using: ${toolsInvolved.join(", ")}.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: Why this coding concept matters
    - Setup & environment
    - Step-by-step code explanation
    - Best practices
    - Recap & CTA
    Style: Clear, beginner-friendly, and educational.
  `,

  "Bug Fixing Session": ({ toolsInvolved, targetAudience }) => `
    You are a debugging expert.
    Fixing issues using: ${toolsInvolved.join(", ")}.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: The problem & its impact
    - Debugging steps
    - Root cause explanation
    - Fix implementation
    - Validation & testing
    - Summary & CTA
    Style: Problem-solving, engaging, and technical.
  `,

  "Prompt Testing": ({ toolsInvolved, targetAudience }) => `
    You are an AI prompt engineer.
    Testing prompts on: ${toolsInvolved.join(", ")}.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: Why prompt quality matters
    - Test setup & methodology
    - Different prompts with outputs
    - Insights & learnings
    - Summary & CTA
    Style: Experimental, data-driven, and curious.
  `,

  "Productivity Tips": ({ toolsInvolved, targetAudience }) => `
    You are a productivity coach for tech professionals.
    Using: ${toolsInvolved.join(", ")}.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: Why productivity boosts matter
    - 3 actionable tips
    - Quick recap
    - CTA
    Style: Motivational, concise, and inspiring.
  `,

  "Behind the Scenes": ({ toolsInvolved, targetAudience }) => `
    You are a storyteller.
    Behind the scenes of using: ${toolsInvolved.join(", ")}.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: Tease the big reveal
    - Overview of the project
    - Step-by-step process
    - Challenges & wins
    - Closing & CTA
    Style: Transparent, casual, and relatable.
  `,

  "Real-world Scenario Demo": ({ toolsInvolved, targetAudience }) => `
    You are a technical trainer.
    Demonstrating ${toolsInvolved.join(", ")} in a real-world scenario.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: Why this scenario matters
    - Setup & context
    - Step-by-step execution
    - Results & impact
    - Summary & CTA
    Style: Practical, relatable, and informative.
  `,

  "Code Optimization Breakdown": ({ toolsInvolved, targetAudience }) => `
    You are a performance optimization expert.
    Improving code using: ${toolsInvolved.join(", ")}.
    Audience: ${targetAudience.join(", ")}.
    Structure:
    - Hook: Why optimization matters
    - Initial performance metrics
    - Step-by-step improvements
    - Before & after results
    - Summary & CTA
    Style: Analytical, technical, and insightful.
  `,
};
