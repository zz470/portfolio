# Project Research Summary

**Project:** Lorenzo Pardell Portfolio — Bilingual i18n Milestone
**Domain:** Internationalization (EN + PT-BR) for Next.js 15 App Router portfolio
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

Adding bilingual EN + PT-BR support to this portfolio is a well-understood problem with clear, well-documented solutions. The recommended library — next-intl v4 — is purpose-built for Next.js 15 App Router and handles routing, middleware, translation loading, and hreflang generation as a unified system. The key structural change is wrapping the entire `app/` directory under an `app/[locale]/` dynamic segment, which serves English at `/` (no prefix) and Portuguese at `/pt-br/*`. All other work flows from this single architectural decision.

The highest-risk element is not technical complexity — it is the scope of content migration. Every page of copy in `lib/copy.ts`, 28 project descriptions, and the 23-question FAQ all need Portuguese translations. The architecture required to support bilingualism is low-risk and well-tested; the translation content volume is the actual constraint. Since Lorenzo is a native PT-BR speaker who can write his own copy, this is manageable but must be scoped realistically.

The critical pitfalls to avoid are all execution-level, not design-level: middleware that inadvertently catches static assets (causing infinite redirect loops), incorrectly wired hreflang that results in Google treating locale variants as duplicate content, and maintaining two parallel copy systems during migration instead of executing a clean single-pass cutover. All three are well-documented failure modes with clear prevention strategies.

---

## Key Findings

### Recommended Stack

next-intl v4 is the unambiguous choice for this project. It is the only library that handles locale routing, middleware detection, translation loading, and hreflang generation as a unified Next.js-native system without custom wiring. At 1.8M weekly downloads and full Next.js 15 / React 19 compatibility, it has the largest community and most documentation. Alternatives — next-i18next, react-i18next, manual dictionary approach — all require hand-rolling infrastructure that next-intl provides out of the box, at the cost of complexity that is unjustified for a 2-locale personal portfolio.

Two small supporting packages are needed: `negotiator` and `@formatjs/intl-localematcher` for browser `Accept-Language` header parsing. These are the libraries recommended by the Next.js official documentation for locale detection and add no meaningful overhead.

**Core technologies:**
- `next-intl ^4.8.3`: i18n routing, translations, locale detection, hreflang — the only library that handles all four without custom wiring
- `negotiator ^0.6.3`: Parse `Accept-Language` header for browser locale detection — recommended by Next.js official docs
- `@formatjs/intl-localematcher ^0.5.4`: Match browser language preferences to supported locales — pairs with negotiator; used in Next.js official examples

**Do not use:**
- `next-i18next`: Built for Pages Router; App Router support is bolted on
- `next.config.ts i18n` key: Pages Router feature only; no effect in App Router projects
- Translations stored in Supabase or any external DB: Contradicts the project's core no-external-dependency constraint

### Expected Features

The full bilingual feature set breaks cleanly into table stakes (the site is not credibly bilingual without these) and differentiators (polish that goes beyond baseline). The content translation effort dominates all implementation effort combined.

**Must have (table stakes):**
- Subfolder URL routing (`/pt-br/*`) — foundational; everything else depends on stable locale URLs
- Language switcher in header (desktop + mobile) — must appear on every page; users expect to control this
- Full copy translated to PT-BR — untranslated UI breaks trust more than no localization at all
- Project descriptions in EN and PT-BR — projects are the core product; 28 records, data model change required
- Hreflang tags on every page — without this, EN and PT-BR pages compete against each other in Google
- Per-language sitemap entries — search engines need to discover all locale URLs
- `lang` attribute on `<html>` — accessibility requirement and ranking signal
- Language preference cookie — returning users should not be re-detected on every visit
- Browser language auto-detection redirect — first-visit only; Brazilian visitors land in PT-BR immediately
- Per-language SEO metadata (title, description, OG tags) — each market gets locale-appropriate search signals

**Should have (competitive):**
- Per-language JSON-LD structured data — localized structured data strengthens PT-BR rich result eligibility
- Translated project roles — "Dialogue Editor" → "Editor de Diálogos" signals industry fluency to Brazilian peers

**Defer (v2+):**
- PT-BR FAQ translation — 23 Q&As is significant volume; can launch with EN FAQ for both locales initially
- Third locale (ES or other) — architecture supports it; no content ready
- CMS-driven translation management — only needed if Lorenzo requires a non-developer translation workflow

