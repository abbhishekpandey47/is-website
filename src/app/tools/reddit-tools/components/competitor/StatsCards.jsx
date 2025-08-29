"use client";

export default function StatsCards({ stats, visible }) {
  if (!visible) return null;
  const fmt = (n) => {
    if (n == null) return 0;
    if (n < 1000) return n;
    if (n < 1_000_000) {
      const v = n / 1000;
      return (v % 1 === 0 ? v : v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)) + 'K';
    }
    const v = n / 1_000_000;
    return (v % 1 === 0 ? v : v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)) + 'M';
  };
  const card = (label, value, accent) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm flex flex-col">
  <span className="text-xs font-medium uppercase tracking-wide text-gray-300 mb-1">{label}</span>
  <span className={`text-2xl font-semibold text-gray-100 ${accent}`}>{value}</span>
    </div>
  );
  return (
    <div className="px-6 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {card("Total Posts", stats.totalPosts, "text-blue-600")}
      {card("Total Comments", stats.totalComments, "text-indigo-600")}
      {card("Unique Subreddits", stats.uniqueSubs, "text-emerald-600")}
      {card("Aggregate Upvotes", fmt(stats.totalUpvotes), "text-rose-600")}
    </div>
  );
}
