import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { reddit_url } = body;
    const apiSecret = process.env.API_SECRET;
    const externalApiUrl = 'https://reddit-comment-gen.onrender.com/fetch_post_details';

    const res = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Secret': apiSecret,
      },
      body: JSON.stringify({ reddit_url }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
