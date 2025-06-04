"use client";

import { useEffect, useRef, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import SelectedWorks from "@/components/home/SelectedWorks";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
//import ClientQuote from "@/components/home/ClientQuote";

export default function Home() {
  const { projects, loading } = useProjects();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Take the first 3 featured projects, sorted by release date (newest first)
  const featuredProjects = projects
    ? [...projects]
        .sort((a, b) => {
          // Sort by release_date in descending order (newest first)
          // Use fallback to creation date if release_date is not available
          const dateA = a.release_date || 0;
          const dateB = b.release_date || 0;
          return dateB - dateA;
        })
        .slice(0, 3)
    : [];

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Client Focus Statement
      <ClientQuote />*/}

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Work */}
      <SelectedWorks 
        ref={sectionRef}
        projects={featuredProjects}
        isLoading={loading}
      />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
