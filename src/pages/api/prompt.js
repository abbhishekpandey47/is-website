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

  "Coding Walkthrough": ({ toolsInvolved, targetAudience, title = null }) => `
Create a detailed, beginner-friendly coding walkthrough with the following specifications:

TITLE: Use this exact format: "# ${title || `Coding Walkthrough: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why This Coding Concept Matters
Write 2-3 sentences explaining why understanding this coding concept is valuable for ${targetAudience.join(", ")}. Focus on practical impact, real-world relevance, and skill growth.

## Setup & Environment
Provide a clear checklist of prerequisites and setup steps:
* Required tools/libraries: ${toolsInvolved.join(", ")}
* Installation instructions (exact commands)
* Project structure or folder setup

## Step-by-Step Implementation
Walk through the code in sequential steps:
1. **Step Name:** Short explanation of the step’s purpose
2. Show the relevant code snippet (syntax-highlighted if possible)
3. Explain what’s happening in simple terms
Repeat until the full feature/concept is implemented.

## Best Practices
Provide 4-6 concise, actionable recommendations:
* Naming conventions
* Error handling
* Performance considerations
* Security implications
* Maintainability tips

## Recap
Summarize the key points in 3-4 bullet points for quick reference.

## Call to Action
End with 2-3 suggestions for applying the learned concept:
* Extend the example with new functionality
* Apply it to a small real-world project
* Practice by rewriting the code in a different way

FORMATTING REQUIREMENTS:
- Use numbered steps for the coding process
- Use bullet points (*) for lists
- Keep all code snippets consistent with the same language style
- Avoid unnecessary filler words; stay concise
- Ensure all instructions are accurate and easy to follow
- Maintain a clear, approachable, and educational tone
`,

"Bug Fixing Session": ({ toolsInvolved, targetAudience, title = null }) => `
Create a detailed bug fixing session guide with the following specifications:

TITLE: Use this exact format: "# ${title || `Bug Fixing Session: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## The Problem & Its Impact
Write 2-3 sentences describing the bug in simple terms. Explain why this issue matters for ${targetAudience.join(", ")} and what negative effects it causes in the system or user experience.

## Debugging Steps
Provide a clear, numbered troubleshooting process:
1. Initial checks and environment verification
2. Log/console output inspection
3. Reproducing the bug
4. Narrowing down potential causes

## Root Cause Explanation
Explain exactly what caused the bug. Include:
* The underlying technical reason
* How the issue was introduced
* Why it wasn't caught earlier

## Fix Implementation
Show the exact changes made to resolve the bug:
* Before and after code snippets
* Explanation of why this fix works
* Any relevant configuration changes

## Validation & Testing
List how to confirm the bug is resolved:
* Manual verification steps
* Automated tests to prevent regression
* Additional edge cases to check

## Summary & Call to Action
Summarize the key lessons learned and provide 2-3 next steps:
* Improve code review process
* Add automated test coverage
* Monitor for similar issues in the future

FORMATTING REQUIREMENTS:
- Use numbered steps for debugging process
- Use bullet points (*) for lists
- Use before/after code blocks where applicable
- Keep explanations concise and factual
- Maintain a problem-solving, engaging, and technical tone

---

### Example Output for Bug Fixing Session (Node.js + Express, Backend Developers)

# Bug Fixing Session: Node.js, Express

## The Problem & Its Impact
Users reported that API responses from the "/users" endpoint were returning empty arrays even when the database contained user records. This impacted reporting features and caused delays in data analytics processing.

## Debugging Steps
1. Checked API logs — confirmed requests were reaching the route handler.
2. Verified database connection — logs showed connection successful.
3. Ran the query manually in MongoDB Compass — data returned as expected.
4. Isolated the route handler code and found the query filter was incorrect.

## Fix Implementation

// Before:
// const users = await User.find({ isActive: "true" });

// After:
// const users = await User.find({ isActive: true });


The fix changes the string "true" to a boolean true, ensuring the query matches the intended documents.

## Validation & Testing
* Called "/users" endpoint — received correct active user data.
* Wrote unit tests to verify "isActive" filtering works correctly.
* Added edge case test for "isActive: false".

