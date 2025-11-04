import { createClient } from "@supabase/supabase-js";
import { verifyRequestUser, getAllowedCompanyIds } from "@/lib/serverAuth";
import ExcelJS from "exceljs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MAX_EXPORT_ROWS = 10000;

// Helper to format status
const formatStatus = (status) => {
  if (!status) return "-";
  return status.replace(/([a-z])([A-Z])/g, "$1 $2");
};

// Helper to format date
const formatDate = (date) => {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return "-";
  }
};

// Get column definitions (same as frontend)
const getColumnsForType = (selectedType) => {
  if (selectedType === "post") {
    return [
      { id: "category", header: "Category", accessor: (item) => item.category || "-" },
      { id: "title", header: "Title", accessor: (item) => item.title || "-" },
      { id: "current_status", header: "Post Approval Status", accessor: (item) => formatStatus(item.current_status || "-") },
      { id: "engagement_text", header: "Text of engagement", accessor: (item) => item.engagement_text || "-" },
      { id: "date_posted", header: "Date published", accessor: (item) => formatDate(item.date_posted) },
      { id: "client_feedback", header: "Customer Comments", accessor: (item) => item.client_feedback || "-" },
      { id: "status", header: "Published Status", accessor: (item) => formatStatus(item.status || "-") },
      { id: "posted_link", header: "Published Link", accessor: (item) => item.posted_link || "-" },
      { id: "total_views", header: "Total Views", accessor: (item) => item.total_views ?? "-" },
      { id: "number_of_engagements", header: "Number of our engagements", accessor: () => "-" },
      { id: "reddit_username", header: "Reddit Username", accessor: (item) => item.reddit_username || "-" },
    ];
  } else if (selectedType === "comment") {
    return [
      { id: "category", header: "Category", accessor: (item) => item.category || "-" },
      { id: "targeted_subreddit", header: "Targeted Subreddit", accessor: (item) => item.targeted_subreddit || "-" },
      { id: "title", header: "Title", accessor: (item) => item.title || "-" },
      { id: "status", header: "Comment Approval Status", accessor: (item) => formatStatus(item.status || "-") },
      { id: "engagement_text", header: "Text of engagement", accessor: (item) => item.engagement_text || "-" },
      { id: "date_posted", header: "Date published", accessor: (item) => formatDate(item.date_posted) },
      { id: "client_feedback", header: "Customer Comments", accessor: (item) => item.client_feedback || "-" },
      { id: "posted_link", header: "Published Link", accessor: (item) => item.posted_link || "-" },
      { id: "total_views", header: "Total Views", accessor: (item) => item.total_views ?? "-" },
      { id: "reddit_username", header: "Reddit Username", accessor: (item) => item.reddit_username || "-" },
      { id: "posted_comment_status", header: "Posted Comment Status", accessor: (item) => formatStatus(item.posted_comment_status || "-") },
    ];
  } else {
    // selectedType === "all"
    return [
      { id: "type", header: "Type", accessor: (item) => item.type || "-" },
      { id: "category", header: "Category", accessor: (item) => item.category || "-" },
      { id: "title", header: "Title", accessor: (item) => item.title || "-" },
      { id: "status", header: "Status", accessor: (item) => formatStatus(item.type === "post" ? (item.status || "-") : (item.posted_comment_status || "-")) },
      { id: "engagement_text", header: "Text of engagement", accessor: (item) => item.engagement_text || "-" },
      { id: "date_posted", header: "Date published", accessor: (item) => formatDate(item.date_posted) },
      { id: "client_feedback", header: "Customer Comments", accessor: (item) => item.client_feedback || "-" },
      { id: "posted_link", header: "Published Link", accessor: (item) => item.posted_link || "-" },
      { id: "total_views", header: "Total Views", accessor: (item) => item.total_views ?? "-" },
      { id: "targeted_subreddit", header: "Targeted Subreddit", accessor: (item) => item.targeted_subreddit || "-" },
      { id: "reddit_username", header: "Reddit Username", accessor: (item) => item.reddit_username || "-" },
    ];
  }
};

