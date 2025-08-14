const ScriptData = [
    {
        id: 1,
        videoType: "Tool Comparison",
        content: `Script# Tool Comparison: GitHub Copilot vs CodeRabbit

## Introduction [00:00–00:12]
Choosing the right AI-powered coding assistant can significantly impact a beginner developer's learning curve and overall productivity. These tools can automate repetitive tasks, suggest code improvements, and provide real-time feedback. This comparison will reveal which tool offers the best support for those new to the world of coding.

## Setup [00:12–00:24]
To ensure a fair comparison, we'll use a simple Node.js project with basic CRUD operations. Here's the setup:

\`\`\`bash
git clone [repo_url]  # Replace with actual repo URL
cd [project_name] # Replace with actual project name
npm install
\`\`\`

## The Prompt (Exact) [00:24–00:27]
Prompt: "undefined"

* This assesses the tool's ability to work with a seemingly incomplete prompt.
* Highlights how the tools handle a request that does not give any particular instructions, demonstrating awareness of project scope.

## Tool-by-Tool Breakdown [00:27–01:48]

**GitHub Copilot – [00:27–00:57]**
* Repo Understanding: Shows general awareness of project structure.
* Implementation Details: Generated some code snippets that were commented out. Suggested using console.log extensively.
* UI & Design Quality: Seamless integration within the IDE. No visual design suggestions.
* Speed: Fast
* Correctness: Low
* Repo Awareness: Excellent

**Strengths:**
✅ Fast response time.
✅ Seamless integration.
✅ Solid project understanding

**Limitations:**
❌ Requires well-defined prompts.
❌ Code snippets not helpful without instructions.

**CodeRabbit – [00:57–01:27]**
* Repo Understanding: Strong grasp of project structure and existing codebase.
* Implementation Details: The tool provided documentation suggestions and recommended that certain project modules be refactored. Did not produce code in response to the empty prompt.
* UI & Design Quality: Focuses on code quality, not visual design.
* Speed: Medium
* Correctness: High
* Repo Awareness: Excellent

**Strengths:**
✅ Strong code quality feedback.
✅ Excellent project understanding.
✅ Good documentation suggestions

**Limitations:**
❌ No code generation without instructions.
❌ Speed slightly slower than Copilot.

## Outro Script [01:27–01:42]
In summary, while both tools exhibit strengths, CodeRabbit demonstrated superior understanding and project refactoring suggestions, which would prove more useful for a beginner. CodeRabbit also promotes better coding practices. Copilot may be faster for basic code completion, but CodeRabbit gives beginner developers a better understanding of the project and how to proceed.

## Call to Action [01:42–01:48]
✅ Drop a like if you found this useful
💬 Tell us which prompt or tool to test next in the comments
📎 For more context or additional information, click here: https://infrasity.com`,
    },
];

export default ScriptData;
