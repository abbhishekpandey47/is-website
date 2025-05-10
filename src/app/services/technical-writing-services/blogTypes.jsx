"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  BookText,
  ListChecks,
  FileText,
  Briefcase,
  CheckSquare,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Coffee,
  LineChart,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { Button } from "@/Components/ui/button";

// Blog types data
const blogTypes = [
  {
    id: 1,
    title: "How-to guides",
    description:
      "Actionable, step-by-step guides for developers to complete specific tasks—from configuring cloud infrastructure to integrating tools into their tech stack.",
    icon: <BookText className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services/how-to-guides",
  },
  {
    id: 2,
    title: "CLI Docs",
    description:
      "Clear, task-oriented documentation for CLI tools—covering installation, authentication, configuration, and infrastructure deployment from the terminal",
    icon: <ListChecks className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services/cli-guide",
  },
  {
    id: 3,
    title: "Product & Feature Docs",
    description:
      "​In-depth documentation that guides users through the implementation, configuration, and optimization of specific product features, including cloud integrations, CLI usage, networking, and more.",
    icon: <FileText className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
  {
    id: 4,
    title: "API/SDK documentation",
    description:
      "REST API and SDK documentation with language-specific examples in Python, Go, and TypeScript—built to help developers authenticate, trigger actions, and query data with ease.",
    icon: <Briefcase className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
  {
    id: 5,
    title: "Release Notes",
    description:
      "Clear and structured product updates that highlight new features, improvements, and fixes—crafted to help users stay informed and enable smoother upgrades, demos, and usage",
    icon: <CheckSquare className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
  {
    id: 6,
    title: "Demo Accelerators",
    description:
      "Pre-built templates and GitHub repos designed to showcase real-world solutions during sales demos, speed up proof-of-concepts, and support developer onboarding.",
    icon: <LayoutGrid className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
  {
    id: 7,
    title: "Thought Leadership",
    description:
      "Content on cloud-native development, infrastructure automation, and the future of developer productivity, helping engineering teams optimize developer productivity.",
    icon: <Lightbulb className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
  {
    id: 8,
    title: "Product Tutorials",
    description:
      "Hands-on content that walks through setting up CI/CD pipelines, release strategies, AI agentic workflows, and tool integrations — built to help engineering teams move from setup to execution, faster.",
    icon: <BookOpen className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
  {
    id: 9,
    title: "Developer Use Case Guides",
    description:
      "Developer onboarding guides turned from GitHub repos into blog-style tutorials—helping teams adopt new tools, integrate complex systems, and get to “Hello, World” faster..",
    icon: <LineChart className="h-7 w-7 text-[#5F64FF]" />,
    href: "/services/technical-writing-services",
  },
];

const BlogTypes = () => {
  const [expanded, setExpanded] = useState(false);

  //handling visibility
  const visibleBlogTypes = expanded ? blogTypes : blogTypes.slice(0, 6);

  return (
    <section className="w-full pb-12 px-4 md:px-10 whyinfra3 ">
      <div className="backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center">
            Content Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleBlogTypes.map((blogType) => (
              <Link
                href={blogType.href}
                key={blogType.id}
                className="block transition-transform duration-300 hover:scale-105"
              >
                <div className="relative glassEffect cursor-pointer">
                  <div className="p-6">
                    {/* Content inside the box */}
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded bg-white/5 mr-4">
                        {blogType.icon}
                      </div>
                      <h3 className="text-xl font-medium text-white">
                        {blogType.title}
                      </h3>
                    </div>

                    <p className="text-gray-100 mb-6 text-m">
                      {blogType.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="border-[#5F64FF] py-6 px-4 font-medium text-md text-white"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View less" : "View more"}
              {expanded ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogTypes;
