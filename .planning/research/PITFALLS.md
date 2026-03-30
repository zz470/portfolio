# Pitfalls Research

**Domain:** Adding bilingual (EN + PT-BR) support to existing Next.js 15 App Router portfolio
**Researched:** 2026-03-30
**Confidence:** HIGH (verified against Next.js 15 docs, next-intl docs, confirmed GitHub issues)

---

## Critical Pitfalls

### Pitfall 1: Middleware Redirect Loops on Static Assets and API Routes

**What goes wrong:**
The i18n middleware intercepts every request including `/_next/static/`, `/public/` files, `favicon.ico`, `sitemap.xml`, and `robots.txt`. When the middleware tries to redirect these requests to a locale-prefixed URL, Next.js enters an infinite redirect loop (ERR_TOO_MANY_REDIRECTS). This is one of the most common and documented Next.js i18n issues — GitHub issue #62547, #49656, #55648 all confirm it affects Next.js 13–15.

**Why it happens:**
Developers copy a basic middleware matcher pattern from a fresh-project tutorial. The matcher in those tutorials only excludes `_next` but not `robots.txt`, `sitemap.xml`, images in `/public/`, and files with dots. The portfolio already has `app/sitemap.ts` and `app/robots.ts` as route handlers — these must not be locale-prefixed.

**How to avoid:**
Use the next-intl recommended matcher pattern that excludes files with dots AND specific system paths:

```typescript
export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
```

Additionally, protect the specific Next.js file-based metadata routes:
- `sitemap.xml` → rendered by `app/sitemap.ts`
- `robots.txt` → rendered by `app/robots.ts`
- `favicon.ico` → in `app/`

If using next-intl, its createMiddleware handles this correctly out of the box — do not write a custom redirect logic.

**Warning signs:**
- Browser shows `ERR_TOO_MANY_REDIRECTS` on any page load
- `sitemap.xml` returns 404 or redirects to `/pt-br/sitemap.xml`
- `robots.txt` is unreachable
- Chrome DevTools Network tab shows 307 → 307 → 307 loops on image or font requests

**Phase to address:**
Routing foundation phase (first i18n phase). The matcher configuration must be correct before any other i18n work proceeds.

---

### Pitfall 2: Breaking Existing Dynamic Routes — `/portfolio/[slug]` and `/portfolio/category/[category]`

**What goes wrong:**
The App Router i18n pattern requires wrapping the entire `app/` directory under a `[locale]` dynamic segment, turning the structure from `app/portfolio/[slug]/page.tsx` to `app/[locale]/portfolio/[slug]/page.tsx`. If this restructure is done incorrectly, Next.js generates a path collision: `[locale]` and `[slug]` are both dynamic segments at the same nesting level, causing 404 errors on all portfolio project pages in non-default locales.

This project has a specific existing risk: `app/portfolio/category/[category]` and `app/portfolio/[slug]` coexist. The category route was intentionally placed under `/portfolio/category/` to avoid slug conflicts (documented in PROJECT.md Key Decisions). Adding a `[locale]` wrapper above must preserve this exact structure.

**Why it happens:**
Tutorials show simple single-level rewrites. Multi-level dynamic routes (`[locale]/portfolio/[slug]`, `[locale]/portfolio/category/[category]`) are not tested in most guides. GitHub issue #48812 confirms 404s on dynamic routes when i18n is enabled incorrectly.

**How to avoid:**
- Move the entire `app/` route tree under `app/[locale]/` as a single atomic operation
- Verify ALL existing routes work in both locales before adding any translation content:
  - `/portfolio/[slug]` → `/[locale]/portfolio/[slug]`
  - `/portfolio/category/[category]` → `/[locale]/portfolio/category/[category]`
- Do not use middleware rewrites as a shortcut for the `/pt-br/*` prefix — use the `[locale]` folder restructure as the canonical approach
- Run a smoke test on every existing route immediately after the restructure

**Warning signs:**
- `/pt-br/portfolio/some-slug` returns 404
- `/portfolio/category/film` works but `/pt-br/portfolio/category/film` does not
- `generateStaticParams` in `[slug]/page.tsx` does not include the locale parameter
- TypeScript errors: page props type expects `{ params: { slug: string } }` but needs `{ params: { locale: string; slug: string } }`

