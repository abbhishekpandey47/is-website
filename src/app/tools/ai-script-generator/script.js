const ScriptData = [
    
       {
  id: 1,
  videoType: "Tool Comparison",
  title: "Top 4 Python Code Generation Tools",
  duration: "4 min 45 sec",
  author: "Tech Team",
  category: "Technology",
  intro: "We tested four AI-powered Python code generation tools on the same Django project with the same prompt — from understanding models to delivering a clean UI. Here’s who actually shipped.",
  content: `# Tool Comparison: Top 4 Python Code Generation Tools

## Introduction [00:00–00:25]
What happens when you ask four Python code generation tools to build the same feature — from scratch — in a real project?
No toy examples. No HTML edits.
We picked a Python-based repo with real backend logic, plugged in the same prompt, and watched how each tool handled it — from understanding models to generating clean UI.
Some nailed it. Some choked.
One didn’t even understand the project.

## Setup [00:25–00:45]
We used the phpmyadmin/website repo — a Django-based site with real database models and sponsor logic.
Setup steps:
\`\`\`bash
git clone https://github.com/phpmyadmin/website.git
cd website
python3 -m venv venv
source venv/bin/activate
pip install -r requirements-test.txt
python manage.py migrate
python manage.py runserver
\`\`\`
No special config. No extra hacks. Just a clean test run for each tool.

## The Prompt (Exact) [00:45]
"Help me implement a feature that displays the number of sponsors of each type on the sponsor page and compares them on a graph. Don’t just edit the HTML view. Map out the sponsors from the Python files and group them using their sponsor category. Make it a clean UI."

---

## Tool-by-Tool Breakdown [00:45–04:15]

**Qodo Gen – [00:45–01:45]**
* Repo Understanding: Excellent; navigated \`sponsors/models.py\` correctly.
* Implementation Details: Added Chart.js-based graph, clean API endpoint, correct Django template integration.
* UI & Design Quality: Clean, production-ready.
* Speed: Moderate
* Correctness: High
* Repo Awareness: Excellent

**Strengths:**
✅ Strong repo understanding.
✅ Modular, scalable design.
✅ Fully database-backed.

**Limitations:**
❌ Slightly slower than others.

---

**Cursor – [01:45–02:45]**
* Repo Understanding: Needed guidance; initially edited HTML directly.
* Implementation Details: Eventually grouped sponsors in Python, basic Chart.js graph.
* UI & Design Quality: Minimal polish.
* Speed: Fast
* Correctness: Medium
* Repo Awareness: Needs prompting

**Strengths:**
✅ Quick code generation.
✅ Functional implementation after guidance.

**Limitations:**
❌ Lacks scalability.
❌ Needed multiple nudges.

---

**GitHub Copilot Extension – [02:45–03:30]**
* Repo Understanding: Minimal; worked in isolation.
* Implementation Details: Suggested small model methods; missed full integration.
* UI & Design Quality: Not integrated with templates.
* Speed: Fast (inline completions)
* Correctness: Low
* Repo Awareness: Weak

**Strengths:**
✅ Great for micro-completions.

**Limitations:**
❌ Poor feature-level generation.
❌ Requires manual stitching.

---

**Cline – [03:30–04:15]**
* Repo Understanding: Impressive; pulled correct models/views.
* Implementation Details: Used Plotly for styled, interactive graph.
* UI & Design Quality: Interactive, well-placed in template.
* Speed: Medium
* Correctness: High
* Repo Awareness: Strong

**Strengths:**
✅ Accurate grouping logic.
✅ Interactive and visually appealing UI.

**Limitations:**
❌ Slightly slower than Cursor.

---

## Outro [04:15–04:45]
Same prompt. Same Django project. Totally different results.
Some understood Python’s ORM like a pro.
Some struggled to find the right files.
One rewired the logic and still got it right.
It’s not just about generating code — it’s about understanding your framework, your data, your intent, and your repo’s structure.


## Outro Script [04:45–05:45]
Same prompt. Same Django project. Totally different results.
Some understood Python’s ORM like a pro.
Some struggled to find the right files.
One rewired the logic and still got it right.
It’s not just about generating code — it’s about understanding your framework, your data, your intent, and your repo’s structure.

## Call to Action [05:45]
✅ Drop a like if you found this useful
💬 Suggest the next prompt or tool for us to test
📎 Full blog breakdown is linked in the description`
},


     {
        id: 2,
        videoType: "Tool Comparison",
        title: "Gemini vs Cody vs Qodo",
         duration: "8 min",
    author: "Tech Team",
    category: "Technology",
         intro: "Choosing the right AI-powered coding tool can dramatically boost an intermediate developer's productivity and code quality. By automating repetitive tasks and providing intelligent suggestions, these tools save time and reduce errors. This comparison will analyze Gemini, Cody, and Qodo, revealing which tools excel in different areas and which are best suited for specific tasks.",
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

    {
        id: 3,
        intro:"Choosing the right AI coding assistant is crucial for beginner developers, significantly impacting their learning curve and productivity. A good tool can help understand complex code, generate efficient solutions, and learn best practices. This comparison will reveal which tool excels in assisting beginner developers with code understanding and generation.",
        videoType: "Tool Comparison",
        title: "Gemini vs Qodo vs Codeium",
        duration: "8 min",
    author: "Tech Team",
    category: "Technology",
        content: `# Tool Comparison: Gemini vs Qodo vs Codeium

## Introduction [00:00–00:36]
Choosing the right AI coding assistant is crucial for beginner developers, significantly impacting their learning curve and productivity. A good tool can help understand complex code, generate efficient solutions, and learn best practices. This comparison will reveal which tool excels in assisting beginner developers with code understanding and generation.

## Setup [00:36–01:12]
To ensure a fair comparison, we'll use a simple Node.js project with several files and a moderate level of complexity.

bash
git clone [repo_url]
cd [project_name]
npm install


(Replace [repo_url] and [project_name] with actual values)

## The Prompt (Exact) [01:12–01:30]
Prompt: "undefined"

*   This prompt tests the tool's ability to understand a codebase without a specific task, a common scenario for beginners exploring new projects.
*   It assesses general code comprehension and initial information retrieval.

## Tool-by-Tool Breakdown [01:30–05:42]

**Gemini – [01:30–02:58]**
*   Repo Understanding: Demonstrates good initial understanding of the file structure.
*   Implementation Details: The tool provides comprehensive responses and helpful advice.
*   UI & Design Quality: Excellent design, easy to navigate.
*   Speed: Medium
*   Correctness: High
*   Repo Awareness: Excellent

**Strengths:**
✅ Great code summarization.
✅ Clear explanations and step-by-step reasoning.
✅ User friendly UI.

**Limitations:**
❌ Needs some time to respond to requests.
❌ Advanced debugging is difficult.

**Qodo – [02:58–04:20]**
*   Repo Understanding: Recognizes key project files and their roles.
*   Implementation Details: Offers code completion suggestions.
*   UI & Design Quality: Minimalist interface.
*   Speed: Fast
*   Correctness: Medium
*   Repo Awareness: Needs Guidance

**Strengths:**
✅ Fast performance with code completion.
✅ Simple interface, good for beginners.
✅ Efficient at generating basic code snippets.

**Limitations:**
❌ Limited code summarization.
❌ Struggles with complex logic.

**Codeium – [04:20–05:42]**
*   Repo Understanding: Strong understanding of codebase.
*   Implementation Details: Autocompletes code based on context.
*   UI & Design Quality: Good integration.
*   Speed: Fast
*   Correctness: High
*   Repo Awareness: Excellent

**Strengths:**
✅ Accurate code generation.
✅ Excellent code completion.
✅ Good repository awareness.

**Limitations:**
❌ Generates unnecessary content.
❌ Needs specific prompts to return optimal results.

## Outro Script [05:42–06:18]
In summary, each tool has its strengths and weaknesses. Gemini excels at summarization and explanations, making it great for learning, while Qodo provides quick, basic code completion. Codeium offers superior integration and code generation for complex projects. Beginner developers should consider their specific needs when choosing a tool.

## Call to Action [06:18–06:36]
✅ Drop a like if you found this useful
💬 Tell us which prompt or tool to test next in the comments`,
    },

];

export default ScriptData;
