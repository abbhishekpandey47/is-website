"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

import { ExternalLink, Plus, Search, Download, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "react-toastify";

import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import Pagination from "./components/pagination";
import { StatusCard } from "@/Components/StatusCard";
import { UserProfile } from "@/Components/UserProfile";
import { HoverTextCell } from "./components/HoverTextCell";
import { getStatusBadge, getTypeBadge } from "../../utils/statusBadge";

const PAGE_SIZE = 10;

const PostsPage = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const [allItems, setAllItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);

      if (!user) {
        router.push("/auth/signin");
      } else {
        const fetchData = async () => {
          try {
            const token = await user.getIdToken();
            const { items } = await fetchThreadflowData(token);
            setAllItems(items);
          } catch (err) {
            console.error("Failed to fetch:", err);
          }
        };

        fetchData();
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedCategory, selectedStatus, dateRange]);

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
  const statuses = useMemo(() => {
    const normalizedMap = new Map();
    const addStatus = (statusValue) => {
      if (!statusValue) return;
      const normalized = String(statusValue).toLowerCase();
      if (!normalizedMap.has(normalized)) {
        normalizedMap.set(normalized, statusValue);
      }
    };

    allItems.forEach((item) => {
      addStatus(item.status);
      addStatus(item.posted_comment_status);
    });

    return ["all", ...normalizedMap.values()];
  }, [allItems]);

  const formatStatusLabel = (status) => {
    if (status === "all") return "All Status";
    if (status === null || status === undefined) return "";
    const lookup = {
      postunderapproval: "Post Under Approval",
      commentunderapproval: "Comment Under Approval",
      notposted: "Not Posted",
      undermoderation: "Under Moderation",
      notapproved: "Not Approved",
    };
    const key = String(status).toLowerCase();
    if (lookup[key]) return lookup[key];

    const spaced = String(status)
      .replace(/[-_]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2");

    return spaced
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const matchesDateRange = (item, range) => {
    const [start, end] = range || [];
    if (!start || !end) return true;

    const startMs = start.startOf("day").valueOf();
    const endMs = end.endOf("day").valueOf();
    const itemMs = item?.date_posted ? dayjs(item.date_posted).valueOf() : NaN;

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
    const matchesStatus = (() => {
      if (selectedStatus === "all") return true;
      const normalizedSelected = selectedStatus?.toLowerCase();
      return (
        item.status?.toLowerCase() === normalizedSelected ||
        item.posted_comment_status?.toLowerCase() === normalizedSelected
      );
    })();
    const matchesType =
      selectedType === "all" || item.type === selectedType;

    const matchesDate = matchesDateRange(item, dateRange);

    return matchesSearch && matchesCategory && matchesStatus && matchesType && matchesDate;
  });

  const getStatusCounts = () => {
    let itemsToCount = filteredItems;

    if (selectedType !== "all") {
      itemsToCount = itemsToCount.filter((item) => item.type === selectedType);
    }

    return itemsToCount.reduce(
      (acc, item) => {
        const normalized = sharedNormalizeStatus(item);
        if (normalized === "Live") acc.live++;
        else if (normalized === "Removed") acc.removed++;
        else if (normalized === "Under Approval") acc.underApproval++;
        else if (normalized === "Pending") acc.notPosted++;

        return acc;
      },
      { removed: 0, underApproval: 0, notPosted: 0, live: 0 }
    );
  };
  const statusCnt = getStatusCounts();

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "date_posted" || sortField.includes("date")) {
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    } else if (sortField === "total_views") {
      aValue = aValue ?? 0;
      bValue = bValue ?? 0;
    } else {
      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";
      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const SortableHeader = ({ field, children }) => {
    const isActive = sortField === field;
    return (
      <TableHead
        className="cursor-pointer select-none hover:bg-[rgba(255,255,255,0.02)] text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          {children}
          {isActive ? (
            sortDirection === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-40" />
          )}
        </div>
      </TableHead>
    );
  };

  const [exporting, setExporting] = useState(false);

  const handleExport = async (format) => {
    if (filteredItems.length === 0) {
      toast.error("No data to export. Please adjust your filters.");
      return;
    }

    if (filteredItems.length > 10000) {
      toast.error(`Export limit exceeded. Maximum 10,000 rows allowed. Please narrow your filters. (Current: ${filteredItems.length} rows)`);
      return;
    }

    const hasStartDate = dateRange?.[0] !== null && dateRange?.[0] !== undefined;
    const hasEndDate = dateRange?.[1] !== null && dateRange?.[1] !== undefined;

    if ((hasStartDate && !hasEndDate) || (!hasStartDate && hasEndDate)) {
      toast.error("Please select both start and end date, or clear the date range.");
      return;
    }

    if (hasStartDate && hasEndDate) {
      const startDate = dateRange[0];
      const endDate = dateRange[1];
      if (startDate.isAfter(endDate)) {
        toast.error("Start date cannot be after end date.");
        return;
      }
    }

    setExporting(true);
    try {
      const token = await firebaseUser.getIdToken();

      const params = new URLSearchParams({
        format,
        ...(selectedType && selectedType !== "all" ? { type: selectedType } : {}),
        category: selectedCategory === "all" ? "" : (selectedCategory || ""),
        status: selectedStatus === "all" ? "" : (selectedStatus || ""),
        search: searchQuery || "",
      });

      if (hasStartDate && hasEndDate) {
        params.append("startDate", dateRange[0].format("YYYY-MM-DD"));
        params.append("endDate", dateRange[1].format("YYYY-MM-DD"));
      }

      const finalUrl = `/api/engagement/export?${params.toString()}`;

      const response = await fetch(finalUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Export failed" }));
        throw new Error(error.error || `Export failed: ${response.statusText}`);
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `engagement-export-${new Date().toISOString().split("T")[0]}.${format}`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

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

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse h-5 w-48 bg-[rgba(255,255,255,0.04)] rounded" />
        <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded" />
        <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded" />
      </div>
    );
  }

  if (!firebaseUser) {
    return <div className="p-6 text-[rgba(255,255,255,0.4)]">Please log in to view your posts and comments.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div>
              <h1 className="text-[16px] font-semibold text-[#ededed] tracking-[-0.01em]">
                Reddit Engagement Tracker
              </h1>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)]">
                Manage community discussions and workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#ededed] hover:bg-white text-[#0a0a0a] text-[13px] font-medium h-8 px-3 rounded-[7px]">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <DropdownMenuItem onClick={() => router.push("/threadflow/posts/add")} className="text-[13px] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)]">
                  Add Post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/threadflow/comment/add")} className="text-[13px] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)]">
                  Add Comment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 animate-fade-up">
          <StatusCard status="live" count={statusCnt.live} label="Live" />
          <StatusCard status="notPosted" count={statusCnt.notPosted} label="Not Posted" />
          <StatusCard status="underApproval" count={statusCnt.underApproval} label="Under Approval" />
          <StatusCard status="removed" count={statusCnt.removed} label="Removed" />
        </div>

        {/* Filters */}
        <div className="mb-6 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] animate-fade-up-delay-1">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)] h-3.5 w-3.5" />
              <Input
                placeholder="Search posts, comments, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] placeholder:text-[rgba(255,255,255,0.25)] focus:border-[rgba(255,255,255,0.12)] rounded-[7px]"
              />
            </div>

            {/* Date Range */}
            <RangePicker
              value={dateRange}
              className="dark-range-picker"
              popupClassName="dark-range-picker-dropdown"
              onChange={(vals) => setDateRange(vals || [null, null])}
              allowClear
              format="YYYY-MM-DD"
              presets={[
                { label: "Today", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
                { label: "Last 7 Days", value: [dayjs().subtract(6, "day").startOf("day"), dayjs().endOf("day")] },
                { label: "Last 30 Days", value: [dayjs().subtract(29, "day").startOf("day"), dayjs().endOf("day")] },
                { label: "This Month", value: [dayjs().startOf("month"), dayjs().endOf("month")] },
                { label: "Last Month", value: [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")] },
              ]}
            />

            {/* Export */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  disabled={exporting || filteredItems.length === 0}
                  className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#ededed] hover:border-[rgba(255,255,255,0.12)] rounded-[7px]"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  {exporting ? "Exporting..." : "Export"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#141414] border-[rgba(255,255,255,0.08)]">
                <DropdownMenuItem onClick={() => handleExport("csv")} disabled={exporting} className="text-[13px]">
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("xlsx")} disabled={exporting} className="text-[13px]">
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Second row of filters */}
          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-36 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] rounded-[7px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)]">
                <SelectItem value="all" className="text-[13px]">All Types</SelectItem>
                <SelectItem value="post" className="text-[13px]">Posts</SelectItem>
                <SelectItem value="comment" className="text-[13px]">Comments</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] rounded-[7px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)]">
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="text-[13px]">
                    {formatStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-44 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] rounded-[7px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)]">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-[13px]">
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] overflow-hidden animate-fade-up-delay-2">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.04)]">
            <h2 className="text-[14px] font-medium text-[#ededed]">
              {selectedType === "post"
                ? `My Posts`
                : selectedType === "comment"
                ? `My Comments`
                : `My Content`}
              <span className="ml-2 text-[rgba(255,255,255,0.4)]" style={{ fontVariantNumeric: "tabular-nums" }}>{filteredItems.length}</span>
              {dateRange?.[0] && dateRange?.[1] && (
                <span className="ml-2 text-[12px] text-[rgba(255,255,255,0.25)]">
                  {dateRange[0].format("YYYY-MM-DD")} to {dateRange[1].format("YYYY-MM-DD")}
                </span>
              )}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(255,255,255,0.04)] hover:bg-transparent">
                  {selectedType === "all" && <SortableHeader field="type">Type</SortableHeader>}
                  <SortableHeader field="category">Category</SortableHeader>

                  {selectedType === "post" && (
                    <>
                      <SortableHeader field="title">Title</SortableHeader>
                      <SortableHeader field="current_status">Approval</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Engagement</TableHead>
                      <SortableHeader field="date_posted">Date</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Comments</TableHead>
                      <SortableHeader field="status">Status</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Link</TableHead>
                      <SortableHeader field="total_views">Views</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Engagements</TableHead>
                      <SortableHeader field="reddit_username">Username</SortableHeader>
                    </>
                  )}

                  {selectedType === "comment" && (
                    <>
                      <SortableHeader field="targeted_subreddit">Subreddit</SortableHeader>
                      <SortableHeader field="title">Title</SortableHeader>
                      <SortableHeader field="status">Approval</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Engagement</TableHead>
                      <SortableHeader field="date_posted">Date</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Comments</TableHead>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Link</TableHead>
                      <SortableHeader field="total_views">Views</SortableHeader>
                      <SortableHeader field="reddit_username">Username</SortableHeader>
                      <SortableHeader field="posted_comment_status">Status</SortableHeader>
                    </>
                  )}

                  {selectedType === "all" && (
                    <>
                      <SortableHeader field="title">Title</SortableHeader>
                      <SortableHeader field="status">Status</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Engagement</TableHead>
                      <SortableHeader field="date_posted">Date</SortableHeader>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Comments</TableHead>
                      <TableHead className="text-[11px] font-medium uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)]">Link</TableHead>
                      <SortableHeader field="total_views">Views</SortableHeader>
                      <SortableHeader field="targeted_subreddit">Subreddit</SortableHeader>
                      <SortableHeader field="reddit_username">Username</SortableHeader>
                    </>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={20} className="text-center py-12 text-[rgba(255,255,255,0.25)] text-[13px]">
                      No content found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item, index) => (
                    <TableRow key={`${item.type}-${item.id}-${index}`} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100">
                      {selectedType === "all" && (
                        <TableCell>{getTypeBadge(item.type)}</TableCell>
                      )}

                      <TableCell>
                        <span className="text-[12px] text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.08)] rounded-md px-2 py-0.5 whitespace-nowrap">
                          {item.category || "--"}
                        </span>
                      </TableCell>

                      {selectedType === "post" && (
                        <>
                          <TableCell className="font-medium max-w-xs">
                            <HoverTextCell text={item.title} isTitle />
                          </TableCell>
                          <TableCell>{getStatusBadge(item.current_status)}</TableCell>
                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.engagement_text} isTextEngagement />
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)] whitespace-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>
                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            {item.posted_link ? (
                              <a
                                href={item.posted_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[13px] text-[#60a5fa] hover:text-[#93bbfc] transition-colors"
                              >
                                View <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-[rgba(255,255,255,0.25)]">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {item.total_views ?? "-"}
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.25)]">-</TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]">{item.reddit_username || "-"}</TableCell>
                        </>
                      )}

                      {selectedType === "comment" && (
                        <>
                          <TableCell className="text-[13px] text-[#60a5fa] max-w-sm">
                            {item.targeted_subreddit || "-"}
                          </TableCell>
                          <TableCell className="font-medium max-w-xs">
                            <HoverTextCell text={item.title} isTitle />
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.engagement_text} isTextEngagement />
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)] whitespace-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>
                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>
                          <TableCell>
                            {item.posted_link ? (
                              <a href={item.posted_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-[#60a5fa] hover:text-[#93bbfc] transition-colors">
                                View <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-[rgba(255,255,255,0.25)]">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {item.total_views ?? "-"}
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]">{item.reddit_username || "-"}</TableCell>
                          <TableCell>{getStatusBadge(item.posted_comment_status)}</TableCell>
                        </>
                      )}

                      {selectedType === "all" && (
                        <>
                          <TableCell className="font-medium max-w-xs">
                            <HoverTextCell text={item.title} isTitle />
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(item.type === "post" ? item.status : item.posted_comment_status)}
                          </TableCell>
                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.engagement_text} isTextEngagement />
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)] whitespace-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {item.date_posted ? new Date(item.date_posted).toLocaleDateString() : "-"}
                          </TableCell>
                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>
                          <TableCell>
                            {item.posted_link ? (
                              <a href={item.posted_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-[#60a5fa] hover:text-[#93bbfc] transition-colors">
                                View <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-[rgba(255,255,255,0.25)]">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {item.total_views ?? "-"}
                          </TableCell>
                          <TableCell className="text-[13px] text-[#60a5fa]">
                            {item.targeted_subreddit || "-"}
                          </TableCell>
                          <TableCell className="text-[13px] text-[rgba(255,255,255,0.6)]">
                            {item.reddit_username || "-"}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
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
