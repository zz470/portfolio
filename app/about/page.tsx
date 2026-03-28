import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "About | Re-Recording Mixer & Sound Designer",
  description: copy.aboutMeta.description,
  openGraph: {
    title: "About | Re-Recording Mixer & Sound Designer | Lorenzo Pardell",
    description: copy.aboutMeta.description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