**Phase to address:**
Routing foundation phase. This is the first thing to verify — before translations, before SEO, before the language switcher.

---

### Pitfall 3: Missing or Incorrect hreflang Tags Cause Duplicate Content Penalties

**What goes wrong:**
Google treats `/portfolio/some-slug` and `/pt-br/portfolio/some-slug` as duplicate content unless hreflang signals are correct. The site already has 28 project pages, 6 static pages, and category archive pages — that is 40+ URL pairs that all need correct hreflang. Common mistakes:
- hreflang tags added to `<head>` but not to the sitemap (Google requires both signals to be consistent)
- Missing `x-default` entry pointing to the English version
- Using wrong locale codes: `pt` instead of `pt-BR`, `en` instead of `en` (both are accepted but must be consistent)
- Self-referencing canonical pointing to the default locale from the PT-BR pages, which overrides hreflang and tells Google to ignore the PT-BR version

**Why it happens:**
Next.js `generateMetadata` `alternates` field generates hreflang in `<head>`, but the existing `app/sitemap.ts` must be separately updated to include `alternates.languages` for every URL. These are two independent systems — updating one does not update the other.

**How to avoid:**
- In `generateMetadata`, set `alternates.canonical` to the current locale's own URL (self-referencing, NOT always pointing to English)
- In `generateMetadata`, set `alternates.languages` with both `en` → English URL and `pt-BR` → PT-BR URL for every page
- Rewrite `app/sitemap.ts` to generate entries for both locales with `alternates.languages` for every route
- Include `x-default` pointing to the English version in the sitemap
- Validate with Google Search Console after deploy

**Warning signs:**
- Google Search Console shows "Duplicate without user-selected canonical" for PT-BR pages
- `<link rel="alternate" hreflang="pt-BR">` is missing from project detail page `<head>`
- `sitemap.xml` only lists English URLs (no PT-BR entries)
- Canonical tag on `/pt-br/portfolio/some-slug` points to `/portfolio/some-slug` instead of itself

**Phase to address:**
SEO phase (after routing works). Must be done for both static pages and the 28 dynamic project pages.

---

### Pitfall 4: lib/copy.ts Becomes a Split-Brain System

**What goes wrong:**
The site has all page copy centralized in `lib/copy.ts`. A naive i18n approach translates this into two parallel files (`copy.en.ts` and `copy.pt-br.ts`) or inlines PT-BR strings into the existing objects as a second property. Both approaches diverge from how next-intl (or any standard i18n library) expects translations to be organized. The result is two systems that must be kept in sync manually — the `copy.ts` module and the JSON message files — leading to copy drift where some text gets translated and some does not.

**Why it happens:**
`lib/copy.ts` was designed as a typed single-source-of-truth for EN copy. It works perfectly for a monolingual site. When i18n is added, developers try to "extend" it rather than migrate to a single i18n-native approach. The result is dead code and maintenance overhead.

**How to avoid:**
Migrate all `lib/copy.ts` content into locale message files (`messages/en.json`, `messages/pt-br.json`) in a single phase. Delete `lib/copy.ts` entirely. Use next-intl's `useTranslations` (client) and `getTranslations` (server) as the only source of page copy. Do not maintain two parallel copy systems.

The migration path is mechanical:
1. Convert every key in `lib/copy.ts` to a flat/nested JSON structure in `messages/en.json`
2. Translate to `messages/pt-br.json`
3. Replace all `copy.*` imports with `t('key')` calls
4. Delete `lib/copy.ts`

**Warning signs:**
- Both `import { copy }` and `useTranslations` appear in the same component file
- PT-BR strings are added as `copy.hero.titlePtBr` on the English copy object
- `lib/copy.ts` is modified after i18n is "done" — the file should not exist in the final state
- Some pages use the copy module, some use next-intl, and there is no consistent pattern

**Phase to address:**
Copy migration phase (after routing works, before language switcher). This is a complete replacement, not an extension.

---

### Pitfall 5: JSON-LD Structured Data Hardcodes English Strings

