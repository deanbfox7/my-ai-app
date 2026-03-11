import { z } from "zod";

export const VideoAnalysisSchema = z.object({
  scripts: z.array(z.object({
    title: z.string(),
    targetPlatform: z.string(),
    hook: z.object({
      spoken: z.string(),
    }),
    body: z.array(z.object({
      line: z.string(),
    })),
  })),
});
