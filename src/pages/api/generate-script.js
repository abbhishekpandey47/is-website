import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, 
});

export default async function handler(req, res) {
const allowedOrigins = [
    "https://infrasity.com",
    "http://localhost:3000"
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, toolsInvolved, selectedAudience, targetAudience } = req.body;

    if (!prompt || !toolsInvolved || selectedAudience.length === 0 || targetAudience.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const systemMessage = `
      You are an expert video scriptwriter for technical and AI content.
      Create an engaging, structured script based on the given inputs.
      Structure:
      - Hook (attention grabber)
      - Introduction
      - Main content sections (use examples with ${toolsInvolved})
      - Call to action
      - Closing
      Style: Keep it relevant for ${selectedAudience.join(", ")} but tailored to ${targetAudience.join(", ")}.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: 0.75,
      max_tokens: 800,
    });

    const script = completion.choices[0]?.message?.content?.trim() || "";
    console.log("Generated script:", script);

    res.status(200).json({ script });
  } catch (error) {
    console.error("Error generating script:", error);
    res.status(500).json({ error: "Failed to generate script" });
  }
}
