import { Project } from "@/hooks/useProjects";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectDetailsCardProps {
  project: Project;
  className?: string;
}

export default function ProjectDetailsCard({ project, className = "" }: ProjectDetailsCardProps) {
  const releaseYear = project.release_date || null;
  
  // Animation variants
  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={slideIn} className={className}>
      <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
        <CardContent className="pb-5">
          {/* Project Info Section */}
          <h2 className="text-lg font-medium mb-4 tracking-tight">Project Details</h2>
          
          <div className="space-y-4">
            {/* Roles - first item */}
            <div>
              <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Roles</dt>
              <dd className="font-medium">
                {project.roles.join(', ')}
              </dd>
            </div>
            
            {project.production_company && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Production Company</dt>
                <dd className="font-medium">{project.production_company}</dd>
              </div>
            )}
            
            {project.media_platform && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Media Platform</dt>
                <dd className="font-medium">{project.media_platform}</dd>
              </div>
            )}
            
            {releaseYear && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Release Year</dt>
                <dd className="font-medium">{releaseYear}</dd>
              </div>
            )}
          
            {/* External Links Section */}
            {project.imdb_url && (
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={project.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  <span>View on IMDb</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 