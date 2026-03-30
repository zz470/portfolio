# Architecture Research

**Domain:** Next.js 15 App Router bilingual i18n integration (EN + PT-BR subfolder routing)
**Researched:** 2026-03-30
**Confidence:** HIGH (verified against Next.js 15 official docs and next-intl docs)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        middleware.ts (Edge)                          │
│  Accept-Language detection → redirect / to /pt-br if pt-BR browser │
│  Passes locale via header to RSC tree                               │
└────────────────────┬────────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────────┐
│                  app/[locale]/  (dynamic segment)                    │
│                                                                      │
│  layout.tsx   — html lang attr, NextIntlClientProvider (if used),   │
│                 JSON-LD schemas (locale-aware), generateStaticParams │
│                                                                      │
│  ┌──────────┐ ┌──────────────┐ ┌────────────────────────────────┐  │
│  │ page.tsx │ │ portfolio/   │ │ portfolio/[slug]/page.tsx      │  │
│  │  (home)  │ │ page.tsx     │ │  generateMetadata(locale+slug) │  │
│  └──────────┘ └──────────────┘ └────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ portfolio/category/[category]/page.tsx                       │   │
│  └──────────────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────────┐
│                     Data & Copy Layer                                │
│                                                                      │
│  lib/copy.ts          — evolves to lib/copy/en.ts + pt-br.ts        │
│  lib/data/projects.ts — grows description_pt_br + roles_pt_br fields │
│  lib/jsonld.ts        — functions accept locale param               │
│  lib/i18n/            — NEW: locale type, getDictionary helper      │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | How It Changes |
|-----------|----------------|----------------|
| `middleware.ts` | Detect `Accept-Language`, redirect `/` to `/pt-br/` for pt-BR browsers, pass locale header | New file |
| `app/[locale]/layout.tsx` | Set `html lang`, inject locale-aware JSON-LD, wrap with `NextIntlClientProvider` (if using next-intl) | Moves from `app/layout.tsx` |
| `app/[locale]/page.tsx` | Receive `locale` param, pass to `getDictionary()`, render locale copy | All pages move here |
| `lib/i18n/request.ts` | Server-side locale resolution for RSC | New file |
| `lib/copy/en.ts` + `lib/copy/pt-br.ts` | Locale-specific copy typed as identical interface | `lib/copy.ts` splits into two |
| `lib/data/projects.ts` | Adds `description_pt_br?` and `roles_pt_br?` fields to `Project` interface | Backward-compatible additions |
| `lib/jsonld.ts` | Accepts `locale` param, outputs locale-specific text, uses locale-correct base URL | Functions updated to accept locale |
| `components/navigation/header.tsx` | Reads current locale from URL, renders language switcher button | Language switcher added |
| `app/sitemap.ts` | Generates entries for both locales with `alternates.languages` | Updated to include PT-BR URLs |

## Recommended Project Structure

```
app/
├── [locale]/                    # NEW: wraps all existing pages
│   ├── layout.tsx               # MOVED from app/layout.tsx
│   ├── page.tsx                 # MOVED from app/page.tsx
│   ├── about/
│   │   └── page.tsx             # MOVED
│   ├── contact/
│   │   └── page.tsx             # MOVED
│   ├── faq/
│   │   └── page.tsx             # MOVED
│   ├── services/
│   │   └── page.tsx             # MOVED
│   ├── portfolio/
│   │   ├── page.tsx             # MOVED
│   │   ├── loading.tsx          # MOVED (unchanged)
│   │   ├── [slug]/
│   │   │   ├── layout.tsx       # MOVED
│   │   │   ├── page.tsx         # MOVED — adds locale to generateMetadata
│   │   │   └── loading.tsx      # MOVED (unchanged)
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx     # MOVED
│   ├── error.tsx                # MOVED (unchanged)
│   └── not-found.tsx            # MOVED (unchanged)
├── favicon.ico                  # stays at root
├── globals.css                  # stays at root
├── robots.ts                    # stays at root
└── sitemap.ts                   # stays at root, updated for dual locale

middleware.ts                    # NEW at project root

lib/
├── i18n/
│   ├── routing.ts               # NEW: locales config ['en', 'pt-br'], defaultLocale: 'en'
│   ├── request.ts               # NEW: server-side locale resolution
│   └── getDictionary.ts         # NEW: async JSON loader or TS re-export
├── copy/
│   ├── en.ts                    # SPLIT from lib/copy.ts
│   ├── pt-br.ts                 # NEW: Portuguese translations
│   └── index.ts                 # UPDATED: re-exports both with type
├── data/
│   └── projects.ts              # UPDATED: add description_pt_br?, roles_pt_br?
├── jsonld.ts                    # UPDATED: accept locale param
├── contact-info.ts              # unchanged
├── social-links.tsx             # unchanged
├── animations.ts                # unchanged
└── utils.ts                     # unchanged

components/
├── navigation/
│   ├── header.tsx               # UPDATED: add LanguageSwitcher
│   ├── footer.tsx               # UPDATED: read locale for nav link paths
│   └── LanguageSwitcher.tsx     # NEW: "EN / PT" toggle button
└── (all others unchanged)
```

