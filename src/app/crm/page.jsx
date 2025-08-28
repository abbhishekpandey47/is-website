'use client'


import { BarChart3, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RedditPostsTable } from "../../Components/RedditPostsTable";
import { SearchFilters } from "../../Components/SearchFilters";
import { StatusCard } from "../../Components/StatusCard";
import { Button } from "../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";
import { SidebarTrigger } from "../../Components/ui/sidebar";
import { UserProfile } from "../../Components/UserProfile";
import { signOutUser } from "../../lib/firebaseClient";

import LoaderWater from "@/Components/LoaderWater";


// Mock data for Reddit posts
const mockPosts = [
  {
    id: "1",
    title: "Emacs AI Assisted Programming Workflow",
    description: "For me, the big unlock was connecting the creative...",
    subreddit: "emacs",
    category: "AI Workflow",
    status: "approved",
    keywords: ["AI", "programming", "workflow"],
    upvotes: 45,
    comments: 12,
    date: "08/01/2025"
  },
  {
    id: "2",
    title: "How to integrate AI into your workflow?",
    description: "We've been going through something similar...",
    subreddit: "videography",
    category: "AI Workflow",
    status: "approved",
    keywords: ["AI integration", "workflow", "enterprise"],
    upvotes: 78,
    comments: 23,
    date: "08/01/2025"
  },
  {
    id: "3",
    title: "Deploying enterprise AI application in customer's private environment",
    description: "I've been using Kubiya lately as the coordination...",
    subreddit: "aws",
    category: "Enterprise AI",
    status: "approved",
    keywords: ["deployment", "enterprise", "AWS"],
    upvotes: 92,
    comments: 31,
    date: "08/01/2025"
  }
];

const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState('list');

  const [refreshToken, setRefreshToken] = useState();
  const exampleSectionRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      setLoading(false);
      setRefreshToken(refreshToken);
      console.log(refreshToken);
    } else {
      setLoading(false);
      signOutUser().then(() => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('refresh_token');
        router.push("/auth/signup");
      });
    }
  }, [router]);

  const handleScrollToExampleSection = () => {
    if (exampleSectionRef.current) {
      exampleSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const statusCounts = {
    approved: 3,
    pending: 0,
    rejected: 0,
    live: 0
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
    {loading ? <LoaderWater loadingMessage={"Loading please wait..."} /> : (
        !loading && refreshToken ?
    <div className="bg-background">
      {/* Header with Sidebar Trigger */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Reddit Engagement Tracker</h1>
                <p className="text-sm text-muted-foreground">Manage community discussions and workflows</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("crm/posts/add")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reddit Post
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard status="approved" count={statusCounts.approved} label="Approved" />
          <StatusCard status="pending" count={statusCounts.pending} label="Pending" />
          <StatusCard status="rejected" count={statusCounts.rejected} label="Rejected" />
          <StatusCard status="live" count={statusCounts.live} label="Live" />
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Reddit Posts ({filteredPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <RedditPostsTable posts={filteredPosts} />
          </CardContent>
        </Card>
      </div>
    </div>  : <LoaderWater loadingMessage={"Loading please wait..."} />
      )}
    </>
  );
};

export default Index;
