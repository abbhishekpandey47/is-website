import { GoogleGenerativeAI } from "@google/generative-ai";
import { videoTypePrompts } from "./prompt";

export default async function handler(req, res) {
  const allowedOrigins = ["https://infrasity.com", "http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt, toolsInvolved, targetAudience, videoType, videoLength } = req.body;

console.log("Prompt:", prompt);
console.log("Tools Involved:", toolsInvolved);
console.log("Target Audience:", targetAudience);
console.log("Video Type:", videoType);
    if (!prompt || !toolsInvolved || !Array.isArray(targetAudience) || targetAudience.length === 0 || !videoType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const systemMessageGenerator = videoTypePrompts[videoType];
    const systemMessage = systemMessageGenerator
      ? systemMessageGenerator({ toolsInvolved, targetAudience })
      : `You are an expert video scriptwriter for technical and AI content. Audience: ${targetAudience.join(", ")}.`;

    const fullPrompt = `${systemMessage}\n\nUser Prompt:\n${prompt}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(fullPrompt);
    const script = result.response.text().trim();

    console.log("Script" + script);

    res.status(200).json({ script });
  } catch (error) {
    console.error("Error generating script:", error);
    res.status(500).json({ error: "Failed to generate script" });
  }
}
