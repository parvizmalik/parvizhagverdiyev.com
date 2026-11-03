# parvizhagverdiyev.com

The personal site of Parviz Hagverdiyev, a minimal blog for research, interviews and essays.
It's built with [Astro](https://astro.build) and generates plain static HTML: no database, no server and no tracking.

## Features

- Clean serif typography with automatic **dark mode** and a manual toggle
- Three types of writing (**Essays, Research, Interviews**) with filter tabs
- **Instant search**: press `/` or `Ctrl/⌘ K`
- **Table of contents** that follows you as you scroll, plus a reading progress bar
- Footnotes, tables, code highlighting, block quotes and heading anchor links
- **Cite this** (BibTeX) box on research posts
- Copy link, native share sheet on phones, and share buttons for X and LinkedIn
- Topics (tags), an RSS feed, a sitemap, SEO and social-preview tags
- Drafts that appear only on your computer, never on the live site

## Write a post

Every post is one Markdown file in `src/content/posts/`. The file name becomes the URL:
`my-first-essay.md` becomes `parvizhagverdiyev.com/writing/my-first-essay/`.

```bash
npm run new -- "My first essay" essay        # or: research, interview
```

This creates a file that starts like this:

```markdown
---
title: "My first essay"
description: "One sentence shown under the title and in the post list."
date: 2026-11-03
type: essay            # essay | research | interview
tags: [ai, policy]
guest: "Jane Doe"      # interviews only (optional)
pdf: /papers/x.pdf     # research only: put the file in public/papers/ (optional)
featured: true         # show it in the "Featured" box on the home page (optional)
draft: true            # remove this line, or set it to false, to publish
---

Your text here. **Bold**, *italic*, [links](https://…), footnotes[^1]…

[^1]: Like this.
```

Put images in `public/images/` and reference them as `![Alt text](/images/photo.jpg)`.

Diagrams can be written as inline SVG inside a `<figure class="diagram">` block (see `llms-cant-jump.md`), and math as `$$ ... $$` (LaTeX).

## Edit your name, bio and links

- Name, intro sentence, email and social links: `src/site.config.ts`
- About page: `src/pages/about.md`
- Colors and fonts: the top of `src/styles/global.css`

## Run it on your computer

Install [Node.js](https://nodejs.org) 20 or newer, then:

```bash
npm install
npm run dev        # opens http://localhost:4321 and reloads as you edit
```

## Publish it

The site runs on **Cloudflare Workers** (static assets), and the domain is registered with **Cloudflare**.
Cloudflare is connected to the GitHub repository, so every change pushed to the `main` branch
republishes the site automatically within a minute or two.

Cloudflare build settings (Worker name `parvizhagverdiyev-com`, matching `wrangler.jsonc`):

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Path (root directory) | `/` |

If you end up using a different domain, change it in `astro.config.mjs` (`site`), `src/site.config.ts` (`url`) and `public/robots.txt`.
