export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const payload = req.body;

  try {
    const response = await fetch(
      process.env.HUBSPOT_PLAYBOOK_DEVELOPER_MARKETING,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "HubSpot error", details: result });
    }

    return res.status(200).json({ message: "Form submitted successfully", result });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
