import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email, firstName, lastName, date, time, timezone, companyWebsite } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Infrasity Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Meeting is Scheduled`,
      html: `
        <p>Hi ${firstName} ${lastName},</p>
        <p>Your meeting has been successfully scheduled with us.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time} (${timezone})</p>
        <p><strong>Company Website:</strong> ${companyWebsite}</p>
        <p>We’ll get in touch soon. Thanks!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });

  } catch (err) {
    console.error("Error sending confirmation email:", err);
    res.status(500).json({ message: "Failed to send confirmation email" });
  }
}
