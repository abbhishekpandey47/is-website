/**
 * rewriter.js
 * Calls OpenAI GPT-4o once per top-N page.
 * Passes parsed content + signal scores → gets structured JSON rewrites back.
 * Runs pages 3 at a time to stay within rate limits.
 */

import OpenAI from "openai";
import { SIGNAL_MAX } from "./scorer.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a GEO (Generative Engine Optimization) specialist. GEO improves how AI systems — ChatGPT, Perplexity, Claude, Gemini — surface and cite web content.

Your job is to write specific, copy-ready rewrite suggestions for a single web page.

Rules:
- Quote the EXACT original text being improved (verbatim, max 2 sentences). If the element is missing entirely, write "Not present".
- Write a drop-in replacement the client can paste directly into their CMS.
- Name the GEO signal each fix addresses.
- Be concrete — no vague advice like "add more detail" or "improve structure".
- Prioritise the signals with the largest gaps first.

Output ONLY valid JSON. No markdown fences, no preamble, no explanation outside the JSON.

Schema:
{
  "url": string,
  "pageTitle": string,
  "rawScore": number,
  "topGaps": [string],
  "rewrites": [
    {
      "signal": string,
      "priority": "high" | "medium",
      "original": string,
      "rewrite": string,
      "rationale": string
    }
  ]
}`;

/**
 * Generate rewrites for a batch of top pages.
 * @param {Array<ScoredPage>} topPages
 * @returns {Promise<Array<RewriteResult>>}
 */
export async function generateRewrites(topPages) {
  console.log(`  [rewriter] Generating rewrites for ${topPages.length} pages (3 concurrent)`);

  const results = [];
  const batches = chunk(topPages, 3);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`  [rewriter] Rewrite batch ${i + 1}/${batches.length}`);

    const settled = await Promise.allSettled(
      batch.map((page) => rewritePage(page))
    );

    for (const result of settled) {
      if (result.status === "fulfilled" && result.value) {
        results.push(result.value);
      } else if (result.status === "rejected") {
        console.warn(`  [rewriter] Failed for a page:`, result.reason?.message);
      }
    }

    // Pause between batches to avoid rate limits
    if (i < batches.length - 1) await sleep(1000);
  }

  console.log(`  [rewriter] Got rewrites for ${results.length}/${topPages.length} pages`);
  return results;
}

/**
 * Call OpenAI GPT-4o for a single page and return structured rewrites.
 */
async function rewritePage(scoredPage) {
  const prompt = buildPrompt(scoredPage);

  const message = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1500,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
  });

  const raw = message.choices[0].message.content || "";
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);
    return parsed;
  } catch {
    console.warn(`  [rewriter] JSON parse failed for ${scoredPage.url}`);
    // Return a minimal fallback so the report still covers this page
    return {
      url: scoredPage.url,
      pageTitle: scoredPage.title,
      rawScore: scoredPage.rawScore,
      topGaps: scoredPage.topGaps,
      rewrites: [],
    };
  }
}

/**
 * Build the per-page user prompt.
 */
function buildPrompt(scoredPage) {
  const { url, title, rawScore, signals, topGaps, _parsed } = scoredPage;

  // Gap breakdown sorted worst-first
  const gapLines = Object.entries(signals)
    .map(([signal, pts]) => ({
      signal,
      pts,
      max: SIGNAL_MAX[signal],
      gap: SIGNAL_MAX[signal] - pts,
    }))
    .sort((a, b) => b.gap - a.gap)
    .map(({ signal, pts, max, gap }) =>
      `  ${signal}: ${pts}/${max} (gap: ${gap})`
    )
    .join("\n");

  const bodyPreview = _parsed?.bodyText?.slice(0, 2500) || "(no body text extracted)";
  const hTagPreview = (_parsed?.hTags || []).slice(0, 15).join("\n  ") || "(none)";

  return `Page URL: ${url}
Page title: ${title}
Overall GEO score: ${rawScore}/100
Top gaps (fix these first): ${topGaps.join(", ")}

Signal breakdown:
${gapLines}

H-tag structure:
  ${hTagPreview}

Page body (first 2500 chars):
---
${bodyPreview}
---

Write 3–5 specific, copy-ready rewrite suggestions targeting the worst gaps.
For each: quote the original text (or note it's missing), show the improved version, name the signal.
Return valid JSON only.`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}