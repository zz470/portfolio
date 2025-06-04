import { Project } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

interface ProjectVideoCardProps {
  project: Project;
  className?: string;
}

export default function ProjectVideoCard({ project, className = "" }: ProjectVideoCardProps) {
  const [videoError, setVideoError] = useState(false);
  const hasValidVideoUrl = project.video_url && project.video_url.trim() !== "";
  
  // Don't render anything if there's no valid video URL
  if (!hasValidVideoUrl) {
    return null;
  }
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div variants={fadeIn} className={className}>
      <div className="space-y-3">
        <h2 className="font-medium text-lg tracking-tight">Watch</h2>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
          {!videoError ? (
            <video
              src={project.video_url}
              controls
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
              preload="metadata"
              poster={project.thumbnail_url}
            >
              Your browser does not support the video tag.
              <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Click here to watch the video
              </a>
            </video>
          ) : (
            <iframe
              src={getEmbedUrl(project.video_url)}
              title={project.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => {
                return (
                  <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      Click here to watch the video
                    </a>
                  </div>
                );
              }}
            ></iframe>
          )}
        </AspectRatio>
      </div>
    </motion.div>
  );
}

// Helper function to convert regular URLs to embed URLs
function getEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      videoId = new URL(url).searchParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const vimeoId = url.split('vimeo.com/')[1].split('?')[0];
    return `https://player.vimeo.com/video/${vimeoId}`;
  }
  
  // Return original URL if not YouTube or Vimeo
  return url;
} 