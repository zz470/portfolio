import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { Project } from "@/hooks/useProjects";
import { sortProjectsByDate } from "@/lib/data/projects";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const sortedProjects = sortProjectsByDate(projects);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 w-full max-w-none">
      {sortedProjects.map((project, index) => (
        <PortfolioCard 
          key={project.id} 
          project={project} 
          index={index}
        />
      ))}
    </div>
  );
}
