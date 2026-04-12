"use client";

import { Project, projects } from "@/lib/data/projects";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";

interface ProjectSlugClientProps {
  project: Project;
}

export default function ProjectSlugClient({ project }: ProjectSlugClientProps) {
  return (
    <PortfolioDetail
      project={project}
      allProjects={projects}
      variant={project.design_version ?? "primary"}
    />
  );
}
