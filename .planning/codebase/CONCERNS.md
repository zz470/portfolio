# Codebase Concerns

**Analysis Date:** 2026-04-10

Scope: Next.js 15.5.15 App Router portfolio, 30 static projects, deployed to Vercel. Recent migration from Supabase to local TypeScript data. No tests, no monitoring, no analytics.

---

## Tech Debt

### Unused `slideIn` animation variant duplicated across detail pages (low)
- Files:
  - `components/portfolio/PortfolioDetail.tsx:24-27`
  - `components/portfolio/PortfolioDetailSecondary.tsx:20-23`
  - `components/portfolio/PortfolioDetailTertiary.tsx:19-22`
- Issue: A local `slideIn` variants object is declared in all three detail wrappers but never referenced in the JSX (`PortfolioDetail` and `PortfolioDetailSecondary` do not apply it at all; `PortfolioDetailTertiary` applies it to a child motion div on line 59). In two of three variants it is 100% dead code. It is also re-declared verbatim inside `ProjectAboutCard.tsx:18-21` and `ProjectDetailsCard.tsx:14-17`, so the same shape exists five times in the repo.
- Fix approach: Move `slideIn` into `lib/animations.ts` next to `fadeIn` and import it where actually used. Delete the unused local copies in `PortfolioDetail.tsx` and `PortfolioDetailSecondary.tsx`.

### Unused `useState` import in detail wrappers (low)
- Files:
  - `components/portfolio/PortfolioDetail.tsx:4` — `import { useState } from "react"` with no `useState` call in file
  - `components/portfolio/PortfolioDetailSecondary.tsx:2` — same
- Issue: Leftover from an earlier version of the components. Produces lint noise and is a trivial build-size smell.
- Fix approach: Remove the imports.

### Unused `React` import (low)
- File: `components/portfolio/PortfolioDetailSecondary.tsx:6` — `import React from "react"`
- Issue: `React` is not referenced (JSX transform makes this unnecessary under React 19). Dead import.
- Fix approach: Remove.

### `ProjectDetailsCard` vs `ProjectAboutCard` animation drift (low)
- Files: `components/portfolio/ProjectDetailsCard.tsx:14-17`, `components/portfolio/ProjectAboutCard.tsx:18-21`
- Issue: Both cards redeclare the same inline `slideIn` variant, then are wrapped again by parent motion components in the three `PortfolioDetail*` wrappers. The `variants` prop propagation means a child `motion.div` with its own local `slideIn` will be overridden by the parent's `initial="initial"/animate="animate"` string-key scheme in `PortfolioDetail.tsx` and `PortfolioDetailSecondary.tsx` — the child's local variant object is silently ignored unless the parent also uses `"slideIn"` as a key. Net effect: cards do not actually animate with the variant they declare on the primary/secondary layouts.
- Fix approach: Pick one animation driver — either the parent orchestrates via string keys or the children own their own `initial/animate` props. Document the choice in `lib/animations.ts`.

### Three divergent design variants for project detail pages (medium)
- Files:
  - `components/portfolio/PortfolioDetail.tsx` (primary) — 132 lines
  - `components/portfolio/PortfolioDetailSecondary.tsx` (secondary) — 103 lines
  - `components/portfolio/PortfolioDetailTertiary.tsx` (tertiary) — 89 lines
- Issue: All three share the same 4 child components (`ProjectDetailsCard`, `ProjectAboutCard`, `ProjectVideoCard`, `ProjectNavigation`) but differ in: wrapper element (`motion.div` vs plain `div` + nested `motion.div`), badge position, hero image treatment, mobile reordering, and whether `AspectRatio` is used. Drift is already visible: only `PortfolioDetail` uses `<AspectRatio ratio={2/3}>` for the mobile image; only `PortfolioDetailTertiary` centers the title. A bug fix touching card layout must be made three times.
- Distribution in current data (`lib/data/projects.ts`):
  - `primary`: 19 projects
  - `secondary`: 7 projects (ids 17, 19, 22, 25, 27, 28, 29)
  - `tertiary`: 4 projects (ids 20, 21, 26, plus gnosis-k2)
