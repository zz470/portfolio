"use client";

import { Project, projects } from "@/lib/data/projects";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";
import PortfolioDetailSecondary from "@/components/portfolio/PortfolioDetailSecondary";
import PortfolioDetailTertiary from "@/components/portfolio/PortfolioDetailTertiary";

interface ProjectSlugClientProps {
  project: Project;
}

export default function ProjectSlugClient({ project }: ProjectSlugClientProps) {
  if (project.design_version === "secondary") {
    return <PortfolioDetailSecondary project={project} allProjects={projects} />;
  } else if (project.design_version === "tertiary") {
    return <PortfolioDetailTertiary project={project} allProjects={projects} />;
  }
  return <PortfolioDetail project={project} allProjects={projects} />;
}
