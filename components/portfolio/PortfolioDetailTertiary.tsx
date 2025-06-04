import { Project } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectAboutCard from "./ProjectAboutCard";
import ProjectVideoCard from "./ProjectVideoCard";
import ProjectNavigation from "./ProjectNavigation";

interface PortfolioDetailTertiaryProps {
  project: Project;
  allProjects?: Project[];
}

export default function PortfolioDetailTertiary({ project, allProjects = [] }: PortfolioDetailTertiaryProps) {
  const releaseYear = project.release_date || null;

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
      <motion.div 
        initial="initial"
        animate="animate"
        className="max-w-screen-xl mx-auto p-4 sm:p-5 md:p-6"
      >
        <div className="space-y-6">
          {/* Title and badges section at the top */}
          <div className="text-center mb-4">
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white mb-2">
              {project.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              {project.title}
            </h1>
            {releaseYear && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {releaseYear}
              </div>
            )}
          </div>

          {/* 1. Video section - first on both mobile and desktop */}
          <motion.div variants={fadeIn} className="w-full">
            <ProjectVideoCard 
              project={project}
            />
          </motion.div>

          <Separator className="my-6" />

          {/* Content section below video */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2. Project Details Card */}
            <motion.div variants={slideIn} className="lg:col-span-1">
              <ProjectDetailsCard 
                project={project}
              />
            </motion.div>
            
            {/* 3. About Card */}
            <motion.div variants={fadeIn} className="lg:col-span-2">
              <ProjectAboutCard 
                project={project}
              />
            </motion.div>
          </div>
          
          {/* Project images/gallery could be added here if needed */}
          
          {/* Project Navigation - Previous/Next Projects */}
          {allProjects.length > 1 && (
            <>
              <Separator className="my-6" />
              <ProjectNavigation 
                currentProject={project} 
                allProjects={allProjects} 
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
} 