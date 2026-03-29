"use client";

import { type Project } from "@/lib/data/projects";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import { fadeIn, staggerContainer } from "@/lib/animations";

interface SelectedWorksProps {
  projects: Project[];
  className?: string;
  title?: string;
  description?: string;
  showViewAllLink?: boolean;
  isLoading?: boolean;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <div className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 dark:bg-gray-800">
        <div className="pb-[150%] relative">
          <Image
            src={project.hero_url || project.thumbnail_url}
            alt={`${project.title} — sound by Lorenzo Pardell`}
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
              <p className="text-gray-200 text-sm mb-4 opacity-90">
                {[project.media_platform, project.production_company || (project.directors?.length ? project.directors.join(", ") : null), project.release_date].filter(Boolean).join(" · ")}
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
  );
}

function Carousel({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const halfWidth = useRef(0);

  const speed = 0.5; // pixels per frame (~30px/s at 60fps)

  useEffect(() => {
    if (!innerRef.current) return;
    // Half the scroll content = one set of projects
    halfWidth.current = innerRef.current.scrollWidth / 2;
  }, [projects]);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isPaused) {
      setScrollX((prev) => {
        let next = prev - speed * (delta / 16);
        if (halfWidth.current) {
          // Wrap in both directions
          while (next < -halfWidth.current) next += halfWidth.current;
          while (next > 0) next -= halfWidth.current;
        }
        return next;
      });
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  // Drag support
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.clientX - scrollX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    let next = e.clientX - dragStartX;
    // Wrap in both directions
    if (halfWidth.current) {
      while (next < -halfWidth.current) next += halfWidth.current;
      while (next > 0) next -= halfWidth.current;
      setDragStartX(e.clientX - next);
    }
    setScrollX(next);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    // Only capture horizontal scroll — let vertical scroll pass through to the page
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    setScrollX((prev) => {
      let next = prev - e.deltaX;
      if (halfWidth.current) {
        while (next < -halfWidth.current) next += halfWidth.current;
        while (next > 0) next -= halfWidth.current;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full cursor-grab active:cursor-grabbing scrollbar-hide"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        if (isDragging) handlePointerUp();
      }}
    >
      <div
        ref={innerRef}
        className="flex gap-6 pl-6 md:pl-10"
        style={{
          transform: `translateX(${scrollX}px)`,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {[...projects, ...projects].map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="w-[80vw] md:w-[calc((100vw-5rem-3rem)/3)] lg:w-[calc((1280px-5rem-3rem)/3)] flex-shrink-0"
            onClickCapture={(e) => {
              // Prevent navigation if user was dragging
              if (isDragging) e.preventDefault();
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

const SelectedWorks = forwardRef<HTMLElement, SelectedWorksProps>(({
  projects = [],
  className = "",
  title = "Selected Work",
  description = "Recent client projects that showcase my approach to audio production",
  showViewAllLink = true,
  isLoading = false
}, ref) => {
  const useCarouselLayout = projects.length > 3;

  return (
    <section ref={ref} className={`w-full py-24 bg-white ${className}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          className="flex justify-between items-end"
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

      </div>

      {isLoading ? (
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
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
        </div>
      ) : projects.length > 0 ? (
        useCarouselLayout ? (
          <Carousel projects={projects} />
        ) : (
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      ) : (
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 text-center text-gray-500">
          No projects available at this time
        </div>
      )}
    </section>
  );
});

SelectedWorks.displayName = "SelectedWorks";

export default SelectedWorks;
