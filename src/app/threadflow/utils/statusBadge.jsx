import { Badge } from "@/Components/ui/badge";

const STATUS_MAP = {
  live:                 { variant: "status-live", dot: "bg-[#34d399]" },
  approved:             { variant: "status-live", dot: "bg-[#34d399]" },
  postunderapproval:    { variant: "status-review", dot: "bg-[#9382ff]" },
  commentunderapproval: { variant: "status-review", dot: "bg-[#9382ff]" },
  undermoderation:      { variant: "status-pending", dot: "bg-[#fbbf24]" },
  pending:              { variant: "status-pending", dot: "bg-[#fbbf24]" },
  notposted:            { variant: "status-info", dot: "bg-[#60a5fa]" },
  removed:              { variant: "status-error", dot: "bg-[#f87171]" },
  notapproved:          { variant: "status-error", dot: "bg-[#f87171]" },
  reposted:             { variant: "status-review", dot: "bg-[#9382ff]" },
};

export function getStatusBadge(status) {
  if (!status) return <span className="text-[rgba(255,255,255,0.25)]">--</span>;

  const key = String(status).toLowerCase();
  const config = STATUS_MAP[key] || { variant: "outline", dot: "bg-[rgba(255,255,255,0.25)]" };

  const label = String(status)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ");

  return (
    <Badge variant={config.variant} className="capitalize gap-1.5 whitespace-nowrap">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {label}
    </Badge>
  );
}

export function getTypeBadge(type) {
  if (type === "post") {
    return (
      <Badge variant="status-info" className="capitalize gap-1">
        Post
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="capitalize gap-1">
      Comment
    </Badge>
  );
}