**What goes wrong:**
`lib/jsonld.ts` contains English-only descriptions hardcoded as string literals (e.g., `"Re-recording mixer and sound designer with 30+ credits across film, series, and documentaries"`). After i18n is added, the PT-BR pages serve the same JSON-LD with English descriptions. Google interprets this as a mismatch between the page language and the structured data language, which undermines the PT-BR SEO signal.

**Why it happens:**
JSON-LD is implemented as server-side helper functions that return plain objects. Developers add translations to the visible page copy but forget that JSON-LD functions also contain copy that needs localizing.

**How to avoid:**
- Pass the locale parameter into every `buildPersonSchema`, `buildLocalBusinessSchema`, and `buildCreativeWorkSchema` function in `lib/jsonld.ts`
- Translate the description strings for PT-BR (they can be simple — the structured data does not need marketing copy, just accurate descriptions)
- Verify with Google's Rich Results Test that both locale versions return valid, language-appropriate structured data
- The `@language` or `inLanguage` property can optionally be added to structured data to be explicit about the content language

**Warning signs:**
- `lib/jsonld.ts` functions have no `locale` parameter after i18n is added
- PT-BR project detail pages show English descriptions in Rich Results Test
- `buildPersonSchema()` is called without any locale argument from PT-BR pages

**Phase to address:**
SEO phase, as part of per-language metadata implementation.

---

### Pitfall 6: Auto-Detection Redirect Uses 307 But Existing Indexed URLs Expect 301

**What goes wrong:**
next-intl uses 307 (temporary redirect) for locale detection by default. When a Brazilian visitor hits `lorenzopardell.com` and gets redirected to `lorenzopardell.com/pt-br`, the redirect is temporary. This means:
- Google does not transfer link equity from the root URL to the PT-BR version
- If the user shares the PT-BR URL, Google may recrawl the root and re-issue the temporary redirect rather than indexing the PT-BR page directly

Additionally, the `NEXT_LOCALE` cookie that stores the detected language preference is a session-scoped mechanism by default. If the cookie is not set (incognito, new device), every visit triggers a redirect, which Google's crawler may or may not follow consistently.

**Why it happens:**
The next-intl default is correct for user-preference scenarios (you want to respect explicit language switches), but the initial auto-detection redirect should be a user-experience convenience, not a permanent routing decision. The distinction between "user changed language" (307, preserve method) and "first visit, detected language" (307 by default in next-intl, not 301) is conflated.

**How to avoid:**
- The English root `/` should have a self-referencing canonical and be the primary indexed URL for EN
- PT-BR pages should have their own self-referencing canonicals at `/pt-br/*`
- Do not rely on the redirect for SEO — hreflang is the correct signal for language discovery, not redirects
- Accept that the 307 auto-detection redirect is for user experience only; Google will index both URL sets independently via hreflang signals
- Test that `lorenzopardell.com` is indexable directly (not blocked behind a forced redirect with no canonical fallback)

**Warning signs:**
- Google Search Console shows `lorenzopardell.com` as "Crawled but not indexed" after the redirect is live
- Coverage report shows `/pt-br/*` pages indexed but root `/` pages de-indexed
- The `NEXT_LOCALE` cookie is blocked by a browser privacy extension, causing infinite redirect attempts on each page load

**Phase to address:**
Routing foundation phase (detection logic), then verified in SEO phase.

---

### Pitfall 7: Language Switcher Breaks Server Component Architecture

**What goes wrong:**
The header is currently a Server Component. The language switcher requires reading the current locale and navigating to the alternate-locale URL on click — both client-side concerns. If the entire header is converted to a client component to support the switcher, all the SEO benefits of server rendering the navigation are lost. If the switcher is wired incorrectly (e.g., using `router.push` to `/pt-br${pathname}` constructed client-side), it breaks when the route includes dynamic segments, because `usePathname()` in Next.js 15 returns the URL pattern, not the resolved path (e.g., `/portfolio/[slug]` not `/portfolio/film-title`).

**Why it happens:**
The switcher is the most interactive component in the navigation. Developers mark the whole header `"use client"` as the path of least resistance. Others try to construct the switched URL by string-manipulating `usePathname()` without accounting for dynamic segments.

