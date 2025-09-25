"use client";

export default function TopThreadsTable({ data }) {
  const rows = Array.isArray(data)? data : [];
  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Top Threads</h2>
          <p className="text-xs text-muted-foreground">Most engaging recent posts</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="py-2 px-2 text-left">Subreddit</th>
              <th className="py-2 px-2 text-left">Title</th>
              <th className="py-2 px-2">Upvotes</th>
              <th className="py-2 px-2">Comments</th>
              <th className="py-2 px-2">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">No threads yet.</td></tr>}
            {rows.map(r => (
              <tr key={r.url} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-2 px-2 whitespace-nowrap text-xs">{r.subreddit}</td>
                <td className="py-2 px-2 max-w-md truncate"><a className="underline decoration-dotted hover:text-primary" href={r.url} target="_blank" rel="noreferrer">{r.title}</a></td>
                <td className="py-2 px-2 text-center">{r.upvotes}</td>
                <td className="py-2 px-2 text-center">{r.comments}</td>
                <td className="py-2 px-2 text-center font-medium">{r.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
