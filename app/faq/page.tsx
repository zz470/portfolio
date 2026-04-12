import type { Metadata } from "next";
import FAQPageClient from "@/components/faq/FAQPageClient";
import { copy } from "@/lib/copy";
import { buildFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: copy.faqPage.meta.title,
  description: copy.faqPage.meta.description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `${copy.faqPage.meta.title} | Lorenzo Pardell`,
    description: copy.faqPage.meta.description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary",
    title: `${copy.faqPage.meta.title} | Lorenzo Pardell`,
    description: copy.faqPage.meta.description,
    images: ["/og-image.png"],
  },
};

export default function FAQPage() {
  const allEntries = copy.faqPage.categories.flatMap((cat) =>
    cat.entries.map((e) => ({ question: e.question, answer: e.answer }))
  );
  const faqJsonLd = buildFAQSchema(allEntries);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageClient />
    </>
  );
}
