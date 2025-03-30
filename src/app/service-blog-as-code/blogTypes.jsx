"use client"
import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';
import { Button } from "@/components/ui/button";



// Blog types data 
const blogTypes  = [
  {
    id: 1,
    title: "How-to guides",
    description: "Actionable, step-by-step guides for developers to complete specific tasks—from configuring cloud infrastructure to integrating tools into their tech stack.",
    icon: <BookText className="h-7 w-7 text-purple-600" />
  },
  {
    id: 2,
    title: "CLI Docs",
    description: "Clear, task-oriented documentation for CLI tools—covering installation, authentication, configuration, and infrastructure deployment from the terminal",
    icon: <ListChecks className="h-7 w-7 text-purple-600" />
  },
  {
    id: 3,
    title: "Product & Feature Docs",
    description: "​In-depth documentation that guides users through the implementation, configuration, and optimization of specific product features, including cloud integrations, CLI usage, networking, and more.",
    icon: <FileText className="h-7 w-7 text-purple-600" />
  },
  {
    id: 4,
    title: "API reference documentation",
    description: "REST API and SDK documentation with language-specific examples in Python, Go, and TypeScript—built to help developers authenticate, trigger actions, and query data with ease.",
    icon: <Briefcase className="h-7 w-7 text-purple-600" />
  },
  {
    id: 5,
    title: "Release Notes",
    description: "Clear and structured product updates that highlight new features, improvements, and fixes—crafted to help users stay informed and enable smoother upgrades, demos, and usage",
    icon: <CheckSquare className="h-7 w-7 text-purple-600" />
  },
  {
    id: 6,
    title: "Demo Accelerators",
    description: "Pre-built templates and GitHub repos designed to showcase real-world solutions during sales demos, speed up proof-of-concepts, and support developer onboarding.",
    icon: <LayoutGrid className="h-7 w-7 text-purple-600" />
  },
  {
    id: 7,
    title: "Thought Leadership",
    description: "Content on cloud-native development, infrastructure automation, and the future of developer productivity, helping engineering teams optimize developer productivity.",
    icon: <Lightbulb className="h-7 w-7 text-purple-600" />
  },
  {
    id: 8,
    title: "Product Tutorials",
    description: "Hands-on content that walks through setting up CI/CD pipelines, release strategies, AI agentic workflows, and tool integrations — built to help engineering teams move from setup to execution, faster.",
    icon: <BookOpen className="h-7 w-7 text-purple-600" />
  },
  {
    id: 9,
    title: "Developer Use Case Guides",
    description: "Developer onboarding guides turned from GitHub repos into blog-style tutorials—helping teams adopt new tools, integrate complex systems, and get to “Hello, World” faster..",
    icon: <LineChart className="h-7 w-7 text-purple-600" />
  }
];

const BlogTypes = () => {
  const [expanded, setExpanded] = useState(false);

  //handling visibility
  const visibleBlogTypes = expanded ? blogTypes : blogTypes.slice(0, 6);
  
  return (
    <section className="w-full py-20 px-6 md:px-10 bg-gray-100">
      <div className='backdrop-filter  backdrop-blur-sm bg-opacity-10 border border-gray-100'>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl quicksand-bold text-purple-800 mb-16 text-center">
          Content Types
        </h2>
        
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        {visibleBlogTypes.map((blogType) => (
          <div 
            key={blogType.id} 
            className=" rounded-xl shadow-xl  flex items-center justify-center overflow-hidden bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 "
          >
              {/* Inner container (white with shadow) */}
              <div className="w-full p-5 overflow-hidden">
                {/* Content inside the white box */}
                <div className="flex items-start mb-4 z-1">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    {blogType.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-[16px] mt-1 quicksand-bold text-gray-900 bg-[#CBC3E3] px-3 py-1 rounded-md">
                    {blogType.title}
                  </h3>
                </div>
                
                <div className="mt-2">
                  <p className=" text-m text-gray-600 quicksand-bold">
                    {blogType.description}
                  </p>
                </div>
              </div>
            </div>
        ))}
      </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="border-purple-500 py-6 px-4 bg-white quicksand-semibold text-md text-purple-600"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "View less" : "View more"} 
            {expanded ? 
              <ChevronUp className="ml-2 h-4 w-4" /> : 
              <ChevronDown className="ml-2 h-4 w-4" />
            }
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default BlogTypes;