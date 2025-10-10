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
          <title>Developer Marketing Playbook 2025 | Infrasity</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 40px;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color:#fff; border-radius:8px; overflow:hidden;">
            <tr>
              <td style="padding: 30px;">
                <img src="https://infrasity.com/logodata/infrasity_logo.png" alt="Infrasity" width="100" style="margin-bottom:20px;" />

                <p>Hi ${payload.fields[0].value || "there"},</p>

                <p>
                  Thank you for requesting a copy of <strong>Infrasity’s Developer Marketing Playbook 2025</strong> — a complete guide to building trust, visibility, and growth in developer communities.
                </p>

                <p style="margin-top:20px; text-align:center;">
  <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">
    <tr>
      <td align="center" bgcolor="#5b36ff" style="border-radius:6px;">
        <a href="https://drive.google.com/uc?export=download&id=1g7crihLTZ_ikb0y_RVzZb1cLl2L4yNP2"
          style="display:inline-block; font-weight:bold; padding:14px 28px; font-size:16px; color:#ffffff; text-decoration:none; border-radius:6px; background:#5b36ff; font-family:Arial, sans-serif;">
          📘 DOWNLOAD THE PLAYBOOK
        </a>
      </td>
    </tr>
  </table>
</p>

                <p style="margin-top:20px;">
                  This playbook will help you understand real examples of how developer-focused marketing works in 2025 and how to position your brand effectively among technical audiences.
                </p>

                <img src="https://infrasity.com/playbook/playbook.png" alt="Playbook Preview" width="100%" style="margin:25px 0; border-radius:8px;" />

                <p>
                  Have any questions about applying these strategies for your brand?
                  Feel free to reply directly to this email — our team would love to connect.
                </p>

                <p style="margin-top:20px;">Best,<br />Team Infrasity</p>

                <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

                <p style="font-size: 14px; color: #777;">
                  Follow us on <a href="https://www.linkedin.com/company/infrasity" style="color:#5b36ff;">LinkedIn</a><br />
                  © ${new Date().getFullYear()} Infrasity. All rights reserved.<br />
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // 📬 Send the email
    await transporter.sendMail({
      from: `"Infrasity" <${process.env.GMAIL_USER}>`,
      to: payload.fields[2].value,
      subject: "🚀 Your Infrasity Developer Marketing Playbook 2025",
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