- Fix approach: Extract a single `PortfolioDetail` component that takes a `variant: "primary" | "secondary" | "tertiary"` prop and branches only on the differences (hero placement, title position). Reduces maintenance surface ~3x.

### Discoterra hero_url is just the thumbnail (low)
- File: `lib/data/projects.ts:192,199` (id 29)
- Issue: `hero_url` points to the same file as `thumbnail_url` (`discoterra_thumb_01.jpg`). The detail page will render the thumbnail at full hero resolution — likely blurry on desktop secondary layout which uses `h-[50vh]` and `sizes="100vw"`.
- Fix approach: Source a higher-resolution still or mark this project with a hero-less layout.

### Empty description strings on four projects (low)
- File: `lib/data/projects.ts`
  - id 20 Jumo Health — line 402
  - id 21 Natto Pharma — line 418
  - id 22 UnoBravo — line 433
  - id 27 Ropes For Building Blocks — line 519
- Impact: On these pages `ProjectAboutCard` returns `null` (per its early return in `ProjectAboutCard.tsx:13-15`), leaving a sparse layout. Also affects `generateMetadata` in `app/portfolio/[slug]/page.tsx:20` which falls back to `"${project.title} - sound by Lorenzo Pardell"` — SEO description is weak.
- Fix approach: Add real one-paragraph descriptions, or accept the fallback and document it.

### Empty video_url on three projects (low)
- File: `lib/data/projects.ts`
  - id 18 O Segredo Dos Passaros — line 370 (has `filmfreeway_url` instead)
  - id 21 Natto Pharma — line 420
  - id 27 Ropes For Building Blocks — line 521
- Impact: `ProjectVideoCard` correctly returns `null` for these (`ProjectVideoCard.tsx:19-21`), so no broken embeds. Acceptable; noted for data completeness.

### Orphan file in project image folder (low)
- File: `public/images/projects/esse_e_o_bicho_s02/4549_3.jpg`
- Issue: This file is not referenced by any project record (the data uses `esse_e_o_bicho_thumb_01.png` and `esse_e_o_bicho_hero_01.jpg`). Stray asset from source import. Wastes build bytes on Vercel.
- Fix approach: Delete the file, or promote it to a gallery image once a gallery feature exists.

### Legacy `tailwind.config.js` shim alongside Tailwind v4 (low)
- Files: `tailwind.config.js`, `app/globals.css`, `postcss.config.mjs`
- Issue: Project uses Tailwind v4 (`@tailwindcss/postcss` in `package.json:34`) with CSS-first config in `app/globals.css`. The `tailwind.config.js` is a CommonJS v3-style file that declares `content`, `darkMode`, and a container theme. Under Tailwind v4 the `content` key is auto-detected and this file is effectively ignored for class scanning; however, the `darkMode: ["class", 'html[class~="dark"]']` directive there is legacy v3 syntax and no `dark:` toggle exists because `next-themes` is not wired (see next item). The file is a source of confusion — contributors may edit it expecting v3 semantics.
- Fix approach: Delete `tailwind.config.js`, document the v4 CSS-first setup in `CLAUDE.md` or in a comment at the top of `app/globals.css`.

### `next-themes` installed but not wired (medium)
- File: `package.json:23` declares `"next-themes": "^0.4.6"`
- Consumers: Only `components/ui/sonner.tsx:3` imports `useTheme` from `next-themes`
- Issue: `app/layout.tsx` does not wrap the app in `<ThemeProvider>`. The components and cards have `dark:` variants everywhere (e.g. `PortfolioDetail.tsx:33`, `ProjectDetailsCard.tsx:42`) but there is no mechanism for the `.dark` class to appear on `<html>`. Dark mode is effectively dead code, and `sonner`'s `useTheme()` call returns `undefined` at runtime (benign — sonner defaults). Ships ~3 KB gzipped of unused JS.
- Fix approach: Either (a) wire `<ThemeProvider attribute="class" defaultTheme="system">` in `app/layout.tsx:97-119` and add a toggle, or (b) remove `next-themes` from `package.json` and strip the `useTheme()` call from `sonner.tsx`. Pick one; current state is the worst of both.

