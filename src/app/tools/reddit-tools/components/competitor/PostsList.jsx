"use client";
import { formatHoursShort, formatHoursToRedditAge } from "../../utils/timeAgo";

export function PostsList({ posts, visible }) {
  if (!visible) return null;
  if (!posts.length) return (
    <div className="px-6 py-12 text-center text-sm text-gray-500">No posts yet.</div>
  );
  return (
    <div className="px-6 mt-6 space-y-4">
      {posts.map((p, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs mb-2 text-gray-900">
            <span className="font-medium text-blue-600">r/{p.subreddit}</span>
            <span className="text-gray-900">•</span>
            <span className="text-gray-900" title={formatHoursToRedditAge(p.post_age_hours)}>{formatHoursShort(p.post_age_hours)}</span>
            {p.upvotes != null && (
              <span className="flex items-center gap-1 text-gray-900">⬆ {p.upvotes}</span>
            )}
            {p.total_comments != null && (
              <span className="flex items-center gap-1 text-gray-900">💬 {p.total_comments}</span>
            )}
          </div>
          <a href={p.post_url} target="_blank" rel="noopener noreferrer" className="block font-semibold text-gray-900 mb-2 hover:underline">
            {p.post_title}
          </a>
          {p.post_content && (
            <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-line">
              {p.post_content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function CommentsList({ comments, visible }) {
  if (!visible) return null;
  if (!comments.length) return (
    <div className="px-6 py-12 text-center text-sm text-gray-500">No comments yet.</div>
  );
  return (
    <div className="px-6 mt-6 space-y-4">
      {comments.map((c, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs mb-2 text-gray-900">
            <span className="font-medium text-indigo-600">r/{c.subreddit}</span>
            <span className="text-gray-900">•</span>
            <span className="text-gray-900" title={formatHoursToRedditAge(c.post_age_hours)}>{formatHoursShort(c.post_age_hours)}</span>
            {c.upvotes != null && (
              <span className="flex items-center gap-1 text-gray-900">⬆ {c.upvotes}</span>
            )}
            {c.replies != null && (
              <span className="flex items-center gap-1 text-gray-900">↩ {c.replies}</span>
            )}
          </div>
          <a href={c.comment_url} target="_blank" rel="noopener noreferrer" className="block font-medium text-gray-900 mb-2 hover:underline">
            View Thread
          </a>
          {c.comment_body ? (
            <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-line">{c.comment_body}</p>
          ) : (
            <p className="text-xs italic text-gray-400">(No extracted body)</p>
          )}
        </div>
      ))}
    </div>
  );
}
