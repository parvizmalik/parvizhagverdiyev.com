---
title: "Sample research post: formatting guide"
description: A template showing headings, footnotes, tables, figures, quotes and citations. Copy it when you write research.
date: 2026-10-20
type: research
tags: [template, methods]
# pdf: /papers/my-paper.pdf   # put the PDF in /public/papers/ and uncomment
---

*This is a sample post that shows how research posts are formatted. Delete `src/content/posts/sample-research.md` when you no longer need it.*

## Summary

Open with a short paragraph that states the question, the approach and the main finding. Readers who stop here should still leave with the core idea.

## Background

Footnotes work like this.[^1] They're numbered automatically and collected at the bottom of the post, with links back to where they appear.

> Block quotes are good for quoting a source directly or pulling out a key passage.

## Method

Use numbered lists for steps:

1. Define the question precisely.
2. Collect the data.
3. Analyze, then check the analysis against an independent sample.

Tables are useful for results:

| Condition | n   | Mean | 95% CI       |
| --------- | --- | ---- | ------------ |
| Control   | 120 | 4.2  | [3.9, 4.5]   |
| Treatment | 118 | 5.1  | [4.8, 5.4]   |

*(The numbers above are placeholders.)*

## Findings

### A sub-finding

Level-three headings show up indented in the table of contents. The table of contents appears automatically once a post has three or more sections. To turn it off for a post, add `toc: false` to its front matter.

Inline `code` and code blocks are supported:

```python
def effect_size(m1, m2, sd):
    return (m2 - m1) / sd
```

## Discussion

Research posts include a **Cite this** box at the bottom that generates BibTeX automatically.

---

Use a horizontal rule (`---`) to mark a section break.

[^1]: This is a footnote. It can contain [links](https://example.com) and *formatting*.
