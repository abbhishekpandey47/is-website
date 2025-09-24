import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../Components/ui/tabs";
import {
  FileText,
  Video,
  MessageSquare,
  BarChart3,
  ExternalLink,
  ThumbsUp,
  Eye,
} from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

const blogs = [
  {
    platform: {
      name: "Dev.to",
      logo: "/comparison/dev.to.jpg",
      label: "Published on Dev.to",
    },
    stats: {
      views: "12.4k views",
      reactions: "234 reactions",
      readTime: "8 min read",
      author: "Infrasity Engineering Team",
    },
    title:
      "Building Scalable GraphQL APIs: Performance Patterns That Actually Work",
    preview:
      "When we first started scaling our GraphQL API at TechFlow, we hit the classic N+1 problem that brought our response times from 200ms to over 5 seconds. Here's how we solved it...",
    distributed: [
      "Reddit r/GraphQL",
      "HackerNews",
      "LinkedIn",
      "Twitter thread",
    ],
  },
  // Add more articles here...
];

const community = [
  {
    platform: "Reddit",
    short: "r/",
    name: "r/webdev",
    color: "bg-orange-500",
    score: "↑ 1.2k upvotes",
    title: '"Here is how we reduced our API response time by 80%"',
    description:
      "Real case study from implementing DataLoader patterns. Code included + performance benchmarks.",
    stats: ["234 comments", "89 shares", "12 awards"],
  },
  {
    platform: "Hacker News",
    short: "HN",
    name: "Hacker News",
    color: "bg-orange-600",
    score: "340 points",
    title: '"Show HN: Open-source GraphQL performance monitoring tool"',
    description:
      "Built tool to solve our own problems, now helping 500+ developers optimize their APIs.",
    stats: ["156 comments", "5.6k visitors", "67 GitHub stars"],
  },
  // you can add more posts here dynamically later
];

const performanceData = {
  totals: [
    { label: "Total Content Views", value: 68000, style: "text-[#5F64FF]" },
    { label: "Website Visits", value: 8900, style: "text-success" },
  ],
  items: [
    { label: "Blog Posts", stats: "45k views • 134 leads", progress: 75 },
    {
      label: "Video Tutorials",
      stats: "23k views • 89 subscribers",
      progress: 45,
    },
    {
      label: "Community Posts",
      stats: "1.5k karma • 5.6k traffic",
      progress: 60,
    },
  ],
  conversion: {
    rate: "4.2%",
    description: "445 signups → 23 paid conversions",
  },
};

