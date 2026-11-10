import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** All published posts, newest first. Drafts show up only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const visualBodies = import.meta.glob<string>('../content/visual/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** The hand-built HTML body of a `format: visual` post, or undefined for normal posts. */
export function visualHtml(post: Post): string | undefined {
  if (post.data.format !== 'visual') return undefined;
  const html = visualBodies[`../content/visual/${post.id}.html`];
  if (!html) throw new Error(`Post "${post.id}" has format: visual but src/content/visual/${post.id}.html is missing.`);
  return html;
}

const decode = (s: string) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** Readable text of a post (for search and reading time), whatever its format. */
export function postText(post: Post): string {
  const html = visualHtml(post);
  if (!html) return post.body ?? '';
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');
}

/** Section headings of a visual post: <h2 id="...">, with the number badge turned into "1. ". */
export function visualHeadings(html: string): { depth: number; slug: string; text: string }[] {
  return [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    depth: 2,
    slug: m[1],
    text: decode(m[2].replace(/<span class="n">(\d+)<\/span>/, '$1. ').replace(/<[^>]+>/g, '')).trim(),
  }));
}

export function readingTime(body = ''): number {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function postUrl(post: Post): string {
  return `/writing/${post.id}/`;
}
