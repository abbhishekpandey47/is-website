
import nodemailer from "nodemailer";
import dns from "dns/promises";
import { isEmail } from "validator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, firstName = "", lastName = "", company = "" } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  // Inline email validation (format and MX lookup)
  const value = (email || '').trim().toLowerCase();
  if (!isEmail(value)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const domain = value.split('@')[1];
  try {
    const mx = await dns.resolveMx(domain);
    if (!mx || mx.length === 0) {
      return res.status(400).json({ error: "No mail server found for this domain" });
    }
  } catch (e) {
    return res.status(400).json({ error: "Invalid email domain" });
  }
  try {
    // 📤 Submit to HubSpot form endpoint
    const hubspotPayload = {
      fields: [
        { name: "email", value: email },
      ],
    };

    if (hubspotPayload) {
      await fetch("https://api.hsforms.com/submissions/v3/integration/submit/242717777/58096854-9847-4d4c-aa28-dfa1b370268b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotPayload),
      });
    }

    // 📧 Setup Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 🧩 HTML Template for AEO Report
    const htmlTemplate = `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your AEO Report is on the way | Infrasity</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 40px;">
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="background: rgba(95,100,255,0.1); border-radius:8px; overflow:hidden;">
      <tr>
        <td style="padding: 30px;">
          <img src="https://infrasity.com/logodata/infrasity_logo.png" alt="Infrasity" width="100" style="margin-bottom:20px;" />

          <p>Hi ${firstName || "there"},</p>

          <p>
            Thank you for requesting your <strong>AEO (Generative Engine Optimization) Report</strong>. Your detailed analysis is on the way!
          </p>

          <p style="margin-top:20px; text-align:center;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">
  <tr>
  </tr>
</table>

          </p>

          <p>Ready to improve your visibility across AI search engines? <a href="https://www.infrasity.com/contact" style="color:#5b36ff;">Schedule a strategy call with our team.</a></p>

          <p style="margin-top:20px;">Best regards,<br /><strong>Team Infrasity</strong></p>

          <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

          <p style="font-size: 14px; color: #777;">
            Follow us on <a href="https://www.linkedin.com/company/infrasity" style="color:#5b36ff;">LinkedIn</a><br />
            © ${new Date().getFullYear()} Infrasity. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

    await transporter.sendMail({
      from: `"Infrasity" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your AEO Report is on the way!",
      html: htmlTemplate,
    });

    return res.status(200).json({ success: true, message: "Report requested successfully!" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Failed to process request" });
  }
}
