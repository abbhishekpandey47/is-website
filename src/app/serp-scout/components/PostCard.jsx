'use client';

import { Badge } from '@/Components/ui/badge';
import { ExternalLink } from 'lucide-react';

export default function PostCard({ post, brandLabel, allCompetitors = [], rank = null, scannedData = null }) {
  // Handle both camelCase (from HTTP results) and snake_case (from API) property names
  const url = post.url || post.post_url || '';
  const title = post.title || post.post_title || '';
  const subreddit = post.subreddit || post.community || '';
  const reason = post.reason || '';
  
  // Extract upvotes - try all possible field names
  const upvotes = post.upvotes || post.score || post.points || post.ups || 0;
  const downvotes = post.downvotes || post.downs || 0;
  const comments = post.total_comments || post.num_comments || post.comments || 0;
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
    <div className="rounded-lg border border-border bg-card p-3 space-y-2 hover:border-primary/30 transition-colors">
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
            className="font-medium text-sm text-primary hover:underline line-clamp-2 flex items-start gap-1.5 flex-1"
          >
            <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            {title}
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          {subreddit && <Badge variant="outline" className="text-[10px]">r/{subreddit}</Badge>}
          {reason && <span className="truncate max-w-xs">{reason}</span>}
        </div>
      </div>

      {/* Post stats row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ {formatNumber(upvotes)}</span>
        </div>
        {downvotes > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400 font-semibold">↓ {formatNumber(downvotes)}</span>
          </div>
        )}
        {comments > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">💬 {formatNumber(comments)}</span>
          </div>
        )}
        {postAge > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-muted-foreground">{formatAge(postAge)}</span>
          </div>
        )}
      </div>

      {/* Mentions badges and scan button */}
      {(brandLabel || allCompetitors.length > 0) && (
        <>
          <div className="flex flex-wrap gap-1 pt-1">
            {brandLabel && (
              mentionsBrand ? (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/15 text-emerald-700 border-emerald-500/30">
                  ✓ {brandLabel}
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] border bg-muted/40 text-muted-foreground/60 border-border/40">
                  ✗ {brandLabel}
                </span>
              )
            )}
            {allCompetitors.map(comp =>
              mentionedCompetitors.includes(comp) ? (
                <span key={`${url}-${comp}`} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-orange-500/15 text-orange-700 border-orange-500/30">
                  ⚠ {comp}
                </span>
              ) : (
                <span key={`${url}-${comp}`} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] border bg-muted/30 text-muted-foreground/40 border-border/30">
                  ○ {comp}
                </span>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