### `next.config.ts` is empty (low)
- File: `next.config.ts:1-5`
- Issue: `const nextConfig: NextConfig = {};` — no image optimization config, no experimental flags, no `output: "standalone"` (fine for Vercel), no `typedRoutes`. Acceptable given the scope, but should be explicitly documented as "empty by design" or used to centralize things the project now does ad hoc (e.g., no remote image hosts needed post-Supabase removal — this is the correct state, worth a comment).
- Fix approach: Add a leading comment noting the file is intentionally empty because the site is fully static with local `public/images` only.

---

## Known Bugs

### `ProjectVideoCard` tries `<video>` for YouTube URLs before falling back to iframe (medium)
- File: `components/portfolio/ProjectVideoCard.tsx:43-79`
- Symptoms: Every non-Instagram project (~25 projects, most with YouTube URLs) mounts a `<video src="https://www.youtube.com/...">` element. Browsers cannot play YouTube URLs via `<video>`, so `onError` fires, `videoError` flips `true`, and the component re-renders with the iframe. This causes a brief flash of the fallback path and an extra render.
- Files affected: 25 of 30 projects (all with `youtube.com` or `youtu.be` `video_url`).
- Trigger: Any project detail page with a YouTube link (e.g. `/portfolio/primavera-nos-dentes`).
- Fix approach: Short-circuit on URL detection — if `url.includes('youtube') || url.includes('youtu.be') || url.includes('vimeo.com')`, render the iframe directly. Only use `<video>` for actual `.mp4`/`.webm` URLs (none currently in the data set — this path is effectively dead for the current content).

### Unsafe `new URL(url)` on unvalidated YouTube URL (low)
- File: `components/portfolio/ProjectVideoCard.tsx:104`
- Symptoms: `new URL(url).searchParams.get('v')` throws `TypeError` if `url` is malformed. Currently guarded by the preceding `.includes('youtube.com/watch')` check, so only triggers on truly broken data. Wrapped in the fallback render path, so one broken URL would crash the whole video card.
- Fix approach: Wrap in `try/catch` or use a regex extraction. Safer for user-editable data.

### Tertiary layout has commented-out gallery placeholder (low)
- File: `components/portfolio/PortfolioDetailTertiary.tsx:73` — `{/* Project images/gallery could be added here if needed */}`
- Issue: Not a bug, but a TODO-by-comment. Should either become a real feature or be removed.

### `PortfolioPageClient` does not sort filtered projects by release date (medium)
- File: `components/portfolio/PortfolioPageClient.tsx:22-27`
- Symptoms: When a visitor filters by category, projects render in the order they appear in the `projects` array (which is roughly newest-first but not enforced). The home page uses `sortProjectsByDate` in `getFeaturedProjects`, and `SelectedWorks` gets sorted data, but `/portfolio` does not call `sortProjectsByDate` at all — users see insertion order, not chronological.
- Trigger: Visit `/portfolio`; older 2022 projects may appear above newer 2024 projects depending on insertion order.
- Fix approach: `const filteredProjects = useMemo(() => sortProjectsByDate(selectedCategory === null ? projects : projects.filter(...)), [selectedCategory])`.

### Dead link to `/reel` route (low)
- File: `components/home/HeroSection.tsx:113` — `<Link href="/reel">`
- Symptoms: The "Watch Reel" button is gated by `showWatchReelButton` (default `false`), and `app/page.tsx:29` does not pass it, so the link never renders. However, if any future page passes the prop, clicking the button leads to a 404 — `app/reel/` does not exist.
- Fix approach: Either remove the `showWatchReelButton` prop and its entire JSX block (dead code), or add an `app/reel/page.tsx` route.

---

## Security Considerations