## Summary & Call to Action
* Lesson learned: Always validate data types in queries.
* Next steps:
  1. Add automated tests for API endpoints.
  2. Include type-checking in the data access layer.
  3. Implement logging for mismatched query filters.
`,

"Prompt Testing": ({ toolsInvolved, targetAudience, title = null }) => `
Create a detailed prompt testing report with the following specifications:

TITLE: Use this exact format: "# ${title || `Prompt Testing: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why Prompt Quality Matters
Write 2-3 sentences explaining why effective prompt design is important for ${targetAudience.join(", ")}. Focus on how it impacts output accuracy, creativity, and task completion.

## Test Setup & Methodology
Provide:
* Tools/platforms used: ${toolsInvolved.join(", ")}
* Test environment configuration
* Evaluation criteria (e.g., accuracy, relevance, creativity)
* Dataset or scenarios used

## Different Prompts with Outputs
For each tested prompt:
* **Prompt:** Show the exact text used
* **Output:** Show the model’s response (summarized if long)
* **Analysis:** Short commentary on strengths and weaknesses

## Insights & Learnings
Summarize key observations from testing:
* Patterns in what worked well
* Common pitfalls or issues
* Unexpected behaviors

## Summary & Call to Action
Wrap up with 2-3 actionable recommendations:
* How to improve prompt design
* What to test next
* How to scale testing for better results

FORMATTING REQUIREMENTS:
- Use bullet points (*) for lists
- Keep all prompts and outputs clearly separated
- Avoid filler words; stay concise
- Maintain an experimental, data-driven, and curious tone
- Include real, factual observations when possible

---

### Example Output for Prompt Testing (OpenAI GPT-4, AI Researchers)

# Prompt Testing: OpenAI GPT-4

## Why Prompt Quality Matters
For AI researchers, well-crafted prompts are the difference between insightful responses and irrelevant outputs. Good prompt engineering ensures consistency, reduces hallucinations, and improves efficiency.

## Test Setup & Methodology
* **Tools/platforms used:** OpenAI GPT-4, Playground
* **Test environment:** Temperature = 0.7, Max tokens = 300
* **Evaluation criteria:** Accuracy, creativity, relevance
* **Dataset:** 5 factual knowledge queries and 3 creative writing tasks

## Different Prompts with Outputs

**Prompt 1:**  
*"Explain quantum entanglement in simple terms for a 12-year-old."*  
**Output:** "Quantum entanglement is like having two magic dice..."  
**Analysis:** Clear analogy, accessible language. Missed some key quantum details.

**Prompt 2:**  
*"Summarize quantum entanglement for physics PhD students in 100 words."*  
**Output:** Provided a mathematically correct description with Bell’s theorem reference.  
**Analysis:** Technically accurate but slightly exceeded the word count.

**Prompt 3:**  
*"List 3 real-world applications of quantum entanglement with short explanations."*  
**Output:** Quantum cryptography, quantum teleportation, quantum networks — each with concise descriptions.  
**Analysis:** Met requirements exactly, practical examples.

## Insights & Learnings
* Specificity in prompts greatly improves relevance.
* Audience targeting changes style and technical depth.
* Word count limits are respected ~80% of the time.

## Summary & Call to Action
* Always define the audience and context in the prompt.
* Test both general and highly specific variations.
* Next: Experiment with chain-of-thought style prompts for complex reasoning tasks.
`,

  "Productivity Tips": ({ toolsInvolved, targetAudience, title = null }) => `
Create a structured productivity tips guide with the following specifications:

TITLE: Use this exact format: "# ${title || `Productivity Tips with ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why Productivity Boosts Matter
Write 2-3 sentences explaining why productivity improvements are important for ${targetAudience.join(", ")}. Focus on how they help achieve goals faster, reduce stress, and improve overall efficiency.

## 3 Actionable Tips
Provide exactly 3 tips, each with:
* **Tip Name:** Short and clear
* **Description:** 2-3 sentences on how to implement it
* **Benefit:** 1 sentence explaining the impact

## Quick Recap
Summarize the tips in one bullet list for quick reference.

## Call to Action
Write a motivational closing line that encourages ${targetAudience.join(", ")} to apply these tips today.

FORMATTING REQUIREMENTS:
- Use bullet points (*) for lists
- Keep tips concise and practical
- Avoid filler words or vague advice
- Maintain a motivational, concise, and inspiring tone

