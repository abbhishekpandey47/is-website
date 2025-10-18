export const videoTypePrompts = {
"Tool Comparison": ({ toolsInvolved, targetAudience, videoLength, prompt, linkForRef, timecodes, isIDEVsChat }) => `
Create a professional, time-coded video script comparing ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.

### TITLE REQUIREMENT (MANDATORY)
- Start the script with this exact format: "# Tool Comparison: ${toolsInvolved.join(" vs ")}"
- Title must be the very first line of the output
- Use single # only, no additional formatting

### VIDEO LENGTH CALCULATION
- Input: ${videoLength} provided as range (e.g., "5 to 15 Minutes")
- Parse numeric bounds and calculate midpoint in seconds
- Example: "5 to 15 Minutes" → 10 minutes = 600 seconds
- Time allocation (MANDATORY):
  * Introduction: 15% of total runtime
  * Fairness Note: 5% of total runtime (if IDE vs Chat comparison)
  * Setup: 15% of total runtime
  * Prompt Explanation: 10% of total runtime
  * Tool Breakdown: 45% of total runtime (divided equally among tools)
  * Outro: 10% of total runtime
  * Call to Action: 5% of total runtime
- Format timecodes as [mm:ss–mm:ss]
- Ensure sections are contiguous with no gaps

### REQUIRED STRUCTURE (All sections mandatory, exact order)

## Introduction ${timecodes?.intro || '[mm:ss–mm:ss]'}
Write 2-3 clear sentences explaining why choosing the right tool matters for ${targetAudience.join(", ")}. Focus on practical impact and productivity. End with one sentence teasing what the comparison will reveal.

${isIDEVsChat ? `## Fairness Note ${timecodes?.fairness || '[mm:ss–mm:ss]'}
Explain the fundamental interaction differences: IDE assistants provide inline completions within the editor, while chat models require copy-paste between windows. This affects workflow speed, context awareness, and iteration efficiency.

` : ''}## Setup ${timecodes?.setup || '[mm:ss–mm:ss]'}
Describe the test environment clearly. Provide setup commands in simple code block:

\`\`\`bash
git clone [repo_url]
cd [project_name]  
npm install
\`\`\`

## The Prompt (Exact) ${timecodes?.prompt || '[mm:ss–mm:ss]'}
Prompt: ${prompt || "Create a button that shows 'Hello World!' when clicked"}
Explain in 1-2 bullets why this tests real-world capabilities.

## Tool-by-Tool Breakdown ${timecodes?.breakdown || '[mm:ss–mm:ss]'}
**Time: 45% divided equally among ${toolsInvolved.length} tools**

For each tool in order: ${toolsInvolved.join(", ")}, use this format:

**[Tool Name] – [mm:ss–mm:ss]**

**Complete Code Solution:**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World Button</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 50px; }
        button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>
    <button id="helloBtn">Click me!</button>
    <script>
        document.getElementById('helloBtn').addEventListener('click', function() {
            alert('Hello World!');
        });
    </script>
</body>
</html>
\`\`\`

**Filename:** index.html

**How to run:**
1. Save as index.html
2. Open in browser and click the button

**Technical Analysis:**
- **Context Handling:** [Describe how well the tool understood the prompt and provided relevant code]
- **Syntax Accuracy:** [Note any syntax errors, best practices followed, or code quality issues]
- **Code Structure:** [Comment on HTML structure, CSS inclusion, JavaScript organization]
- **Additional Features:** [Mention any extra features like error handling, accessibility, or modern practices]

**Evaluation (Rate 1-5 bullets each):**

* Setup Friction: [1-5 bullets] - How easy to get started
* Integration Flow: [1-5 bullets] - How smoothly it fits into workflow  
* Iteration Speed: [1-5 bullets] - How fast to refine and improve
* Code Correctness: [1-5 bullets] - How accurate the generated code
* Copy-Paste Overhead: [1-5 bullets] - Manual work required (N/A for IDE tools)
* Learning Help: [1-5 bullets] - Quality of explanations and guidance

**Speed:** Fast/Medium/Slow - [Add practical rationale tied to the prompt, e.g., "Copilot suggested the click handler in <1s inside VS Code; GPT required copy-paste switching between windows."]

**Correctness:** High/Medium/Low - [Add practical rationale tied to the prompt, e.g., "Generated working HTML immediately; required minor syntax fixes."]

**Strengths:**
- Key strength 1
- Key strength 2  
- Key strength 3

**Limitations:**
- Main limitation 1
- Main limitation 2

## Comparison Table ${timecodes?.comparison || '[mm:ss–mm:ss]'}
Create a comparison table showing all tools side-by-side:

| Tool | Setup Friction | Integration Flow | Iteration Speed | Code Correctness | Copy-Paste Overhead | Learning Help |
|------|----------------|------------------|-----------------|------------------|-------------------|---------------|
${toolsInvolved.map(tool => `| ${tool} | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] |`).join('\n')}

## Outro Script ${timecodes?.outro || '[mm:ss–mm:ss]'}
Write 2-4 sentences summarizing key findings, highlighting which tools excelled or struggled, and tying back to ${targetAudience.join(", ")} needs. Include specific technical insights about code quality, context handling, and workflow efficiency.

## Call to Action ${timecodes?.cta || '[mm:ss–mm:ss]'}
**For Developers:**
- Clone the example repository and run your own comparison
- Try the tools with your specific use cases and share results
- Read our detailed benchmark analysis on tool performance
- Join the discussion about AI coding assistants in our community

${linkForRef && `For more context or additional information, click here: ${linkForRef}`}

### FORMATTING RULES (STRICT)
- Clean, readable text - avoid excessive symbols
- Use single bullets (-) for lists, not multiple asterisks
- Headers use ## only (double hash)
- Timecodes in [mm:ss–mm:ss] format
- Tool names consistent throughout
- No decorative formatting or extra symbols
- Ensure all sections present in exact order

### CONTENT QUALITY REQUIREMENTS
- Professional, analytical tone
- No promotional language or filler
- Specific, actionable insights
- Consistent evaluation criteria across tools
- Accurate timecode calculations
- Clear, concise explanations
- Every rating must include practical rationale
- Complete, runnable code blocks required for each tool
- Deep technical analysis beyond superficial descriptions

### CODE BLOCK REQUIREMENTS (CRITICAL)
- EVERY code block MUST be a complete, self-contained HTML file
- MUST include: <!DOCTYPE html>, <html>, <head>, <body>, and closing tags
- MUST include basic CSS styling for better presentation
- NO inline text or comments inside fenced code blocks except valid HTML comments
- NO partial code snippets or fragments
- NO explanatory text mixed with code
- Filename MUST be specified outside the code block
- Code MUST be immediately runnable when saved as an HTML file
- Code MUST demonstrate best practices (proper structure, styling, event handling)

### TECHNICAL ANALYSIS REQUIREMENTS
- Context Handling: Analyze how well each tool understood the prompt
- Syntax Accuracy: Note any errors, best practices, or code quality issues
- Code Structure: Comment on HTML structure, CSS inclusion, JavaScript organization
- Additional Features: Mention extra features like error handling, accessibility, modern practices
- Performance: Note any performance considerations or optimizations
- Maintainability: Assess code readability and maintainability
`,

