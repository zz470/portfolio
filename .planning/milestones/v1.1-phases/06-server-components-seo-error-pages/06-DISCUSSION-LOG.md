# Phase 6: Server Components, SEO & Error Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-27
**Phase:** 06-server-components-seo-error-pages
**Areas discussed:** Server Components scope, OG image strategy, Error page design, Metadata per page

---

## Server Components Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid approach (Recommended) | Keep pages as Server Components for SEO, extract animated sections into small 'use client' wrapper components | |
| Static pages only | Only convert pages with zero animations | |
| You decide | Claude picks the best approach based on what each page needs | ✓ |

**User's choice:** You decide
**Notes:** None

### Follow-up: Animation preservation

| Option | Description | Selected |
|--------|-------------|----------|
| Keep all animations | Wrap animated sections in client components — more files but preserves current look and feel exactly | ✓ |
| Drop non-essential animations | Keep hero/page-entry animations but remove subtle fade-ins on static content | |
| You decide | Claude evaluates which animations add value | |

**User's choice:** Keep all animations
**Notes:** User wants all existing animations preserved during conversion.

---

## OG Image Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Static default image (Recommended) | One branded OG image used site-wide. Simple, reliable. | ✓ |
| Dynamic per-project | Use Next.js OG image generation for unique preview images per project page | |
| Project thumbnails as OG | Use existing thumbnail_url as OG image for project pages | |

**User's choice:** Static default image

### Follow-up: Image source

| Option | Description | Selected |
|--------|-------------|----------|
| Generate placeholder | Claude creates an SVG placeholder with branding. Replace with real image later. | ✓ |
| I'll provide one | Skip image generation — user adds real og-image.jpg to public/ | |

**User's choice:** Generate placeholder

---

## Error Page Design

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal branded (Recommended) | Clean page with orange accent, clear message, button back to home | ✓ |
| Playful with illustration | Sound-themed illustration or animation | |
| You decide | Claude designs to fit existing site style | |

**User's choice:** Minimal branded

### Follow-up: Error recovery

| Option | Description | Selected |
|--------|-------------|----------|
| Reload page button | Simple 'Try again' button | |
| Reload + go home | Two buttons: retry and homepage escape hatch | |
| You decide | Claude picks best UX for error recovery | ✓ |

**User's choice:** You decide

---

## Metadata Per Page

| Option | Description | Selected |
|--------|-------------|----------|
| Page \| Lorenzo Pardell | Name always visible in browser tab | |
| Lorenzo Pardell — Page | Name-first for brand recognition | |
| Page — Sound Designer | Role-focused for SEO keyword targeting | |
| You decide | Claude picks based on SEO best practices | ✓ |

**User's choice:** You decide

### Follow-up: Language

| Option | Description | Selected |
|--------|-------------|----------|
| English | All metadata in English | ✓ |
| English + Portuguese keywords | English descriptions with Portuguese keywords | |
| You decide | Claude picks based on existing content | |

**User's choice:** English
**Notes:** User plans to translate the site later — structure metadata for future localization.

---

## Claude's Discretion

- Server Component conversion approach per page (hybrid vs other)
- Error boundary recovery UX
- Page title format pattern
- OG image file format (SVG vs PNG)

## Deferred Ideas

- Site internationalization/translation — future milestone
- Dynamic per-project OG images — upgrade when real images available
