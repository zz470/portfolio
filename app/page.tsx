import type { Metadata } from "next";
import { getFeaturedProjects } from "@/lib/data/projects";
import SelectedWorks from "@/components/home/SelectedWorks";
import ServicesSection from "@/components/home/ServicesSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  // No title -- root layout default applies
  openGraph: {
    title: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo",
    description: "Re-recording mixer and sound designer with 30+ credits across film, series, and documentaries. Based in Sao Paulo, Brazil.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  // Take the first 3 featured projects
  const featuredProjects = getFeaturedProjects(6);

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

      {/* FAQ Section */}
      <HomeFAQ />
    </main>
  );
}
