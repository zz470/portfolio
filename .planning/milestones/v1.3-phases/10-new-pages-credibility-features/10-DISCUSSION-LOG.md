# Phase 10: New Pages & Credibility Features - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 10-new-pages-credibility-features
**Areas discussed:** Category archive pages, Reel page, Testimonials, FAQ & CV download

---

## Category Archive Pages

### Route Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Dynamic route | /portfolio/[category] — one file handles all categories automatically | ✓ |
| Static pages per category | Manually create a page file for each category | |
| You decide | Claude picks best approach | |

**User's choice:** Dynamic route
**Notes:** User's key concern was whether adding new categories would require manual route creation. Confirmed dynamic route auto-generates pages from project data — zero manual work.

---

## Reel Page

| Option | Description | Selected |
|--------|-------------|----------|
| I have a Vimeo/YouTube link | Provide URL, /reel page embeds it | |
| Not ready yet — create placeholder | Create /reel with placeholder | |
| Remove the reel button for now | Hide WATCH REEL button, no /reel page | ✓ |

**User's choice:** Remove the reel button
**Notes:** Button already defaults to hidden (showWatchReelButton = false). No code change needed.

---

## Testimonials

| Option | Description | Selected |
|--------|-------------|----------|
| I have quotes ready | User provides testimonials | |
| Use placeholder quotes | Create section with placeholder text | |
| Skip testimonials for now | Defer to future milestone | ✓ |

**User's choice:** Skip testimonials
**Notes:** User has no client quotes ready and doesn't want placeholders.

---

## FAQ & CV Download

### FAQ Location

| Option | Description | Selected |
|--------|-------------|----------|
| Section on the Expertise page | Add FAQ below services list | ✓ |
| Dedicated /faq page | Standalone page with own URL | |
| You decide | Claude picks best location | |

**User's choice:** Section on the Expertise page (free text input)

### FAQ Content

| Option | Description | Selected |
|--------|-------------|----------|
| Claude writes them | 5-8 FAQ entries targeting search queries | |
| I'll provide Q&As | User gives specific questions and answers | |
| Mix — Claude drafts, I review | Claude generates drafts, user reviews | ✓ |

**User's choice:** Mix — Claude drafts, I review

### CV Download

| Option | Description | Selected |
|--------|-------------|----------|
| I have a PDF ready | User will add PDF to public/ | |
| Skip CV for now | Defer to later | ✓ |

**User's choice:** Skip CV
**Notes:** User has no PDF ready.

---

## Claude's Discretion

- Category page layout and grid reuse
- FAQ question/answer content (user reviews drafts)
- FAQ accordion implementation
- Category-specific meta descriptions
- Whether to add FAQ JSON-LD (FAQPage schema)

## Deferred Ideas

- FEAT-02 (Testimonials) — no client quotes available
- FEAT-03 (CV download) — no PDF available
- Reel page — create when showreel video is ready
