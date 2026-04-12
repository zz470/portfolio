# Coding Conventions

**Analysis Date:** 2026-04-10

> Supplements the "Conventions" section in `CLAUDE.md`. This document is prescriptive — follow these patterns when adding new code.

## Tooling Baseline

**Linting:**
- `next lint` is wired via `package.json` script, but **no `.eslintrc`, `eslint.config.*`, or `biome.json` file exists at the project root**. Lint runs with Next.js defaults only.

**Formatting:**
- **No `.prettierrc` or equivalent formatter config is present.** Style is enforced by convention and editor defaults, not tooling.

**TypeScript:**
- `tsconfig.json` is strict (`"strict": true`), `target: ES2017`, `moduleResolution: bundler`, `jsx: preserve`.
- Path alias: `@/*` → project root. **Always import via `@/`** — never use `../` across directories.

## File & Directory Naming

**Route files (App Router):** Next.js conventions, always lowercase.
- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`
- Dynamic segments: `[slug]`, `[category]`

**Feature components:** PascalCase.tsx
- `components/home/HeroSection.tsx`
- `components/portfolio/PortfolioCard.tsx`
- `components/portfolio/PortfolioPageClient.tsx`

**shadcn/ui primitives:** lowercase kebab-case.tsx (preserve as generated)
- `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/aspect-ratio.tsx`

**Hooks:** camelCase starting with `use` (directory: `hooks/` — currently empty since Supabase removal; add here if needed).

**Lib modules:** lowercase.ts
- `lib/utils.ts`, `lib/copy.ts`, `lib/animations.ts`, `lib/jsonld.ts`, `lib/social-links.tsx`, `lib/contact-info.ts`, `lib/data/projects.ts`

**Known naming outliers (do not replicate in new files, but leave existing):**
- `components/navigation/header.tsx` — lowercase instead of `Header.tsx`
- `components/navigation/footer.tsx` — lowercase instead of `Footer.tsx`
- `components/home/partner-logos.tsx` — kebab-case instead of `PartnerLogos.tsx`
- `components/ui/WhatsAppLive.tsx` — PascalCase in the `ui/` directory (the rest of `ui/` is shadcn kebab-case)

**Rule for new files:** PascalCase for feature components (`NewSection.tsx`), kebab-case only when adding shadcn primitives to `components/ui/`.

## Identifier Naming

- **Functions:** camelCase — `getProjectBySlug`, `getFeaturedProjects`, `getVisibleSocialLinks`, `buildCreativeWorkSchema`
- **React components:** PascalCase — `HeroSection`, `PortfolioCard`, `ProjectSlugClient`
- **Local variables:** camelCase — `featuredProjects`, `filteredProjects`, `isHomePage`
- **Boolean state:** prefix with `is`/`has` — `isMobileMenuOpen`, `isHomePage`, `imageLoaded`, `imageError` (some omit prefix, e.g. `imageLoaded`; prefer `is` prefix for new code)
- **Constants:** camelCase, not `UPPER_CASE` — `const navItems = [...]`, `const services = [...]`, `const serviceIcons = [...]`
- **Types / interfaces:** PascalCase — `Project`, `HeroSectionProps`, `PortfolioCardProps`, `ErrorProps`

## TypeScript Usage

**Props:** use `interface`, declared directly above the component.
```tsx
interface HeroSectionProps {
  showWatchReelButton?: boolean;
  backgroundImageUrl?: string;
  className?: string;
}

