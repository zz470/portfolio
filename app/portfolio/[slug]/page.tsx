import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import ProjectSlugClient from "@/components/portfolio/ProjectSlugClient";
import { buildCreativeWorkSchema } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  const ogImage = project.hero_url
    ? [{ url: project.hero_url, width: 1200, height: 630, alt: `${project.title} - sound by Lorenzo Pardell` }]
    : [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lorenzo Pardell - Sound Designer" }];

  const description = project.description || `${project.title} - sound by Lorenzo Pardell`;

  return {
    title: project.title,
    description,
    openGraph: {
      title: `${project.title} | Lorenzo Pardell`,
      description,
      images: ogImage,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Lorenzo Pardell`,
      description,
      images: ogImage.map((img) => (typeof img === "string" ? img : img.url)),
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const jsonLd = buildCreativeWorkSchema(project);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectSlugClient project={project} />
    </>
  );
}