const contentExamples = {
  blog: (
    <div className="space-y-6">
      {blogs.map((blog,i) => (
        <div key={i} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-4 transition-transform hover:scale-[1.02] hover:shadow-2xl">

          {/* Header */}
          <div className="p-6 border-b ">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={blog.platform.logo}
                alt={blog.platform.name}
                className="w-8 h-8 rounded"
                width={100}
                height={100}
              />
              <span className="font-semibold">{blog.platform.label}</span>
              <span className=" flex items-center gap-1 text-sm text-[#4ade80]">
                <Eye className="w-4 h-4 " color="#4ade80" /> {blog.stats.views}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {blog.stats.author}</span>
              <span>•</span>
              <span>{blog.stats.readTime}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{blog.stats.reactions}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="prose ">
              <p className="mb-4">{blog.preview}</p>
              <div className="p-4 border-[#5F64FF] rounded-lg border-l-4 ">
            <h4 className="font-semibold mb-2 ">Key Takeaways:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Implemented DataLoader pattern for batching database queries</li>
              <li>• Reduced API response time from 5s to 180ms (96% improvement)</li>
              <li>• Added query complexity analysis and rate limiting</li>
              <li>• Open-sourced our monitoring tools for the community</li>
            </ul>
           </div>

              {/* Distribution Info */}
              <p className="mt-4 text-muted-foreground">
                Also distributed to: {blog.distributed.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
 video: (
  <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-2xl">
    <div className="aspect-video flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F64FF]/30 to-[#7B79FF]/20"></div>
      <div className="relative text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-white/20 backdrop-blur-sm">
          <Video className="w-8 h-8 text-[#5F64FF]" />
        </div>
        <h4 className="font-semibold text-white">API Authentication Deep Dive</h4>
        <p className="text-sm text-white/70">12:34 • 8.9k views</p>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-3 text-white">
        &quot;Zero to JWT: Complete Authentication Tutorial&quot;
      </h3>
      <div className="space-y-3 text-sm text-white/80">
        <div className="flex justify-between items-center">
          <span>YouTube</span>
          <span className="text-success">8.9k views • 342 likes</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Embedded in docs</span>
          <span className="text-success">2.1k interactions</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Social clips (Twitter/LinkedIn)</span>
          <span className="text-success">45k impressions</span>
        </div>
      </div>
      <div className="mt-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm text-sm text-white/70">
        <strong>Chapters:</strong> Setup (0:00) • JWT Basics (2:30) • Security
        Best Practices (8:45) • Production Tips (11:00)
      </div>
    </div>
  </div>
),

community: (
  <div className="space-y-4">
    {community.map((post, i) => (
      <div
        key={i}
        className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-4 transition-transform hover:scale-[1.02] hover:shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-8 h-8 ${post.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md`}
          >
            {post.short}
          </div>
          <span className="font-semibold text-white">{post.name}</span>
          <span className="text-sm text-success">{post.score}</span>
        </div>

        {/* Title */}
        <h4 className="font-semibold mb-2 text-white">{post.title}</h4>

        {/* Description */}
        <p className="text-sm text-white/70 mb-3">{post.description}</p>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-white/50">
          {post.stats.map((stat, idx) => (
            <span key={idx}>{stat}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
),
 
  analytics: (
  <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-4 transition-transform hover:scale-[1.02] hover:shadow-2xl">
    <h3 className="text-lg font-semibold mb-6 text-white">
      Last 30 Days Performance
    </h3>

    {/* Totals */}
    <div className="grid grid-cols-2 gap-6 mb-6">
      {performanceData.totals.map((total, index) => (
        <div
          key={index}
          className="text-center p-4 rounded-lg bg-white/10 shadow-sm"
        >
          <div className={`text-2xl font-bold text-[#5F64FF] ${total.style}`}>
            {total.value.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">{total.label}</div>
        </div>
      ))}
    </div>

    {/* Progress Bars */}
    <div className="space-y-4">
      {performanceData.items.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">{item.label}</span>
            <span className="text-sm text-success">{item.stats}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#5F64FF] to-[#7F8CFF] transition-all duration-500"
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>

    {/* Conversion Rate */}
    <div className="mt-6 p-4 rounded-lg bg-success/15 border border-gray-700">
      <div className="text-sm font-semibold mb-1 text-success">
        Conversion Rate: {performanceData.conversion.rate}
      </div>
      <div className="text-xs text-gray-400">
        {performanceData.conversion.description}
      </div>
    </div>
  </div>
  ),

};

const CodeShowcase = () => {
    const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".showcase-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate bottom stats
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate tab content on value change
  const handleTabChange = (val) => {
    gsap.fromTo(
      `[data-state="active"][data-value="${val}"]`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  };

  return (
  
    <section className="py-20 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 showcase-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Engineering-led content at scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See exactly what we deliver. Technical depth, multi-format content,
            and distribution strategies that actually convert developers.
          </p>
        </div>

        {/* Content Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="blog" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4 border bg-white/10 rounded-lg" style={{height : "2.6rem"}}>
              <TabsTrigger
                value="blog"
                className="text-xs md:text-sm flex items-center gap-2 transition-transform hover:scale-105 data-[state=active]:bg-[#5F64FF] data-[state=active]:text-white rounded-md "
                
              >
                <FileText className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="text-xs md:text-sm flex items-center gap-2 transition-transform hover:scale-105 data-[state=active]:bg-[#5F64FF] data-[state=active]:text-white rounded-md "
              >
                <Video className="w-4 h-4" />
                Video Content
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="text-xs md:text-sm flex items-center gap-2 transition-transform hover:scale-105 data-[state=active]:bg-[#5F64FF] data-[state=active]:text-white rounded-md"
              >
                <MessageSquare className="w-4 h-4" />
                Community
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="text-xs md:text-sm flex items-center gap-2 transition-transform hover:scale-105 data-[state=active]:bg-[#5F64FF] data-[state=active]:text-white rounded-md"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {Object.entries(contentExamples).map(([key, content]) => (
              <TabsContent key={key} value={key} className="mt-6">
                {content}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Bottom Stats */}
        <div
          ref={statsRef}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          <div className="p-6 rounded-xl  bg-white/5 stat-card">
            <div className="text-3xl font-bold">12+</div>
            <div className="text-muted-foreground">Content pieces/month</div>
          </div>
          <div className="p-6 rounded-xl  bg-white/5 stat-card">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-muted-foreground">Distribution channels</div>
          </div>
          <div className="p-6 rounded-xl  bg-white/5 stat-card">
            <div className="text-3xl font-bold mb-2">3M+</div>
            <div className="text-muted-foreground">
              Monthly developer reach
            </div>
          </div>
          <div className="p-6 rounded-xl  bg-white/5 stat-card">
            <div className="text-3xl font-bold mb-2">4.2%</div>
            <div className="text-muted-foreground">Avg conversion rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;
