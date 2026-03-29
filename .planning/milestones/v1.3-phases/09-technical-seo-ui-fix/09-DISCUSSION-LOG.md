# Phase 9: Technical SEO & UI Fix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 09-technical-seo-ui-fix
**Areas discussed:** JSON-LD schema strategy, OG image approach, Meta/title keyword strategy, Footer touch target fix

---

## JSON-LD Schema Strategy

### Homepage Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Person + ProfilePage | Standard for freelancer portfolios | |
| Person + LocalBusiness | Better for local search visibility | |
| You decide | Claude picks most appropriate | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on homepage schema combination

### Project Page Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Yes with roles | CreativeWork with contributor role data, production company, release year | ✓ |
| Minimal CreativeWork | Just title, description, type | |
| Skip project schemas | Only main pages get schemas | |

**User's choice:** Yes with roles
**Notes:** None

---

## OG Image Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Use hero photos directly | Each project's hero image becomes its OG image. Zero setup. | ✓ |
| Generate branded OG images | Next.js og image generation with text overlay | |
| You decide | Claude picks practical approach | |

**User's choice:** Use hero photos directly
**Notes:** None

---

## Meta/Title Keyword Strategy

### Default Title with Location

| Option | Description | Selected |
|--------|-------------|----------|
| Add location | "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo" | ✓ |
| Keep without location | Cleaner, relies on meta description for location | |
| You decide | Claude optimizes | |

**User's choice:** Add location
**Notes:** None

### Keyword-Rich Page Titles

| Option | Description | Selected |
|--------|-------------|----------|
| Keyword-rich titles | "Sound Design & Mixing Expertise | Lorenzo Pardell" style | ✓ |
| Keep short titles | "Expertise | Lorenzo Pardell" — minimal | |
| You decide | Claude optimizes per page | |

**User's choice:** Keyword-rich titles
**Notes:** None

### Portuguese Keywords

| Option | Description | Selected |
|--------|-------------|----------|
| Keep both languages | English + Portuguese keywords for dual-market SEO | ✓ |
| English only | Remove Portuguese, aligns with English-only copy | |
| You decide | Based on SEO best practices | |

**User's choice:** Keep both languages
**Notes:** None

---

## Footer Touch Target Fix

| Option | Description | Selected |
|--------|-------------|----------|
| Padding-only fix | Add min-h/min-w 44px + padding. Visually identical, bigger hit area. | ✓ |
| Larger icon buttons | Icon-only circular buttons. Bigger visual presence. | |
| You decide | Claude picks best fit for footer design | |

**User's choice:** Padding-only fix
**Notes:** None

---

## Claude's Discretion

- Exact JSON-LD schema structure and property selection
- Homepage schema combination
- Exact meta description wording per page
- Alt text phrasing per image
- Twitter card type per page

## Deferred Ideas

None — discussion stayed within phase scope.
