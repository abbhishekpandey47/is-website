import nodemailer from "nodemailer";
import { google } from "googleapis";

// Parse a timezone string like "UTC-04:00" or "+05:30" into minutes offset from UTC
const parseOffsetMinutes = (timezone) => {
  const tz = String(timezone || "").trim();
  const match = tz.match(/^(?:UTC)?([+-])(\d{2}):(\d{2})$/i);
  if (!match) return null;
  const sign = match[1] === "+" ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3], 10);
  return sign * (hours * 60 + minutes);
};

// Build an ISO string that includes the provided offset (e.g., 2025-12-25T23:30:00-04:00)
const buildIsoWithOffset = (utcDate, offsetMinutes) => {
  const localMs = utcDate.getTime() + offsetMinutes * 60000;
  const local = new Date(localMs);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  const year = local.getUTCFullYear();
  const month = String(local.getUTCMonth() + 1).padStart(2, "0");
  const day = String(local.getUTCDate()).padStart(2, "0");
  const hours = String(local.getUTCHours()).padStart(2, "0");
  const minutes = String(local.getUTCMinutes()).padStart(2, "0");
  const seconds = String(local.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${hh}:${mm}`;
};

// Parse date/time in the user's timezone offset into a UTC Date
const parseDateTimeInTimezone = (dateStr, timeStr, timezone) => {
  try {
    const offsetMinutes = parseOffsetMinutes(timezone);
    if (offsetMinutes === null) {
      throw new Error("Unsupported timezone format. Expected UTC±HH:MM");
    }

    const [timeOnly, period] = (timeStr || "").trim().split(" ");
    if (!timeOnly || !period) throw new Error("Time must be in 'HH:MM AM/PM' format");

    const [hours, minutes] = timeOnly.split(":");
    let hour24 = parseInt(hours, 10);
    const minuteVal = parseInt(minutes, 10);
    if (Number.isNaN(hour24) || Number.isNaN(minuteVal)) throw new Error("Invalid hour/minute");

    if (period.toUpperCase() === "PM" && hour24 !== 12) hour24 += 12;
    else if (period.toUpperCase() === "AM" && hour24 === 12) hour24 = 0;

    const [y, m, d] = (dateStr || "").split("-").map((v) => parseInt(v, 10));
    if ([y, m, d].some((n) => Number.isNaN(n))) throw new Error("Invalid date");

    // Create a UTC timestamp from the user's local time by subtracting the offset
    const utcMs = Date.UTC(y, m - 1, d, hour24, minuteVal) - offsetMinutes * 60000;
    const utcDate = new Date(utcMs);
    if (Number.isNaN(utcDate.getTime())) throw new Error("Invalid constructed date");

    return { utcDate, offsetMinutes };
  } catch (error) {
    console.error("Error parsing date/time with timezone:", error);
    throw new Error(`Invalid date/time: ${error.message}`);
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email, firstName, lastName, date, time, timezone, companyWebsite } = req.body;


  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
    });

    try {
      await oauth2Client.getAccessToken();
    } catch (tokenError) {
      console.error('Token refresh error:', tokenError);
      throw new Error('Failed to refresh Google API access token');
    }

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const { utcDate: startDateTime, offsetMinutes } = parseDateTimeInTimezone(date, time, timezone);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const calendarTimezone = timezone; // keep the provided offset/IANA string

    const isoStart = buildIsoWithOffset(startDateTime, offsetMinutes);
    const isoEnd = buildIsoWithOffset(endDateTime, offsetMinutes);

    console.log('Meeting details:', {
      originalDate: date,
      originalTime: time,
      timezone: timezone,
      calendarTimezone: calendarTimezone,
      localDateTime: isoStart,
    });

    const event = {
      summary: `Infrasity Team Meeting with ${firstName} ${lastName}`,
      description: `Meeting with ${firstName} ${lastName}${companyWebsite ? ` from ${companyWebsite}` : ''}\n\nScheduled for: ${time} ${calendarTimezone}`,
      start: {
        dateTime: isoStart,
        timeZone: calendarTimezone,
      },
      end: {
        dateTime: isoEnd,
        timeZone: calendarTimezone,
      },
      attendees: [
        { email: email },
        { email: process.env.EMAIL_USER },
      ],
      conferenceData: {
        createRequest: {
          requestId: `meeting-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
      transparency: 'opaque',
      visibility: 'default'
    };

    console.log('Event being created:', {
      startDateTime: event.start.dateTime,
      startTimezone: event.start.timeZone,
      endDateTime: event.end.dateTime,
      endTimezone: event.end.timeZone,
      userTimezone: timezone,
      formattedTimezone: calendarTimezone
    });

    const calendarResponse = await Promise.race([
      calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Calendar API timeout')), 30000)
      )
    ]);

    const meetingLink = calendarResponse.data.hangoutLink || calendarResponse.data.htmlLink;
    const eventId = calendarResponse.data.id;

    // Build display time from the offset-aware ISO string to avoid double-applying offsets
    const userLocalDate = new Date(isoStart);

    const formattedDate = userLocalDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = userLocalDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 10,
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      throw new Error('Email service configuration error');
    }

    const mailOptions = {
      from: `"Infrasity Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Meeting Confirmed with Infrasity Team - ${formattedDate} at ${formattedTime}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin-bottom: 10px;">Hi ${firstName}! Your Meeting is Confirmed! 🎉</h1>
            <p style="color: #7f8c8d; font-size: 16px;">Your meeting with the Infrasity Team has been successfully scheduled</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #2c3e50; margin-top: 0; margin-bottom: 20px;">Meeting Details</h2>
            
            <div style="margin-bottom: 15px;">
              <span style="font-weight: bold; color: #34495e; display: inline-block; width: 120px;">Meeting with:</span>
              <span style="color: #2c3e50;">Infrasity Team</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="font-weight: bold; color: #34495e; display: inline-block; width: 120px;">Your Name:</span>
              <span style="color: #2c3e50;">${firstName} ${lastName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="font-weight: bold; color: #34495e; display: inline-block; width: 120px;">Date:</span>
              <span style="color: #2c3e50;">${formattedDate}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="font-weight: bold; color: #34495e; display: inline-block; width: 120px;">Time:</span>
              <span style="color: #2c3e50;">${formattedTime} (${timezone})</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="font-weight: bold; color: #34495e; display: inline-block; width: 120px;">Duration:</span>
              <span style="color: #2c3e50;">30 minutes</span>
            </div>
            
            ${companyWebsite ? `
            <div style="margin-bottom: 15px;">
              <span style="font-weight: bold; color: #34495e; display: inline-block; width: 120px;">Your Company:</span>
              <span style="color: #2c3e50;">${companyWebsite}</span>
            </div>` : ''}
          </div>
          
          <div style="text-align: center; margin-bottom: 25px;">
            <a href="${meetingLink}" 
               style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-right: 10px;">
              📞 Join Meeting
            </a>
            <a href="${calendarResponse.data.htmlLink}" 
               style="background-color: #27ae60; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              📅 View in Calendar
            </a>
          </div>
          
          <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2c3e50; margin-top: 0;">What to Expect:</h3>
            <ul style="color: #34495e; line-height: 1.6;">
              <li>A calendar invitation has been sent to your email (${email})</li>
              <li>You'll receive reminder notifications before the meeting</li>
              <li>Click the "Join Meeting" button above when it's time</li>
              <li>Our team will discuss your requirements and how Infrasity can help</li>
            </ul>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">
              <strong>Need to reschedule?</strong> Please reply to this email or contact us at least 24 hours before the meeting.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
            <p style="color: #7f8c8d; margin: 0;">
              Thank you ${firstName} for choosing Infrasity! We're looking forward to speaking with you.<br>
              <strong>The Infrasity Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 30000)
      )
    ]);

    transporter.close();

    res.status(200).json({ 
      message: "Meeting scheduled and confirmation email sent successfully",
      meetingLink: meetingLink,
      eventId: eventId,
      calendarLink: calendarResponse.data.htmlLink,
      scheduledTime: {
        utc: startDateTime.toISOString(),
        displayTime: `${formattedDate} at ${formattedTime} (${timezone})`,
        timezone: calendarTimezone
      }
    });

  } catch (err) {
    console.error("Detailed error creating meeting or sending email:", {
      message: err.message,
      stack: err.stack,
      code: err.code
    });
    
    let errorMessage = "Failed to schedule meeting or send confirmation email";
    
    if (err.message.includes('Token') || err.message.includes('auth')) {
      errorMessage = "Authentication error with Google Calendar API";
    } else if (err.message.includes('timeout')) {
      errorMessage = "Request timed out - please try again";
    } else if (err.message.includes('network') || err.message.includes('ENOTFOUND')) {
      errorMessage = "Network connection error - please check your internet connection";
    } else if (err.message.includes('Invalid time')) {
      errorMessage = "Invalid date or time format provided";
    } else if (err.message.includes('Email service')) {
      errorMessage = "Email service configuration error";
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}