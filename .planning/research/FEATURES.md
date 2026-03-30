# Feature Research

**Domain:** Bilingual (EN + PT-BR) professional portfolio — i18n milestone
**Researched:** 2026-03-30
**Confidence:** HIGH (Next.js 15 + next-intl are well-documented; bilingual UX patterns are mature)

---

## Context: Existing Architecture

This is a subsequent milestone, not a greenfield project. The following already exists and constrains feature decisions:

- All page copy is centralized in `lib/copy.ts` as typed TypeScript constants
- All project data lives in `lib/data/projects.ts` as a typed array; descriptions are currently in Portuguese
- Next.js 15 App Router with Server Components; no API routes or external database
- Comprehensive SEO already in place: JSON-LD, OG metadata, sitemap, hreflang not yet added
- Deploy target: Vercel (lorenzopardell.com)
- No middleware currently exists

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that define "this portfolio is bilingual." Missing any of these means the bilingual feature feels broken or incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Language switcher in header | Any bilingual site must let users change language at any time; discovering it buried in footer is a failure | LOW | Toggle between EN / PT-BR; two options only. Renders the locale as a link, no dropdown needed. Must appear in mobile nav too |
| Subfolder URL routing (`/pt-br/*`) | Professional SEO standard; both Google and users expect language versions to have distinct, stable URLs | MEDIUM | next-intl `localePrefix: "as-needed"` gives `/` for EN (no prefix change), `/pt-br/*` for PT-BR. Requires restructuring `app/` into `app/[locale]/` |
| Full copy translated to PT-BR | A bilingual site with untranslated UI is worse than a monolingual one — it breaks trust | HIGH | Affects `lib/copy.ts` (hero, CTA, expertise, nav, footer), FAQ (23 Q&As), about page bio, services page, contact page. Largest single content effort |
| Project descriptions translated to PT-BR | Projects are the core product; descriptions currently in PT-BR need EN versions; all 28 need both languages | HIGH | Data model change: `description` becomes `{ en: string; ptBR: string }` in `lib/data/projects.ts`. Roles (e.g. "Dialogue Editor") are professional terms — translate or keep EN is a product decision |
| Hreflang tags on every page | Google requires hreflang to avoid duplicate content penalty across language versions; without it, PT-BR pages compete against EN for rankings | MEDIUM | Must be self-referential (page links to itself) and reciprocal (EN page links to PT-BR equivalent and vice versa). Next.js `generateMetadata` with `alternates.languages` handles this cleanly |
| Per-language sitemap entries | Search engines need to discover all locale URLs to index them | LOW | `sitemap.ts` must emit both `/portfolio/[slug]` and `/pt-br/portfolio/[slug]` for each project, plus all static routes in both locales |
| `lang` attribute on `<html>` | Accessibility requirement (screen readers, browser autotranslate suppression); also a ranking signal | LOW | Next.js App Router sets this via `params.locale` in the root layout; straightforward when `[locale]` segment is in place |
| Language preference persisted (cookie) | After a user manually switches to PT-BR, returning to the site should not reset them to EN | LOW | next-intl middleware handles this via `NEXT_LOCALE` cookie automatically when `localeCookie` is configured |

### Differentiators (Competitive Advantage)