"Bug Fixing Session": ({ toolsInvolved, targetAudience, videoLength, prompt, linkForRef }) => `
Create a professional, structured bug fixing session guide for ${toolsInvolved.join(", ")} aimed at ${targetAudience.join(", ")}.

**IMPORTANT: Output clean, readable text only. Strictly avoid:**
- Code block markers (\`\`\`) unless absolutely necessary for actual code
- Text labels like "text", "bash", "javascript"
- Excessive formatting characters (****), decorative elements
- Icons or emojis in section content
- Unnecessary symbols — keep copy clean and plain

### TITLE REQUIREMENT (MANDATORY)
- Start with: "# Bug Fixing Session: ${toolsInvolved.join(" vs ")}"
- This must be the very first line of the output
- Use single # only, no extra formatting

### VIDEO LENGTH REFERENCE
- Input: ${videoLength} provided as range (e.g., "5 to 15 Minutes")
- Parse numeric bounds and calculate midpoint in seconds
- This midpoint can help pace the walkthrough steps and ensure balanced timing across sections
- Optional: show section durations in [mm:ss–mm:ss] if needed

### REQUIRED STRUCTURE (All sections mandatory, exact order)

## The Problem & Its Impact
Write 2–3 concise sentences explaining the bug in simple terms. Describe why it matters for ${targetAudience.join(", ")} and its negative impact on the system or user experience.

## Debugging Steps
Provide a clear, numbered troubleshooting process:
1. Initial checks and environment verification
2. Log/console output inspection
3. Reproducing the bug
4. Narrowing down potential causes

## Root Cause Explanation
Clearly explain:
* The underlying technical reason for the bug
* How and when the issue was introduced
* Why it was not detected earlier

## Fix Implementation
Show exactly what was changed to resolve the issue:
* Before and after code snippets (use only actual code blocks for code)
* Explanation of why the fix works
* Any relevant configuration changes

## Validation & Testing
List how to confirm the bug is resolved:
* Manual verification steps
* Automated tests to prevent regression
* Additional edge cases to check

## Summary & Call to Action
Summarize key lessons learned in 2–3 sentences and provide next steps:
* Improve code review process
* Add automated test coverage
* Monitor for similar issues in the future  
${linkForRef && `For more context or additional details, click here: ${linkForRef}`}

### FORMATTING RULES (STRICT)
- Numbered steps for debugging
- Bullets (*) for lists
- Before/after code blocks only when showing code
- Plain, professional tone
- No decorative or promotional language
- Ensure all sections are present and in exact order

### CONTENT QUALITY REQUIREMENTS
- Focus on problem-solving clarity
- Keep explanations factual and concise
- Apply consistent evaluation and troubleshooting style across all tools or technologies mentioned

### COPY-FRIENDLY OUTPUT RULES
**Critical: When users copy, ensure clean text output:**
- NO extra formatting symbols or icons in regular text
- NO unnecessary bullet variations or decorative marks
- Only use code blocks for actual code examples
- Maintain plain, readable text ready for direct use
`,

