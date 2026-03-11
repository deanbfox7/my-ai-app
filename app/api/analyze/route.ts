import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { VideoAnalysisSchema } from "../../../lib/rules";

export const maxDuration = 300;

export async function POST(req: Request) {
  const { youtubeUrl } = await req.json();

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    return new Response("Missing API Key", { status: 500 });
  }

  const result = await streamObject({
    model: google("gemini-1.5-flash"),
    schema: VideoAnalysisSchema,
    prompt: `Analyze this YouTube video: ${youtubeUrl}. Create 5 viral short-form video scripts.`,
  });

  return result.toTextStreamResponse();
}
