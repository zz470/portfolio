import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional sound design, re-recording mixing, audio editing, foley, field recording, and location sound services for film, TV, and documentaries.",
  openGraph: {
    title: "Services | Lorenzo Pardell",
    description: "Sound design, mixing, and audio post-production services for film and media.",
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
