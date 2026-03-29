# Lorenzo Pardell Portfolio

## What This Is

A production-ready personal portfolio website for Lorenzo Pardell, a sound professional (sound designer, mixer, boom operator, dialogue editor, re-recording mixer) working in film, TV series, documentaries, and advertisements. Built with Next.js 15 using Server Components for SEO, showcasing 28 projects across multiple categories with local TypeScript data. Fully indexed by search engines with Open Graph social sharing support.

## Core Value

The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## Current Milestone: v1.3 Professional Polish & SEO

**Goal:** Rewrite copy for professional audience, implement comprehensive SEO, fix dark mode, and add missing credibility features.

**Target features:**
- Backup original copy, then rewrite all page text (hero, CTA, services, about, contact, footer)
- JSON-LD structured data (Person, CreativeWork, LocalBusiness)
- SEO improvements (page titles, meta descriptions, alt text, per-project OG images, Twitter cards)
- Fix dark mode across all components
- Fix footer social link touch targets
- Create /reel page (or fix broken link)
- Add testimonials section
- Implement CV/resume download
- Category archive pages for SEO
- FAQ section targeting search queries

## Current State

**Shipped:** Phase 10 — New Pages & Credibility Features (2026-03-28)
- 7 category archive pages at /portfolio/category/[category] with SEO metadata, JSON-LD, and sitemap
- FAQ section on Expertise page with accessible accordion and FAQPage JSON-LD
- FEAT-01 confirmed (reel button hidden), FEAT-02/FEAT-03 deferred to future milestone

The portfolio is production-grade with 28 projects, real images, and professional B2B copy:
- 28 projects with real thumbnail and hero photos, descriptions, roles, and metadata
- All pages render as Server Components (SEO-indexable HTML)
- Sitemap with 24+ routes, robots.txt, Open Graph metadata on every page
- Branded 404 and error recovery pages
- Clean codebase — no console.logs, no dead code, no deprecated APIs
- All images optimized via next/image
- Framer Motion animations preserved via client wrappers
- All page copy centralized in lib/copy.ts with professional B2B voice
- "Services" renamed to "Expertise" across navigation
- JSON-LD structured data on homepage and all project pages
- Keyword-rich titles, SEO meta descriptions, Twitter cards on every page
- Per-project OG images from hero photos, bilingual keywords
- Footer social links meet 44x44px touch target minimum

## Requirements

### Validated

- ✓ Portfolio grid with category filtering — v1.0
- ✓ Individual project detail pages with slug-based routing — v1.0
- ✓ Multiple detail page layouts (primary/secondary/tertiary design versions) — v1.0
- ✓ Homepage with hero, services preview, featured projects — v1.0
- ✓ About page with bio and social links — v1.0
- ✓ Services page — v1.0
- ✓ Contact page with WhatsApp link — v1.0
- ✓ Framer Motion page transitions and animations — v1.0
- ✓ Dark mode support via next-themes — v1.0
- ✓ Responsive design with Tailwind CSS v4 — v1.0
- ✓ Local TypeScript data file with 19 project records — v1.0
- ✓ Supabase fully removed (client, hooks, env vars, config) — v1.0
- ✓ All routes and interactive features verified working — v1.0
- ✓ Animation variants centralized in shared module — v1.1
- ✓ Project sorting utility extracted to shared function — v1.1
- ✓ Contact information centralized in single source file — v1.1
- ✓ Console.log/warn statements removed from production code — v1.1
- ✓ Dead code and unused variables removed — v1.1
- ✓ Bug fixes (CTA background, iframe onError, IntersectionObserver) — v1.1
- ✓ All project images use next/image with fill mode — v1.1
- ✓ Server Components conversion with client animation wrappers — v1.1
- ✓ Sitemap.xml, robots.txt, Open Graph metadata — v1.1
- ✓ Branded 404 page and error boundary — v1.1
- ✓ Real thumbnail and hero images for all 19 projects — v1.2
- ✓ Placeholder SVGs removed — v1.2
- ✓ Homepage hero image (real on-set photo) — v1.2
- ✓ Selected Works uses hero images with featured project selection — v1.2
- ✓ Auto-scrolling carousel for Selected Works when >3 featured projects — v1.2
- ✓ 28 total projects with real images (9 new projects added, details TBD) — v1.2

- ✓ Copy rewrite for all pages (backup originals first) — v1.3 (Phase 8)
- ✓ Centralized copy in lib/copy.ts with typed constants — v1.3 (Phase 8)
- ✓ "Services" renamed to "Expertise" across navigation and headings — v1.3 (Phase 8)

- ✓ JSON-LD structured data (Person, ProfessionalService, CreativeWork) — v1.3 (Phase 9)
- ✓ SEO page titles, meta descriptions, image alt text optimization — v1.3 (Phase 9)
- ✓ Per-project OG images and Twitter card metadata — v1.3 (Phase 9)
- ✓ Footer social link touch target fix (44x44px minimum) — v1.3 (Phase 9)
- ✓ Bilingual keywords (English + Portuguese) for dual-market SEO — v1.3 (Phase 9)

### Active
- Reel page (create or fix broken hero link) — v1.3
- Testimonials section — v1.3
- CV/resume download — v1.3
- Category archive pages for SEO — v1.3
- FAQ section — v1.3

### Out of Scope

- CMS integration — content lives in code for now
- Dark mode toggle — CSS vars and dark: classes exist but wiring deferred
- Analytics/visitor tracking — deferred to future milestone
- Site internationalization — English only for now, translation planned later

## Context

- **Architecture**: Next.js 15 App Router, Server Components with client wrappers for Framer Motion animations, direct imports from `lib/data/projects.ts`
- **Data**: 28 projects in typed TypeScript array with helper functions (`getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`). Projects support `featured` flag for homepage selection. Ordered by release date (2026→2018).
- **SEO**: Sitemap (24 routes), robots.txt, OG metadata per page, unique OG title/description per project
- **Images**: Real project photos in `public/images/projects/{project_dir}/` — thumbnails and heroes for all 19 projects. All use next/image with fill mode
- **Tech stack**: Next.js 15.2.2, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **No external dependencies**: No database, no API, no environment variables needed
- **Deploy target**: Vercel (canonical URL: lorenzopardell.com)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| TypeScript data file over MDX | Content is structured fields (not prose); TS gives type safety with zero tooling | ✓ v1.0 |
| Local images in public/ over CDN | Never depend on external service for core assets again | ✓ v1.0 |
| Direct imports over API layer | No need for fetch/hooks pattern when data is local and static | ✓ v1.0 |
| Hybrid RSC + client wrappers | Preserves all Framer Motion animations while enabling SSR for SEO | ✓ v1.1 |
| Static OG image over dynamic | Simple and reliable; upgrade to per-project images when real images are available | ✓ v1.1 |
| next/image fill mode with sizes | Consistent pattern across all components; proper responsive image optimization | ✓ v1.1 |
| Use mixed image formats as-is | Let next/image handle optimization; avoid manual format conversion | ✓ v1.2 |
| Use misnamed no_corre thumbs as-is | Files work correctly despite wrong naming from download | ✓ v1.2 |
| Featured flag on projects for homepage | Flexible selection without hardcoding IDs; latest 3 featured shown | ✓ v1.2 |
| rAF-based carousel over CSS animation | Supports drag, horizontal scroll, and infinite wrap in both directions | ✓ v1.2 |

## Known Issues

- `AboutPageClient.tsx` hardcodes contact info instead of importing from `lib/contact-info.ts` (QUAL-03 minor regression from Phase 6)

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-03-28 — Phase 9 complete (Technical SEO & UI Fix)*
