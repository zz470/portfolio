import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import ProjectSlugClient from "@/components/portfolio/ProjectSlugClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: project.title,
    description: project.description || `${project.title} - sound by Lorenzo Pardell`,
    openGraph: {
      title: `${project.title} | Lorenzo Pardell`,
      description: project.description || "Sound work by Lorenzo Pardell",
      images: ["/og-image.png"],
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
  return <ProjectSlugClient project={project} />;
}
