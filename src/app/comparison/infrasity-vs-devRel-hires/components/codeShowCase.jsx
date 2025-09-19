import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, MessageSquare, BarChart3, ExternalLink, ThumbsUp, Eye } from "lucide-react";

const blogs = [
  {
    platform: {
      name: "Dev.to",
      logo: "https://dev.to/images/devto-logo.png",
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
      '"When we first started scaling our GraphQL API at TechFlow, we hit the classic N+1 problem that brought our response times from 200ms to over 5 seconds..."',
    code: `const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      // DataLoader pattern implementation
      return context.userLoader.loadMany(args.ids);
    }
  }
};`,
    distributed: ["Reddit r/GraphQL", "HackerNews", "LinkedIn", "Twitter thread"],
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
    { label: "Total Content Views", value: 68000, style: "" },
    { label: "Website Visits", value: 8900, style: "" },
  ],
  items: [
    { label: "Blog Posts", stats: "45k views • 134 leads", progress: 75 },
    { label: "Video Tutorials", stats: "23k views • 89 subscribers", progress: 45 },
    { label: "Community Posts", stats: "1.5k karma • 5.6k traffic", progress: 60 },
  ],
  conversion: {
    rate: "4.2%",
    description: "445 signups → 23 paid conversions",
  },
};

const contentExamples = {
  blog: (
    <div className="space-y-6">
      {blogs.map((blog, i) => (
        <div
          key={i}
          className=" rounded-lg border  overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b ">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={blog.platform.logo}
                alt={blog.platform.name}
                className="w-8 h-8 rounded"
              />
              <span className="font-semibold">{blog.platform.label}</span>
              <span className=" flex items-center gap-1 text-sm">
                <Eye className="w-4 h-4" /> {blog.stats.views}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">
              {blog.title}
            </h3>

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

              {/* Code Block */}
              <div className="p-4 rounded border-l-4 overflow-x-auto">
                <code className="text-sm whitespace-pre">
                  {blog.code}
                </code>
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
    <div className=" rounded-lg border overflow-hidden">
      <div className="aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br "></div>
        <div className="relative text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Video className="w-8 h-8"  />
          </div>
          <h4 className="font-semibold">API Authentication Deep Dive</h4>
          <p className="text-sm text-muted-foreground">12:34 • 8.9k views</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-3">
          "Zero to JWT: Complete Authentication Tutorial"
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span>YouTube</span>
            <span className="">8.9k views • 342 likes</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Embedded in docs</span>
            <span className="">2.1k interactions</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Social clips (Twitter/LinkedIn)</span>
            <span className="">45k impressions</span>
          </div>
        </div>
        <div className="mt-4 p-3 rounded text-sm">
          <strong>Chapters:</strong> Setup (0:00) • JWT Basics (2:30) • Security Best Practices (8:45) • Production Tips (11:00)
        </div>
      </div>
    </div>
  ),

  community: (
    <div className="space-y-4">
      {community.map((post, i) => (
        <div
          key={i}
          className="rounded-lg border  p-4"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-8 h-8 ${post.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
            >
              {post.short}
            </div>
            <span className="font-semibold">{post.name}</span>
            <span className="text-sm">{post.score}</span>
          </div>

          {/* Title */}
          <h4 className="font-semibold mb-2">{post.title}</h4>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3">
            {post.description}
          </p>

          {/* Stats */}
          <div className="flex gap-4 text-xs text-muted-foreground">
            {post.stats.map((stat, idx) => (
              <span key={idx}>{stat}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),

  analytics: (
    <div className="rounded-lg border p-6">
      <h3 className="text-lg font-semibold  mb-6">
        Last 30 Days Performance
      </h3>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {performanceData.totals.map((total, index) => (
          <div key={index} className="text-center p-4  rounded-lg">
            <div className={`text-2xl font-bold ${total.style}`}>{total.value.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">{total.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {performanceData.items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm ">{item.stats}</span>
            </div>
            <div className="w-full  rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Rate */}
      <div className="mt-6 p-4  rounded-lg">
        <div className="text-sm font-semibold  mb-1">
          Conversion Rate: {performanceData.conversion.rate}
        </div>
        <div className="text-xs text-muted-foreground">{performanceData.conversion.description}</div>
      </div>
    </div>
  )
};

const CodeShowcase = () => {
  return (
    <section className="py-20 relative">
         <div className='w-[95vw] mx-auto'>
        <div className="divider-line divider-top max-lg:hidden " style={{ top: '40px', width: '95vw', overflow: 'hidden' }} />
      </div>
      <div className="divider-line divider-left max-lg:hidden" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  mb-6">
            Engineering-led content at scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See exactly what we deliver. Technical depth, multi-format content, 
            and distribution strategies that actually convert developers.
          </p>
        </div>

        {/* Content Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-4  border ">
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Video Content
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Community
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
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
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6  rounded-xl border ">
            <div className="text-3xl font-bold ">12+</div>
            <div className="text-muted-foreground">Content pieces/month</div>
          </div>
          <div className="p-6 rounded-xl border ">
            <div className="text-3xl font-bold  mb-2">50+</div>
            <div className="text-muted-foreground">Distribution channels</div>
          </div>
          <div className="p-6  rounded-xl border">
            <div className="text-3xl font-bold mb-2">3M+</div>
            <div className="text-muted-foreground">Monthly developer reach</div>
          </div>
          <div className="p-6  rounded-xl border ">
            <div className="text-3xl font-bold  mb-2">4.2%</div>
            <div className="text-muted-foreground">Avg conversion rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;