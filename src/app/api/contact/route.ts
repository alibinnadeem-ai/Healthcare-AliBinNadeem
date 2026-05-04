import { NextResponse } from "next/server";

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

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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

  if (process.env.LEAD_WEBHOOK_URL) {
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

  console.info("CONTACT_LEAD", lead);

  return NextResponse.json({ success: true });
}
