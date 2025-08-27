'use client';
import { useState } from "react";
import { Button } from "../../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../Components/ui/card";
import { Input } from "../../../Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select";
import { Badge } from "../../../Components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, ExternalLink, Trash2 } from "lucide-react";

// Enhanced post data structure matching the spreadsheet
const mockDetailedPosts = [
  {
    id: "1",
    category: "Drift Detection",
    title: "Drift detection tools 🛠️ around",
    url: "https://www.reddit.com/r/Terraform/comments/1fqk2nt/drift_detection_tools_around/",
    status: "Approved",
    engagementText: "Drift detection is such a pain when you are running TF on AWS. We tried the usual terraform plan checks in CI, but they only catch drift right before deploy, not when someone goes and tweaks something in the console at 2 AM. These small changes add up fast.",
    kimsVersion: "It took us a while to solve for drift detection when running TF on AWS. We tried the usual terraform plan checks in CI, but they only catch drift right before deploy, not when someone goes and tweaks something in the console at 2 AM. Those small tweaks added up fast.",
    datePosted: "17/08/2025",
    postedLink: "https://www.reddit.com/r/Terraform/comments/1fqk2nt/drift_detection_tools_around/",
    currentStatus: "Live"
  },
  {
    id: "2", 
    category: "Drift Detection",
    title: "Drift Detection Tools",
    url: "https://www.reddit.com/r/devops/comments/1fq8xd/drift_detection_tools/",
    status: "Approved",
    engagementText: "Using tools like firefly.ai for drift detection can truly enhance your infrastructure management across AWS, Azure, and GCP. The visibility it provides into who made changes, whether through the console or Git, is really helpful for maintaining control and accountability.",
    kimsVersion: "We used firefly.ai for drift detection and it helped a lot. For background, our infrastructure management is across AWS, Azure, and GCP. The visibility it provides into who made changes, whether through the console or Git, helped us get our infra under control and establish accountability across teams.",
    datePosted: "17/08/2025", 
    postedLink: "https://www.reddit.com/r/devops/comments/1fq8xd/drift_detection_tools/",
    currentStatus: "Live"
  },
  {
    id: "3",
    category: "IaC",
    title: "Open Source tools to detect infrastructure change",
    url: "https://www.reddit.com/r/devops/comments/1f8g8xd/open_source_tools/",
    status: "Approved",
    engagementText: "We've also been messing around with Firefly lately, yeah, not open source, I know. But it's been helpful. It scans across stacks and flags drift without needing to manually run a plan, and the Explorer view is actually useful when you're trying to untangle which resource got changed where and when.",
    kimsVersion: "We've also been messing around with Firefly lately (not open source though). I's been helpful. It scans across stacks and flags drift without needing to manually run a plan, and the Explorer view is actually useful when trying to untangle which resource got changed where and when.",
    datePosted: "17/08/2025",
    postedLink: "https://www.reddit.com/r/devops/comments/1f8g8xd/open_source_tools/", 
    currentStatus: "Live"
  }
];

const PostsPage = () => {
  const router = useRouter();
  const [posts] = useState(mockDetailedPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusColors = {
      approved: 'bg-approved text-approved-foreground',
      live: 'bg-live text-live-foreground',
      pending: 'bg-pending text-pending-foreground',
      rejected: 'bg-rejected text-rejected-foreground'
    };

    return (
      <Badge className={`${statusColors[status.toLowerCase()]} capitalize`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Reddit Posts Management</h1>
              <p className="text-sm text-muted-foreground">Manage all your Reddit content and engagement</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => router.push("crm/posts/add")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Post
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
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
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              All Posts ({filteredPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Engagement Text</TableHead>
                    <TableHead>Kim's Version</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead>Posted Link</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>Actions</TableHead>
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
                          {post.engagementText}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-sm">
                        <div className="text-sm text-muted-foreground line-clamp-3">
                          {post.kimsVersion}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {post.datePosted}
                      </TableCell>
                      <TableCell>
                        <a 
                          href={post.postedLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      </TableCell>
                      <TableCell>{getStatusBadge(post.currentStatus)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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