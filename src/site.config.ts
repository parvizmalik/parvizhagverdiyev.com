// ─────────────────────────────────────────────────────────────
//  Edit this file to change your name, bio and social links.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Parviz Hagverdiyev',
  url: 'https://parvizhagverdiyev.com',
  description:
    'Telecom dev from Baku. I read the papers, dig into how stuff really works, and write it down in plain words.',
  // One or two sentences shown on the home page under your name.
  intro:
    'Telecom dev from Baku. I read the papers, dig into how stuff really works, and write it down in plain words.',
  email: '', // e.g. 'hello@parvizhagverdiyev.com' — leave empty to hide
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parviz-hagverdiyev-0b69a0114/' },
    { label: 'X', href: 'https://x.com/mrhagverdiyev' },
    { label: 'GitHub', href: 'https://github.com/parvizmalik' },
  ] as { label: string; href: string }[],
  // Cloudflare Web Analytics: private visitor stats, visible only in your Cloudflare account.
  // Paste the token from Cloudflare (Web Analytics -> your site -> "Manage site" snippet).
  // It is not a secret: it appears in every page's source. Leave empty to turn analytics off.
  cloudflareAnalyticsToken: '',
};

// The kinds of writing on the site. The key is what you put in a post's
// `type:` field; the label is what readers see.
export const TYPES = {
  essay: { label: 'Essays', singular: 'Essay' },
  research: { label: 'Research', singular: 'Research' },
  interview: { label: 'Interviews', singular: 'Interview' },
} as const;

export type PostType = keyof typeof TYPES;
