<!-- GSD:project-start source:PROJECT.md -->
## Project

**Lorenzo Pardell Portfolio**

A personal portfolio website for Lorenzo Pardell, a sound professional (sound designer, mixer, boom operator, dialogue editor, re-recording mixer) working in film, TV series, documentaries, and advertisements. Built with Next.js 15, showcasing 19 projects across multiple categories.

**Core Value:** The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

### Constraints

- **No Supabase**: Must completely remove the Supabase dependency — no client, no env vars
- **No breaking changes**: All existing routes and layouts must continue working
- **Placeholder images**: Use generated placeholders; user will replace with real images later
- **Minimal changes**: Only change what's necessary for the migration
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript ^5 - All application code (`.ts`, `.tsx` files)
- CSS (Tailwind v4) - Styling via `app/globals.css`
- JavaScript - Legacy `tailwind.config.js` (CommonJS)
## Runtime
- Node.js (version not pinned; no `.nvmrc` or `.node-version` present)
- npm (lockfileVersion 3)
- Lockfile: `package-lock.json` present
## Frameworks
- Next.js 15.2.2 - App Router, React Server Components enabled
- React ^19.0.0 - UI library
- React DOM ^19.0.0 - DOM rendering
- Turbopack - Dev server via `next dev --turbopack`
- PostCSS with `@tailwindcss/postcss` plugin - `postcss.config.mjs`
- TypeScript ^5 - Strict mode enabled in `tsconfig.json`
## CSS & Styling
- Config: `tailwind.config.js` (legacy format, also `@import "tailwindcss"` in `app/globals.css`)
- PostCSS plugin: `@tailwindcss/postcss` ^4 in `postcss.config.mjs`
- Animation: `tailwindcss-animate` ^1.0.7 (loaded via `@plugin "tailwindcss-animate"` in CSS)
- Dark mode: class-based (`html[class~="dark"]`)
- Design tokens: CSS custom properties using OKLCH color space in `app/globals.css`
- shadcn/ui (new-york style) - Config in `components.json`
- `class-variance-authority` ^0.7.1 - Variant-based component styling
- `clsx` ^2.1.1 + `tailwind-merge` ^3.0.2 - Class merging via `cn()` helper in `lib/utils.ts`
- Geist Sans and Geist Mono via `next/font/google` - loaded in `app/layout.tsx`
- `lucide-react` ^0.479.0
## Key Dependencies
- `@supabase/supabase-js` ^2.49.1 - Database/backend client, sole data source
- `next` 15.2.2 - Application framework
- `react` ^19.0.0 - UI rendering
- `@radix-ui/react-aspect-ratio` ^1.1.2
- `@radix-ui/react-dropdown-menu` ^2.1.6
- `@radix-ui/react-label` ^2.1.2
- `@radix-ui/react-separator` ^1.1.2
- `@radix-ui/react-slot` ^1.1.2
- `framer-motion` ^12.5.0 - Page transitions, WhatsApp widget animation
- `react-hook-form` ^7.54.2 - Form state management
- `@hookform/resolvers` ^4.1.3 - Validation resolver bridge
- `zod` ^3.24.2 - Schema validation
- `sonner` ^2.0.1 - Toast notifications (via `components/ui/sonner.tsx`)
- `next-themes` ^0.4.6 - Dark/light theme switching (installed but usage not confirmed in layout)
## State Management
- Custom hooks for data fetching: `hooks/useProjects.ts`, `hooks/useProject.ts`
- `useState` + `useEffect` for async data from Supabase
- No global state management library (no Redux, Zustand, Jotai, etc.)
## Configuration
- Target: ES2017, strict mode enabled
- Module resolution: bundler
- Path alias: `@/*` maps to project root (defined in `tsconfig.json`)
- JSX: preserve (handled by Next.js)
- Image domains: `crxuhqqswealopkmdpxq.supabase.co` (configured in `next.config.ts`)
- App Router with RSC support enabled (`"rsc": true` in `components.json`)
- `.env.local` file present (contains Supabase credentials)
- Required vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
## Build Commands
## Platform Requirements
- Node.js (compatible with Next.js 15.2.2, likely Node 18+)
- npm
- No `vercel.json` or Dockerfile detected
- Canonical URL set to `https://lorenzopardell.com` in `app/layout.tsx` metadata
- Likely deployed to Vercel (standard Next.js deployment target)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Page routes: lowercase `page.tsx` in Next.js App Router directories (`app/portfolio/page.tsx`)
- Loading states: `loading.tsx` co-located with page files (`app/portfolio/loading.tsx`)
- Layout files: `layout.tsx` co-located with page files (`app/layout.tsx`, `app/portfolio/[slug]/layout.tsx`)
- Feature components: PascalCase (`HeroSection.tsx`, `PortfolioCard.tsx`, `CTASection.tsx`)
- UI primitives (shadcn): lowercase kebab-case (`button.tsx`, `card.tsx`, `aspect-ratio.tsx`)
- Custom UI components: PascalCase (`WhatsAppLive.tsx`)
- Hooks: camelCase with `use` prefix (`useProjects.ts`, `useProject.ts`)
- Utility modules: lowercase (`utils.ts`, `supabase.ts`)
- Mixed convention exists: `partner-logos.tsx` (kebab-case) alongside `ClientQuote.tsx` (PascalCase) in `components/home/`
- Use camelCase for all functions: `fetchProjects`, `getVisibleSocialLinks`, `getSocialLinkByName`
- React components use PascalCase: `HeroSection`, `PortfolioCard`, `AnimatedText`
- Hooks use camelCase with `use` prefix: `useProjects`, `useProject`
- camelCase for local variables: `featuredProjects`, `isVisible`, `sectionRef`
- UPPER_CASE not used; constants are camelCase: `const services = [...]`, `const navItems = [...]`
- Boolean state variables use `is`/`has` prefix: `isVisible`, `isMobileMenuOpen`, `isLoading`, `imageLoaded`, `imageError` (inconsistent -- some omit the prefix)
- PascalCase with descriptive suffixes: `HeroSectionProps`, `PortfolioCardProps`, `PortfolioDetailProps`
- Use `interface` for component props (not `type`)
- The `Project` interface is the primary data model, defined in `hooks/useProjects.ts` and imported elsewhere
## TypeScript Usage
- Props defined as `interface` directly above the component that uses them
- Non-null assertions used for environment variables: `process.env.NEXT_PUBLIC_SUPABASE_URL!` in `lib/supabase.ts`
- Generic typing on hooks: `useState<Project[] | null>(null)`, `useState<string | null>(null)`
- `Readonly<>` wrapper on layout children props: `Readonly<{ children: React.ReactNode }>`
- Type casting used in places: `slug as string`, `data as Project`
- Optional properties use `?` suffix: `imdb_url?: string`, `hero_url?: string`
- Page components: `export default function PageName()`
- Feature components: `export default function ComponentName()` (default exports)
- UI primitives (shadcn): named exports via `export { Button, buttonVariants }`
- Hooks: named exports via `export function useProjects()`
- One component uses both: `export function ServicesSection()` plus `export default ServicesSection`
- The `Project` interface is exported alongside its hook: `export interface Project` in `hooks/useProjects.ts`
## Component Patterns
- Functional components only (no class components)
- Pages use `export default function` syntax
- Most components use `export default function` syntax
- shadcn UI components use `function Name()` with named export at bottom
- One component uses `forwardRef`: `SelectedWorks` in `components/home/SelectedWorks.tsx`
- Arrow functions used for: sub-components (`const AnimatedText = () => {}`), exported const components (`export const WhatsAppLive = () => {}`)
- Destructured in function signature: `function HeroSection({ title, className }: HeroSectionProps)`
- Default values assigned in destructuring: `title = "Shaping the sound of"`, `className = ""`
- Spread `...props` used in shadcn components: `function Card({ className, ...props })`
- `className` prop is standard on reusable components, merged with `cn()` utility
- `"use client"` directive at top of file for components using hooks, state, or browser APIs
- Files with `"use client"`: all pages (`app/page.tsx`, `app/contact/page.tsx`, etc.), navigation components, interactive components
- Files without `"use client"`: `app/layout.tsx` (root layout is a server component), shadcn UI primitives
- The codebase is predominantly client-side rendered; data fetching happens in client-side hooks, not server components
- Local state via `useState` -- no global state management library
- Data fetching via custom hooks (`useProjects`, `useProject`) that call Supabase directly
- Hooks return `{ data, loading, error }` pattern
## CSS / Styling Conventions
- Config: `components.json` at project root
- Base color: neutral
- CSS variables defined in `app/globals.css` using oklch color space
- Dark mode via `.dark` class on html element
- Defined in `lib/utils.ts` using `clsx` + `tailwind-merge`
- Use `cn()` to merge className props in reusable components:
- Used consistently in all shadcn UI components
- Container: `max-w-screen-xl mx-auto px-6 md:px-10` (consistent across pages and sections)
- Responsive: mobile-first with `md:` and `lg:` breakpoints
- Dark mode: `dark:` variant prefix (`dark:bg-gray-900`, `dark:text-gray-300`)
- Spacing: standard Tailwind scale (`py-16`, `mb-4`, `gap-8`)
- Typography: uses Geist font family via CSS variables (`--font-geist-sans`, `--font-geist-mono`)
- Brand color: orange-500 is the primary accent (`text-orange-500`, `bg-orange-500`, `hover:text-orange-500`)
- Gradient pattern for hero: `bg-gradient-to-r from-orange-400 to-amber-200`
- SVG icons are inlined directly in JSX rather than using icon components from lucide-react in most places
- Exception: `ArrowRight` imported from lucide-react in `components/home/SelectedWorks.tsx`
- Social link icons defined as inline SVG `ReactNode` in `lib/social-links.tsx`
## Animation Patterns
- `fadeIn` variant object defined locally in each component:
- `motion.div` wraps animated elements with `initial`, `animate`, `transition` props
- `AnimatePresence` for enter/exit animations (`HeroSection.tsx`, `WhatsAppLive.tsx`)
- `useInView` from framer-motion for scroll-triggered animations (`PortfolioCard.tsx`)
- Stagger pattern via `staggerChildren` in container variants
- Loading states use bouncing dots with `motion.div` and infinite `repeat`
- Two conventions coexist: `hidden/visible` (in `app/page.tsx`, `ServicesSection.tsx`) and `initial/animate` (in `PortfolioDetail.tsx`, `SelectedWorks.tsx`)
- New components should use `initial/animate` to align with framer-motion terminology
## Import Organization
- `@/*` maps to project root (configured in `tsconfig.json`)
- Always use `@/` prefix for internal imports: `@/components/`, `@/hooks/`, `@/lib/`
- No relative imports (`../`) observed for cross-directory references
## Error Handling
- try/catch in async data fetching hooks with `setError(message)` state
- Error state rendered as simple message: `<p>Error loading projects.</p>`
- `console.error()` for logging caught errors
- Non-null assertion (`!`) on environment variables instead of runtime validation
- Image loading errors handled via `onError` callback with fallback UI
## Logging
- Extensive `console.log` for debugging data fetching (present in `useProjects.ts`, `useProject.ts`, `PortfolioCard.tsx`, project page)
- `console.warn` for missing data: `console.warn("Project is missing a thumbnail URL")`
- `console.error` for caught exceptions
- No structured logging; all debug logs are left in production code
## Comments
- Section markers in JSX: `{/* Hero Section */}`, `{/* Desktop navigation */}`
- Brief explanations above logic: `// Take the first 3 featured projects`
- Commented-out code left in place: `//import ClientQuote` in `app/page.tsx`
- File path comment at top of some files: `// components/PortfolioDetail.tsx`
- Minimal usage; only in `lib/social-links.tsx` with simple `/** description */` blocks
- No JSDoc on component props or hooks
## Module Design
- One component per file (single responsibility)
- Types co-located with the code that defines them (`Project` interface in `useProjects.ts`)
- shadcn UI components export both the component and variant helpers: `export { Button, buttonVariants }`
- None used; all imports reference specific files directly
- Hardcoded in component files (`navItems` in `header.tsx`, `services` in `ServicesSection.tsx`, `socialLinks` in `social-links.tsx`)
- No centralized constants file
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- All page components use `"use client"` -- there are zero Server Components beyond the root layout
- Data is fetched client-side via React hooks that call Supabase directly from the browser
- No API routes, no server actions, no middleware -- the backend is entirely Supabase
- Framer Motion is used pervasively for page transitions and micro-interactions
- shadcn/ui (New York style) provides the base component library
## Layers
- Purpose: Page-level components that compose sections and handle data fetching
- Location: `app/`
- Contains: Page components (`page.tsx`), layouts (`layout.tsx`), loading states (`loading.tsx`)
- Depends on: `hooks/`, `components/`
- Used by: Next.js router
- Purpose: Client-side data fetching from Supabase
- Location: `hooks/`
- Contains: Custom React hooks that fetch and process data
- Depends on: `lib/supabase.ts`
- Used by: Route layer pages
- Key files:
- Purpose: Domain-specific UI components grouped by feature area
- Location: `components/home/`, `components/portfolio/`, `components/navigation/`
- Contains: Presentational and smart components for each feature
- Depends on: `components/ui/`, `hooks/`, `lib/`
- Used by: Route layer pages
- Purpose: Reusable, generic UI components (shadcn/ui)
- Location: `components/ui/`
- Contains: Button, Card, Badge, Input, Form, Skeleton, etc.
- Depends on: `lib/utils.ts` (cn utility)
- Used by: All other layers
- Purpose: Shared utilities and configurations
- Location: `lib/`
- Contains: Supabase client, CSS utility, social links config
- Key files:
## Data Flow
- No global state management (no Redux, Zustand, or Context)
- All state is local to components via `useState`
- Data fetching state (loading, error, data) is managed within each hook
- Category filtering on portfolio page uses local `useState` with `useMemo` for derived data
## Routing Structure
| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Homepage with hero, services preview, featured projects |
| `/portfolio` | `app/portfolio/page.tsx` | Portfolio grid with category filtering |
| `/portfolio/[slug]` | `app/portfolio/[slug]/page.tsx` | Individual project detail page |
| `/services` | `app/services/page.tsx` | Services listing (sound design, mixing, etc.) |
| `/about` | `app/about/page.tsx` | About page with bio and social links |
| `/contact` | `app/contact/page.tsx` | Contact info and WhatsApp link |
- `app/layout.tsx` -- Root layout: Header, main content, Footer, WhatsAppLive widget, Toaster
- `app/portfolio/[slug]/layout.tsx` -- Project detail layout: adds "Back to Projects" button and gray background
- `app/portfolio/loading.tsx` -- Loading skeleton for portfolio grid
- `app/portfolio/[slug]/loading.tsx` -- Loading skeleton for project detail
- `app/services/loading.tsx` -- Loading skeleton for services page
## Key Abstractions
- Purpose: Represents a portfolio project fetched from Supabase
- Defined in: `hooks/useProjects.ts`
- Fields: `id`, `title`, `slug`, `description`, `thumbnail_url`, `video_url`, `category`, `roles[]`, `imdb_url?`, `production_company?`, `media_platform?`, `release_date?` (numeric year), `hero_url?`, `design_version?`
- Pattern: TypeScript interface, exported and imported by consuming components
- Purpose: Allows per-project detail page layout variants
- Implementation: `design_version` field on project record (`"primary"` | `"secondary"` | `"tertiary"`)
- Files: `components/portfolio/PortfolioDetail.tsx`, `components/portfolio/PortfolioDetailSecondary.tsx`, `components/portfolio/PortfolioDetailTertiary.tsx`
- Pattern: Conditional rendering in `app/portfolio/[slug]/page.tsx` based on `project.design_version`
- Purpose: Centralized social media link management with visibility toggle
- File: `lib/social-links.tsx`
- Pattern: Array of `SocialLink` objects with `visible` boolean; `getVisibleSocialLinks()` filters for display
- Used by: `components/navigation/footer.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`
## Entry Points
- Location: `app/layout.tsx`
- Triggers: Every page load
- Responsibilities: Font loading (Geist Sans, Geist Mono), global metadata/SEO, persistent Header/Footer/WhatsApp widget
- Location: `app/page.tsx`
- Triggers: Navigation to `/`
- Responsibilities: Composes HeroSection, ServicesSection, SelectedWorks (top 3 projects by release_date), CTASection
## Error Handling
- Hooks use try/catch around Supabase calls, set `error` state as string message
- Pages conditionally render error UI when `error` is truthy
- Project detail page shows "Project Not Found" card with link back to portfolio
- No error boundary components
- No error reporting/monitoring service
- Extensive `console.log` statements throughout for debugging (not production-ready)
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
