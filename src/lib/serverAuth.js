// Server-side Firebase auth verification and RBAC helpers
import { createClient } from '@supabase/supabase-js'

let adminAuth = null
try {
  // Lazy import to avoid bundling on client
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const admin = require('firebase-admin')
  if (admin.apps.length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    let privateKey = process.env.FIREBASE_PRIVATE_KEY
    if (privateKey && privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n')
    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey })
      })
    }
  }
  // Set if initialized
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const admin2 = require('firebase-admin')
  adminAuth = admin2.apps.length ? admin2.auth() : null
} catch (_) {
  adminAuth = null
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function verifyRequestUser(req) {
  const authz = req.headers['authorization'] || req.headers['Authorization']
  if (!authz || !String(authz).startsWith('Bearer ')) {
    const err = new Error('Missing Authorization header')
    err.status = 401
    throw err
  }
  const token = String(authz).slice('Bearer '.length)
  if (!adminAuth) {
    const err = new Error('Server auth not configured')
    err.status = 500
    throw err
  }
  const decoded = await adminAuth.verifyIdToken(token)
  const uid = decoded.uid
  const email = decoded.email || ''
  const domain = email.includes('@') ? email.split('@')[1].toLowerCase() : ''
  const adminDomain = (process.env.RBAC_ADMIN_DOMAIN || 'infrasity').toLowerCase()
  const isAdmin = domain.includes(adminDomain)
  return { uid, email, domain, isAdmin }
}

export async function getAllowedCompanyIds({ uid, domain, isAdmin }) {
  if (isAdmin) {
    // Admin can access all companies; return null to indicate no restriction
    return null
  }
  const ids = new Set()
  // Companies matching email domain
  if (domain) {
    const { data: compsByDomain } = await supabase
      .from('companies')
      .select('id')
      .eq('domain', domain)
    ;(compsByDomain || []).forEach(c => ids.add(c.id))
  }
  // Companies linked in user_companies
  if (uid) {
    const { data: links } = await supabase
      .from('user_companies')
      .select('company_id')
      .eq('firebase_user_id', uid)
    ;(links || []).forEach(l => ids.add(l.company_id))
  }
  return Array.from(ids)
}

export function forbid(res, message = 'Forbidden') {
  return res.status(403).json({ error: message })
}
