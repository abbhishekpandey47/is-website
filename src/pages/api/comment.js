import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      if (!body.title || !body.category || !body.user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const { data, error } = await supabase.from("comment").insert([
        {
          category: body.category,
          targeted_subreddit: body.targetedSubreddit || null,
          title: body.title,
          url: body.url || "No URL",
          status: body.status || "pending",
          engagement_text: body.engagementText || null,
          date_posted: body.datePosted ? new Date(body.datePosted) : null,
          posted_link: body.postedLink || null,
          user_id: body.user_id,
          client_feedback: body.clientFeedback || null,
          post_url: body.postURL || null,
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
      const { userId, id } = req.query;

      //  Get single post by ID
      if (id) {
        const { data, error } = await supabase
          .from("comment")
          .select("*")
          .eq("id", id)
          .single(); 

        if (error) return res.status(500).json({ error: error.message });

        return res.status(200).json({ success: true, data });
      }

      // ✅ Otherwise get all comment by userId
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }

      const { data, error } = await supabase
        .from("comment")
        .select("*")
        // .eq("user_id", userId)
        .order("date_posted", { ascending: false });

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // ✅ Edit Post (PUT)
  if (req.method === "PUT") {
    try {
      const { id, ...updates } = req.body;
      console.log("data", req.body)

      if (!id) {
        return res.status(400).json({ error: "Missing post ID" });
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

  // ✅ Delete Post (DELETE)
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Missing post ID" });
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
