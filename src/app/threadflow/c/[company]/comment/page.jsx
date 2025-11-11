"use client";
import { onAuthStateChanged } from "firebase/auth";
import { Edit, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { UserProfile } from "@/Components/UserProfile";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";
import { HoverTextCell } from "../components/HoverTextCell";
import Pagination from "../components/pagination";
import dayjs from "dayjs";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const PAGE_SIZE = 10;

function camelCaseToSentence(str){
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')   // add space before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
}

const PostsPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);

  // Edit modal
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    category: "",
    title: "",
    engagementText: "",
    datePosted: "",
    postedLink: "",
    status: "pending",
    clientFeedback: "",
    targetedSubreddit: "",
    postURL: "",
    redditUsername: "",
    postedCommentStatus: "",
    totalViews:""
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, post: null });
    const [editCategories, setEditCategories] = useState([
    "Drift Detection",
    "IaC",
    "DevOps",
    "AWS",
    "Enterprise AI",
    "AI Workflow"
  ]);

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
    const token = await firebaseUser.getIdToken();
    const res = await fetch(`/api/comment`, { headers: { Authorization: `Bearer ${token}` } });
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to fetch posts");
        }

        setPosts(result.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
         toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
      }
    };

    fetchPosts();
  }, [firebaseUser]);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(false);

      if (!user) {
        router.push("/auth/signin");
      } else {
        try {
          const token = await user.getIdToken();
          const res = await fetch(`/api/comment?categories=true`, { headers: { Authorization: `Bearer ${token}` } });
          const result = await res.json();

          if (res.ok && result.categories) {
            setEditCategories((prev) => {
              const merged = [...prev, ...result.categories];
              return [...new Set(merged.map((c) => c.trim()))];
            });
          }
        } catch (err) {
          console.error("Failed to fetch categories:", err);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);


const categories = ["all", ...new Set(posts.map((post) => post.category).filter(Boolean))];
const statuses = ["all", ...new Set(posts.map((post) => post.posted_comment_status).filter(Boolean))];

  // Date range filter (inclusive)
  const matchesDateRange = (post, range) => {
    const [start, end] = range || [];
    if (!start || !end) return true; // no filter active

    const startMs = start.startOf("day").valueOf();
    const endMs = end.endOf("day").valueOf();

    // Accept common date formats (ISO string, ms number, Date)
    const postMs = post?.date_posted ? dayjs(post.date_posted).valueOf() : NaN;

    // If invalid/missing date and range is set => exclude
    if (!Number.isFinite(postMs)) return false;

    return postMs >= startMs && postMs <= endMs;
  };

const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || post.status === selectedStatus;
    const matchesDate = matchesDateRange(post, dateRange);

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
    const paginatedPosts = filteredPosts.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );
    // Update current page when pagination changes
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    useEffect(() => {
      setCurrentPage(1); // reset to first page whenever filters or search change
    }, [searchQuery, selectedCategory]);

