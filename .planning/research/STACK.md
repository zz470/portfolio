# Stack Research

**Domain:** i18n / Bilingual support (EN + PT-BR) for Next.js 15 App Router portfolio
**Researched:** 2026-03-30
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-intl | ^4.8.3 | i18n routing, translations, locale detection, hreflang | Purpose-built for Next.js App Router with native Server Component support; 1.8M weekly downloads; only library that handles routing + translations + middleware as a unified system without custom wiring |
| negotiator | ^0.6.3 | Parse `Accept-Language` header for browser locale detection | Recommended by Next.js official docs for locale negotiation; lightweight, no dependencies |
| @formatjs/intl-localematcher | ^0.5.4 | Match browser language preferences to supported locales | Pairs with negotiator for robust locale matching; used in Next.js official i18n examples |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| server-only | ^0.0.1 | Mark translation loader as server-only module | Use on the dictionary/messages loader to prevent translation JSON from leaking into client bundle |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| TypeScript (existing) | Type-safe locale strings and translation keys | next-intl 4.x supports full type augmentation via `AppConfig` interface — register `Messages` type so `useTranslations()` calls are type-checked |

## Installation

```bash
# Core i18n
npm install next-intl negotiator @formatjs/intl-localematcher

# Types for negotiator (dev)
npm install -D @types/negotiator
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| next-intl | next-i18next | Never for new App Router projects. next-i18next was built for the Pages Router. v16 added App Router support but the mental model (getServerSideProps, SSR prop passing) fights the App Router pattern. Use only if migrating a Pages Router app that already uses it. |
| next-intl | Built-in Next.js i18n (manual dictionary approach) | Only for extremely simple sites with 1-2 translatable strings. The official Next.js docs show the pattern using `getDictionary()` with JSON files — it works, but you hand-roll locale detection, routing, middleware, hreflang generation, and pluralization. For 28 projects and 6+ pages of copy, the manual approach means ~300 lines of infrastructure code you maintain yourself. Not worth it. |
| next-intl | react-i18next + next-i18n-router | Valid choice when you need i18next ecosystem (translation management platforms, CI/CD pipelines, large teams). For a 2-locale personal portfolio with no external translation workflow, the added complexity (two libraries to configure, different mental models for server vs client) is unjustified. |
| next-intl | Paraglide-next | Paraglide uses compiler-based tree shaking for minimal bundle — compelling for large multi-locale apps. At 2 locales with a static portfolio, the bundle difference is negligible. next-intl has a larger community, more documentation, and more Stack Overflow answers. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-i18next | Designed for Pages Router. App Router integration is bolted on; requires additional wrapper packages and fights Server Component patterns. Flat download trend reflects community moving away from it. | next-intl |
| i18next directly (without next-intl) | You get translation interpolation but nothing else: no routing, no middleware, no locale detection, no hreflang. You build all the i18n infrastructure yourself. | next-intl (wraps i18next concepts with Next.js-native APIs) |
| next.config.ts `i18n` key (Pages Router config) | The `i18n` config key in next.config is a Pages Router feature only. It does nothing in App Router projects. Developers mistakenly add it expecting locale routing — it has no effect. | next-intl middleware for routing |
| Storing translations in Supabase / external DB | Adds a runtime dependency for content that never changes without a deploy anyway. Contradicts the portfolio's core constraint of no external dependencies. | JSON message files in `messages/` directory |

## Stack Patterns by Variant

**For this project (2 locales, default EN at root, PT-BR at `/pt-br/*`):**
- Use `localePrefix: 'as-needed'` in next-intl routing config
- This serves English at `/`, `/about`, `/portfolio` (no prefix) and Portuguese at `/pt-br/`, `/pt-br/about`, `/pt-br/portfolio`
- The middleware will redirect `/pt-br/en/...` to the unprefixed path automatically
- Set `defaultLocale: 'en'` and `locales: ['en', 'pt-br']`

**For static generation (Vercel + no dynamic rendering overhead):**
- Add `generateStaticParams` to root `[locale]/layout.tsx` returning both locales
- Call `setRequestLocale(locale)` at the top of every page and layout before using any next-intl APIs
- This enables full static pre-rendering of all locale variants at build time — critical for a portfolio that should load instantly

**For Server Components (existing RSC architecture):**
- Use `getTranslations()` (async, awaitable) in Server Components and layouts
- Use `useTranslations()` hook only in Client Components (existing animation wrappers)
- The `NextIntlClientProvider` wraps the root layout once; Client Components inherit it automatically in v4

**For hreflang and SEO:**
- next-intl middleware automatically injects `Link` response headers with `hreflang` alternates — this satisfies Google's requirements without extra configuration
- For `<head>` tags: use `getTranslations` in Next.js `generateMetadata` to produce per-locale `alternates.languages` metadata
- For sitemap: Next.js `app/sitemap.ts` with manual alternate URL generation per locale using next-intl's `getPathname()` utility

**For the language switcher in the header:**
- Use next-intl's `<Link>` component (wraps Next.js Link) with the `locale` prop: `<Link href="/about" locale="pt-br">`
- Setting `locale` on the link causes next-intl to also update the `NEXT_LOCALE` cookie, persisting the preference across sessions

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next-intl ^4.8.3 | Next.js 15.2.2 | Fully compatible. next-intl 4.0 released March 2025, targets Next.js 13-15+. TypeScript 5 minimum (already met). |
| next-intl ^4.8.3 | React 19 | Compatible. next-intl 4.0 ships ESM-only output targeting modern browsers/runtimes. |
| next-intl ^4.8.3 | Tailwind CSS v4 | No interaction. Styling is independent. |
| negotiator ^0.6.3 | Node.js 18+ | No issues. Lightweight HTTP negotiation utility. |
| @formatjs/intl-localematcher ^0.5.4 | TypeScript 5 | Fully typed. Works in Next.js middleware (Edge Runtime). |

## Integration Points with Existing Codebase

### File structure change
The App Router directory moves from `app/` to `app/[locale]/`. All existing `page.tsx`, `layout.tsx`, `loading.tsx` files move one level deeper. The root `app/layout.tsx` becomes a shell; the real layout moves to `app/[locale]/layout.tsx`.

### lib/copy.ts migration
The existing `lib/copy.ts` becomes the source for English messages. Extract all string values into `messages/en.json`. Create `messages/pt-br.json` with Portuguese translations. The typed constants pattern is replaced by next-intl's type-augmented `useTranslations()` — safer and IDE-autocomplete-friendly.

### Server Components (no change needed)
Existing Server Components work unchanged; replace `copy.PAGE.title` references with `const t = await getTranslations('page'); t('title')` pattern. The async Server Component pattern already in use maps directly.

### Client animation wrappers
Client Components that currently receive copy as props will continue to receive it as props — passed down from the Server Component parent that calls `getTranslations`. Do not call `useTranslations` in existing animation wrappers; keep the prop-passing pattern.

### project data (lib/data/projects.ts)
Project titles stay untranslated (confirmed in milestone spec). Descriptions and roles need per-locale variants. Options:
1. Add `description_pt?: string` and `roles_pt?: string[]` fields to the `Project` interface — simplest, keeps data co-located
2. Move descriptions to message files keyed by project slug — cleaner i18n but separates data from metadata
Recommendation: Option 1 for this project size. 28 projects, one file, zero infrastructure overhead.

## Sources

- [next-intl official docs — App Router setup](https://next-intl.dev/docs/getting-started/app-router) — HIGH confidence (official)
- [next-intl 4.0 release blog](https://next-intl.dev/blog/next-intl-4-0) — HIGH confidence (official); version 4.0 released March 12, 2025
- [next-intl routing configuration docs](https://next-intl.dev/docs/routing/configuration) — HIGH confidence (official); confirms `localePrefix: 'as-needed'`
- [Next.js official i18n guide](https://nextjs.org/docs/app/guides/internationalization) — HIGH confidence (official); version 16.2.1 docs, last updated 2026-03-25
- [npm next-intl package page](https://www.npmjs.com/package/next-intl) — MEDIUM confidence; version 4.8.3 current as of Feb 2026
- [Best i18n Libraries for Next.js App Router in 2026 — DEV Community](https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f) — MEDIUM confidence (community); aligns with official docs
- [i18next vs next-intl comparison — i18nexus](https://i18nexus.com/posts/i18next-vs-next-intl) — MEDIUM confidence; confirmed 1.8M weekly downloads growth trajectory

---
*Stack research for: Bilingual EN + PT-BR support, Next.js 15 App Router portfolio*
*Researched: 2026-03-30*
