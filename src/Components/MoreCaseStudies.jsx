"use client";

import Link from "next/link";
import Image from "next/image";

const MoreCaseStudies = ({ currentSlug }) => {
  // Case studies data - you can move this to a separate file or fetch from API
  const caseStudies = [
    {
      title: "How Infrasity assisted Terrateam, with 300% more traffic with organic tech content",
      slug: "terrateam-case-study",
      description: "This case study highlights how Infrasity assisted Terrateam, a Netherlands-based startup, achieve rapid growth through strategic, high-impact organic technical content.",
      image: "/PostImages/terrateam-case-study/0.png",
      publishedOn: "2024-11-19",
      stats: [
        { label: "Traffic Boost", value: "+15%" },
        { label: "Organic Growth", value: "+13.8%" }
      ]
    },
    {
      title: "Middleware and Infrasity: A Winning Partnership For Developer-Driven Content Success",
      slug: "middleware-case-study", 
      description: "Learn how Infrasity collaborated with Middleware to transform their content strategy, boosting SEO scores, enhancing user engagement, and driving traffic.",
      image: "/PostImages/middleware-case-study/0.png",
      publishedOn: "2025-01-12",
      stats: [
        { label: "SEO Improvement", value: "Significant" },
        { label: "User Engagement", value: "Enhanced" }
      ]
    },
    {
      title: "8x Growth Journey: How Developer-Focused Technical Content Scaled a B2B Enterprise SaaS Business",
      slug: "scalekit-case-study",
      description: "Discover how developer-focused technical content prompted a 5x growth for Scalekit, a B2B SaaS enterprise.",
      image: "/PostImages/scalekit-case-study/0.png", 
      publishedOn: "2025-01-21",
      stats: [
        { label: "Organic Traffic", value: "+828%" },
        { label: "Keywords", value: "+715%" }
      ]
    },
    {
      title: "How Infrasity Boosted Signups for a $23M Series A Cloud Startup Through Developer Marketing",
      slug: "case-study-series-a-cloud-developer-marketing",
      description: "This case study explores how Infrasity helped a $23M Series A cloud startup drive user signups through developer marketing strategies.",
      image: "/PostImages/case-study-series-a-cloud-developer-marketing/0.webp",
      publishedOn: "2025-10-03",
      stats: [
        { label: "Organic Traffic", value: "+781%" },
        { label: "Keywords", value: "+182%" }
      ]
    }
  ];

  // Filter out the current case study and take only 3
  const otherCaseStudies = caseStudies.filter(study => study.slug !== currentSlug).slice(0, 3);

  return (
    <div className="w-full py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 quicksand-bold">
          More Case Studies
        </h2>
        <p className="text-lg text-gray-300 quicksand-medium max-w-2xl mx-auto">
          Discover how we've helped other B2B SaaS companies achieve remarkable growth through strategic content marketing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherCaseStudies.map((study, index) => (
          <Link 
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group block p-6 bg-white bg-opacity-5 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:bg-opacity-10"
          >
            <div className="relative mb-4">
              <Image
                src={study.image}
                alt={study.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 quicksand-bold line-clamp-2">
              {study.title}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4 quicksand-medium line-clamp-3">
              {study.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {study.stats.map((stat, statIndex) => (
                <div key={statIndex} className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {stat.label}: {stat.value}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 quicksand-medium">
                {new Date(study.publishedOn).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <div className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Read More →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          href="/case-studies"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 quicksand-bold"
        >
          View All Case Studies
        </Link>
      </div>
    </div>
  );
};

export default MoreCaseStudies;
