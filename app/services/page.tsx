import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Sound Design & Mixing Expertise",
  description: copy.servicesMeta.description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Sound Design & Mixing Expertise | Lorenzo Pardell",
    description: copy.servicesMeta.description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary",
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
