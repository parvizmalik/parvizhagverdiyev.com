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
  ] as { label: string; href: string }[],
};

// The kinds of writing on the site. The key is what you put in a post's
// `type:` field; the label is what readers see.
export const TYPES = {
  essay: { label: 'Essays', singular: 'Essay' },
  research: { label: 'Research', singular: 'Research' },
  interview: { label: 'Interviews', singular: 'Interview' },
} as const;

export type PostType = keyof typeof TYPES;
