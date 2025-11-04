/**
 * Column configuration for Threadflow engagement table exports
 * This matches the table structure in page.jsx and ensures exports use the same column definitions
 */

// Helper to format status badge text
const formatStatus = (status) => {
  if (!status) return "-";
  return status.replace(/([a-z])([A-Z])/g, "$1 $2");
};

// Helper to get status for display
const getStatusDisplay = (item, selectedType) => {
  if (selectedType === "post") {
    return item.current_status || item.status || "-";
  } else if (selectedType === "comment") {
    return item.status || "-";
  } else {
    // selectedType === "all"
    return item.type === "post" ? (item.status || "-") : (item.posted_comment_status || "-");
  }
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

// Helper to format link
const formatLink = (link) => {
  return link || "-";
};

// Column definitions for "all" type
export const getAllColumns = () => [
  {
    id: "type",
    header: "Type",
    accessor: (item) => item.type || "-",
  },
  {
    id: "category",
    header: "Category",
    accessor: (item) => item.category || "-",
  },
  {
    id: "title",
    header: "Title",
    accessor: (item) => item.title || "-",
  },
  {
    id: "status",
    header: "Status",
    accessor: (item) => formatStatus(getStatusDisplay(item, "all")),
  },
  {
    id: "engagement_text",
    header: "Text of engagement",
    accessor: (item) => item.engagement_text || "-",
  },
  {
    id: "date_posted",
    header: "Date published",
    accessor: (item) => formatDate(item.date_posted),
  },
  {
    id: "client_feedback",
    header: "Customer Comments",
    accessor: (item) => item.client_feedback || "-",
  },
  {
    id: "posted_link",
    header: "Published Link",
    accessor: (item) => formatLink(item.posted_link),
  },
  {
    id: "total_views",
    header: "Total Views",
    accessor: (item) => item.total_views ?? "-",
  },
  {
    id: "targeted_subreddit",
    header: "Targeted Subreddit",
    accessor: (item) => item.targeted_subreddit || "-",
  },
  {
    id: "reddit_username",
    header: "Reddit Username",
    accessor: (item) => item.reddit_username || "-",
  },
];

// Column definitions for "post" type
export const getPostColumns = () => [
  {
    id: "category",
    header: "Category",
    accessor: (item) => item.category || "-",
  },
  {
    id: "title",
    header: "Title",
    accessor: (item) => item.title || "-",
  },
  {
    id: "current_status",
    header: "Post Approval Status",
    accessor: (item) => formatStatus(item.current_status || "-"),
  },
  {
    id: "engagement_text",
    header: "Text of engagement",
    accessor: (item) => item.engagement_text || "-",
  },
  {
    id: "date_posted",
    header: "Date published",
    accessor: (item) => formatDate(item.date_posted),
  },
  {
    id: "client_feedback",
    header: "Customer Comments",
    accessor: (item) => item.client_feedback || "-",
  },
  {
    id: "status",
    header: "Published Status",
    accessor: (item) => formatStatus(item.status || "-"),
  },
  {
    id: "posted_link",
    header: "Published Link",
    accessor: (item) => formatLink(item.posted_link),
  },
  {
    id: "total_views",
    header: "Total Views",
    accessor: (item) => item.total_views ?? "-",
  },
  {
    id: "number_of_engagements",
    header: "Number of our engagements",
    accessor: () => "-", // Not in data model
  },
  {
    id: "reddit_username",
    header: "Reddit Username",
    accessor: (item) => item.reddit_username || "-",
  },
];

// Column definitions for "comment" type
export const getCommentColumns = () => [
  {
    id: "category",
    header: "Category",
    accessor: (item) => item.category || "-",
  },
  {
    id: "targeted_subreddit",
    header: "Targeted Subreddit",
    accessor: (item) => item.targeted_subreddit || "-",
  },
  {
    id: "title",
    header: "Title",
    accessor: (item) => item.title || "-",
  },
  {
    id: "status",
    header: "Comment Approval Status",
    accessor: (item) => formatStatus(item.status || "-"),
  },
  {
    id: "engagement_text",
    header: "Text of engagement",
    accessor: (item) => item.engagement_text || "-",
  },
  {
    id: "date_posted",
    header: "Date published",
    accessor: (item) => formatDate(item.date_posted),
  },
  {
    id: "client_feedback",
    header: "Customer Comments",
    accessor: (item) => item.client_feedback || "-",
  },
  {
    id: "posted_link",
    header: "Published Link",
    accessor: (item) => formatLink(item.posted_link),
  },
  {
    id: "total_views",
    header: "Total Views",
    accessor: (item) => item.total_views ?? "-",
  },
  {
    id: "reddit_username",
    header: "Reddit Username",
    accessor: (item) => item.reddit_username || "-",
  },
  {
    id: "posted_comment_status",
    header: "Posted Comment Status",
    accessor: (item) => formatStatus(item.posted_comment_status || "-"),
  },
];

/**
 * Get column config based on selected type
 */
export const getColumnsForType = (selectedType) => {
  if (selectedType === "post") {
    return getPostColumns();
  } else if (selectedType === "comment") {
    return getCommentColumns();
  } else {
    return getAllColumns();
  }
};