### No secrets found — good (info)
- Checked: `grep -ri "supabase\|SUPABASE"` returns zero matches in `app/`, `components/`, `lib/`, `hooks/`, `next.config.ts`, or `package.json`. The Supabase removal is clean — no env var references, no dead client, no image hostname in `next.config.ts`. Matches only remain in `.planning/` historical docs and `CLAUDE.md`, which is intentional.
- `process.env` is not referenced in any source file. No `.env*` files present. Nothing to leak.

### `dangerouslySetInnerHTML` for JSON-LD is safe but unreviewed (low)
- Files: `app/layout.tsx:102-109` (Person + LocalBusiness schemas), `app/portfolio/[slug]/page.tsx:53-56` (CreativeWork)
- Issue: The content comes from `JSON.stringify(buildPersonSchema())` / project data — no user input path exists today. However, because some project titles contain double quotes and backslashes (e.g. id 7 `"Primavera nos Dentes"` description includes `\"`, id 30 includes escaped quotes), `JSON.stringify` handles escaping correctly. Low risk.
- Recommendation: Keep the source of schema builders under review when adding any user-submitted content.

### External iframes run without sandboxing (low)
- File: `components/portfolio/ProjectVideoCard.tsx:29-36, 62-71`
- Issue: Instagram/YouTube iframes have `allowFullScreen` and an `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"` string but no `sandbox` attribute and no `referrerPolicy`. For a portfolio loading known-good video hosts, this is acceptable, but `clipboard-write` permission is never needed for a video player and should be removed.
- Fix approach: Drop `clipboard-write` from the `allow` list. Optionally add `referrerPolicy="strict-origin-when-cross-origin"`.

### Build does not block on type errors (low)
- File: `package.json:6-10` — `"build": "next build"` with no `tsc --noEmit`
- Issue: `next build` only type-checks files it imports. Files with silent type errors (e.g. unused imports, implicit any in dead scripts like `scripts/verify-continuity.ts`) can drift undetected.
- Fix approach: Add `"typecheck": "tsc --noEmit"` and call it from CI.

---

## Performance Bottlenecks

### Framer Motion loaded on every page, including static ones (medium)
- Files: `components/home/HeroSection.tsx`, `PortfolioCard.tsx`, `PortfolioDetail*.tsx`, `ProjectAboutCard.tsx`, `ProjectDetailsCard.tsx`, `ProjectVideoCard.tsx`, `ui/WhatsAppLive.tsx`, `home/SelectedWorks.tsx`, plus at least 10 more `components/**` files (see grep results above)
- Impact: `framer-motion` is ~110 KB gzipped when bundled. Because nearly every interactive component uses `motion.div`, it lands in the first-load JS of every route. For a 30-project static portfolio this is the dominant JS cost.
- Fix approach: Replace the simple fade/slide variants with CSS `@keyframes` + `tailwindcss-animate` (already installed, `package.json:30`). Reserve framer-motion for `AnimatePresence` usage in `HeroSection` rotating text and `WhatsAppLive` panel — those are the only two places where CSS cannot replicate the behavior easily. Could cut ~80 KB from first-load JS.

### Every portfolio card animates with its own `useInView` observer (low)
- File: `components/portfolio/PortfolioCard.tsx:19-24`
- Impact: On `/portfolio`, 30 separate `IntersectionObserver` instances are created, one per card. Not catastrophic but wasteful — a single observer at the grid level could hand out indices.
- Fix approach: Move `useInView` up to `PortfolioGrid`, or swap to CSS `@starting-style` + `animation-timeline: view()` once browser support is acceptable. Optional.

### `PortfolioCard` renders `<p>Loading...</p>` placeholder instead of a blur (low)
- File: `components/portfolio/PortfolioCard.tsx:72-81`
- Impact: Next.js `Image` component already handles progressive loading; the custom text placeholder is a throwback to the Supabase era and fights the `Image` component's own fade behavior. The `imageLoaded` state gate also means the image starts at `opacity-0` until the `onLoad` event, delaying first paint.
- Fix approach: Remove the manual opacity gate and the text placeholder. Use `placeholder="blur"` with a tiny `blurDataURL` generated at build time, or just let the image load natively. Already fixed CTA overlay and other image issues per milestone 04; this was missed.