### Architecture Approach

The canonical pattern for this project is `app/[locale]/` dynamic segment routing with locale-keyed copy files and no React context for translations. All pages are Server Components that receive `params.locale`, call `getDictionary(locale)` to get the right copy object, and pass copy down as props to any client animation wrappers. This preserves the existing RSC architecture and enables full static generation of all locale variants at build time via `generateStaticParams`. The middleware lives at the project root and handles only `Accept-Language` detection and initial redirect — no complex locale negotiation logic.

The `lib/copy.ts` migration is a complete replacement, not an extension: all keys move to `messages/en.json` and `messages/pt-br.json`, the TypeScript `CopyShape` interface enforces parity between locales at compile time, and `lib/copy.ts` is deleted when migration is complete. Project bilingual fields are added flat to the existing `Project` interface (`description_pt_br?`, `roles_pt_br?`) rather than a separate file — appropriate for 28 projects.

**Major components:**

1. `middleware.ts` (new) — `Accept-Language` detection, `/pt-br` redirect, cookie for preference persistence
2. `app/[locale]/layout.tsx` (moved + modified) — sets `html lang`, injects locale-aware JSON-LD, `generateStaticParams` for both locales
3. `lib/i18n/getDictionary.ts` (new) — async locale-to-copy-object resolver; server-only; never ships translation JSON to client bundle
4. `lib/copy/en.ts` + `lib/copy/pt-br.ts` (split from copy.ts) — locale-specific copy objects sharing a shared `CopyShape` TypeScript interface
5. `components/navigation/LanguageSwitcher.tsx` (new) — isolated `"use client"` component; uses next-intl router to correctly handle dynamic segment URLs
6. `app/sitemap.ts` (modified) — doubles entries with PT-BR alternates and `x-default`

### Critical Pitfalls

1. **Middleware redirect loops on static assets** — The matcher pattern must exclude files with dots and all `_next`, `api`, `favicon.ico`, `sitemap.xml`, `robots.txt` paths. Use `'/((?!api|_next|_vercel|.*\\..*).*)'` as the matcher. This is the first thing to get right; all other work is blocked until static assets load cleanly.

2. **Breaking existing dynamic routes during `[locale]` restructure** — Moving `app/portfolio/[slug]/` to `app/[locale]/portfolio/[slug]/` must be done as a single atomic operation. Verify every existing route returns 200 in both locales before writing a single line of translation. The `[category]` route coexistence adds risk.

3. **Incorrect hreflang causing duplicate content penalties** — Both `generateMetadata` (for `<head>` tags) and `app/sitemap.ts` must be updated independently; updating one does not update the other. Every page needs self-referencing canonicals (not always pointing to EN), reciprocal hreflang, and `x-default`. 40+ URL pairs must all be correct.

4. **`lib/copy.ts` split-brain during migration** — The migration from `lib/copy.ts` to `messages/` JSON must be atomic. Do not run the site with both `import { copy }` and `useTranslations` coexisting. Execute the migration in one phase; delete `lib/copy.ts` before shipping.

5. **Language switcher breaking server component architecture** — The header must stay a Server Component. Extract only the switcher button as a `"use client"` component using next-intl's `useRouter`/`usePathname` (not Next.js core equivalents). Next.js core `usePathname` does not correctly handle locale prefixes on dynamic routes.

---

## Implications for Roadmap

Based on combined research, the architecture imposes a strict dependency order. Routing must be stable before copy migration; copy migration must be complete before page wiring; page wiring must be complete before SEO; the language switcher can be parallelized with SEO. Suggested 5-phase structure:

### Phase 1: Routing Foundation

**Rationale:** Every other feature depends on stable `[locale]` URL routing. This is the highest-risk structural change — it touches every page file and the root layout. Must be verified with smoke tests before any translation work begins.
**Delivers:** `middleware.ts` with correct matcher, `app/[locale]/` scaffold with `generateStaticParams`, all existing routes verified at 200 in both locales, locale-aware `html lang` attribute, language preference cookie via `NEXT_LOCALE`.
**Addresses features:** Subfolder URL routing, `lang` on `<html>`, language preference cookie, browser auto-detection redirect.
**Avoids pitfalls:** Middleware redirect loops (Pitfall 1), dynamic route 404s (Pitfall 2), 307 redirect and EN indexing risk (Pitfall 6).
**Research flag:** Standard pattern — next-intl docs are comprehensive. No additional research needed.

