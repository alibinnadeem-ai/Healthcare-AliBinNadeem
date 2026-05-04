import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LeadPayload = {
  name: string;
  email: string;
  service?: string;
  message: string;
  createdAt: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultRecipient = "alibinnadeem.official@gmail.com";

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function sendLeadEmail(lead: LeadPayload) {
  const smtpHost = readString(process.env.SMTP_HOST);
  const smtpUser = readString(process.env.SMTP_USER);
  const smtpPass = readString(process.env.SMTP_PASS);

  if (!smtpHost || !smtpUser || !smtpPass) {
    return false;
  }

  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpSecure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const to = readString(process.env.LEAD_TO_EMAIL) || defaultRecipient;
  const from = readString(process.env.LEAD_FROM_EMAIL) || smtpUser;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number.isFinite(smtpPort) ? smtpPort : 587,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: lead.email,
    subject: `New Billing Inquiry: ${lead.name}`,
    text: [
      "New contact request received.",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Service: ${lead.service || "Not provided"}`,
      `Submitted: ${lead.createdAt}`,
      "",
      "Message:",
      lead.message
    ].join("\n"),
    html: `
      <h2>New contact request received</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Service:</strong> ${lead.service || "Not provided"}</p>
      <p><strong>Submitted:</strong> ${lead.createdAt}</p>
      <p><strong>Message:</strong></p>
      <p>${lead.message.replace(/\n/g, "<br />")}</p>
    `
  });

  return true;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = readString(body?.name);
  const email = readString(body?.email);
  const service = readString(body?.service);
  const message = readString(body?.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const lead: LeadPayload = {
    name,
    email,
    service,
    message,
    createdAt: new Date().toISOString()
  };

  try {
    const emailSent = await sendLeadEmail(lead);

    if (!emailSent && process.env.LEAD_WEBHOOK_URL) {
      const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Lead forwarding failed. Please try again." },
          { status: 502 }
        );
      }
    }

    console.info("CONTACT_LEAD", { ...lead, deliveredByEmail: emailSent });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT_LEAD_ERROR", error);
    return NextResponse.json(
      { error: "Could not send your request right now. Please try again." },
      { status: 500 }
    );
  }
}
