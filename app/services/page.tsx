import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.servicesMeta.title,
  description: copy.servicesMeta.description,
  openGraph: {
    title: copy.servicesMeta.title,
    description: copy.servicesMeta.description,
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