### Phase 2: Copy Infrastructure and Translation

**Rationale:** `lib/copy.ts` must become locale-keyed message files before PT-BR copy can exist. This phase does the structural migration (EN to JSON) and writes the full PT-BR translation. These two steps are logically sequential but tightly coupled — do them together to avoid a partially-migrated state.
**Delivers:** `messages/en.json` (all keys migrated from `lib/copy.ts`), `messages/pt-br.json` (full PT-BR translation), `lib/copy/types.ts` (`CopyShape` interface), `lib/i18n/getDictionary.ts`, TypeScript type enforcement for translation key parity, `lib/copy.ts` deleted.
**Addresses features:** Full copy translated to PT-BR, language preference cookie (bundled).
**Avoids pitfalls:** `lib/copy.ts` split-brain (Pitfall 4), translation key divergence (Pitfall 8).
**Research flag:** Standard pattern — but the actual PT-BR copy writing is Lorenzo's content work. Plan for content review cycle.

### Phase 3: Project Data and Page Wiring

**Rationale:** With routing stable and copy infrastructure in place, all pages can be connected to locale-aware data. Project data model change is independent of copy migration but must precede locale-aware page rendering.
**Delivers:** `lib/data/projects.ts` with `description_pt_br?` and `roles_pt_br?` fields for all 28 records, all pages under `app/[locale]/` wired to `getDictionary(locale)` and locale-aware project data, EN copy unchanged and functional throughout.
**Addresses features:** Project descriptions EN + PT-BR, all page copy rendering correctly per locale.
**Avoids pitfalls:** Client-side locale state anti-pattern (copy must come from server, not React state).
**Research flag:** Standard pattern. Risk is data entry volume (28 projects need EN descriptions written).

### Phase 4: SEO — Hreflang, Sitemap, Metadata, JSON-LD

**Rationale:** SEO work requires stable locale URLs and complete copy to reference. This phase should not be started until Phase 3 is deployed and verified. hreflang errors take weeks to recover from in Google Search Console — get this right in one pass.
**Delivers:** Per-language `generateMetadata` with `alternates.languages` on every page (static + dynamic), rewritten `app/sitemap.ts` with both locale entries and `x-default`, locale-aware OG metadata, `lib/jsonld.ts` updated to accept `locale` param and return Portuguese descriptions for PT-BR pages.
**Addresses features:** Hreflang tags, per-language sitemap entries, per-language SEO metadata, per-language OG metadata, per-language JSON-LD.
**Avoids pitfalls:** Duplicate content penalty (Pitfall 3), JSON-LD English-only on PT-BR pages (Pitfall 5).
**Research flag:** This phase is well-documented but has many independent integration points (generateMetadata, sitemap, JSON-LD are three separate systems). Consider a dedicated pre-phase checklist review.

### Phase 5: Language Switcher UI

**Rationale:** The language switcher depends on locale URLs existing and being stable. It can be parallelized with Phase 4 if resources allow, but it is the safest to do last — purely additive UI, no risk to existing functionality.
**Delivers:** `components/navigation/LanguageSwitcher.tsx` isolated client component using next-intl router, integration into header (desktop + mobile nav), active locale visual indicator, correct locale switching on dynamic routes (project detail pages tested explicitly).
**Addresses features:** Language switcher in header.
**Avoids pitfalls:** Language switcher breaking server component architecture (Pitfall 7), switcher navigating to wrong URL on dynamic routes.
**Research flag:** Standard pattern. next-intl's locale-aware router handles the dynamic segment resolution correctly.

### Phase Ordering Rationale

- Phase 1 is non-negotiable first: the `[locale]` segment is a prerequisite for all other work. Doing copy work before routing is stable wastes effort and creates risk.
- Phases 2 and 3 can be partially parallelized (project data model change can start during Phase 2), but the page wiring in Phase 3 needs the `getDictionary` infrastructure from Phase 2 to be complete.
- Phase 4 deliberately comes after all content is in place. Submitting incomplete hreflang to Google creates a worse SEO outcome than submitting nothing — incorrect hreflang tags must later be corrected with a recrawl request.
- Phase 5 is last but not least — it is the user-facing entry point for all the work above. Placing it last ensures the URLs it links to are stable.

### Research Flags