"Prompt Testing": ({ toolsInvolved, targetAudience, videoLength, prompt, linkForRef }) => `
Create a professional, structured prompt testing report for ${toolsInvolved.join(", ")} aimed at ${targetAudience.join(", ")}.

**IMPORTANT: Output clean, readable text only. Strictly avoid:**
- Code block markers (\`\`\`) unless absolutely necessary for actual code
- Text labels like "text", "bash", "javascript"
- Excessive formatting characters (****), decorative elements
- Icons or emojis in section content
- Unnecessary symbols — keep copy clean and plain

### TITLE REQUIREMENT (MANDATORY)
- Start with: "# Prompt Testing: ${toolsInvolved.join(" vs ")}"
- This must be the very first line of the output
- Use single # only, no extra formatting

### VIDEO LENGTH REFERENCE
- Input: ${videoLength} provided as range (e.g., "5 to 15 Minutes")
- Parse numeric bounds and calculate midpoint in seconds
- This midpoint can guide pacing for each section
- Optional: Show section durations in [mm:ss–mm:ss] if relevant

### REQUIRED STRUCTURE (All sections mandatory, exact order)

## Why Prompt Quality Matters
Write 2–3 sentences explaining why effective prompt design is important for ${targetAudience.join(", ")}. Focus on its impact on output accuracy, creativity, and task completion.

## Test Setup & Methodology
Provide:
* Tools/platforms used: ${toolsInvolved.join(", ")}
* Test environment configuration
* Evaluation criteria (e.g., accuracy, relevance, creativity)
* Dataset or scenarios used

## Different Prompts with Outputs
For each tested prompt:
* Prompt: Show the exact text used
* Output: Show the model’s response (summarized if long)
* Analysis: Short commentary on strengths and weaknesses

## Insights & Learnings
Summarize key observations:
* Patterns in what worked well
* Common pitfalls or issues
* Unexpected behaviors

## Summary & Call to Action
Wrap up with 2–3 actionable recommendations:
* How to improve prompt design
* What to test next
* How to scale testing for better results  
${linkForRef && `For more context or additional details, click here: ${linkForRef}`}

### FORMATTING RULES (STRICT)
- Use single bullets (*) for lists
- Keep prompts and outputs clearly separated
- Avoid filler words; stay concise
- Maintain an experimental, data-driven, and analytical tone
- Include real, factual observations when possible
- Ensure all sections are present and in exact order

### CONTENT QUALITY REQUIREMENTS
- Specific, actionable insights
- Consistent evaluation criteria across prompts
- Clear, concise explanations
- Avoid promotional or decorative language

### COPY-FRIENDLY OUTPUT RULES
**Critical: When users copy, ensure clean text output:**
- NO extra formatting symbols or icons in regular text
- NO unnecessary bullet variations
- Only use code blocks for actual code examples
- Maintain plain, readable text ready for direct use
`,

  "Productivity Tips": ({ toolsInvolved, targetAudience, videoLength, prompt, linkForRef }) => `
Create a professional, structured productivity tips guide for ${toolsInvolved.join(", ")} tailored to ${targetAudience.join(", ")}.

**IMPORTANT: Output clean, readable text only. Strictly avoid:**
- Code block markers (\`\`\`) unless for actual code
- Decorative symbols or icons (❌ avoid emojis, ★, →, etc.)
- Unnecessary bold/italic except for headings and key terms
- Extra formatting clutter that reduces copy-paste usability

### TITLE REQUIREMENT
- Start with: "# Productivity Tips with ${toolsInvolved.join(" & ")}"
- This must be the very first line of the output
- Use only a single # for the title

### VIDEO LENGTH REFERENCE
- Input: ${videoLength} (e.g., "5 to 15 Minutes")
- Parse numeric bounds and calculate midpoint in seconds
- This midpoint may guide pacing if tips are adapted into a video

### REQUIRED STRUCTURE (Exact Order)

## Why Productivity Boosts Matter
Write 2–3 sentences explaining why productivity improvements are important for ${targetAudience.join(", ")}. Focus on how they help achieve goals faster, reduce stress, and improve efficiency.

## 3 Actionable Tips
Provide exactly 3 tips, each containing:
* **Tip Name:** Short and clear
* **Description:** 2–3 sentences on how to implement it
* **Benefit:** 1 sentence explaining the impact

## Quick Recap
Summarize the tips in a single bullet list for fast reference.

## Call to Action
Write a motivational closing line encouraging ${targetAudience.join(", ")} to apply these tips immediately.  
${linkForRef && `For further reading or additional resources, see: ${linkForRef}`}

### FORMATTING RULES
- Use single bullets (*) for lists
- Keep all tips practical and easy to understand
- Avoid filler words and vague advice
- Maintain a motivational and concise tone

### CONTENT QUALITY REQUIREMENTS
- Provide real-world, actionable tips
- Ensure each benefit directly links to improved productivity
- Keep explanations direct, free of unnecessary elaboration
- Maintain plain-text formatting for easy copy-paste
`,