Features that go beyond baseline bilingual and demonstrate craft or professionalism.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Browser language auto-detection with redirect | Brazilian visitors landing on `/` get automatically redirected to `/pt-br` — zero friction for the primary target audience | LOW | next-intl middleware reads `Accept-Language` header and redirects on first visit. Cookie set after redirect prevents repeat redirects. One-time behavior; user can manually switch back |
| Per-language SEO metadata (title, description, keywords) | EN and PT-BR pages each rank for their respective market's search terms; bilingual keywords already in `app/layout.tsx` can be split into locale-specific sets | MEDIUM | `generateMetadata` per page must return locale-aware strings. `lib/copy.ts` becomes a per-locale structure. PT-BR metadata targets Brazilian production professionals specifically |
| Per-language JSON-LD structured data | Structured data in the user's language improves rich result eligibility in their market's search engine | MEDIUM | `lib/jsonld.ts` schema builders must accept locale and return translated `description`, `jobTitle`, and service names. Person schema `@language` property should match locale |
| Per-language OG / social metadata | When a Brazilian production company shares Lorenzo's portfolio on LinkedIn, the preview reads in Portuguese | LOW | OG `locale` property: `pt_BR` vs `en_US`. Title and description already locale-aware if per-language metadata is implemented |
| Translated project roles (optional) | "Dialogue Editor" → "Editor de Diálogos" for the PT-BR audience signals industry fluency | LOW | Roles are strings in the data. Can be a lookup map (`lib/role-translations.ts`) rather than duplicating in every project record. Decide: translate or keep EN as industry standard |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| CMS-driven translations | "It would be nice to update translations without code" | No CMS exists; adding one is a separate milestone with major scope. Next-intl JSON files are already code-adjacent. The audience (Lorenzo) is technically assisted | Keep translations in JSON files (`messages/en.json`, `messages/pt-br.json`) co-located with the codebase. Simple to edit, version-controlled, zero infrastructure |
| Third locale support (ES, FR, etc.) | "While we're doing i18n, why not add Spanish too?" | Architecture changes (middleware, routing, translation files) are locale-count-agnostic, but content translation is linear cost per locale. No content is ready for other languages | Ship EN + PT-BR only. Architecture will support additional locales trivially later |
| Separate domains per locale (lorenzopardell.com.br) | Domain signals stronger country targeting to Google | Requires DNS management, separate SSL, split PageRank, duplicate deployment configuration. No evidence Lorenzo needs .br domain specifically | Subfolder (`/pt-br/*`) achieves 90% of the SEO benefit at zero infrastructure cost. Google treats subfolder-based locales well |
| Machine-auto-translated copy | Fast to produce | Machine translation of professional audio industry copy sounds unprofessional to Brazilian industry peers — Lorenzo's target audience. Errors in technical terminology (ADR supervision, Dolby Atmos, re-recording mix) break credibility | Human-reviewed translations, or Lorenzo writes PT-BR copy directly (he is a native PT-BR speaker) |
| Per-language URL slugs (`/pt-br/portfolio/escravos-da-fe` vs `/pt-br/portfolio/escravos-da-fe-pt`) | Appears more "localized" | Project slugs are proper nouns (film/series titles); translating them creates routing complexity, broken links, and no SEO value for titles that are internationally known | Keep slugs language-agnostic (they are already in Portuguese/mixed); only locale prefix changes |
| Geolocation-based redirect (IP lookup) | "More accurate than Accept-Language" | Requires third-party IP database or API (adds external dependency), misclassifies VPN users and expats; `Accept-Language` is more accurate for language preference | Use `Accept-Language` header detection only via next-intl middleware |

---

## Feature Dependencies

```
[Subfolder URL routing — app/[locale]/]
    └──required by──> [Language switcher]
    └──required by──> [Hreflang tags]
    └──required by──> [Per-language sitemap entries]
    └──required by──> [lang attr on <html>]
    └──required by──> [Browser auto-detection redirect]
    └──required by──> [Language preference cookie]
    └──required by──> [Per-language SEO metadata]
    └──required by──> [Per-language JSON-LD]

[lib/copy.ts → locale-keyed messages/]
    └──required by──> [Full copy translated to PT-BR]
    └──required by──> [Per-language SEO metadata]
    └──required by──> [Per-language JSON-LD]

[Project data model change (description: { en, ptBR })]
    └──required by──> [Project descriptions translated]
    └──enhances──> [Per-language JSON-LD CreativeWork schema]

[Full copy translated to PT-BR]
    └──enhances──> [Per-language SEO metadata]
    └──enhances──> [Per-language JSON-LD]
```

### Dependency Notes

- **Subfolder routing requires `app/[locale]/` restructure first:** All other bilingual features depend on this. This is the highest-risk structural change — it touches every page file and the root layout.
- **`lib/copy.ts` must be migrated to message files before translation work:** The copy system is currently a single typed TS object. It must become locale-keyed JSON (or equivalent) before PT-BR copy can be added. next-intl uses `messages/en.json` + `messages/pt-br.json` format.
- **Project data model change is independent of routing restructure:** Can be done in parallel or before routing work.
- **Hreflang, sitemap, and OG locale depend on routing being stable:** These are additive changes that require stable locale-prefixed URLs to reference.
- **Browser auto-detection does not depend on translation being complete:** Middleware redirect can be implemented before copy translation — it will redirect to a partially-translated PT-BR site. Ship translation first.

---

## MVP Definition

### Launch With (v2.0 — this milestone)

Minimum to call the portfolio "bilingual" and have it be professionally credible.

- [ ] Subfolder routing: `app/[locale]/` with next-intl, `localePrefix: "as-needed"`, EN default at `/`, PT-BR at `/pt-br/*` — foundational, everything else depends on it
- [ ] Language switcher in header (desktop + mobile nav) — must be visible on every page
- [ ] Full copy translated to PT-BR — all `lib/copy.ts` content migrated to `messages/` JSON and translated
- [ ] Project descriptions in both EN and PT-BR — data model updated, EN descriptions written
- [ ] Hreflang tags on every page — self-referential + reciprocal, via `generateMetadata alternates.languages`
- [ ] Per-language sitemap entries — both locale versions of all routes
- [ ] `lang` attribute on `<html>` per locale — accessibility and ranking signal
- [ ] Language preference cookie — via next-intl middleware `localeCookie`
- [ ] Browser language auto-detection redirect — first-visit only, one-way, cookie prevents re-trigger
- [ ] Per-language SEO metadata (title, description, keywords) — separate EN and PT-BR meta per page
- [ ] Per-language OG metadata (locale field, translated title/description)