Phases with standard, well-documented patterns (can skip `/gsd:research-phase`):
- **Phase 1:** next-intl middleware setup is thoroughly documented with official guides and confirmed GitHub issues
- **Phase 2:** Copy migration pattern is mechanical and next-intl type enforcement is official documentation
- **Phase 3:** Project data model change and page wiring are standard Next.js patterns
- **Phase 5:** Language switcher with next-intl router is documented with examples

Phases that benefit from a pre-execution checklist review (not full research, but verification step):
- **Phase 4:** Three independent SEO systems (generateMetadata, sitemap, JSON-LD) must all be updated consistently. A pre-execution audit of every affected file is recommended before coding starts.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official next-intl docs, Next.js official i18n guide, confirmed npm download trends. next-intl v4 released March 2025, targets Next.js 15 directly. |
| Features | HIGH | Features are well-defined for a 2-locale portfolio. Table stakes are industry standard. Deferral decisions are conservative and reversible. |
| Architecture | HIGH | Verified against Next.js 15 official docs (updated 2026-03-25) and next-intl docs. Patterns confirmed working with App Router + React 19. |
| Pitfalls | HIGH | Pitfalls sourced from confirmed GitHub issues on the vercel/next.js repository plus official docs. Middleware redirect loop issue confirmed in issues #62547, #49656, #55648. |

**Overall confidence:** HIGH

### Gaps to Address

- **PT-BR copy content readiness:** The architecture and tooling are clear; the bottleneck is content. Lorenzo needs to write or review all PT-BR translations before Phase 2 can be marked complete. The 23-question FAQ is the highest-volume single block. Plan a content review step in Phase 2 rather than treating it as a pure code task.

- **EN project descriptions:** Current `lib/data/projects.ts` descriptions are in Portuguese. Phase 3 requires English descriptions to be written for all 28 projects. This is content work, not technical work — it should be planned as a parallel track or pre-work before Phase 3 begins.

- **`app/robots.ts` update:** Pitfalls research flags that `robots.ts` may need updating after i18n routes are added. The exact rules needed (whether to allow or disallow any locale-specific paths) depend on the final URL structure. Assess in Phase 4.

- **Category pages in PT-BR:** `app/portfolio/category/[category]/page.tsx` is mentioned in architecture as a route to move but is not prominently called out in features. Verify that category filter pages behave correctly under the `[locale]` segment before closing Phase 1.

---

## Sources

### Primary (HIGH confidence)
- [next-intl official docs — App Router setup](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl 4.0 release blog](https://next-intl.dev/blog/next-intl-4-0) — v4 released March 12, 2025; targets Next.js 13-15+
- [next-intl routing configuration docs](https://next-intl.dev/docs/routing/configuration) — confirms `localePrefix: 'as-needed'`
- [next-intl middleware docs](https://next-intl.dev/docs/routing/middleware)
- [Next.js official i18n guide](https://nextjs.org/docs/app/guides/internationalization) — updated 2026-03-25
- [Next.js sitemap API reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [GitHub vercel/next.js #62547](https://github.com/vercel/next.js/issues/62547) — middleware redirect loop confirmed
- [GitHub vercel/next.js #49656](https://github.com/vercel/next.js/issues/49656) — middleware redirect loop confirmed
- [GitHub vercel/next.js #48812](https://github.com/vercel/next.js/issues/48812) — dynamic route 404s with i18n confirmed

### Secondary (MEDIUM confidence)
- [npm next-intl package page](https://www.npmjs.com/package/next-intl) — v4.8.3 current as of Feb 2026; 1.8M weekly downloads
- [Best i18n Libraries for Next.js App Router in 2026 — DEV Community](https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f)
- [i18next vs next-intl comparison — i18nexus](https://i18nexus.com/posts/i18next-vs-next-intl)
- [Multilingual SEO: hreflang best practices 2025 — EastonDev](https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-seo/)
- [Bilingual language switcher with Next.js + Tailwind](https://blog.arfy.ca/how-to-build-a-bilingual-language-switcher-next-js-app-with-tailwind-css/)
- [Multilingual sitemap with next-intl — DEV Community](https://dev.to/oikon/implementing-multilingual-sitemap-with-next-intl-in-nextjs-app-router-1354)
- [Language selector UX best practices — Smashing Magazine](https://www.smashingmagazine.com/2022/05/designing-better-language-selector/)
- [next-intl Complete Setup Guide 2025 — Build with Matija](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)

---
*Research completed: 2026-03-30*
*Ready for roadmap: yes*