"Behind the Scenes": ({ toolsInvolved, targetAudience, videoLength, prompt, linkForRef }) => `
Create an engaging behind-the-scenes storytelling piece for ${toolsInvolved.join(", ")} aimed at ${targetAudience.join(", ")}.

**IMPORTANT: Output clean, readable text only. Strictly avoid:**
- Code block markers (\`\`\`) unless for actual code
- Decorative symbols or emojis
- Overuse of bold or italics — only use where essential
- Extra visual clutter that reduces copy-paste usability

### TITLE REQUIREMENT
- Start with: "# Behind the Scenes: ${toolsInvolved.join(" & ")}"
- This must be the very first line of the output
- Use only a single # for the title

### VIDEO LENGTH REFERENCE
- Input: ${videoLength}
- Parse numeric bounds and calculate midpoint in seconds for pacing if adapted to video

### REQUIRED STRUCTURE (Exact Order)

## Tease the Big Reveal
Write 2–3 sentences that spark curiosity about the story. Hint at the most surprising or exciting part without fully revealing it.

## Overview of the Project
Explain in 3–4 sentences:
* The purpose of the project
* The audience (${targetAudience.join(", ")})
* The main tools used: ${toolsInvolved.join(", ")}

## Step-by-Step Process
Describe the journey from start to finish in clear steps. Use bullet points for each major milestone.

## Challenges & Wins
List:
* **Challenges:** 2–3 key obstacles encountered
* **Wins:** 2–3 successes or breakthroughs

## Closing & Call to Action
End with:
* A short reflection on lessons learned
* An invitation for the audience to comment, ask questions, or try something similar  
${linkForRef && `For more insights, check out: ${linkForRef}`}

### FORMATTING RULES
- Use single bullets (*) for lists
- Maintain a transparent, casual, and relatable tone
- Avoid overly technical language unless essential
- Make it feel like a genuine “inside look”

### CONTENT QUALITY REQUIREMENTS
- Ensure milestones are sequential and clear
- Keep the narrative engaging without unnecessary filler
- Share at least one personal or unexpected insight
`,

