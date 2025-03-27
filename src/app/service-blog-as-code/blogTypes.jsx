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



// Blog types data - first 6 items are initially visible
const blogTypes  = [
  {
    id: 1,
    title: "How-to guides",
    description: "Step-by-step instructions to help readers accomplish a specific task or achieve a goal.",
    icon: <BookText className="h-7 w-7 text-purple-600" />
  },
  {
    id: 2,
    title: "Listicles",
    description: "Informative articles presented as lists, often highlighting key points or ideas",
    icon: <ListChecks className="h-7 w-7 text-purple-600" />
  },
  {
    id: 3,
    title: "Developer Guides",
    description: "Step-by-step cloud guides that help developers implement, configure, and integrate platforms into their workflows, optimizing cloud infrastructure and accelerating development.",
    icon: <FileText className="h-7 w-7 text-purple-600" />
  },
  {
    id: 4,
    title: "Case studies",
    description: "Detailed examinations of real-world situations or projects, often showcasing problem-solving and results.",
    icon: <Briefcase className="h-7 w-7 text-purple-600" />
  },
  {
    id: 5,
    title: "Cheat sheets and checklists",
    description: "Condensed reference guides or lists of essential information or tasks",
    icon: <CheckSquare className="h-7 w-7 text-purple-600" />
  },
  {
    id: 6,
    title: "Templates",
    description: "Pre-designed formats or structures, such as marketing materials, can be customized for various purposes.",
    icon: <LayoutGrid className="h-7 w-7 text-purple-600" />
  },
  // Additional blog types that will be shown when "View more" is clicked
  {
    id: 7,
    title: "Thought Leadership",
    description: "Content on cloud-native development, infrastructure automation, and the future of developer productivity, helping engineering teams optimize developer productivity.",
    icon: <Lightbulb className="h-7 w-7 text-purple-600" />
  },
  {
    id: 8,
    title: "Tutorials",
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
  
  // Get the visible blog types based on expanded state
  const visibleBlogTypes = expanded ? blogTypes : blogTypes.slice(0, 6);
  
  return (
    <section className="w-full py-20 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl quicksand-bold text-purple-800 mb-16 text-center">
          Blog Types
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBlogTypes.map((blogType) => (
            <div 
              key={blogType.id} 
              className="bg-white p-8 rounded-lg border border-gray-400 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-2 rounded-lg mr-4">
                  {blogType.icon}
                </div>
                <h3 className="text-xl quicksand-bold text-gray-900">{blogType.title}</h3>
              </div>
              <p className="text-gray-600 quicksand-bold">
                {blogType.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="border-purple-500 py-6 px-4 bg-white text-md text-purple-600"
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
    </section>
  );
};

export default BlogTypes;