### Structure Rationale

- **`app/[locale]/`**: The only path that makes the default locale (`en`) path-prefix-free while PT-BR gets `/pt-br/*`. Next.js App Router supports this via `generateStaticParams` + middleware that skips locale prefix for the default.
- **`lib/copy/` split**: The existing `lib/copy.ts` typed constants pattern is preserved — it just becomes two locale files sharing the same TypeScript interface. No consumer component needs to change its import shape; they receive the correct copy object via the locale-resolved `getDictionary()` call.
- **`middleware.ts` at root**: Next.js Edge middleware must live at project root (not inside `app/`). It intercepts before routing, making it the single place for `Accept-Language` detection.

## Architectural Patterns

### Pattern 1: Locale Param Threading (Preferred for this project)

**What:** All pages receive `locale` from `params`, pass it to `getDictionary()` to get the right copy object. No React context, no client hook, no `useTranslations()`.
**When to use:** Server Components architecture where copy is only needed at render time. This project is already RSC-first.
**Trade-offs:** Simple and explicit. Requires passing locale to every page's data functions. No magic. Works with `generateStaticParams` for full static output.

```typescript
// app/[locale]/page.tsx
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = await getDictionary(locale); // returns en.ts or pt-br.ts copy object
  return <HomePageClient copy={copy} />;
}
```

### Pattern 2: Middleware-Only Locale Detection (No library required)