"Real-world Scenario Demo": ({ toolsInvolved, targetAudience, videoLength, prompt, linkForRef }) => `
Create a practical real-world scenario demonstration for ${toolsInvolved.join(", ")} aimed at ${targetAudience.join(", ")}.

**TITLE REQUIREMENT:**
- Use exactly: "# Real-world Scenario Demo: ${toolsInvolved.join(" & ")}" as the first line
- Only one # at the start

**VIDEO LENGTH REFERENCE:**
- Input: ${videoLength}
- Use to determine pacing if adapted for video

---

## Why This Scenario Matters
Write 2–3 sentences explaining why this scenario is important for ${targetAudience.join(", ")}. Highlight how mastering it can improve efficiency, problem-solving, or overall success.

## Setup & Context
Describe:
* **Scenario:** The real-world setting or use case
* **Tools:** ${toolsInvolved.join(", ")}
* **Prerequisites:** Any requirements or assumptions

## Step-by-Step Execution
For each step, include:
* **Action:** What to do
* **Purpose:** Why it’s necessary
* **Tip:** (Optional) Quick optimization or common pitfall to avoid

## Results & Impact
Summarize:
* The final outcome
* Any measurable results or improvements
* Feedback from stakeholders or end users

## Summary & Call to Action
Provide:
* A 2–3 sentence recap of the key takeaways
* A motivational closing encouraging ${targetAudience.join(", ")} to try the scenario themselves  
${linkForRef && `For more details, visit: ${linkForRef}`}

---

**FORMATTING RULES:**
- Use * for bullet points
- Bold labels like **Action:**, **Purpose:**, **Tip:**
- Keep the tone practical, relatable, and clear
- Avoid unnecessary jargon unless essential
- Make it feel applicable to real-world work

**QUALITY REQUIREMENTS:**
- Steps should be sequential and easy to follow
- Include at least one optimization or pitfall warning
- Share one tangible, measurable benefit from completing the scenario
`,

"Code Optimization Breakdown": ({ toolsInvolved, targetAudience, title = null }) => `
Create a detailed code optimization breakdown with the following specifications:

TITLE: Use this exact format: "# ${title || `Code Optimization Breakdown: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why Optimization Matters
Write 2–3 sentences explaining why optimization is important for ${targetAudience.join(", ")}. Highlight measurable benefits such as faster execution, reduced memory usage, and improved scalability.

## Initial Performance Metrics
Provide:
* **Execution Time:** Baseline measurement
* **Memory Usage:** Baseline peak usage
* **Profiling Results:** Key bottlenecks identified using ${toolsInvolved.join(", ")}

## Step-by-Step Improvements
For each optimization:
* **Action:** The specific change made
* **Reasoning:** Why this improves performance
* **Code Snippet:** Show before & after code (if applicable)

## Before & After Results
Present:
* A side-by-side table OR bullet points comparing key metrics before and after
* Brief analysis explaining the significance of improvements

## Summary & Call to Action
Include:
* A 2–3 sentence recap of the key strategies used
* A motivational closing encouraging ${targetAudience.join(", ")} to apply similar optimizations in their own work

---

FORMATTING RULES:
- Use * for bullet points
- Bold labels like **Action:**, **Reasoning:**, **Code Snippet:**
- Include realistic example metrics for credibility
- Keep tone analytical, technical, and insightful

---

### Example Output for Code Optimization Breakdown (Python Profiling Tools, Data Engineers)

# Code Optimization Breakdown: Python Profiling Tools

## Why Optimization Matters
For data engineers, inefficient ETL code can result in long runtimes, higher infrastructure costs, and missed SLAs. Optimization reduces processing time, minimizes hardware needs, and increases throughput.

