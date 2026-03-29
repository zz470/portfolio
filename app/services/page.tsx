import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";
import { copy } from "@/lib/copy";
import { buildFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Sound Design & Mixing Expertise",
  description: copy.servicesMeta.description,
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
  const faqJsonLd = buildFAQSchema(copy.faq.entries);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicesPageClient />
    </>
  );
}
