---
phase: 06-server-components-seo-error-pages
plan: 01
subsystem: seo-error-pages
tags: [seo, sitemap, robots, og-image, error-pages, metadata]
dependency_graph:
  requires: []
  provides: [sitemap-xml, robots-txt, og-image, root-metadata-template, not-found-page, error-boundary]
  affects: [app/layout.tsx, app/sitemap.ts, app/robots.ts, app/not-found.tsx, app/error.tsx, public/og-image.png]
tech_stack:
  added: []
  patterns: [Next.js MetadataRoute API, title template inheritance, error boundary client component]
key_files:
  created:
    - app/sitemap.ts
    - app/robots.ts
    - app/not-found.tsx
    - app/error.tsx
    - public/og-image.png
  modified:
    - app/layout.tsx
decisions:
  - Used MetadataRoute.Sitemap return type from next for type-safe sitemap generation
  - Used pure Node.js zlib/PNG creation for OG image placeholder — no canvas dependency needed
  - not-found.tsx is a Server Component (no use client) — Next.js wraps it in root layout automatically
  - error.tsx must be a Client Component (use client) per Next.js error boundary requirements
  - Used <a href="/"> not <Link> in error.tsx for Return Home to force full page reload and clear error state
metrics:
  duration: 2 min
  completed: "2026-03-27"
  tasks: 2
  files: 6
---

# Phase 06 Plan 01: SEO Infrastructure and Error Pages Summary

SEO infrastructure with dynamic sitemap (24 routes), robots.txt, OG image placeholder, root metadata template with title inheritance, branded 404 page, and error boundary with retry.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create SEO files and update root layout metadata | 017cfb3 | app/sitemap.ts, app/robots.ts, public/og-image.png, app/layout.tsx |
| 2 | Create error handling pages | 55e6fcb | app/not-found.tsx, app/error.tsx |

## What Was Built

### app/sitemap.ts
Dynamic sitemap returning `MetadataRoute.Sitemap` array. Imports `projects` from `@/lib/data/projects` to generate 19 project routes. Total: 5 static + 19 dynamic = 24 URLs at `https://lorenzopardell.com`.

### app/robots.ts
Robots file allowing all crawlers (`userAgent: "*"`, `allow: "/"`) with sitemap reference at `/sitemap.xml`.

### public/og-image.png
1200x630 PNG placeholder created with pure Node.js (no canvas dependency). Dark background (#1a1a1a) with orange-500 accent line (#f97316). User will replace with real branded image.

### app/layout.tsx (updated metadata)
- Added `metadataBase: new URL("https://lorenzopardell.com")`
- Added `title.template: "%s | Lorenzo Pardell"` — child pages set `title: "About"` and get "About | Lorenzo Pardell"
- Added `openGraph` with `images`, `locale: "en_US"`, `siteName`, `type: "website"`
- All existing keywords preserved unchanged

### app/not-found.tsx
Server Component (no `"use client"`). Centered layout with orange-500 "404" heading, "Page Not Found" subheading, descriptive text, and `<Button asChild><Link href="/">Return Home</Link></Button>`. Root layout provides Header/Footer automatically.

### app/error.tsx
Client Component (`"use client"` first line, required by Next.js). Accepts `{ error, reset }` props. Renders "Something went wrong" heading with two buttons: "Try Again" (calls `reset()`) and "Return Home" (`<a href="/">` for full reload to clear error state).

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- `public/og-image.png` — Placeholder PNG with dark background and orange accent line. User will replace with real branded image when available. Does not block plan goal (OG image URL is wired and functional).

## Self-Check: PASSED

- app/sitemap.ts: FOUND
- app/robots.ts: FOUND
- public/og-image.png: FOUND
- app/not-found.tsx: FOUND
- app/error.tsx: FOUND
- app/layout.tsx (metadataBase): FOUND
- Commit 017cfb3: FOUND
- Commit 55e6fcb: FOUND
