import { GoogleGenerativeAI } from "@google/generative-ai";
import { videoTypePrompts } from "./prompt";
import { processReferenceLinks } from "../../lib/contentFetcher";

// Telemetry counter for error tracking
const errorCounters = {
  MISSING_PROMPT: 0,
  MISSING_TOOLS: 0,
  MISSING_AUDIENCE: 0,
  MISSING_VIDEO_TYPE: 0,
  MISSING_SECOND_TOOL: 0,
  INVALID_VIDEO_TYPE: 0,
  API_ERROR: 0,
  SUCCESS: 0
};

// Validation rules for different video types
const validationRules = {
  "Coding Walkthrough": {
    minTools: 2,
    errorCode: "MISSING_SECOND_TOOL",
    message: "Coding Walkthrough requires at least 2 tools for comparison",
    suggestedFixes: [
      { action: "add_tool", label: "Add a second tool", description: "Select another tool to compare with" },
      { action: "change_type", label: "Switch to How-To", description: "Change to a single-tool tutorial format" }
    ]
  },
  "Tool Comparison": {
    minTools: 2,
    errorCode: "MISSING_SECOND_TOOL", 
    message: "Tool Comparison requires at least 2 tools to compare",
    suggestedFixes: [
      { action: "add_tool", label: "Add a second tool", description: "Select another tool to compare with" },
      { action: "change_type", label: "Switch to Feature Demo", description: "Change to showcase a single tool" }
    ]
  },
  "Bug Fixing Session": {
    minTools: 2,
    errorCode: "MISSING_SECOND_TOOL",
    message: "Bug Fixing Session requires at least 2 tools for comparison",
    suggestedFixes: [
      { action: "add_tool", label: "Add a second tool", description: "Select another debugging tool" },
      { action: "change_type", label: "Switch to How-To", description: "Change to a single-tool debugging guide" }
    ]
  },
  "Prompt Testing": {
    minTools: 2,
    errorCode: "MISSING_SECOND_TOOL",
    message: "Prompt Testing requires at least 2 tools to compare prompts",
    suggestedFixes: [
      { action: "add_tool", label: "Add a second tool", description: "Select another AI tool to test" },
      { action: "change_type", label: "Switch to Feature Demo", description: "Change to showcase a single tool" }
    ]
  }
};

function validateInputs(prompt, toolsInvolved, targetAudience, videoType) {
  const problems = [];
  const suggestedFixes = [];

  // Basic field validation
  if (!prompt || prompt.trim().length === 0) {
    problems.push({
      field: "prompt",
      message: "Prompt is required",
      code: "MISSING_PROMPT"
    });
    errorCounters.MISSING_PROMPT++;
  }

  if (!toolsInvolved || !Array.isArray(toolsInvolved) || toolsInvolved.length === 0) {
    problems.push({
      field: "toolsInvolved", 
      message: "At least one tool must be selected",
      code: "MISSING_TOOLS"
    });
    errorCounters.MISSING_TOOLS++;
  }

  if (!targetAudience || !Array.isArray(targetAudience) || targetAudience.length === 0) {
    problems.push({
      field: "targetAudience",
      message: "At least one target audience must be selected", 
      code: "MISSING_AUDIENCE"
    });
    errorCounters.MISSING_AUDIENCE++;
  }

  if (!videoType || videoType === "Select video type...") {
    problems.push({
      field: "videoType",
      message: "Video type must be selected",
      code: "MISSING_VIDEO_TYPE"
    });
    errorCounters.MISSING_VIDEO_TYPE++;
  }

  // Video type specific validation
  if (videoType && validationRules[videoType]) {
    const rule = validationRules[videoType];
    if (toolsInvolved && toolsInvolved.length < rule.minTools) {
      problems.push({
        field: "toolsInvolved",
        message: rule.message,
        code: rule.errorCode
      });
      suggestedFixes.push(...rule.suggestedFixes);
      errorCounters[rule.errorCode]++;
    }
  }

  // Check if video type is valid
  if (videoType && !videoTypePrompts[videoType] && videoType !== "Select video type...") {
    problems.push({
      field: "videoType",
      message: "Invalid video type selected",
      code: "INVALID_VIDEO_TYPE"
    });
    errorCounters.INVALID_VIDEO_TYPE++;
  }

  return { problems, suggestedFixes };
}

