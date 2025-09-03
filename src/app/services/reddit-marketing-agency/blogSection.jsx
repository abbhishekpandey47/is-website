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
    date: "Jul 24, 2025",
    title:
      "MLflow Meets TypeScript: Debug and Monitor Full-Stack AI Applications with MLflow",
    href: "/blog/mlflow-typescript",
    image: "/img/blog/mlflow-typescript-thumbnail.png",
  },
  {
    date: "Jun 9, 2025",
    title: "Announcing MLflow 3",
    href: "/blog/mlflow-3-launch",
    image: "/img/blog/mlflow-3-trace-ui.png",
  },
];

export default function BlogSection() {
  return (
    <section className="flex flex-col gap-4 w-full items-center md:items-start">
      {/* Header */}
      <div className="flex flex-row justify-between items-center gap-4 flex-wrap w-full">
        <div className="flex flex-col gap-6 items-start">
          {/* Badge */}
          <div className="flex flex-row gap-3 items-center">
            <div className="w-2 h-2 rotate-45 bg-red-600"></div>
            <span className="text-sm font-medium uppercase text-white">Blog</span>
          </div>
          {/* Title */}
          <h2
            role="heading"
            aria-level="2"
            className="wrap-anywhere text-wrap font-light text-[32px] xxs:text-[40px] xs:text-[52px] leading-[120%] tracking-[-1%] text-center md:text-left text-white"
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
      <div className="w-full overflow-hidden">
        <div className="grid bg-[rgba(255,255,255,0.08)] gap-[1px] border-[rgba(255,255,255,0.08)] border-t border-b -mx-10 w-[calc(100%+var(--spacing)*10*2)] md:auto-cols-fr md:grid-flow-col">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-10 gap-20 justify-between w-full bg-[#0E1416]"
            >
              <Link
                href={post.href}
                className="flex flex-col gap-6 h-full justify-between"
              >
                <div className="flex flex-col gap-6">
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
      <div className="block md:hidden">
        <Link href="/blog">
          <button className="rounded-xl inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-white bg-transparent text-white hover:text-gray-900 text-[15px] px-4 py-2">
            View all
          </button>
        </Link>
      </div>
    </section>
  );
}
