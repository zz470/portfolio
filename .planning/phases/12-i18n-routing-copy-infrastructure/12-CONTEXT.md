# Phase 12: i18n Routing & Copy Infrastructure - Context

**Gathered:** 2026-03-31 (auto mode)
**Status:** Ready for planning

<domain>
## Phase Boundary

Every page accessible at both `/` (English) and `/pt-br/*` (Portuguese) with browser auto-detection, language preference cookie, and all site copy migrated from `lib/copy.ts` to locale-keyed files with PT-BR translations. This phase delivers the routing scaffold and copy infrastructure that all subsequent phases depend on.

</domain>

<decisions>
## Implementation Decisions

### Routing Strategy
- **D-01:** Use `app/[locale]/` dynamic segment routing with `localePrefix: 'as-needed'` — EN pages have no prefix (`/`), PT-BR pages live at `/pt-br/*`
- **D-02:** Move all existing `app/` page directories into `app/[locale]/` as a single atomic operation — verify every existing route returns 200 in both locales before proceeding to copy work
- **D-03:** Root layout moves to `app/[locale]/layout.tsx` with `generateStaticParams` returning both `en` and `pt-br` locales
- **D-04:** Set `html lang` attribute dynamically based on locale param

### Translation Library
- **D-05:** Use next-intl v4 as the i18n framework — handles routing, middleware, translation loading, and hreflang as a unified system
- **D-06:** Install `negotiator` and `@formatjs/intl-localematcher` for Accept-Language header parsing (per Next.js official docs recommendation)

### Copy Migration
- **D-07:** Migrate `lib/copy.ts` to locale-keyed TypeScript files: `lib/copy/en.ts` and `lib/copy/pt-br.ts` sharing a `CopyShape` interface for compile-time parity enforcement
- **D-08:** Create `lib/i18n/getDictionary.ts` as server-only async resolver — never ships translation content to client bundle
- **D-09:** Delete `lib/copy.ts` after migration is complete — no split-brain state with both old and new copy systems coexisting
- **D-10:** All existing `import { copy }` references across the codebase must be updated to use `getDictionary(locale)` pattern

### Middleware Behavior
- **D-11:** Create `middleware.ts` at project root for Accept-Language detection and redirect
- **D-12:** First-visit only redirect — detect browser language via Accept-Language header, redirect Brazilian visitors to `/pt-br/`, set `NEXT_LOCALE` cookie for persistence
- **D-13:** Returning users with `NEXT_LOCALE` cookie skip auto-detection entirely
- **D-14:** Middleware matcher must exclude static assets, `_next`, `api`, `favicon.ico`, `sitemap.xml`, `robots.txt` — use pattern `'/((?!api|_next|_vercel|.*\\..*).*)'` to prevent redirect loops

### Claude's Discretion
- Exact copy file structure (flat object vs nested keys) — as long as CopyShape interface enforces parity
- Loading skeleton adjustments during migration
- Error handling for missing translation keys
- Exact middleware cookie configuration (maxAge, path, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Architecture
- `.planning/PROJECT.md` — Core value, current state, active requirements for v2.0
- `.planning/ROADMAP.md` — Phase 12 description, success criteria, dependencies
- `.planning/research/SUMMARY.md` — Full research findings, recommended stack, architecture approach, critical pitfalls
- `.planning/research/ARCHITECTURE.md` — Detailed architecture patterns for i18n implementation
- `.planning/research/PITFALLS.md` — Critical pitfalls to avoid (middleware loops, hreflang errors, split-brain copy)

### Existing Code
- `app/layout.tsx` — Current root layout (must move to `app/[locale]/layout.tsx`)
- `lib/copy.ts` — Current centralized copy (482 lines, must be migrated and deleted)
- `components/navigation/header.tsx` — Imports copy, uses `usePathname` (both affected by i18n)
- `components/navigation/footer.tsx` — Imports copy (affected by migration)
- `lib/jsonld.ts` — JSON-LD builders (will need locale param in Phase 14, but structure impacts Phase 12 layout changes)

### External Documentation
- [next-intl v4 App Router setup](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl middleware docs](https://next-intl.dev/docs/routing/middleware)
- [Next.js official i18n guide](https://nextjs.org/docs/app/guides/internationalization)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/copy.ts`: 482-line centralized copy object — all keys need migration to locale files; structure provides the template for `CopyShape` interface
- `lib/utils.ts`: `cn()` utility — unchanged, continues to work
- `lib/jsonld.ts`: JSON-LD builders — will need locale param eventually (Phase 14) but no changes in this phase
- `components/ui/*`: All shadcn primitives — unchanged

### Established Patterns
- **Server Components with client wrappers**: Root layout is Server Component; Header is `"use client"`. The `getDictionary` pattern fits naturally — server components call it directly, client components receive copy as props
- **Direct imports from lib/**: `import { copy } from "@/lib/copy"` used across ~10+ files. All must be updated to locale-aware pattern
- **`usePathname` in header**: Currently uses `next/navigation` `usePathname` — with next-intl, may need to switch to next-intl's locale-aware `usePathname` to handle prefix correctly

### Integration Points
- `app/layout.tsx` → becomes `app/[locale]/layout.tsx` — the structural pivot point
- Every `page.tsx` under `app/` → moves under `app/[locale]/`
- `components/navigation/header.tsx` → needs locale-aware pathname detection (isHomePage check must account for `/pt-br/`)
- `app/sitemap.ts` and `app/robots.ts` → stay at root (not under `[locale]`)
- `app/not-found.tsx` and `app/error.tsx` → move under `[locale]`

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches as documented in next-intl v4 guides.

</specifics>

<deferred>
## Deferred Ideas

- Language switcher UI — Phase 15
- Project description translations — Phase 13
- Per-language SEO metadata/hreflang — Phase 14
- Per-language JSON-LD — Phase 14
- PT-BR FAQ translation — deferred beyond v2.0 per research recommendation

</deferred>

---

*Phase: 12-i18n-routing-copy-infrastructure*
*Context gathered: 2026-03-31*
