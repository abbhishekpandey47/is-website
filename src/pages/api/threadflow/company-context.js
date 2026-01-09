import { forbid, getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth'
import { saveCompanyContext } from '@/lib/companyContext'

function cleanList(list) {
  if (!Array.isArray(list)) return []
  return list.map((item) => String(item || '').trim()).filter(Boolean)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let userCtx
  try {
    userCtx = await verifyRequestUser(req)
  } catch (err) {
    return res.status(err?.status || 401).json({ error: err?.message || 'Unauthorized' })
  }

  const { companyId: rawId, context, domain } = req.body || {}
  const parsedId = Number.isFinite(Number(rawId)) ? Number(rawId) : null
  if (!parsedId || !context) {
    return res.status(400).json({ error: 'companyId and context are required' })
  }

  const allowedCompanyIds = await getAllowedCompanyIds(userCtx)
  const normalizedAllowed = Array.isArray(allowedCompanyIds)
    ? allowedCompanyIds.map((id) => Number(id)).filter(Number.isFinite)
    : []

  if (parsedId && !userCtx.isAdmin && normalizedAllowed.length && !normalizedAllowed.includes(parsedId)) {
    return forbid(res)
  }

  if (!userCtx.isAdmin && !normalizedAllowed.length) {
    return forbid(res)
  }

  const sanitizedContext = {
    companySummary: String(context.companySummary || '').trim(),
    coreCapabilities: cleanList(context.coreCapabilities),
    problemSpaces: cleanList(context.problemSpaces),
    constraints: cleanList(context.constraints)
  }

  if (!sanitizedContext.companySummary) {
    return res.status(400).json({ error: 'companySummary is required' })
  }
  if (!sanitizedContext.coreCapabilities.length) {
    return res.status(400).json({ error: 'At least one core capability is required' })
  }
  if (!sanitizedContext.problemSpaces.length) {
    return res.status(400).json({ error: 'At least one problem space is required' })
  }

  const saved = await saveCompanyContext(parsedId, {
    domain,
    approvedContext: sanitizedContext
  })

  const companyContext = saved ?? {
    companyId: parsedId,
    domain,
    approvedContext: sanitizedContext
  }

  return res.status(200).json({ success: true, companyContext })
}
