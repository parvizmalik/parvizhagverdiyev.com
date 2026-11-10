import type { APIRoute } from 'astro';
import { getPosts, formatDate, postUrl, postText } from '../lib/posts';
import { TYPES } from '../site.config';

const plain = (md = '') =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[\^[^\]]+\]:?/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const data = posts.map((p) => ({
    title: p.data.title,
    url: postUrl(p),
    date: formatDate(p.data.date, 'short'),
    type: TYPES[p.data.type].singular,
    description: p.data.description ?? '',
    tags: p.data.tags,
    body: plain(postText(p)),
  }));
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
