"use client";

import { getFeaturedProjects } from "@/lib/data/projects";
import SelectedWorks from "@/components/home/SelectedWorks";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  // Take the first 3 featured projects
  const featuredProjects = getFeaturedProjects(3);

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Work */}
      <SelectedWorks
        projects={featuredProjects}
        isLoading={false}
      />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
