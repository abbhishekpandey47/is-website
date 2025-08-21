// Lightweight Reddit-style relative time formatter.
// Input: age in hours (integer or float); Output: string like '3h', '5d', '2w', '4mo', '1y'.
export function formatHoursToRedditAge(hours) {
  if (hours == null || isNaN(hours)) return '';
  const h = Math.max(0, Math.floor(hours));
  if (h < 1) return 'moments ago'; // < 1h
  if (h < 24) return h === 1 ? '1 hour ago' : `${h} hours ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  const months = Math.floor(days / 30); // rough month length
  if (months < 12) return months <= 1 ? '1 month ago' : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

// Short form for compact list contexts (e.g., '3h', '5d')
export function formatHoursShort(hours) {
  if (hours == null || isNaN(hours)) return '';
  const h = Math.max(0, Math.floor(hours));
  if (h < 1) return 'now';
  if (h < 24) return `${h}h`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const years = Math.floor(days / 365);
  return `${years}y`;
}
