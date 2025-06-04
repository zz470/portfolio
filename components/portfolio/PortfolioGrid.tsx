import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { Project } from "@/hooks/useProjects";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  // Sort projects by release_date in descending order (newest first)
  // If release_date is missing for some projects, they will appear at the end
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.release_date && b.release_date) {
      return b.release_date - a.release_date;
    }
    // If only one has a release date, prioritize the one with a date
    if (a.release_date) return -1;
    if (b.release_date) return 1;
    // If neither has a release date, maintain original order
    return 0;
  });

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
