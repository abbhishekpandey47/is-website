const ScriptData = [
    {
        id: 1,
        videoType: "Tool Comparison",
        content: `# Tool Comparison: GitHub Copilot vs CodeRabbit

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

     {
        id: 2,
        videoType: "Tool Comparison",
        content: `# Tool Comparison: Gemini vs Cody vs Qodo

## Introduction [00:00–00:36]
Choosing the right AI-powered coding tool can dramatically boost an intermediate developer's productivity and code quality. By automating repetitive tasks and providing intelligent suggestions, these tools save time and reduce errors. This comparison will analyze Gemini, Cody, and Qodo, revealing which tools excel in different areas and which are best suited for specific tasks.

## Setup [00:36–01:12]
To ensure a fair comparison, we'll use a React project with a moderate level of complexity.

bash
git clone [your_react_repo_url]
cd [your_react_repo_name]
npm install


## The Prompt (Exact) [01:12–01:30]
Prompt: "undefined"
This tests how well the tool handles missing context and the ability to create appropriate responses when information is not clearly defined. It simulates scenarios where developers might have incomplete or ambiguous requests.

## Tool-by-Tool Breakdown

**Gemini – [01:30–02:54]**
* Repo Understanding: Partially recognized the file structure and purpose, but struggled with dependency identification.
* Implementation Details: Generated basic code with placeholders for missing information. It attempted to create a function but lacked necessary details.
* UI & Design Quality: Simple text-based output in the interface.
* Speed: Fast
* Correctness: Low
* Repo Awareness: Needs Guidance

**Strengths:**
✅ Fast response time
✅ Basic code generation, despite missing info
✅ Simple, clean interface

**Limitations:**
❌ Poor handling of undefined context
❌ Inability to infer missing information
❌ Lacks specific guidance for clarification

**Cody – [02:54–04:18]**
* Repo Understanding: Good understanding of files and project structure.
* Implementation Details: Provided a starting point for the code with assumptions and comments asking for more details. The code was incomplete but well-structured.
* UI & Design Quality: Clear, well-formatted code presented in a dedicated code block within the chat interface.
* Speed: Medium
* Correctness: Medium
* Repo Awareness: Excellent

**Strengths:**
✅ Good project context awareness
✅ Generates well-structured code skeleton
✅ Prompts for clarification of undefined parameters

**Limitations:**
❌ Requires significant user input to complete task
❌ Initial output may lack specific functionality
❌ Can be slow in generating responses for complex scenarios

**Qodo – [04:18–05:42]**
* Repo Understanding: Limited understanding of the project structure.
* Implementation Details: Generated placeholder code with very basic functionality. It failed to prompt for clarifications on the undefined input.
* UI & Design Quality: Text-based output within the Qodo editor.
* Speed: Medium
* Correctness: Low
* Repo Awareness: Minimal

**Strengths:**
✅ Simple and easy to use interface
✅ Provides a baseline code structure

**Limitations:**
❌ Significant lack of understanding of context
❌ Unable to deal with undefined scenarios
❌ Generated code requires major rework

## Outro Script [05:42–06:18]
In this comparison, Cody stood out with its ability to leverage project context and prompt for clarification when faced with an undefined request. Gemini offered a fast response but lacked the necessary depth. Qodo struggled significantly, producing minimal usable output. For intermediate developers who need to handle ambiguous or incomplete requests, Cody proves to be a more reliable solution.

## Call to Action [06:18–06:36]
✅ Drop a like if you found this useful
💬 Tell us which prompt or tool to test next in the comments
📎 For more context or additional information, click here: https://infrasity.com`,
    },

];

export default ScriptData;
