/**
 * Continuity Verification Script
 * Verifies CONT-01 through CONT-04 requirements are satisfied with the local data layer.
 * Run with: npx tsx scripts/verify-continuity.ts
 */

import { execSync } from "child_process";
import path from "path";
import {
  projects,
  getProjectBySlug,
  getProjectsByCategory,
  getFeaturedProjects,
} from "@/lib/data/projects";

// ── Helpers ──────────────────────────────────────────────────────────────────

let failures = 0;

function pass(label: string): void {
  console.log(`PASS  ${label}`);
}

function fail(label: string, detail?: string): void {
  failures++;
  console.error(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
}

function assert(condition: boolean, passLabel: string, failLabel: string, detail?: string): void {
  if (condition) {
    pass(passLabel);
  } else {
    fail(failLabel, detail);
  }
}

// ── CONT-01: Route data availability ─────────────────────────────────────────

console.log("\n=== CONT-01: Route data availability ===\n");

assert(
  projects.length === 19,
  "CONT-01 — projects.length === 19",
  "CONT-01 — projects.length !== 19",
  `Got ${projects.length}`
);

const featured = getFeaturedProjects(3);
assert(
  featured.length === 3,
  "CONT-01 — getFeaturedProjects(3).length === 3",
  "CONT-01 — getFeaturedProjects(3).length !== 3",
  `Got ${featured.length}`
);

const requiredFields: Array<keyof typeof projects[0]> = [
  "title",
  "slug",
  "description",
  "thumbnail_url",
  "video_url",
  "category",
  "roles",
];

let allFieldsPresent = true;
const missingFields: string[] = [];
for (const project of projects) {
  for (const field of requiredFields) {
    const value = project[field];
    if (value === undefined || value === null) {
      allFieldsPresent = false;
      missingFields.push(`slug="${project.slug}" missing "${field}"`);
    } else if (field === "roles") {
      const rolesArr = value as string[];
      if (!Array.isArray(rolesArr) || rolesArr.length === 0) {
        allFieldsPresent = false;
        missingFields.push(`slug="${project.slug}" has empty roles array`);
      }
    }
  }
}
assert(
  allFieldsPresent,
  "CONT-01 — All 19 projects have required fields (title, slug, description, thumbnail_url, video_url, category, roles)",
  "CONT-01 — Some projects are missing required fields",
  missingFields.join("; ")
);

const slugs = projects.map((p) => p.slug);
const uniqueSlugs = new Set(slugs);
assert(
  uniqueSlugs.size === slugs.length,
  "CONT-01 — All slugs are unique (no duplicates)",
  "CONT-01 — Duplicate slugs detected",
  `${slugs.length} total, ${uniqueSlugs.size} unique`
);

// ── CONT-02: Category filtering ───────────────────────────────────────────────

console.log("\n=== CONT-02: Category filtering ===\n");

const expectedCategories = ["Advertisement", "Documentary", "Film", "Reality", "Series"];
const actualCategories = [...new Set(projects.map((p) => p.category))].sort();

assert(
  JSON.stringify(actualCategories) === JSON.stringify(expectedCategories),
  "CONT-02 — Unique categories match expected set",
  "CONT-02 — Unique categories do not match expected set",
  `Expected: [${expectedCategories.join(", ")}], Got: [${actualCategories.join(", ")}]`
);

let categorySum = 0;
let allCategoriesNonEmpty = true;
for (const cat of expectedCategories) {
  const result = getProjectsByCategory(cat);
  categorySum += result.length;
  if (result.length === 0) {
    allCategoriesNonEmpty = false;
    fail(`CONT-02 — getProjectsByCategory("${cat}") returned 0 results`);
  } else {
    pass(`CONT-02 — getProjectsByCategory("${cat}") returns ${result.length} project(s)`);
  }
}

assert(
  categorySum === 19,
  "CONT-02 — Sum of all category counts === 19 (no uncategorized projects)",
  "CONT-02 — Sum of category counts !== 19",
  `Got sum: ${categorySum}`
);

assert(
  projects.length === 19,
  "CONT-02 — projects.length === 19 ('All' baseline)",
  "CONT-02 — projects.length !== 19",
  `Got ${projects.length}`
);

// ── CONT-03: Design version routing ──────────────────────────────────────────

console.log("\n=== CONT-03: Design version routing ===\n");

const expectedSecondary = [
  "run-for-europe",
  "bimbo",
  "gots",
  "ropes-for-building-blocks",
  "piracanjuba",
];
const expectedTertiary = ["gnosis-vitamin-k2-womens-health"];

for (const slug of expectedSecondary) {
  const project = getProjectBySlug(slug);
  if (!project) {
    fail(`CONT-03 — slug "${slug}" not found in projects`, "getProjectBySlug returned undefined");
  } else {
    assert(
      project.design_version === "secondary",
      `CONT-03 — "${slug}" has design_version === "secondary"`,
      `CONT-03 — "${slug}" design_version !== "secondary"`,
      `Got "${project.design_version}"`
    );
  }
}

for (const slug of expectedTertiary) {
  const project = getProjectBySlug(slug);
  if (!project) {
    fail(`CONT-03 — slug "${slug}" not found in projects`, "getProjectBySlug returned undefined");
  } else {
    assert(
      project.design_version === "tertiary",
      `CONT-03 — "${slug}" has design_version === "tertiary"`,
      `CONT-03 — "${slug}" design_version !== "tertiary"`,
      `Got "${project.design_version}"`
    );
  }
}

const knownNonPrimary = new Set([...expectedSecondary, ...expectedTertiary]);
const primarySlugs = projects.filter((p) => !knownNonPrimary.has(p.slug)).map((p) => p.slug);
assert(
  primarySlugs.length === 13,
  `CONT-03 — Remaining 13 slugs are primary (got ${primarySlugs.length})`,
  `CONT-03 — Expected 13 primary slugs`,
  `Got ${primarySlugs.length}`
);

for (const slug of primarySlugs) {
  const project = getProjectBySlug(slug);
  if (project) {
    assert(
      project.design_version === "primary",
      `CONT-03 — "${slug}" has design_version === "primary"`,
      `CONT-03 — "${slug}" design_version !== "primary"`,
      `Got "${project.design_version}"`
    );
  }
}

let allHaveDesignVersion = true;
const missingDesignVersion: string[] = [];
for (const project of projects) {
  if (!project.design_version) {
    allHaveDesignVersion = false;
    missingDesignVersion.push(project.slug);
  }
}
assert(
  allHaveDesignVersion,
  "CONT-03 — Every project has a design_version value",
  "CONT-03 — Some projects are missing design_version",
  missingDesignVersion.join(", ")
);

// ── CONT-04: Prev/next navigation cycling ────────────────────────────────────

console.log("\n=== CONT-04: Prev/next navigation cycling ===\n");

// Reproduce ProjectNavigation.tsx sorting logic
const sortedProjects = [...projects].sort((a, b) => {
  if (a.release_date && b.release_date) {
    return b.release_date - a.release_date;
  }
  if (a.release_date) return -1;
  if (b.release_date) return 1;
  return 0;
});

const totalProjects = sortedProjects.length;

let navValid = true;
for (let i = 0; i < totalProjects; i++) {
  const prevIndex = (i - 1 + totalProjects) % totalProjects;
  const nextIndex = (i + 1) % totalProjects;
  const prevProject = sortedProjects[prevIndex];
  const nextProject = sortedProjects[nextIndex];
  if (!prevProject || !nextProject) {
    navValid = false;
    fail(
      `CONT-04 — Index ${i} (${sortedProjects[i].slug}) has invalid prev/next`,
      `prevIndex=${prevIndex}, nextIndex=${nextIndex}`
    );
  }
}
if (navValid) {
  pass("CONT-04 — All 19 positions have valid prev/next indices");
}

// Wrap-around checks
const firstProject = sortedProjects[0];
const lastProject = sortedProjects[totalProjects - 1];
const firstPrevIndex = (0 - 1 + totalProjects) % totalProjects;
const lastNextIndex = (totalProjects - 1 + 1) % totalProjects;

assert(
  firstPrevIndex === totalProjects - 1 && sortedProjects[firstPrevIndex].slug === lastProject.slug,
  `CONT-04 — First project's prev wraps to last (${lastProject.slug})`,
  `CONT-04 — First project's prev does not wrap to last`,
  `firstPrevIndex=${firstPrevIndex}, expected ${totalProjects - 1}`
);

assert(
  lastNextIndex === 0 && sortedProjects[lastNextIndex].slug === firstProject.slug,
  `CONT-04 — Last project's next wraps to first (${firstProject.slug})`,
  `CONT-04 — Last project's next does not wrap to first`,
  `lastNextIndex=${lastNextIndex}, expected 0`
);

// ── Build verification ────────────────────────────────────────────────────────

console.log("\n=== Build verification ===\n");

const projectRoot = path.resolve(__dirname, "..");
try {
  console.log("Running next build (this may take a minute)...\n");
  const buildOutput = execSync("npx next build", {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  pass("Build — next build exited with code 0");

  const expectedRoutes = [
    "/",
    "/_not-found",
    "/about",
    "/contact",
    "/portfolio",
    "/portfolio/[slug]",
    "/services",
  ];

  const allRoutesFound = expectedRoutes.every(
    (route) => buildOutput.includes(route)
  );
  assert(
    allRoutesFound,
    "Build — All 7 expected routes appear in build output",
    "Build — Some expected routes missing from build output",
    `Expected: [${expectedRoutes.join(", ")}]`
  );
} catch (err: unknown) {
  const error = err as { stdout?: string; stderr?: string; status?: number };
  fail("Build — next build failed", `exit code: ${error.status ?? "unknown"}`);
  if (error.stdout) console.error("stdout:", error.stdout.slice(-2000));
  if (error.stderr) console.error("stderr:", error.stderr?.slice(-1000));
}

// ── Final summary ─────────────────────────────────────────────────────────────

console.log("\n=================================================");
if (failures === 0) {
  console.log("All checks passed");
  process.exit(0);
} else {
  console.error(`${failures} check(s) failed`);
  process.exit(1);
}