export default function HeroSection({ ... }: HeroSectionProps) { ... }
```

**Optional props** use `?`: `imdb_url?: string`, `hero_url?: string`.

**Project data model:** `Project` interface is the primary domain type, exported from `lib/data/projects.ts` and imported with `import { type Project } from "@/lib/data/projects"`.

**Layout children:** wrap in `Readonly<>`:
```tsx
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { ... }
```

**Async page params (Next.js 15):** `params` is a `Promise` and must be awaited.
```tsx
// app/portfolio/[slug]/page.tsx
type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  ...
}
```

**No runtime env validation** — the previous Supabase-era non-null assertion pattern (`process.env.X!`) is gone with the backend. Environment variable use is not expected in new code; static data lives in `lib/data/`.

## Server vs Client Split

**This is the most important architectural convention** and supersedes the older `CLAUDE.md` note ("all pages use `'use client'`"), which referred to the Supabase era.

**Current rule:**
- **Route files in `app/` are Server Components.** `app/page.tsx`, `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/faq/page.tsx` — none of these declare `"use client"`.
- Route files export `metadata` / `generateMetadata` / `generateStaticParams` and fetch static data synchronously from `lib/data/projects.ts`.
- **Interactive logic lives in `*PageClient.tsx` shells** under `components/<feature>/`:
  - `components/portfolio/PortfolioPageClient.tsx`
  - `components/portfolio/ProjectSlugClient.tsx`
  - `components/portfolio/CategoryPageClient.tsx`
  - `components/portfolio/ProjectLayoutClient.tsx`
  - `components/services/ServicesPageClient.tsx`
  - `components/about/AboutPageClient.tsx`
  - `components/faq/FAQPageClient.tsx`
- Route files import and render the `*Client` shell:
  ```tsx
  // app/portfolio/page.tsx
  import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";
  export default function PortfolioPage() { return <PortfolioPageClient />; }
  ```

**`"use client"` directive exceptions in `app/`:** only `app/error.tsx` and `app/portfolio/loading.tsx` (plus framework-required error boundaries).

**When to add `"use client"`:**
- Component uses `useState`, `useEffect`, `useRef`, `useMemo`, `useInView`
- Component uses `usePathname`, `useRouter`, or other client navigation hooks
- Component uses `framer-motion` (`motion.*`, `AnimatePresence`) — treat framer-motion as client-only
- Component attaches event handlers (`onClick`, `onChange`)

**When NOT to add `"use client"`:**
- Pure presentational components that only render props (shadcn primitives like `button.tsx`, `card.tsx` are not client components)
- Route files — wrap interactive children in a `*Client` shell instead

## Component Patterns

**Functional only.** No class components.

**Default exports for feature components:**
```tsx
export default function PortfolioCard({ project, index }: PortfolioCardProps) { ... }
```

**Named exports for shadcn primitives** (keep as generated):
```tsx
export { Button, buttonVariants }
```

**Mixed-export outliers (existing, do not replicate):**
- `components/home/ServicesSection.tsx` has both `export function ServicesSection()` and `export default ServicesSection;`
- `components/home/SelectedWorks.tsx` uses `forwardRef` and `export default SelectedWorks;`
- `components/ui/WhatsAppLive.tsx` uses `export const WhatsAppLive = () => {}`

**Destructure props in the signature with defaults:**
```tsx
export default function HeroSection({
  showWatchReelButton = false,
  backgroundImageUrl = "/images/hero_image.jpg",
  className = "",
}: HeroSectionProps) { ... }
```

**Always accept `className` on reusable components** and merge via `cn()`:
```tsx
<div className={cn("w-full py-12", className)} />
```

## Styling — Tailwind v4 + `cn()`

**Tailwind v4** is loaded via `@import "tailwindcss"` in `app/globals.css`. A legacy `tailwind.config.js` also exists but v4 primarily reads CSS.

**PostCSS plugin:** `@tailwindcss/postcss` in `postcss.config.mjs`.

**`cn()` utility** — always use for merging conditional classes:
```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Container pattern (use consistently):**
```tsx
<div className="max-w-screen-xl mx-auto px-6 md:px-10">
```

**Responsive:** mobile-first with `md:` and `lg:` breakpoints.

**Dark mode:** class-based via `.dark` on `html` (`dark:bg-gray-900`, `dark:text-gray-300`). Design tokens use OKLCH variables in `app/globals.css`.

**Brand color:** `orange-500` is the primary accent. Hero gradient: `bg-gradient-to-r from-orange-400 to-amber-200`. Button gradient: `from-amber-400 to-orange-500`.

**Fonts:** `Geist` and `Geist_Mono` from `next/font/google`, loaded in `app/layout.tsx` and exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`.

**`class-variance-authority` (cva)** drives variants in shadcn primitives (`components/ui/button.tsx`, `components/ui/badge.tsx`):
```tsx
const buttonVariants = cva("inline-flex ...", {
  variants: { variant: { default: "...", destructive: "..." }, size: { default: "...", sm: "..." } },
  defaultVariants: { variant: "default", size: "default" },
})
```

**Icons:** `lucide-react` is imported where needed (e.g. `SelectedWorks.tsx`). Many components still inline raw SVG (header menu icons, service icons) — acceptable where the icon is unique to that component.

## Framer Motion Patterns

**Import:**
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
```

**Two coexisting conventions (documented, pick one per component):**

