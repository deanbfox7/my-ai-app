import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";
import { VideoAnalysisSchema } from "@/lib/schemas";

const MODEL = "gemini-2.5-pro-preview-06-05";
export const maxDuration = 300;

const RequestSchema = z.object({
  youtubeUrl: z.string().url().refine(url => url.includes("youtube.com") || url.includes("youtu.be")),
  targetAudience: z.string().optional().default("general audience"),
  tone: z.enum(["educational", "entertaining", "inspirational", "controversial"]).optional().default("entertaining"),
});

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) return new Response("Invalid request", { status: 400 });

  const { youtubeUrl, targetAudience, tone } = parsed.data;

  const result = streamObject({
    model: google(MODEL),
    schema: VideoAnalysisSchema,
    system: "You are an elite viral content strategist.",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `Analyze this video: ${youtubeUrl} for ${targetAudience} with a ${tone} tone.` },
          { type: "file", data: youtubeUrl, mimeType: "video/mp4" },
        ],
      },
    ],
  });

  return result.toTextStreamResponse();
}
