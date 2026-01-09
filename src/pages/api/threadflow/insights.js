export const config = {
  api: {
    bodyParser: true,
  },
};

import { createClient } from '@supabase/supabase-js';
import { forbid, getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';

const OPENROUTER_ENDPOINT = process.env.OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "mistralai/devstral-2512:free";
const SITE_URL = process.env.NEXT_PUgBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function resolveCompanyIdBySlug(slug) {
  if (!slug) return null;
  const { data, error } = await supabase
    .from('companies')
    .select('id')
    .eq('name_normalized', slug)
    .maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Missing OPENROUTER_API_KEY env" });
  }

  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message || 'Unauthorized' });
  }

  try {
    const { posts = [], comments = [], companyId: bodyCompanyId, companySlug } = req.body || {};
    if ((!posts || posts.length === 0) && (!comments || comments.length === 0)) {
      return res.status(400).json({ error: "No data provided. Include posts and/or comments." });
    }

    const requestedCompanyId = Number.isFinite(Number(bodyCompanyId)) ? Number(bodyCompanyId) : null;
    let resolvedCompanyId = requestedCompanyId;
    if (!resolvedCompanyId && companySlug) {
      resolvedCompanyId = await resolveCompanyIdBySlug(companySlug);
    }

    const allowedCompanyIds = await getAllowedCompanyIds(userCtx);
    const normalizedAllowedCompanyIds = Array.isArray(allowedCompanyIds)
      ? allowedCompanyIds.map((id) => Number(id)).filter((id) => Number.isFinite(id))
      : [];

    if (resolvedCompanyId && !userCtx.isAdmin && normalizedAllowedCompanyIds.length && !normalizedAllowedCompanyIds.includes(resolvedCompanyId)) {
      return forbid(res);
    }

    if (!resolvedCompanyId && !userCtx.isAdmin) {
      if (!normalizedAllowedCompanyIds.length) {
        return forbid(res);
      }
      resolvedCompanyId = normalizedAllowedCompanyIds[0];
    }

    if (!resolvedCompanyId) {
      return res.status(400).json({ error: 'companyId required' });
    }

    const { data: companyMeta, error: companyErr } = await supabase
      .from('companies')
      .select('name, name_normalized')
      .eq('id', resolvedCompanyId)
      .maybeSingle();
    if (companyErr) throw companyErr;
    if (!companyMeta) return res.status(404).json({ error: 'Company not found' });

    const { data: mentions = [], error: mentionsErr } = await supabase
      .from('reddit_mentions')
      .select('type, subreddit, upvotes, total_comments, title, body, url, author, created_utc, fetched_at, engagement_score')
      .eq('company_id', resolvedCompanyId)
      .order('created_utc', { ascending: false })
      .limit(60);
    if (mentionsErr) throw mentionsErr;

    const mentionSummary = {
      total: mentions.length,
      posts: mentions.filter((m) => m.type === 'post').length,
      comments: mentions.filter((m) => m.type === 'comment').length,
      avgEngagement: mentions.length
        ? (mentions.reduce((acc, m) => acc + ((m.upvotes || 0) + (m.total_comments || 0)), 0) / mentions.length).toFixed(1)
        : '0.0',
    };

    const sanitizedMentions = (mentions || [])
      .slice(0, 40)
      .map((m) => ({
        type: m.type,
        subreddit: m.subreddit,
        title: m.title,
        body: m.body,
        upvotes: m.upvotes,
        comments: m.total_comments,
        engagement: (m.upvotes || 0) + (m.total_comments || 0),
        author: m.author,
        created_utc: m.created_utc,
        url: m.url,
      }));

    const summaryPrompt = `You are a senior analytics strategist for a SaaS dashboard that manages Reddit posts and comments for a specific company. You have three data sources:
- Posts/comments published by that company (they're included in the payload).
- Brand-level reddit_mentions rows for ${companyMeta.name} (provided as the "mentions" array and summarized with mentionSummary).
- Metadata about the company (name/slug). 

Generate a visually stunning, highly relevant, and data-driven HTML insights report using ONLY the provided data. Your output will be rendered directly in a dashboard and must:
- Be strictly relevant to these company signals (no generic advice, no hallucinated numbers, no disclaimers).
- Be beautiful, modern, and scannable: use <section>, <h2>, <ul>, <li>, <b>, <span>, <table>, <div>, color highlights, icons (as emoji), and clear structure.
- Use inline styles for color, card backgrounds, border-radius, box-shadow, and spacing so each section looks like a modern dashboard card.
- Use color, spacing, and icons (emoji) to make each section visually distinct and easy to scan.
- All numbers, examples, and recommendations must be directly supported by the provided posts/comments/mentionSummary/mentions data.
- Do NOT add any extra sections, generic advice, or text before/after the report.
- Treat the mentionSummary (total mentions ${mentionSummary.total}, posts ${mentionSummary.posts}, comments ${mentionSummary.comments}, avg engagement ${mentionSummary.avgEngagement}) as a quick reference.
- Each section should cite which dataset (posts, comments, or mentions) supports the insight.

Return these sections as valid, beautiful HTML (no markdown, no plain text):
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#2563eb;display:flex;align-items:center;gap:0.5em;">🔥 Top Performing Signals</h2>
  <ul style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">What resonates most and why (themes, tone, evidence quotes, numbers from data, highlight key posts/comments/mentions, use emoji for emphasis)</li>
  </ul>
</section>
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#f59e42;display:flex;align-items:center;gap:0.5em;">⚠️ What’s Going Wrong</h2>
  <ul style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">Friction points, objections, failure modes (with examples and numbers from data, use warning color or emoji)</li>
  </ul>
</section>
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#10b981;display:flex;align-items:center;gap:0.5em;">🛠️ Actionable Fixes</h2>
  <ol style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">Specific, ranked changes to messaging/product/community responses, with impact and evidence from data, use check/cross emoji for impact</li>
  </ol>
</section>
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#6366f1;display:flex;align-items:center;gap:0.5em;">🚀 Next Bets</h2>
  <ul style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">3-5 experiments with subreddit targets, expected outcome, and success metrics (all based on input data, use rocket or target emoji)</li>
  </ul>
</section>
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#fbbf24;display:flex;align-items:center;gap:0.5em;">💡 Messaging Angles</h2>
  <ul style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">4-6 concise angles with audience, promise, and proof (all from input data, use lightbulb or chat emoji)</li>
  </ul>
</section>
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#0ea5e9;display:flex;align-items:center;gap:0.5em;">📊 Metrics to Watch</h2>
  <ul style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">5-8 most important metrics, split into leading and lagging, all justified by the data, use chart emoji</li>
  </ul>
</section>
<section style="background:#fff;border-radius:1rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.04);margin-bottom:2rem;padding:2rem 1.5rem;border:1px solid #e5e7eb;">
  <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;color:#ef4444;display:flex;align-items:center;gap:0.5em;">🛡️ Risk Radar</h2>
  <ul style="margin-left:1.2em;margin-bottom:0.5em;">
    <li style="margin-bottom:0.5em;font-size:1rem;">Reputational or churn risks and how to mitigate, strictly based on the input, use shield or warning emoji</li>
  </ul>
</section>

Strict rules:
- Output must be valid, beautiful HTML only (no markdown, no plain text, no extra text before/after)
- Use only the facts, numbers, and evidence in the input—do not invent or generalize
- Do not add any disclaimers, generic advice, or sections not in the template above
- All numbers, examples, and recommendations must be directly supported by the input data
- Make the output visually scannable, modern, and ready to render in a dashboard
- Use color, icons, and spacing for clarity and visual appeal
- Use inline styles for all color, card, and layout properties so the output looks great in any UI
`;

    const userContent = {
      company: {
        id: resolvedCompanyId,
        name: companyMeta.name,
        slug: companyMeta.name_normalized,
      },
      posts,
      comments,
      mentions: sanitizedMentions,
      mentionSummary,
    };

    const payload = {
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: summaryPrompt },
        { role: "user", content: JSON.stringify(userContent) },
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    };

    const llmResp = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": "Infrasity Threadflow Insights",
      },
      body: JSON.stringify(payload),
    });

    if (!llmResp.ok) {
      const errText = await llmResp.text();
      return res.status(500).json({ error: "LLM request failed", status: llmResp.status, details: errText });
    }

    const llmJson = await llmResp.json();

    let result =
      llmJson?.choices?.[0]?.message?.content ||
      llmJson?.choices?.[0]?.text ||
      (typeof llmJson === "string" ? llmJson : null);

    if ((!result || result.trim() === "") && Array.isArray(llmJson?.choices)) {
      result = llmJson.choices.map((c) => c.text || c.message?.content || "").join("\n");
    }

    return res.status(200).json({ success: true, result: result ?? "" });
  } catch (err) {
    console.error('threadflow insights error', err);
    return res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
  }

}

