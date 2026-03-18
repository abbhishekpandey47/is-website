// Warmup endpoint — pings the Render Reddit API so it's warm by the time
// the user runs analysis. Called fire-and-forget from the client on page load.
const REDDIT_API_BASE = 'https://reddit-comment-gen.onrender.com'

function fetchWithAbortTimeout(url, options, ms) {
  const ctrl = new AbortController()
  const tid = setTimeout(() => ctrl.abort(), ms)
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(tid))
}

export default async function handler(req, res) {
  // Try to actually wait for a healthy response — up to 45s — so the backend is
  // genuinely warm before the user clicks Run Analysis.
  const timeout = 45_000
  try {
    await fetchWithAbortTimeout(`${REDDIT_API_BASE}/health`, { method: 'GET' }, timeout)
  } catch {
    try {
      await fetchWithAbortTimeout(REDDIT_API_BASE, { method: 'GET' }, timeout)
    } catch {}
  }
  res.status(200).json({ ok: true })
}
