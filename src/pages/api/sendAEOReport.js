
import nodemailer from "nodemailer";
import dns from "dns/promises";
import { isEmail } from "validator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email } = req.body;
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
    // Configure your SMTP service here
   const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: process.env.GMAIL_USER,
           pass: process.env.GMAIL_APP_PASSWORD,
         },
       });

    await transporter.sendMail({
      from:  `"Infrasity" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your AEO Report is on the way!",
      text: "Thank you for requesting your AEO report. You will receive your detailed report within 7 days.",
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
