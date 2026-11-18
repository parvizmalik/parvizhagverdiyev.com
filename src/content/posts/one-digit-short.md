---
title: "One digit short: how I fixed roaming network codes at the source"
description: "Roaming calls reached charging with a wrong or empty operator code. One fixed-length parsing rule was the cause. Here is how I found it and fixed it once, at the source."
date: 2026-11-18
type: essay
tags: [telecom, roaming, mediation, debugging]
---

When a subscriber makes a call while roaming abroad, the call record must say which foreign operator carried it. In our records, that operator code was often wrong, and sometimes empty. Charging, reporting and every other system that used these records received bad input.

This issue landed on my desk. I took it from the first symptom to a fix running in production.

## How a call record travels

Every call creates a short log entry in the network, called a **call record**. The records do not go straight to billing. First they pass through a **mediation system**: software that collects every call record from the network, cleans it, joins the start and end of each call into one record, and delivers it to the systems that need it:

- **Charging**, which bills the call. For a roaming call, it bills based on the foreign operator that carried the call.
- **The reporting database**, used for usage reports.
- **Fraud control**, which watches for unusual use.
- **The data warehouse**, used for analytics.

## The symptoms

Think of mediation as the heart of this data flow. It pumps records to every other system. When a patient has a heart problem, the symptoms show up in the arms, the lungs and the brain. That is what happened here:

- **Charging** received roaming calls with the wrong partner operator, or with no partner at all. A call billed against the wrong partner gets the wrong tariff, and a call with no partner cannot be matched.
- **Reports** showed wrong or empty partners.
- **Fraud control and analytics** received a wrong location.

On a sample day, about **one in eight** roaming voice records had no operator code at all.

<figure class="diagram"><div class="canvas"><a href="/images/one-digit-short/1-patient-map.svg" target="_blank" rel="noopener"><img src="/images/one-digit-short/1-patient-map.svg" alt="The mobile network sends call records to mediation. Mediation has a fault: the network code was read with a fixed 5-digit rule. It sends records to charging, reports, fraud control and the data warehouse, and each shows a symptom: wrong or missing partner, wrong or empty partners, wrong location." width="1200" height="922" loading="lazy" style="margin:0;width:100%;min-width:640px;border-radius:6px"></a></div><figcaption><b>One fault at the source, symptoms everywhere.</b> Mediation feeds every system, so a single wrong rule there reached all of them. Click the diagram to open it full size.</figcaption></figure>

## The diagnosis

Each mobile operator has an ID called a **network code** (PLMN). It is a 3-digit country code plus a 2- or 3-digit operator code:

- Germany, operator 01: **262 01**, 5 digits
- Mexico, operator 020: **334 020**, 6 digits

Every call record also carries a short text from the network, the **access network info**. It says which network and which antenna the phone used. Inside it is the **cell ID**: the address of the antenna. The cell ID starts with the network code, followed by the area code and the antenna number.

The old logic read the cell ID with a fixed rule: take the first 5 characters as the network code, and cut the cell ID at 16 characters. That works for 5-digit operators, and it breaks in three ways:

1. A 6-digit code was cut to 5 digits. **334020 became 33402**, which is a different code.
2. The cell ID lost a character in the wrong place, so the area and antenna parts were shifted.
3. Some roaming records carry no cell ID at all. For those, the network code came out empty.

Nothing in the cell ID text tells you whether the code has 5 or 6 digits. A fixed rule cannot know.

<figure class="diagram"><div class="canvas"><a href="/images/one-digit-short/2-cell-id-anatomy.svg" target="_blank" rel="noopener"><img src="/images/one-digit-short/2-cell-id-anatomy.svg" alt="Two cell IDs shown one character per box. The German one starts with the 5-digit network code 26201, and the old rule reads 26201 correctly. The Mexican one starts with the 6-digit network code 334020; the old rule reads 33402, which is wrong, and its cut after 16 characters loses the last character." width="1200" height="608" loading="lazy" style="margin:0;width:100%;min-width:640px;border-radius:6px"></a></div><figcaption><b>Same rule, two results.</b> The fixed cut is right for a 5-digit network code and wrong for a 6-digit one. Click the diagram to open it full size.</figcaption></figure>

## The treatment decision

There were two ways to treat this. One was to fix each destination: four systems, four teams, four schedules, and four versions of the same logic. The other was to treat the heart: fix it once in mediation, so every destination receives correct values in the format it already uses.

I chose the second, and the key question was where the "5 or 6 digits" answer should come from. A hand-made list of countries goes out of date. But the charging system already keeps the list of every roaming partner it bills against, with each partner's full code. If mediation reads that same list, mediation and charging can never disagree.

## How the fix works

The fix has two parts: a daily copy of the partner list, and a new parsing rule that uses it.

**Every day:**

