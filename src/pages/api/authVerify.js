import { verifyRequestUser } from "@/lib/serverAuth"; // Import your existing verifyRequestUser function

export default async function handler(req, res) {
  // Make sure only POST requests are allowed
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Use the verifyRequestUser function to verify the user's token
    const userCtx = await verifyRequestUser(req);
    // Respond with the user context (e.g., UID, email, company info, isAdmin)consoel
    return res.status(200).json({
      success: true,
      user: userCtx,
    });
  } catch (error) {
    // Handle any errors (e.g., invalid token, user not authorized, etc.)
    console.error("Error verifying user:", error);
    return res.status(error.status || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
}