**What:** `middleware.ts` reads `Accept-Language`, maps `pt`, `pt-BR`, `pt-PT` → redirect to `/pt-br`. All other locales get the default EN path. Uses `@formatjs/intl-localematcher` + `negotiator` (both tiny) or a manual string match.
**When to use:** Only two locales, simple detection rules, no complex locale negotiation needed.
**Trade-offs:** No library dependency. Tiny bundle impact. Must manually handle edge cases (direct link to `/pt-br/*` bypasses detection correctly, since middleware checks if locale prefix already present).

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'pt-br'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Already has a supported locale prefix
  const hasLocale = LOCALES.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  // Default locale: no prefix needed — don't redirect
  if (hasLocale || pathname.startsWith('/en')) return;

  const acceptLang = request.headers.get('accept-language') ?? '';
  const isPtBr = /^pt/.test(acceptLang.split(',')[0].trim());

  if (isPtBr) {
    const url = request.nextUrl.clone();
    url.pathname = `/pt-br${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico|og-image.png|robots.txt|sitemap.xml).*)'],
};
```

### Pattern 3: Copy Object Shape Preserved Across Locales

**What:** Both `lib/copy/en.ts` and `lib/copy/pt-br.ts` export a `copy` object matching the same `CopyShape` interface. The `getDictionary(locale)` function returns `typeof copy` — consumers never see locale plumbing.
**When to use:** Existing codebase already uses `copy.hero.title` pattern. Preserving the shape means zero refactor of consumers.
**Trade-offs:** TypeScript enforces that both locales implement every key. PT-BR file cannot have missing keys — the compiler catches it at build time.

```typescript
// lib/i18n/getDictionary.ts
import type { CopyShape } from '@/lib/copy/types';

const dictionaries: Record<string, () => Promise<{ copy: CopyShape }>> = {
  en:    () => import('@/lib/copy/en'),
  'pt-br': () => import('@/lib/copy/pt-br'),
};

export async function getDictionary(locale: string): Promise<CopyShape> {
  const loader = dictionaries[locale] ?? dictionaries['en'];
  const mod = await loader();
  return mod.copy;
}
```

### Pattern 4: lib/data/projects.ts Bilingual Fields

**What:** Add optional `description_pt_br?: string` and `roles_pt_br?: string[]` fields to the `Project` interface. Pages select the correct field based on locale, falling back to English if PT-BR is missing.
**When to use:** Titles never translate. Descriptions and roles do. This keeps all project data in one file with no parallel structure.
**Trade-offs:** Flat denormalized — fine for 28 projects. Would need redesign past ~200 projects.

```typescript
// In project pages:
const description = locale === 'pt-br'
  ? (project.description_pt_br ?? project.description)
  : project.description;

const roles = locale === 'pt-br'
  ? (project.roles_pt_br ?? project.roles)
  : project.roles;
```

## Data Flow

### Request Flow (new locale-aware path)

```
Browser request: GET /pt-br/portfolio/operacao-transplante
                      ↓
        middleware.ts (Edge): locale prefix present → no redirect
                      ↓
        app/[locale]/portfolio/[slug]/page.tsx
          params: { locale: 'pt-br', slug: 'operacao-transplante' }
                      ↓
        getProjectBySlug(slug)           getDictionary('pt-br')
          → project from projects.ts       → copy from lib/copy/pt-br.ts
                      ↓
        generateMetadata: locale-specific title, description, hreflang alternates
                      ↓
        buildCreativeWorkSchema(project, 'pt-br') → locale-aware JSON-LD
                      ↓
        ProjectSlugClient({ project, copy, locale })
```

### Language Detection Flow

```
Browser: GET / with Accept-Language: pt-BR,pt;q=0.9
             ↓
middleware.ts detects pt prefix → 302 redirect to /pt-br/
             ↓
Browser: GET /pt-br/
             ↓
app/[locale]/page.tsx, locale = 'pt-br'
```

### Language Switcher Flow

```
User on /pt-br/portfolio → clicks EN →
LanguageSwitcher replaces /pt-br/ prefix with / →
redirect to /portfolio
```

## SEO Integration Points

### hreflang via generateMetadata

Every `generateMetadata` function must return the `alternates.languages` map. This produces `<link rel="alternate" hreflang>` tags in the HTML `<head>`.

```typescript
// app/[locale]/page.tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: copy.heroMeta.title,
    alternates: {
      canonical: locale === 'en' ? 'https://lorenzopardell.com' : `https://lorenzopardell.com/pt-br`,
      languages: {
        'en': 'https://lorenzopardell.com',
        'pt-BR': 'https://lorenzopardell.com/pt-br',
      },
    },
  };
}
```

For project pages the hreflang must reference both locale versions of the same slug (slug is untranslated, so the URL is predictable):

```typescript
languages: {
  'en': `https://lorenzopardell.com/portfolio/${slug}`,
  'pt-BR': `https://lorenzopardell.com/pt-br/portfolio/${slug}`,
}
```

### JSON-LD Per Locale

`lib/jsonld.ts` builder functions accept an optional `locale` param. For PT-BR:
- `buildPersonSchema()` — `description` field changes to Portuguese
- `buildCreativeWorkSchema(project, locale)` — `description` uses `project.description_pt_br` when locale is `pt-br`
- `buildCollectionSchema()` — `name` and `description` fields use translated copy

The `url` fields in JSON-LD always use the locale-prefixed canonical URL:
```
https://lorenzopardell.com/pt-br/portfolio/[slug]  (PT-BR page)
https://lorenzopardell.com/portfolio/[slug]          (EN page)
```

### Sitemap Per Locale

`app/sitemap.ts` must generate entries for both locales. Each EN entry gets a PT-BR `alternates.languages` entry and vice versa. Next.js 15 sitemap supports `alternates.languages` natively.

```typescript
// Conceptual structure
const enEntry = {
  url: baseUrl + '/portfolio',
  alternates: {
    languages: {
      'en': baseUrl + '/portfolio',
      'pt-BR': baseUrl + '/pt-br/portfolio',
    }
  }
};
```

The sitemap will roughly double in size from ~30 to ~60 entries (one per locale per route).

## New vs Modified Files: Explicit List

### New Files (net additions)

| File | Purpose |
|------|---------|
| `middleware.ts` | Accept-Language detection, /pt-br redirect |
| `lib/i18n/routing.ts` | Locale config constants (locales array, defaultLocale) |
| `lib/i18n/getDictionary.ts` | Async locale-to-copy-object resolver |
| `lib/copy/pt-br.ts` | All Portuguese copy matching CopyShape interface |
| `lib/copy/types.ts` | Shared `CopyShape` interface extracted from copy.ts |
| `components/navigation/LanguageSwitcher.tsx` | EN/PT toggle button for header |

### Modified Files (existing files that change)

| File | Change Type | What Changes |
|------|-------------|-------------|
| `app/layout.tsx` | Move + modify | Becomes `app/[locale]/layout.tsx`; receives locale param, sets `html lang`, passes locale to JSON-LD builders |
| `app/page.tsx` + all other pages | Move + modify | Nest under `app/[locale]/`; receive locale param, call `getDictionary()`, thread locale to child components |
| `app/portfolio/[slug]/page.tsx` | Modify | Path becomes `app/[locale]/portfolio/[slug]/page.tsx`; `generateMetadata` adds hreflang alternates; `buildCreativeWorkSchema` receives locale |
| `app/sitemap.ts` | Modify | Doubles entries with PT-BR alternates |
| `lib/copy.ts` | Split | Splits into `lib/copy/en.ts` (English copy), `lib/copy/pt-br.ts` (new), `lib/copy/types.ts` (interface) |
| `lib/data/projects.ts` | Extend | Adds `description_pt_br?` and `roles_pt_br?` to `Project` interface; existing records get PT-BR fields added |
| `lib/jsonld.ts` | Modify | All builder functions accept `locale?: string` param |
| `components/navigation/header.tsx` | Modify | Adds `LanguageSwitcher` component; `isHomePage` check must be locale-aware (path no longer starts at `/` for PT-BR) |
| `components/navigation/footer.tsx` | Modify | Nav link paths must be locale-prefixed for PT-BR |

### Unchanged Files (no modification needed)

- `lib/contact-info.ts` — contact info is not locale-specific
- `lib/social-links.tsx` — social links are not locale-specific
- `lib/animations.ts` — animations have no locale dependency
- `lib/utils.ts` — utility functions are locale-agnostic
- `app/robots.ts` — robots.txt applies to all locales
- All `components/ui/` — shadcn primitives have no copy
- All `loading.tsx` files — loading skeletons have no copy (or minimal copy that can be handled in the parent)

## Build Order (Dependency-Ordered)

The phases must follow this dependency chain to avoid building on unstable foundations:

```
Phase 1: Routing Foundation
  Creates: middleware.ts, lib/i18n/routing.ts, app/[locale]/ scaffold
  Unblocks: Everything else

