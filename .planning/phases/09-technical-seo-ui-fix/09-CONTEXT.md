# Phase 9: Technical SEO & UI Fix - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Add JSON-LD structured data to all pages, optimize page titles and meta descriptions with keywords, update image alt text to be descriptive, implement per-project OG images using existing hero photos, add Twitter card metadata, and fix footer social link touch targets for mobile. This phase makes the site fully machine-readable and social-share-ready.

</domain>

<decisions>
## Implementation Decisions

### JSON-LD Structured Data
- **D-01:** Claude's discretion on homepage schema combination (Person + ProfilePage or Person + LocalBusiness — pick what's most appropriate for a freelancer portfolio with local presence in Sao Paulo).
- **D-02:** Project detail pages get CreativeWork schema with contributor role data — title, description, contributor (Person with roleName array), production company, release year. Data sourced from `lib/data/projects.ts`.

### OG Images & Social Sharing
- **D-03:** Per-project OG images use existing hero photos directly from `public/images/projects/{slug}/`. No image generation or text overlay — just point openGraph.images to the project's hero image.
- **D-04:** Twitter card metadata added to all pages (twitter:card = summary_large_image for project pages, summary for other pages).

### Meta/Title Keyword Strategy
- **D-05:** Root layout default title includes location: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo"
- **D-06:** Each page gets a keyword-rich title (not just the section name). Examples:
  - Expertise: "Sound Design & Mixing Expertise | Lorenzo Pardell"
  - Portfolio: "Sound Design Portfolio | Film, Series & Documentary | Lorenzo Pardell"
  - About: "About | Re-Recording Mixer & Sound Designer | Lorenzo Pardell"
- **D-07:** Keep both English and Portuguese keywords in the keywords array for dual-market SEO.
- **D-08:** Meta descriptions should reference concrete credentials from `lib/copy.ts` (30+ credits, 8+ years, Sao Paulo).

### Image Alt Text
- **D-09:** All image alt text must be descriptive and include project name + context. Not "thumbnail" or "hero" — instead "Behind the scenes of [Project Title]" or "[Project Title] - sound design by Lorenzo Pardell".

### Footer Touch Targets (UI-01)
- **D-10:** Padding-only fix — add min-h-[44px] min-w-[44px] and padding to footer social link elements. Icons stay the same visual size, tappable area increases to meet 44x44px minimum. No visual design change.

### Claude's Discretion
- Exact JSON-LD schema structure and property selection
- Homepage schema combination (Person+ProfilePage or Person+LocalBusiness)
- Exact wording of meta descriptions per page
- Alt text phrasing for each specific image
- Twitter card type per page (summary vs summary_large_image)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above.

### Project Context
- `.planning/REQUIREMENTS.md` — SEO-01 through SEO-06, UI-01 define the scope
- `.planning/ROADMAP.md` — Phase 9 success criteria (5 items)
- `.planning/PROJECT.md` — Core project context, deploy target (lorenzopardell.com)

### Copy Source (Phase 8 output)
- `lib/copy.ts` — All page copy with credentials (30+ credits, 8+ years). Meta descriptions should align with this copy.

### Existing SEO Infrastructure
- `app/layout.tsx` — Root metadata with title template, keywords, OG config, metadataBase
- `app/portfolio/[slug]/page.tsx` — Per-project generateMetadata() already exists (needs OG image + Twitter card additions)
- `app/sitemap.ts` — Existing sitemap generation
- `app/robots.ts` — Existing robots.txt

### Data Source for JSON-LD
- `lib/data/projects.ts` — Project records with title, slug, description, roles[], production_company, release_date, hero_url, category
- `lib/social-links.tsx` — Social media URLs for Person.sameAs
- `lib/contact-info.ts` — Contact details for LocalBusiness/Person

### Footer Component
- `components/navigation/footer.tsx` — Social links section (lines 80-96) where touch targets need fixing

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `generateMetadata()` pattern already exists in `app/portfolio/[slug]/page.tsx` — extend it with OG images and Twitter cards
- `metadataBase` already set to `https://lorenzopardell.com` in root layout — OG image URLs resolve correctly
- `lib/social-links.tsx` has all social URLs — reuse for Person.sameAs in JSON-LD
- `lib/contact-info.ts` has phone/email — reuse for Person/LocalBusiness contact info

### Established Patterns
- Next.js Metadata API used throughout (not manual `<meta>` tags) — JSON-LD should use Next.js `metadata.other` or a `<script>` in layout
- Title template `%s | Lorenzo Pardell` — page-specific titles slot into this template
- Static metadata exports on server component pages — consistent pattern to follow

### Integration Points
- `app/layout.tsx` — Root-level JSON-LD (Person schema), updated default title, Twitter card defaults
- `app/portfolio/[slug]/page.tsx` — Per-project JSON-LD (CreativeWork), OG image, Twitter card
- All page files (`app/*/page.tsx`) — Updated titles and meta descriptions
- `components/navigation/footer.tsx` — Touch target CSS fix on social links
- All image components — Updated alt text props

</code_context>

<specifics>
## Specific Ideas

- User approved the keyword-rich title preview: "Sound Design & Mixing Expertise | Lorenzo Pardell" style
- Portuguese keywords kept alongside English for Brazilian local SEO
- Per-project OG images are zero-effort: just point to existing hero photos, no generation needed
- Footer fix is CSS-only: padding/min-size changes, no layout restructure

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 09-technical-seo-ui-fix*
*Context gathered: 2026-03-28*
