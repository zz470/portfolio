import { Project } from "@/hooks/useProjects";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectAboutCardProps {
  project: Project;
  className?: string;
}

export default function ProjectAboutCard({ project, className = "" }: ProjectAboutCardProps) {
  // Don't render if description is empty
  const hasDescription = project.description && project.description.trim() !== "";
  if (!hasDescription) {
    return null;
  }

  // Animation variants
  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={slideIn} className={className}>
      <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
        <CardContent className="pb-5">
          <h2 className="font-medium text-lg mb-3 tracking-tight">About</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
} 