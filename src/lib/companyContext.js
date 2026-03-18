import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const isConfigured = Boolean(supabaseUrl && supabaseKey)
const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null

const TABLE_NAME = 'threadflow_company_contexts'

function isMissingTableError(error) {
  if (!error) return false
  const text = String(error.message || '')
  return text.includes('does not exist') || text.includes('relation')
}

// Create a stable numeric ID from any string (e.g., UUID) to fit bigint column
// cyrb53-inspired hash that returns a 53-bit integer within Number.MAX_SAFE_INTEGER
function toContextId(input) {
  if (input == null) return null
  // Allow numeric IDs to pass through unchanged
  const asNumber = Number(input)
  if (Number.isFinite(asNumber)) return asNumber
  const str = String(input)
  let h1 = 0xdeadbeef ^ str.length
  let h2 = 0x41c6ce57 ^ str.length
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = (h1 ^ Math.imul(h2 ^ (h2 >>> 15), 2246822507)) >>> 0
  h2 = (h2 ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)) >>> 0
  // Combine to 53-bit number
  const combined = (h2 & 0x1fffff) * 0x100000000 + h1
  return combined
}

function mapRow(row) {
  if (!row) return null
  return {
    companyId: row.company_id,
    domain: row.domain,
    metadata: row.metadata ?? null,
    llmContext: row.llm_context ?? null,
    approvedContext: row.approved_context ?? null,
    generatedAt: row.generated_at,
    updatedAt: row.updated_at,
  }
}

async function fetchExistingRow(companyId) {
  if (!companyId || !supabase) return null
  try {
    const numericId = toContextId(companyId)
    if (!Number.isFinite(numericId)) return null
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('company_id', numericId)
      .maybeSingle()
    if (error) {
      if (isMissingTableError(error)) {
        console.warn('[companyContext] table missing:', TABLE_NAME)
        return null
      }
      throw error
    }
    return data
  } catch (error) {
    console.error('[companyContext] fetch error:', error.message)
    return null
  }
}

export async function getCompanyContext(companyId) {
  if (!companyId || !supabase) return null
  const row = await fetchExistingRow(companyId)
  return mapRow(row)
}

/**
 * Find a company context by domain + firebase user ID stored in metadata.
 * Returns null if not found or Supabase not configured.
 */
export async function getContextByDomainAndUser(domain, userId) {
  if (!domain || !userId || !supabase) return null
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('domain', domain)
      .eq('metadata->>firebase_user_id', userId)
      .maybeSingle()
    if (error) {
      if (isMissingTableError(error)) return null
      throw error
    }
    return mapRow(data)
  } catch (err) {
    console.error('[companyContext] getContextByDomainAndUser error:', err.message)
    return null
  }
}

export async function saveCompanyContext(companyId, fields = {}) {
  if (!companyId) return null
  if (!supabase) {
    console.warn('[companyContext] Supabase not configured for saving context')
    return null
  }
  const numericId = toContextId(companyId)
  if (!Number.isFinite(numericId)) return null
  
  const existing = await fetchExistingRow(numericId)
  const row = {
    company_id: numericId,
    domain: fields.domain ?? existing?.domain ?? null,
    metadata: fields.metadata ?? existing?.metadata ?? null,
    llm_context: fields.llmContext ?? existing?.llm_context ?? null,
    approved_context: fields.approvedContext ?? existing?.approved_context ?? null,
    generated_at: fields.generatedAt ?? existing?.generated_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert(row, { onConflict: 'company_id' })
      .select('*')
      .single()
    if (error) {
      if (isMissingTableError(error)) {
        console.warn('[companyContext] table missing when saving:', TABLE_NAME)
        return null
      }
      throw error
    }
    return mapRow(data)
  } catch (error) {
    console.error('[companyContext] save error:', error.message)
    return null
  }
}
