/**
 * slackLogger.js
 * Fire-and-forget Slack notifications for SERP Scout / Reddit Finder.
 * Never throws or blocks the API response.
 *
 * Required env var: SLACK_SERP_SCOUT_WEBHOOK
 */

const WEBHOOK = process.env.SLACK_SERP_SCOUT_WEBHOOK
const SLOW_THRESHOLD_MS = 10_000 // 10 seconds

function fmt(ms) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`
}

function utcNow() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
}

/** Send a raw Slack payload. Fire and forget. */
async function sendSlack(payload) {
  if (!WEBHOOK) return
  try {
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    })
  } catch (_) {
    // intentionally silent — Slack logging must never break the API
  }
}

/**
 * Log a user action. Sends to Slack when:
 *   - It's an error (always)
 *   - It took > 10 seconds (always)
 *   - It's the user's first action in this request (audit trail)
 *
 * @param {object} opts
 * @param {{ uid: string, email: string }} opts.user   — from verifyRequestUser
 * @param {string}  opts.action      — e.g. 'serpAndDork'
 * @param {string}  opts.domain      — target domain
 * @param {number}  opts.durationMs  — elapsed time
 * @param {boolean} [opts.fromCache] — true if served from cache
 * @param {string}  [opts.error]     — error message if failed
 * @param {boolean} [opts.audit]     — true = always send even if fast + no error
 */
export async function logSerpAction({ user, action, domain, keyword, durationMs, fromCache = false, error = null, audit = false }) {
  const isError = Boolean(error)
  const isSlow  = durationMs >= SLOW_THRESHOLD_MS
  if (!isError && !isSlow && !audit) return  // nothing to report

  const emoji   = isError ? '🔴' : isSlow ? '🐢' : '👤'
  const status  = isError ? 'ERROR' : isSlow ? `SLOW (${fmt(durationMs)})` : 'NEW USER'
  const cacheTag = fromCache ? ' _(from cache)_' : ''

  const lines = [
    `${emoji} *SERP Scout · ${status}*`,
    `• *User:* ${user?.email || 'unknown'} \`${user?.uid || '?'}\``,
    `• *Action:* \`${action}\``,
    `• *Domain:* ${domain || '—'}${cacheTag}`,
    keyword ? `• *Keyword:* ${keyword}` : null,
    `• *Duration:* ${fmt(durationMs)}`,
    isError ? `• *Error:* \`${String(error).slice(0, 300)}\`` : null,
    `• *Time:* ${utcNow()}`,
  ].filter(Boolean).join('\n')

  await sendSlack({ text: lines })
}

/**
 * Convenience: wrap an async action handler with automatic timing + Slack logging.
 *
 * Usage:
 *   const result = await withSlackLog({ user, action: 'serpAndDork', domain }, () => doWork())
 *
 * Returns the result of fn(). Throws if fn() throws (after logging).
 */
export async function withSlackLog({ user, action, domain, audit = false }, fn) {
  const t0 = Date.now()
  try {
    const result = await fn()
    const durationMs = Date.now() - t0
    // Always fire audit log for primary analysis actions; also fires if slow
    await logSerpAction({ user, action, domain, durationMs, fromCache: result?.fromCache, audit })
    return result
  } catch (err) {
    const durationMs = Date.now() - t0
    await logSerpAction({ user, action, domain, durationMs, error: err?.message || String(err), audit: true })
    throw err
  }
}
