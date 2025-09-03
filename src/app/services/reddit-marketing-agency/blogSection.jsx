"use client";

import Link from "next/link";
import Image from "next/image";

// 1. https://www.infrasity.com/blog/reddit-organic-vs-paid-marketing
// 2. https://www.infrasity.com/blog/reddit-b2b-marketing-strategy
// 3. https://www.infrasity.com/blog/reddit-karma-farming-vs-credibility

const posts = [
  {
    date: "Aug 11, 2025",
    title: "Organic Vs Paid Marketing on Reddit: What Works Best in 2025?",
    href: "/blog/reddit-organic-vs-paid-marketing",
    image: "/PostImages/organic-vs-paid-marketing-reddit/organic-vs-paid-marketing-reddit.png",
  },
  {
    date: "2025-08-22",
    title:
      "Subreddit Strategy for Reddit B2B Marketing: How to Pick the Right Communities",
    href: "/blog/reddit-b2b-marketing-strategy",
    image: "/PostImages/reddit-b2b-marketing-strategy/banner.jpg",
  },
  {
    date: "Jun 9, 2025",
    title: "Karma Farming vs Credibility: What Really Drives Reddit B2B Marketing Growth",
    href: "/blog/reddit-karma-farming-vs-credibility",
    image: "/PostImages/reddit-karma-farming-vs-credibility/banner.png",
  },
];

export default function BlogSection() {
  return (
  <section className="max-w-6xl mx-auto px-6 flex flex-col items-center">
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
          className="font-light text-[32px] xxs:text-[40px] xs:text-[52px] leading-[120%] tracking-[-1%] text-white"
        >
          Latest news
        </h2>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <Link href="/blog">
          <button className="rounded-xl inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-white bg-transparent text-white hover:text-gray-900 text-[15px] px-4 py-2">
            View all
          </button>
        </Link>
      </div>
    </div>

    {/* Blog Grid */}
    <div className="mt-8">
  <div className="grid border-[rgba(255,255,255,0.14)] mb-6 border-b border-t md:mx-0 w-[calc(100%+3rem)] md:w-full md:auto-cols-fr gap-10 md:grid-flow-col">
    {posts.map((post, index) => (
      <div
        key={index}
        className={`flex flex-col items-center border-[rgba(255,255,255,0.14)] pt-10 pb-10 gap-20 justify-between w-full bg-[#0E1416] 
          ${index < 2 ? "border-r" : ""}`}
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
