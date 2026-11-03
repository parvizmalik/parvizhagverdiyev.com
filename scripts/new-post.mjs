// Usage: npm run new -- "My post title" [essay|research|interview]
import { writeFileSync, existsSync } from 'node:fs';

const [title, type = 'essay'] = process.argv.slice(2);
if (!title) {
  console.error('Usage: npm run new -- "My post title" [essay|research|interview]');
  process.exit(1);
}
if (!['essay', 'research', 'interview'].includes(type)) {
  console.error(`Unknown type "${type}". Use essay, research or interview.`);
  process.exit(1);
}
const slug = title.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const file = `src/content/posts/${slug}.md`;
if (existsSync(file)) { console.error(`${file} already exists.`); process.exit(1); }
const today = new Date().toISOString().slice(0, 10);
writeFileSync(file, `---
title: ${JSON.stringify(title)}
description: ""
date: ${today}
type: ${type}
tags: []
${type === 'interview' ? 'guest: ""\n' : ''}draft: true
---

Start writing here.
`);
console.log(`Created ${file}. It's a draft: set draft: false when it's ready to publish.`);
