// Warmup endpoint — pings the Render Reddit API so it's warm by the time
// the user runs analysis. Called fire-and-forget from the client on page load.
const REDDIT_API_BASE = 'https://reddit-comment-gen.onrender.com'

function fetchWithAbortTimeout(url, options, ms) {
  const ctrl = new AbortController()
  const tid = setTimeout(() => ctrl.abort(), ms)
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(tid))
}

export default async function handler(req, res) {
  try {
    await fetchWithAbortTimeout(`${REDDIT_API_BASE}/health`, { method: 'GET' }, 3000)
  } catch {
    // Ignore — warmup is best-effort, the service may not have a /health endpoint
    // but just the TCP connection attempt wakes Render up
    try {
      await fetchWithAbortTimeout(REDDIT_API_BASE, { method: 'GET' }, 3000)
    } catch {}
  }
  res.status(200).json({ ok: true })
}
