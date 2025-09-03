"use client";

import Link from "next/link";
import Image from "next/image";



const posts = [

 
// Sure, sharing the same. 
// Video page 
// 1. https://www.infrasity.com/blog/key-performance-indicators-video-marketing
// 2. https://www.infrasity.com/blog/key-performance-indicators-video-marketing
// 3. https://www.infrasity.com/blog/comprehensive-guide-to-technical-seo-for-improved-website-performance
// Technical Writing page - 
// 1. https://www.infrasity.com/blog/top-10-technical-writing-service-companies
// 2. https://www.infrasity.com/blog/importance-of-writing-organic-content-benefits-and-best-practices-for-saas-companies
// 3. https://www.infrasity.com/blog/comprehensive-guide-to-technical-seo-for-improved-website-performance
  {
    date: "February 14, 2025",
    title: "Top 10 Technical Content Writing Service Companies in 2025",
    href: "/blog/top-10-technical-writing-service-companies",
    image: "/PostImages/comprehensive-guide-to-technical-seo-for-improved-website-performance/0.webp",
  },
  {
    date: "September 30, 2024",
    title: "Writing Technical Content – Benefits and Best Practices for SaaS Companies",
    href: "/blog/importance-of-writing-organic-content-benefits-and-best-practices-for-saas-companies",
    image: "/PostImages/importance-of-writing-organic-content-benefits-and-best-practices-for-saas-companies/0.webp",
  },
  {
    date: "September 16, 2024",
    title: "Comprehensive Guide to Technical SEO for Improved Website Performance",
    href: "/blog/comprehensive-guide-to-technical-seo-for-improved-website-performance",
    image: "/PostImages/comprehensive-guide-to-technical-seo-for-improved-website-performance/0.webp",
  },
];

export default function BlogSection() {
  return (
<section className="max-w-6xl mx-auto px-6 mb-14">
  <div className="w-full">
    {/* Header */}
    <div className="flex flex-row justify-between items-center gap-4 flex-wrap w-full">
      <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left w-full md:w-auto">
        {/* Badge */}
        <div className="flex flex-row gap-3 items-center">
          <div className="w-2 h-2 rotate-45 bg-red-600"></div>
          <span className="text-sm font-medium uppercase text-white">Blog</span>
        </div>
        {/* Title */}
        <h2
          role="heading"
          aria-level="2"
          className="font-[quicksand] text-[32px] xxs:text-[40px] xs:text-[52px] leading-[120%] tracking-[-1%] text-white"
        >
          Latest Blog
        </h2>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <Link href="/blog">
          <button className="rounded-xl inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-white bg-transparent text-white hover:text-gray-300 text-[15px] px-4 py-2">
            View all
          </button>
        </Link>
      </div>
    </div>

    {/* Blog Grid */}
  <div className="relative mt-8 border-y border-[rgba(255,255,255,0.14)]">
 <span
      aria-hidden
      className="hidden md:block pointer-events-none absolute inset-y-0 left-[32%] w-px bg-[rgba(255,255,255,0.14)]"
    />
    <span
      aria-hidden
      className="hidden md:block pointer-events-none absolute inset-y-0 left-[68%] w-px bg-[rgba(255,255,255,0.14)]"
    />

    <div className="grid md:grid-cols-3 gap-20">
      {posts.map((post, i) => (
        <div
          key={i}
          className="flex flex-col items-center py-10 pb-10 gap-20 justify-between w-full"
        >
      
        <Link
          href={post.href}
          className="flex flex-col gap-6 h-full justify-between"
        >
          <div className="flex flex-col gap-6 text-center md:text-left">
            <span className="text-gray-500">{post.date}</span>
            <h3 className="overflow-hidden text-ellipsis text-pretty text-white">
              {post.title}
            </h3>
          </div>
          <div className="w-full aspect-[7/4] rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>


    {/* Mobile CTA */}
    <div className="block md:hidden mt-6 justify-center">
      <Link href="/blog">
        <button className="rounded-xl inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-white bg-transparent text-white hover:text-gray-900 text-[15px] px-4 py-2">
          View all
        </button>
      </Link>
    </div>
  </div>
</section>
  );
}
