import Link from "next/link";
import { Project } from "@/hooks/useProjects";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PortfolioCardProps {
  project: Project;
  index: number;
}

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  // Get release year directly from the numeric value
  const releaseYear = project.release_date || null;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reference for the card element to check when it's in view
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, // Once the animation has played, keep it visible
    amount: 0.1, // Show animation when just 10% of the card is visible
    margin: "0px 0px 300px 0px" // Large positive bottom margin to trigger much earlier
  });
  
  // For debugging
  useEffect(() => {
    console.log(`Project "${project.title}" thumbnail URL:`, project.thumbnail_url);
  }, [project.title, project.thumbnail_url]);

  // Calculate row and column for a better stagger effect in a 2-column grid
  // For a 2-column grid, the stagger should follow: (0,0), (0,1), (1,0), (1,1), etc.
  const row = Math.floor(index / 2);
  const col = index % 2;
  const staggerOrder = (row * 2) + col;
  const staggerDelay = staggerOrder * 0.1; // 0.1 second delay per item

  // Animation variants for when the card comes into view
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: staggerDelay
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="h-full"
    >
      <Link href={`/portfolio/${project.slug}`} className="block group h-full">
        <div className="relative overflow-hidden h-full">
          {/* 2:1 aspect ratio container */}
          <div className="relative w-full pb-[50%] bg-gray-200">
            {/* Image */}
            {!imageError && (
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => {
                  console.log(`Image for "${project.title}" loaded successfully`);
                  setImageLoaded(true);
                }}
                onError={() => {
                  console.error(`Image for "${project.title}" failed to load`);
                  setImageError(true);
                }}
              />
            )}
            
            {/* Loading indicator */}
            {!imageLoaded && !imageError && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500 font-medium">Loading...</p>
              </motion.div>
            )}
            
            {/* Show title if image fails to load */}
            {imageError && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500 font-medium">{project.title}</p>
              </motion.div>
            )}
            
            {/* Overlay that appears on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end">
              {/* Project info container - slides up on hover */}
              <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-gray-200">{project.category}</p>
                
                <div className="mt-1 flex flex-wrap gap-1 text-sm text-gray-300">
                  {project.media_platform && <span>{project.media_platform}</span>}
                  {releaseYear && <span>{releaseYear && project.media_platform && " • "}{releaseYear}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