---

### Example Output for Productivity Tips (Notion, Trello, Remote Developers)

# Productivity Tips with Notion, Trello

## Why Productivity Boosts Matter
For remote developers, staying productive means delivering high-quality work without burning out. The right systems can streamline tasks, improve focus, and create a better work-life balance.

## 3 Actionable Tips
* **Daily Standup Notes in Notion:** Write a quick morning log with top 3 priorities, blockers, and key updates.  
  **Benefit:** Keeps you focused and aligned with the team.

* **Kanban Flow in Trello:** Organize tasks into "To Do," "In Progress," and "Done" columns.  
  **Benefit:** Visual clarity reduces decision fatigue and speeds up execution.

* **Time-Box Deep Work:** Block out 90-minute focus sessions without meetings or distractions.  
  **Benefit:** Increases concentration and task completion speed.

## Quick Recap
* Daily Standup Notes in Notion  
* Kanban Flow in Trello  
* Time-Box Deep Work  

## Call to Action
Start implementing these three tips today and see how much more you can achieve without increasing your working hours.
`,

"Behind the Scenes": ({ toolsInvolved, targetAudience, title = null }) => `
Create a behind-the-scenes storytelling piece with the following specifications:

TITLE: Use this exact format: "# ${title || `Behind the Scenes: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Tease the Big Reveal
Write 2-3 sentences to spark curiosity about the story. Hint at the most exciting or unexpected part without fully revealing it.

## Overview of the Project
Explain in 3-4 sentences:
* The purpose of the project
* Who it’s for (${targetAudience.join(", ")})
* The main tools used: ${toolsInvolved.join(", ")}

## Step-by-Step Process
Describe the journey from start to finish in clear steps. Use bullet points for each major milestone.

## Challenges & Wins
List:
* **Challenges:** 2-3 obstacles faced during the process
* **Wins:** 2-3 successes or breakthroughs achieved

## Closing & Call to Action
Wrap up with:
* A reflection on what was learned
* An invitation for the audience to share thoughts, ask questions, or try something similar

FORMATTING REQUIREMENTS:
- Use bullet points (*) for lists
- Keep the tone transparent, casual, and relatable
- Avoid overly technical language unless essential
- Make it feel like a real “inside look”

---

### Example Output for Behind the Scenes (Figma, Webflow, UX Designers)

# Behind the Scenes: Figma, Webflow

## Tease the Big Reveal
We almost scrapped the entire homepage — until a single design tweak completely changed the client’s reaction. Here’s what really happened.

## Overview of the Project
This was a rapid 2-week redesign for a SaaS dashboard aimed at UX designers. The goal was to create a cleaner, faster, and more intuitive experience. We relied heavily on Figma for design iteration and Webflow for fast deployment.

## Step-by-Step Process
* Mapped out the core user flows from analytics data
* Created low-fidelity wireframes in Figma for quick approval
* Built interactive prototypes for usability testing
* Implemented final designs in Webflow with custom animations

## Challenges & Wins
**Challenges:**
* Tight 2-week deadline
* Unexpected client feedback late in the process
* Performance issues with initial animations

**Wins:**
* User test scores improved by 35%
* The client’s NPS jumped from 6 to 9 after launch
* Achieved a fully responsive build without extra dev resources

## Closing & Call to Action
This project reminded us that small design decisions can have huge impacts. Have you ever had a project turn around because of one tiny change? I’d love to hear your stories.
`,

"Real-world Scenario Demo": ({ toolsInvolved, targetAudience, title = null }) => `
Create a real-world scenario demonstration with the following specifications:

TITLE: Use this exact format: "# ${title || `Real-world Scenario Demo: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why This Scenario Matters
Write 2-3 sentences explaining the importance of this scenario for ${targetAudience.join(", ")}. Emphasize how mastering it can improve efficiency, problem-solving, or project success.

## Setup & Context
Describe:
* The real-world setting or use case
* The main tools used: ${toolsInvolved.join(", ")}
* Any prerequisites or assumptions

## Step-by-Step Execution
Present a clear sequence of steps, each with:
* **Action:** What to do
* **Purpose:** Why it’s necessary
* **Tip:** (Optional) A quick optimization or common pitfall to avoid

