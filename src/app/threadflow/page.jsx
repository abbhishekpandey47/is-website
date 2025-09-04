"use client";
import { useState, useEffect } from "react";
import { Button } from "../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";
import { Input } from "../../Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/ui/select";
import { Badge } from "../../Components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../Components/ui/table";
import { SidebarTrigger } from "../../Components/ui/sidebar";
import { UserProfile } from "../../Components/UserProfile";
import { useRouter } from "next/navigation";
import { Plus, Search, ExternalLink, BarChart3 } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { toast } from "react-toastify";
import { StatusCard } from "../../Components/StatusCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu"

const PostsPage = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all"); 
   
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);

      if (!user) {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!firebaseUser) return;

    console.log("Fetching posts and comments for user:", firebaseUser.uid);

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?userId=${firebaseUser.uid}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to fetch posts");
        }

        setPosts(result.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        toast.error("Failed to load posts");
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment?userId=${firebaseUser.uid}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to fetch comments");
        }

        setComments(result.data || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
        toast.error("Failed to load comments");
      }
    };

    fetchPosts();
    fetchComments();
  }, [firebaseUser]);

  const allItems = [
    ...posts.map(post => ({ ...post, type: 'post' })),
    ...comments.map(comment => ({ ...comment, type: 'comment' }))
  ];

  const categories = ["all", ...new Set(allItems.map((item) => item.category).filter(Boolean))];
  const statuses = ["all", ...new Set(allItems.map((item) => item.status).filter(Boolean))];

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    const matchesType =
      selectedType === "all" || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  const getStatusCounts = () => {
    let itemsToCount = allItems;
    if (selectedType !== "all") {
      itemsToCount = allItems.filter(item => item.type === selectedType);
    }

    return itemsToCount.reduce(
      (acc, item) => {
        if (item.type === 'post') {
          acc[item.status] = (acc[item.status] || 0) + 1;
        } else {
          const status = item.status?.toLowerCase();
          if (status === 'live') {
            acc.live = (acc.live || 0) + 1;
          } else if (status === 'removed') {
            acc.rejected = (acc.rejected || 0) + 1;
          } else if (status === 'undermoderation') {
            acc.pending = (acc.pending || 0) + 1;
          } else {
            acc[item.status] = (acc[item.status] || 0) + 1;
          }
        }
        return acc;
      },
      { approved: 0, pending: 0, rejected: 0, live: 0 }
    );
  };

  const statusCounts = getStatusCounts();

  const getStatusBadge = (status) => {
  const statusColors = {
    // Published Post Status
    commentUnderApproval: "bg-blue-500 text-white",
    live: "bg-green-500 text-white",
    removed: "bg-red-500 text-white",
    undermoderation: "bg-yellow-500 text-black",

    // Post Approval Status
    approved: "bg-emerald-600 text-white",
    notapproved: "bg-red-600 text-white",
    pending: "bg-gray-500 text-white",
  };

  const colorClass = status
    ? statusColors[status.toLowerCase()] || "bg-gray-600 text-white"
    : "bg-gray-600 text-white";

  // Format text → insert spaces before capital letters
  const formattedText = status
    ? status.replace(/([a-z])([A-Z])/g, "$1 $2")
    : "";

  return (
    <Badge className={`${colorClass} capitalize`}>
      {formattedText}
    </Badge>
  );
};

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse h-6 w-48 bg-gray-300 rounded" />
        <div className="animate-pulse h-10 w-full bg-gray-200 rounded" />
        <div className="animate-pulse h-10 w-full bg-gray-200 rounded" />
      </div>
    );
  }

  if (!firebaseUser) {
    return <div className="p-6">Please log in to view your posts and comments.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/threadflow/posts/add")}>
                  Add Post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/threadflow/comment/add")}>
                  Add Comment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard status="approved" count={statusCounts.approved} label="Approved" />
          <StatusCard status="pending" count={statusCounts.pending} label="Pending" />
          <StatusCard status="live" count={statusCounts.live} label="Live" />
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts, comments, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="post">Posts</SelectItem>
                  <SelectItem value="comment">Comments</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {selectedType === "post" ? `My Posts (${filteredItems.length})` :
               selectedType === "comment" ? `My Comments (${filteredItems.length})` :
               `My Content (${filteredItems.length})`}
            </CardTitle>
          </CardHeader>
          <div className="bg-[#344256] w-full h-[0.5px] mb-1"></div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* Show Type column only when displaying all */}
                    {selectedType === "all" && <TableHead>Type</TableHead>}
                    
                    {/* Common columns */}
                    <TableHead>Category</TableHead>
                    
                    {/* Post-specific columns */}
                    {selectedType === "post" && (
                      <>
                        <TableHead>Title</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Text of engagement</TableHead>
                        <TableHead>Date published</TableHead>
                        <TableHead>Current Status</TableHead>
                        <TableHead>Published Link</TableHead>
                        <TableHead>Number of our engagements</TableHead>
                        <TableHead>Reddit Username</TableHead>
                      </>
                    )}
                    
                    {/* Comment-specific columns */}
                    {selectedType === "comment" && (
                      <>
                        <TableHead>Targeted Subreddit</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Comment Approval Status</TableHead>
                        <TableHead>Text of engagement</TableHead>
                        <TableHead>Date published</TableHead>
                        <TableHead>Customer Comments</TableHead>
                        <TableHead>Published Link</TableHead>
                        <TableHead>Reddit Username</TableHead>
                        <TableHead>Posted Comment Status</TableHead>
                      </>
                    )}
                    
                    {/* All type view - combined columns */}
                    {selectedType === "all" && (
                      <>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Text of engagement</TableHead>
                        <TableHead>Date published</TableHead>
                        <TableHead>Published Link</TableHead>
                        <TableHead>Targeted Subreddit</TableHead>
                        <TableHead>Reddit Username</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item, index) => (
                    <TableRow key={`${item.type}-${item.id}-${index}`}>
                      {/* Type column - only when showing all */}
                      {selectedType === "all" && (
                        <TableCell>
                          <Badge variant={item.type === 'post' ? 'default' : 'secondary'} className="capitalize">
                            {item.type}
                          </Badge>
                        </TableCell>
                      )}
                      
                      {/* Category - always shown */}
                      <TableCell>
                        <Badge variant="outline" className="whitespace-nowrap">
                          {item.category}
                        </Badge>
                      </TableCell>

                      {/* Post-specific layout */}
                      {selectedType === "post" && (
                        <>
                          {/* Title */}
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate" title={item.title}>
                              {item.title}
                            </div>
                          </TableCell>
                          
                          {/* URL */}
                          <TableCell className="max-w-xs">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 truncate"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Reddit Link
                            </a>
                          </TableCell>
                          
                          {/* Status */}
                          <TableCell>{getStatusBadge(item.status, item.type)}</TableCell>
                          
                          {/* Text of engagement */}
                          <TableCell className="max-w-sm">
                            <div className="text-sm text-muted-foreground line-clamp-3">
                              {item.engagement_text}
                            </div>
                          </TableCell>
                          
                          {/* Date published */}
                          <TableCell className="text-sm">
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>
                          
                          {/* Current Status */}
                          <TableCell className="text-sm">{item.current_status || "-"}</TableCell>
                          
                          {/* Published Link */}
                          <TableCell>
                            <a
                              href={item.posted_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {item.posted_link ? "View Link" : "-"}
                            </a>
                          </TableCell>
                          
                          {/* Number of our engagements */}
                          <TableCell className="text-sm">-</TableCell>
                          
                          {/* Reddit Username */}
                          <TableCell>{item.reddit_username || "-"}</TableCell>
                        </>
                      )}

                      {/* Comment-specific layout */}
                      {selectedType === "comment" && (
                        <>
                          {/* Targeted Subreddit */}
                          <TableCell className="max-w-sm">
                            <div className="text-sm text-muted-foreground line-clamp-3">
                              {item.targeted_subreddit || "-"}
                            </div>
                          </TableCell>
                          
                          {/* Title */}
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate" title={item.title}>
                              {item.title}
                            </div>
                          </TableCell>
                          
                          {/* Comment Approval Status */}
                          {/* getStatusBadge(item.posted_comment_status, 'comment')} */}
                          <TableCell>{getStatusBadge(item.status, 'comment')}</TableCell>
                          
                          {/* Text of engagement */}
                          <TableCell className="max-w-sm">
                            <div className="text-sm text-muted-foreground line-clamp-3">
                              {item.engagement_text}
                            </div>
                          </TableCell>
                          
                          {/* Date published */}
                          <TableCell className="text-sm">
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>
                          
                          {/* Customer Comments */}
                          <TableCell className="max-w-sm">
                            <div className="text-sm text-muted-foreground line-clamp-3">
                              {item.client_feedback || "-"}
                            </div>
                          </TableCell>
                          
                          {/* Published Link */}
                          <TableCell>
                            <a
                              href={item.posted_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {item.posted_link ? "View Link" : "-"}
                            </a>
                          </TableCell>
                          
                          {/* Reddit Username */}
                          <TableCell>{item.reddit_username || "-"}</TableCell>
                          
                          {/* Posted Comment Status */}
                          <TableCell>{getStatusBadge(item.posted_comment_status, 'comment')}</TableCell>
                        </>
                      )}

                      {/* All type view - simplified layout */}
                      {selectedType === "all" && (
                        <>
                          {/* Title */}
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate" title={item.title}>
                              {item.title}
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>{getStatusBadge(item.status, item.type)}</TableCell>

                          {/* Text of Engagement */}
                          <TableCell>
                            <EngagementTextCell text={item.engagement_text} />
                          </TableCell>

                          {/* Date Published */}
                          <TableCell className="text-sm">
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>

                          {/* Published Link */}
                          <TableCell>
                            <a
                              href={item.posted_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {item.posted_link ? "View Link" : "-"}
                            </a>
                          </TableCell>

                          {/* Targeted Subreddit */}
                          <TableCell>
                            {item.type === 'post' ? (item.target_subreddit || "-") : (item.targeted_subreddit || "-")}
                          </TableCell>

                          {/* Reddit Username */}
                          <TableCell>
                            {item.reddit_username || "-"}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostsPage;

const EngagementTextCell = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!text) {
    return <span className="text-muted-foreground">-</span>;
  }

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div className="relative max-w-sm">
      {/* Truncated preview */}
      <div
        className="text-sm text-muted-foreground line-clamp-3 cursor-help hover:text-foreground transition-colors duration-200
                   [&_a]:text-blue-500 [&_a:hover]:underline"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title="Hover to see full text"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {/* Tooltip with full content */}
      {showTooltip && (
        <div
          className="absolute z-50 left-0 top-full -mt-6 w-80 bg-popover border border-border rounded-lg shadow-lg p-3 animate-in fade-in-0 zoom-in-95"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-h-60 overflow-y-auto">
            <div
              className="text-sm text-popover-foreground whitespace-pre-wrap break-words
                         [&_a]:text-blue-500 [&_a:hover]:underline"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
          {/* Arrow pointer */}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
        </div>
      )}
    </div>
  );
};