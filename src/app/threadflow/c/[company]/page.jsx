"use client";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { BarChart3, ExternalLink, Plus, Search ,Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StatusCard } from "@/Components/StatusCard";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { SidebarTrigger } from "../../../../Components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { UserProfile } from "@/Components/UserProfile";
import { HoverTextCell } from "../../components/HoverTextCell";
import Pagination from "./components/pagination";
import dayjs from "dayjs";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const PAGE_SIZE = 10;
const PostsPage = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allItems, setAllItems] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setFirebaseUser(user);
      setLoading(false);

      if (!user) {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // useEffect(() => {
  //   if (!firebaseUser) return;
  //   console.log("Fetching posts and comments for user:", firebaseUser.uid);

  //   const fetchPosts = async () => {
  //     try {
  //   const token = await firebaseUser.getIdToken();
  //   const res = await fetch(`/api/posts`, { headers: { Authorization: `Bearer ${token}` } });
  //       const result = await res.json();

  //       if (!res.ok) {
  //         throw new Error(result.error || "Failed to fetch posts");
  //       }

  //       setPosts(result.data || []);
  //     } catch (err) {
  //       console.error("Error fetching posts:", err);
  //       toast.error("Failed to load posts");
  //     }
  //   };

  // const fetchComments = async () => {
  //     try {
  //   const token = await firebaseUser.getIdToken();
  //   const res = await fetch(`/api/comment`, { headers: { Authorization: `Bearer ${token}` } });
  //       const result = await res.json();

  //       if (!res.ok) {
  //         throw new Error(result.error || "Failed to fetch comments");
  //       }

  //       setComments(result.data || []);
  //     } catch (err) {
  //       console.error("Error fetching comments:", err);
  //       toast.error("Failed to load comments");
  //     }
  //   };

  //   fetchPosts();
  //   fetchComments();
  // }, [currentPage ,firebaseUser]);

    // useEffect(() => {
    //   if (!firebaseUser) return;
  
    //   const fetchData = async () => {
    //     try {
    //       const token = await firebaseUser.getIdToken();
  
    //       const halfPage = Math.floor(PAGE_SIZE / 2);
  
    //       const [postRes, commentRes] = await Promise.all([
    //         fetch(`/api/posts?page=${currentPage}&limit=${halfPage}`, {
    //           headers: { Authorization: `Bearer ${token}` },
    //         }),
    //         fetch(`/api/comment?page=${currentPage}&limit=${halfPage}`, {
    //           headers: { Authorization: `Bearer ${token}` },
    //         }),
    //       ]);
  
    //       const [postData, commentData] = await Promise.all([postRes.json(), commentRes.json()]);
  
    //       if (!postRes.ok) throw new Error(postData.error || "Failed to fetch posts");
    //       if (!commentRes.ok) throw new Error(commentData.error || "Failed to fetch comments");
  
    //       setPosts(postData.data || []);
    //       setComments(commentData.data || []);
    //       setTotalCount((postData.totalCount || 0) + (commentData.totalCount || 0));
    //     } catch (err) {
    //       console.error(err);
    //       toast.error("Failed to load data");
    //     }
    //   };
  
    //   fetchData();
    // }, [firebaseUser, currentPage]);

    useEffect(() => {
    if (!firebaseUser) return;

    const fetchData = async () => {
      try {
        const token = await firebaseUser.getIdToken();

        const res = await fetch(`/api/allContent`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to fetch content");

        // Combined data already sorted by date in backend
        setAllItems(result.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [firebaseUser]);

useEffect(() => {
  setCurrentPage(1); // reset to first page whenever filters or search change
}, [searchQuery, selectedType, selectedCategory,dateRange]);
    
  const categories = ["all", ...new Set(allItems.map((item) => item.category).filter(Boolean))];
  const statuses = ["all", ...new Set(allItems.map((item) => item.status).filter(Boolean))];
  
  // Date range filter (inclusive)
  const matchesDateRange = (item, range) => {
    const [start, end] = range || [];
    if (!start || !end) return true; // no filter active

    const startMs = start.startOf("day").valueOf();
    const endMs = end.endOf("day").valueOf();

    // Accept common date formats (ISO string, ms number, Date)
    const itemMs = item?.date_posted ? dayjs(item.date_posted).valueOf() : NaN;

    // If invalid/missing date and range is set => exclude
    if (!Number.isFinite(itemMs)) return false;

    return itemMs >= startMs && itemMs <= endMs;
  };

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
    const matchesDate = matchesDateRange(item, dateRange);

    return matchesSearch && matchesCategory && matchesStatus && matchesType && matchesDate;
  });

// Pagination logic
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

const getStatusCounts = () => {
  let itemsToCount = filteredItems;

  // Filter if a specific type is selected
  if (selectedType !== "all") {
    itemsToCount = itemsToCount.filter(item => item.type === selectedType);
  }

  return itemsToCount.reduce(
    (acc, item) => {
      let statusKey = null;

      if (item.type === "post") {
        const postStatus = item.status?.toLowerCase();
        if (postStatus === "live") statusKey = "live";
        else if (postStatus === "removed") statusKey = "removed";
        else if (postStatus === "postunderapproval") statusKey = "underApproval";
        else if (postStatus === "notposted") statusKey = "notPosted";
      } 
      
      if (item.type === "comment") {
        const commentStatus = item.posted_comment_status?.toLowerCase();
        if (commentStatus === "live") statusKey = "live";
        else if (commentStatus === "removed") statusKey = "removed";
        else if (commentStatus === "commentunderapproval") statusKey = "underApproval";
        else if (commentStatus === "notposted") statusKey = "notPosted";
      }

      if (statusKey) {
        acc[statusKey] = (acc[statusKey] || 0) + 1;
      }

      return acc;
    },
    { removed: 0, underApproval: 0, notPosted: 0, live: 0 }
  );
};
const statusCnt = getStatusCounts()
  const getStatusBadge = (status) => {
  const statusColors = {
    // Published Post Status
    commentunderapproval: "bg-blue-500 text-white",
    postunderapproval: "bg-blue-500 text-white",
    live: "bg-green-500 text-white",
    removed: "bg-red-500 text-white",
    undermoderation: "bg-yellow-500 text-black",

    // Post Approval Status
    approved: "bg-emerald-700 text-white",
    notapproved: "bg-red-600 text-white",
    pending: "bg-yellow-400 text-white",
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Export handler

  const handleExport = async (format) => {
    if (filteredItems.length === 0) {
      toast.error("No data to export. Please adjust your filters.");
      return;
    }

    if (filteredItems.length > 10000) {
      toast.error(`Export limit exceeded. Maximum 10,000 rows allowed. Please narrow your filters. (Current: ${filteredItems.length} rows)`);
      return;
    }

    setExporting(true);
    try {
      const token = await firebaseUser.getIdToken();
      
      // Build query parameters using the new API param names
      const params = new URLSearchParams({
        format,
        type: selectedType || "all",
        category: selectedCategory === "select" ? "" : (selectedCategory || ""),
        status: selectedStatus === "all" ? "" : (selectedStatus || ""),
        // companyId: selectedCompanyId === "select" ? "" : (selectedCompanyId === "all" ? "" : (selectedCompanyId || "")),
        search: searchQuery || "",
      });

      // Add date range if present (required for export)
      if (dateRange?.[0] && dateRange?.[1]) {
        params.append("startDate", dateRange[0].format("YYYY-MM-DD"));
        params.append("endDate", dateRange[1].format("YYYY-MM-DD"));
      } else {
        // Optional: show warning if no date range selected
        toast.warning("No date range selected. Export will include all dates.");
      }

      const response = await fetch(`/api/engagement/export?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Export failed" }));
        throw new Error(error.error || `Export failed: ${response.statusText}`);
      }

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `engagement-export-${new Date().toISOString().split("T")[0]}.${format}`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Get blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(`Export completed: ${filename}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error(error.message || "Failed to export data");
    } finally {
      setExporting(false);
    }
  };


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
          <StatusCard status="live" count={statusCnt.live} label="Live" />
          <StatusCard status="notPosted" count={statusCnt.notPosted} label="Not Posted" />
          <StatusCard status="underApproval" count={statusCnt.underApproval} label="Under Approval" />
          <StatusCard status="removed" count={statusCnt.removed} label="Removed" />
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
              {/* <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
              </Select> */}
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
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={exporting || filteredItems.length === 0}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {exporting ? "Exporting..." : "Export"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("csv")} disabled={exporting}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("xlsx")} disabled={exporting}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

                     
          </CardContent>
        </Card>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {selectedType === "post"
                            ? `My Posts (${filteredItems.length})`
                            : selectedType === "comment"
                            ? `My Comments (${filteredItems.length})`
                            : `My Content (${filteredItems.length})`}
                          {dateRange?.[0] && dateRange?.[1] &&
                            ` — ${dateRange[0].format("YYYY-MM-DD")} to ${dateRange[1].format("YYYY-MM-DD")}`}
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
                        <TableHead>Post Approval Status</TableHead>
                        <TableHead>Text of engagement</TableHead>
                        <TableHead>Date published</TableHead>
                        <TableHead>Customer Comments</TableHead>
                        <TableHead>Published Status</TableHead>
                        <TableHead>Published Link</TableHead>
                        <TableHead>Total Views</TableHead>
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
                        <TableHead>Total Views</TableHead>
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
                        <TableHead>Customer Comments</TableHead>
                        <TableHead>Published Link</TableHead>
                        <TableHead>Total Views</TableHead>
                        <TableHead>Targeted Subreddit</TableHead>
                        <TableHead>Reddit Username</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedItems.map((item, index) => (
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
                            <HoverTextCell text = {item.title} isTitle={true}/>
                          </TableCell>

                          {/* Status */}
                          <TableCell>{getStatusBadge(item.current_status, item.type)}</TableCell>

                          {/* Text of engagement */}
                          <TableCell className="max-w-sm">
                              <HoverTextCell text={item.engagement_text} isTextEngagement={true} />
                          </TableCell>

                          {/* Date published */}
                          <TableCell className="text-sm">
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>

                          {/* Customer Comments */}
                          <TableCell className="max-w-sm">
                              <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>

                          {/* Current Status */}
                          <TableCell className="text-sm">{getStatusBadge(item.status) || "-"}</TableCell>

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

                          {/* Total Views */}
                          <TableCell className="text-sm">{item.total_views ? item.total_views : "-"}</TableCell>

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
                             <HoverTextCell text={item.title} isTitle={true}/>
                          </TableCell>

                          {/* Comment Approval Status */}
                          {/* getStatusBadge(item.posted_comment_status, 'comment')} */}
                          <TableCell>{getStatusBadge(item.status, 'comment')}</TableCell>

                          {/* Text of engagement */}
                          <TableCell className="max-w-sm">
                            <HoverTextCell text ={item.engagement_text} isTextEngagement={true}/>
                          </TableCell>

                          {/* Date published */}
                          <TableCell className="text-sm">
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>

                          {/* Customer Comments */}
                          <TableCell className="max-w-sm">
                              <HoverTextCell text={item.client_feedback || "-"} />
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

                          {/* Total Views */}
                          <TableCell className="text-sm">{item.total_views ? item.total_views : "-"}</TableCell>

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
                            <HoverTextCell text={item.title} isTitle={true} />
                          </TableCell>

                          {/* Status */}
                          <TableCell>{getStatusBadge(item.type === "post" ? item.status : item.posted_comment_status)}</TableCell>

                          {/* Text of Engagement */}
                          <TableCell>
                            <HoverTextCell text={item.engagement_text} isTextEngagement={true} />
                          </TableCell>

                          {/* Date Published */}
                          <TableCell className="text-sm">
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>

                          {/* Customer Comments */}
                          <TableCell className="max-w-sm">
                              <HoverTextCell text={item.client_feedback || "-"} />
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

                          {/* Total Views */}
                          <TableCell className="text-sm">{item.total_views ? item.total_views : "-"}</TableCell>


                          {/* Targeted Subreddit */}
<TableCell>
  {item.targeted_subreddit || "-"}
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
        <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
    </div>
  );
};

export default PostsPage;
