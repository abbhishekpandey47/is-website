"use client";

import { useState } from "react";

interface SummaryWidgetProps {
  slug: string;
  title: string;
}

// ChatGPT/OpenAI icon
const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

// Claude/Anthropic icon
const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M4.709 15.955l4.72-2.647.08-.08v-.08l-.08-.08-2.086-.318-.398-.08-.239.16-2.724 1.53c-.398.24-.717.558-.717 1.036 0 .399.16.718.479.878.319.16.638.08.965-.319zm8.962-7.38l-.16-.718-.318.558-4.72 8.18c-.24.398-.24.797 0 1.116.239.319.558.478.956.398.16 0 .319-.08.479-.159l7.923-4.481c.08-.08.16-.08.16-.16l.079-.079v-.08c0-.079 0-.079-.08-.159l-4.32-4.401v-.016zm5.65 1.833c.24-.398.24-.797 0-1.116-.239-.319-.558-.478-.956-.398-.16 0-.319.08-.479.159l-2.326 1.315 2.326 2.366 1.116-.638c.16-.08.24-.24.319-.399v-1.289zm-7.126-5.33c-.239-.319-.558-.478-.956-.398-.16 0-.319.08-.479.159L3.753 8.88l2.326 2.366 6.116-3.523v-2.645z" />
  </svg>
);

// Perplexity icon
const PerplexityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20M2 12h20" strokeLinecap="round" />
    <path d="M12 7l5 5-5 5-5-5 5-5z" fill="currentColor" stroke="none" />
  </svg>
);

// Gemini icon (Google's multicolor dots pattern simplified)
const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <circle cx="6" cy="6" r="2.5" fill="#4285F4" />
    <circle cx="12" cy="6" r="2.5" fill="#EA4335" />
    <circle cx="18" cy="6" r="2.5" fill="#FBBC05" />
    <circle cx="6" cy="12" r="2.5" fill="#34A853" />
    <circle cx="12" cy="12" r="2.5" fill="#4285F4" />
    <circle cx="18" cy="12" r="2.5" fill="#EA4335" />
    <circle cx="6" cy="18" r="2.5" fill="#FBBC05" />
    <circle cx="12" cy="18" r="2.5" fill="#34A853" />
    <circle cx="18" cy="18" r="2.5" fill="#4285F4" />
  </svg>
);

// Copilot icon
const CopilotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

// Sparkle icon for "Summarize with" text
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    <path d="M5 2L6.18 5.82L10 7L6.18 8.18L5 12L3.82 8.18L0 7L3.82 5.82L5 2Z" opacity="0.6" />
  </svg>
);

interface AITool {
  name: string;
  Icon: () => JSX.Element;
  color: string;
  url: string;
}

const AI_TOOLS: AITool[] = [
  {
    name: "ChatGPT",
    Icon: ChatGPTIcon,
    color: "#10a37f",
    url: "https://chat.openai.com/",
  },
  {
    name: "Claude",
    Icon: ClaudeIcon,
    color: "#cc785c",
    url: "https://claude.ai/new",
  },
  {
    name: "Perplexity",
    Icon: PerplexityIcon,
    color: "#20b8cd",
    url: "https://www.perplexity.ai/",
  },
  {
    name: "Gemini",
    Icon: GeminiIcon,
    color: "#4285F4",
    url: "https://gemini.google.com/app",
  },
  {
    name: "Copilot",
    Icon: CopilotIcon,
    color: "#f97316",
    url: "https://copilot.microsoft.com/",
  },
];

export function SummaryWidget({ slug }: SummaryWidgetProps) {
  const [copiedTool, setCopiedTool] = useState<string | null>(null);
  const articleUrl = `https://www.infrasity.com/blog/${slug}`;
  
  const prompt = `Summarize this article in 5–7 bullet points for an engineering leader.

Focus on:
- What the article is about
- Key differences between Mintlify, GitBook, ReadMe, Docusaurus
- When to use which tool
- Actionable insights for API-first or devtool startups

URL: ${articleUrl}`;

  const handleClick = async (tool: AITool) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedTool(tool.name);
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopiedTool(null), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
    
    // Open the AI tool in a new tab
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[#1a1d2e] border border-[#2a2d3e]">
        <div className="flex items-center gap-2 text-purple-400">
          <SparkleIcon />
          <span className="text-white font-medium text-sm whitespace-nowrap">Summarize with</span>
        </div>
        <div className="flex items-center gap-2">
          {AI_TOOLS.map((tool) => (
            <button
              key={tool.name}
              onClick={() => handleClick(tool)}
              title={`Summarize with ${tool.name}`}
              className="w-10 h-10 rounded-full bg-[#2a2d3e] hover:bg-[#3a3d4e] flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              style={{ color: tool.color }}
            >
              <tool.Icon />
            </button>
          ))}
        </div>
      </div>
      {copiedTool && (
        <span className="text-xs text-green-400">
          ✓ Prompt copied! Paste it in {copiedTool}
        </span>
      )}
    </div>
  );
}