1. A scheduler (cron, the Linux tool that runs a task at a fixed time) starts a small Java export job.
2. The job reads the roaming partner list from the charging system's database. It only reads; it never writes there.
3. It keeps only valid codes and measures the shortest and longest code in the list. Nobody types these lengths by hand.
4. It writes everything to a file. It writes to a temporary file first and swaps it in only when everything succeeded. If anything fails, yesterday's file stays in place.
5. Mediation loads the file into a **lookup**: a list held in memory that it can check in microseconds.

**For every call record,** mediation finds the network code and cell once. Every destination then reads the result. No other system had to change anything.

<figure class="diagram"><div class="canvas"><a href="/images/one-digit-short/3-fix-sequence.svg" target="_blank" rel="noopener"><img src="/images/one-digit-short/3-fix-sequence.svg" alt="Sequence diagram with six parts: scheduler, export job, charging database, partner file, mediation and destinations. 1: the scheduler starts the daily export. 2: the export job reads the roaming partner list, read only, and gets the partner network codes back. 3: it keeps valid codes and measures the shortest and longest code. 4: it writes a temporary file and swaps it in; if anything fails, yesterday's file stays. 5: mediation loads the file into an in-memory lookup. Then, for every call record: 6: mediation finds the network code and the cell ID once. 7: it sends correct values to the destinations in the same formats as before." width="1200" height="1206" loading="lazy" style="margin:0;width:100%;min-width:640px;border-radius:6px"></a></div><figcaption><b>The fix, step by step.</b> A daily copy of the partner list keeps mediation in line with charging. Every record is then checked against it. Click the diagram to open it full size.</figcaption></figure>

## The parsing logic

**When the cell ID is present:**

1. Read the cell ID up to its end marker, at any length.
2. If it starts with the home network code, the network code is the home code.
3. Otherwise, try the longest possible code first and check it against the partner list. If it isn't found, try one digit shorter. The first match wins.
4. If nothing matches, use 5 digits, which was the old rule and is right for most operators.
5. Rebuild the cell ID in the short form the destinations already expect.

**When there is no cell ID:**

The record still names the network the phone visited, for example `ims.mnc020.mcc334.3gppnetwork.org`. This name always writes the operator part with 3 digits and pads short ones with a zero, so 01 appears as 001.

1. Read the country code (334) and the 3-digit operator part (020).
2. If the operator part does not start with 0, the code must be 6 digits.
3. If the 6-digit form is in the partner list, use it: **334020**.
4. Otherwise, drop the padding zero: **262 001 → 26201**.
5. The record carries the network code as its location. Before relying on this, I confirmed with the charging team that a location with only the network code is accepted.

<figure class="diagram"><div class="canvas"><a href="/images/one-digit-short/4-parsing-flow.svg" target="_blank" rel="noopener"><img src="/images/one-digit-short/4-parsing-flow.svg" alt="Flowchart. A call record arrives. Does it have a cell ID? Yes: read the cell ID up to its end marker; if it starts with the home code, the network code is the home code; otherwise try the longest code first, then one digit shorter, against the partner list, and use 5 digits if nothing matches; then rebuild the cell ID in the short form the destinations expect. No: read the visited network name; if the operator part does not start with 0, use the 6-digit code; if it does, check whether the 6-digit form is in the partner list; if yes, use the 6-digit code such as 334020; if no, drop the padding zero to get 5 digits such as 26201; the location is the network code only. Both paths end with a correct network code for every destination." width="1240" height="1093" loading="lazy" style="margin:0;width:100%;min-width:640px;border-radius:6px"></a></div><figcaption><b>Two paths, one result.</b> Blue steps use the partner list from the charging system. Click the diagram to open it full size.</figcaption></figure>

| Input | Case | Result |
| --- | --- | --- |
| `262011A2B0C3D4E5` | 5-digit operator | `262011A2BC3D4E5` |
| `3340201A2B0C3D4E5` | 6-digit operator | `3340201A2BC3D4E5` |
| no cell ID, visited `mnc020.mcc334` | Visited network fallback | `334020` |

## Proving it

1. **Test system with real records.** I ran real call records through a copy of the setup and compared every destination's output, field by field.
2. **Agreement with each system owner.** Each value and field position was confirmed before go-live.
3. **Step-by-step rollout.** I backed up the configuration first, then deployed one element at a time in a quiet window.
4. **Checks on live output.** In the first week I read every roaming output file and the reporting tables.

**Results in the first week:**

- **100%** of roaming voice records carried the correct network code, against about one in eight empty before.
- About **12%** of records were recovered through the visited network.
- **Zero** home records changed, across millions checked.
- **Zero** code length mismatches in the reporting database.

## What I took away

- **Never read a variable-length value with a fixed-length rule.** Read to the delimiter, then decide the length from data.
- **Use the downstream system's own reference data.** When two systems decide from the same list, they cannot drift apart.
- **Treat the heart, not each organ.** One central fix corrected every destination, and no other team had to change anything.
