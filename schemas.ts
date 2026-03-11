import { z } from "zod";

export const VideoAnalysisSchema = z.object({
  sourceVideoSummary: z.object({
    title: z.string(),
    estimatedDuration: z.string(),
    mainTopics: z.array(z.string()),
    contentCategory: z.string(),
    contentScore: z.number().min(1).max(10),
    keyInsights: z.array(z.string()),
  }),
  scripts: z.array(z.object({
    title: z.string(),
    targetPlatform: z.string(),
    estimatedDuration: z.string(),
    viralAngle: z.string(),
    hook: z.object({
      spoken: z.string(),
      patternInterrupt: z.string(),
    }),
    body: z.array(z.object({
      line: z.string(),
      bRoll: z.string(),
    })),
    callToAction: z.object({
      spoken: z.string(),
    }),
    soundRecommendation: z.string(),
  })).length(5),
  seoMetadata: z.object({
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    hashtagSets: z.object({
      tiktok: z.array(z.string()),
      instagram: z.array(z.string()),
      youtube: z.array(z.string()),
    }),
    thumbnailTextSuggestions: z.array(z.string()),
    posting_schedule: z.object({
        bestDays: z.array(z.string()),
        bestTimes: z.array(z.string()),
        frequencyRecommendation: z.string()
    })
  }),
  contentStrategy: z.object({
    seriesOpportunity: z.string(),
    crossPlatformStrategy: z.string(),
    engagementHooks: z.array(z.string()),
  }),
});

export type VideoAnalysis = z.infer<typeof VideoAnalysisSchema>;
export type ShortFormScript = VideoAnalysis["scripts"][number];
