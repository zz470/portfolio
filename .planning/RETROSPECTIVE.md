# Retrospective

## Milestone: v1.0 — Supabase to Local Data Migration

**Shipped:** 2026-03-27
**Phases:** 3 | **Plans:** 6

### What Was Built
- Local TypeScript data file with all 19 project records extracted from Postgres backup
- Placeholder SVG images (38 files) for thumbnails and heroes
- Complete rewiring of 14 consumer files from Supabase hooks to direct imports
- Full Supabase removal (client, package, env vars, config)
- Automated verification script (41 checks) + visual browser verification

### What Worked
- Extracting real data from the Postgres backup instead of generating fake records
- Wave-based execution with clear dependencies (data first, rewire second, verify third)
- Automated verification script caught data integrity issues before visual testing
- Worktree isolation for parallel executor agents

### What Was Inefficient
- Worktree agents didn't inherit changes from prior waves, requiring duplicate work (Plan 02-02 had to re-apply Plan 02-01's consumer rewiring)
- `.env.local` deletion was missed because it was untracked and worktree didn't have it
- REQUIREMENTS.md traceability table wasn't fully updated during execution (several checkboxes left unchecked)

### Patterns Established
- Always kill server ports before starting new dev server
- Never generate fake project data — extract from actual backups
- Verification phases work well as automated script + human visual confirmation

### Key Lessons
- Worktree isolation is great for parallel work but requires careful merge handling
- Small migrations (3 phases) complete efficiently in a single session
- Having the data file created first makes all subsequent work straightforward

## Milestone: v1.3 — Professional Polish & SEO

**Shipped:** 2026-03-29
**Phases:** 4 | **Plans:** 8

### What Was Built
- Complete copy rewrite for all pages — professional B2B voice centralized in `lib/copy.ts`
- "Services" rebranded to "Expertise" across navigation and headings
- JSON-LD structured data (Person, ProfessionalService, CreativeWork) on all pages
- SEO metadata optimization: keyword-rich titles, meta descriptions, Twitter cards, per-project OG images
- Bilingual keywords (English + Portuguese) for dual-market SEO
- Category archive pages at `/portfolio/category/[category]` with SEO and sitemap
- Dedicated `/faq` page with 23 categorized Q&As, accordion UI, FAQPage JSON-LD
- Expertise page FAQ teaser linking to canonical `/faq`
- Footer social link touch target fix (44x44px minimum)

### What Worked
- Centralizing all copy in `lib/copy.ts` first (Phase 8) made SEO metadata and new pages (Phases 9-11) straightforward
- Phase dependency chain (copy → SEO → pages → FAQ) prevented rework
- Server Component architecture made JSON-LD injection clean — structured data in initial HTML
- Reusing existing Radix/shadcn accordion for FAQ kept consistency with existing UI patterns

### What Was Inefficient
- ROADMAP.md plan completion counts drifted from actual disk state (showed "1/2" when all were complete)
- Phase 11 was added mid-milestone as scope expansion — fine for this size but could cause drift on larger milestones
- Some SUMMARY.md one-liners were malformed (showed "One-liner:" placeholder), reducing automatic extraction quality

### Patterns Established
- Centralized copy file (`lib/copy.ts`) as single source for all page text — prevents copy drift
- JSON-LD builders in `lib/json-ld.ts` with typed helper functions per schema type
- Category routes under `/portfolio/category/` to avoid dynamic route conflicts
- Canonical FAQ page pattern: full content on `/faq`, teaser on related pages

### Key Lessons
- Copy-first approach (finalize text before SEO references it) is the right order for content-heavy milestones
- FAQ pages benefit from categorized structure — both for UX and for JSON-LD structured data targeting
- Mid-milestone scope additions (Phase 11) work when dependencies are clear and scope is bounded

## Cross-Milestone Trends

| Metric | v1.0 | v1.3 |
|--------|------|------|
| Phases | 3 | 4 |
| Plans | 6 | 8 |
| Commits | 33 | ~30 |
| Files changed | 50 | 60 |
| Lines added | 3,720 | 6,738 |
| Lines removed | 366 | 546 |
| Duration | 1 day | 2 days |
