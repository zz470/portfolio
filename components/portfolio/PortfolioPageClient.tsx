"use client"

import { useState, useMemo } from "react";
import { projects, sortProjectsByDate } from "@/lib/data/projects";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import { motion } from "framer-motion";

export default function PortfolioPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(projects.map((project) => project.category)))
      .filter(Boolean)
      .sort();
  }, []);

  const filteredProjects = useMemo(() => {
    const source =
      selectedCategory === null
        ? projects
        : projects.filter((project) => project.category === selectedCategory);
    return sortProjectsByDate(source);
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