// Retry logic with exponential backoff
async function retryWithBackoff(fn, maxRetries = 2, baseDelay = 1000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Check if it's a retryable error (5xx or rate limit)
      const isRetryable = error.message?.includes('500') || 
                         error.message?.includes('502') || 
                         error.message?.includes('503') || 
                         error.message?.includes('504') ||
                         error.message?.includes('rate limit') ||
                         error.message?.includes('quota');
      
      if (!isRetryable) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Helper function to detect IDE vs Chat model comparison
function isIDEVsChatComparison(toolsInvolved) {
  const ideTools = ['GitHub Copilot', 'Codeium', 'Tabnine', 'Amazon CodeWhisperer', 'Replit Ghostwriter'];
  const chatTools = ['OpenAI GPT', 'ChatGPT', 'Claude', 'Gemini', 'Anthropic Claude'];
  
  const hasIDETool = toolsInvolved.some(tool => ideTools.some(ide => tool.includes(ide)));
  const hasChatTool = toolsInvolved.some(tool => chatTools.some(chat => tool.includes(chat)));
  
  return hasIDETool && hasChatTool;
}

// Helper function to calculate timecodes based on video length
function calculateTimecodes(videoLength, isIDEVsChat = false) {
  // Parse video length (e.g., "5 to 15 Minutes" -> 10 minutes)
  const match = videoLength.match(/(\d+)\s*to\s*(\d+)\s*Minutes?/i);
  let totalSeconds;
  
  if (match) {
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    totalSeconds = Math.round((min + max) / 2 * 60);
  } else {
    // Fallback for other formats
    const singleMatch = videoLength.match(/(\d+)\s*Minutes?/i);
    if (singleMatch) {
      totalSeconds = parseInt(singleMatch[1]) * 60;
    } else {
      totalSeconds = 600; // Default to 10 minutes
    }
  }
  
  // Calculate section durations
  const introDuration = Math.round(totalSeconds * 0.15);
  const fairnessDuration = isIDEVsChat ? Math.round(totalSeconds * 0.05) : 0;
  const setupDuration = Math.round(totalSeconds * 0.15);
  const promptDuration = Math.round(totalSeconds * 0.10);
  const breakdownDuration = Math.round(totalSeconds * 0.35);
  const comparisonDuration = Math.round(totalSeconds * 0.10);
  const outroDuration = Math.round(totalSeconds * 0.10);
  const ctaDuration = Math.round(totalSeconds * 0.05);
  
  // Calculate timecodes
  let currentTime = 0;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const timecodes = {
    intro: `[00:00–${formatTime(introDuration - 1)}]`,
    setup: `[${formatTime(currentTime += introDuration)}–${formatTime(currentTime + setupDuration - 1)}]`,
    prompt: `[${formatTime(currentTime += setupDuration)}–${formatTime(currentTime + promptDuration - 1)}]`,
    breakdown: `[${formatTime(currentTime += promptDuration)}–${formatTime(currentTime + breakdownDuration - 1)}]`,
    comparison: `[${formatTime(currentTime += breakdownDuration)}–${formatTime(currentTime + comparisonDuration - 1)}]`,
    outro: `[${formatTime(currentTime += comparisonDuration)}–${formatTime(currentTime + outroDuration - 1)}]`,
    cta: `[${formatTime(currentTime += outroDuration)}–${formatTime(currentTime + ctaDuration - 1)}]`
  };
  
  if (isIDEVsChat) {
    timecodes.fairness = `[${formatTime(introDuration)}–${formatTime(introDuration + fairnessDuration - 1)}]`;
    // Adjust other timecodes
    currentTime = introDuration + fairnessDuration;
    timecodes.setup = `[${formatTime(currentTime)}–${formatTime(currentTime + setupDuration - 1)}]`;
    timecodes.prompt = `[${formatTime(currentTime += setupDuration)}–${formatTime(currentTime + promptDuration - 1)}]`;
    timecodes.breakdown = `[${formatTime(currentTime += promptDuration)}–${formatTime(currentTime + breakdownDuration - 1)}]`;
    timecodes.comparison = `[${formatTime(currentTime += breakdownDuration)}–${formatTime(currentTime + comparisonDuration - 1)}]`;
    timecodes.outro = `[${formatTime(currentTime += comparisonDuration)}–${formatTime(currentTime + outroDuration - 1)}]`;
    timecodes.cta = `[${formatTime(currentTime += outroDuration)}–${formatTime(currentTime + ctaDuration - 1)}]`;
  }
  
  return timecodes;
}

// Fallback prompts for when LLM fails
const fallbackPrompts = {
  "Coding Walkthrough": ({ toolsInvolved, targetAudience }) => `
    Create a simple coding tutorial for ${toolsInvolved.join(", ")} aimed at ${targetAudience.join(", ")}.
    
    Structure:
    1. Brief introduction
    2. Step-by-step implementation
    3. Testing instructions
    4. Summary
    
    Keep it concise and practical.
  `,
  "Tool Comparison": ({ toolsInvolved, targetAudience }) => `
    Compare ${toolsInvolved.join(" vs ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Overview of both tools
    2. Key differences
    3. When to use each
    4. Recommendation
    
    Keep it brief and actionable.
  `,
  "Feature Demo": ({ toolsInvolved, targetAudience }) => `
    Demonstrate key features of ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. What it does
    2. How to use it
    3. Benefits
    4. Next steps
    
    Keep it simple and practical.
  `,
  "Bug Fixing Session": ({ toolsInvolved, targetAudience }) => `
    Debugging guide using ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Common issues
    2. Debugging steps
    3. Solutions
    4. Prevention tips
    
    Keep it focused and helpful.
  `,
  "Prompt Testing": ({ toolsInvolved, targetAudience }) => `
    Test prompts with ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Test setup
    2. Different prompts
    3. Results comparison
    4. Best practices
    
    Keep it practical and clear.
  `,
  "Productivity Tips": ({ toolsInvolved, targetAudience }) => `
    Productivity tips using ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Why it matters
    2. 3 key tips
    3. Implementation
    4. Results
    
    Keep it actionable and brief.
  `,
  "Behind the Scenes": ({ toolsInvolved, targetAudience }) => `
    Behind the scenes look at using ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Project overview
    2. Process walkthrough
    3. Challenges faced
    4. Lessons learned
    
    Keep it engaging and informative.
  `,
  "Real-world Scenario Demo": ({ toolsInvolved, targetAudience }) => `
    Real-world scenario using ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Scenario description
    2. Step-by-step execution
    3. Results achieved
    4. Key takeaways
    
    Keep it practical and relevant.
  `,
  "Code Optimization Breakdown": ({ toolsInvolved, targetAudience }) => `
    Code optimization using ${toolsInvolved.join(", ")} for ${targetAudience.join(", ")}.
    
    Structure:
    1. Performance issues
    2. Optimization techniques
    3. Before/after results
    4. Best practices
    
    Keep it technical and clear.
  `
};

export default async function handler(req, res) {
  const allowedOrigins = ["https://infrasity.com", "http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt, toolsInvolved, targetAudience, videoType, videoLength, linkForRef } = req.body;

    console.log("Prompt:", prompt);
    console.log("Tools Involved:", toolsInvolved);
    console.log("Target Audience:", targetAudience);
    console.log("Video Type:", videoType);
    console.log("Link:", linkForRef);

    // Validate inputs and return structured errors
    const { problems, suggestedFixes } = validateInputs(prompt, toolsInvolved, targetAudience, videoType);
    
    if (problems.length > 0) {
      return res.status(400).json({ 
        problems,
        suggestedFixes,
        message: "Input validation failed"
      });
    }

    // Process reference links if provided
    let contextFacts = [];
    let references = [];
    
    if (linkForRef && linkForRef.trim()) {
      try {
        const linkData = await processReferenceLinks([linkForRef.trim()]);
        contextFacts = linkData.contextFacts;
        references = linkData.references;
        console.log(`Processed reference link: ${linkForRef}, extracted ${contextFacts.length} facts`);
      } catch (refError) {
        console.warn("Failed to process reference link:", refError.message);
        // Continue without reference data
      }
    }

    // Generate script with retry logic
    const generateScript = async () => {
      const systemMessageGenerator = videoTypePrompts[videoType];
      
      // Calculate timecodes for Tool Comparison
      let timecodes = null;
      let isIDEVsChat = false;
      
      if (videoType === "Tool Comparison") {
        isIDEVsChat = isIDEVsChatComparison(toolsInvolved);
        timecodes = calculateTimecodes(videoLength, isIDEVsChat);
      }
      
      let systemMessage = systemMessageGenerator
        ? systemMessageGenerator({ 
            toolsInvolved, 
            targetAudience, 
            videoLength, 
            linkForRef, 
            prompt,
            timecodes,
            isIDEVsChat
          })
        : `You are an expert video scriptwriter for technical and AI content. Audience: ${targetAudience.join(", ")}.`;

      // Add context facts if available
      if (contextFacts.length > 0) {
        systemMessage += `\n\nAdditional Context from Reference:\n${contextFacts.map(fact => `• ${fact}`).join('\n')}`;
      }

      const fullPrompt = `${systemMessage}\n\nUser Prompt:\n${prompt}`;

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(fullPrompt);
      return result.response.text().trim();
    };

    let script;
    let isFallback = false;

    try {
      script = await retryWithBackoff(generateScript);
      console.log("Script generated successfully");
      errorCounters.SUCCESS++;
    } catch (error) {
      console.error("All retries failed, using fallback:", error.message);
      errorCounters.API_ERROR++;
      
      // Use fallback prompt
      const fallbackPrompt = fallbackPrompts[videoType];
      if (fallbackPrompt) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const fallbackMessage = fallbackPrompt({ toolsInvolved, targetAudience });
        const result = await model.generateContent(fallbackMessage);
        script = result.response.text().trim();
        isFallback = true;
        
        console.log("Fallback script generated");
      } else {
        throw error;
      }
    }

    // Add References section if we have references
    if (references.length > 0) {
      const referencesSection = `\n\n## References\n${references.map(ref => `• [${ref.title}](${ref.url})`).join('\n')}`;
      script += referencesSection;
    }

    const response = { 
      script,
      isFallback,
      references: references.length > 0 ? references : undefined
    };

    if (isFallback) {
      response.message = "Generated using simplified format due to API limitations";
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating script:", error);
    errorCounters.API_ERROR++;
    
    // Log telemetry data
    console.log("Error counters:", errorCounters);
    
    res.status(503).json({ 
      error: "Service temporarily unavailable",
      code: "SERVICE_UNAVAILABLE",
      message: "Unable to generate script at this time. Please try again later."
    });
  }
}
