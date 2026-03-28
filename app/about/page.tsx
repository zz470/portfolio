import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.aboutMeta.title,
  description: copy.aboutMeta.description,
  openGraph: {
    title: copy.aboutMeta.title,
    description: copy.aboutMeta.description,
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