**How to avoid:**
- Keep the header as a Server Component; extract only the switcher button as a `"use client"` component
- Use next-intl's `useRouter` and `usePathname` (from `next-intl/client`) — these are locale-aware and correctly resolve dynamic segments
- Do NOT use Next.js core `usePathname` for locale switching; it does not strip or add the locale prefix correctly
- The switcher should call `router.replace(pathname, { locale: targetLocale })` using next-intl's router, which handles the segment resolution

**Warning signs:**
- The header file gains a `"use client"` directive after the switcher is added
- The language switcher navigates to `/pt-br/[slug]` literally (with brackets) instead of `/pt-br/film-title`
- Switching locale from a project detail page lands on a 404
- The switcher works on static pages but fails on dynamic routes

**Phase to address:**
Language switcher phase (after routing and translations are in place).

---

### Pitfall 8: Translation File Keys Diverge Between EN and PT-BR

**What goes wrong:**
EN and PT-BR JSON message files start in sync but diverge over time because there is no compile-time enforcement that both files have identical key structures. A key added to `messages/en.json` but missing from `messages/pt-br.json` causes a runtime error or a silent missing-string fallback in production. For a portfolio with ~2 locales and ~30 copy blocks, this is manageable but easy to miss during copy updates.

**Why it happens:**
JSON files have no schema enforcement. Developers add a new FAQ question to EN, forget to add the PT-BR equivalent, and the PT-BR FAQ page silently renders the key name instead of the translated string.

**How to avoid:**
- Use next-intl's TypeScript integration: define `IntlMessages` type from `en.json` so TypeScript reports missing keys
- Configure next-intl's `onError` and `getMessageFallback` to throw in development (default) so missing keys are caught locally before deploy
- Treat `messages/en.json` as the canonical schema — any key addition there must be followed immediately by the PT-BR equivalent
- For FAQ content specifically (23 Q&As), create a helper function that validates both locale files have the same number of entries at build time

**Warning signs:**
- PT-BR page renders a literal key like `faq.question_5` instead of translated text
- TypeScript does not report errors when a translation key is mistyped
- `messages/en.json` has more keys than `messages/pt-br.json`

**Phase to address:**
Copy migration phase. Set up the TypeScript type enforcement before writing any translations.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Keep `lib/copy.ts` and add a PT-BR parallel file alongside it | No need to restructure existing imports | Two copy systems diverge; any copy update must happen in two places; type safety lost | Never — migrate fully |
| Inline PT-BR strings directly in components as ternaries (`locale === 'pt-br' ? '...' : '...'`) | Fast, no library needed | Untranslated strings scattered across 20+ components; impossible to audit or hand off | Never for more than 1–2 strings |
| Use `x-default` canonical pointing to English for PT-BR pages | Avoids thinking through per-locale canonicals | Google de-indexes PT-BR pages entirely; defeats the purpose of bilingual SEO | Never |
| Skip translating project descriptions in Phase 1 and use EN descriptions for PT-BR | Faster initial launch | PT-BR pages have duplicate content vs EN; no SEO benefit for PT-BR market | Acceptable as temporary MVP with noindex on PT-BR until translations are ready |
| Use Accept-Language header detection only (no cookie) | Simpler middleware | Users who want EN but have a Brazilian browser get redirected every visit; no preference persistence | Never |
| Add `suppressHydrationWarning` to fix locale-related hydration mismatches | Silences console errors | Hides real hydration bugs that could cause layout flicker or stale content | Never — fix the underlying mismatch |

---

## Integration Gotchas

