import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const payload = req.body;

  try {
    const response = await fetch(process.env.HUBSPOT_CONTACT_API_WHITEPAPER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "HubSpot error", details: result });
    }

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
        <title>Infrasity Reddit B2B Marketing Playbook 2025 | Infrasity</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 40px;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="background: rgba(95,100,255,0.1); border-radius:8px; overflow:hidden;">
          <tr>
            <td style="padding: 30px;">
              <img src="https://infrasity.com/logodata/infrasity_logo.png" alt="Infrasity" width="100" style="margin-bottom:20px;" />
    
              <p>Hi ${payload.fields[0].value || "there"},</p>
    
              <p>
                Thanks for requesting a copy of <strong>Infrasity’s Reddit B2B Marketing Playbook</strong>. You can grab your copy here:
              </p>
    
              <p style="margin-top:20px; text-align:center;">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">
      <tr>
        <td align="center" style="border-radius:6px; overflow:hidden;">
          <a href="https://drive.google.com/uc?export=download&id=1HBGgOsb7I3zzJ7qanfZxbqsOneh5Zf4f"
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
                <li>Turn Reddit threads into demo calls, feedback loops, and signups</li>
                <li>Avoid the dreaded <strong>ban hammer</strong> with safe, proven strategies</li>
                <li>Use the Karma system (without wasting time farming points)</li>
                <li>Drop links that stick instead of getting flagged</li>
                <li>Write comments with the right <strong>tone and timing</strong> including real examples of posts that worked</li>
              </ul>
              <p>
  This isn’t theory — it’s built from <strong>500+ comments</strong> across <strong>25+ subreddits</strong> and tested with leading <strong>AI</strong>, <strong>Infra</strong>, and <strong>DevTools</strong> startups.
</p>

<p><strong>Why this matters:</strong></p>

<p>
  Most B2B founders ignore Reddit and miss out on <strong>trust</strong>, <strong>traffic</strong>, and <strong>conversations</strong>. 
  Our playbook shows exactly how <strong>YC-backed companies</strong> and startups like <strong>Firefly</strong>, <strong>Kubiya</strong>, and <strong>Scalekit</strong> turned Reddit into a reliable <strong>GTM channel</strong> — without spending a single dollar on ads.
</p>
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
      subject: "Infrasity Reddit B2B Marketing Playbook 2025",
      html: htmlTemplate,
    });

    return res
      .status(200)
      .json({ message: "Form submitted successfully", result });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
}