## Initial Performance Metrics
* **Execution Time:** 14.2 seconds for 1M rows
* **Memory Usage:** 512 MB peak
* **Profiling Results (cProfile):** 70% of total runtime spent in \`apply\` function

## Step-by-Step Improvements
* **Action:** Replaced Pandas \`apply\` with vectorized operations.  
  **Reasoning:** Vectorization leverages C-level optimizations in Pandas, eliminating Python-level loops.  
  **Code Snippet:**
  \`\`\`python
  # Before
  df["col3"] = df.apply(lambda row: row.col1 + row.col2, axis=1)

  # After
  df["col3"] = df["col1"] + df["col2"]
  \`\`\`

* **Action:** Switched from CSV to Parquet format for intermediate storage.  
  **Reasoning:** Parquet offers faster read/write speeds and better compression.  

## Before & After Results
| Metric            | Before      | After       |
|-------------------|------------|-------------|
| Execution Time    | 14.2s      | 3.8s        |
| Memory Usage      | 512 MB     | 290 MB      |
| I/O Time          | 5.1s       | 1.2s        |

**Analysis:** Achieved 73% faster execution and 43% less memory usage.

## Summary & Call to Action
By identifying hotspots through profiling and applying targeted optimizations, we drastically reduced runtime and memory load. Try profiling your code today with ${toolsInvolved.join(", ")} — small changes can deliver massive gains.
`,

"Feature Demo": ({ toolsInvolved, targetAudience, title = null }) => `
Create a structured feature demonstration with the following specifications:

TITLE: Use this exact format: "# ${title || `Feature Demo: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why This Feature Matters
Write 2–3 sentences explaining the value of the feature for ${targetAudience.join(", ")}. Focus on how it solves a problem, saves time, or enhances results.

## Feature Overview
Describe:
* **Purpose:** What the feature does
* **Tools:** ${toolsInvolved.join(", ")}
* **Primary Use Cases:** 2–3 quick examples

## Step-by-Step Walkthrough
For each step:
* **Action:** What the user should do
* **Purpose:** Why it’s important
* **Tip:** (Optional) Suggest a best practice or common pitfall to avoid

## Benefits & Impact
List 3–4 key benefits of using this feature, supported by measurable or practical outcomes.

## Summary & Call to Action
Provide:
* A 2–3 sentence recap of why the feature is worth using
* A motivational prompt encouraging ${targetAudience.join(", ")} to try it today

FORMATTING REQUIREMENTS:
- Use * for bullet points
- Bold labels like **Action:**, **Purpose:**, **Tip:**
- Keep tone practical, user-friendly, and slightly enthusiastic
- Avoid unnecessary jargon unless it’s essential for clarity

---

### Example Output for Feature Demo (Canva Magic Resize, Social Media Managers)

# Feature Demo: Canva Magic Resize

## Why This Feature Matters
For social media managers, manually resizing designs for each platform wastes hours each week. Canva’s Magic Resize automates this, ensuring perfect formatting across all channels with a single click.

## Feature Overview
* **Purpose:** Instantly resize a design for multiple platforms without starting from scratch  
* **Tools:** Canva Magic Resize  
* **Primary Use Cases:** Repurposing a Facebook post for Instagram Stories, adapting YouTube thumbnails for Pinterest, and converting flyers into posters

## Step-by-Step Walkthrough
* **Action:** Open your design in Canva and click the "Resize" button.  
  **Purpose:** Access the list of pre-set dimensions for various platforms.  
  **Tip:** Use "Custom Size" if you need non-standard dimensions.

* **Action:** Select multiple formats (e.g., Instagram Story, LinkedIn Post) and click "Copy & Resize."  
  **Purpose:** Generate new versions in separate tabs for quick edits.

* **Action:** Review each resized design and make layout adjustments as needed.  
  **Purpose:** Ensure text, images, and branding remain visually balanced.

## Benefits & Impact
* Saves up to 80% of design resizing time  
* Maintains brand consistency across platforms  
* Eliminates repetitive manual work  
* Enables faster content scheduling and publishing

