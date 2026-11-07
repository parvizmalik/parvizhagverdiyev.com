---
title: "LLMs Can't Jump: The One Move AI Still Can't Pull Off"
description: "Today's AI can do the math of a scientific revolution, but it can't have the idea that starts one. A plain-words breakdown of the ICML 2026 position paper."
date: 2026-11-04
type: research
pdf: "https://openreview.net/attachment?id=klU4737opt&name=originally_submitted_PDF"
tags: [ai, llms, physics, paper-breakdown]
---

## TL;DR

Today's AI can do the math of a scientific revolution, but it can't have the idea that starts one. That's the whole point of the paper, and this post unpacks why.

- Einstein described discovery as a loop: start from real-world experience, jump to new base rules, then use logic to see what follows.
- AI is a beast at two of the three thinking moves: induction (finding patterns) and deduction (proving things from rules).
- It's missing the third move: **abduction**. That's the jump that invents brand-new rules when there's almost no data to learn from.
- The paper uses Einstein's General Relativity as a test case. Verdict: an LLM could plausibly do Einstein's 1915 math. It could not have had his 1907 idea.
- The proposed fix: give AI a physical world it can poke and play with (interactive world models), not just more text.

The paper: [Position: LLMs can't jump](https://proceedings.mlr.press/v306/zahavy26a.html), Tom Zahavy, Google DeepMind, ICML 2026. [Read the full paper (PDF)](https://openreview.net/attachment?id=klU4737opt&name=originally_submitted_PDF).

## Quick thought experiment: send GPT back to 1907

Picture this. We take the best LLM on the planet and drop it in the year 1907. We feed it every physics book, every paper, every letter written so far. Then we ask: "Yo, invent General Relativity."

Does it cook? The paper says no. Not because the model is dumb. It's actually elite at most of the work. It's missing one specific move, and that move is the one that matters most.

Plot twist: the author is not some random AI hater. Tom Zahavy is a researcher at Google DeepMind, and his name is on the AlphaProof paper, the system that reached silver-medal level at the International Math Olympiad. So this is a builder telling us exactly where the wall is. That's why it's worth reading.

I'm not going to cover every detail of the paper. I'm zooming in on one idea only: the jump. What it is, why AI can't do it yet, and what might fix it. Grab a coffee, this one goes deep.

## Einstein's napkin: the E → J → A loop

In 1952 Einstein wrote a letter to his old friend Maurice Solovine. In it he drew a tiny sketch of how new science gets made. Think of it as the system design diagram of discovery. The whole paper is built on top of it.

<figure class="diagram"><div class="canvas"><svg viewBox="0 0 520 290" role="img" aria-labelledby="f1-t"><title id="f1-t">Einstein's discovery loop</title><defs><marker id="f1-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head"/></marker><marker id="f1-ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head ac"/></marker></defs><path d="M30 250 H500" class="ln fg"/><text x="30" y="276" text-anchor="start" class="b">E · sense experience</text><text x="196" y="276" text-anchor="start" class="m">(the real world)</text><rect x="150" y="34" width="120" height="40" rx="7" class="box "/><text x="210.0" y="59.0" text-anchor="middle" class="b">A · axioms</text><text x="282" y="58" text-anchor="start" class="m">logic flows down</text><rect x="250" y="135" width="70" height="34" rx="7" class="box soft"/><text x="285.0" y="157.0" text-anchor="middle" class="">S</text><path d="M210 74 L285 133" class="ln " marker-end="url(#f1-h)"/><path d="M285 169 L285 246" class="ln dash" marker-end="url(#f1-h)"/><rect x="340" y="135" width="70" height="34" rx="7" class="box soft"/><text x="375.0" y="157.0" text-anchor="middle" class="">S′</text><path d="M210 74 L375 133" class="ln " marker-end="url(#f1-h)"/><path d="M375 169 L375 246" class="ln dash" marker-end="url(#f1-h)"/><rect x="430" y="135" width="70" height="34" rx="7" class="box soft"/><text x="465.0" y="157.0" text-anchor="middle" class="">S″</text><path d="M210 74 L465 133" class="ln " marker-end="url(#f1-h)"/><path d="M465 169 L465 246" class="ln dash" marker-end="url(#f1-h)"/><text x="240" y="157" text-anchor="end" class="m">statements</text><text x="292" y="214" text-anchor="start" class="m">test</text><path d="M62 248 C 48 170, 80 95, 146 58" class="ln ac" marker-end="url(#f1-ha)"/><text x="84" y="198" text-anchor="start" class="ac b">J · the jump</text><text x="84" y="215" text-anchor="start" class="m">no logical path</text></svg></div><figcaption><b>Einstein’s discovery loop.</b> Logic flows down from A and gets checked against E. Only the colored arrow, the jump, has no logic behind it.</figcaption></figure>

Here are the parts:

- *E = Sense experience.* The real world. What you see, feel and measure. The ground floor.
- *J = the Jump.* A leap from experience up to brand-new base ideas. No step-by-step logic gets you there.
- *A = Axioms.* The base rules of a theory. The config file that everything else loads from.
- *S = Statements.* What you can derive from the axioms with pure logic: theorems and predictions.
- *Back to E.* You test the predictions against the real world. Match? The theory lives. No match? Back to the drawing board.

The key detail is the J arrow. Einstein said there is **no logical road** from E up to A. And it makes sense: axioms are where logic *starts*. Logic can't produce its own starting point. You have to jump.

Dev translation:

- *S → E* is running your test suite.
- *A → S* is the code executing.
- *E → A* is writing the spec for a system nobody has ever built, with no requirements doc. Nobody hands you that. You have to *see* it.

Hold on to this picture. Every section below is about one arrow in it.

## The 3 ways to think, explained like code

There are exactly three thinking moves, and AI has only two of them. The paper borrows this split from the philosopher Charles Peirce, and it maps onto code almost perfectly. Every piece of reasoning juggles three things:

- *Rule* = the function definition
- *Case* = the input
- *Result* = the return value

```python
def api_status(db_is_down):   # Rule: if the DB is down, the API returns 500
    return 500 if db_is_down else 200

api_status(True)              # Case: the DB is down
# -> 500                      # Result
```

Change which two pieces you have and which one you need, and you get three totally different moves:

| Move | You have | You find | Dev version | Can it be wrong? | AI in 2026 |
| --- | --- | --- | --- | --- | --- |
| Deduction | Rule + Case | Result | Run the function. DB is down, so the API returns 500. | No, if the rule is right | Crushing it (AlphaProof, Lean, Olympiad gold) |
| Induction | Case + Result | Rule | You saw "DB down + 500" a thousand times, so you write the rule. This is ML training. | Yes, patterns can lie | Mastered. This is literally what an LLM is |
| Abduction | Rule + Result | Case, or a brand-new Rule | Prod throws weird errors at 3 a.m. You guess a cause. | Yes, it's a bet | Missing. **This is the jump** |

Quick vibe check on each:

- *Deduction* is the only move that *guarantees* truth. If the rule and the input are right, the output is right. Zero creativity, 100% safe.
- *Induction* builds rules from piles of examples. Super powerful, but it needs data, lots of it. No data, no rule.
- *Abduction* invents an explanation for something surprising. It's a creative leap. It can be wrong. But it's the only move that adds a truly *new* idea to the system.

### Two flavors of abduction (this matters a lot)

Not all guessing is equal. There are two levels:

1. *Picking from the menu.* You see the symptoms and choose the most likely *known* cause. "500 errors again? It's the DB, bro." LLMs are lowkey decent at this, because the menu is in their training data.
2. *Cooking a dish that isn't on any menu.* The right cause has never been written down by anyone. You have to invent it from scratch. That's Einstein's move. And that's the one the paper says LLMs can't do.

So when someone says "but ChatGPT debugged my code by guessing the cause," that's flavor 1. The paper is talking about flavor 2.

## Boss fight #1: "Just compress the data, bro"

Induction can't find the jump, because in 1907 there was no error to learn from. Let's see why.

A popular idea in AI says discovery *is* compression. Jürgen Schmidhuber argued that the joy of science is finding a shorter program that explains your data. Find the pattern, squeeze the data, new law unlocked. That's pure induction.

To be fair, it works when data is rich. Algorithms have pulled differential equations straight out of measurements. An "AI Physicist" re-discovered conservation laws from simulated motion. Real W's.

Now look at Newton's report card in 1907:

- Newton's gravity worked insanely well. Planets, tides, cannonballs, all good.
- The fact that every object falls at the same rate (inertial mass = gravitational mass) was checked by Newton to about 1 part in 1,000. Eötvös later pushed it to about 1 part in a billion.
- There was just one known bug: Mercury's orbit slowly drifts more than Newton predicts.
- And even that bug had a patch. Scientists guessed a hidden planet near the Sun, nicknamed Vulcan, was pulling on Mercury.

Now think like a training loop:

```text
loss      ≈ 0     # Newton fits almost everything
gradient  ≈ 0     # nothing pushes the model to change
optimizer: "ok, I'm chilling"
```

No error signal means no gradient. No gradient means no reason to rebuild space and time. The paper's point is simple: an inductive AI in 1907 would look at Newton, see near-zero loss, and do nothing.

<figure class="diagram"><div class="canvas"><svg viewBox="0 0 520 322" role="img" aria-labelledby="f2-t"><title id="f2-t">Two answers to Mercury's bug: patch versus rebuild</title><defs><marker id="f2-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head"/></marker><marker id="f2-ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head ac"/></marker></defs><rect x="110" y="10" width="300" height="52" rx="7" class="box "/><text x="260.0" y="32.0" text-anchor="middle" class="b">Mercury's orbit drifts</text><text x="260.0" y="50.0" text-anchor="middle" class="m">a bit more than Newton predicts</text><text x="135" y="102" text-anchor="middle" class="lbl">Patch · cheap</text><text x="385" y="102" text-anchor="middle" class="lbl">Rebuild · expensive</text><path d="M200 62 L140 86" class="ln " marker-end="url(#f2-h)"/><path d="M320 62 L380 86" class="ln ac" marker-end="url(#f2-ha)"/><rect x="20" y="112" width="230" height="50" rx="7" class="box soft"/><text x="135.0" y="133.0" text-anchor="middle" class="b">Add a hidden planet</text><text x="135.0" y="151.0" text-anchor="middle" class="m">“Vulcan”</text><rect x="270" y="112" width="230" height="50" rx="7" class="box "/><text x="385.0" y="133.0" text-anchor="middle" class="b">Rethink space and time</text><text x="385.0" y="151.0" text-anchor="middle" class="m">throw out the old axioms</text><path d="M135 162 L135 186" class="ln " marker-end="url(#f2-h)"/><path d="M385 162 L385 186" class="ln ac" marker-end="url(#f2-ha)"/><rect x="20" y="188" width="230" height="50" rx="7" class="box soft"/><text x="135.0" y="209.0" text-anchor="middle" class="b">Newton survives</text><text x="135.0" y="227.0" text-anchor="middle" class="m">one extra number, tests pass</text><rect x="270" y="188" width="230" height="50" rx="7" class="box "/><text x="385.0" y="209.0" text-anchor="middle" class="b">Messier first</text><text x="385.0" y="227.0" text-anchor="middle" class="m">curved geometry, 10 equations</text><path d="M135 238 L135 262" class="ln " marker-end="url(#f2-h)"/><path d="M385 238 L385 262" class="ln ac" marker-end="url(#f2-ha)"/><rect x="20" y="264" width="230" height="50" rx="7" class="box soft"/><text x="135.0" y="285.0" text-anchor="middle" class="b">Vulcan is never found</text><text x="135.0" y="303.0" text-anchor="middle" class="m">dead end ✗</text><rect x="270" y="264" width="230" height="50" rx="7" class="box ac"/><text x="385.0" y="285.0" text-anchor="middle" class="b">General Relativity</text><text x="385.0" y="303.0" text-anchor="middle" class="m">predicts the drift exactly ✓</text></svg></div><figcaption><b>Two answers to Mercury’s bug.</b> Both paths start from the same data. The left path is what a loss-minimizer picks, because it’s cheaper. Only the right path leads somewhere new.</figcaption></figure>

### The Vulcan move = the hacky `if` statement

Every dev has seen this. A test fails in one weird edge case. Instead of rethinking the design, someone adds one more `if`:

```python
if planet == "Mercury":
    orbit += vulcan_correction   # tests are green again, ship it
```

Cheapest fix. Tests pass. Totally wrong. That's what a compression machine prefers, because adding one parameter is "simpler" than rewriting the whole theory.

Real refactors are scary for the same reason: the code gets *messier* before it gets cleaner. General Relativity was exactly like that. To get there you first have to make physics MORE complex (curved geometry, ten tangled equations) before it turns elegant. A system that always climbs toward "simpler" will never walk into that valley on purpose.

### The proof came later

The data that proved Einstein right showed up *after* the theory. Eddington measured starlight bending around the Sun in 1919. Much later, GPS satellites needed relativity corrections to stay accurate. You can't compress data that doesn't exist yet.

One more problem: even when data exists, pattern machines can learn shortcuts. The paper points to research (Vafa et al., 2025) where foundation models predict the data well but build a broken picture of the world inside. Right answers, wrong reasons.

## Boss fight #2: "Fine, just give it a theorem prover"

Deduction can't find the jump either, because deduction needs the axioms as *input*. It can't produce them.

And here AI is honestly cracked. Proof assistants like Lean now come with huge math libraries. AlphaProof hit silver-medal level at the 2024 Math Olympiad. In 2025 several systems reached gold level, and one (Aristotle) produced verified solutions to open research questions.

The paper is generous here. It says: give a modern LLM the exact assumptions Einstein had in 1915, and it could plausibly derive General Relativity. Working out Mercury's orbit from the finished equations is a checkable logic task.

### Story time: the bug that cost Einstein two years

This part reads like a production incident.

1. *1912–1913.* Einstein teams up with his mathematician friend Marcel Grossmann. Grossmann finds the right math object for curved spacetime (the Riemann curvature tensor). He even builds something very close to the final answer.
2. *The test.* Any new theory must shrink back to Newton's simple gravity when gravity is weak and nothing moves fast. That's the backward-compatibility check.
3. *The fatal error.* Grossmann concludes the candidate fails that check. It didn't. The bug was a wrong assumption about what a "static" gravity field looks like. The math was fine.
4. *The rollback.* They throw away the correct path. Einstein ships the 1913 "Entwurf" (German for "sketch"): ten messy equations with no clean geometric meaning.
5. *Two years of grind.* By 1915 the evidence piles up. The Entwurf can't explain Mercury. It can't handle rotation. Einstein goes back to his 1912 idea: the theory must work in *every* coordinate system.
6. *November 1915 speedrun.* Racing the mathematician David Hilbert, Einstein sends a new paper to the Prussian Academy every week for four weeks. On November 18 his equations correctly predict Mercury's orbit. On November 25 he publishes the final field equations.

This is the final boss equation:

$$
R_{ik} - \frac{1}{2} g_{ik} R = -\kappa T_{ik}
$$

The left side is the shape of spacetime (curvature). The right side is the stuff in it (matter and energy). Stuff bends the shape, and the shape tells stuff how to move.

### Why this still doesn't count as a jump

The paper even thinks AI could have caught Grossmann's mistake, by testing subsets of the axioms one by one. Basically `git bisect` for assumptions. Nice.

But look closely at what failed in 1913. **The logic was fine. The axioms were wrong.** A deduction engine is a compiler. It compiles your spec perfectly. It cannot tell you what the spec should be.

<figure class="diagram"><div class="canvas"><svg viewBox="0 0 520 232" role="img" aria-labelledby="f3-t"><title id="f3-t">The deduction pipeline and the 1913 run that broke it</title><defs><marker id="f3-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head"/></marker><marker id="f3-ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head ac"/></marker></defs><text x="10" y="18" text-anchor="start" class="lbl">The pipeline</text><rect x="10" y="30" width="140" height="64" rx="7" class="box dash"/><text x="80.0" y="58.0" text-anchor="middle" class="b">Axioms</text><text x="80.0" y="76.0" text-anchor="middle" class="m">input · no AI author</text><rect x="190" y="30" width="140" height="64" rx="7" class="box ac"/><text x="260.0" y="58.0" text-anchor="middle" class="b">Deduction engine</text><text x="260.0" y="76.0" text-anchor="middle" class="m">Lean, AlphaProof</text><rect x="370" y="30" width="140" height="64" rx="7" class="box "/><text x="440.0" y="58.0" text-anchor="middle" class="b">Theory</text><text x="440.0" y="76.0" text-anchor="middle" class="m">theorems, predictions</text><path d="M150 62 L186 62" class="ln " marker-end="url(#f3-h)"/><path d="M330 62 L366 62" class="ln " marker-end="url(#f3-h)"/><text x="10" y="134" text-anchor="start" class="lbl">The 1913 run</text><rect x="10" y="146" width="140" height="74" rx="7" class="box dash"/><text x="80.0" y="171.0" text-anchor="middle" class="b ac">Wrong axiom</text><text x="80.0" y="188.0" text-anchor="middle" class="m">bad idea of a</text><text x="80.0" y="205.0" text-anchor="middle" class="m">“static” field</text><rect x="190" y="146" width="140" height="74" rx="7" class="box soft"/><text x="260.0" y="179.0" text-anchor="middle" class="b">Logic</text><text x="260.0" y="197.0" text-anchor="middle" class="m">worked fine ✓</text><rect x="370" y="146" width="140" height="74" rx="7" class="box soft"/><text x="440.0" y="171.0" text-anchor="middle" class="b">Entwurf theory</text><text x="440.0" y="188.0" text-anchor="middle" class="m">can’t explain</text><text x="440.0" y="205.0" text-anchor="middle" class="m">Mercury ✗</text><path d="M150 183 L186 183" class="ln " marker-end="url(#f3-h)"/><path d="M330 183 L366 183" class="ln " marker-end="url(#f3-h)"/></svg></div><figcaption><b>The deduction pipeline, and the 1913 run that broke it.</b> The engine in the middle is where AI shines. But garbage axioms in means garbage theory out, and the dashed box on the left has no AI author.</figcaption></figure>

Two more limits:

- *Spotting the bug ≠ writing the fix.* An AI could scan the literature and flag that Maxwell's constant speed of light clashes with Newton's absolute time, like a linter flagging buggy code. Choosing the *right new axioms* to resolve the clash is a different job.
- *No target ticket.* A theorem prover chases a stated conjecture: "prove X." Einstein had no X. He was building a model of reality from scratch. Deduction only works *downstream*, after someone decides what to build.

## The main event: what the jump actually looks like

Einstein got his key axiom not from data and not from logic, but from imagining a feeling. This is the heart of the paper, so let's go slow.

### 1907: the happiest thought

Einstein is writing a long review article about his relativity theory. Most of physics fits in nicely. Gravity doesn't. Then an idea hits him that he later called "the happiest thought of my life":

In plain words: **a person falling freely from a roof does not feel their own weight.**

In their small bubble, while they fall, gravity is just… gone. Drop your keys while you fall, and the keys float next to you.

### Level up: the elevator

Now put that feeling in a closed box with no windows.

- *Scene A: the box sits on Earth.* You let go of an apple and a hammer. Both drop to the floor with the same acceleration. Normal gravity.
- *Scene B: the box is in deep space,* far from any planet. A rocket pulls it "up" with a steady push. You let go of the apple and the hammer. From your view, they "fall" to the floor at the same rate. Really, the floor is rushing up to meet them.

From inside the box, you cannot tell A from B. No experiment in the box can tell them apart. Same feeling in your feet, same falling objects.

### The jump

A normal person says: "Huh, funny coincidence." Einstein said: if no experiment can *ever* tell them apart, then they are the same thing. Gravity and acceleration are one phenomenon, not two.

That's the **Equivalence Principle**. It's an axiom. It's not derived from anything. It's a jump.

And here's the wild part. The fact that everything falls at the same rate was known since Galileo. Newton measured it. For over 200 years it sat in the textbooks as a cute coincidence. Einstein's jump turned a boring old fact into a deep law of nature. **The data was there. The meaning wasn't.**

<figure class="diagram"><div class="canvas"><svg viewBox="0 0 520 488" role="img" aria-labelledby="f4-t"><title id="f4-t">The elevator thought experiment: from two scenes to one axiom</title><defs><marker id="f4-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head"/></marker><marker id="f4-ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head ac"/></marker></defs><text x="135" y="20" text-anchor="middle" class="b">A · box on Earth</text><rect x="75" y="34" width="120" height="116" rx="4" class="box"/><circle cx="113" cy="64" r="7" class="dot"/><rect x="150" y="57" width="14" height="14" rx="2" class="dot"/><path d="M113 78 L113 132" class="ln dash" marker-end="url(#f4-h)"/><path d="M157 78 L157 132" class="ln dash" marker-end="url(#f4-h)"/><text x="135" y="146" text-anchor="middle" class="m">same rate</text><text x="385" y="20" text-anchor="middle" class="b">B · rocket in deep space</text><rect x="325" y="34" width="120" height="116" rx="4" class="box"/><circle cx="363" cy="64" r="7" class="dot"/><rect x="400" y="57" width="14" height="14" rx="2" class="dot"/><path d="M363 78 L363 132" class="ln dash" marker-end="url(#f4-h)"/><path d="M407 78 L407 132" class="ln dash" marker-end="url(#f4-h)"/><text x="385" y="146" text-anchor="middle" class="m">same rate</text><path d="M60 162 H210" class="ln fg"/><text x="135" y="182" text-anchor="middle" class="m">Earth: gravity</text><path d="M385 190 L385 156" class="ln " marker-end="url(#f4-h)"/><text x="385" y="206" text-anchor="middle" class="m">steady push “up”</text><circle cx="300" cy="50" r="1.8" class="star"/><circle cx="468" cy="40" r="1.8" class="star"/><circle cx="470" cy="120" r="1.8" class="star"/><circle cx="296" cy="130" r="1.8" class="star"/><circle cx="452" cy="175" r="1.8" class="star"/><circle cx="318" cy="182" r="1.8" class="star"/><path d="M135 190 L210 232" class="ln " marker-end="url(#f4-h)"/><path d="M385 214 L320 234" class="ln " marker-end="url(#f4-h)"/><rect x="90" y="238" width="340" height="52" rx="7" class="box "/><text x="260.0" y="260.0" text-anchor="middle" class="b">From inside: identical</text><text x="260.0" y="278.0" text-anchor="middle" class="m">no experiment can tell A from B</text><path d="M260 292 L260 336" class="ln ac" marker-end="url(#f4-ha)"/><text x="272" y="319" text-anchor="start" class="ac b">J · the jump</text><rect x="90" y="340" width="340" height="54" rx="7" class="box ac"/><text x="260.0" y="363.0" text-anchor="middle" class="b">Equivalence Principle</text><text x="260.0" y="381.0" text-anchor="middle" class="m">gravity and acceleration are one thing</text><path d="M200 394 L150 424" class="ln " marker-end="url(#f4-h)"/><path d="M320 394 L370 424" class="ln " marker-end="url(#f4-h)"/><rect x="30" y="428" width="220" height="50" rx="7" class="box "/><text x="140.0" y="449.0" text-anchor="middle" class="b">Light bends near the Sun</text><text x="140.0" y="467.0" text-anchor="middle" class="m">confirmed 1919</text><rect x="270" y="428" width="220" height="50" rx="7" class="box "/><text x="380.0" y="449.0" text-anchor="middle" class="b">Clocks slow in gravity</text><text x="380.0" y="467.0" text-anchor="middle" class="m">GPS corrects for it daily</text></svg></div><figcaption><b>The elevator thought experiment.</b> Read it top to bottom: two scenes, one identical feeling, one jump, one axiom, and predictions nobody had checked yet.</figcaption></figure>

### The two stages of the jump, broken down

The paper splits Einstein's move into two steps.

*Stage 1: Simulate.* Invent a scene and run it in your head. Modern AI does something that looks similar: test-time reinforcement learning, where a system invents new versions of a problem and learns from solving them. That trick helped AI crack a famously hard chess puzzle, and it helped AlphaProof reach silver at the Math Olympiad.

But there's a huge difference. Chess and math variations stay inside fixed rules. Einstein's variation was not a shuffle of symbols. It was a shuffle of *physical experience*: the feeling of the floor pushing up, objects falling side by side.

> Chess engine: plays brilliantly inside the sandbox. Einstein: rewrote the sandbox's physics engine.

*Stage 2: Abduct.* Explain what you just imagined. And here Einstein hit a wall of silence: there were no words for this yet. No existing theory described it. He said himself that words and language didn't seem to play any role in how he thought.

So what did he use instead? A physical prior. The imagined feeling of being pushed by acceleration matched the remembered feeling of gravity. Same sensation, so same cause. The paper calls this manipulative abduction, a term from the philosopher Lorenzo Magnani. In plain words: thinking by doing.

### What the jump paid out

One axiom, tons of free predictions. If gravity *is* acceleration, then:

- *Light bends* near heavy objects (confirmed by Eddington in 1919).
- *Clocks tick slower* in strong gravity (your phone's GPS corrects for this every day).

That's the power of a good axiom. One line in the config file, and a whole new world of behavior follows.

## Why LLMs can't jump: all words, no world

An LLM can't jump because the jump starts from experience, and an LLM has never experienced anything. It only has text.

Think about the word "fall." An LLM knows "fall" sits close to "gravity," "apple," "Newton," "accelerate." It knows millions of sentences about falling. But it never felt that stomach drop when a fast elevator starts moving down. For the model, words only point to *other words*.

There's a classic name for this. Philosophers call it the Chinese Room: a person in a room follows a rulebook to answer Chinese messages perfectly, without understanding a single character. The scientist Stevan Harnad called the deeper issue the symbol grounding problem: symbols that never connect to the real things they stand for. The paper calls LLMs "high-dimensional Chinese Rooms." Fluent in the language of physics, zero contact with physics itself.

Einstein made the same point decades ago. In his view, concepts and logic only get real meaning through their link to sense experience. Cut that link and you're just moving symbols around.

### Put the LLM on Einstein's napkin

Here's the cleanest way to see it. Everything an LLM trains on is text. And text is *already* the top half of Einstein's diagram: concepts (A) and statements (S) that humans wrote down. Even a description of an experience is someone else's summary of it, not the experience.

<figure class="diagram"><div class="canvas"><svg viewBox="0 0 520 290" role="img" aria-labelledby="f5-t"><title id="f5-t">Einstein's discovery loop with the LLM's zone marked</title><defs><marker id="f5-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head"/></marker><marker id="f5-ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head ac"/></marker></defs><rect x="135" y="8" width="378" height="178" rx="10" class="zone"/><text x="503" y="30" text-anchor="end" class="ac b">Text · all an LLM ever sees</text><path d="M30 250 H500" class="ln fg"/><text x="30" y="276" text-anchor="start" class="b">E · sense experience</text><text x="196" y="276" text-anchor="start" class="m">(an LLM has never been here)</text><rect x="150" y="34" width="120" height="40" rx="7" class="box "/><text x="210.0" y="59.0" text-anchor="middle" class="b">A · axioms</text><text x="282" y="58" text-anchor="start" class="m">logic flows down</text><rect x="250" y="135" width="70" height="34" rx="7" class="box soft"/><text x="285.0" y="157.0" text-anchor="middle" class="">S</text><path d="M210 74 L285 133" class="ln " marker-end="url(#f5-h)"/><path d="M285 169 L285 246" class="ln dash" marker-end="url(#f5-h)"/><rect x="340" y="135" width="70" height="34" rx="7" class="box soft"/><text x="375.0" y="157.0" text-anchor="middle" class="">S′</text><path d="M210 74 L375 133" class="ln " marker-end="url(#f5-h)"/><path d="M375 169 L375 246" class="ln dash" marker-end="url(#f5-h)"/><rect x="430" y="135" width="70" height="34" rx="7" class="box soft"/><text x="465.0" y="157.0" text-anchor="middle" class="">S″</text><path d="M210 74 L465 133" class="ln " marker-end="url(#f5-h)"/><path d="M465 169 L465 246" class="ln dash" marker-end="url(#f5-h)"/><text x="240" y="157" text-anchor="end" class="m">statements</text><text x="292" y="214" text-anchor="start" class="m">test</text><path d="M62 248 C 48 170, 80 95, 146 58" class="ln ac" marker-end="url(#f5-ha)"/><text x="84" y="198" text-anchor="start" class="ac b">J · the jump</text><text x="84" y="215" text-anchor="start" class="m">no logical path</text></svg></div><figcaption><b>Einstein’s napkin, with the LLM’s zone marked.</b> Everything inside the colored zone is text, which is all an LLM ever sees. The jump arrow starts below it, in a place the model has never been.</figcaption></figure>

So the LLM is stuck upstairs. It can run the A → S arrow all day: derive, prove, remix. But the J arrow starts *downstairs*, at E. No E, no runway. No runway, no jump.

Other big names point at the same gap. Fei-Fei Li argues AI is missing spatial intelligence. Yann LeCun has long argued LLMs lack a real world model. And LLMs still fail some spatial puzzles that are trivial for toddlers.

### Even the fanciest AI scientists hit this wall

The paper looks at the most advanced automated-discovery systems right now:

- *Sakana's AI Scientist* runs the full research loop on its own. But it recombines *existing* concepts to push a metric. That's a very sophisticated Chinese Room.
- *DeepMind's AlphaEvolve* is a beast at optimization. But it needs a score to climb, a gradient. Einstein had no score. Newton's "loss" was already near zero.

Both are amazing inside a paradigm. Neither can leave it.

## So how do we teach AI to jump?

The paper's bet: give AI a **world model**, an internal simulation of physics that it can act inside, not just read about. Basically, give the LLM a downstairs.

But not every world model counts. The paper draws a hard line between *watching* and *doing*. Borrowing the "ladder of causation" from the computer scientist Judea Pearl, you can see it as three levels:

| Level | What the AI can do | Example | Enough to jump? |
| --- | --- | --- | --- |
| 1. Watch | Predict the next frame of a video | Video models like Veo | No. The apple falls because falling is the most common next frame in its training videos, not because it understands gravity |
| 2. Do | Take an action and see the world react | DeepMind's Genie, a world you can control | Getting close. This is "thinking by doing" |
| 3. Imagine "what if" | Change the world on purpose and run it | "What happens if I cut the elevator cable?" | Yes. This is Einstein's thought experiment |

The paper's line is sharp: to copy Einstein's elevator, an AI can't just *watch* a video of an elevator. It must be able to grab control of the simulation and cut the cable itself. And the sim must run on consistent physics in the model's internal space, not just pretty pixels that look right.

### The missing ingredient: strong hunches

There's one more piece. Einstein's physical prior didn't just help him imagine. It helped him filter. Out of a million possible axioms, his gut sense of gravity told him which ones felt right.

The paper notes that many revolutions were driven by strong hunches that came *before* any math. Kepler was sure, almost mystically, that the Sun sits at the center. So AI may need more than a simulator. It may need strong beliefs about how the world *should* work, and then use the simulator to test those beliefs.

### The full machine loop

Put all of it together and you get a mechanical version of Einstein's napkin:

<figure class="diagram"><div class="canvas"><svg viewBox="0 0 520 264" role="img" aria-labelledby="f6-t"><title id="f6-t">The proposed machine loop: six steps, one jump</title><defs><marker id="f6-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head"/></marker><marker id="f6-ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="head ac"/></marker></defs><rect x="10" y="30" width="150" height="84" rx="7" class="box soft"/><text x="85.0" y="59.0" text-anchor="middle" class="b">1. Priors</text><text x="85.0" y="77.0" text-anchor="middle" class="m">hunches about how</text><text x="85.0" y="95.0" text-anchor="middle" class="m">the world should work</text><rect x="185" y="30" width="150" height="84" rx="7" class="box "/><text x="260.0" y="59.0" text-anchor="middle" class="b">2. World model</text><text x="260.0" y="77.0" text-anchor="middle" class="m">a physics sim</text><text x="260.0" y="95.0" text-anchor="middle" class="m">it can act inside</text><text x="329" y="24" text-anchor="end" class="lbl">E</text><rect x="360" y="30" width="150" height="84" rx="7" class="box soft"/><text x="435.0" y="59.0" text-anchor="middle" class="b">3. What if?</text><text x="435.0" y="77.0" text-anchor="middle" class="m">change the sim,</text><text x="435.0" y="95.0" text-anchor="middle" class="m">watch what happens</text><rect x="360" y="168" width="150" height="84" rx="7" class="box ac"/><text x="435.0" y="197.0" text-anchor="middle" class="b ac">4. Jump</text><text x="435.0" y="215.0" text-anchor="middle" class="m">invent a new axiom</text><text x="435.0" y="233.0" text-anchor="middle" class="m">that explains it</text><text x="504" y="162" text-anchor="end" class="lbl">J</text><rect x="185" y="168" width="150" height="84" rx="7" class="box "/><text x="260.0" y="197.0" text-anchor="middle" class="b">5. Derive</text><text x="260.0" y="215.0" text-anchor="middle" class="m">logic: from the</text><text x="260.0" y="233.0" text-anchor="middle" class="m">axiom to predictions</text><text x="329" y="162" text-anchor="end" class="lbl">A → S</text><rect x="10" y="168" width="150" height="84" rx="7" class="box "/><text x="85.0" y="197.0" text-anchor="middle" class="b">6. Test</text><text x="85.0" y="215.0" text-anchor="middle" class="m">check predictions</text><text x="85.0" y="233.0" text-anchor="middle" class="m">against the world</text><text x="154" y="162" text-anchor="end" class="lbl">S → E</text><path d="M160 72 L181 72" class="ln " marker-end="url(#f6-h)"/><path d="M335 72 L356 72" class="ln " marker-end="url(#f6-h)"/><path d="M435 114 L435 158" class="ln ac" marker-end="url(#f6-ha)"/><path d="M360 210 L339 210" class="ln " marker-end="url(#f6-h)"/><path d="M185 210 L164 210" class="ln " marker-end="url(#f6-h)"/><path d="M85 168 L85 118" class="ln dash" marker-end="url(#f6-h)"/><text x="93" y="146" text-anchor="start" class="m">repeat</text></svg></div><figcaption><b>The proposed machine loop.</b> It’s the same napkin, rebuilt with parts. The world model plays the role of E, step 4 is the jump, and steps 5 and 6 are the logic and the testing AI can already handle.</figcaption></figure>

### Fine print: this is about physics

The author is careful here. The proposal is aimed at the physical sciences, where the thing you study is the real material world. In math or computer science, the "sense experience" might be something else, like a feel for the landscape of formal systems. The need for a jump stays. What you simulate changes with the field.

## My take: where the paper might be too strong

I think the paper nails the core idea, but it's a position paper: one big historical example and a strong argument, not an experiment. So here are four questions worth chewing on before you take it as gospel.

1. *Was there really "no data"?* The equality of the two kinds of mass was measured to about one part in a billion. That *is* data. Einstein's move was to take a "coincidence" seriously. Could a model be trained to hunt for unexplained coincidences in old facts? Maybe. Spotting the coincidence still isn't jumping, but it's the first step.
2. *Is human creativity just fancy remixing?* Some critics say most "new" human ideas are recombinations of old ones. If that's true, the gap between remixing and jumping is a matter of degree, and scale might close it. The paper bets it's a difference in kind. Nobody has proved either side yet.
3. *Maybe generating isn't the hard part. Picking is.* An LLM can spit out 10,000 thought experiments in a minute. The magic was knowing which *one* mattered. That taste is exactly what Einstein's physical prior gave him. So the real missing piece might be a filter, not a generator.
4. *Maybe AI doesn't need to jump to be useful.* A [HackerNoon piece](https://hackernoon.com/llms-cant-jump-and-they-shouldnt-have-to) agrees with the limit but argues it's the wrong focus. Let models do what they're great at, like digging up the paper from a field you'd never read, and give humans more time for the jump.

Point 4 is the practical one for us devs. Today's LLM is the best research intern ever built: it reads everything, checks everything, and derives anything you hand it. It just can't hand *you* the first axiom. Not yet, anyway.

## Cheat sheet

LLMs can run the code of science. They can't yet write its first line.

| Idea | One-line version |
| --- | --- |
| Discovery loop | Experience → jump → axioms → logic → predictions → test on experience |
| Induction | Learn a rule from many examples. AI: mastered |
| Deduction | Apply a rule to get a result. AI: crushing it |
| Abduction | Invent a new cause or rule. AI: missing. This is the jump |
| Why induction fails | In 1907 Newton's loss was about zero, so there was no gradient. It would patch with "Vulcan" |
| Why deduction fails | It needs the axioms as input. It can't create them |
| How Einstein jumped | Imagined a falling box, felt that two cases are identical, declared them one law |
| Why LLMs can't | They only have words about the world, never the world |
| Possible fix | Interactive world models where AI can run "what if" experiments |

## Sources

- [Position: LLMs can't jump](https://proceedings.mlr.press/v306/zahavy26a.html), Tom Zahavy, Google DeepMind. Proceedings of ICML 2026 (PMLR vol. 306).
- [Full paper (PDF)](https://openreview.net/attachment?id=klU4737opt&name=originally_submitted_PDF), on OpenReview.
- [LLMs Can't Jump and They Shouldn't Have To](https://hackernoon.com/llms-cant-jump-and-they-shouldnt-have-to), HackerNoon.