Phase 2: Copy Infrastructure
  Creates: lib/copy/types.ts, lib/copy/en.ts, lib/i18n/getDictionary.ts
  Depends on: Phase 1 (locale param exists to pass to getDictionary)
  Unblocks: PT-BR copy translation, page wiring

Phase 3: PT-BR Copy Content
  Creates: lib/copy/pt-br.ts (full translation of all copy keys)
  Depends on: Phase 2 (CopyShape interface exists to implement against)
  Unblocks: All page locale wiring

Phase 4: Project Data Bilingual Fields
  Modifies: lib/data/projects.ts (adds _pt_br fields to all 28 records)
  Depends on: Phase 1 (no hard dependency but logically sequential)
  Unblocks: Project detail pages and JSON-LD with PT-BR descriptions

Phase 5: Page Wiring (all routes)
  Modifies: All pages under app/[locale]/
  Depends on: Phases 1–3 (routing, copy infrastructure, PT-BR copy)
  Note: Can be done route by route; EN functionality must not break at any step

Phase 6: SEO (generateMetadata + JSON-LD + sitemap)
  Modifies: jsonld.ts, all generateMetadata calls, sitemap.ts
  Depends on: Phase 4 (PT-BR project descriptions for JSON-LD), Phase 5 (pages exist)
  This is last because it references the complete locale URL structure

Phase 7: Language Switcher UI
  Creates: LanguageSwitcher.tsx
  Modifies: header.tsx, footer.tsx
  Depends on: Phase 5 (locale URLs exist to link to)
  Can be parallelized with Phase 6
