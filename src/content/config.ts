import { defineCollection, z } from 'astro:content';

const modules = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    moduleNumber: z.number(),
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const chapters = defineCollection({
  type: 'content',
  schema: z.object({
    moduleSlug: z.string(),
    chapterNumber: z.number(),
    title: z.string(),
    summary: z.string(),
    readingTimeMinutes: z.number(),
    contentType: z.enum(['Reading', 'Interactive Lab', 'Derivation']).default('Reading'),
    whereThisFits: z.string(),
    learningObjectives: z.array(z.string()),
    recapPoints: z.array(z.string()).optional(),
    actionStep: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = { modules, chapters };
