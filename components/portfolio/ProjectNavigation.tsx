import { Project } from "@/hooks/useProjects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectNavigationProps {
  currentProject: Project;
  allProjects: Project[];
  className?: string;
}

export default function ProjectNavigation({ 
  currentProject, 
  allProjects, 
  className = "" 
}: ProjectNavigationProps) {
  // Sort projects by release_date in descending order (newest first)
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.release_date && b.release_date) {
      return b.release_date - a.release_date;
    }
    // If only one has a release date, prioritize the one with a date
    if (a.release_date) return -1;
    if (b.release_date) return 1;
    // If neither has a release date, maintain original order
    return 0;
  });
  
  // Find the index of the current project in the sorted array
  const currentIndex = sortedProjects.findIndex(p => p.slug === currentProject.slug);
  
  // Calculate next and previous project indices
  const totalProjects = sortedProjects.length;
  const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
  const nextIndex = (currentIndex + 1) % totalProjects;
  
  // Get the next and previous projects
  const prevProject = sortedProjects[prevIndex];
  const nextProject = sortedProjects[nextIndex];

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className={`mt-12 mb-6 ${className}`}
    >
      <h3 className="text-xl font-bold mb-6 text-center">Continue Exploring</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Previous Project Card */}
        <Link href={`/portfolio/${prevProject.slug}`} className="group block h-full">
          <div className="relative w-full h-60 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 dark:bg-gray-800">
            <img 
              src={prevProject.thumbnail_url} 
              alt={prevProject.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <div className="flex items-center text-white mb-1">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Previous Project</span>
                </div>
                <h4 className="text-white font-semibold line-clamp-1">{prevProject.title}</h4>
                <Badge className="mt-1 bg-indigo-600/80 hover:bg-indigo-700 text-white text-xs">
                  {prevProject.category}
                </Badge>
              </div>
            </div>
          </div>
        </Link>

        {/* Next Project Card */}
        <Link href={`/portfolio/${nextProject.slug}`} className="group block h-full">
          <div className="relative w-full h-60 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 dark:bg-gray-800">
            <img 
              src={nextProject.thumbnail_url} 
              alt={nextProject.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <div className="flex items-center justify-end text-white mb-1">
                  <span className="text-sm font-medium">Next Project</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-white font-semibold text-right line-clamp-1">{nextProject.title}</h4>
                <div className="flex justify-end">
                  <Badge className="mt-1 bg-indigo-600/80 hover:bg-indigo-700 text-white text-xs">
                    {nextProject.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
} 