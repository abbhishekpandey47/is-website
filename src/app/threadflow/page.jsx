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

const PostsPage = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
   

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

  console.log("Fetching posts for user:", firebaseUser.uid);

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

  fetchPosts();
}, [firebaseUser]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

    // Dynamically calculate status counts from posts
  const statusCounts = posts.reduce(
    (acc, post) => {
      acc[post.status] = (acc[post.status] || 0) + 1;
      return acc;
    },
    { approved: 0, pending: 0, rejected: 0, live: 0 }
  );


  const getStatusBadge = (status) => {
    const statusColors = {
      approved: "bg-approved text-approved-foreground",
      live: "bg-live text-live-foreground",
      pending: "bg-pending text-pending-foreground",
      rejected: "bg-rejected text-rejected-foreground",
    };

    return (
      <Badge className={`${statusColors[status?.toLowerCase()] || "bg-gray-200"} capitalize`}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return <div className="p-6">Loading your posts...</div>;
  }

  if (!firebaseUser) {
    return <div className="p-6">Please log in to view your posts.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              onClick={() => router.push("/threadflow/posts/add")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reddit Post
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>


      <div className="p-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatusCard status="approved" count={statusCounts.approved} label="Approved" />
                  <StatusCard status="pending" count={statusCounts.pending} label="Pending" />
                  <StatusCard status="rejected" count={statusCounts.rejected} label="Rejected" />
                  <StatusCard status="live" count={statusCounts.live} label="Live" />
                </div>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Drift Detection">Drift Detection</SelectItem>
                  <SelectItem value="IaC">IaC</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="AWS">AWS</SelectItem>
                  <SelectItem value="Enterprise AI">Enterprise AI</SelectItem>
                  <SelectItem value="AI Workflow">AI Workflow</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              My Posts ({filteredPosts.length})
            </CardTitle>
          </CardHeader>
          <div className="bg-[#344256] w-full h-[0.5px] mb-1"></div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Approved</TableHead>
                    <TableHead>Text of engagement</TableHead>
                    {/* <TableHead>Kim's Version</TableHead> */}
                    <TableHead>Date published</TableHead>
                     <TableHead>Status</TableHead>
                    <TableHead>Published Link</TableHead>
                   
                    <TableHead>Number of our engagements</TableHead>
                    <TableHead>Link to Kubiya</TableHead>
                    <TableHead>ID used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Badge variant="outline" className="whitespace-nowrap">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={post.title}>
                          {post.title}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1 truncate"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Reddit Link
                        </a>
                      </TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell className="max-w-sm">
                        <div className="text-sm text-muted-foreground line-clamp-3">
                          {post.engagement_text}
                        </div>
                      </TableCell>
                      {/* <TableCell className="max-w-sm">
                        <div className="text-sm text-muted-foreground line-clamp-3">
                          {post.kims_version}
                        </div>
                      </TableCell> */}
                      <TableCell className="text-sm">
                        {post.date_posted ? new Date(post.date_posted).toLocaleDateString() : "-"}
                      </TableCell>
                                            <TableCell className="text-sm">{post.current_status}</TableCell>

                      <TableCell>
                        <a
                          href={post.posted_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {post.posted_link ? "View Link" : "-"}
                        </a>
                      </TableCell>
                      <TableCell>
                      </TableCell>
                       <TableCell>
                      </TableCell>
                       <TableCell>
                        {post.id}
                      </TableCell>
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
