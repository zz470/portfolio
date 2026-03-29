"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { type Project } from "@/lib/data/projects";

interface CategoryPageClientProps {
  projects: Project[];
  categoryName: string;
}

export default function CategoryPageClient({ projects, categoryName }: CategoryPageClientProps) {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 pt-16 pb-16">
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-gray-500 hover:text-orange-500 transition-colors mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to All Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {categoryName}
        </h1>
        <div className="w-12 h-1 bg-orange-500 mb-6" />
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          {projects.length} {categoryName} project{projects.length !== 1 ? "s" : ""} with sound design and audio post-production by Lorenzo Pardell.
        </p>
      </motion.div>

      <PortfolioGrid projects={projects} />
    </div>
  );
}
