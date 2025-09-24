import { forbid, getAllowedCompanyIds, verifyRequestUser } from "@/lib/serverAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Authenticate
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    const status = e.status || 401;
    return res.status(status).json({ error: e.message || "Unauthorized" });
  }
  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);
  if (req.method === "POST") {
    try {
      const body = req.body;

      if (!body.title || !body.category) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let company_id = body.companyId || null;
      if (!userCtx.isAdmin) {
        if (!allowedCompanyIds || allowedCompanyIds.length === 0) return forbid(res, 'No company access');
        if (company_id && !allowedCompanyIds.includes(company_id)) return forbid(res);
        if (!company_id) company_id = allowedCompanyIds[0];
      }

      const { data, error } = await supabase.from("comment").insert([
        {
          category: body.category,
          targeted_subreddit: body.targetedSubreddit || null,
          title: body.title,
          url: body.url || "",
          status: body.status || "pending",
          engagement_text: body.engagementText || null,
          date_posted: body.datePosted ? new Date(body.datePosted) : null,
          posted_link: body.postedLink || null,
          user_id: userCtx.uid,
          company_id: company_id,
          client_feedback: body.clientFeedback || null,
          post_url: body.postURL || null,
          posted_comment_status: body.postedCommentStatus || "underModeration",
          total_views: body.totalViews || null,
        },
      ]);

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      const { id, categories } = req.query;

      //  Get single post by ID
      if (id) {
        const { data, error } = await supabase
          .from("comment")
          .select("*")
          .eq("id", id)
          .single();

        if (error) return res.status(500).json({ error: error.message });

        if (!userCtx.isAdmin && data?.company_id && Array.isArray(allowedCompanyIds) && !allowedCompanyIds.includes(data.company_id)) {
          return forbid(res);
        }
        return res.status(200).json({ success: true, data });
      }

      if (categories === "true") {
        let query = supabase
          .from("comment")
          .select("category");
        if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
          query = query.in('company_id', allowedCompanyIds);
        }
        const { data, error } = await query;

        if (error) return res.status(500).json({ error: error.message });

        // Extract only unique categories
        const uniqueCategories = [...new Set(data.map((p) => p.category))];

        return res.status(200).json({ success: true, categories: uniqueCategories });
      }



      let query = supabase
        .from("comment")
        .select("*")
        .order("date_posted", { ascending: false });
      if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
        query = query.in('company_id', allowedCompanyIds);
      }
      const { data, error } = await query;

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Edit Post (PUT)
  if (req.method === "PUT") {
    try {
      const { id, ...updates } = req.body;
      console.log("data", req.body)

      if (!id) {
        return res.status(400).json({ error: "Missing post ID" });
      }
      const { data: existing, error: fetchErr } = await supabase.from('comment').select('company_id').eq('id', id).single();
      if (fetchErr) return res.status(500).json({ error: fetchErr.message });
      if (!userCtx.isAdmin && existing?.company_id && Array.isArray(allowedCompanyIds) && !allowedCompanyIds.includes(existing.company_id)) {
        return forbid(res);
      }

      const { data, error } = await supabase
        .from("comment")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete Post (DELETE)
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Missing post ID" });
      }
      const { data: existing, error: fetchErr } = await supabase.from('comment').select('company_id').eq('id', id).single();
      if (fetchErr) return res.status(500).json({ error: fetchErr.message });
      if (!userCtx.isAdmin && existing?.company_id && Array.isArray(allowedCompanyIds) && !allowedCompanyIds.includes(existing.company_id)) {
        return forbid(res);
      }

      const { data, error } = await supabase
        .from("comment")
        .delete()
        .eq("id", id)
        .select();

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
