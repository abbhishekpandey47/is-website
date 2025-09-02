"use client";
import { useEffect, useState } from "react";
import { Badge } from "../../../Components/ui/badge";
import { Button } from "../../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../Components/ui/card";
import { Input } from "../../../Components/ui/input";
import { Label } from "../../../Components/ui/label";
import { Textarea } from "../../../Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { UserProfile } from "../../../Components/UserProfile";
import { useRouter } from "next/navigation";
import { Plus, Search, ExternalLink, Edit, Trash2, Save, X } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { toast } from "react-toastify";

const PostsPage = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Edit modal 
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    category: "",
    title: "",
    url: "",
    status: "pending",
    engagementText: "",
    kimsVersion: "",
    datePosted: "",
    postedLink: "",
    currentStatus: "pending",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, post: null });

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

  // Edit 
  const openEditModal = (post) => {
    setEditingPost(post);
    setEditFormData({
      category: post.category || "",
      title: post.title || "",
      url: post.url || "",
      status: post.status || "pending",
      engagementText: post.engagement_text || "",
      kimsVersion: post.kims_version || "",
      datePosted: post.date_posted ? new Date(post.date_posted).toISOString().split('T')[0] : "",
      postedLink: post.posted_link || "",
      currentStatus: post.current_status || "pending",
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
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.category || !editFormData.title || !editFormData.url) {
      toast.error("Please fill in category, title, and URL fields.");
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPost.id,
          category: editFormData.category,
          title: editFormData.title,
          url: editFormData.url,
          status: editFormData.status,
          engagement_text: editFormData.engagementText,
          kims_version: editFormData.kimsVersion,
          date_posted: editFormData.datePosted ? new Date(editFormData.datePosted) : null,
          posted_link: editFormData.postedLink,
          current_status: editFormData.currentStatus,
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

      toast.success("Post updated successfully!");
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
      const res = await fetch(`/api/posts?id=${postId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete post");
      }

      // Remove the post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
      closeDeleteConfirmation();
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error(err.message);
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
    return <div className="p-6">Please log in to view your posts.</div>;
  }

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
              onClick={() => router.push("/threadflow/posts/add")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Post
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
                    <TableHead>Status</TableHead>
                    <TableHead>Text of engagement</TableHead>
                    <TableHead>Date published</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>Published Link</TableHead>
                    <TableHead>Number of our engagements</TableHead>
                    <TableHead>Link to Kubiya</TableHead>
                    <TableHead>ID used</TableHead>
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
                          {post.engagement_text}
                        </div>
                      </TableCell>
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
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>{post.id}</TableCell>
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
                        <SelectContent>
                          <SelectItem value="Drift Detection">Drift Detection</SelectItem>
                          <SelectItem value="IaC">IaC</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="AWS">AWS</SelectItem>
                          <SelectItem value="Enterprise AI">Enterprise AI</SelectItem>
                          <SelectItem value="AI Workflow">AI Workflow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        value={editFormData.status}
                        onValueChange={(value) => handleEditInputChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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

                  <div>
                    <Label htmlFor="edit-url">URL *</Label>
                    <Input
                      id="edit-url"
                      type="url"
                      value={editFormData.url}
                      onChange={(e) => handleEditInputChange("url", e.target.value)}
                      placeholder="https://www.reddit.com/r/..."
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
                      <Label htmlFor="edit-currentStatus">Current Status</Label>
                      <Select
                        value={editFormData.currentStatus}
                        onValueChange={(value) => handleEditInputChange("currentStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="edit-postedLink">Posted Link</Label>
                    <Input
                      id="edit-postedLink"
                      type="url"
                      value={editFormData.postedLink}
                      onChange={(e) => handleEditInputChange("postedLink", e.target.value)}
                      placeholder="Direct link to the posted content"
                    />
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
                  <h3 className="text-lg font-semibold text-foreground">Delete Post</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Are you sure you want to delete this post?
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