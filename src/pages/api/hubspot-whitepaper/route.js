import { NextResponse } from "next/server";

const HUBSPOT_CONTACT_API = process.env.HUBSPOT_CONTACT_API_WHITEPAPER;

export async function POST(req) {
  try {
    const payload = await req.json(); 

    const res = await fetch(
        HUBSPOT_CONTACT_API,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "HubSpot submission failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