### `PortfolioPageClient` forces a client-component boundary for what could be mostly static (low)
- File: `app/portfolio/page.tsx` → `components/portfolio/PortfolioPageClient.tsx:1`
- Impact: The entire portfolio grid (30 cards × image + motion) ships as client JS only because category filtering is local state. Could be a Server Component passing `searchParams`-based filter down, with a small client island for the filter chip row.
- Fix approach: Convert `PortfolioGrid` to a server component receiving already-filtered `projects`; keep only `CategoryFilter` as a client island that navigates via `?category=X`. Saves client JS and enables streaming.

---

## Fragile Areas

### `PortfolioDetail*` variant selection is string-typed (medium)
- File: `lib/data/projects.ts:15` — `design_version?: string;`
- Issue: The field is typed as arbitrary `string`, not `"primary" | "secondary" | "tertiary"`. A typo in `projects.ts` (e.g. `"primry"`) would silently fall through the variant-selection switch in `components/portfolio/ProjectSlugClient.tsx` (likely) and render the default. TypeScript would not catch it.
- Safe modification: Tighten to `design_version?: "primary" | "secondary" | "tertiary";` and let the compiler enforce the contract.
- Test coverage: No unit tests. Only `scripts/verify-continuity.ts` checks design-version routing at the shell level.

### Three near-identical detail wrappers must be kept in sync (medium)
- See Tech Debt above. Every time a child card's props change, three parent components must be updated. Already drifted on whether `motion.div` wraps the outer container vs inner container.
- Test coverage: None at component level. Any refactor risks visual regressions on 11 projects (secondary + tertiary combined).

### `videoId` extraction assumes YouTube URL shapes (low)
- File: `components/portfolio/ProjectVideoCard.tsx:101-108`
- Issue: Handles `youtube.com/watch?v=`, `youtu.be/`, but not `youtube.com/shorts/` — which is what id 16 Papo Cruzado uses (`lib/data/projects.ts:337` → `https://www.youtube.com/shorts/NY6A_bazp4Y`). The `getEmbedUrl` falls through to `return url` at line 118, and the embed iframe attempts to load `https://www.youtube.com/shorts/NY6A_bazp4Y` which YouTube blocks in iframes. That project's video card will show a blank embed (visible only after `<video>` onError fallback, per the bug above).
- Fix approach: Add a branch for `/shorts/`: `videoId = url.split('/shorts/')[1].split('?')[0]`.

---

## Scaling Limits

Not a real concern for a 30-project static site, but worth noting once:

### All projects bundled into page JS (low)
- File: `lib/data/projects.ts` (576 lines, ~30 projects)
- Issue: Every page that imports `projects` (e.g. `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`, `sitemap.ts`) gets the full array inlined. At 30 projects this is negligible. At 300 projects the `/portfolio` page bundle would balloon; at that point split per-category.

---

## Missing Critical Features

### No error reporting / monitoring (medium)
- Files checked: `package.json`, `app/error.tsx`, `app/layout.tsx`
- Gap: No Sentry, no `@vercel/analytics`, no `@vercel/speed-insights`, no error boundary instrumentation. `app/error.tsx` catches runtime errors and renders a "Try Again" button but never reports them anywhere. On a static site this is acceptable-but-minimal — you will never learn about client errors visitors hit.
- Fix approach: Add `@vercel/analytics` and `@vercel/speed-insights` (free on Vercel). Optionally add Sentry's Next.js SDK for error capture in `app/error.tsx`.

### No `app/global-error.tsx` (low)
- Gap: `app/error.tsx` exists but no `global-error.tsx`. If the root layout itself throws (e.g. jsonLd builder), the error boundary cannot catch it because the error happens above the `<html>` root.
- Fix approach: Add a minimal `app/global-error.tsx` that wraps its own `<html><body>` and renders a fallback.