### Add After Validation (v2.x)

- [ ] Per-language JSON-LD structured data — valuable but additive; base bilingual SEO is covered by hreflang + per-language metadata
- [ ] Translated project roles — low effort, adds polish for PT-BR audience; defer until core translation is validated
- [ ] Per-language FAQ page content — 23 Q&As is significant translation volume; can launch with EN FAQ for both locales initially if timeline is tight

### Future Consideration (v3+)

- [ ] Third locale (ES or other) — architecture already supports it; content must be ready
- [ ] CMS-driven translation management — only if Lorenzo needs non-developer translation workflow

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Subfolder routing (`app/[locale]/`) | HIGH | HIGH | P1 — gate for all other features |
| Language switcher (header) | HIGH | LOW | P1 |
| Full copy translated PT-BR | HIGH | HIGH | P1 |
| Project descriptions EN + PT-BR | HIGH | MEDIUM | P1 |
| Hreflang tags | HIGH | LOW | P1 — SEO critical |
| Per-language sitemap entries | HIGH | LOW | P1 |
| `lang` on `<html>` | MEDIUM | LOW | P1 — accessibility |
| Language preference cookie | MEDIUM | LOW | P1 — bundled with middleware |
| Browser auto-detection redirect | HIGH | LOW | P1 — key UX for Brazilian visitors |
| Per-language SEO metadata | HIGH | MEDIUM | P1 |
| Per-language OG metadata | MEDIUM | LOW | P1 — additive once metadata is locale-aware |
| Per-language JSON-LD | MEDIUM | MEDIUM | P2 |
| Translated project roles | LOW | LOW | P2 |
| PT-BR FAQ translation | MEDIUM | MEDIUM | P2 |

**Priority key:**
- P1: Must have for launch of this milestone
- P2: Should have, add when possible within milestone
- P3: Nice to have, future consideration

---

## Architecture Impact on Existing Code

These are the structural changes that each feature requires, specific to this codebase.

| Existing Asset | Change Required | Reason |
|----------------|-----------------|--------|
| `app/` directory structure | Wrap all page directories under `app/[locale]/` | next-intl locale routing requires `[locale]` dynamic segment |
| `app/layout.tsx` | Becomes `app/[locale]/layout.tsx`; reads `params.locale` to set `lang` attr | Locale must be injected into `<html lang>` |
| `lib/copy.ts` | Migrate to `messages/en.json` + `messages/pt-br.json`; use `useTranslations()` / `getTranslations()` in components | next-intl translation API replaces direct TS imports |
| `lib/data/projects.ts` `description: string` | Change to `description: { en: string; ptBR: string }` | Bilingual project descriptions; all 28 records need EN versions written |
| `app/sitemap.ts` | Duplicate every route for both locales | Sitemap must include `/pt-br/*` equivalents |
| `app/layout.tsx` metadata | Split into per-locale `generateMetadata` | `title`, `description`, `keywords`, `openGraph.locale` all become locale-dependent |
| `lib/jsonld.ts` | Accept `locale` param; return translated strings | P2 — can be done after core routing works |
| `components/navigation/header.tsx` | Add language switcher component | Two-option toggle; must work as Server Component link (no JS required) |
| `middleware.ts` (new file) | next-intl middleware for locale detection, redirect, cookie | Does not currently exist; must be created |

---

## Sources

- [next-intl docs — App Router setup](https://next-intl.dev/docs/getting-started/app-router) — HIGH confidence
- [next-intl docs — Routing configuration (localePrefix)](https://next-intl.dev/docs/routing/configuration) — HIGH confidence
- [next-intl docs — Middleware](https://next-intl.dev/docs/routing/middleware) — HIGH confidence
- [Next.js official i18n guide](https://nextjs.org/docs/app/guides/internationalization) — HIGH confidence
- [Multilingual SEO: hreflang best practices 2025](https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-seo/) — MEDIUM confidence
- [Language selector UX best practices — Smashing Magazine](https://www.smashingmagazine.com/2022/05/designing-better-language-selector/) — MEDIUM confidence
- [Bilingual language switcher with Next.js + Tailwind](https://blog.arfy.ca/how-to-build-a-bilingual-language-switcher-next-js-app-with-tailwind-css/) — MEDIUM confidence
- [i18n SEO hreflang and locale URLs guide](https://better-i18n.com/en/blog/i18n-seo-hreflang-locale-urls-guide/) — MEDIUM confidence
- [Multilingual SEO issues — Seobility](https://www.seobility.net/en/blog/multilingual-seo-issues/) — MEDIUM confidence

---

*Feature research for: Bilingual portfolio — EN + PT-BR i18n milestone*
*Researched: 2026-03-30*
