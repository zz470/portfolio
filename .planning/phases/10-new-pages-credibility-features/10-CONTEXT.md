# Phase 10: New Pages & Credibility Features - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Create category archive pages for SEO, add FAQ section to the Expertise page, and confirm reel button is hidden. Testimonials and CV download are deferred — user does not have content ready. This phase delivers SEO-discoverable category pages and a search-query-targeting FAQ.

**Scope reduction from original requirements:**
- FEAT-01 (Reel): Button already hidden (showWatchReelButton defaults to false). No /reel page needed — confirmed by user.
- FEAT-02 (Testimonials): Deferred — user has no quotes ready and doesn't want placeholders.
- FEAT-03 (CV download): Deferred — user has no PDF ready.

</domain>

<decisions>
## Implementation Decisions

### Category Archive Pages (SEO-07)
- **D-01:** Dynamic route at `app/portfolio/[category]/page.tsx` — one file handles all categories automatically.
- **D-02:** Uses existing `getProjectsByCategory()` from `lib/data/projects.ts`. No new data helpers needed.
- **D-03:** `generateStaticParams()` scans all unique categories from projects data and generates pages at build time. Adding a new category to a project auto-creates the archive page — zero manual work.
- **D-04:** Each category page gets a keyword-rich title and meta description following Phase 9 SEO patterns (JSON-LD, Twitter cards, OG metadata).

### FAQ Section (SEO-08)
- **D-05:** FAQ lives as a section on the Expertise page (`components/services/ServicesPageClient.tsx` or equivalent), NOT a separate /faq route.
- **D-06:** Claude drafts 5-8 FAQ entries targeting common sound design hiring queries (turnaround, formats, remote work, etc.). User will review and adjust.
- **D-07:** FAQ content goes in `lib/copy.ts` for centralized editing (consistent with Phase 8 copy architecture).
- **D-08:** FAQ section uses accordion-style layout. Each answer must be indexable by search engines (rendered in HTML, not hidden behind JS-only toggles).

### Reel Page (FEAT-01)
- **D-09:** No /reel page created. The "WATCH REEL" button in HeroSection already defaults to hidden (`showWatchReelButton = false`). Confirmed no 404 is possible. FEAT-01 is satisfied by confirming the broken link does not exist.

### Deferred Features
- **D-10:** FEAT-02 (Testimonials) deferred to future milestone — user has no client quotes ready.
- **D-11:** FEAT-03 (CV download) deferred to future milestone — user has no PDF ready.

### Claude's Discretion
- Category page layout and grid reuse from existing PortfolioGrid
- FAQ question/answer content (user will review drafts)
- FAQ accordion component implementation (shadcn Accordion or custom)
- Category-specific meta descriptions wording
- Whether to add FAQ JSON-LD (FAQPage schema) for rich snippets

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above.

### Project Context
- `.planning/REQUIREMENTS.md` — SEO-07, SEO-08, FEAT-01, FEAT-02, FEAT-03 define original scope (FEAT-01/02/03 reduced per decisions above)
- `.planning/ROADMAP.md` — Phase 10 success criteria (5 items — some deferred)
- `.planning/PROJECT.md` — Core project context

### SEO Patterns (Phase 9 output)
- `lib/jsonld.ts` — JSON-LD builders (reuse for category pages, potentially add FAQPage schema)
- `app/layout.tsx` — Root metadata with title template, Twitter card defaults
- `app/portfolio/[slug]/page.tsx` — Example of dynamic route with generateMetadata + JSON-LD

### Data & Copy Sources
- `lib/data/projects.ts` — Project records with `category` field, `getProjectsByCategory()` helper
- `lib/copy.ts` — Centralized copy constants (FAQ content goes here)
- `components/services/ServicesPageClient.tsx` — Expertise page where FAQ section will be added

### Existing Components
- `components/portfolio/PortfolioGrid.tsx` — Grid layout (reuse for category archive pages)
- `components/portfolio/PortfolioCard.tsx` — Individual project card
- `components/portfolio/CategoryFilter.tsx` — Category filter buttons (reference for category slugs)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `getProjectsByCategory(category)` — Already filters projects by category string. Category archive pages can call this directly.
- `PortfolioGrid` + `PortfolioCard` — Existing grid and card components. Category pages reuse these for consistent layout.
- `CategoryFilter` — Shows available categories. May need to link to archive pages instead of just filtering inline.
- `generateStaticParams()` pattern — Already used in `app/portfolio/[slug]/page.tsx`. Same pattern for `[category]`.
- `lib/jsonld.ts` — Can add `buildFAQSchema()` for FAQPage structured data.

### Established Patterns
- Dynamic routes with `generateMetadata()` — Used for project pages, same pattern for category pages.
- Copy in `lib/copy.ts` — FAQ content follows this centralized pattern.
- Server Component pages with client wrappers — Category pages should be Server Components with client animation wrappers if needed.

### Integration Points
- `app/portfolio/[category]/page.tsx` — New dynamic route (must not conflict with existing `app/portfolio/[slug]/page.tsx`)
- `components/services/ServicesPageClient.tsx` — FAQ section added here
- `lib/copy.ts` — FAQ content added here
- `app/sitemap.ts` — Category pages should be added to sitemap

### Route Conflict Risk
- `app/portfolio/[slug]/page.tsx` already exists. Adding `app/portfolio/[category]/page.tsx` would conflict. Solution: the category route needs a different path structure, e.g., `app/portfolio/category/[category]/page.tsx` or handle categories vs slugs in the same `[slug]` route.

</code_context>

<specifics>
## Specific Ideas

- Categories in data: Documentary, Series, Reality, Podcast, Advertisement, Film, Animation (7 total)
- Category URL slugs should be lowercase: /portfolio/category/documentary, /portfolio/category/series, etc.
- FAQ accordion should be accessible — keyboard navigable, ARIA attributes
- FAQ content targets queries like "What formats do you deliver?", "Do you work remotely?", "What's your turnaround time?"

</specifics>

<deferred>
## Deferred Ideas

- **FEAT-02 (Testimonials):** User has no client quotes ready. Defer to future milestone when quotes are collected.
- **FEAT-03 (CV download):** User has no PDF ready. Defer to future milestone.
- **Reel page (/reel):** Button is hidden. Create the actual reel page when showreel video is ready.

</deferred>

---

*Phase: 10-new-pages-credibility-features*
*Context gathered: 2026-03-28*
