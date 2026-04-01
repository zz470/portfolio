# Phase 12: i18n Routing & Copy Infrastructure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-31
**Phase:** 12-i18n-routing-copy-infrastructure
**Mode:** auto (all decisions auto-selected from research recommendations)
**Areas discussed:** Routing Strategy, Translation Library, Copy Migration, Middleware Behavior

---

## Routing Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Subfolder with localePrefix: 'as-needed' | EN at `/`, PT-BR at `/pt-br/*` — clean EN URLs, explicit PT-BR | ✓ |
| Domain-based | Separate domains per locale — overkill for 2 locales | |
| Subfolder with always-prefix | Both `/en/*` and `/pt-br/*` — unnecessary prefix for default locale | |

**User's choice:** [auto] Subfolder with `localePrefix: 'as-needed'` (recommended default from research)
**Notes:** Research confirms this is the standard pattern for 2-locale portfolios. Preserves all existing EN URLs.

---

## Translation Library

| Option | Description | Selected |
|--------|-------------|----------|
| next-intl v4 | Unified i18n for Next.js 15 App Router — routing, middleware, translations, hreflang | ✓ |
| next-i18next | Built for Pages Router, bolted-on App Router support | |
| Manual dictionary approach | No library — hand-rolled getDictionary | |

**User's choice:** [auto] next-intl v4 (recommended — 1.8M weekly downloads, full Next.js 15 compatibility)
**Notes:** Research unanimously recommends next-intl v4. Only library that handles all four concerns without custom wiring.

---

## Copy Migration

| Option | Description | Selected |
|--------|-------------|----------|
| TypeScript locale files with CopyShape | `lib/copy/en.ts` + `lib/copy/pt-br.ts` sharing typed interface | ✓ |
| JSON message files | `messages/en.json` + `messages/pt-br.json` — standard next-intl pattern | |
| YAML files | Less common, no type safety advantage | |

**User's choice:** [auto] TypeScript locale files with CopyShape interface (recommended — matches existing TS patterns, compile-time type enforcement)
**Notes:** Research suggests JSON as the next-intl standard but TS files provide better type safety for this project's strict TS conventions.

---

## Middleware Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| First-visit detection with cookie | Accept-Language on first visit, NEXT_LOCALE cookie persistence | ✓ |
| Always detect | Re-detect on every request, no cookie | |
| Manual only | No auto-detection, user must choose language | |

**User's choice:** [auto] First-visit detection with NEXT_LOCALE cookie (recommended default)
**Notes:** Standard UX pattern — detect once, remember preference.

---

## Claude's Discretion

- Copy file internal structure (flat vs nested keys)
- Loading skeleton adjustments
- Error handling for missing translations
- Middleware cookie configuration details

## Deferred Ideas

- Language switcher UI — Phase 15
- Project description translations — Phase 13
- Per-language SEO — Phase 14
- PT-BR FAQ translation — deferred beyond v2.0
