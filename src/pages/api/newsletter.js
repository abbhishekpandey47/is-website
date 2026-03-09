export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // 📤 Submit to HubSpot form endpoint
    const hubspotResponse = await fetch(
      process.env.HUBSPOT_NEWSLETTER_FORM,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            {
              name: "email",
              value: email,
            },
          ],
        }),
      }
    );

    const hubspotResult = await hubspotResponse.json();

    return res.status(200).json({
      message: "Successfully subscribed to newsletter",
      hubspotResult,
    });
  } catch (err) {
    console.error("Error:", err);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
}
