"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import dayjs from "dayjs";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import { BarChart3, ExternalLink, Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

import { SidebarTrigger } from "../../Components/ui/sidebar";
import { Button } from "../../Components/ui/button";
import { Badge } from "../../Components/ui/badge";
import { Input } from "../../Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";

import Pagination from "./components/pagination";
import { StatusCard } from "../../Components/StatusCard";
import { UserProfile } from "../../Components/UserProfile";
import { HoverTextCell } from "./components/HoverTextCell";

const PAGE_SIZE = 10;

const PostsPage = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("select");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCompanyId, setSelectedCompanyId] = useState("select");

  const [allItems, setAllItems] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  // NEW: date range (dayjs objects or null)
  const [dateRange, setDateRange] = useState([null, null]);

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

            const [catRes, companyRes] = await Promise.allSettled([
              fetch(`/api/allContent`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(`/api/companies`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);

            if (catRes.status === "fulfilled" && catRes.value.ok) {
              const result = await catRes.value.json();
              if (result) setAllItems(result.data || []);
            } else if (catRes.status === "rejected") {
              console.error("Failed to fetch categories:", catRes.reason);
            }

            if (companyRes.status === "fulfilled" && companyRes.value.ok) {
              const result = await companyRes.value.json();
              const list = Array.isArray(result.data) ? result.data : [];
              setCompaniesList(list);
            } else if (companyRes.status === "rejected") {
              console.error("Failed to fetch companies:", companyRes.reason);
            }
          } catch (err) {
            console.error("Failed to fetch:", err);
          }
        };

        fetchData();
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Reset to page 1 whenever filters/search/date change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedType,
    selectedCategory,
    selectedCompanyId,
    selectedStatus,
    dateRange,
  ]);

  const companies = [
    { id: "select", name: "Select Company" },
    { id: "all", name: "All Companies" },
    ...companiesList.map((company) => ({
      id: company.id,
      name: company.name,
    })),
  ];

  const categories = [
    "select",
    "all",
    ...new Set(
      allItems
        ?.filter((post) =>
          selectedCompanyId === "all" ? true : post?.company_id === selectedCompanyId
        )
        .map((post) => post?.category)
        .filter(Boolean)
    ),
  ];

  const statuses = [
    "all",
    ...new Set(allItems.map((item) => item.status).filter(Boolean)),
  ];

  // Badge helper (unchanged)
  const getStatusBadge = (status) => {
    const statusColors = {
      commentunderapproval: "bg-blue-500 text-white",
      postunderapproval: "bg-blue-500 text-white",
      live: "bg-green-500 text-white",
      removed: "bg-red-500 text-white",
      undermoderation: "bg-yellow-500 text-black",
      approved: "bg-emerald-700 text-white",
      notapproved: "bg-red-600 text-white",
      pending: "bg-yellow-400 text-white",
    };

    const colorClass = status
      ? statusColors[status.toLowerCase()] || "bg-gray-600 text-white"
      : "bg-gray-600 text-white";

    const formattedText = status
      ? status.replace(/([a-z])([A-Z])/g, "$1 $2")
      : "";

    return (
      <Badge className={`${colorClass} capitalize text-center min-w-[8rem] justify-center`}>
        {formattedText}
      </Badge>
    );
  };

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

  // Filtered items
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      selectedCategory === "select" ||
      item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    const matchesType =
      selectedType === "all" || item.type === selectedType;

    const matchCompanyId =
      selectedCompanyId === "all" ||
      selectedCompanyId === "select" ||
      item.company_id === selectedCompanyId;

    const matchesDate = matchesDateRange(item, dateRange);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesType &&
      matchCompanyId &&
      matchesDate
    );
  });

  // Status cards numbers (based on current filter set incl. date range)
  const getStatusCounts = () => {
    let itemsToCount = filteredItems;

    if (selectedType !== "all") {
      itemsToCount = itemsToCount.filter((item) => item.type === selectedType);
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

        if (statusKey) acc[statusKey] = (acc[statusKey] || 0) + 1;
        return acc;
      },
      { removed: 0, underApproval: 0, notPosted: 0, live: 0 }
    );
  };
  const statusCnt = getStatusCounts();

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => setCurrentPage(page);

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
                <h1 className="text-xl font-bold text-foreground">
                  Reddit Engagement Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage community discussions and workflows
                </p>
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
        {/* Status cards */}
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
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts, comments, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type */}
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

              {/* Company */}
              <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { id: "select", name: "Select Company" },
                    { id: "all", name: "All Companies" },
                    ...companiesList.map((c) => ({ id: c.id, name: c.name })),
                  ].map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all"
                        ? "All Categories"
                        : cat === "select"
                        ? "Select Category"
                        : cat}
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
                className=""
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

              {/* If you also want a separate 'Status' filter, uncomment below */}
              {/*
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
              */}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
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

          <div className="bg-[#344256] w-full h-[0.5px] mb-1" />

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {selectedType === "all" && <TableHead>Type</TableHead>}
                    <TableHead>Category</TableHead>

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
                      {selectedType === "all" && (
                        <TableCell>
                          <Badge
                            variant={item.type === "post" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {item.type}
                          </Badge>
                        </TableCell>
                      )}

                      <TableCell>
                        <Badge variant="outline" className="whitespace-nowrap">
                          {item.category}
                        </Badge>
                      </TableCell>

                      {selectedType === "post" && (
                        <>
                          <TableCell className="font-medium max-w-xs">
                            <HoverTextCell text={item.title} isTitle />
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(item.current_status)}
                          </TableCell>

                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.engagement_text} isTextEngagement />
                          </TableCell>

                          <TableCell className="text-sm">
                            {item.date_posted
                              ? new Date(item.date_posted).toLocaleDateString()
                              : "-"}
                          </TableCell>

                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>

                          <TableCell className="text-sm">
                            {getStatusBadge(item.status) || "-"}
                          </TableCell>

                          <TableCell>
                            {item.posted_link ? (
                              <a
                                href={item.posted_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary inline-flex items-center gap-1 hover:underline"
                              >
                                View Link <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              "-"
                            )}
                          </TableCell>

                          <TableCell className="text-sm">
                            {item.total_views ?? "-"}
                          </TableCell>

                          <TableCell className="text-sm">-</TableCell>

                          <TableCell>{item.reddit_username || "-"}</TableCell>
                        </>
                      )}

                      {selectedType === "comment" && (
                        <>
                          <TableCell className="max-w-sm">
                            <div className="text-sm text-muted-foreground line-clamp-3">
                              {item.targeted_subreddit || "-"}
                            </div>
                          </TableCell>

                          <TableCell className="font-medium max-w-xs">
                            <HoverTextCell text={item.title} isTitle />
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(item.status)}
                          </TableCell>

                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.engagement_text} isTextEngagement />
                          </TableCell>

                          <TableCell className="text-sm">
                            {item.date_posted
                              ? new Date(item.date_posted).toLocaleDateString()
                              : "-"}
                          </TableCell>

                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>

                          <TableCell>
                            {item.posted_link ? (
                              <a
                                href={item.posted_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary inline-flex items-center gap-1 hover:underline"
                              >
                                View Link <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              "-"
                            )}
                          </TableCell>

                          <TableCell className="text-sm">
                            {item.total_views ?? "-"}
                          </TableCell>

                          <TableCell>{item.reddit_username || "-"}</TableCell>

                          <TableCell>
                            {getStatusBadge(item.posted_comment_status)}
                          </TableCell>
                        </>
                      )}

                      {selectedType === "all" && (
                        <>
                          <TableCell className="font-medium max-w-xs">
                            <HoverTextCell text={item.title} isTitle />
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(
                              item.type === "post" ? item.status : item.posted_comment_status
                            )}
                          </TableCell>

                          <TableCell>
                            <HoverTextCell text={item.engagement_text} isTextEngagement />
                          </TableCell>

                          <TableCell className="text-sm">
                            {item.date_posted
                              ? new Date(item.date_posted).toLocaleDateString()
                              : "-"}
                          </TableCell>

                          <TableCell className="max-w-sm">
                            <HoverTextCell text={item.client_feedback || "-"} />
                          </TableCell>

                          <TableCell>
                            {item.posted_link ? (
                              <a
                                href={item.posted_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary inline-flex items-center gap-1 hover:underline"
                              >
                                View Link <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              "-"
                            )}
                          </TableCell>

                          <TableCell className="text-sm">
                            {item.total_views ?? "-"}
                          </TableCell>

                          <TableCell>
                            {item.targeted_subreddit || "-"}
                          </TableCell>

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
