# Phase 11: Dedicated FAQ Page — Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a dedicated `/faq` route with categorized, comprehensive FAQ content inspired by defactosound.com/faq. Move the FAQ section from the Expertise page into its own page with 20+ Q&As across 4 categories, expanded answers, and full SEO treatment. Update the Expertise page to show a teaser with a link to the full FAQ page.

</domain>

<decisions>
## Implementation Decisions

### Content & Categories
- **D-01:** FAQ content organized into 4 category groups: Getting Started, Audio Post Process, Technical, About Me. Adapted from Defacto's structure for a freelancer context.
- **D-02:** 20+ total Q&As across the 4 categories. Comprehensive coverage like Defacto Sound (27 Q&As).
- **D-03:** Answers expanded to Defacto-level depth — detailed paragraphs, specific examples, name-drops of platforms/clients (HBO, Netflix, Globoplay). More authoritative and SEO-rich than current 2-3 sentence answers.
- **D-04:** Claude drafts all new Q&A content based on existing copy, project data, and Defacto's topic structure. User reviews before shipping.
- **D-05:** FAQ content stays centralized in `lib/copy.ts` (consistent with Phase 8/10 copy architecture). Categories are a new structural layer in the copy object.

### Page Layout & Design
- **D-06:** Hero section at top with heading ("Frequently Asked Questions") + subtitle (e.g., "Everything you need to know about working with me"). Matches site's heading patterns.
- **D-07:** Categories are visual section headers as you scroll — no sticky tabs or sidebar nav. Simple vertical layout like Defacto.
- **D-08:** Accordion behavior: one answer open at a time (type="single" collapsible). Reuses existing `components/ui/accordion.tsx` (Radix-based).
- **D-09:** Contact CTA section at the bottom — "Still have questions? Get in touch" with link to /contact or WhatsApp. Inspired by Defacto's "Say hello" section.

### Expertise Page Impact
- **D-10:** Expertise page FAQ section replaced with a teaser: show 2-3 top FAQs with a "See all FAQs →" link to /faq. Keeps some SEO value on services page without duplicating full content.
- **D-11:** FAQPage JSON-LD removed from `/services` page and moved to `/faq` only. Cleaner signal to Google — one canonical FAQ page.

### SEO & Navigation
- **D-12:** FAQ page linked from: footer navigation, header navigation bar, and the Expertise page teaser section.
- **D-13:** FAQPage JSON-LD schema on /faq only (moved from /services per D-11).
- **D-14:** Page gets its own SEO metadata (title, description, OG, Twitter cards) following Phase 9 patterns.
- **D-15:** /faq added to sitemap.ts.

### Claude's Discretion
- FAQ page Server/Client component split (likely Server Component for SEO + Client for accordion)
- Specific animation patterns (fade-in consistent with other pages)
- Which 2-3 FAQs to feature in the Expertise page teaser
- Category heading styling (emoji use, typography)
- CTA section design (reuse existing CTASection pattern or custom)
- Copy structure in lib/copy.ts for categories (array of category objects)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Inspiration & Reference
- defactosound.com/faq — Primary design inspiration. 4 categorized groups, 27 Q&As, accordion layout, hero + CTA sections.

### Existing Implementation (to migrate from)
- `lib/copy.ts` — Current 7 FAQ entries in `copy.faq.entries` (lines 242-281)
- `components/services/ServicesPageClient.tsx` — Current FAQ section (lines 347-372) using Accordion
- `app/services/page.tsx` — Current FAQPage JSON-LD injection (lines 20-28)
- `lib/jsonld.ts` — `buildFAQSchema()` function (lines 83-96)

### Patterns to Follow
- `app/portfolio/category/[category]/page.tsx` — Recent Server Component page pattern with generateMetadata
- `components/portfolio/CategoryPageClient.tsx` — Recent Client Component page wrapper pattern
- `components/ui/accordion.tsx` — Radix-based accordion (already installed)
- `app/sitemap.ts` — Sitemap entry pattern
- `components/navigation/header.tsx` — Header nav items array
- `components/navigation/footer.tsx` — Footer nav links

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/accordion.tsx` — Radix Accordion with AccordionItem, AccordionTrigger, AccordionContent
- `lib/jsonld.ts` → `buildFAQSchema()` — Already generates FAQPage JSON-LD from Q&A entries
- `lib/copy.ts` — Centralized copy pattern, 7 existing FAQ entries to expand from
- `components/home/CTASection.tsx` — Existing CTA section component (potential reuse for bottom CTA)

### Established Patterns
- Server Component for metadata + JSON-LD, Client Component for interactive UI
- `motion.div` with fadeIn/slideUp animations for page sections
- Container: `max-w-screen-xl mx-auto px-6 md:px-10`
- Orange-500 accent, Geist font, orange bar divider pattern
- `copy` object in lib/copy.ts as single source of truth for all page text

### Integration Points
- Header nav (`components/navigation/header.tsx`) — add "FAQ" to navItems array
- Footer nav (`components/navigation/footer.tsx`) — add "FAQ" link
- Sitemap (`app/sitemap.ts`) — add /faq route
- Expertise page (`components/services/ServicesPageClient.tsx`) — replace full FAQ section with teaser
- Services page (`app/services/page.tsx`) — remove FAQPage JSON-LD

</code_context>

<specifics>
## Specific Ideas

- Inspired by defactosound.com/faq: 4 categorized sections, comprehensive answers, professional tone
- Defacto uses emojis in category headers — Claude can decide whether to adopt this or keep it clean
- Defacto has a "Say hello" CTA with direct contact info — adapt for Lorenzo's contact page / WhatsApp
- Current 7 Q&As should be expanded and redistributed across the new 4 categories
- New questions should target long-tail search queries relevant to sound design hiring

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 11-dedicated-faq-page-inspired-by-defactosound-com-faq*
*Context gathered: 2026-03-29*
