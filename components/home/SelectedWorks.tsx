import { Project } from "@/hooks/useProjects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { forwardRef } from "react";

interface SelectedWorksProps {
  projects: Project[];
  className?: string;
  title?: string;
  description?: string;
  showViewAllLink?: boolean;
  isLoading?: boolean;
}

const SelectedWorks = forwardRef<HTMLElement, SelectedWorksProps>(({ 
  projects = [], 
  className = "",
  title = "Selected Work",
  description = "Recent client projects that showcase my approach to audio production",
  showViewAllLink = true,
  isLoading = false
}, ref) => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const container = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section ref={ref} className={`w-full py-24 bg-white ${className}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex justify-between items-end mb-16"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
            <div className="w-16 h-1 bg-orange-500 mb-6"></div>
            <p className="text-gray-600 max-w-xl">
              {description}
            </p>
          </div>
          {showViewAllLink && (
            <Link href="/portfolio" className="text-orange-500 hover:text-orange-600 font-medium hidden md:inline-flex items-center text-sm">
              View complete portfolio
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="relative w-full overflow-hidden rounded-lg bg-gray-200 pb-[150%]">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-3 h-6 w-16 rounded bg-gray-300"></div>
                    <div className="mb-2 h-5 w-4/5 rounded bg-gray-300"></div>
                    <div className="mb-4 h-4 w-3/5 rounded bg-gray-300"></div>
                    <div className="h-4 w-24 rounded bg-gray-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            variants={container}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn}
                className="h-full"
              >
                <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                  <div className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 dark:bg-gray-800">
                    <div className="pb-[150%] relative">
                      <Image 
                        src={project.thumbnail_url} 
                        alt={project.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          {project.category && (
                            <Badge className="mb-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                              {project.category}
                            </Badge>
                          )}
                          <h4 className="text-white text-xl font-medium mb-3">{project.title}</h4>
                          <p className="text-gray-200 text-sm line-clamp-1 mb-4 opacity-90">
                            {project.description}
                          </p>
                          <div className="flex items-center text-white text-sm font-medium group-hover:text-gray-200 transition-colors mt-1">
                            <span>View Project</span>
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500">
            No projects available at this time
          </div>
        )}
      </div>
    </section>
  );
});

SelectedWorks.displayName = "SelectedWorks";

export default SelectedWorks; 