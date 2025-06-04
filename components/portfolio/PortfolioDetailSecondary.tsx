import { Project } from "@/hooks/useProjects";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import React from "react";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectAboutCard from "./ProjectAboutCard";
import ProjectVideoCard from "./ProjectVideoCard";
import ProjectNavigation from "./ProjectNavigation";
import { Separator } from "@/components/ui/separator";

interface PortfolioDetailSecondaryProps {
  project: Project;
  allProjects?: Project[];
}

export default function PortfolioDetailSecondary({ project, allProjects = [] }: PortfolioDetailSecondaryProps) {
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
          {/* 1. Hero Image - first on both mobile and desktop with improved mobile sizing */}
          <motion.div 
            variants={fadeIn} 
            className="relative w-full h-[38vh] sm:h-[42vh] md:h-[50vh] rounded-xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
              <img 
                src={project.hero_url || project.thumbnail_url} 
                alt={project.title} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full">
              <div className="space-y-2">
                <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white mb-1">
                  {project.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white line-clamp-2">
                  {project.title}
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Content section - reordered for mobile with flex-col on mobile and grid on desktop */}
          <div className="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
            {/* Card content container */}
            <div className="flex flex-col space-y-6 lg:col-span-3">
              {/* Info section wrapper - contains Project Details and About */}
              <div className="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
                {/* 2. Project Info - second on mobile, first column on desktop */}
                <ProjectDetailsCard 
                  project={project}
                  className="order-1 lg:col-span-1"
                />
                
                {/* 3. About card - third on mobile, second column on desktop */}
                <ProjectAboutCard 
                  project={project}
                  className="order-2 lg:col-span-2"
                />
              </div>
              
              {/* 4. Video section - fourth on mobile, full width */}
              <ProjectVideoCard 
                project={project}
                className="order-3"
              />
              
              {/* Project Navigation - Previous/Next Projects */}
              {allProjects.length > 1 && (
                <>
                  <Separator className="my-4" />
                  <ProjectNavigation 
                    currentProject={project} 
                    allProjects={allProjects}
                    className="order-4" 
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 