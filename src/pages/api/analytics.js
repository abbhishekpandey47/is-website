import { getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';
import pLimit from 'p-limit';

const POST_API_BASE = 'https://reddit-comment-gen.onrender.com/fetch_post_details';
const COMMENT_API_BASE = 'https://reddit-comment-gen.onrender.com/fetch_comment_details';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// run at most N external fetches at once
const limit = pLimit(8);

export default async function handler(req, res) {
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message || "Unauthorized" });
  }

  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
 
    let postQuery = supabase
      .from("posts")
      .select("*")
      .order("date_posted", { ascending: false });

    if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      postQuery = postQuery.in("company_id", allowedCompanyIds);
    }

    let commentQuery = supabase
      .from("comment")
      .select("*")
      .order("date_posted", { ascending: false });

    if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      commentQuery = commentQuery.in("company_id", allowedCompanyIds);
    }

  
    const [
      { data: PostData, error: PostError },
      { data: CommentData, error: CommentError }
    ] = await Promise.all([postQuery, commentQuery]);

    if (PostError || CommentError) {
      return res.status(500).json({ error: (PostError || CommentError).message });
    }

    // --- helper for external detail fetches ---
    const fetchDetails = async (record, type) => {
      const url = record?.posted_link;
      if (!url) return null;
      try {
        const response = await fetch(
          type === "post" ? POST_API_BASE : COMMENT_API_BASE,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reddit_url: url }),
          }
        );
        if (!response.ok) throw new Error(`Failed to fetch for ${url}`);
        return await response.json();
      } catch (err) {
        console.warn(`Skipping failed ${type} fetch for: ${url}`);
        return null;
      }
    };

   
    const postResults = await Promise.allSettled(
      (PostData ?? []).map(p => limit(() => fetchDetails(p, "post")))
    );
    const commentResults = await Promise.allSettled(
      (CommentData ?? []).map(c => limit(() => fetchDetails(c, "comment")))
    );

    // keep only fulfilled + non-null
    const postDetails = postResults
      .filter(r => r.status === "fulfilled" && r.value)
      .map(r => r.value);
    const commentDetails = commentResults
      .filter(r => r.status === "fulfilled" && r.value)
      .map(r => r.value);

    return res.status(200).json({
      success: true,
      data: { posts: postDetails, comments: commentDetails },
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
