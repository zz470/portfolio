import type { Metadata } from "next";
import { getAllCategories, getProjectsByCategory } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import CategoryPageClient from "@/components/portfolio/CategoryPageClient";
import { buildCollectionSchema } from "@/lib/jsonld";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const matchedCategory = categories.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );

  if (!matchedCategory) {
    return { title: "Category Not Found" };
  }

  const description = `${matchedCategory} projects with sound design and re-recording mix by Lorenzo Pardell. Based in Sao Paulo, available worldwide.`;

  return {
    title: `${matchedCategory} Sound Design & Mixing Projects`,
    description,
    alternates: { canonical: `/portfolio/category/${matchedCategory.toLowerCase()}` },
    openGraph: {
      title: `${matchedCategory} Sound Design & Mixing Projects | Lorenzo Pardell`,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lorenzo Pardell - Sound Designer" }],
    },
    twitter: {
      card: "summary",
      title: `${matchedCategory} Sound Design & Mixing Projects | Lorenzo Pardell`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.toLowerCase() }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = getAllCategories();
  const matchedCategory = categories.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );

  if (!matchedCategory) {
    notFound();
  }

  const filteredProjects = getProjectsByCategory(matchedCategory);

  if (filteredProjects.length === 0) {
    notFound();
  }

  const jsonLd = buildCollectionSchema(matchedCategory, filteredProjects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageClient projects={filteredProjects} categoryName={matchedCategory} />
    </>
  );
}
