// components/PortfolioDetail.tsx

import { Project } from "@/hooks/useProjects"; // Assuming your project type is exported from the hook file
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectAboutCard from "./ProjectAboutCard";
import ProjectVideoCard from "./ProjectVideoCard";
import ProjectNavigation from "./ProjectNavigation";

interface PortfolioDetailProps {
  project: Project;
  allProjects?: Project[];
}

export default function PortfolioDetail({ project, allProjects = [] }: PortfolioDetailProps) {
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
    <motion.div 
      initial="initial"
      animate="animate"
      className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden p-5 md:p-6 max-w-screen-xl mx-auto"
    >
      <div className="space-y-6">
        {/* Main content area - reordered for mobile first */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Left column content */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Title section - visible on all screens */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  {project.title}
                </h1>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-3">
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    {project.category}
                  </Badge>
                  {releaseYear && (
                    <>
                      <span>•</span>
                      <span>{releaseYear}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Image */}
              <motion.div 
                variants={fadeIn}
                className="block lg:hidden"
              >
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <AspectRatio ratio={2/3}>
                    <img
                      src={project.hero_url || project.thumbnail_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </motion.div>

              {/* Project Details Card */}
              <ProjectDetailsCard 
                project={project}
              />
            </div>

            {/* About Card - bottom aligned */}
            <ProjectAboutCard 
              project={project}
            />
          </div>

          {/* Desktop Image - Right column */}
          <motion.div 
            variants={fadeIn}
            className="hidden lg:block lg:col-span-2 h-full"
          >
            <div className="rounded-xl overflow-hidden shadow-lg w-full h-full flex">
              <div className="w-full relative">
                <img
                  src={project.hero_url || project.thumbnail_url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-4" />

        {/* 4. Video section - last on both mobile and desktop */}
        <ProjectVideoCard 
          project={project}
          className="order-4 w-full"
        />
        
        {/* Project Navigation - Previous/Next Projects */}
        {allProjects.length > 1 && (
          <>
            <Separator className="my-4" />
            <ProjectNavigation 
              currentProject={project} 
              allProjects={allProjects} 
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
