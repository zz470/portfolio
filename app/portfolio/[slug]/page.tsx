"use client"

import { useProject } from "@/hooks/useProject";
import { useProjects } from "@/hooks/useProjects";
import { useParams } from "next/navigation";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";
import PortfolioDetailSecondary from "@/components/portfolio/PortfolioDetailSecondary";
import PortfolioDetailTertiary from "@/components/portfolio/PortfolioDetailTertiary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectPage() {
  const { slug } = useParams();
  const { project, loading: projectLoading, error: projectError } = useProject(slug as string);
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  const loading = projectLoading || projectsLoading;
  const error = projectError || projectsError;

  console.log("ProjectPage rendering with:", { 
    slug, 
    project, 
    projectLoading, 
    projectError,
    projectDesignVersion: project?.design_version
  });

  if (loading) {
    console.log("ProjectPage: Loading state");
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <Card className="w-full max-w-md border-0 shadow-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-6"></div>
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !project) {
    console.log("ProjectPage: Error or project not found", { error, project });
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
  console.log("ProjectPage: Rendering design version:", project.design_version);
  
  if (project.design_version === 'secondary') {
    console.log("ProjectPage: Rendering secondary design");
    return <PortfolioDetailSecondary project={project} allProjects={projects || []} />;
  } else if (project.design_version === 'tertiary') {
    console.log("ProjectPage: Rendering tertiary design");
    return <PortfolioDetailTertiary project={project} allProjects={projects || []} />;
  }

  // Default to primary design
  console.log("ProjectPage: Rendering primary design");
  return <PortfolioDetail project={project} allProjects={projects || []} />;
}
