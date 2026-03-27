"use client"

import { getProjectBySlug, projects } from "@/lib/data/projects";
import { useParams } from "next/navigation";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";
import PortfolioDetailSecondary from "@/components/portfolio/PortfolioDetailSecondary";
import PortfolioDetailTertiary from "@/components/portfolio/PortfolioDetailTertiary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug as string);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-950">
        <Card className="w-full max-w-md border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/portfolio">
                Return to Projects
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render the appropriate design based on the project's design_version field
  if (project.design_version === 'secondary') {
    return <PortfolioDetailSecondary project={project} allProjects={projects} />;
  } else if (project.design_version === 'tertiary') {
    return <PortfolioDetailTertiary project={project} allProjects={projects} />;
  }

  // Default to primary design
  return <PortfolioDetail project={project} allProjects={projects} />;
}
