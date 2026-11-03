import type { Post } from './posts';
export function typeCounts(posts: Post[]): Record<string, number> {
  const c: Record<string, number> = { all: posts.length, essay: 0, research: 0, interview: 0 };
  for (const p of posts) c[p.data.type]++;
  return c;
}