Common mistakes when connecting the i18n system to existing site infrastructure.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| `app/sitemap.ts` | Only adds PT-BR project URLs without `alternates.languages` | Rewrite to generate every URL for both locales with `alternates: { languages: { en: '...', 'pt-BR': '...' } }` and `x-default` |
| `lib/jsonld.ts` schema builders | Called without locale; return English-only descriptions on PT-BR pages | Accept `locale` param; return locale-appropriate `description` and `inLanguage` fields |
| `generateMetadata` on `[slug]/page.tsx` | Sets `alternates.canonical` to base URL without locale prefix | Set canonical to the current page's own full URL including `/pt-br/` prefix for PT-BR |
| Framer Motion client wrappers | Converted to client components that also call `useTranslations` — works but forces unnecessarily wide client bundle | Keep animation wrappers as dumb pass-through wrappers; move `useTranslations` calls to their Server Component parents and pass copy as props |
| `app/robots.ts` | Not updated after i18n routes are added | Add `Disallow` rules for any locale-specific paths that should not be crawled independently; allow `sitemap` reference to point to the updated multilingual sitemap |
| `lib/data/projects.ts` Project type | `description` and `roles[]` fields are EN-only strings | Add `descriptionPtBr?: string` and `rolesPtBr?: string[]` fields, or create a separate `lib/data/projects.pt-br.ts` override file — do not translate inside the main data file using inline ternaries |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all locale message files on every request | Slow TTFB when message files are large; unnecessary payload for EN visitors loading PT-BR strings | Use next-intl's per-locale loading (`getRequestConfig` returns only the requested locale's messages) | Already noticeable with 2 locales if files are large; add more locales and it compounds |
| Importing translation messages as `import enMessages from './messages/en.json'` inside middleware | Middleware bundle size bloat; edge runtime has strict size limits | Load messages only in `getRequestConfig`, not in middleware; middleware should only detect locale | At ~50KB message file size on Vercel Edge |
| Generating sitemap URLs by concatenating strings in a loop | Works, but easy to produce malformed URLs for PT-BR dynamic routes | Use a helper function that wraps `getPathname` from next-intl routing config to construct locale URLs correctly | Any time a slug contains special characters or the locale prefix changes |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Auto-redirecting all `pt-BR` Accept-Language users including those from Portugal | Portuguese users from Portugal sent to Brazilian Portuguese copy, which has regional differences | Detect `pt-BR` specifically, not just `pt`; let `pt-PT` fall through to EN |
| Language switcher not preserving the current page context | User reading `/portfolio/some-film` switches to PT-BR and lands on `/pt-br` (homepage) instead of `/pt-br/portfolio/some-film` | Use next-intl's locale-aware router so the switcher replaces locale in the current path |
| No visual indicator of which language is active | Users who were auto-redirected do not know they are on a localized version | Show active locale in the switcher with a clear selected state (e.g., `EN` / `PT` with underline on active) |
| Project titles translated (they should not be) | Film and series titles rendered in translated form are unrecognizable; damages brand consistency for film credits | Titles stay untranslated per PROJECT.md — enforce this in the data model, not as a runtime decision |
| Cookie-based language preference not persisted across sessions | Users set to PT-BR must be re-detected on every session (if cookie expires) | Set `NEXT_LOCALE` cookie with a long `maxAge` (e.g., 1 year); this is a cosmetic preference, not sensitive data |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Routing:** All 28 project slugs resolve correctly in `/pt-br/portfolio/[slug]` — verify by iterating `lib/data/projects.ts` slugs and checking each PT-BR URL returns 200
- [ ] **SEO hreflang:** Every page (static + dynamic) has `<link rel="alternate" hreflang="en">` AND `<link rel="alternate" hreflang="pt-BR">` AND `<link rel="alternate" hreflang="x-default">` in `<head>` — verify with View Source or Google's URL Inspection tool
- [ ] **Sitemap:** `sitemap.xml` contains both EN and PT-BR entries for all 28 projects AND all category pages — count the entries (should be approximately 2x the current count plus category pages)
- [ ] **JSON-LD:** PT-BR pages return Portuguese-language descriptions in JSON-LD — verify with Google Rich Results Test on a PT-BR project URL
- [ ] **Static assets:** `robots.txt`, `sitemap.xml`, `favicon.ico` are reachable directly without locale prefix and return correct content-type — verify with `curl https://lorenzopardell.com/robots.txt`
- [ ] **Copy migration:** `lib/copy.ts` no longer exists or is not imported anywhere — verify with a codebase search for `from '@/lib/copy'`
- [ ] **Translation completeness:** `messages/pt-br.json` has the same number of keys as `messages/en.json` — verify programmatically
- [ ] **Language switcher on dynamic routes:** Switching from `/portfolio/some-film` goes to `/pt-br/portfolio/some-film`, not to `/pt-br` — test manually on 3+ project pages
- [ ] **Middleware exclusions:** `/_next/`, `favicon.ico`, `sitemap.xml`, `robots.txt`, and `/public/` images are not redirected — verify no 307s appear in Network tab for static asset requests
- [ ] **Default locale canonical:** `lorenzopardell.com` (root, no prefix) returns a 200 with a self-referencing canonical — not a redirect to `/en/`

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Middleware redirect loop | LOW | Fix the matcher regex; deploy; clears immediately. No data loss. |
| Dynamic route 404s in PT-BR | MEDIUM | Re-examine `[locale]` folder structure; check `generateStaticParams` returns locale+slug pairs; fix and redeploy |
| Duplicate content penalty from Google | HIGH | Submit corrected sitemap to Search Console; fix hreflang; request recrawl; wait 2–4 weeks for Google to re-process |
| `lib/copy.ts` coexisting with next-intl mid-migration | MEDIUM | Complete the migration atomically — remove all `copy.*` imports in one PR; do not leave the site in a hybrid state between deploys |
| JSON-LD language mismatch indexed by Google | MEDIUM | Fix `lib/jsonld.ts`; redeploy; submit affected URLs for recrawl in Search Console |
| Language switcher navigating to wrong URL on dynamic routes | LOW | Replace Next.js core `useRouter`/`usePathname` with next-intl equivalents; test on all dynamic route shapes |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Middleware redirect loops on static assets | Phase 1: Routing foundation | All static assets load without 307s; sitemap.xml accessible at root |
| Breaking `[slug]` and `[category]` dynamic routes | Phase 1: Routing foundation | Every existing URL returns 200 in both locales before any copy work begins |
| Missing/incorrect hreflang | Phase 3: SEO (after copy migration) | View Source confirms 3 hreflang tags per page; sitemap validated with XML validator |
| `lib/copy.ts` split-brain | Phase 2: Copy migration | Grep confirms zero `from '@/lib/copy'` imports after migration |
| JSON-LD English-only on PT-BR pages | Phase 3: SEO | Rich Results Test on PT-BR project URL returns Portuguese description |
| 307 redirect and EN indexing risk | Phase 1: Routing foundation (detection) + Phase 3: SEO (canonical) | Google Search Console coverage shows EN pages indexed at root URLs |
| Language switcher breaking server components | Phase 4: Language switcher | Header server component status unchanged; switcher is isolated client component |
| Translation key divergence | Phase 2: Copy migration (setup) | TypeScript type from `en.json` catches missing PT-BR keys at compile time |

