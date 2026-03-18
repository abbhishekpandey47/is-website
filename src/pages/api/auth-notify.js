import { logAuthEvent } from '@/lib/slackLogger'

/**
 * POST /api/auth-notify
 * Fire-and-forget from client after successful Firebase login/signup.
 * Body: { type: 'signup'|'login', email, uid, method }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { type, email, uid, method } = req.body || {}
  if (!type || !email) return res.status(400).json({ error: 'type and email required' })
  // Fire and forget — don't await
  logAuthEvent({ type, email, uid, method }).catch(() => {})
  return res.status(200).json({ ok: true })
}