```

## Anti-Patterns

### Anti-Pattern 1: Parallel App Tree (`app/pt-br/` beside `app/`)

**What people do:** Create a separate `app/pt-br/` directory mirroring `app/` to avoid touching existing files.
**Why it's wrong:** Doubles the page file count with no shared layout. Any change to a page must be made twice. The `app/[locale]/` dynamic segment solves this cleanly with a single file per route.
**Do this instead:** Nest all pages under `app/[locale]/` — one file per route renders both locales.

### Anti-Pattern 2: Locale in Client State (useState/localStorage)

**What people do:** Store the current locale in React state or localStorage, toggle it on click, re-render with translated strings client-side.
**Why it's wrong:** Search engines see one URL with no language signal. The HTML returned by SSR has no `hreflang`. Google treats the page as English regardless of user preference. Breaks the existing Server Components architecture.
**Do this instead:** URL-based locale via `[locale]` segment. Each locale has a distinct URL that Google crawls independently.

### Anti-Pattern 3: Duplicating Copy Into Each Page Component

**What people do:** Add PT-BR strings directly inside each page component as a const, instead of centralizing in locale files.
**Why it's wrong:** lib/copy.ts was introduced specifically because scattered copy made the site inconsistent. The same discipline applies to PT-BR.
**Do this instead:** All PT-BR strings live in `lib/copy/pt-br.ts`. Pages never contain inline translated strings.

### Anti-Pattern 4: Translating Project Titles

**What people do:** Add a `title_pt_br` field and translate Portuguese production titles to English (or vice versa).
**Why it's wrong:** Project titles like "Operação Transplante" and "Escravos da Fé" are proper nouns and brand names. Translating them breaks IMDB links, search engine recognition, and client expectations.
**Do this instead:** `title` is never localized. Only `description` and `roles` get `_pt_br` variants.

### Anti-Pattern 5: Middleware Redirect Loop

**What people do:** Middleware redirects `/` → `/pt-br/` for Portuguese browsers, but doesn't check if the locale prefix is already present, causing `/pt-br/` → `/pt-br/pt-br/` infinite loops.
**Why it's wrong:** Browser gets a redirect loop, Vercel serves a 500.
**Do this instead:** Always check `pathname.startsWith('/pt-br')` before redirecting. Skip middleware for `_next`, `api`, and static assets via the `matcher` config.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `middleware.ts` → `app/[locale]/` | HTTP redirect / header | Middleware sets `x-locale` header as a convenience; pages read from `params.locale` |
| `app/[locale]/layout.tsx` → `components/navigation/header.tsx` | Props: `locale` | Header needs locale to construct language switcher links and to correctly detect active route (path is now `/pt-br/portfolio`, not `/portfolio`) |
| `app/[locale]/page.tsx` → `lib/i18n/getDictionary.ts` | Async import | Server-only call; copy never ships to client bundle |
| `lib/data/projects.ts` → `app/[locale]/portfolio/[slug]/page.tsx` | Direct import | Locale selects `description_pt_br` vs `description` at call site |
| `lib/jsonld.ts` → `app/[locale]/layout.tsx` + all pages | Function call with locale param | JSON-LD builders called server-side only; locale determines text content and canonical URL |

### generateStaticParams — Critical Integration

The root `[locale]/layout.tsx` must export `generateStaticParams` returning both locales for static export to work:

```typescript
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt-br' }];
}
```

Each nested page that already exports `generateStaticParams` (e.g. `[slug]/page.tsx` for portfolio) must also be reachable via the locale param combination. Next.js computes the Cartesian product automatically.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 2 locales (current) | Flat `lib/copy/en.ts` + `lib/copy/pt-br.ts` is fine. Inline `_pt_br` fields on Project. |
| 3-5 locales | Extract a `getLocalizedProject(project, locale)` helper to avoid repeating the ternary across pages. Consider JSON files instead of TS modules for easier editing. |
| 6+ locales | Replace `lib/copy/` with a proper i18n library (next-intl recommended). Separate translation management from code. |

This project stays at 2 locales for the foreseeable future — no over-engineering warranted.

## Sources

- [Next.js 15 Internationalization official guide](https://nextjs.org/docs/app/guides/internationalization) — HIGH confidence (official docs, updated 2026-03-25)
- [next-intl routing setup](https://next-intl.dev/docs/routing/setup) — HIGH confidence (official library docs)
- [next-intl generateMetadata + sitemap integration](https://next-intl.dev/docs/environments/actions-metadata-route-handlers) — HIGH confidence
- [Next.js sitemap.xml API reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — HIGH confidence (official docs)
- [Multilingual sitemap with next-intl pattern (DEV Community)](https://dev.to/oikon/implementing-multilingual-sitemap-with-next-intl-in-nextjs-app-router-1354) — MEDIUM confidence (community verified against official docs)

---
*Architecture research for: Next.js 15 bilingual i18n (EN + PT-BR) integration*
*Researched: 2026-03-30*