---

## Sources

- [Next.js Middleware Redirect Infinite Loop — GitHub #62547](https://github.com/vercel/next.js/issues/62547)
- [i18n Middleware Redirect Loop — GitHub #49656](https://github.com/vercel/next.js/issues/49656)
- [Dynamic Routes 404 with i18n — GitHub #48812](https://github.com/vercel/next.js/issues/48812)
- [next-intl Middleware Configuration](https://next-intl.dev/docs/routing/middleware)
- [next-intl Routing Configuration](https://next-intl.dev/docs/routing/configuration)
- [next-intl Server and Client Components](https://next-intl.dev/docs/environments/server-client-components)
- [Next.js Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization)
- [Next.js Sitemap Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Multilingual Sitemap with next-intl — DEV Community](https://dev.to/oikon/implementing-multilingual-sitemap-with-next-intl-in-nextjs-app-router-1354)
- [SEO and i18n in Next.js App Router — DEV Community](https://dev.to/oikon/seo-and-i18n-implementation-guide-for-nextjs-app-router-dynamic-metadata-and-internationalization-3eol)
- [Next.js Multilingual SEO — EastonDev](https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-seo/)
- [next-intl Complete Setup Guide 2025 — Build with Matija](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)
- [The Next.js SEO Bug That Made Google Ignore My Entire Site — DEV Community](https://dev.to/federico_sciuca/the-nextjs-seo-bug-that-made-google-ignore-my-entire-site-and-how-i-found-it-2mg0)

---
*Pitfalls research for: Adding bilingual EN + PT-BR support to Next.js 15 App Router portfolio*
*Researched: 2026-03-30*