// Apply filters (same logic as frontend)
const applyFilters = (items, filters) => {
  const {
    searchQuery = "",
    selectedType = "all",
    selectedCategory = "select",
    selectedStatus = "all",
    selectedCompanyId = "select",
    dateRangeStart,
    dateRangeEnd,
  } = filters;

  return items.filter((item) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "all" ||
      selectedCategory === "select" ||
      item.category === selectedCategory;

    // Status filter
    const matchesStatus =
      selectedStatus === "all" ||
      item.status === selectedStatus ||
      item.posted_comment_status === selectedStatus;

    // Type filter
    const matchesType = selectedType === "all" || item.type === selectedType;

    // Company filter
    const matchCompanyId =
      selectedCompanyId === "all" ||
      selectedCompanyId === "select" ||
      item.company_id === selectedCompanyId;

    // Date range filter
    let matchesDate = true;
    if (dateRangeStart && dateRangeEnd) {
      const itemDate = item.date_posted ? new Date(item.date_posted) : null;
      const startDate = new Date(dateRangeStart);
      const endDate = new Date(dateRangeEnd);
      
      if (itemDate) {
        // Set to start/end of day for comparison
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        itemDate.setHours(0, 0, 0, 0);
        matchesDate = itemDate >= startDate && itemDate <= endDate;
      } else {
        matchesDate = false;
      }
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesType &&
      matchCompanyId &&
      matchesDate
    );
  });
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify authentication
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message || "Unauthorized" });
  }

  // Get allowed company IDs for multi-tenant safety
  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);

  // Parse query parameters (using new API param names)
  const { 
    format = "csv",
    type = "all",
    category = "",
    status = "",
    companyId = "",
    search = "",
    startDate,
    endDate,
  } = req.query;

  // Normalize filter values
  const selectedType = type || "all";
  const selectedCategory = category || "select";
  const selectedStatus = status || "all";
  const selectedCompanyId = companyId || "select";
  const searchQuery = search || "";

  // Validate format (only CSV and Excel now)
  if (!["csv", "xlsx"].includes(format)) {
    return res.status(400).json({ error: "Invalid format. Must be csv or xlsx" });
  }

  try {
    // Fetch all data (same as allContent API)
    let postQuery = supabase.from("posts").select("*");
    let commentQuery = supabase.from("comment").select("*");

    // Apply client restrictions (multi-tenant safety)
    if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      postQuery = postQuery.in("company_id", allowedCompanyIds);
      commentQuery = commentQuery.in("company_id", allowedCompanyIds);
    }

    const [{ data: posts, error: postError }, { data: comments, error: commentError }] =
      await Promise.all([postQuery, commentQuery]);

    if (postError || commentError) {
      return res.status(500).json({ error: (postError || commentError).message });
    }

    // Combine and mark type
    const allData = [
      ...posts.map((p) => ({ ...p, type: "post" })),
      ...comments.map((c) => ({ ...c, type: "comment" })),
    ];

    // Apply filters
    const filteredData = applyFilters(allData, {
      searchQuery,
      selectedType,
      selectedCategory,
      selectedStatus,
      selectedCompanyId,
      dateRangeStart: startDate,
      dateRangeEnd: endDate,
    });

    // Check for 0 rows
    if (filteredData.length === 0) {
      return res.status(400).json({
        error: "No data for selected filters",
      });
    }

    // Check max rows limit
    if (filteredData.length > MAX_EXPORT_ROWS) {
      return res.status(400).json({
        error: "Too many rows, please narrow filters",
        rowCount: filteredData.length,
        maxRows: MAX_EXPORT_ROWS,
      });
    }

    // Get column config
    const columns = getColumnsForType(selectedType);

    // Generate export based on format
    if (format === "csv") {
      // Generate CSV
      const headers = columns.map((col) => col.header);
      const rows = filteredData.map((item) =>
        columns.map((col) => {
          const value = col.accessor(item);
          // Escape CSV values
          if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
      );

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const dateStr = new Date().toISOString().split("T")[0];
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="reddit-engagement-${dateStr}.csv"`
      );
      return res.send(csvContent);
    } else if (format === "xlsx") {
      // Generate Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Engagement Data");

      // Add headers
      worksheet.columns = columns.map((col) => ({
        header: col.header,
        key: col.id,
        width: 20,
      }));

      // Add rows
      filteredData.forEach((item) => {
        const row = {};
        columns.forEach((col) => {
          row[col.id] = col.accessor(item);
        });
        worksheet.addRow(row);
      });

      // Style header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE0E0E0" },
      };

      // Generate buffer
      const buffer = await workbook.xlsx.writeBuffer();

      const dateStr = new Date().toISOString().split("T")[0];
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="reddit-engagement-${dateStr}.xlsx"`
      );
      return res.send(buffer);
    }
  } catch (err) {
    console.error("Export error:", err);
    return res.status(500).json({ error: "Failed to generate export: " + err.message });
  }
}

