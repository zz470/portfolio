# Phase 6: Server Components, SEO & Error Pages - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase makes the portfolio indexable by search engines, enables social sharing previews on all pages, and adds branded error/404 pages. Covers SEO-01 through SEO-05 and ERR-01/ERR-02.

</domain>

<decisions>
## Implementation Decisions

### Server Components Conversion (SEO-01)
- **D-01:** Claude's Discretion on conversion approach — hybrid (Server Component pages with client wrappers for animated sections) is the expected pattern, but Claude decides per-page based on complexity.
- **D-02:** All existing Framer Motion animations MUST be preserved. No animations should be dropped during conversion. Extract animated sections into `"use client"` wrapper components as needed.
- **D-03:** Data imports (from `lib/data/projects.ts`) work in both Server and Client Components since the data is local TypeScript — no async fetching needed.

### OG Image Strategy (SEO-04, SEO-05)
- **D-04:** Use a single static default OG image site-wide. Generate a placeholder SVG with "Lorenzo Pardell" + "Sound Designer" branding (dark background, orange accent). User will replace with real image later.
- **D-05:** Place the OG image at `public/og-image.svg` (or png if SVG not supported by social platforms — Claude decides format).
- **D-06:** For project detail pages, use the same static default image (not per-project thumbnails, since those are currently placeholders).

### Error Pages (ERR-01, ERR-02)
- **D-07:** 404 page (`not-found.tsx`): minimal branded design — clean layout with orange accent, clear "Page not found" message, and navigation button back to home. Match the portfolio's existing clean aesthetic.
- **D-08:** Error boundary (`error.tsx`): Claude's Discretion on recovery UX — at minimum a way to retry and navigate away. Styled to match site branding.

### Metadata Pattern (SEO-02, SEO-03, SEO-04, SEO-05)
- **D-09:** Claude's Discretion on page title pattern — pick based on SEO best practices for portfolio sites.
- **D-10:** All metadata in English. Site translation is planned for later — structure metadata so it's easy to localize in the future (e.g., keep descriptions in a centralizable place if practical).
- **D-11:** Each project detail page must have unique OG metadata (title, description) derived from the project's `title` and `description` fields.
- **D-12:** Sitemap (`app/sitemap.ts`) must include all static routes plus all 19 project detail pages dynamically.
- **D-13:** Robots.txt (`app/robots.ts`) should allow all crawlers.

### Claude's Discretion
- Server Component conversion strategy per page (D-01)
- Error boundary recovery UX (D-08)
- Page title format pattern (D-09)
- OG image file format — SVG vs PNG (D-05)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and REQUIREMENTS.md.

### Next.js Conventions
- `app/sitemap.ts` — Next.js sitemap generation API
- `app/robots.ts` — Next.js robots.txt generation API
- `app/not-found.tsx` — Next.js custom 404 page
- `app/error.tsx` — Next.js error boundary component
- `app/layout.tsx` — Existing root metadata definition (line 19-33)

### Project Data
- `lib/data/projects.ts` — Source of project records (slugs, titles, descriptions for sitemap + OG metadata)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx` already has base `Metadata` export with title, description, keywords, robots, canonical URL
- `lib/data/projects.ts` has `getAllProjects()`, `getProjectBySlug()` — usable directly in Server Components and sitemap generation
- `lib/animations.ts` has shared `fadeIn`, `slideUp` variants — client wrapper components can import these
- `components/ui/button.tsx` — reusable for error page CTAs
- Orange-500 accent color used consistently — error pages should use it too

### Established Patterns
- All pages currently `"use client"` — conversion will touch every page file
- Framer Motion `motion.div` with `initial`/`animate` pattern used in every page
- `max-w-screen-xl mx-auto px-6 md:px-10` container pattern is standard

### Integration Points
- Root layout `app/layout.tsx` — metadata template, error boundary wraps children
- `app/portfolio/[slug]/page.tsx` — needs `generateMetadata()` for per-project OG
- `app/portfolio/page.tsx` — needs `generateMetadata()` or static metadata export

</code_context>

<specifics>
## Specific Ideas

- User plans to translate the site later — metadata structure should be localizable
- Placeholder OG image should follow the same style as project placeholder SVGs (dark bg, orange accent, white text)

</specifics>

<deferred>
## Deferred Ideas

- Site internationalization/translation — mentioned as future plan, not this phase
- Dynamic per-project OG images — can upgrade from static default later when real project images are available

</deferred>

---

*Phase: 06-server-components-seo-error-pages*
*Context gathered: 2026-03-27*