### No automated tests (medium)
- Files: No `*.test.*`, no `vitest.config`, no `jest.config`, no `playwright.config`. Only `scripts/verify-continuity.ts` which runs shell-level data sanity checks.
- Impact: Any refactor of the three design variants, the video embed helper, or the project data relies entirely on manual QA. Future Claude sessions cannot confidently rewrite these files.
- Recommendation: Add Vitest for `getEmbedUrl`, `sortProjectsByDate`, `getFeaturedProjects`. Add Playwright smoke test for `/`, `/portfolio`, a primary/secondary/tertiary project page. Even 10 tests would cover the fragile paths.

---

## Accessibility Gaps

### Iframes missing `title` on Instagram variant (info)
- File: `components/portfolio/ProjectVideoCard.tsx:29-36`
- The `title={project.title}` is present on both Instagram and YouTube iframes. Good.

### Decorative SVGs lack `aria-hidden` (low)
- File: `components/home/HeroSection.tsx:115-125` — inline play-icon SVG has no `aria-hidden="true"`.
- Also: `components/portfolio/ProjectDetailsCard.tsx:72,84` — arrow spans use `aria-hidden="true"`. Good precedent but inconsistent.
- Fix approach: Add `aria-hidden="true"` to all purely decorative inline SVGs.

### `scrolling="no"` deprecated attribute on Instagram iframe (low)
- File: `components/portfolio/ProjectVideoCard.tsx:35`
- Issue: `scrolling` was removed in HTML5. Use CSS `overflow: hidden` on the parent or omit — modern browsers ignore the attribute.
- Fix approach: Remove the attribute.

### No `lang` attribute switching for Portuguese content (low)
- File: `app/layout.tsx:98` — `<html lang="en">`
- Issue: ~20 of 30 project descriptions are in Portuguese (e.g. id 1, 3, 4, 11, 14, 15, 16, 18, 28, 30). The root declares `lang="en"`, so screen readers will read Portuguese text with English phonology.
- Fix approach: Wrap Portuguese descriptions in `<p lang="pt-BR">...</p>` inside `ProjectAboutCard`. Requires a `language?: "en" | "pt-BR"` field on `Project`.

### Motion-reduce not honored (low)
- Files: All `motion.div` usage in `components/`
- Issue: Framer Motion can honor `prefers-reduced-motion` via `useReducedMotion`, but no file in this codebase calls it. Users with the OS preference set still see all fades, slides, and the rotating hero text.
- Fix approach: Wrap the hero word-rotator in a `useReducedMotion()` guard; replace variant-based entrance animations with conditional transitions.

---

## Image Optimization Gaps

### Mixed image formats across projects (info, not a concern)
- `lib/data/projects.ts` uses a mix of `.jpg`, `.png`, `.webp`, `.avif`, `.jpeg` for thumbnails and heroes. Not a problem — `next/image` reformats at request time. Noted for completeness.

### `PortfolioCard` image has no blur placeholder (low)
- File: `components/portfolio/PortfolioCard.tsx:59-68`
- Issue: No `placeholder="blur"` + `blurDataURL`. Combined with the manual `opacity-0 → opacity-100` transition, cards flash grey before images appear. Not a performance bug per se, but a perceived-quality gap.
- Fix approach: Generate `blurDataURL` at build time via a script, or switch to `placeholder="empty"` and let LCP win through `priority` on the hero.

### `sizes` attribute too generous on `PortfolioDetail.tsx:71` (low)
- File: `components/portfolio/PortfolioDetail.tsx:71` — `sizes="(max-width: 1024px) 100vw, 40vw"` on mobile image; line 102 uses `sizes="100vw"` on desktop image despite being in a 40% column.
- Impact: Next.js serves a larger image than needed on desktop for the primary layout; LCP image is fine, but data waste on wider viewports.
- Fix approach: Change the desktop variant on line 102 to `sizes="(max-width: 1024px) 0px, 40vw"`.

### Hero image on home uses fill without `sizes` (low)
- File: `components/home/HeroSection.tsx:60-66`
- Issue: `<Image fill priority />` with no `sizes` prop. Next.js will warn in dev and fall back to `100vw` which is correct for a full-bleed hero — but the warning is still emitted.
- Fix approach: Add `sizes="100vw"` explicitly.