1. **Inline `initial` / `animate` / `transition`** — preferred for new code:
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
   />
   ```

2. **Named variants with `hidden` / `visible` keys** — used in `PortfolioCard.tsx`, `ServicesSection.tsx`:
   ```tsx
   const cardVariants = {
     hidden: { opacity: 0, y: 50 },
     visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: staggerDelay } }
   };
   <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={cardVariants} />
   ```

**Shared variants** live in `lib/animations.ts` (`fadeIn`, `slideUp`, `staggerContainer`). Import these rather than duplicating when the animation is generic.

**Scroll-triggered animations:** `useInView` with `{ once: true, amount: 0.1 }` — see `components/portfolio/PortfolioCard.tsx`.

**Enter/exit animations:** wrap with `AnimatePresence mode="wait"` — see `HeroSection.tsx` rotating word.

**Stagger pattern:** compute index-based `delay` (see `PortfolioCard` staggerOrder calculation) or use `staggerChildren` on a container variant.

## Import Organization

Observed (non-enforced) order:
1. Type imports (`import type { Metadata } from "next"`)
2. React / Next built-ins (`next/link`, `next/image`, `next/navigation`, `next/font/google`)
3. Third-party libs (`framer-motion`, `lucide-react`, `class-variance-authority`)
4. Internal absolute imports via `@/` (components, lib, data)
5. Relative imports — rarely used; avoid in new code

**Always use `@/`** — never `../../lib/utils`.

## Data Access

**Static data only.** The Supabase integration was removed. Projects live in `lib/data/projects.ts` as a typed `Project[]` array.

**Accessor helpers** (add new ones alongside existing) in `lib/data/projects.ts`:
- `getProjectBySlug(slug)`
- `getFeaturedProjects(limit)`
- `projects` array for direct enumeration / `generateStaticParams`

**Do not re-introduce `useEffect` + async data-fetching hooks.** The old `hooks/useProjects.ts` / `useProject.ts` pattern is gone; server components now import the data synchronously.

## Error Handling

**Route-level:** `app/error.tsx` provides the global error boundary (client component with `reset()` button). `app/not-found.tsx` handles 404s.

**Programmatic 404:** call `notFound()` from `next/navigation` in route files when a record is missing:
```tsx
const project = getProjectBySlug(slug);
if (!project) notFound();
```

**Image load fallback:** track `imageLoaded` / `imageError` with `useState`, render text fallback on error. See `PortfolioCard.tsx` lines 15–17, 59–93.

**No error boundary components** beyond `app/error.tsx`. No Sentry / monitoring.

## Logging

- `console.log` was heavily used during the Supabase era for fetch debugging. In the current static-data build most of those should be gone; remove any you encounter when touching a file.
- `console.warn` for data-shape warnings; `console.error` for caught exceptions.
- **No structured logger.** Do not add one without a broader discussion.

## Comments

- **Section markers in JSX:** `{/* Hero Section */}`, `{/* Mobile navigation */}` — use these to delimit visual blocks.
- **Brief inline explanations:** `// Take the first 3 featured projects`, `// Extract unique categories from projects`
- **File path comments** at the top of some files (`// components/PortfolioDetail.tsx`) — optional, not required.
- **Minimal JSDoc.** Only `lib/social-links.tsx` uses `/** ... */`. Component props rely on TypeScript; do not add JSDoc unless documenting a non-obvious contract.
- **Do not leave commented-out code** in new commits.

## Module Design

- **One component per file** (single responsibility).
- **Types co-located** with the code that owns them (`Project` in `lib/data/projects.ts`, `HeroSectionProps` in `HeroSection.tsx`).
- **No barrel files** (`index.ts`). All imports are direct.
- **Content / copy centralized** in `lib/copy.ts` — navigation items, hero text, services cards, FAQ entries all import from `copy`. Do not hardcode user-facing strings in components when `lib/copy.ts` can own them.
- **Social links** centralized in `lib/social-links.tsx`.
- **JSON-LD schemas** in `lib/jsonld.ts` (`buildPersonSchema`, `buildLocalBusinessSchema`, `buildCreativeWorkSchema`).
- **Shared animation variants** in `lib/animations.ts`.

## Images

- **Always use `next/image`**, never raw `<img>`.
- **Always provide `alt`** — follow the "— sound by Lorenzo Pardell" suffix convention for project images (see `PortfolioCard.tsx` line 63).
- **Hero images** use `fill` + `priority` (LCP). Grid/card images use `fill` + `sizes="(max-width: 768px) 100vw, 50vw"`.
- **Local assets only.** All images live under `public/images/projects/<slug>/` and `public/partner_logos/`. No remote image domains are configured in `next.config.ts` after Supabase removal.

---

*Convention analysis: 2026-04-10*
