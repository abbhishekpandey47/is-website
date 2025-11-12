import React from 'react';
import { cn } from '@/utils/cn';

const TRUST_ITEMS = [
  {
    name: "Kubiya",
    url: "https://docs.kubiya.ai",
    caption: "Automating DevOps with AI agents—structured by Infrasity.",
  },
  {
    name: "DevZero",
    url: "https://www.devzero.io/docs",
    caption: "Developer cloud platform with fast-onboarding documentation.",
  },
  {
    name: "StackGen",
    url: "https://stackgen.example.com/docs",
    caption: "GenAI-powered infra automation—explained for builders.",
  }
];

export default function TrustGrid() {
  return (
    <section className="py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
        Trusted by Fast-Growing AI & DevTool Companies
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {TRUST_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block bg-gray-900 rounded-lg p-6 border border-gray-800",
              "transition-all duration-300 group",
              "hover:border-cyan-500 hover:bg-gray-800",
              "focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50",
              "hover:shadow-lg hover:translate-y-[-4px]"
            )}
          >
            <div className="flex items-center mb-4">
              <div className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {item.name}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 text-gray-500 group-hover:text-cyan-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
              {item.caption}
            </p>
            <div className="mt-4 text-sm text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
              View Docs →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}