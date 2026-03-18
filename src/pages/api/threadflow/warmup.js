// Warmup endpoint — pings the Render Reddit API so it's warm by the time
// the user runs analysis. Called fire-and-forget from the client on page load.
const REDDIT_API_BASE = 'https://reddit-comment-gen.onrender.com'

export default async function handler(req, res) {
  try {
    await fetch(`${REDDIT_API_BASE}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    })
  } catch {
    // Ignore — warmup is best-effort, the service may not have a /health endpoint
    // but just the TCP connection attempt wakes Render up
    try {
      await fetch(REDDIT_API_BASE, {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      })
    } catch {}
  }
  res.status(200).json({ ok: true })
}