## Results & Impact
Summarize:
* The outcome achieved
* Measurable results or improvements
* Feedback from stakeholders or end-users

## Summary & Call to Action
Provide:
* A 2-3 sentence recap of key takeaways
* A motivational prompt encouraging ${targetAudience.join(", ")} to try the scenario themselves

FORMATTING REQUIREMENTS:
- Use bullet points (*) for lists
- Use **bold** for labels like "Action:", "Purpose:", "Tip:"
- Keep tone practical, relatable, and informative
- Avoid unnecessary jargon unless essential for clarity

---

### Example Output for Real-world Scenario Demo (Postman, REST APIs, Backend Developers)

# Real-world Scenario Demo: Postman, REST APIs

## Why This Scenario Matters
For backend developers, the ability to quickly test and debug REST APIs can make the difference between a smooth release and a week of fire-fighting. This skill ensures faster delivery, fewer bugs, and more confidence in deployments.

## Setup & Context
* **Scenario:** Testing a new "user registration" endpoint before pushing it to production
* **Tools:** Postman for API testing, REST APIs for backend communication
* **Prerequisites:** An active development server and access to API documentation

## Step-by-Step Execution
* **Action:** Open Postman and create a new request for the "POST /register" endpoint.  
  **Purpose:** To verify the API works as expected before deployment.  
  **Tip:** Use environment variables for base URLs to easily switch between dev, staging, and prod.

* **Action:** Add request body with "username", "email", and "password" fields.  
  **Purpose:** Simulate actual user input to test the endpoint.

* **Action:** Send the request and inspect the JSON response.  
  **Purpose:** Ensure correct status code ("201 Created") and valid response data.

* **Action:** Test invalid inputs (e.g., missing password).  
  **Purpose:** Confirm that error handling and validation are working.

## Results & Impact
* API returned correct success and error responses
* Validation errors were caught early, saving an estimated 3 hours of debugging later
* Team gained confidence to proceed with deployment

## Summary & Call to Action
Mastering quick, thorough API testing prevents production issues and keeps development moving smoothly. Try setting up your own test suite in Postman today to speed up your debugging workflow.
`,

"Code Optimization Breakdown": ({ toolsInvolved, targetAudience, title = null }) => `
Create a detailed code optimization breakdown with the following specifications:

TITLE: Use this exact format: "# ${title || `Code Optimization Breakdown: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why Optimization Matters
Write 2-3 sentences explaining why code optimization is important for ${targetAudience.join(", ")}. Highlight benefits such as faster execution, reduced resource usage, and better scalability.

## Initial Performance Metrics
Provide:
* Baseline execution time
* Memory usage
* Any profiling tool results from ${toolsInvolved.join(", ")}

## Step-by-Step Improvements
For each improvement, include:
* **Action:** The change made
* **Reasoning:** Why this change improves performance
* **Code Snippet:** Before & after comparison (if applicable)

## Before & After Results
Present:
* A side-by-side table or bullet points comparing key metrics before and after optimization
* Brief analysis of the improvements

## Summary & Call to Action
Write:
* A 2-3 sentence recap of the key optimization strategies used
* A CTA encouraging ${targetAudience.join(", ")} to apply similar techniques to their own code

FORMATTING REQUIREMENTS:
- Use bullet points (*) for lists
- Use **bold** for labels like "Action:", "Reasoning:", "Code Snippet:"
- Include realistic metric examples for credibility
- Keep tone analytical, technical, and insightful

---

### Example Output for Code Optimization Breakdown (Python Profiling Tools, Data Engineers)

# Code Optimization Breakdown: Python Profiling Tools

## Why Optimization Matters
For data engineers, unoptimized code in ETL pipelines can lead to long runtimes, higher infrastructure costs, and missed SLAs. Improving performance not only speeds up workflows but also reduces operational expenses.

## Initial Performance Metrics
* Execution Time: 14.2 seconds for processing 1M rows
* Memory Usage: 512MB peak
* Profiling Results (cProfile): 70% of time spent in "apply" function

## Step-by-Step Improvements
* **Action:** Replaced Pandas "apply" with vectorized operations.  
  **Reasoning:** Vectorized operations in Pandas are significantly faster than row-by-row execution.  
  **Code Snippet:**
  "python"
  # Before
  
  
  # After`
,
};
