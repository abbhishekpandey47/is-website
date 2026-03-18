'use client';

import { Badge } from '@/Components/ui/badge';
import { ExternalLink } from 'lucide-react';

export default function PostCard({ post, brandLabel, allCompetitors = [], rank = null, scannedData = null }) {
  // Handle both camelCase (from HTTP results) and snake_case (from API) property names
  const url = post.url || post.post_url || '';
  const title = post.title || post.post_title || '';
  const subreddit = post.subreddit || post.community || '';
  const reason = post.reason || '';
  
  // Extract upvotes — try all possible field names, parse to int in case of string values
  const toInt = v => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; };
  const upvotes = toInt(post.upvotes ?? post.score ?? post.points ?? post.ups ?? 0);
  const downvotes = toInt(post.downvotes ?? post.downs ?? 0);
  const comments = toInt(post.total_comments ?? post.num_comments ?? post.comment_count ?? post.comments ?? 0);
  const postAge = post.post_age_hours || post.age_hours || post.created_utc || 0;

  // Use scanned data if available, otherwise use API mention data
  const mentionedCompetitors = scannedData?.mentionsCompetitors || post.mentionsCompetitors || [];
  const mentionsBrand = scannedData?.mentionsBrand !== undefined ? scannedData.mentionsBrand : post.mentionsBrand || false;

  // Format upvotes and downvotes with K/M suffix
  const formatNumber = (num) => {
    if (!num || num === 0) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Format age
  const formatAge = (hours) => {
    if (!hours || hours < 1) return 'now';
    if (hours < 24) return `${Math.floor(hours)}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w`;
    const months = Math.floor(days / 30);
    return `${months}mo`;
  };

  return (
    <div className="rounded-lg bg-card p-3 space-y-2 transition-colors" style={{ border: '0.5px solid rgba(95,100,255,0.15)' }}>
      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          {rank && (
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">#{rank}</span>
            </div>
          )}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-sm hover:underline line-clamp-2 flex items-start gap-1.5 flex-1"
            style={{ color: '#5f64ff' }}
          >
            <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: '#5f64ff' }} />
            {title}
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          {subreddit && <Badge variant="outline" className="text-[10px]">r/{subreddit}</Badge>}
          {reason && <span className="truncate max-w-xs">{reason}</span>}
        </div>
      </div>

      {/* Post stats row — only render if we have at least one metric */}
      {(upvotes > 0 || comments > 0 || downvotes > 0 || postAge > 0) && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50 flex-wrap">
          {upvotes > 0 && (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ {formatNumber(upvotes)}</span>
          )}
          {downvotes > 0 && (
            <span className="text-red-600 dark:text-red-400 font-semibold">↓ {formatNumber(downvotes)}</span>
          )}
          {comments > 0 && (
            <span className="text-blue-600 dark:text-blue-400 font-semibold">💬 {formatNumber(comments)}</span>
          )}
          {postAge > 0 && (
            <span className="ml-auto text-muted-foreground">{formatAge(postAge)}</span>
          )}
        </div>
      )}

      {/* Mentions — always show when brand or competitors are configured */}
      {(brandLabel || allCompetitors.length > 0) && (
        <div className="pt-1.5 space-y-1">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground/50 font-medium px-0.5">Mentions</p>
          <div className="flex flex-wrap gap-1.5">
            {brandLabel && (
              mentionsBrand ? (
                <span
                  title={`${brandLabel} is mentioned`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
                >
                  ✓ Your brand
                </span>
              ) : (
                <span
                  title={`${brandLabel} is not mentioned`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs border bg-muted/30 text-muted-foreground/50 border-border/30"
                >
                  – Your brand
                </span>
              )
            )}
            {allCompetitors.map(comp =>
              mentionedCompetitors.includes(comp) ? (
                <span
                  key={`${url}-${comp}`}
                  title={`${comp} is mentioned`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border bg-orange-500/15 text-orange-600 border-orange-500/30 dark:text-orange-400"
                >
                  ⚠ {comp}
                </span>
              ) : (
                <span
                  key={`${url}-${comp}`}
                  title={`${comp} is not mentioned`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs border bg-muted/20 text-muted-foreground/40 border-border/20"
                >
                  – {comp}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
