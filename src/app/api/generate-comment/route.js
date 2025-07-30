import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { reddit_url } = body;
    const externalApiUrl = 'https://reddit-comment-gen.onrender.com/generate_comment';

    const res = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reddit_url }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
