# Phase 8: Copy Backup & Rewrite - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Back up all original page copy to a reference file, then rewrite every text element across the site for a professional B2B audience — producers and post-production supervisors hiring sound talent. This phase covers hero, CTA, services (renamed to "expertise"), about, contact, and footer copy. Project-specific data (descriptions, roles in `lib/data/projects.ts`) is NOT in scope.

</domain>

<decisions>
## Implementation Decisions

### Voice & Tone
- **D-01:** Industry peer register — confident, direct, no fluff. Like a seasoned professional talking to another professional.
- **D-02:** First person ("I") throughout all pages.
- **D-03:** No wordplay, no puns, no cliches. Straight professional language. No "Amplify Your Story" or "cut through the noise."
- **D-04:** Keep the hero rotating word animation — update the words/headline text but preserve the animated word swap.
- **D-05:** English only for this phase.

### Specificity & Credentials
- **D-06:** Use concrete numbers — "30+ credits", "8+ years", specific formats and deliverables.
- **D-07:** Services descriptions should name key technical deliverables (5.1, stereo, Dolby Atmos, Foley, ADR supervision).
- **D-08:** About page mentions types of work (feature films, Netflix series, documentaries, commercials) but NOT specific project names.
- **D-09:** Location: "Based in Sao Paulo, Brazil. Available for remote and on-location projects worldwide."
- **D-10:** Rename "Services" to "Expertise" across the entire site (navigation, page titles, section headings, all references).
- **D-11:** Use "30+ credits" as the project count. User will add more projects later.
- **D-12:** Reference "8+ years" of experience where natural.

### Backup Approach
- **D-13:** Create a single reference file (`lib/copy-backup.md`) with all original strings organized by page/section before any copy changes.
- **D-14:** Backup is a markdown file (human-readable reference), not code.

### Copy Architecture
- **D-15:** Extract all page-level copy to a centralized `lib/copy.ts` file using TypeScript with `as const`.
- **D-16:** Components import copy from `lib/copy.ts` instead of using inline string literals and default props.
- **D-17:** Project-specific data (descriptions, roles) stays in `lib/data/projects.ts` — only page-level text moves to the copy file.

### Claude's Discretion
- Claude has flexibility on exact wording as long as it follows the industry peer voice, first person, no wordplay, and concrete specificity rules above.
- Claude decides the structure of `lib/copy.ts` (object shape, nesting, key names) as long as it's typed and clean.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above.

### Project Context
- `.planning/REQUIREMENTS.md` — COPY-01 through COPY-07 define the scope
- `.planning/ROADMAP.md` — Phase 8 success criteria (5 items)
- `.planning/PROJECT.md` — Core project context, current state

### Existing Copy Locations
- `components/home/HeroSection.tsx` — Hero title, rotating words, subtitle (default props)
- `components/home/CTASection.tsx` — CTA title, subtitle, description, button text (default props)
- `components/home/ServicesSection.tsx` — Service cards with title + description (inline array)
- `components/navigation/footer.tsx` — Footer tagline (inline string)
- `components/about/AboutPageClient.tsx` — About page bio content
- `app/contact/page.tsx` — Contact page copy
- `app/services/page.tsx` — Services page metadata
- `app/about/page.tsx` — About page metadata
- `components/navigation/header.tsx` — Navigation items (rename "Services" to "Expertise")

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/contact-info.ts` — Centralized contact info (phone, email, WhatsApp). Copy file follows same pattern.
- `lib/data/projects.ts` — Project data with typed array and helper functions. Copy file mirrors this "single source" approach.
- `lib/animations.ts` — Centralized animation variants. Shows the codebase already uses lib/ for shared constants.

### Established Patterns
- Default props pattern: Components like HeroSection and CTASection accept copy as props with defaults. Refactor to import from `lib/copy.ts` instead.
- `as const` typing: Used in data files for type safety.
- Named exports from lib/: `getVisibleSocialLinks()`, `contactInfo` — new copy exports follow same convention.

### Integration Points
- Navigation items in `header.tsx` — "Services" label needs renaming to "Expertise"
- Navigation items in `footer.tsx` — Same rename
- Route paths — `/services` URL stays the same (only the display label changes, not the route)
- Metadata in page files (`app/*/page.tsx`) — title and description strings reference services/expertise

</code_context>

<specifics>
## Specific Ideas

- Hero preview style the user liked: "Sound for film, series & documentary. Re-recording mixer and sound designer with 30+ credits across Europe and the Americas."
- CTA preview style: "Let's talk about your project. Usually respond within 24 hours."
- Services should be framed as "Expertise" not "Services" — the three areas (Re-Recording Mix, Sound Design, Audio Editing) stay the same.
- Footer tagline currently reads: "I partner with creators and brands to create immersive and meaningful audio experiences" — needs rewrite to match industry peer voice.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-copy-backup-rewrite*
*Context gathered: 2026-03-28*