const getStatusBadge = (status) => {
  const statusColors = {
    // Published Post Status
    commentunderapproval: "bg-blue-500 text-white",
    live: "bg-green-500 text-white",
    removed: "bg-red-500 text-white",
    undermoderation: "bg-yellow-500 text-black",
    reposted : "bg-purple-500 text-white",

    

    // Post Approval Status
    approved: "bg-emerald-700 text-white",
    notapproved: "bg-red-600 text-white",
    pending: "bg-yellow-400 text-black",

  };

  const colorClass = status
    ? statusColors[status.toLowerCase()] || "bg-gray-600 text-white"
    : "bg-gray-600 text-white";

  // Format text → insert spaces before capital letters
  const formattedText = status
    ? status.replace(/([a-z])([A-Z])/g, "$1 $2")
    : "";

  return (
    <Badge className={`${colorClass} capitalize text-center min-w-[8rem] justify-center`}>
      {formattedText}
    </Badge>
  );
};


  const openEditModal = (post) => {
  setEditCategories((prev) => {
    if (post.category && !prev.includes(post.category)) {
      return [...prev, post.category];
    }
    return prev;
  });

  setEditingPost(post);
  setEditFormData({
    category: post.category || "",
    title: post.title || "",
    engagementText: post.engagement_text || "",
    datePosted: post.date_posted ? new Date(post.date_posted).toISOString().split('T')[0] : "",
    postedLink: post.posted_link || "",
    status: post.status || "pending",
    clientFeedback: post.client_feedback || "",
    targetedSubreddit: post.targeted_subreddit || "",
    postURL: post.post_url || "",
    redditUsername: post.reddit_username || "",
    postedCommentStatus: post.posted_comment_status || "notPosted",
    totalViews : post.total_views
  });
  setIsEditModalOpen(true);
};

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingPost(null);
    setEditFormData({
      category: "",
      title: "",
      url: "",
      status: "pending",
      engagementText: "",
      kimsVersion: "",
      datePosted: "",
      postedLink: "",
      currentStatus: "pending",
      redditUsername: "",
      postedCommentStatus: "notPosted",
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.category || !editFormData.title) {
      toast.error("Please fill in category, title, and URL fields.");
      return;
    }

    try {
      const token = await firebaseUser.getIdToken();
      const res = await fetch("/api/comment", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          id: editingPost.id, // required for update
          category: editFormData.category,
          title: editFormData.title,
          status: editFormData.status || "pending",
          engagement_text: editFormData.engagementText || null,
          date_posted: editFormData.datePosted ? new Date(editFormData.datePosted) : null,
          posted_link: editFormData.postedLink || null,
          user_id: editFormData.user_id,
          targeted_subreddit: editFormData.targetedSubreddit || null,
          client_feedback: editFormData.clientFeedback || null,
          post_url: editFormData.postURL || null,
          reddit_username: editFormData.redditUsername || null,
          posted_comment_status: editFormData.postedCommentStatus || "notPosted",
          total_views : editFormData.totalViews || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update post");
      }

      // Update the posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? { ...post, ...result.data[0] } : post
        )
      );

      toast({
        title: "Post updated successfully!",
        description: "The post was updated successfully.",
      });
      closeEditModal();
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error(err.message);
    }
  };

  // Delete functionality
  const openDeleteConfirmation = (post) => {
    setDeleteConfirmation({ isOpen: true, post });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ isOpen: false, post: null });
  };

  const handleDelete = async () => {
  const postId = deleteConfirmation.post.id;
  setIsDeleting(postId);

  try {
    const token = await firebaseUser.getIdToken();
    const res = await fetch(`/api/comment?id=${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();

    if (!res.ok) {
      // Customize error message for user
      let message = result.error || "Failed to delete post";

      if (
        message.toLowerCase().includes("foreign key") ||
        message.toLowerCase().includes("permission") ||
        message.toLowerCase().includes("not authorized")
      ) {
        message = "You may not be the right person to delete this post.";
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      return;
    }

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    toast({
      title: "Post deleted successfully!",
      description: "The post was removed from the tracker.",
    });
    closeDeleteConfirmation();
  } catch (err) {
    console.error("Error deleting post:", err);
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
  } finally {
    setIsDeleting(null);
  }
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
    return <div className="p-6">Please log in to view your Comment.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Reddit Comment Management</h1>
              <p className="text-sm text-muted-foreground">Manage all your Reddit content and engagement</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/threadflow/comment/add")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Comment
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="p-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search Comment, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

           <Select
  value={editFormData.category}
  onValueChange={(value) => handleEditInputChange("category", value)}
>
  <SelectTrigger>
    <SelectValue placeholder="Select category">
      {editFormData.category || "Select category"}
    </SelectValue>
  </SelectTrigger>
  <SelectContent className="max-h-60">
    {editCategories.map((category) => (
      <SelectItem key={category} value={category}>
        {category}
      </SelectItem>
    ))}
  </SelectContent>
</Select>



            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
  <SelectTrigger className="w-32">
    <SelectValue placeholder="All Status" />
  </SelectTrigger>
  <SelectContent>
    {statuses.map((status) => (
      <SelectItem key={status} value={status}>
        {status === "all" ? "All Status" : camelCaseToSentence(status)}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

              {/* Date Range */}
              <RangePicker
                value={dateRange}
                className="dark-range-picker"
                popupClassName="dark-range-picker-dropdown"
                onChange={(vals) => setDateRange(vals || [null, null])}
                allowClear
                format="YYYY-MM-DD"
                presets={[
                  {
                    label: "Today",
                    value: [dayjs().startOf("day"), dayjs().endOf("day")],
                  },
                  {
                    label: "Last 7 Days",
                    value: [
                      dayjs().subtract(6, "day").startOf("day"),
                      dayjs().endOf("day"),
                    ],
                  },
                  {
                    label: "Last 30 Days",
                    value: [
                      dayjs().subtract(29, "day").startOf("day"),
                      dayjs().endOf("day"),
                    ],
                  },
                  {
                    label: "This Month",
                    value: [dayjs().startOf("month"), dayjs().endOf("month")],
                  },
                  {
                    label: "Last Month",
                    value: [
                      dayjs().subtract(1, "month").startOf("month"),
                      dayjs().subtract(1, "month").endOf("month"),
                    ],
                  },
                ]}
              />

            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              My Comment ({filteredPosts.length})
            </CardTitle>
          </CardHeader>
          <div className="bg-[#344256] w-full h-[0.5px] mb-1"></div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Targeted Subreddit</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Reddit Post URL</TableHead>
                    <TableHead>Comment Approval Status</TableHead>
                    <TableHead>Text of engagement</TableHead>
                    <TableHead>Date published</TableHead>
                    <TableHead>Customer Comments</TableHead>
                    <TableHead>Published Link</TableHead>
                    <TableHead>Total Views</TableHead>
                    {/* <TableHead>Number of our engagements</TableHead> */}
                    {/* <TableHead>Link to Kubiya</TableHead> */}
                    <TableHead>Reddit Username</TableHead>
                    <TableHead>Posted Comment Status</TableHead>
                    <TableHead>Actions</TableHead>

                    {/* <TableHead>Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Badge variant="outline" className="whitespace-nowrap">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-sm">
                        <div className="text-sm text-muted-foreground line-clamp-3">
                          {post.targeted_subreddit}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                          <HoverTextCell text={post.title} isTitle={true} />
                      </TableCell>
                       <TableCell>
                        <a
                          href={post.post_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {post.post_url ? "Post Link" : "-"}
                        </a>
                      </TableCell>
                                <TableCell>{getStatusBadge(post.status, 'comment')}</TableCell>

                      <TableCell className="max-w-sm">
                          <HoverTextCell text={post.engagement_text} isTextEngagement={true} />
                      </TableCell>
                      <TableCell className="text-sm">
                        {post.date_posted ? new Date(post.date_posted).toLocaleDateString() : "-"}
                      </TableCell>
                      <TableCell className="text-sm"> <HoverTextCell text={post.client_feedback}/></TableCell>
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
                      <TableCell>{post.total_views ? post.total_views : "-"}</TableCell>

                      {/* <TableCell></TableCell>
                      <TableCell></TableCell> */}
                      <TableCell>{post.reddit_username}</TableCell>
                                             <TableCell><div className="text-center">{getStatusBadge(post.posted_comment_status)}</div></TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(post)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteConfirmation(post)}
                            disabled={isDeleting === post.id}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
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
           <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
             
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Edit Post</h2>
                <Button
                  variant="ghost"
                  onClick={closeEditModal}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-category">Category *</Label>
                      <Select
                        value={editFormData.category}
                        onValueChange={(value) => handleEditInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                                    <SelectContent className="max-h-60">
  {editCategories.length > 0 && (
    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50 mb-1">
      Recommended Categories
    </div>
  )}
  {editCategories.map((category) => (
    <SelectItem key={category} value={category} className="py-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
        {category}
      </div>
    </SelectItem>
  ))}
  {/* <div className="border-t border-border/50 mt-1 pt-1">
    <SelectItem value="add-new" className="text-primary font-medium py-2">
      <div className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Create New Category
      </div>
    </SelectItem>
  </div> */}
</SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="targetedSubreddit">Targeted Subreddit</Label>
                      <Input
                        id="targetedSubreddit"
                        value={editFormData.targetedSubreddit}
                        onChange={(e) => handleEditInputChange("targetedSubreddit", e.target.value)}
                        placeholder="Enter the Targeted Subreddit"
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="postURL" className="text-sm font-medium mb-2 block">Post URL</Label>
                    <Input
                      id="postURL"
                      value={editFormData.postURL}
                      onChange={(e) => handleEditInputChange("postURL", e.target.value)}
                      placeholder="Enter the Reddit Post URL"
                      className="h-10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="redditUsername" className="text-sm font-medium mb-2 block">Reddit Username</Label>
                    <Input
                      id="redditUsername"
                      value={editFormData.redditUsername}
                      onChange={(e) => handleEditInputChange("redditUsername", e.target.value)}
                      placeholder="Enter the Reddit Username"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-title">Title *</Label>
                    <Input
                      id="edit-title"
                      value={editFormData.title}
                      onChange={(e) => handleEditInputChange("title", e.target.value)}
                      placeholder="Enter the post title"
                    />
                  </div>



                  {/* Content */}
                  <div>
                    <Label htmlFor="edit-engagementText">Engagement Text</Label>
                    <Textarea
                      id="edit-engagementText"
                      value={editFormData.engagementText}
                      onChange={(e) => handleEditInputChange("engagementText", e.target.value)}
                      placeholder="Original engagement text for the post"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientFeedback" className="text-sm font-medium mb-2 block">Customer Comments</Label>
                    <Textarea
                      id="clientFeedback"
                      value={editFormData.clientFeedback}
                      onChange={(e) => handleEditInputChange("clientFeedback", e.target.value)}
                      placeholder="Enter your feedback for this Reddit Comment..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Tracking Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-datePosted">Date Posted</Label>
                      <Input
                        id="edit-datePosted"
                        type="date"
                        value={editFormData.datePosted}
                        onChange={(e) => handleEditInputChange("datePosted", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="edit-status">Client Approval Status</Label>
                      <Select
                        value={editFormData.status}
                        onValueChange={(value) => handleEditInputChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="notApproved">Not Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-postedLink">Comment URL</Label>
                      <Input
                        id="edit-postedLink"
                        type="url"
                      value={editFormData.postedLink}
                      onChange={(e) => handleEditInputChange("postedLink", e.target.value)}
                      placeholder="Direct link to the posted content"
                    />
                  </div>
                    <div>
                      <Label htmlFor="totalViews">Total Views</Label>
                      <Input
                        id="totalViews"
                        value={editFormData.totalViews}
                        onChange={(e) =>
                          handleEditInputChange("totalViews", e.target.value)
                        }
                        placeholder="Number of Total Views"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-postedCommentStatus">
                        Posted Comment Status
                      </Label>
                      <Select
                        value={editFormData.postedCommentStatus}
                        onValueChange={(value) => handleEditInputChange("postedCommentStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commentUnderApproval">Comment Under Approval</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="removed">Removed </SelectItem>
                          <SelectItem value="reposted">Reposted</SelectItem>
                          <SelectItem value="notPosted">Not Posted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-6">
                    <Button type="button" variant="outline" onClick={closeEditModal}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Save className="h-4 w-4 mr-2" />
                      Update Post
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Delete Comment</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Are you sure you want to delete this Comment?
                </p>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium text-foreground truncate">
                    {deleteConfirmation.post?.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={closeDeleteConfirmation}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="min-w-[100px]"
                >
                  {isDeleting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