## Summary & Call to Action
Magic Resize turns a tedious multi-hour process into a 2-minute task, freeing you to focus on strategy and creativity. Try using it for your next campaign and experience the time savings firsthand.
`,
"Coding Walkthrough": ({ toolsInvolved, targetAudience, title = null }) => `
Create a detailed coding walkthrough with the following specifications:

TITLE: Use this exact format: "# ${title || `Coding Walkthrough: ${toolsInvolved.join(", ")}`}"

STRUCTURE: Follow this exact section order and formatting:

## Why This Walkthrough Matters
Write 2–3 sentences explaining why this coding walkthrough is important for ${targetAudience.join(", ")}. Emphasize the skills or concepts they’ll learn and how it applies to real-world problems.

## Project Overview
Describe:
* **Goal:** What you’re building or solving
* **Tools/Technologies:** ${toolsInvolved.join(", ")}
* **Difficulty Level:** Beginner, Intermediate, or Advanced
* **Prerequisites:** Any knowledge or setup required

## Step-by-Step Implementation
For each step:
* **Action:** What to do
* **Explanation:** Why this step is necessary
* **Code Snippet:** Include relevant code for the step
* **Tip:** (Optional) Suggest best practices or warn about common mistakes

## Testing & Validation
Explain:
* How to test the code
* Expected outputs or behaviors
* Troubleshooting tips for common errors

## Final Code & Output
Provide:
* The complete, functional code
* Example of expected output or results

## Summary & Call to Action
Write:
* A 2–3 sentence recap of the core learning points
* A motivational closing line encouraging ${targetAudience.join(", ")} to try building or extending the project themselves

FORMATTING REQUIREMENTS:
- Use * for bullet points
- Bold labels like **Action:**, **Explanation:**, **Code Snippet:**
- Include syntax-highlighted code blocks for clarity
- Keep tone educational, clear, and encouraging

---

### Example Output for Coding Walkthrough (JavaScript, Frontend Developers)

# Coding Walkthrough: JavaScript, DOM Manipulation

## Why This Walkthrough Matters
For frontend developers, mastering DOM manipulation without heavy frameworks is crucial for lightweight, high-performance web apps. This walkthrough will help you confidently update, style, and manage page content using pure JavaScript.

## Project Overview
* **Goal:** Build a dynamic to-do list with add and delete functionality  
* **Tools/Technologies:** JavaScript, HTML, CSS  
* **Difficulty Level:** Beginner  
* **Prerequisites:** Basic understanding of HTML elements and JavaScript event listeners

## Step-by-Step Implementation
* **Action:** Create the basic HTML structure with an input field, button, and empty list.  
  **Explanation:** Provides the framework for capturing and displaying tasks.  
  **Code Snippet:**
  \`\`\`html
  <input id="taskInput" type="text" placeholder="New task" />
  <button id="addBtn">Add</button>
  <ul id="taskList"></ul>
  \`\`\`

* **Action:** Add an event listener to the "Add" button to create a new list item.  
  **Explanation:** Links user interaction to dynamic content updates.  
  **Code Snippet:**
  \`\`\`javascript
  document.getElementById('addBtn').addEventListener('click', () => {
    const taskText = document.getElementById('taskInput').value;
    if (taskText) {
      const li = document.createElement('li');
      li.textContent = taskText;
      document.getElementById('taskList').appendChild(li);
      document.getElementById('taskInput').value = '';
    }
  });
  \`\`\`

## Testing & Validation
* Type a task in the input field and click "Add" — it should appear in the list  
* Check that the input clears automatically after adding a task  
* Test with empty input — nothing should be added

## Final Code & Output
\`\`\`html
<!-- Full HTML + JS in one file -->
<!DOCTYPE html>
<html>
<body>
  <input id="taskInput" type="text" placeholder="New task" />
  <button id="addBtn">Add</button>
  <ul id="taskList"></ul>
  <script>
    document.getElementById('addBtn').addEventListener('click', () => {
      const taskText = document.getElementById('taskInput').value;
      if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('taskList').appendChild(li);
        document.getElementById('taskInput').value = '';
      }
    });
  </script>
</body>
</html>
\`\`\`

## Summary & Call to Action
By breaking this project into small, clear steps, you’ve learned how to use JavaScript to manipulate the DOM directly. Now, challenge yourself to extend this to-do list with features like delete buttons or task completion checkmarks.
`,

};
