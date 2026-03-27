import type { Metadata } from "next";
import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Sound design and mixing portfolio featuring work in film, TV series, documentaries, and advertisements.",
  openGraph: {
    title: "Portfolio | Lorenzo Pardell",
    description: "Sound design and mixing portfolio - film, TV series, documentaries, and advertisements.",
    images: ["/og-image.png"],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
