# Testing Patterns

**Analysis Date:** 2026-04-10

## Current State: No Test Infrastructure

**This project has zero test infrastructure.** This section documents that fact honestly so planners and executors do not assume tests exist or attempt to "match" a non-existent pattern.

### What is missing

- **No test runner** installed. `package.json` has no `jest`, `vitest`, `mocha`, `node:test`, `@testing-library/react`, `@testing-library/jest-dom`, or `playwright` / `cypress` dependency in either `dependencies` or `devDependencies`.
- **No test script** in `package.json`. Only `dev`, `build`, `start`, `lint` are defined:
  ```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
  ```
- **No test files anywhere in the repo.** A recursive search for `*.test.*`, `*.spec.*`, `__tests__/`, `jest.config.*`, `vitest.config.*`, `playwright.config.*`, or `cypress.config.*` outside `node_modules/` returns zero hits.
- **No test directory.** There is no `tests/`, `__tests__/`, `spec/`, or `e2e/` folder at any level.
- **No CI pipeline runs tests.** There is no `.github/workflows/`, `vercel.json`, or other CI config invoking a test command. Deployment is presumed to be Vercel's default build-on-push, which runs only `next build`.
- **No coverage tooling.** No `nyc`, `c8`, or coverage config.
- **No mocking framework** configured. No `msw`, `nock`, or Jest mocks — consistent with there being no runner.
- **No type-level test harness** (`tsd`, `expect-type`, etc.).

### What quality signals do exist

The project relies on these in place of tests:

- **TypeScript strict mode** (`tsconfig.json` `"strict": true`) — catches type errors at build time.
- **`next build`** — the deploy pipeline fails on type errors or broken route imports.
- **`next lint`** — runs Next.js's default ESLint ruleset (no custom config).
- **Manual verification** — changes are validated by running `npm run dev` and clicking through the site.
- **Static data model** — `lib/data/projects.ts` is a typed array, so a missing or mistyped field surfaces immediately as a TypeScript error when accessed.

## Gaps & Risks

Because there is no automated testing, the following changes are particularly risky and warrant extra manual QA:

1. **Changes to `lib/data/projects.ts`** — a malformed entry breaks `generateStaticParams` and the `/portfolio/[slug]` route silently for that project.
2. **Server/Client boundary changes** — moving code between `app/*/page.tsx` and `components/*/*PageClient.tsx` can silently break if a server component imports a hook, or a client component is given a non-serializable prop. Only caught at build time (or worse, runtime).
3. **Framer Motion variants** — purely visual; regressions are invisible without manual click-through.
4. **`lib/copy.ts` edits** — any component that reads a key that was renamed or removed will crash at render. Not caught until the page is loaded.
5. **`lib/jsonld.ts` schema changes** — SEO regressions are undetectable without external validators.
6. **Image path typos** in project entries — `next/image` will throw a 404 but the page still renders; no automated check.
7. **Accessibility regressions** — no axe / lighthouse automation.

## Recommended Minimal Test Setup (if tests are ever added)

This section is a forward-looking suggestion, **not** a description of current state. Do not treat it as existing.

A sensible first slice for this codebase would be:

- **Vitest** as the runner (native ESM, fast, integrates with Vite/Turbopack-compatible tooling).
- **`@testing-library/react`** for component rendering.
- **`@testing-library/jest-dom`** matchers.
- **Happy-DOM** or **jsdom** as the DOM environment.
- A single `tests/` directory at the repo root, or co-located `Foo.test.tsx` next to each component.
- Highest-value first tests:
  1. `lib/data/projects.ts` — schema / shape assertion for every entry (every project has unique `id`, unique `slug`, non-empty `title`, valid `category`, thumbnail file exists on disk).
  2. `lib/jsonld.ts` — snapshot tests on `buildPersonSchema`, `buildLocalBusinessSchema`, `buildCreativeWorkSchema(project)`.
  3. `lib/social-links.tsx` — `getVisibleSocialLinks()` filters correctly.
  4. Route-level smoke tests via Playwright that each of `/`, `/portfolio`, `/portfolio/[first-slug]`, `/about`, `/services`, `/contact`, `/faq` returns 200.

None of the above exists today. **Do not pretend otherwise when planning or executing phases.**

## Test Framework

Not applicable.

## Test File Organization

Not applicable.

## Test Structure

Not applicable.

## Mocking

Not applicable.

## Fixtures and Factories

Not applicable.

## Coverage

Not applicable. No coverage is measured or enforced.

## Test Types

- **Unit Tests:** None.
- **Integration Tests:** None.
- **E2E Tests:** None.
- **Visual Regression:** None.
- **Accessibility:** None automated.

## Run Commands

There are no test commands. The full list of runnable scripts is:

```bash
npm run dev      # Next.js dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # next lint (no custom ESLint config)
```

---

*Testing analysis: 2026-04-10*
