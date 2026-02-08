# Opinion vs News

This document defines a **non-partisan, non-blocking** way to tag content as **Report/News**, **Opinion**, or **Mixed** using the existing AICPM field:

`content_type`

The goal is not to decide what readers should believe, and not to label content as “biased.” The goal is to clarify **what kind of content it is**.

## Why this exists

Modern publishers often blend formats:

- Straight reporting (events + quotes)
- Analysis (reporting + interpretation)
- Opinion (normative judgement: “should,” “must”)
- Prediction (future-focused claims: “will,” “likely”)

AICPM makes this visible by standardizing a **format label**.

## Definitions (AICPM-aligned)

Use these values from `AICPM-MS-v1.0`:

- `report` — **hard news/reporting** (events, quotes, documents, data)
- `opinion` — editorials, columns, persuasive writing (normative language)
- `prediction` — primarily forecasting, speculative claims about future outcomes
- `mixed` — substantial blend of reporting + analysis/opinion

> Note: Many outlets call analysis “news,” and many opinion pieces are formatted like news. The label should follow **content behavior**, not publisher intent.

## Decision rubric

### Step 1 — Identify the dominant mode

**Report/News (`report`)**

Typical indicators:

- Primary quotes + attribution (e.g., “X said…”, “according to…”) 
- Concrete events + timestamps/locations
- Describes what happened, who said what, and what documents/data exist

**Opinion (`opinion`)**

Typical indicators:

- Normative claims: “should / must / needs to / ought to”
- First-person viewpoint: “I think… / in my view…”
- Persuasive intent is the primary purpose

**Prediction (`prediction`)**

Typical indicators:

- Future claims dominate: “will / likely / expected to / may / might”
- Assertions about outcomes that cannot yet be verified

**Mixed (`mixed`)**

Use when:

- Reporting exists **and** the piece adds substantial interpretation, framing, or advocacy.
- Headline is framed as a claim, but the body mixes events with strong judgment.

If uncertain, **prefer `mixed`**.

### Step 2 — Apply LFV on “key claims”

This is where LFV and AICPM work together.

Examples:

- Normative claims (“needs to apologize”) → LFV **UNDERDETERMINED** (out of scope for empirical verification)
- Predictive claims (“will win / will subvert”) → LFV **UNDERDETERMINED** (future-dependent)
- Empirical claims (“X happened”) → LFV can evaluate internal consistency and evidence alignment

`content_type` tells the reader **what format** they’re reading.
LFV tells the reader **what kinds of claims** are being made, and whether they’re verifiable now.

## Minimal explainable signals (Phase I)

For Phase I (browser extension / editor assist), keep signals explainable:

- Publisher label (breadcrumb/section says “Opinion”)
- URL path contains `/opinion` or `/editorial`
- Reporting cues (quotes + attribution density)
- Normative language cues (`should`, `must`, `needs to`)
- Predictive/modal cues (`will`, `likely`, `may`, `might`)

Output should include:

- `content_type` suggestion
- `confidence` (low/medium/high)
- a short list of **reasons**

## Non-goals

- Determining “truth” of political viewpoints
- Suppressing content
- Ranking publishers

This is a labeling architecture. Readers decide what to trust.
