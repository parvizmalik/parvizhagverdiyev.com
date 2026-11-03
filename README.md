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

The three files whose names start with `sample-`, plus `welcome.md`, are examples. Delete them once you've written your own posts.

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

`npm run build` writes the finished site to `dist/`. Any static host can serve that folder.

### Option A: Netlify or Vercel (easiest)

1. Push this folder to a GitHub repository.
2. On [netlify.com](https://netlify.com) or [vercel.com](https://vercel.com), choose **Import from GitHub** and pick the repository. They detect Astro automatically: the build command is `npm run build` and the output folder is `dist`.
3. Under **Domains**, add `parvizhagverdiyev.com` and follow the DNS instructions your domain registrar needs.

Each push to GitHub then republishes the site within about a minute.

### Option B: GitHub Pages (free)

1. Push this folder to a GitHub repository on the `main` branch.
2. In the repository, go to **Settings → Pages → Source** and choose **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.
3. Under **Settings → Pages → Custom domain**, enter `parvizhagverdiyev.com`. (The `public/CNAME` file is already set.)
4. At your domain registrar, add these DNS records:
   - `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - a `CNAME` record for `www` pointing to `<your-github-username>.github.io`
5. Once the domain is verified, tick **Enforce HTTPS**.

If you end up using a different domain, change it in three places: `astro.config.mjs` (`site`), `src/site.config.ts` (`url`), and `public/CNAME`.
