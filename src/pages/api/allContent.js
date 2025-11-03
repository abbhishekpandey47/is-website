import { createClient } from "@supabase/supabase-js";
import { verifyRequestUser, getAllowedCompanyIds, forbid } from "@/lib/serverAuth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message || "Unauthorized" });
  }

  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);

  try {
    // --- Build base queries ---
    let postQuery = supabase.from("posts").select("*");
    let commentQuery = supabase.from("comment").select("*");

    // --- Apply client restrictions ---
    if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      postQuery = postQuery.in("company_id", allowedCompanyIds);
      commentQuery = commentQuery.in("company_id", allowedCompanyIds);
    }

    // --- Fetch all data ---
    const [{ data: posts, error: postError }, { data: comments, error: commentError }] =
      await Promise.all([postQuery, commentQuery]);

    if (postError || commentError) {
      return res.status(500).json({ error: (postError || commentError).message });
    }

    // --- Mark type and combine ---
    const allData = [
      ...posts.map(p => ({ ...p, type: "post" })),
      ...comments.map(c => ({ ...c, type: "comment" })),
    ];

    // --- Sort combined by date descending ---
    allData.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));

    return res.status(200).json({
      success: true,
      data: allData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
