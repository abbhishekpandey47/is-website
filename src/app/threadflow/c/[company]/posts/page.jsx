"use client";
import { auth } from "@/lib/firebaseClient";
import { cn } from "@/lib/utils";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { onAuthStateChanged } from "firebase/auth";
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Plus, Save, Search, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { UserProfile } from "@/Components/UserProfile";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";
import { cn } from "@/lib/utils";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { onAuthStateChanged } from "firebase/auth";
import { Edit, Plus, Save, Search, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { HoverTextCell } from "../components/HoverTextCell";
import Pagination from "../components/pagination";
import { getStatusBadge } from "../../../utils/statusBadge";
const { RangePicker } = DatePicker;


const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return RQ;
  },
  { ssr: false }
);

function camelCaseToSentence(str){
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')   // add space before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
}

const PAGE_SIZE = 10;
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

  // Date range state
  const [dateRange, setDateRange] = useState([null, null]);

  // Sorting state
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

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
    clientFeedback: "",
    currentStatus: "pending",
    redditUsername: "",
    targetedSubreddit: "",
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
        const res = await fetch(`/api/posts`, { headers: { Authorization: `Bearer ${token}` } });
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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(false);

      if (!user) {
        router.push("/auth/signin");
      } else {
        try {
          const token = await user.getIdToken();
          const res = await fetch(`/api/posts?categories=true`, { headers: { Authorization: `Bearer ${token}` } });
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

  useEffect(() => {
    setCurrentPage(1); // reset to first page whenever filters or search change
  }, [searchQuery , selectedCategory , selectedStatus, dateRange]);

  const categories = ["all", ...new Set(posts.map((post) => post.category).filter(Boolean))];
  const statuses = useMemo(() => {
    const normalized = new Map();
    const addStatus = (value) => {
      if (!value) return;
      const key = String(value).toLowerCase();
      if (!normalized.has(key)) {
        normalized.set(key, value);
      }
    };

    posts.forEach((post) => {
      addStatus(post.status);
    });

    return ["all", ...normalized.values()];
  }, [posts]);

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
    const matchesStatus = (() => {
      if (selectedStatus === "all") return true;
      return post.status?.toLowerCase() === selectedStatus?.toLowerCase();
    })();
    const matchesDate = matchesDateRange(post, dateRange);

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

  // Handle column header click for sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and reset to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort filtered items
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Special handling for date fields
    if (sortField === "date_posted" || sortField.includes("date")) {
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    }
    // Special handling for numeric fields
    else if (sortField === "total_views") {
      aValue = aValue ?? 0;
      bValue = bValue ?? 0;
    }
    // Handle null/undefined values for strings
    else {
      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";

      // Convert to lowercase for case-insensitive sorting
      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();
    }

    // Compare values
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Helper component for sortable table headers
  const SortableHeader = ({ field, children }) => {
    const isActive = sortField === field;
    return (
      <TableHead
        className="cursor-pointer select-none text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium hover:text-[rgba(255,255,255,0.6)] transition-colors"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          {children}
          {isActive ? (
            sortDirection === "asc" ? (
              <ArrowUp className="h-3.5 w-3.5 text-[#ededed]" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-[#ededed]" />
            )
          ) : (
            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
          )}
        </div>
      </TableHead>
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const paginatedPosts = sortedPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  // Update current page when pagination changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      clientFeedback: post.client_feedback || "",
      redditUsername: post.reddit_username || "",
      targetedSubreddit: post.targeted_subreddit || "",
      totalViews: post.total_views || ""
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
      targetedSubreddit: "",
      totalViews: ""
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.category || !editFormData.title) {
      toast({
        title: "Error",
        description: "Please fill in category, title, and URL fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = await firebaseUser.getIdToken();
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          id: editingPost.id,
          category: editFormData.category,
          title: editFormData.title,
          url: editFormData.url,
          status: editFormData.status,
          engagement_text: editFormData.engagementText,
          kims_version: editFormData.kimsVersion,
          date_posted: editFormData.datePosted ? new Date(editFormData.datePosted) : null,
          client_feedback: editFormData.clientFeedback || null,
          posted_link: editFormData.postedLink,
          current_status: editFormData.currentStatus,
          reddit_username: editFormData.redditUsername,
          targeted_subreddit: editFormData.targetedSubreddit,
          total_views: editFormData.totalViews
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
        title: "Success",
        description: "Post updated successfully",
        variant: "default",
      });
      closeEditModal();
    } catch (err) {
      console.error("Error updating post:", err);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
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
      const res = await fetch(`/api/posts?id=${postId}`, {
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
      <div className="min-h-screen bg-[#0a0a0a] p-6 space-y-4 font-geist">
        <div className="animate-pulse h-6 w-48 bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
        <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
        <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
      </div>
    );
  }

  if (!firebaseUser) {
    return <div className="min-h-screen bg-[#0a0a0a] p-6 font-geist text-[#ededed]">Please log in to view your posts.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div>
              <h1 className="text-[16px] font-semibold text-[#ededed]">Reddit Posts Management</h1>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Manage all your Reddit content and engagement</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/threadflow/posts/add")}
              className="bg-[#ededed] text-[#0a0a0a] font-medium rounded-[7px] hover:bg-[#d4d4d4] text-[13px] h-9 px-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Post
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="p-6 animate-fade-up">
        {/* Filters */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] h-4 w-4" />
              <Input
                placeholder="Search posts, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:border-[rgba(255,255,255,0.12)] focus:ring-0"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>


            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">
                    {status === "all"
                      ? "All Status"
                      : camelCaseToSentence(status)}
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
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] animate-fade-up-delay-1">
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <h2 className="text-[16px] font-semibold text-[#ededed]">
              My Posts ({filteredPosts.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(255,255,255,0.06)] hover:bg-transparent">
                  <SortableHeader field="category">Category</SortableHeader>
                  <SortableHeader field="targeted_subreddit">Targeted Subreddit</SortableHeader>
                  <SortableHeader field="title">Title</SortableHeader>
                  {/* <TableHead>URL</TableHead> */}
                  <SortableHeader field="current_status">Post Approval Status</SortableHeader>
                  <TableHead className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">Text of engagement</TableHead>
                  <SortableHeader field="date_posted">Date published</SortableHeader>
                  <TableHead className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">Customer Comments</TableHead>
                  <SortableHeader field="status">Published Status</SortableHeader>
                  <TableHead className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">Published Link</TableHead>
                  <SortableHeader field="total_views">Total Views</SortableHeader>
                  <TableHead className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">Number of our engagements</TableHead>
                  <SortableHeader field="reddit_username">Reddit Username</SortableHeader>
                  <TableHead className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPosts.map((post) => (
                  <TableRow key={post.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <TableCell>
                      <Badge variant="outline" className="whitespace-nowrap rounded-[20px] border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] text-[12px]">
                        {post.category}
                      </Badge>
                    </TableCell>
                     <TableCell>
                      <div className="text-[13px] text-[rgba(255,255,255,0.6)] line-clamp-3">
                        {post.targeted_subreddit}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs text-[13px] text-[#ededed]">
                       <HoverTextCell text={post.title} isTitle={true}/>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.current_status)}</TableCell>
                    <TableCell className="max-w-sm text-[13px]">
                      <HoverTextCell text={post.engagement_text} isTextEngagement={true} />
                    </TableCell>

                    <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]">
                      {post.date_posted ? new Date(post.date_posted).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]"> <HoverTextCell text={post.client_feedback}/></TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell>
                      <a
                        href={post.posted_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-[#60a5fa] hover:text-[#93bbfc]"
                      >
                        {post.posted_link ? "View Link" : "-"}
                      </a>
                    </TableCell>
                    <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]">{post.total_views ? post.total_views : "-"}</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]">{post.reddit_username}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(post)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-[7px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteConfirmation(post)}
                          disabled={isDeleting === post.id}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-[7px] text-[#f87171] hover:text-[#fca5a5] hover:bg-[rgba(248,113,113,0.08)] transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
          <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <h2 className="text-[16px] font-semibold text-[#ededed]">Edit Post</h2>
                <button
                  onClick={closeEditModal}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-[7px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-category" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Category *</Label>
                      <Select
                        value={editFormData.category}
                        onValueChange={(value) => handleEditInputChange("category", value)}
                      >
                        <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                          {editCategories.length > 0 && (
                            <div className="px-2 py-1.5 text-[11px] font-medium text-[rgba(255,255,255,0.25)] border-b border-[rgba(255,255,255,0.06)] mb-1 uppercase tracking-[0.06em]">
                              Recommended Categories
                            </div>
                          )}
                          {editCategories.map((category) => (
                            <SelectItem key={category} value={category} className="py-2 text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#34d399]/60 rounded-full"></div>
                                {category}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="targetedSubreddit" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Targeted Subreddit</Label>
                      <Input
                        id="targetedSubreddit"
                        value={editFormData.targetedSubreddit}
                        onChange={(e) => handleEditInputChange("targetedSubreddit", e.target.value)}
                        placeholder="Enter the Targeted Subreddit"
                        className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="redditUsername" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Reddit Username</Label>
                    <Input
                      id="redditUsername"
                      value={editFormData.redditUsername}
                      onChange={(e) => handleEditInputChange("redditUsername", e.target.value)}
                      placeholder="Enter the Reddit Username"
                      className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-title" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Title *</Label>
                    <Input
                      id="edit-title"
                      value={editFormData.title}
                      onChange={(e) => handleEditInputChange("title", e.target.value)}
                      placeholder="Enter the post title"
                      className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <Label
                      htmlFor="engagementText"
                      className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block"
                    >
                      Body Text
                    </Label>
                    <div
                      className={cn(
                        "flex w-full rounded-[7px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] shadow-sm transition-colors",
                        "focus-within:outline-none focus-within:border-[rgba(255,255,255,0.12)]"
                      )}
                    >
                      <ReactQuill
                        id="engagementText"
                        value={editFormData.engagementText}
                        onChange={(content) => handleEditInputChange("engagementText", content)}
                        placeholder="Enter your Body Text or comment for this Reddit post..."
                        modules={{
                          toolbar: [
                            ["bold", "italic", "underline"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link"],
                          ],
                        }}
                        className={cn(
                          "w-full",
                          "[&_.ql-toolbar]:!border-none [&_.ql-container]:!border-none",
                          "[&_.ql-toolbar]:bg-transparent [&_.ql-container]:bg-transparent",
                          "[&_.ql-editor]:min-h-[120px] [&_.ql-editor]:pt-2 [&_.ql-editor]:px-3",
                          "[&_.ql-editor]:text-[13px] [&_.ql-editor]:text-[#ededed]",
                          "[&_.ql-editor.ql-blank::before]:text-[rgba(255,255,255,0.25)]",
                          "[&_.ql-toolbar_button]:text-[rgba(255,255,255,0.4)] [&_.ql-toolbar_button:hover]:text-[#ededed]",
                          "[&_.ql-tooltip]:!bg-[#141414] [&_.ql-tooltip]:!text-[#ededed] [&_.ql-tooltip]:!border [&_.ql-tooltip]:!border-[rgba(255,255,255,0.08)]",
                          "[&_.ql-tooltip_input]:!bg-[rgba(255,255,255,0.02)] [&_.ql-tooltip_input]:!text-[#ededed] [&_.ql-tooltip_input]:!placeholder-[rgba(255,255,255,0.25)] [&_.ql-tooltip_input]:!border [&_.ql-tooltip_input]:!border-[rgba(255,255,255,0.06)]",
                          "[&_.ql-tooltip] button:!text-[#ededed] [&_.ql-tooltip] button:hover:!text-[#60a5fa]"
                        )}
                      />
                    </div>
                    <p className="text-[11px] text-[rgba(255,255,255,0.25)] mt-1.5">
                      This will be your response or engagement with the Reddit post
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="clientFeedback"
                      className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block"
                    >
                      Customer Comments
                    </Label>
                    <Textarea
                      id="clientFeedback"
                      value={editFormData.clientFeedback}
                      onChange={(e) => handleEditInputChange("clientFeedback", e.target.value)}
                      placeholder="Enter your feedback for this Reddit Comment..."
                      rows={4}
                      className="resize-none text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                    />
                  </div>

                  {/* Tracking Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-datePosted" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Date Posted</Label>
                      <Input
                        id="edit-datePosted"
                        type="date"
                        value={editFormData.datePosted}
                        onChange={(e) => handleEditInputChange("datePosted", e.target.value)}
                        className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentStatus" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Post Approval Status</Label>
                      <Select value={editFormData.currentStatus} onValueChange={(value) => handleEditInputChange("currentStatus", value)}>
                        <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                          <SelectItem value="approved" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Approved</SelectItem>
                          <SelectItem value="notApproved" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Not Approved</SelectItem>
                          <SelectItem value="pending" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <Label htmlFor="edit-postedLink" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Posted Link</Label>
                      <Input
                        id="edit-postedLink"
                        type="url"
                        value={editFormData.postedLink}
                        onChange={(e) => handleEditInputChange("postedLink", e.target.value)}
                        placeholder="Direct link to the posted content"
                        className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                      />
                    </div>
                     <div>
                      <Label htmlFor="totalViews" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Total Views</Label>
                      <Input
                        id="totalViews"
                        value={editFormData.totalViews}
                        onChange={(e) => handleEditInputChange("totalViews", e.target.value)}
                        placeholder="Number of Total Views"
                        className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Published Post Status</Label>
                      <Select value={editFormData.status} onValueChange={(value) => handleEditInputChange("status", value)}>
                        <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                          <SelectItem value="postUnderApproval" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Post Under Approval</SelectItem>
                          <SelectItem value="live" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Live</SelectItem>
                          <SelectItem value="removed" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Removed</SelectItem>
                           <SelectItem value="reposted" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Reposted</SelectItem>
                          <SelectItem value="notPosted" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Not Posted</SelectItem>
                        </SelectContent>
                      </Select>

                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="h-9 px-4 text-[13px] font-medium rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="h-9 px-4 text-[13px] font-medium rounded-[7px] bg-[#ededed] text-[#0a0a0a] hover:bg-[#d4d4d4] transition-colors inline-flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Update Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[rgba(248,113,113,0.08)] rounded-full flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-[#f87171]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#ededed]">Delete Post</h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.4)] mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[13px] text-[rgba(255,255,255,0.6)] mb-2">
                  Are you sure you want to delete this post?
                </p>
                <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[7px]">
                  <p className="text-[13px] font-medium text-[#ededed] truncate">
                    {deleteConfirmation.post?.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={closeDeleteConfirmation}
                  disabled={isDeleting}
                  className="h-9 px-4 text-[13px] font-medium rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.06)] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-9 px-4 min-w-[100px] text-[13px] font-medium rounded-[7px] bg-[#f87171] text-white hover:bg-[#ef4444] transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
