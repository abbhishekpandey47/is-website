const ZEROBOUNCE_ENDPOINT = process.env.ZEROBOUNCE_ENDPOINT || "https://api.zerobounce.net/v2/validate";

const clampTimeoutSeconds = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return Math.min(Math.max(num, 3), 60);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ZeroBounce API key is not configured" });
  }

  const { email, ipAddress, timeoutSeconds } = req.body || {};
  const emailValue = (email || "").trim().toLowerCase();

  if (!emailValue) {
    return res.status(400).json({ error: "Email is required" });
  }

  const params = new URLSearchParams();
  params.set("api_key", apiKey);
  params.set("email", emailValue);

  if (ipAddress) {
    params.set("ip_address", ipAddress);
  }

  const clampedTimeout = clampTimeoutSeconds(timeoutSeconds);
  if (clampedTimeout) {
    params.set("timeout", String(clampedTimeout));
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${ZEROBOUNCE_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok || data.error) {
      return res
        .status(response.status || 502)
        .json({ error: data.error || "Unable to validate email" });
    }

    return res.status(200).json({
      status: (data.status || "unknown").toLowerCase(),
      subStatus: (data.sub_status || "").toLowerCase(),
      didYouMean: data.did_you_mean || null,
    });
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      return res.status(504).json({ error: "ZeroBounce validation timed out" });
    }

    console.error("ZeroBounce validation failed:", err);
    return res.status(500).json({ error: "ZeroBounce validation failed" });
  }
}
