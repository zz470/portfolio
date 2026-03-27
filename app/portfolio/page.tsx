"use client"

import { useState, useMemo } from "react";
import { projects } from "@/lib/data/projects";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from projects
  const categories = useMemo(() => {
    // Get unique categories and sort them alphabetically
    const uniqueCategories = Array.from(
      new Set(projects.map(project => project.category))
    ).filter(Boolean).sort();

    return uniqueCategories;
  }, []);

  // Filter projects based on the selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === null) return projects;

    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div 
      className="max-w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </motion.div>
      
      <div className="w-full overflow-hidden">
        <PortfolioGrid projects={filteredProjects} />
      </div>
    </motion.div>
  );
}
