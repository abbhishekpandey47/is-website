import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const payload = req.body;

  try {
    // 📤 Submit to HubSpot form endpoint
    const hubspotResponse = await fetch(
      process.env.HUBSPOT_PLAYBOOK_DEVELOPER_MARKETING,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const hubspotResult = await hubspotResponse.json();

    // 📧 Setup Gmail transporter (App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 🧩 HTML Template (Infrasity Playbook)
    const htmlTemplate = `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Infrasity Developer Marketing Playbook 2025 | Infrasity</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 40px;">
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="background: rgba(95,100,255,0.1); border-radius:8px; overflow:hidden;">
      <tr>
        <td style="padding: 30px;">
          <img src="https://infrasity.com/logodata/infrasity_logo.png" alt="Infrasity" width="100" style="margin-bottom:20px;" />

          <p>Hi ${payload.fields[0].value || "there"},</p>

          <p>
            Thanks for requesting a copy of <strong>Infrasity’s Developer Marketing Playbook</strong>. You can grab your copy here:
          </p>

          <p style="margin-top:20px; text-align:center;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">
  <tr>
    <td align="center" style="border-radius:6px; overflow:hidden;">
      <a href="https://drive.google.com/uc?export=download&id=1aKH0TRg4U9V_tTZ4ibEvGQ1EFDoM19F4"
        style="display:inline-block; font-weight:bold; padding:14px 28px; font-size:16px; color:#ffffff; text-decoration:none; border-radius:6px; background:linear-gradient(to right, #A259FF, #5B36FF); font-family:Arial, sans-serif;">
        Download the Playbook
      </a>
    </td>
  </tr>
</table>

          </p>

          <p>
            Inside, you’ll learn:
          </p>
          <ul style="margin-top:10px; margin-bottom:20px;">
            <li>How developers in 2025 discover, evaluate, and adopt new tools (before procurement even gets involved)</li>
            <li>The biggest pain points developers face with B2B SaaS and AI products — and how to solve them</li>
            <li>The 6 Core Pillars of Developer Marketing, from communities and technical content to documentation, SDKs, and developer-friendly landing pages</li>
            <li>Actionable frameworks (Why → Try → Buy → Fly) for driving adoption, advocacy, and long-term trust</li>
            <li>Real-world case studies from startups like Firefly, Scalekit, and Kubiya that turned developer-first marketing into measurable growth</li>
          </ul>
<p>If you’re ready to put these insights into action and want tailored support for your B2B SaaS or DevTool startup, let’s talk.</p>
          <p style="margin-top:20px; text-align:center;">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">
              <tr>
                <td align="center" bgcolor="#5F64FF" style="border-radius:6px;">
                  <a href="https://www.infrasity.com/contact"
                    style="display:inline-block; font-weight:bold; padding:14px 28px; font-size:16px; color:#ffffff; text-decoration:none; border-radius:6px; background:#5b36ff; font-family:Arial, sans-serif;">
                     Schedule a Call with Us
                  </a>
                </td>
              </tr>
            </table>
          </p>

          <p style="margin-top:20px;">
            Looking forward to hearing how you use the playbook to change your developer marketing approach!
          </p>

          <p style="margin-top:20px;">Best regards,<br />Team Infrasity</p>

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

    // Send the email
    await transporter.sendMail({
      from: `"Infrasity" <${process.env.GMAIL_USER}>`,
      to: payload.fields[2].value,
      subject: "Infrasity Developer Marketing Playbook 2025",
      html: htmlTemplate,
    });

    return res.status(200).json({
      message: "Form submitted and email sent successfully",
      hubspotResult,
    });
  } catch (err) {
    console.error("Error:", err);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
}
