import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.enum(['essay', 'research', 'interview']).default('essay'),
    tags: z.array(z.string()).default([]),
    // Interviews: who you spoke with (optional).
    guest: z.string().optional(),
    // Research: link to a PDF / paper (optional).
    pdf: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    toc: z.boolean().default(true),
    // 'visual' posts take their body from src/content/visual/<slug>.html
    // (cards, diagrams, terminal blocks) instead of the Markdown below the front matter.
    format: z.enum(['article', 'visual']).default('article'),
  }),
});

export const collections = { posts };
