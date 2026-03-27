import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description: "Re-recording mixer and sound designer based in Sao Paulo. Experience across Europe, North and South America in film, series, and documentaries.",
  openGraph: {
    title: "About | Lorenzo Pardell",
    description: "Re-recording mixer and sound designer based in Sao Paulo, Brazil.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