---

## SEO Concerns

### Canonical URL mismatch with actual deployment (medium)
- File: `app/layout.tsx:21,72` — `metadataBase: new URL("https://lorenzopardell.com")` and `canonical: "https://lorenzopardell.com"`
- Issue: The deployment URL (per task context) is `https://lorenzopardell.vercel.app`. Either the custom domain is configured on Vercel and this is correct, or it is aspirational and every page currently advertises a canonical URL that does not resolve. Search engines will either merge preview URLs into the canonical (good) or index nothing (bad, if domain doesn't resolve).
- Verification needed: `curl -I https://lorenzopardell.com` to confirm it resolves.
- Fix approach: If the domain is not yet live, set `metadataBase` to `https://lorenzopardell.vercel.app` until DNS is cutover.

### `alternates.canonical` only set on root layout (low)
- File: `app/layout.tsx:71-73`
- Issue: Every page inherits `canonical: "https://lorenzopardell.com"` — including `/portfolio/escravos-da-fe`, `/about`, `/contact`. This means all 30 project pages claim the root URL as canonical, which tells Google to drop the project pages from the index.
- Fix approach: Move `alternates.canonical` out of the root layout and into each `generateMetadata` function with the correct absolute URL, or compute it dynamically from `params`.

### `generateMetadata` in project page does not set `alternates.canonical` (medium)
- File: `app/portfolio/[slug]/page.tsx:9-38`
- Issue: See above — combined with the root layout's static canonical, each project page tells Google "my canonical is https://lorenzopardell.com" instead of the project URL.
- Fix approach: Add `alternates: { canonical: "/portfolio/" + slug }` to the returned metadata.

### Open Graph image per-project uses `project.hero_url` without ensuring 1200x630 (low)
- File: `app/portfolio/[slug]/page.tsx:16-18`
- Issue: Declares `width: 1200, height: 630` but the source file is whatever the user uploaded (hero images range from 2:1 landscape to vertical posters based on layout intent). Facebook and LinkedIn scrapers will accept the declared dimensions but the image may be letterboxed or cropped unexpectedly.
- Fix approach: Generate per-project OG images at build time using `next/og` and a shared template (hero background + title overlay). The `@next/og` package is not in dependencies yet.

### Robots/sitemap present but not verified (info)
- Files: `app/robots.ts`, `app/sitemap.ts` exist. Not audited in this pass. Worth a follow-up read.

### No `keywords` meta on individual project pages (info)
- `app/layout.tsx:28-63` has an exhaustive keywords array; no per-project keyword derivation. Google largely ignores the `keywords` meta, so not a blocker — noted.

---

## Test Coverage Gaps

### No coverage on `getEmbedUrl` (high)
- File: `components/portfolio/ProjectVideoCard.tsx:90-119`
- What's not tested: URL parsing for YouTube (watch, youtu.be, shorts), Vimeo, Instagram reels/posts, and the fall-through case. Directly responsible for whether a project's video renders correctly. Contains the two known bugs above (YouTube Shorts not handled, unsafe `new URL`).
- Risk: Adding a new project with a non-standard URL shape silently breaks the video card on that one page and nobody notices until a visitor reports it.
- Priority: **High** — this is the function most likely to break with new content.

### No coverage on `sortProjectsByDate` / `getFeaturedProjects` (medium)
- File: `lib/data/projects.ts:558-571`
- Risk: Subtle ordering regressions (e.g. missing `release_date` puts a 2026 project below a 2018 project). Home page "Selected Works" feature depends on this.
- Priority: Medium.

### No coverage on design-version routing (medium)
- File: `components/portfolio/ProjectSlugClient.tsx` (not read in this pass, but referenced from `app/portfolio/[slug]/page.tsx:57`)
- Risk: A typo in `design_version` falls through to the default and renders the wrong layout. See Fragile Areas.
- Priority: Medium. Partially covered by `scripts/verify-continuity.ts`, but that's a shell script not a unit test.

---

*Concerns audit: 2026-04-10*
